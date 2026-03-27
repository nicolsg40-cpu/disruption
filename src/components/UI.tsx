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
    <div className="flex flex-col h-full w-full p-6 pt-8">
      {children}
    </div>
  );
};

interface ProgressBarProps {
  step: number;
  totalSteps: number;
  label: string;
}

export const ProgressBar = ({ step, totalSteps, label }: ProgressBarProps) => {
  const progress = (step / totalSteps) * 100;
  return (
    <div className="mb-6">
      <div className="h-1 w-full bg-border rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-hack-red"
        />
      </div>
      <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-2">
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
  const baseStyles = "w-full py-4 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-hack-red text-white hover:bg-hack-red/90",
    secondary: "bg-transparent border border-border text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
