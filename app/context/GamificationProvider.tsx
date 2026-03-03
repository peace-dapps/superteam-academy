"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Zap, Flame, Star, ChevronUp } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ToastType = "xp" | "levelup" | "achievement" | "streak" | "course";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  subtitle?: string;
  xp?: number;
}

interface GamificationContextType {
  showXP: (amount: number, label?: string) => void;
  showLevelUp: (level: number) => void;
  showAchievement: (title: string, subtitle?: string) => void;
  showStreak: (days: number) => void;
  showCourseComplete: (title: string, xp: number) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const GamificationContext = createContext<GamificationContextType>({
  showXP: () => {},
  showLevelUp: () => {},
  showAchievement: () => {},
  showStreak: () => {},
  showCourseComplete: () => {},
});

export function useGamification() {
  return useContext(GamificationContext);
}

// ─── Confetti ─────────────────────────────────────────────────────────────────

function Confetti({ active }: { active: boolean }) {
  const particles = Array.from({ length: 40 });
  const colors = ["#9945ff", "#14f195", "#ff3366", "#ffb800", "#00c2ff"];

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {particles.map((_, i) => {
        const color = colors[i % colors.length];
        const left = Math.random() * 100;
        const delay = Math.random() * 0.5;
        const duration = 1.5 + Math.random() * 1;
        const size = 4 + Math.random() * 8;
        const rotate = Math.random() * 720 - 360;

        return (
          <motion.div
            key={i}
            initial={{ y: -20, x: `${left}vw`, opacity: 1, rotate: 0, scale: 1 }}
            animate={{ y: "110vh", opacity: 0, rotate, scale: 0.5 }}
            transition={{ duration, delay, ease: "easeIn" }}
            style={{
              position: "absolute",
              top: 0,
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: Math.random() > 0.5 ? "50%" : "0%",
            }}
          />
        );
      })}
    </div>
  );
}

// ─── Toast Components ─────────────────────────────────────────────────────────

function XPToast({ toast }: { toast: Toast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.8 }}
      className="flex items-center gap-3 px-4 py-3 bg-[#0a0a0a] border border-[#9945ff]/40 shadow-lg shadow-[#9945ff]/10"
    >
      <div className="w-8 h-8 bg-[#9945ff]/20 flex items-center justify-center shrink-0">
        <Zap className="w-4 h-4 text-[#9945ff]" />
      </div>
      <div>
        <div className="text-[11px] font-mono text-[#9945ff] uppercase tracking-widest font-bold">
          +{toast.xp} XP
        </div>
        {toast.subtitle && (
          <div className="text-[9px] font-mono text-[#444] uppercase tracking-widest">
            {toast.subtitle}
          </div>
        )}
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2.5 }}
        className="absolute bottom-0 left-0 h-[2px] bg-[#9945ff]"
      />
    </motion.div>
  );
}

function LevelUpToast({ toast }: { toast: Toast }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex items-center gap-4 px-5 py-4 bg-[#0a0a0a] border border-[#14f195]/60 shadow-lg shadow-[#14f195]/20 relative overflow-hidden"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-10 h-10 bg-[#14f195]/20 flex items-center justify-center shrink-0 border border-[#14f195]/40"
      >
        <ChevronUp className="w-5 h-5 text-[#14f195]" />
      </motion.div>
      <div>
        <div className="text-[10px] font-mono text-[#14f195] uppercase tracking-widest">
          LEVEL UP!
        </div>
        <div className="font-display font-black text-xl text-[#f5f5f0] uppercase">
          {toast.title}
        </div>
        {toast.subtitle && (
          <div className="text-[9px] font-mono text-[#444] uppercase tracking-widest">
            {toast.subtitle}
          </div>
        )}
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 3 }}
        className="absolute bottom-0 left-0 h-[2px] bg-[#14f195]"
      />
    </motion.div>
  );
}

function AchievementToast({ toast }: { toast: Toast }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="flex items-center gap-4 px-5 py-4 bg-[#0a0a0a] border border-[#ffb800]/40 shadow-lg shadow-[#ffb800]/10 relative overflow-hidden"
    >
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-10 h-10 bg-[#ffb800]/20 flex items-center justify-center shrink-0 border border-[#ffb800]/40"
      >
        <Trophy className="w-5 h-5 text-[#ffb800]" />
      </motion.div>
      <div>
        <div className="text-[10px] font-mono text-[#ffb800] uppercase tracking-widest">
          ACHIEVEMENT UNLOCKED
        </div>
        <div className="text-sm font-display font-black text-[#f5f5f0] uppercase">
          {toast.title}
        </div>
        {toast.subtitle && (
          <div className="text-[9px] font-mono text-[#444] uppercase tracking-widest">
            {toast.subtitle}
          </div>
        )}
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 3 }}
        className="absolute bottom-0 left-0 h-[2px] bg-[#ffb800]"
      />
    </motion.div>
  );
}

