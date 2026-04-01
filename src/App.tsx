/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { 
  DISRUPCIONES, 
  TITULARES, 
  ROLES,
  type Disruption,
} from "./constants";
import { ScreenWrapper, ProgressBar, Button } from "./components/UI";
import { ChevronLeft, Zap, User, CheckCircle2, Loader2, Volume2, VolumeX, Copy, Check } from "lucide-react";
import { db, auth, signInAnonymously, onAuthStateChanged, collection, addDoc, updateDoc, onSnapshot, serverTimestamp, doc, getDocFromServer, GoogleAuthProvider, signInWithPopup } from "./firebase";

type Screen = "welcome" | "waiting" | "selecting_shock" | "playing" | "revealing" | "finished";

interface PlayerState {
  roleId: string;
  choice?: number;
  name: string;
  isReady: boolean;
}

interface Session {
  id: string;
  status: "waiting" | "selecting_shock" | "playing" | "revealing" | "finished";
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
  const [isMuted, setIsMuted] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joinId, setJoinId] = useState("");
  const [copied, setCopied] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const retryAuth = () => {
    setError(null);
    signInWithGoogle();
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setError(null);
    } catch (err: any) {
      console.error("Google Auth error:", err);
      setError("Error de autenticación con Google: " + err.message);
    }
  };

  // Auth initialization
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setPlayerId(user.uid);
        setError(null);
      } else {
        // We don't sign in automatically with Google to avoid popups on load
        // But we clear the player ID
        setPlayerId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Session synchronization
  useEffect(() => {
    if (!sessionId) return;

    const unsubscribe = onSnapshot(doc(db, "sessions", sessionId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as Omit<Session, 'id'>;
        setSession({ id: docSnap.id, ...data });
        
        // Update screen based on session status
        if (data.status === "waiting") setScreen("waiting");
        else if (data.status === "selecting_shock") setScreen("selecting_shock");
        else if (data.status === "playing") setScreen("playing");
        else if (data.status === "revealing") setScreen("revealing");
        else if (data.status === "finished") setScreen("finished");
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

  const createSession = async () => {
    if (!playerId) return;
    setError(null);
    try {
      const docRef = await addDoc(collection(db, "sessions"), {
        status: "waiting",
        players: {
          [playerId]: {
            name: `Jugador 1`,
            isReady: false,
            roleId: ""
          }
        },
        createdAt: serverTimestamp()
      });
      setSessionId(docRef.id);
    } catch (err) {
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

  const startShockSelection = async () => {
    if (!sessionId || !session) return;
    try {
      await updateDoc(doc(db, "sessions", sessionId), {
        status: "selecting_shock"
      });
    } catch (err) {
      setError("Error al iniciar selección: " + err.message);
    }
  };

  const selectShock = async (shockId: number) => {
    if (!sessionId || !session) return;
    try {
      // Assign random roles to players
      const shuffledRoles = [...ROLES].sort(() => 0.5 - Math.random());
      const playerIds = Object.keys(session.players);
      const updates: any = {
        status: "playing",
        shockId: shockId
      };
      
      playerIds.forEach((id, index) => {
        updates[`players.${id}.roleId`] = shuffledRoles[index].id;
      });

      await updateDoc(doc(db, "sessions", sessionId), updates);
    } catch (err) {
      setError("Error al seleccionar shock: " + err.message);
    }
  };

  const makeChoice = async (choiceIndex: number) => {
    if (!sessionId || !playerId) return;
    try {
      await updateDoc(doc(db, "sessions", sessionId), {
        [`players.${playerId}.choice`]: choiceIndex,
        [`players.${playerId}.isReady`]: true
      });
    } catch (err) {
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
  };

  const copyId = () => {
    if (!sessionId) return;
    navigator.clipboard.writeText(sessionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const playerState = playerId && session ? session.players[playerId] : null;
  const currentDisruption = session?.shockId ? DISRUPCIONES[session.shockId] : null;
  const isHost = session && Object.keys(session.players)[0] === playerId;

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <div className="min-h-screen bg-[#050505] flex justify-center items-start overflow-x-hidden font-['Advent_Pro'] relative text-white">
      <audio ref={audioRef} src="distopic.mp3" loop playsInline />
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
              <div className="flex gap-3">
                {error.includes("autenticación") && (
                  <button onClick={retryAuth} className="underline hover:text-white transition-colors">Reintentar</button>
                )}
                <button onClick={() => setError(null)} className="underline hover:text-white transition-colors">Cerrar</button>
              </div>
            </div>
          </div>
        )}

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
              El futuro del trabajo ya llegó — y no pidió permiso.<br /><br />
              Reúne a <span className="text-neon-yellow font-bold underline">3 personas</span> para enfrentar una crisis digital desde distintos roles.
            </p>
            
            <div className="space-y-4">
              {!playerId ? (
                <Button onClick={signInWithGoogle} className="bg-white text-bg-dark hover:bg-neon-cyan">
                  INICIAR SESIÓN CON GOOGLE →
                </Button>
              ) : (
                <>
                  <Button onClick={createSession}>
                    CREAR NUEVA SESIÓN →
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
                </>
              )}
            </div>
          </div>
        </ScreenWrapper>

        {/* Waiting Screen */}
        <ScreenWrapper isVisible={screen === "waiting"}>
          <ProgressBar step={1} totalSteps={5} label="Esperando jugadores..." />
          <div className="flex-1 flex flex-col justify-center text-center">
            <div className="mb-8">
              <div className="text-[10px] text-neon-cyan uppercase font-bold mb-2">ID DE SESIÓN</div>
              <div className="flex items-center justify-center gap-2 bg-surface-dark p-4 border border-neon-cyan/30 group cursor-pointer" onClick={copyId}>
                <code className="text-xl font-black text-neon-yellow tracking-widest">{sessionId}</code>
                {copied ? <Check size={18} className="text-neon-cyan" /> : <Copy size={18} className="text-neon-cyan/40 group-hover:text-neon-cyan" />}
              </div>
              <p className="text-[10px] text-neon-cyan/40 mt-2">Comparte este ID con los otros 2 jugadores</p>
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
              <Button onClick={startShockSelection} className="animate-bounce">
                INICIAR JUEGO →
              </Button>
            )}
            {!isHost && Object.keys(session?.players || {}).length === 3 && (
              <p className="text-neon-yellow text-xs font-bold animate-pulse italic">
                &gt; EL ANFITRIÓN ESTÁ INICIANDO EL PROTOCOLO...
              </p>
            )}
          </div>
        </ScreenWrapper>

        {/* Selecting Shock Screen */}
        <ScreenWrapper isVisible={screen === "selecting_shock"}>
          <ProgressBar step={2} totalSteps={5} label="Paso 2 de 5 · Elección del Shock" />
          {isHost ? (
            <>
              <h2 className="text-2xl font-bold mb-2 cyberpunk">Elige la carta del desastre</h2>
              <p className="text-neon-cyan/70 text-xs uppercase tracking-widest mb-6 font-bold">&gt; SELECCIONA EL ESCENARIO PARA EL GRUPO</p>
              <div className="space-y-3 mb-8">
                {Object.values(DISRUPCIONES).map((d) => (
                  <button
                    key={d.id}
                    onClick={() => selectShock(d.id)}
                    className="w-full p-4 text-left border-2 border-neon-pink/30 bg-surface-dark hover:border-neon-pink hover:bg-neon-pink/10 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-1 bg-neon-pink/20 text-[8px] font-bold text-neon-pink uppercase">{d.tag}</div>
                    <span className="block text-sm font-black text-neon-yellow mb-1 group-hover:text-white transition-colors uppercase italic">{d.titulo}</span>
                    <span className="block text-[11px] text-neon-cyan/60 font-medium">{d.sub}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col justify-center text-center">
              <Loader2 className="w-12 h-12 text-neon-pink animate-spin mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4 cyberpunk uppercase italic">EL ANFITRIÓN ESTÁ ELIGIENDO EL SHOCK...</h2>
              <p className="text-neon-cyan/60 text-sm italic">Prepárate para tu rol.</p>
            </div>
          )}
        </ScreenWrapper>

        {/* Playing Screen */}
        <ScreenWrapper isVisible={screen === "playing"}>
          <ProgressBar step={3} totalSteps={5} label="Paso 3 de 5 · Toma de decisiones" />
          
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
        </ScreenWrapper>

        {/* Revealing Screen */}
        <ScreenWrapper isVisible={screen === "revealing"}>
          <ProgressBar step={4} totalSteps={5} label="Paso 4 de 5 · Revelación" />
          
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

          <Button onClick={finishGame}>
            CONTINUAR AL ANÁLISIS →
          </Button>
        </ScreenWrapper>

        {/* Finished Screen */}
        <ScreenWrapper isVisible={screen === "finished"}>
          <ProgressBar step={5} totalSteps={5} label="PROTOCOLO FINALIZADO" />
          
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
        </ScreenWrapper>

      </div>
    </div>
  );
}
