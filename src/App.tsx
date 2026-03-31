/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

console.log("App.tsx: module load");
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
    <div className="min-h-screen bg-black flex justify-center items-start overflow-x-hidden">
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
        className="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-black/60 transition-all active:scale-95 shadow-lg"
        title={isMuted ? "Activar sonido" : "Silenciar"}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      <div className="w-full max-w-[420px] min-h-screen flex flex-col relative bg-black border-x border-yellow-color/20">
        
        {/* Welcome Screen */}
        <ScreenWrapper isVisible={screen === "welcome"}>
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-[10px] text-red-color tracking-[0.2em] uppercase font-semibold mb-4">
              Conectividad Significativa
            </span>
            <h1 className="text-4xl font-bold leading-tight mb-6 cyberpunk glitched">
              Hackea la<br />Disrupción
            </h1>
            <p className="cyberpunk inverse leading-relaxed mb-8">
              El futuro del trabajo ya llegó — y no pidió permiso.<br /><br />
              En <span className="text-yellow-color font-medium">5 minutos</span> vas a elegir una crisis real, sentirla desde adentro y pensar qué harías tú para enfrentarla.
            </p>
            <div className="p-4 mb-8">
              <p className="cyberpunk text-sm">
                Tus decisiones determinan el camino. No hay respuestas correctas — hay consecuencias.
              </p>
            </div>
          </div>
          <Button onClick={startApp}>
            Empezar →
          </Button>
        </ScreenWrapper>

        {/* Disruption Selection */}
        <ScreenWrapper isVisible={screen === "disruption"}>
          <ProgressBar step={1} totalSteps={6} label="Paso 1 de 6 · Elige tu disrupción" />
          <h2 className="text-2xl font-bold mb-2 cyberpunk glitched">¿Qué crisis te preocupa más?</h2>
          <p className="cyberpunk text-sm mb-6">Cada disrupción abre un camino diferente. Elige la que más te toca.</p>
          
          <div className="space-y-3 mb-8">
            {Object.values(DISRUPCIONES).map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  setState(prev => ({ ...prev, disruptionId: d.id }));
                  setScreen("role");
                }}
                className="w-full p-5 text-left border-2 border-yellow-color/20 bg-black hover:border-red-color hover:bg-red-color/5 transition-all group relative overflow-hidden"
              >
                <span className="block text-[10px] text-red-color uppercase tracking-widest font-bold mb-1">
                  {d.tag}
                </span>
                <span className="block text-sm font-semibold text-yellow-color mb-1 group-hover:text-red-color transition-colors">
                  {d.titulo}
                </span>
                <span className="block text-[11px] text-yellow-color/60">
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

          <h2 className="text-2xl font-bold mb-2 cyberpunk glitched">¿Quién eres en esta historia?</h2>
          <p className="cyberpunk text-sm mb-6">Tu rol determina cómo te golpea la crisis y qué puedes hacer.</p>

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
                className={`flex items-center gap-4 p-4 border-2 transition-all text-left ${
                  state.roleId === r.id 
                    ? "border-red-color bg-red-color/10 text-yellow-color" 
                    : "border-yellow-color/20 bg-black text-yellow-color/60 hover:border-yellow-color/40"
                }`}
              >
                <div className={`p-2 rounded-lg ${state.roleId === r.id ? "bg-red-color/20 text-red-color" : "bg-yellow-color/10 text-yellow-color/40"}`}>
                  {r.icon}
                </div>
                <span className="text-sm font-medium">{r.label}</span>
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

          <div className="bg-[#f4f1ea] text-[#1a1a1a] p-6 shadow-2xl transform -rotate-1 relative overflow-hidden border-b-4 border-black/20">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
            
            <div className="border-b-2 border-black pb-2 mb-4 flex justify-between items-end">
              <span className="font-serif font-bold text-[10px] uppercase tracking-tighter">EL DIARIO DEL MAÑANA</span>
              <span className="font-serif text-[9px]">{new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>

            <div className="text-center mb-4">
              <span className="inline-block bg-black text-white text-[8px] px-2 py-0.5 font-bold uppercase tracking-widest mb-2">ÚLTIMA HORA</span>
              <h2 className="font-serif text-2xl font-black leading-none tracking-tight uppercase mb-2">
                {currentDisruption?.titulo}
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-black/10 pt-4">
              <div className="col-span-3">
                <p className="font-serif text-lg leading-tight font-bold mb-3 first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                  {TITULARES[`${state.disruptionId}-${state.roleId}`]}
                </p>
                <div className="h-px bg-black/10 w-full mb-3" />
                <p className="text-[10px] leading-relaxed font-serif opacity-80">
                  Reportes indican que miles de {state.roleId === 1 ? 'estudiantes' : state.roleId === 2 ? 'trabajadores digitales' : state.roleId === 3 ? 'repartidores' : 'líderes'} están siendo afectados por esta medida sin precedentes. La incertidumbre crece en los sectores clave de la economía digital colombiana.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-black flex justify-center">
              <div className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center opacity-20 grayscale">
                <Globe size={24} />
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

          <h2 className="text-2xl font-bold mb-2 cyberpunk glitched">¿Dónde golpea más fuerte?</h2>
          <p className="cyberpunk text-sm mb-6">Toca la zona donde crees que el impacto es más severo para tu rol y tu comunidad.</p>

          <div className="space-y-3 mb-8">
            {[
              { id: "bolsillo", label: "En el bolsillo", sub: "Economía, trabajo, ingreso", icon: <Wallet size={20} /> },
              { id: "cabeza", label: "En la cabeza", sub: "Salud mental, identidad, confianza", icon: <Brain size={20} /> },
              { id: "derechos", label: "En los derechos", sub: "Leyes, organización, participación", icon: <Shield size={20} /> },
            ].map((i) => (
              <button
                key={i.id}
                onClick={() => setState(prev => ({ ...prev, impactId: i.id }))}
                className={`flex items-center gap-4 p-4 border-2 transition-all text-left w-full ${
                  state.impactId === i.id 
                    ? "border-red-color bg-red-color/10 text-yellow-color" 
                    : "border-yellow-color/20 bg-black text-yellow-color/60 hover:border-yellow-color/40"
                }`}
              >
                <div className={`p-3 rounded-xl ${state.impactId === i.id ? "bg-red-color/20 text-red-color" : "bg-yellow-color/10 text-yellow-color/40"}`}>
                  {i.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold">{i.label}</p>
                  <p className="text-[11px] text-yellow-color/40">{i.sub}</p>
                </div>
              </button>
            ))}
          </div>

          {state.impactId && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 mt-auto">
              <div className="bg-green-color/5 border border-green-color/20 p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-color animate-pulse" />
                  <p className="text-[10px] text-green-color uppercase tracking-widest font-bold">Copiloto IA · impacto inesperado</p>
                </div>
                <p className="cyberpunk text-xs">
                  {AI_IMPACTO[`${state.impactId}-${state.disruptionId}`]}
                </p>
              </div>
              <Button onClick={() => setScreen("chain")}>
                Entendido →
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

          <h2 className="text-2xl font-bold mb-2 cyberpunk glitched">¿Qué hace que esto empeore?</h2>
          <p className="cyberpunk text-sm mb-6">Elige la restricción que más limita la respuesta. Tu elección define el final.</p>

          <div className="space-y-3 mb-8">
            {[
              { id: "leyes", label: "No hay leyes que regulen esto", sub: "Vacío legal, jurisdicción, estándares" },
              { id: "acceso", label: "No hay acceso a información ni recursos", sub: "Brecha digital, asesoría, conocimiento" },
              { id: "union", label: "No hay unión entre trabajadores", sub: "Organización colectiva, solidaridad, poder" },
            ].map((r, idx) => (
              <button
                key={r.id}
                onClick={() => setState(prev => ({ ...prev, restrictionId: r.id }))}
                className={`w-full p-4 text-left border-2 transition-all ${
                  state.restrictionId === r.id 
                    ? "border-orange-color bg-orange-color/10 text-yellow-color" 
                    : "border-yellow-color/20 bg-black text-yellow-color/60 hover:border-yellow-color/40"
                }`}
              >
                <span className="block text-[9px] text-orange-color uppercase tracking-widest font-bold mb-1">Restricción {idx + 1}</span>
                <span className="block text-sm font-semibold mb-0.5">{r.label}</span>
                <span className="block text-[11px] text-yellow-color/40">{r.sub}</span>
              </button>
            ))}
          </div>

          {state.restrictionId && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 mt-auto">
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {CADENAS[`${state.restrictionId}-${state.disruptionId}`].map((text, i) => (
                  <div key={i} className="flex-1 min-w-[100px] bg-orange-color/5 border border-orange-color/20 p-3 text-center">
                    <p className="text-[9px] text-orange-color uppercase font-bold mb-1">
                      {i === 0 ? "Hoy" : i === 1 ? "6 meses" : "3 años"}
                    </p>
                    <p className="text-[10px] text-yellow-color/80 leading-tight">{text}</p>
                  </div>
                ))}
              </div>
              <Button onClick={() => setScreen("action")}>
                ¿Qué haría yo? →
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

          <h2 className="text-2xl font-bold mb-2 cyberpunk glitched">¿Qué habrías hecho tú?</h2>
          <p className="cyberpunk text-sm mb-6">Inspírate en una de estas ideas o escribe la tuya — máximo 10 palabras.</p>

          <div className="space-y-2 mb-6">
            {state.disruptionId && SPARKS[state.disruptionId].map((spark, i) => (
              <button
                key={i}
                onClick={() => setState(prev => ({ ...prev, actionText: spark }))}
                className={`w-full p-3 text-left border text-xs transition-all ${
                  state.actionText === spark 
                    ? "border-red-color bg-red-color/5 text-yellow-color" 
                    : "border-yellow-color/20 bg-black text-yellow-color/40 hover:text-yellow-color/60"
                }`}
              >
                {spark}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <textarea
              value={state.actionText}
              onChange={(e) => setState(prev => ({ ...prev, actionText: e.target.value }))}
              placeholder="Escribe tu jugada aquí..."
              className="cyberpunk w-full"
            />
            <div className="flex justify-end mt-2">
              <span className={`text-[10px] font-mono ${state.actionText.split(/\s+/).filter(Boolean).length > 10 ? "text-red-color" : "text-yellow-color/40"}`}>
                {state.actionText.split(/\s+/).filter(Boolean).length} / 10 palabras
              </span>
            </div>
          </div>

          {state.actionText.split(/\s+/).filter(Boolean).length >= 3 && (
            <div className="bg-purple-color/5 border border-purple-color/20 p-4 mb-6 animate-in fade-in duration-500">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-color animate-pulse" />
                <p className="text-[10px] text-purple-color uppercase tracking-widest font-bold">Copiloto IA</p>
              </div>
              <p className="cyberpunk text-xs italic">
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
          <ProgressBar step={6} totalSteps={6} label="Experiencia completa" />
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-green-color/10 border border-green-color flex items-center justify-center mx-auto mb-4 text-green-color">
              <CheckCircle2 size={24} />
            </div>
            <span className="text-[10px] text-yellow-color/40 uppercase tracking-widest font-bold mb-1 block">Tu resultado</span>
            <h2 className="text-2xl font-bold cyberpunk glitched">{FINALES[`${state.disruptionId}-${state.restrictionId}`]?.titulo}</h2>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-center">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
                FINALES[`${state.disruptionId}-${state.restrictionId}`]?.resultado === 'bad' ? "bg-red-color/10 border-red-color text-red-color" :
                FINALES[`${state.disruptionId}-${state.restrictionId}`]?.resultado === 'ok' ? "bg-orange-color/10 border-orange-color text-orange-color" :
                "bg-green-color/10 border-green-color text-green-color"
              }`}>
                {FINALES[`${state.disruptionId}-${state.restrictionId}`]?.resultado === 'bad' ? "Camino difícil" :
                 FINALES[`${state.disruptionId}-${state.restrictionId}`]?.resultado === 'ok' ? "Camino posible" :
                 "Camino prometedor"}
              </span>
            </div>

            <div className="p-4">
              <div className="text-[10px] text-red-color uppercase font-bold mb-2 flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-red-color" /> Lo que pasaría
              </div>
              <p className="cyberpunk text-sm">
                {FINALES[`${state.disruptionId}-${state.restrictionId}`]?.texto}
              </p>
            </div>

            <div className="bg-black border border-yellow-color/20 p-4">
              <p className="text-[9px] text-yellow-color/40 uppercase font-bold mb-1">Tu jugada</p>
              <p className="text-sm italic text-yellow-color">"{state.actionText}"</p>
            </div>

            <div className="bg-red-color/5 border border-red-color/20 p-4">
              <div className="text-[10px] text-red-color uppercase font-bold mb-2 flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-red-color" /> Esto ya está pasando — versión real
              </div>
              <p className="cyberpunk text-xs">
                {FINALES[`${state.disruptionId}-${state.restrictionId}`]?.real}
              </p>
            </div>

            <div className="bg-red-color/10 border border-red-color/30 p-5 text-center">
              <p className="text-xs text-red-color/90 mb-3 leading-relaxed">
                {FINALES[`${state.disruptionId}-${state.restrictionId}`]?.accion}
              </p>
              <a href="https://conectividadsignificativa.co" target="_blank" className="text-sm font-bold text-red-color hover:underline">
                conectividadsignificativa.co →
              </a>
            </div>
          </div>

          <Button variant="secondary" onClick={reset}>
            Jugar de nuevo
          </Button>
        </ScreenWrapper>

      </div>
    </div>
  );
}
