/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { 
  DISRUPCIONES, 
  TITULARES, 
  ROLES,
  SOLO_AVATARS,
  SOLO_ACCIONES,
  HORIZONTES,
  ELEMENTOS,
  SINERGIAS,
  CONFLICTOS,
  FUTUROS,
  type Disruption,
  type Futuro,
  type Elemento,
  type ComponenteIniciativa,
} from "./constants";
import { ScreenWrapper, ProgressBar, Button } from "./components/UI";
import { ChevronLeft, Zap, User, CheckCircle2, Loader2, Volume2, VolumeX, Copy, Check } from "lucide-react";
import { db, collection, addDoc, updateDoc, onSnapshot, serverTimestamp, doc, getDocFromServer } from "./firebase";

type Screen = "welcome" | "waiting" | "selecting_avatar" | "assigning_roles" | "shock_reveal" | "playing" | "revealing" | "finished" | 
              "level2_intro" | "level2_investment" | "level2_result" | "level2_initiative" | "level2_evaluation";

interface PlayerState {
  roleId: string;
  choice?: number;
  name: string;
  isReady: boolean;
}

interface Session {
  id: string;
  status: "waiting" | "assigning_roles" | "shock_reveal" | "playing" | "revealing" | "finished";
  hostId: string;
  mode: "solo" | "multi";
  shockId?: number;
  players: Record<string, PlayerState>;
  score?: number;
  createdAt: any;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [soloHorizonId, setSoloHorizonId] = useState<number | null>(null);
  const [level2Investments, setLevel2Investments] = useState<Record<number, number>>({});
  const [level2Future, setLevel2Future] = useState<Futuro | null>(null);
  const [level2SelectedComponents, setLevel2SelectedComponents] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [joinId, setJoinId] = useState("");
  const [copied, setCopied] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Local Player ID initialization
  useEffect(() => {
    let id = localStorage.getItem("player_id");
    if (!id) {
      id = "p_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("player_id", id);
    }
    setPlayerId(id);
  }, []);

