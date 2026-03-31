/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

console.log("App.tsx: module load - grayscale update");
import { useState, useEffect, useRef } from "react";
import { 
  DISRUPCIONES, 
  TITULARES, 
  AI_IMPACTO, 
  CADENAS, 
  SPARKS, 
  FINALES,
  type Disruption,
  type FinalResult
} from "./constants";
import { ScreenWrapper, ProgressBar, Button } from "./components/UI";
import { ChevronLeft, Zap, Shield, Brain, Wallet, User, Users, CheckCircle2, Globe, Loader2, Volume2, VolumeX } from "lucide-react";
import { db, auth } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

type Screen = "welcome" | "disruption" | "role" | "headline" | "impact" | "chain" | "action" | "final";

interface AppState {
  disruptionId: number | null;
  roleId: number | null;
  impactId: string | null;
  restrictionId: string | null;
  actionText: string;
}

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [isSaving, setIsSaving] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AppState>({
    disruptionId: null,
    roleId: null,
    impactId: null,
    restrictionId: null,
    actionText: "",
  });

  const reset = () => {
    setState({
      disruptionId: null,
      roleId: null,
      impactId: null,
      restrictionId: null,
      actionText: "",
    });
    setScreen("welcome");
  };

  const saveInteraction = async () => {
    if (!state.disruptionId || !state.roleId || !state.impactId || !state.restrictionId || !state.actionText) return;
    
    setIsSaving(true);
    const path = 'interactions';
    try {
      await addDoc(collection(db, path), {
        disruptionId: state.disruptionId,
        roleId: state.roleId,
        impactId: state.impactId,
        restrictionId: state.restrictionId,
        actionText: state.actionText,
        timestamp: serverTimestamp(),
        userId: auth.currentUser?.uid || null
      });
      setScreen("final");
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted) {
        audioRef.current.play().catch(e => console.log("Audio play blocked:", e));
      }
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const startApp = () => {
    setScreen("disruption");
    // Try to unmute/play on first interaction
    setIsMuted(false);
  };

  const currentDisruption = state.disruptionId ? DISRUPCIONES[state.disruptionId] : null;

  return (
    <div className="min-h-screen bg-[#050505] flex justify-center items-start overflow-x-hidden font-['Advent_Pro'] relative">
      {/* Background Audio */}
      <audio 
        ref={audioRef}
        src="distopic.mp3" 
        loop 
        playsInline
      />

      {/* Mute Toggle */}
      <button 
        onClick={toggleMute}
        className="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-surface-dark/80 backdrop-blur-md border border-neon-cyan/30 text-neon-cyan hover:text-white hover:bg-neon-cyan/20 transition-all active:scale-95 shadow-[0_0_10px_rgba(0,243,255,0.2)]"
        title={isMuted ? "Activar sonido" : "Silenciar"}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      <div className="w-full max-w-[420px] min-h-screen flex flex-col relative bg-[#0d0d0d] border-x border-neon-pink/20 shadow-[0_0_50px_rgba(255,0,85,0.1)]">
        
        {/* Welcome Screen */}
        <ScreenWrapper isVisible={screen === "welcome"}>
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-[10px] text-neon-cyan tracking-[0.3em] uppercase font-bold mb-4 animate-pulse">
              [ CONECTIVIDAD SIGNIFICATIVA ]
            </span>
            <h1 className="text-5xl font-black leading-none mb-6 cyberpunk italic">
              HACKEA LA<br /><span className="text-neon-yellow">DISRUPCIÓN</span>
            </h1>
            <p className="cyberpunk leading-relaxed mb-8 border-l-4 border-neon-pink bg-surface-dark/50">
              El futuro del trabajo ya llegó — y no pidió permiso.<br /><br />
              En <span className="text-neon-yellow font-bold underline">5 minutos</span> vas a elegir una crisis real, sentirla desde adentro y hackear el sistema.
            </p>
            <div className="p-4 mb-8 border-2 border-dashed border-neon-cyan/30 bg-neon-cyan/5">
              <p className="text-neon-cyan text-xs font-bold uppercase tracking-tighter">
                &gt; TUS DECISIONES DETERMINAN EL CAMINO. NO HAY RESPUESTAS CORRECTAS — HAY CONSECUENCIAS.
              </p>
            </div>
          </div>
          <Button onClick={startApp}>
            INICIAR PROTOCOLO →
          </Button>
        </ScreenWrapper>

        {/* Disruption Selection */}
        <ScreenWrapper isVisible={screen === "disruption"}>
          <ProgressBar step={1} totalSteps={6} label="Paso 1 de 6 · Elige tu disrupción" />
          <h2 className="text-2xl font-bold mb-2 cyberpunk">¿Qué crisis te preocupa más?</h2>
          <p className="text-neon-cyan/70 text-xs uppercase tracking-widest mb-6 font-bold">&gt; SELECCIONA UN NODO DE DISRUPCIÓN</p>
          
          <div className="space-y-3 mb-8">
            {Object.values(DISRUPCIONES).map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  setState(prev => ({ ...prev, disruptionId: d.id }));
                  setScreen("role");
                }}
                className="w-full p-5 text-left border-2 border-neon-pink/30 bg-surface-dark hover:border-neon-pink hover:bg-neon-pink/10 transition-all group relative overflow-hidden shadow-[4px_4px_0px_rgba(255,0,85,0.2)]"
              >
                <div className="absolute top-0 right-0 p-1 bg-neon-pink/20 text-[8px] font-bold text-neon-pink uppercase">
                  {d.tag}
                </div>
                <span className="block text-sm font-black text-neon-yellow mb-1 group-hover:text-white transition-colors uppercase italic">
                  {d.titulo}
                </span>
                <span className="block text-[11px] text-neon-cyan/60 font-medium">
                  {d.sub}
                </span>
              </button>
            ))}
          </div>
        </ScreenWrapper>

        {/* Role Selection */}
        <ScreenWrapper isVisible={screen === "role"}>
          <ProgressBar step={2} totalSteps={6} label="Paso 2 de 6 · Tu rol" />
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setScreen("disruption")} className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1">
              <ChevronLeft size={14} /> volver
            </button>
            <span className="text-[10px] bg-surface-2 px-3 py-1 rounded-full text-zinc-400 border border-border">
              {currentDisruption?.tag}
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-2 cyberpunk">¿Quién eres en esta historia?</h2>
          <p className="cyberpunk inverse text-sm mb-6">Tu rol determina cómo te golpea la crisis y qué puedes hacer.</p>

          <div className="grid grid-cols-1 gap-3 mb-8">
            {[
              { id: 1, label: "Estudiante universitario", icon: <Globe size={18} /> },
              { id: 2, label: "Trabajador digital", icon: <Brain size={18} /> },
              { id: 3, label: "Trabajador de plataforma", icon: <Zap size={18} /> },
              { id: 4, label: "Líder comunitario", icon: <Users size={18} /> },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setState(prev => ({ ...prev, roleId: r.id }));
                  setScreen("headline");
                }}
                className={`flex items-center gap-4 p-4 border-2 transition-all text-left relative overflow-hidden ${
                  state.roleId === r.id 
                    ? "border-neon-pink bg-neon-pink/10 text-white shadow-[0_0_15px_rgba(255,0,85,0.3)]" 
                    : "border-neon-cyan/20 bg-surface-dark text-neon-cyan/60 hover:border-neon-cyan/50"
                }`}
              >
                <div className={`p-2 rounded-lg ${state.roleId === r.id ? "bg-neon-pink text-white" : "bg-surface-dark border border-neon-cyan/30 text-neon-cyan"}`}>
                  {r.icon}
                </div>
                <span className="text-sm font-bold uppercase italic tracking-tight">{r.label}</span>
                {state.roleId === r.id && (
                  <div className="absolute top-0 right-0 w-2 h-full bg-neon-pink animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </ScreenWrapper>

        {/* Headline Screen (Newspaper Style) */}
        <ScreenWrapper isVisible={screen === "headline"}>
          <ProgressBar step={3} totalSteps={6} label="Extra! Extra! · Tu noticia" />
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setScreen("role")} className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1">
              <ChevronLeft size={14} /> volver
            </button>
          </div>

          <div className="bg-surface-dark text-neon-cyan p-6 shadow-[0_0_30px_rgba(0,243,255,0.1)] border-2 border-neon-cyan relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            
            <div className="border-b border-neon-cyan/30 pb-2 mb-4 flex justify-between items-end">
              <span className="font-mono font-bold text-[10px] uppercase tracking-widest text-neon-pink">DATA_STREAM // NEWS_FEED</span>
              <span className="font-mono text-[9px] text-neon-yellow">{new Date().toLocaleTimeString()} // {new Date().toLocaleDateString()}</span>
            </div>

            <div className="mb-4">
              <span className="inline-block bg-neon-pink text-white text-[8px] px-2 py-0.5 font-bold uppercase tracking-widest mb-2 animate-pulse">ALERTA DE SISTEMA</span>
              <h2 className="text-2xl font-black leading-none tracking-tight uppercase mb-2 text-white italic">
                {currentDisruption?.titulo}
              </h2>
            </div>

            <div className="border-t border-neon-cyan/30 pt-4">
              <p className="text-lg leading-tight font-bold mb-3 text-neon-yellow">
                {TITULARES[`${state.disruptionId}-${state.roleId}`]}
              </p>
              <div className="h-0.5 bg-neon-pink/30 w-full mb-3" />
              <p className="text-[10px] leading-relaxed font-mono text-neon-cyan/80">
                &gt; ANALIZANDO IMPACTO... <br />
                &gt; AFECTADOS: {state.roleId === 1 ? 'ESTUDIANTES' : state.roleId === 2 ? 'TRABAJADORES_DIGITALES' : state.roleId === 3 ? 'REPARTIDORES' : 'LÍDERES_COMUNITARIOS'}<br />
                &gt; ESTADO: CRÍTICO // INCERTIDUMBRE_DETECTADA
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neon-cyan/30 flex justify-center">
              <div className="w-12 h-12 rounded-full border border-neon-pink/50 flex items-center justify-center text-neon-pink animate-spin-slow">
                <Zap size={24} />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Button onClick={() => setScreen("impact")} className="w-full">
              Esto me afecta →
            </Button>
          </div>
        </ScreenWrapper>

        {/* Impact Assessment */}
        <ScreenWrapper isVisible={screen === "impact"}>
          <ProgressBar step={4} totalSteps={6} label="Paso 4 de 6 · ¿Dónde duele?" />
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setScreen("role")} className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1">
              <ChevronLeft size={14} /> volver
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-2 cyberpunk">¿Dónde golpea más fuerte?</h2>
          <p className="cyberpunk inverse text-sm mb-6">Toca la zona donde crees que el impacto es más severo para tu rol y tu comunidad.</p>

          <div className="space-y-3 mb-8">
            {[
              { id: "bolsillo", label: "En el bolsillo", sub: "Economía, trabajo, ingreso", icon: <Wallet size={20} /> },
              { id: "cabeza", label: "En la cabeza", sub: "Salud mental, identidad, confianza", icon: <Brain size={20} /> },
              { id: "derechos", label: "En los derechos", sub: "Leyes, organización, participación", icon: <Shield size={20} /> },
            ].map((i) => (
              <button
                key={i.id}
                onClick={() => setState(prev => ({ ...prev, impactId: i.id }))}
                className={`flex items-center gap-4 p-4 border-2 transition-all text-left w-full relative ${
                  state.impactId === i.id 
                    ? "border-neon-yellow bg-neon-yellow/10 text-white shadow-[0_0_15px_rgba(243,255,0,0.2)]" 
                    : "border-neon-cyan/20 bg-surface-dark text-neon-cyan/60 hover:border-neon-cyan/50"
                }`}
              >
                <div className={`p-3 rounded-xl ${state.impactId === i.id ? "bg-neon-yellow text-bg-dark" : "bg-surface-dark border border-neon-cyan/30 text-neon-cyan"}`}>
                  {i.icon}
                </div>
                <div>
                  <p className="text-sm font-black uppercase italic">{i.label}</p>
                  <p className="text-[11px] text-neon-cyan/50 font-mono">{i.sub}</p>
                </div>
              </button>
            ))}
          </div>

          {state.impactId && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 mt-auto">
              <div className="bg-surface-dark border-l-4 border-neon-pink p-4 mb-6 shadow-[0_0_20px_rgba(255,0,85,0.05)]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-pink animate-pulse" />
                  <p className="text-[10px] text-neon-pink uppercase tracking-widest font-bold font-mono">COPILOTO_IA // IMPACTO_DETECTADO</p>
                </div>
                <p className="text-neon-cyan text-xs font-bold leading-relaxed">
                  {AI_IMPACTO[`${state.impactId}-${state.disruptionId}`]}
                </p>
              </div>
              <Button onClick={() => setScreen("chain")}>
                ENTENDIDO →
              </Button>
            </div>
          )}
        </ScreenWrapper>

        {/* Chain Reaction */}
        <ScreenWrapper isVisible={screen === "chain"}>
          <ProgressBar step={5} totalSteps={6} label="Paso 5 de 6 · El efecto dominó" />
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setScreen("impact")} className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1">
              <ChevronLeft size={14} /> volver
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-2 cyberpunk">¿Qué hace que esto empeore?</h2>
          <p className="cyberpunk inverse text-sm mb-6">Elige la restricción que más limita la respuesta. Tu elección define el final.</p>

          <div className="space-y-3 mb-8">
            {[
              { id: "leyes", label: "No hay leyes que regulen esto", sub: "Vacío legal, jurisdicción, estándares" },
              { id: "acceso", label: "No hay acceso a información ni recursos", sub: "Brecha digital, asesoría, conocimiento" },
              { id: "union", label: "No hay unión entre trabajadores", sub: "Organización colectiva, solidaridad, poder" },
            ].map((r, idx) => (
              <button
                key={r.id}
                onClick={() => setState(prev => ({ ...prev, restrictionId: r.id }))}
                className={`w-full p-4 text-left border-2 transition-all relative ${
                  state.restrictionId === r.id 
                    ? "border-neon-pink bg-neon-pink/10 text-white shadow-[0_0_15px_rgba(255,0,85,0.2)]" 
                    : "border-neon-cyan/20 bg-surface-dark text-neon-cyan/60 hover:border-neon-cyan/50"
                }`}
              >
                <span className="block text-[9px] text-neon-pink uppercase tracking-widest font-bold mb-1 font-mono">RESTRICCIÓN_0{idx + 1}</span>
                <span className="block text-sm font-black uppercase italic mb-0.5">{r.label}</span>
                <span className="block text-[11px] text-neon-cyan/50 font-mono">{r.sub}</span>
              </button>
            ))}
          </div>

          {state.restrictionId && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 mt-auto">
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                {CADENAS[`${state.restrictionId}-${state.disruptionId}`].map((text, i) => (
                  <div key={i} className="flex-1 min-w-[120px] bg-surface-dark border border-neon-cyan/30 p-3 text-center shadow-[inset_0_0_10px_rgba(0,243,255,0.05)]">
                    <p className="text-[9px] text-neon-yellow uppercase font-bold mb-1 font-mono">
                      {i === 0 ? "T_ZERO" : i === 1 ? "T_6_MONTHS" : "T_3_YEARS"}
                    </p>
                    <p className="text-[10px] text-neon-cyan/80 leading-tight font-bold">{text}</p>
                  </div>
                ))}
              </div>
              <Button onClick={() => setScreen("action")}>
                ¿QUÉ HARÍA YO? →
              </Button>
            </div>
          )}
        </ScreenWrapper>

        {/* Action Input */}
        <ScreenWrapper isVisible={screen === "action"}>
          <ProgressBar step={6} totalSteps={6} label="Paso 6 de 6 · Tu jugada" />
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setScreen("chain")} className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1">
              <ChevronLeft size={14} /> volver
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-2 cyberpunk">¿Qué habrías hecho tú?</h2>
          <p className="cyberpunk inverse text-sm mb-6">Inspírate en una de estas ideas o escribe la tuya — máximo 10 palabras.</p>

          <div className="space-y-2 mb-6">
            {state.disruptionId && SPARKS[state.disruptionId].map((spark, i) => (
              <button
                key={i}
                onClick={() => setState(prev => ({ ...prev, actionText: spark }))}
                className={`w-full p-3 text-left border transition-all text-[11px] font-bold uppercase italic ${
                  state.actionText === spark 
                    ? "border-neon-yellow bg-neon-yellow/10 text-white shadow-[0_0_10px_rgba(243,255,0,0.2)]" 
                    : "border-neon-cyan/20 bg-surface-dark text-neon-cyan/40 hover:text-neon-cyan/70"
                }`}
              >
                &gt; {spark}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <textarea
              value={state.actionText}
              onChange={(e) => setState(prev => ({ ...prev, actionText: e.target.value }))}
              placeholder="Escribe tu jugada aquí..."
              className="cyberpunk w-full bg-surface-dark border-2 border-neon-pink text-neon-cyan p-4 font-bold placeholder:text-neon-pink/30 focus:border-neon-cyan transition-colors"
            />
            <div className="flex justify-end mt-2">
              <span className={`text-[10px] font-mono font-bold ${state.actionText.split(/\s+/).filter(Boolean).length > 10 ? "text-neon-pink animate-pulse" : "text-neon-cyan/60"}`}>
                {state.actionText.split(/\s+/).filter(Boolean).length} / 10 PALABRAS
              </span>
            </div>
          </div>

          {state.actionText.split(/\s+/).filter(Boolean).length >= 3 && (
            <div className="bg-surface-dark border-l-4 border-neon-cyan p-4 mb-6 animate-in fade-in duration-500">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                <p className="text-[10px] text-neon-cyan uppercase tracking-widest font-bold font-mono">COPILOTO_IA</p>
              </div>
              <p className="text-neon-yellow text-xs italic font-bold">
                "Buena idea — funciona mejor si la repites con otros. ¿Qué pasaría si diez personas en tu sector hicieran lo mismo al tiempo?"
              </p>
            </div>
          )}

          <div className="mt-auto">
            <Button 
              onClick={saveInteraction}
              disabled={isSaving || !state.actionText.trim() || state.actionText.split(/\s+/).filter(Boolean).length > 15}
            >
              {isSaving ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={18} /> Guardando...
                </div>
              ) : "Publicar mi idea →"}
            </Button>
          </div>
        </ScreenWrapper>

        {/* Final Result */}
        <ScreenWrapper isVisible={screen === "final"}>
          <ProgressBar step={6} totalSteps={6} label="SISTEMA_OPTIMIZADO" />
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-surface-dark border-2 border-neon-cyan flex items-center justify-center mx-auto mb-4 text-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.3)]">
              <CheckCircle2 size={24} />
            </div>
            <span className="text-[10px] text-neon-pink uppercase tracking-widest font-bold mb-1 block font-mono">ANÁLISIS_FINAL</span>
            <h2 className="text-2xl font-black cyberpunk italic text-white">{FINALES[`${state.disruptionId}-${state.restrictionId}`]?.titulo}</h2>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-center">
              <span className={`px-4 py-1 rounded-none text-[10px] font-black uppercase border-2 ${
                FINALES[`${state.disruptionId}-${state.restrictionId}`]?.resultado === 'bad' ? "bg-neon-pink/20 border-neon-pink text-neon-pink" :
                FINALES[`${state.disruptionId}-${state.restrictionId}`]?.resultado === 'ok' ? "bg-neon-yellow/20 border-neon-yellow text-neon-yellow" :
                "bg-neon-cyan/20 border-neon-cyan text-neon-cyan"
              }`}>
                {FINALES[`${state.disruptionId}-${state.restrictionId}`]?.resultado === 'bad' ? "CAMINO_CRÍTICO" :
                 FINALES[`${state.disruptionId}-${state.restrictionId}`]?.resultado === 'ok' ? "CAMINO_ESTABLE" :
                 "CAMINO_ÓPTIMO"}
              </span>
            </div>

            <div className="p-4 border-2 border-neon-cyan bg-surface-dark/50 relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan" />
              <div className="text-[10px] text-neon-cyan uppercase font-bold mb-2 flex items-center gap-2 font-mono">
                <div className="w-1 h-1 rounded-full bg-neon-cyan animate-pulse" /> PROYECCIÓN_FUTURA
              </div>
              <p className="text-sm font-bold text-white leading-relaxed">
                {FINALES[`${state.disruptionId}-${state.restrictionId}`]?.texto}
              </p>
            </div>

            <div className="bg-surface-dark border border-neon-yellow/30 p-4">
              <p className="text-[9px] text-neon-yellow uppercase font-bold mb-1 font-mono">TU_HACK</p>
              <p className="text-sm italic text-white font-bold">"{state.actionText}"</p>
            </div>

            <div className="bg-surface-dark border border-neon-pink/30 p-4">
              <div className="text-[10px] text-neon-pink uppercase font-bold mb-2 flex items-center gap-2 font-mono">
                <div className="w-1 h-1 rounded-full bg-neon-pink" /> ARCHIVO_REAL_DETECTADO
              </div>
              <p className="text-xs text-neon-cyan font-medium leading-relaxed">
                {FINALES[`${state.disruptionId}-${state.restrictionId}`]?.real}
              </p>
            </div>

            <div className="bg-neon-cyan/10 border-2 border-neon-cyan p-5 text-center shadow-[0_0_20px_rgba(0,243,255,0.1)]">
              <p className="text-xs text-white font-bold mb-3 leading-relaxed uppercase italic">
                {FINALES[`${state.disruptionId}-${state.restrictionId}`]?.accion}
              </p>
              <a href="https://conectividadsignificativa.co" target="_blank" className="text-sm font-black text-neon-yellow hover:text-white transition-colors underline decoration-neon-yellow underline-offset-4">
                CONECTIVIDADSIGNIFICATIVA.CO →
              </a>
            </div>
          </div>

          <Button variant="secondary" onClick={reset}>
            REINICIAR PROTOCOLO
          </Button>
        </ScreenWrapper>

      </div>
    </div>
  );
}