function StreakToast({ toast }: { toast: Toast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center gap-4 px-5 py-4 bg-[#0a0a0a] border border-[#ff3366]/40 shadow-lg shadow-[#ff3366]/10 relative overflow-hidden"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1, 1.2, 1] }}
        transition={{ duration: 0.8 }}
        className="w-10 h-10 bg-[#ff3366]/20 flex items-center justify-center shrink-0 border border-[#ff3366]/40"
      >
        <Flame className="w-5 h-5 text-[#ff3366]" />
      </motion.div>
      <div>
        <div className="text-[10px] font-mono text-[#ff3366] uppercase tracking-widest">
          STREAK MILESTONE 🔥
        </div>
        <div className="text-sm font-display font-black text-[#f5f5f0] uppercase">
          {toast.title}
        </div>
        {toast.subtitle && (
          <div className="text-[9px] font-mono text-[#444] uppercase tracking-widest">
            {toast.subtitle}
          </div>
        )}
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 3 }}
        className="absolute bottom-0 left-0 h-[2px] bg-[#ff3366]"
      />
    </motion.div>
  );
}

function CourseCompleteToast({ toast }: { toast: Toast }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="flex items-center gap-4 px-5 py-4 bg-[#0a0a0a] border border-[#9945ff] shadow-lg shadow-[#9945ff]/30 relative overflow-hidden"
    >
      <motion.div
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-10 h-10 bg-[#9945ff]/20 flex items-center justify-center shrink-0 border border-[#9945ff]/60"
      >
        <Star className="w-5 h-5 text-[#9945ff]" />
      </motion.div>
      <div>
        <div className="text-[10px] font-mono text-[#9945ff] uppercase tracking-widest">
          COURSE COMPLETE! 🎓
        </div>
        <div className="text-sm font-display font-black text-[#f5f5f0] uppercase">
          {toast.title}
        </div>
        {toast.xp && (
          <div className="text-[9px] font-mono text-[#14f195] uppercase tracking-widest">
            +{toast.xp} XP EARNED
          </div>
        )}
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 4 }}
        className="absolute bottom-0 left-0 h-[2px] bg-[#9945ff]"
      />
    </motion.div>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function GamificationProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confetti, setConfetti] = useState(false);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev.slice(-2), { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const showXP = useCallback((amount: number, label?: string) => {
    addToast({ type: "xp", title: `+${amount} XP`, subtitle: label, xp: amount });
  }, [addToast]);

  const showLevelUp = useCallback((level: number) => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 2500);
    addToast({
      type: "levelup",
      title: `LEVEL ${level}`,
      subtitle: "Keep building on Solana!",
    });
  }, [addToast]);

  const showAchievement = useCallback((title: string, subtitle?: string) => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 2500);
    addToast({ type: "achievement", title, subtitle });
  }, [addToast]);

  const showStreak = useCallback((days: number) => {
    addToast({
      type: "streak",
      title: `${days} DAY STREAK`,
      subtitle: days >= 100 ? "Legendary!" : days >= 30 ? "Incredible!" : "On fire!",
    });
  }, [addToast]);

  const showCourseComplete = useCallback((title: string, xp: number) => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
    addToast({ type: "course", title, xp });
  }, [addToast]);

  return (
    <GamificationContext.Provider value={{
      showXP, showLevelUp, showAchievement, showStreak, showCourseComplete,
    }}>
      {children}

      {/* Confetti */}
      <Confetti active={confetti} />

      {/* Toast stack */}
      <div className="fixed bottom-6 right-6 z-[150] flex flex-col gap-3 w-80 max-w-[calc(100vw-3rem)]">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <div key={toast.id} className="relative overflow-hidden">
              {toast.type === "xp" && <XPToast toast={toast} />}
              {toast.type === "levelup" && <LevelUpToast toast={toast} />}
              {toast.type === "achievement" && <AchievementToast toast={toast} />}
              {toast.type === "streak" && <StreakToast toast={toast} />}
              {toast.type === "course" && <CourseCompleteToast toast={toast} />}
            </div>
          ))}
        </AnimatePresence>
      </div>
    </GamificationContext.Provider>
  );
}