  // Session synchronization
  useEffect(() => {
    if (!sessionId) return;

    const unsubscribe = onSnapshot(doc(db, "sessions", sessionId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as Omit<Session, 'id'>;
        setSession({ id: docSnap.id, ...data });
        
        // Update screen based on session status
        if (data.status === "waiting") {
          if (data.mode === "solo" && !data.players[playerId!]?.roleId) {
            setScreen("selecting_avatar");
          } else {
            setScreen("waiting");
          }
        }
        else if (data.status === "assigning_roles") setScreen("assigning_roles");
        else if (data.status === "shock_reveal") setScreen("shock_reveal");
        else if (data.status === "playing") setScreen("playing");
        else if (data.status === "revealing") setScreen("revealing");
        else if (data.status === "finished") setScreen("finished");
        
        if (data.score && data.mode === "solo") {
          setSoloHorizonId(data.score);
        }
      } else {
        setError("La sesión no existe.");
        setSessionId(null);
        setScreen("welcome");
      }
    }, (err) => {
      setError("Error de conexión: " + err.message);
    });

    return () => unsubscribe();
  }, [sessionId]);

  const createSession = async (mode: "solo" | "multi" = "multi") => {
    if (!playerId) return;
    setError(null);
    try {
      const initialPlayers: Record<string, PlayerState> = {
        [playerId]: {
          name: `Jugador 1`,
          isReady: false,
          roleId: ""
        }
      };

      if (mode === "solo") {
        initialPlayers["ai_1"] = { name: "AGENTE_ALPHA", isReady: true, roleId: "" };
        initialPlayers["ai_2"] = { name: "AGENTE_BETA", isReady: true, roleId: "" };
      }

      const docRef = await addDoc(collection(db, "sessions"), {
        status: "waiting",
        hostId: playerId,
        mode: mode,
        players: initialPlayers,
        createdAt: serverTimestamp()
      });
      setSessionId(docRef.id);
    } catch (err: any) {
      setError("Error al crear sesión: " + err.message);
    }
  };

  const joinSession = async (id: string) => {
    if (!playerId || !id.trim()) return;
    setError(null);
    try {
      const sessionRef = doc(db, "sessions", id.trim());
      const snap = await getDocFromServer(sessionRef);
      
      if (!snap.exists()) {
        setError("Sesión no encontrada.");
        return;
      }

      const data = snap.data() as Session;
      if (Object.keys(data.players).length >= 3) {
        setError("La sesión está llena.");
        return;
      }

      const playerIndex = Object.keys(data.players).length + 1;
      await updateDoc(sessionRef, {
        [`players.${playerId}`]: {
          name: `Jugador ${playerIndex}`,
          isReady: false,
          roleId: ""
        }
      });
      setSessionId(id.trim());
    } catch (err) {
      setError("Error al unirse: " + err.message);
    }
  };

  const selectAvatar = async (avatarId: string) => {
    if (!sessionId || !playerId) return;
    try {
      await updateDoc(doc(db, "sessions", sessionId), {
        [`players.${playerId}.roleId`]: avatarId
      });
    } catch (err: any) {
      setError("Error al seleccionar avatar: " + err.message);
    }
  };

  const assignRoles = async () => {
    if (!sessionId || !session) return;
    const playerIds = Object.keys(session.players);
    
    const updates: any = {
      status: "assigning_roles"
    };

    if (session.mode === "solo") {
      // In solo mode, the user already selected their avatar.
      // We just need to assign roles to the AI agents.
      const aiIds = playerIds.filter(id => id.startsWith("ai_"));
      const availableRoles = ROLES.filter(r => r.id !== session.players[playerId!]?.roleId);
      aiIds.forEach((id, index) => {
        updates[`players.${id}.roleId`] = availableRoles[index % availableRoles.length].id;
      });
    } else {
      const shuffledRoles = [...ROLES].sort(() => Math.random() - 0.5);
      playerIds.forEach((id, index) => {
        updates[`players.${id}.roleId`] = shuffledRoles[index % shuffledRoles.length].id;
      });
    }

    try {
      await updateDoc(doc(db, "sessions", sessionId), updates);
      
      // If solo mode, auto-transition to shock reveal quickly
      if (session.mode === "solo") {
        setTimeout(() => startShockReveal(), 2000);
      }
    } catch (err) {
      console.error("Error assigning roles:", err);
    }
  };

  const startShockReveal = async () => {
    if (!sessionId) return;
    const shockIds = Object.keys(DISRUPCIONES).map(Number);
    const randomShockId = shockIds[Math.floor(Math.random() * shockIds.length)];
    
    try {
      await updateDoc(doc(db, "sessions", sessionId), {
        status: "shock_reveal",
        shockId: randomShockId
      });
      
      // Auto-transition to playing after 6 seconds of reveal
      setTimeout(async () => {
        await updateDoc(doc(db, "sessions", sessionId), {
          status: "playing"
        });
      }, 6000);
    } catch (err) {
      console.error("Error starting shock reveal:", err);
    }
  };

  const makeChoice = async (choiceIndex: number) => {
    if (!sessionId || !playerId || !session) return;
    try {
      const updates: any = {
        [`players.${playerId}.choice`]: choiceIndex,
        [`players.${playerId}.isReady`]: true
      };

      if (session.mode === "solo") {
        // In solo mode, the choice directly determines one of the 9 horizons
        // We'll use a simple mapping or just pick one based on the choice and some randomness
        const horizonId = (choiceIndex * 2) + Math.floor(Math.random() * 2) + 1;
        updates["score"] = horizonId; // We reuse the score field for the horizon ID in solo mode
        updates["status"] = "revealing";
      }

      await updateDoc(doc(db, "sessions", sessionId), updates);
    } catch (err: any) {
      setError("Error al guardar elección: " + err.message);
    }
  };

  // Check if all players have made a choice
  useEffect(() => {
    if (!session || session.status !== "playing" || !sessionId) return;
    
    const playerIds = Object.keys(session.players);
    if (playerIds.length === 3) {
      const allChosen = playerIds.every(id => session.players[id].choice !== undefined);
      if (allChosen) {
        // Calculate score based on agreement
        const choices = playerIds.map(id => session.players[id].choice);
        const uniqueChoices = new Set(choices).size;
        let score = 10;
        if (uniqueChoices === 1) score = 30; // Perfect agreement
        else if (uniqueChoices === 2) score = 20; // Some agreement
        
        updateDoc(doc(db, "sessions", sessionId), {
          status: "revealing",
          score: score
        });
      }
    }
  }, [session, sessionId]);

  const finishGame = async () => {
    if (!sessionId) return;
    await updateDoc(doc(db, "sessions", sessionId), {
      status: "finished"
    });
  };

  const reset = () => {
    setSessionId(null);
    setSession(null);
    setScreen("welcome");
    setJoinId("");
    setLevel2Investments({});
    setLevel2Future(null);
    setLevel2SelectedComponents([]);
  };

  const copyId = () => {
    if (!sessionId) return;
    navigator.clipboard.writeText(sessionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const playerState = playerId && session ? session.players[playerId] : null;
  const currentDisruption = session?.shockId ? DISRUPCIONES[session.shockId] : null;
  
  // Robust host detection: use hostId or fallback to the first player in the list
  const isHost = session && (
    session.hostId === playerId || 
    Object.keys(session.players)[0] === playerId
  );

  // Auto-start game when 3 players join (or immediately in solo mode)
  useEffect(() => {
    if (isHost && session?.status === "waiting") {
      const playerCount = Object.keys(session.players).length;
      if (session.mode === "solo" || playerCount === 3) {
        console.log("Starting protocol...");
        const timer = setTimeout(() => {
          assignRoles();
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [session?.players, session?.status, isHost, sessionId, session?.mode]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      if (!isMuted && screen !== "welcome") {
        audioRef.current.play().catch(() => {
          console.log("Audio playback blocked by browser");
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted, screen]);

  const toggleMute = () => setIsMuted(!isMuted);

  const calculateLevel2Future = () => {
    let scores = { F1: 0, F2: 0, F3: 0 };

    // Base affinity
    ELEMENTOS.forEach(el => {
      const points = level2Investments[el.id] || 0;
      scores.F1 += el.f1 * points;
      scores.F2 += el.f2 * points;
      scores.F3 += el.f3 * points;
    });

    // Synergies
    SINERGIAS.forEach(s => {
      if ((level2Investments[s.a] || 0) > 0 && (level2Investments[s.b] || 0) > 0) {
        if (s.futuro === "F2F3") {
          scores.F2 += s.bono;
          scores.F3 += s.bono;
        } else {
          scores[s.futuro] += s.bono;
        }
      }
    });

    // Conflicts
    CONFLICTOS.forEach(c => {
      if (c.condA(level2Investments[c.a] || 0) && c.condB(level2Investments[c.b] || 0)) {
        scores[c.futuro] += c.penaliza;
      }
    });

    // Determine winner
    let winner: "F1" | "F2" | "F3" = "F1";
    if (scores.F2 > scores[winner]) winner = "F2";
    if (scores.F3 > scores[winner]) winner = "F3";
    // Priority F1 > F2 > F3 is handled by the order of checks if equal

    setLevel2Future(FUTUROS[winner]);
    setScreen("level2_result");
  };

  const totalInvestmentPoints = (Object.values(level2Investments) as number[]).reduce((acc: number, val: number) => acc + val, 0);
  const totalInvestmentCost = ELEMENTOS.reduce((acc: number, el) => acc + (level2Investments[el.id] || 0) * el.costo, 0);

  return (
    <div className="min-h-screen bg-[#050505] flex justify-center items-start overflow-x-hidden font-['Advent_Pro'] relative text-white">
      {/* Cybertropical Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-neon-pink/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-neon-yellow/10 rounded-full blur-[100px]" />
        
        {/* Abstract tropical leaves (simplified with CSS) */}
        <div className="absolute top-10 left-10 w-40 h-80 border-l-4 border-neon-cyan/30 rounded-full rotate-45 transform skew-x-12" />
        <div className="absolute bottom-20 right-10 w-60 h-40 border-b-4 border-neon-pink/30 rounded-full -rotate-12 transform skew-y-6" />
      </div>

      <audio 
        ref={audioRef} 
        src={screen === "welcome" ? "https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a73456.mp3" : "https://cdn.pixabay.com/audio/2022/03/24/audio_7e641e19d9.mp3"} 
        loop 
        playsInline 
      />
      {/* Note: distopic.mp3 is optional and not provided in the initial assets */}

      {/* Mute Toggle */}
      <button 
        onClick={toggleMute}
        className="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-surface-dark/80 backdrop-blur-md border border-neon-cyan/30 text-neon-cyan hover:text-white hover:bg-neon-cyan/20 transition-all active:scale-95 shadow-[0_0_10px_rgba(0,243,255,0.2)]"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      <div className="w-full max-w-[420px] min-h-screen flex flex-col relative bg-[#0d0d0d] border-x border-neon-pink/20 shadow-[0_0_50px_rgba(255,0,85,0.1)]">
        
        {error && (
          <div className="absolute top-20 left-4 right-4 z-50 bg-neon-pink/20 border border-neon-pink p-3 text-neon-pink text-xs font-bold uppercase animate-in fade-in slide-in-from-top-2">
            <div className="flex justify-between items-start">
              <span>&gt; ERROR: {error}</span>
              <button onClick={() => setError(null)} className="underline hover:text-white transition-colors">Cerrar</button>
            </div>
          </div>
        )}

        {/* Level 2 Intro Screen */}
        <ScreenWrapper isVisible={screen === "level2_intro"}>
          <div className="flex-1 flex flex-col justify-center relative">
            {/* Tropical accent image */}
            <div className="absolute -top-10 -right-10 w-32 h-32 opacity-30 rotate-12">
              <img src="https://picsum.photos/seed/tropical-leaf/200/200" alt="Leaf" className="w-full h-full object-contain filter hue-rotate-90" referrerPolicy="no-referrer" />
            </div>

            <span className="text-[10px] text-neon-yellow tracking-[0.3em] uppercase font-bold mb-4 animate-pulse">
              [ PROTOCOLO NIVEL 2 ]
            </span>
            <h1 className="text-5xl font-black leading-none mb-6 cyberpunk italic text-white">
              CONSTRUYE EL<br /><span className="text-neon-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">PAÍS 2077</span>
            </h1>
            <div className="space-y-4 mb-8 text-sm leading-relaxed italic text-white/80 border-l-4 border-neon-yellow bg-gradient-to-r from-neon-yellow/10 to-transparent p-4 backdrop-blur-sm">
              <p>Tienes <span className="text-neon-yellow font-bold">10 puntos de inversión</span> para diseñar el futuro.</p>
              <p>¿Cooperativas digitales? ¿Educación con IA? ¿Energías limpias?</p>
              <p>Tus elecciones activan sinergias, pero también conflictos. El futuro depende de tu estrategia.</p>
            </div>
            <Button onClick={() => setScreen("level2_investment")} className="bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-yellow text-bg-dark font-black hover:scale-105 transition-transform">
              COMENZAR INVERSIÓN →
            </Button>
            <button onClick={reset} className="mt-4 text-[10px] text-white/40 uppercase font-bold hover:text-white transition-colors">
              VOLVER AL INICIO
            </button>
          </div>
        </ScreenWrapper>

        {/* Level 2 Investment Screen */}
        <ScreenWrapper isVisible={screen === "level2_investment"}>
          <ProgressBar step={1} totalSteps={3} label="FASE DE INVERSIÓN" />
          
          <div className="flex justify-between items-end mb-6 bg-surface-dark p-4 border-b-2 border-neon-yellow">
            <div>
              <div className="text-[10px] font-black text-neon-yellow uppercase mb-1">PUNTOS DISPONIBLES</div>
              <div className="text-3xl font-black text-white">{10 - totalInvestmentPoints}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-black text-neon-cyan uppercase mb-1">COSTO TOTAL</div>
              <div className="text-xl font-black text-white">{totalInvestmentCost} <span className="text-[10px] text-neon-cyan">CRÉDITOS</span></div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-6">
            {ELEMENTOS.map(el => {
              const points = level2Investments[el.id] || 0;
              return (
                <div key={el.id} className={`p-3 border-2 transition-all ${points > 0 ? "border-neon-cyan bg-neon-cyan/5" : "border-white/10 bg-surface-dark/50"}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="text-xs font-black uppercase text-white leading-tight">{el.nombre}</h4>
                      <div className="text-[9px] text-neon-cyan font-bold uppercase mt-1">COSTO: {el.costo} PUNTOS</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          if (points > 0) {
                            setLevel2Investments({ ...level2Investments, [el.id]: points - 1 });
                          }
                        }}
                        className="w-6 h-6 flex items-center justify-center bg-white/10 hover:bg-neon-pink text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-black text-neon-yellow">{points}</span>
                      <button 
                        onClick={() => {
                          if (points < 3 && totalInvestmentPoints < 10) {
                            setLevel2Investments({ ...level2Investments, [el.id]: points + 1 });
                          }
                        }}
                        className="w-6 h-6 flex items-center justify-center bg-white/10 hover:bg-neon-cyan text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Button 
            disabled={totalInvestmentPoints === 0}
            onClick={calculateLevel2Future}
            className={totalInvestmentPoints === 10 ? "shadow-[0_0_20px_rgba(0,243,255,0.5)]" : "opacity-50"}
          >
            GENERAR FUTURO →
          </Button>
        </ScreenWrapper>

        {/* Level 2 Result Screen */}
        <ScreenWrapper isVisible={screen === "level2_result"}>
          <ProgressBar step={2} totalSteps={3} label="FUTURO DETERMINADO" />
          
          <div className="flex-1 flex flex-col justify-center text-center">
            <div className="mb-8 animate-in fade-in zoom-in duration-1000">
              <span className="text-[10px] text-neon-pink uppercase tracking-[0.4em] font-black mb-4 block">TU VISIÓN HA CREADO:</span>
              <h2 className="text-4xl font-black text-white italic cyberpunk uppercase leading-none mb-6">
                {level2Future?.nombre}
              </h2>
              <div className="w-24 h-1 bg-neon-cyan mx-auto mb-6" />
              <p className="text-sm text-white/80 leading-relaxed italic bg-surface-dark p-6 border-2 border-neon-cyan shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                {level2Future?.descripcion}
              </p>
            </div>

            <Button onClick={() => setScreen("level2_initiative")}>
              DEFINIR INICIATIVA →
            </Button>
          </div>
        </ScreenWrapper>

        {/* Level 2 Initiative Screen */}
        <ScreenWrapper isVisible={screen === "level2_initiative"}>
          <ProgressBar step={2} totalSteps={3} label="DISEÑO DE INICIATIVA" />
          
          <div className="mb-6">
            <h3 className="text-sm font-black text-neon-yellow uppercase tracking-widest mb-1">SELECCIONA 3 COMPONENTES</h3>
            <p className="text-[10px] text-white/40 uppercase font-bold italic">Define el impacto real de tu visión</p>
          </div>

          <div className="flex-1 space-y-3 mb-8">
            {level2Future?.componentes.map(comp => {
              const isSelected = level2SelectedComponents.includes(comp.id);
              return (
                <button
                  key={comp.id}
                  onClick={() => {
                    if (isSelected) {
                      setLevel2SelectedComponents(level2SelectedComponents.filter(id => id !== comp.id));
                    } else if (level2SelectedComponents.length < 3) {
                      setLevel2SelectedComponents([...level2SelectedComponents, comp.id]);
                    }
                  }}
                  className={`w-full p-4 text-left border-2 transition-all relative group ${
                    isSelected ? "border-neon-pink bg-neon-pink/10" : "border-white/10 bg-surface-dark/50 hover:border-white/30"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-black uppercase italic ${isSelected ? "text-white" : "text-white/60"}`}>
                      {comp.nombre}
                    </span>
                    {isSelected && <CheckCircle2 size={16} className="text-neon-pink" />}
                  </div>
                </button>
              );
            })}
          </div>

          <Button 
            disabled={level2SelectedComponents.length !== 3}
            onClick={() => setScreen("level2_evaluation")}
            className={level2SelectedComponents.length === 3 ? "shadow-[0_0_20px_rgba(255,0,85,0.4)]" : "opacity-50"}
          >
            EVALUAR IMPACTO →
          </Button>
        </ScreenWrapper>

        {/* Level 2 Evaluation Screen */}
        <ScreenWrapper isVisible={screen === "level2_evaluation"}>
          <ProgressBar step={3} totalSteps={3} label="EVALUACIÓN FINAL" />
          
          <div className="flex-1 flex flex-col justify-center">
            {(() => {
              const totalRelevance = level2SelectedComponents.reduce((acc, id) => {
                const comp = level2Future?.componentes.find(c => c.id === id);
                return acc + (comp?.relevancia || 0);
              }, 0);

              let level = "Básica";
              let impactDesc = "impacto limitado";
              if (totalRelevance > 8) {
                level = "Transformadora";
                impactDesc = "alto impacto";
              } else if (totalRelevance >= 6) {
                level = "Sólida";
                impactDesc = "buen potencial";
              }

              return (
                <div className="text-center">
                  <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="text-[10px] text-neon-cyan uppercase tracking-[0.4em] font-black mb-4 block">TU INICIATIVA ES:</span>
                    <h2 className={`text-5xl font-black italic cyberpunk uppercase leading-none mb-4 ${
                      level === "Transformadora" ? "text-neon-yellow" : 
                      level === "Sólida" ? "text-neon-cyan" : "text-neon-pink"
                    }`}>
                      {level}
                    </h2>
                    <div className="w-24 h-1 bg-white/20 mx-auto mb-8" />
                    <p className="text-lg text-white font-bold leading-relaxed italic uppercase tracking-tight">
                      "Con estos componentes, el impacto en el futuro <span className="text-neon-cyan">{level2Future?.nombre}</span> será <span className="text-neon-yellow underline underline-offset-4 decoration-2">{impactDesc}</span>."
                    </p>
                  </div>

                  <div className="bg-surface-dark border-2 border-neon-cyan p-6 mb-10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-neon-cyan animate-pulse" />
                    <p className="text-xs text-white/60 font-bold mb-4 uppercase italic">¿Construirás un futuro justo o dejarás que otros decidan por ti?</p>
                    <Button onClick={reset} variant="secondary">
                      REINICIAR PROTOCOLO
                    </Button>
                  </div>
                </div>
              );
            })()}
          </div>
        </ScreenWrapper>

        {/* Welcome Screen */}
        <ScreenWrapper isVisible={screen === "welcome"}>
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-[10px] text-neon-cyan tracking-[0.3em] uppercase font-bold mb-4 animate-pulse">
              [ CONECTIVIDAD SIGNIFICATIVA ]
            </span>
            <h1 className="text-5xl font-black leading-none mb-6 cyberpunk italic">
              HACKEA LA<br /><span className="text-neon-yellow">DISRUPCIÓN</span>
            </h1>
            <p className="cyberpunk leading-relaxed mb-8 border-l-4 border-neon-pink bg-surface-dark/50 p-2">
              ¿La transformación digital te deja atrás?<br /><br />
              Reúne a <span className="text-neon-yellow font-bold underline">3 personas</span> para enfrentar una crisis digital desde distintos roles.
            </p>
            
            <div className="space-y-4">
              <Button onClick={() => setScreen("level2_intro")} className="bg-gradient-to-r from-neon-cyan to-neon-yellow text-bg-dark hover:from-white hover:to-white shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                NIVEL 2: CONSTRUYE EL 2077 →
              </Button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-neon-cyan/10"></span></div>
                <div className="relative flex justify-center text-[8px] uppercase font-bold"><span className="bg-[#0d0d0d] px-2 text-neon-cyan/20">O JUEGA EL NIVEL 1</span></div>
              </div>

              <Button onClick={() => createSession("solo")} className="bg-neon-yellow/10 border-neon-yellow text-neon-yellow hover:bg-neon-yellow hover:text-bg-dark">
                MODO SOLITARIO (1 JUGADOR) →
              </Button>
              
              <Button onClick={() => createSession("multi")} variant="secondary">
                MODO MULTIJUGADOR (3 JUGADORES) →
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-neon-cyan/20"></span></div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold"><span className="bg-[#0d0d0d] px-2 text-neon-cyan/40">O ÚNETE A UNA</span></div>
              </div>

              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={joinId}
                  onChange={(e) => setJoinId(e.target.value)}
                  placeholder="ID DE SESIÓN"
                  className="flex-1 bg-surface-dark border border-neon-cyan/30 p-3 text-neon-cyan font-bold placeholder:text-neon-cyan/20 focus:border-neon-cyan outline-none text-sm"
                />
                <button 
                  onClick={() => joinSession(joinId)}
                  className="bg-neon-cyan text-bg-dark px-4 font-black text-xs uppercase hover:bg-white transition-colors"
                >
                  UNIRSE
                </button>
              </div>

              <button 
                onClick={() => setShowInstructions(true)}
                className="w-full py-3 text-[10px] font-black uppercase tracking-[0.2em] text-neon-cyan/60 hover:text-neon-cyan transition-colors border border-neon-cyan/10 hover:border-neon-cyan/30 mt-4"
              >
                [ CÓMO JUGAR ]
              </button>

              <div className="mt-12 text-center opacity-30">
                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-neon-cyan leading-loose">
                  Inspirado por ITC - ILO & Panopticon<br />
                  Todos los derechos reservados
                </p>
              </div>
            </div>
          </div>

          {/* Instructions Overlay */}
          {showInstructions && (
            <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl p-8 flex flex-col animate-in fade-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black cyberpunk italic text-neon-yellow uppercase">PROTOCOLO DE JUEGO</h3>
                <button onClick={() => setShowInstructions(false)} className="text-neon-pink hover:text-white transition-colors">
                  <ChevronLeft size={32} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-8 pr-2">
                <section>
                  <div className="text-neon-cyan text-[10px] font-black uppercase mb-2 tracking-widest">01. EL EQUIPO</div>
                  <p className="text-sm text-white/80 leading-relaxed italic">
                    Este es un juego para <span className="text-neon-yellow font-bold">3 participantes</span>. Puedes jugar en <span className="text-neon-yellow font-bold">Modo Solitario</span> (con agentes IA) o en <span className="text-neon-yellow font-bold">Modo Multijugador</span> conectando 3 dispositivos al mismo ID.
                  </p>
                </section>

                <section>
                  <div className="text-neon-cyan text-[10px] font-black uppercase mb-2 tracking-widest">02. IDENTIDAD ASIGNADA</div>
                  <p className="text-sm text-white/80 leading-relaxed italic">
                    Al iniciar, el sistema te asignará un <span className="text-neon-yellow font-bold">Rol</span> (Empleado, Emprendedor, Funcionario, etc.). Deberás tomar decisiones pensando en los intereses y valores de ese rol.
                  </p>
                </section>

                <section>
                  <div className="text-neon-cyan text-[10px] font-black uppercase mb-2 tracking-widest">03. EL SHOCK</div>
                  <p className="text-sm text-white/80 leading-relaxed italic">
                    Una crisis digital aleatoria golpeará el sistema. Lee atentamente la disrupción y prepárate para actuar.
                  </p>
                </section>

                <section>
                  <div className="text-neon-cyan text-[10px] font-black uppercase mb-2 tracking-widest">04. DECISIÓN CRÍTICA</div>
                  <p className="text-sm text-white/80 leading-relaxed italic">
                    Tendrás 3 opciones. Tu elección afectará la <span className="text-neon-yellow font-bold">Resiliencia Colectiva</span>. ¿Priorizarás el bien común o tu propio sector?
                  </p>
                </section>

                <section>
                  <div className="text-neon-cyan text-[10px] font-black uppercase mb-2 tracking-widest">05. REVELACIÓN</div>
                  <p className="text-sm text-white/80 leading-relaxed italic">
                    Al final, verás cómo las decisiones del grupo impactaron el sistema y conocerás un <span className="text-neon-yellow font-bold">caso real</span> similar al shock que enfrentaste.
                  </p>
                </section>
              </div>

              <Button onClick={() => setShowInstructions(false)} className="mt-8">
                ENTENDIDO, VOLVER →
              </Button>

              <div className="mt-8 pt-6 border-t border-neon-cyan/10 text-center">
                <p className="text-[9px] text-neon-cyan/40 font-bold uppercase tracking-widest leading-relaxed">
                  Inspirado en el trabajo de <span className="text-neon-cyan/60">ITC - ILO</span> y <span className="text-neon-cyan/60">Panopticon</span><br />
                  © Todos los derechos reservados
                </p>
              </div>
            </div>
          )}
        </ScreenWrapper>

        {/* Selecting Avatar Screen (Solo Mode) */}
        <ScreenWrapper isVisible={screen === "selecting_avatar"}>
          <ProgressBar step={1} totalSteps={6} label="Paso 1 de 6 · Selección de Avatar" />
          <div className="flex-1 flex flex-col">
            <h2 className="text-2xl font-black mb-4 cyberpunk italic uppercase tracking-tighter">
              ELIGE TU IDENTIDAD
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {SOLO_AVATARS.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => selectAvatar(avatar.id)}
                  className="group relative aspect-[2/3] overflow-hidden border-2 border-neon-cyan/30 hover:border-neon-cyan transition-all"
                >
                  <img 
                    src={avatar.image} 
                    alt={avatar.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                    <div className="text-[10px] font-black text-neon-cyan uppercase mb-1">{avatar.name}</div>
                    <div className="text-[8px] text-white/60 leading-tight line-clamp-2">{avatar.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </ScreenWrapper>

        {/* Waiting Screen */}
        <ScreenWrapper isVisible={screen === "waiting"}>
          <ProgressBar step={1} totalSteps={6} label={session?.mode === "solo" ? "Inicializando agentes..." : "Esperando jugadores..."} />
          <div className="flex-1 flex flex-col justify-center text-center">
            <div className="mb-8">
              <div className="text-[10px] text-neon-cyan uppercase font-bold mb-2">ID DE SESIÓN</div>
              <div className="flex items-center justify-center gap-2 bg-surface-dark p-4 border border-neon-cyan/30 group cursor-pointer" onClick={copyId}>
                <code className="text-xl font-black text-neon-yellow tracking-widest">{sessionId}</code>
                {copied ? <Check size={18} className="text-neon-cyan" /> : <Copy size={18} className="text-neon-cyan/40 group-hover:text-neon-cyan" />}
              </div>
              <p className="text-[10px] text-neon-cyan/40 mt-2">
                {session?.mode === "solo" ? "Protocolo individual activado" : "Comparte este ID con los otros 2 jugadores"}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {Array.from({ length: 3 }).map((_, i) => {
                const players = session ? Object.values(session.players) as PlayerState[] : [];
                const p = players[i];
                return (
                  <div key={i} className={`p-4 border-2 flex items-center gap-4 transition-all ${p ? "border-neon-cyan bg-neon-cyan/10" : "border-dashed border-neon-cyan/20 opacity-40"}`}>
                    <div className={`w-10 h-10 rounded-none flex items-center justify-center ${p ? "bg-neon-cyan text-bg-dark" : "bg-surface-dark text-neon-cyan/20"}`}>
                      <User size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-black uppercase italic text-neon-cyan">{p ? p.name : "Esperando..."}</p>
                      <p className="text-[9px] font-mono text-neon-cyan/60">{p ? "CONECTADO" : "DISPONIBLE"}</p>
                    </div>
                    {p && <CheckCircle2 size={18} className="ml-auto text-neon-cyan animate-pulse" />}
                  </div>
                );
              })}
            </div>

            {isHost && Object.keys(session?.players || {}).length === 3 && (
              <div className="space-y-4 w-full">
                <div className="text-neon-yellow text-[10px] font-bold animate-pulse mb-2 uppercase tracking-tighter">
                  &gt; {session?.mode === "solo" ? "AGENTES LISTOS. INICIANDO..." : "TODOS LOS JUGADORES CONECTADOS. INICIANDO..."}
                </div>
                <Button onClick={assignRoles} className="shadow-[0_0_20px_rgba(255,255,0,0.3)]">
                  INICIAR PROTOCOLO AHORA →
                </Button>
              </div>
            )}
            {!isHost && Object.keys(session?.players || {}).length === 3 && (
              <p className="text-neon-yellow text-xs font-bold animate-pulse italic">
                &gt; EL ANFITRIÓN ESTÁ INICIANDO EL PROTOCOLO...
              </p>
            )}
          </div>
        </ScreenWrapper>

        {/* Assigning Roles Screen */}
        <ScreenWrapper isVisible={screen === "assigning_roles"}>
          <ProgressBar step={2} totalSteps={6} label="Paso 2 de 6 · Asignación de Roles" />
          <div className="flex-1 flex flex-col justify-center text-center">
            <h2 className="text-3xl font-black mb-8 cyberpunk uppercase italic tracking-tighter">
              IDENTIDAD ASIGNADA
            </h2>
            
            <div className="mb-12 p-8 bg-surface-dark border-2 border-neon-yellow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 bg-neon-yellow text-bg-dark text-[10px] font-bold uppercase">TU ROL</div>
              <h4 className="text-3xl font-black text-neon-yellow italic mb-4 uppercase tracking-tighter">
                {ROLES.find(r => r.id === playerState?.roleId)?.name}
              </h4>
              <p className="text-sm text-neon-cyan/80 leading-relaxed font-medium max-w-md mx-auto">
                {ROLES.find(r => r.id === playerState?.roleId)?.description}
              </p>
            </div>

            {isHost ? (
              <div className="space-y-4">
                <p className="text-neon-cyan text-xs font-bold animate-pulse uppercase">&gt; TODOS LOS ROLES ASIGNADOS</p>
                <Button onClick={startShockReveal} className="shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                  REVELAR SHOCK →
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Loader2 className="w-8 h-8 text-neon-cyan animate-spin mx-auto mb-2" />
                <p className="text-neon-cyan text-xs font-bold animate-pulse uppercase italic">
                  &gt; ESPERANDO QUE EL ANFITRIÓN REVELE EL SHOCK...
                </p>
              </div>
            )}
          </div>
        </ScreenWrapper>

        {/* Shock Reveal Screen (Full Screen) */}
        <ScreenWrapper isVisible={screen === "shock_reveal"}>
          <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 text-center overflow-hidden">
            {/* Background Glitch Effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-t from-neon-pink/20 via-transparent to-neon-cyan/20" />
            </div>

            {session?.mode === "solo" ? (
              <div className="relative z-10 w-full max-w-lg text-center animate-in fade-in zoom-in duration-700">
                <div className="mb-8 relative aspect-video overflow-hidden border-4 border-neon-cyan shadow-[0_0_30px_rgba(0,243,255,0.5)]">
                  <img 
                    src="https://picsum.photos/seed/cyberpunk-sky/800/450" 
                    alt="Sky Screen" 
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <div className="text-neon-pink text-[10px] font-black uppercase tracking-[0.4em] mb-4 animate-pulse">ALERTA_SISTEMA</div>
                    <h2 className="text-2xl font-black text-white italic cyberpunk uppercase leading-tight mb-4">
                      {currentDisruption?.titulo}
                    </h2>
                    <div className="w-24 h-1 bg-neon-cyan animate-pulse" />
                  </div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-neon-cyan/50 shadow-[0_0_15px_rgba(0,243,255,0.8)] animate-[scan_2s_linear_infinite]" />
                </div>
                <p className="text-neon-cyan text-xs font-bold uppercase tracking-widest animate-pulse italic">
                  &gt; ANALIZANDO IMPACTO EN EL SECTOR...
                </p>
              </div>
            ) : (
              <div className="relative z-10 max-w-3xl animate-in fade-in zoom-in duration-700">
                <div className={`inline-block px-4 py-1 mb-6 text-[12px] font-black uppercase tracking-[0.3em] bg-white text-black`}>
                  ALERTA DE DISRUPCIÓN: {currentDisruption?.tag}
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black text-white italic mb-8 uppercase leading-[0.9] tracking-tighter cyberpunk">
                  {currentDisruption?.titulo}
                </h1>

                <div className="flex items-center justify-center gap-4 mb-12">
                  <div className="h-[2px] w-12 bg-neon-cyan" />
                  <p className="text-neon-cyan font-black text-sm uppercase tracking-widest italic">
                    {currentDisruption?.sub}
                  </p>
                  <div className="h-[2px] w-12 bg-neon-cyan" />
                </div>

                <div className="text-neon-yellow text-xs font-bold animate-pulse uppercase tracking-widest">
                  &gt; PREPARANDO INTERFAZ DE DECISIÓN...
                </div>
              </div>
            )}

            {/* Scanning Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-cyan/50 shadow-[0_0_15px_rgba(0,243,255,0.8)] animate-[scan_3s_linear_infinite]" />
          </div>
        </ScreenWrapper>

        {/* Playing Screen */}
        <ScreenWrapper isVisible={screen === "playing"}>
          <ProgressBar step={3} totalSteps={6} label="Paso 3 de 6 · Toma de decisiones" />
          
          {session?.mode === "solo" ? (
            <div className="flex-1 flex flex-col">
              {/* Screen in the sky visual */}
              <div className="relative w-full aspect-video mb-6 overflow-hidden border-2 border-neon-cyan shadow-[0_0_20px_rgba(0,243,255,0.3)] bg-black">
                <img 
                  src="https://picsum.photos/seed/cyberpunk-city/800/450" 
                  alt="Sky Screen" 
                  className="w-full h-full object-cover opacity-40"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <div className="text-[8px] text-neon-pink font-black uppercase tracking-[0.2em] mb-2">TRANSMISIÓN_CRÍTICA</div>
                  <h3 className="text-sm font-black text-white uppercase italic leading-tight mb-2">
                    {currentDisruption?.titulo}
                  </h3>
                  <div className="w-12 h-[1px] bg-neon-cyan/50" />
                </div>
                {/* Scanning line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-neon-cyan/30 shadow-[0_0_10px_rgba(0,243,255,0.5)] animate-[scan_4s_linear_infinite]" />
              </div>

              <div className="mb-6 flex items-center gap-4">
                <div className="w-16 h-16 border border-neon-yellow overflow-hidden flex-shrink-0">
                  <img 
                    src={SOLO_AVATARS.find(a => a.id === playerState?.roleId)?.image} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="text-[10px] text-neon-yellow font-black uppercase tracking-widest mb-1">IDENTIDAD ACTIVA</div>
                  <div className="text-lg font-black text-white italic uppercase">{SOLO_AVATARS.find(a => a.id === playerState?.roleId)?.name}</div>
                </div>
              </div>

              <h2 className="text-xl font-bold mb-4 cyberpunk uppercase italic">¿Qué decides hacer?</h2>
              
              <div className="space-y-3 mb-8">
                {SOLO_ACCIONES.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => makeChoice(i)}
                    className="w-full p-4 text-left border-2 border-neon-cyan/20 bg-surface-dark text-neon-cyan/60 hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all relative group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center border border-neon-cyan/30 text-[10px] font-black">
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-sm font-black uppercase italic tracking-tight text-white group-hover:text-neon-cyan transition-colors">{opt.titulo}</div>
                        <div className="text-[9px] text-white/40 uppercase font-bold">{opt.sub}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 p-4 border-2 border-neon-pink bg-neon-pink/5">
                <span className="text-[9px] text-neon-pink font-bold uppercase tracking-widest block mb-1">ESCENARIO ACTUAL</span>
                <h3 className="text-lg font-black text-white italic leading-tight uppercase">{currentDisruption?.titulo}</h3>
              </div>

              <div className="mb-8 p-5 bg-surface-dark border-l-4 border-neon-yellow relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1 bg-neon-yellow text-bg-dark text-[8px] font-bold uppercase">TU ROL</div>
                <h4 className="text-xl font-black text-neon-yellow italic mb-2 uppercase">
                  {ROLES.find(r => r.id === playerState?.roleId)?.name}
                </h4>
                <p className="text-xs text-neon-cyan/80 leading-relaxed font-medium">
                  {ROLES.find(r => r.id === playerState?.roleId)?.description}
                </p>
              </div>

              <h2 className="text-xl font-bold mb-4 cyberpunk uppercase italic">¿Qué decides hacer?</h2>
              
              <div className="space-y-3 mb-8">
                {currentDisruption?.opciones.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => makeChoice(i)}
                    disabled={playerState?.choice !== undefined}
                    className={`w-full p-4 text-left border-2 transition-all relative group ${
                      playerState?.choice === i 
                        ? "border-neon-cyan bg-neon-cyan/10 text-white" 
                        : "border-neon-cyan/20 bg-surface-dark text-neon-cyan/60 hover:border-neon-cyan/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 flex items-center justify-center border ${playerState?.choice === i ? "bg-neon-cyan text-bg-dark border-neon-cyan" : "border-neon-cyan/30"}`}>
                        {i + 1}
                      </div>
                      <span className="text-sm font-bold uppercase italic tracking-tight">{opt}</span>
                    </div>
                    {playerState?.choice === i && <CheckCircle2 size={16} className="absolute top-2 right-2 text-neon-cyan" />}
                  </button>
                ))}
              </div>

              {playerState?.choice !== undefined && (
                <div className="text-center p-6 bg-surface-dark border border-dashed border-neon-cyan/30">
                  <Loader2 className="w-8 h-8 text-neon-cyan animate-spin mx-auto mb-3" />
                  <p className="text-xs font-bold text-neon-cyan uppercase tracking-widest animate-pulse">
                    ESPERANDO A LOS DEMÁS JUGADORES...
                  </p>
                  <div className="flex justify-center gap-2 mt-4">
                    {(Object.values(session?.players || {}) as PlayerState[]).map((p, i) => (
                      <div key={i} className={`w-2 h-2 ${p.choice !== undefined ? "bg-neon-cyan shadow-[0_0_5px_rgba(0,243,255,0.8)]" : "bg-white/10"}`} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </ScreenWrapper>

        {/* Revealing Screen */}
        <ScreenWrapper isVisible={screen === "revealing"}>
          <ProgressBar step={4} totalSteps={6} label="Paso 4 de 6 · Revelación" />
          
          {session?.mode === "solo" && soloHorizonId ? (
            <div className="flex-1 flex flex-col">
              <div className="text-center mb-8">
                <span className="text-[10px] text-neon-yellow uppercase tracking-widest font-black mb-1 block">HORIZONTE ALCANZADO</span>
                <h2 className={`text-4xl font-black italic cyberpunk mb-4 uppercase leading-none ${
                  HORIZONTES[soloHorizonId].color === 'hack-cyan' ? 'text-neon-cyan' : 
                  HORIZONTES[soloHorizonId].color === 'hack-pink' ? 'text-neon-pink' : 'text-neon-yellow'
                }`}>
                  {HORIZONTES[soloHorizonId].titulo}
                </h2>
                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />
                <p className="text-sm text-white/90 leading-relaxed italic bg-surface-dark p-6 border-l-4 border-neon-cyan">
                  {HORIZONTES[soloHorizonId].descripcion}
                </p>
              </div>

              <div className="bg-neon-yellow/10 border-2 border-neon-yellow p-5 mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-neon-yellow animate-pulse" />
                <span className="text-[10px] text-neon-yellow font-bold uppercase block mb-2 font-mono">ARCHIVO_REAL_DETECTADO</span>
                <p className="text-xs text-white font-medium leading-relaxed italic">
                  {TITULARES[`${session?.shockId}-1`] || "No hay titular disponible para esta combinación."}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <span className="text-[10px] text-neon-pink uppercase tracking-widest font-bold mb-1 block">RESILIENCIA COLECTIVA</span>
                <div className="text-6xl font-black text-neon-yellow italic cyberpunk mb-2">
                  {session?.score}<span className="text-2xl text-neon-cyan">PTS</span>
                </div>
                <p className="text-xs text-neon-cyan/60 uppercase font-bold">
                  {session?.score === 30 ? "UNANIMIDAD TOTAL: EL SISTEMA RESISTE" : 
                   session?.score === 20 ? "ACUERDO PARCIAL: FRAGMENTACIÓN DETECTADA" : 
                   "CAOS ABSOLUTO: EL SISTEMA COLAPSA"}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-sm font-black text-neon-cyan uppercase tracking-widest border-b border-neon-cyan/20 pb-1">DECISIONES DEL GRUPO</h3>
                {(Object.values(session?.players || {}) as PlayerState[]).map((p, i) => (
                  <div key={i} className="bg-surface-dark p-4 border-l-4 border-neon-pink relative">
                    <div className="text-[9px] text-neon-pink font-bold uppercase mb-1">{p.name} // {ROLES.find(r => r.id === p.roleId)?.name}</div>
                    <p className="text-sm font-bold text-white italic">"{currentDisruption?.opciones[p.choice!] || "Sin elección"}"</p>
                  </div>
                ))}
              </div>

              <div className="bg-neon-yellow/10 border-2 border-neon-yellow p-5 mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-neon-yellow animate-pulse" />
                <span className="text-[10px] text-neon-yellow font-bold uppercase block mb-2 font-mono">ARCHIVO_REAL_DETECTADO</span>
                <p className="text-xs text-white font-medium leading-relaxed italic">
                  {(() => {
                    const roleIndex = ROLES.findIndex(r => r.id === playerState?.roleId) + 1;
                    const key = `${session?.shockId}-${roleIndex}`;
                    return TITULARES[key] || TITULARES[`${session?.shockId}-1`] || "No hay titular disponible para esta combinación.";
                  })()}
                </p>
              </div>
            </>
          )}

          <Button onClick={finishGame}>
            CONTINUAR AL ANÁLISIS →
          </Button>
        </ScreenWrapper>

        {/* Finished Screen */}
        <ScreenWrapper isVisible={screen === "finished"}>
          <ProgressBar step={6} totalSteps={6} label="PROTOCOLO FINALIZADO" />
          
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-full bg-neon-cyan/20 border-2 border-neon-cyan flex items-center justify-center mx-auto mb-4 text-neon-cyan shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-3xl font-black cyberpunk italic text-white mb-2 uppercase">SISTEMA HACKEADO</h2>
              <p className="text-neon-cyan text-xs font-bold uppercase tracking-widest">HAS COMPLETADO LA SIMULACIÓN</p>
            </div>

            <div className="space-y-6 mb-10">
              <div className="p-5 bg-surface-dark border-2 border-neon-pink relative">
                <div className="absolute -top-3 left-4 bg-neon-pink px-2 text-[10px] font-black uppercase text-white">REFLEXIÓN_01</div>
                <p className="text-sm font-bold text-white leading-relaxed italic">
                  ¿Qué harías diferente si estuvieras realmente en ese rol?
                </p>
              </div>

              <div className="p-5 bg-surface-dark border-2 border-neon-yellow relative">
                <div className="absolute -top-3 left-4 bg-neon-yellow px-2 text-[10px] font-black uppercase text-bg-dark">REFLEXIÓN_02</div>
                <p className="text-sm font-bold text-white leading-relaxed italic">
                  ¿Cómo te preparas hoy para una disrupción similar en tu vida real?
                </p>
              </div>
            </div>

            <div className="bg-neon-cyan/10 border-2 border-neon-cyan p-6 text-center mb-8">
              <p className="text-xs text-white font-bold mb-4 leading-relaxed uppercase italic">
                EXPLORA MÁS SOBRE EL FUTURO DEL TRABAJO Y LA CONECTIVIDAD SIGNIFICATIVA
              </p>
              <a 
                href="https://conectividadsignificativa.co" 
                target="_blank" 
                className="text-lg font-black text-neon-yellow hover:text-white transition-all underline decoration-neon-yellow underline-offset-8 hover:decoration-white"
              >
                CONECTIVIDADSIGNIFICATIVA.CO →
              </a>
            </div>
          </div>

          <Button variant="secondary" onClick={reset}>
            VOLVER AL INICIO
          </Button>

          <div className="mt-8 text-center opacity-40">
            <p className="text-[9px] font-black uppercase tracking-widest text-neon-cyan">
              Inspirado en ITC - ILO y Panopticon<br />
              © Todos los derechos reservados
            </p>
          </div>
        </ScreenWrapper>

      </div>
    </div>
  );
}
