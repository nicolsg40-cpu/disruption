console.log("UI.tsx: module load");
import { motion, AnimatePresence } from "motion/react";
import { ReactNode } from "react";

interface ScreenWrapperProps {
  children: ReactNode;
  isVisible: boolean;
}

export const ScreenWrapper = ({ children, isVisible }: ScreenWrapperProps) => {
  if (!isVisible) return null;
  return (
    <section className="cyberpunk black flex flex-col h-full w-full p-6 pt-8 min-h-screen">
      {children}
    </section>
  );
};

interface ProgressBarProps {
  step: number;
  totalSteps: number;
  label: string;
}

export const ProgressBar = ({ step, totalSteps, label }: ProgressBarProps) => {
  return (
    <div className="mb-6">
      <ul className="steps cyberpunk">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <li key={i} className={i < step ? "current" : ""}>
            {i === step - 1 && <span className="sr-only">{label}</span>}
          </li>
        ))}
      </ul>
      <p className="text-[10px] text-yellow-color uppercase tracking-widest mt-2 font-bold">
        {label}
      </p>
    </div>
  );
};

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
}

export const Button = ({ onClick, children, variant = "primary", className = "", disabled = false }: ButtonProps) => {
  const baseStyles = "cyberpunk w-full disabled:opacity-50 disabled:pointer-events-none";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${className}`}
      style={{
        "--background-color": variant === "primary" ? "var(--red-color)" : "var(--blue-color)"
      } as any}
    >
      {children}
    </button>
  );
};
