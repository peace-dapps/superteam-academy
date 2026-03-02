"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useXP } from "@/context/XPContext";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle, Zap } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "What's your experience level with Solana?",
    options: [
      { label: "Complete Beginner", desc: "Never written a Solana program", value: "beginner", track: 1 },
      { label: "Some Experience", desc: "Built a few small projects", value: "intermediate", track: 2 },
      { label: "Experienced Dev", desc: "Shipped production Solana apps", value: "advanced", track: 3 },
      { label: "Web2 Developer", desc: "Strong dev skills, new to Web3", value: "web2", track: 1 },
    ],
  },
  {
    id: 2,
    question: "What do you want to build?",
    options: [
      { label: "DeFi Protocol", desc: "AMMs, lending, yield farming", value: "defi", track: 3 },
      { label: "NFT Project", desc: "Collections, marketplaces, gaming", value: "nft", track: 4 },
      { label: "Developer Tools", desc: "SDKs, infrastructure, tooling", value: "tools", track: 2 },
      { label: "Not Sure Yet", desc: "I want to explore everything", value: "explore", track: 1 },
    ],
  },
  {
    id: 3,
    question: "How much time can you dedicate per week?",
    options: [
      { label: "1-3 Hours", desc: "Casual learning pace", value: "casual", track: 0 },
      { label: "4-7 Hours", desc: "Steady progress", value: "steady", track: 0 },
      { label: "8-15 Hours", desc: "Intensive learning", value: "intensive", track: 0 },
      { label: "15+ Hours", desc: "Full-time grind mode", value: "fulltime", track: 0 },
    ],
  },
  {
    id: 4,
    question: "Which languages do you know?",
    options: [
      { label: "JavaScript / TypeScript", desc: "Frontend or Node.js experience", value: "js", track: 1 },
      { label: "Rust", desc: "Systems programming background", value: "rust", track: 2 },
      { label: "Python / Other", desc: "Scripting or data background", value: "python", track: 1 },
      { label: "None Yet", desc: "Starting from scratch", value: "none", track: 1 },
    ],
  },
  {
    id: 5,
    question: "What's your primary goal?",
    options: [
      { label: "Get a Job", desc: "Land a Web3 developer role", value: "job", track: 2 },
      { label: "Build a Startup", desc: "Launch my own project", value: "startup", track: 3 },
      { label: "Learn & Explore", desc: "Satisfy my curiosity", value: "learn", track: 1 },
      { label: "Earn Bounties", desc: "Contribute to Superteam", value: "bounties", track: 2 },
    ],
  },
];

const trackNames: Record<number, string> = {
  1: "Solana Fundamentals",
  2: "Anchor Developer Path",
  3: "DeFi Architect",
  4: "NFT & Gaming Track",
};

const trackDescriptions: Record<number, string> = {
  1: "Start with the basics — accounts, transactions, and the Solana programming model.",
  2: "Build real programs with the Anchor framework — the industry standard.",
  3: "Deep dive into DeFi primitives — AMMs, lending protocols, and yield strategies.",
  4: "Master NFT standards, Metaplex, and on-chain gaming mechanics.",
};

export default function OnboardingPage() {
  const router = useRouter();
  const { addXP } = useXP();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [recommendedTrack, setRecommendedTrack] = useState(1);

  function handleSelect(value: string, track: number) {
    setSelectedOption(value);
    setAnswers(prev => ({ ...prev, [currentQ]: value }));
  }

  function handleNext() {
    if (!selectedOption) return;

    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(answers[currentQ + 1] || null);
    } else {
      // Calculate recommended track from answers
      const trackVotes: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
      questions.forEach((q, i) => {
        const answer = answers[i] || selectedOption;
        const option = q.options.find(o => o.value === answer);
        if (option && option.track > 0) {
          trackVotes[option.track] = (trackVotes[option.track] || 0) + 1;
        }
      });
      const best = Object.entries(trackVotes).sort((a, b) => b[1] - a[1])[0];
      setRecommendedTrack(Number(best[0]));
      addXP(50); // bonus XP for completing onboarding
      setFinished(true);
    }
  }

  function handleSkip() {
    router.push("/courses");
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg text-center"
        >
          {/* Success */}
          <div className="w-16 h-16 bg-[#14f195]/10 border border-[#14f195]/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-[#14f195]" />
          </div>
          <div className="text-[10px] font-mono text-[#333] uppercase tracking-widest mb-3">
            // SKILL_ASSESSMENT_COMPLETE
          </div>
          <h1 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4">
            YOUR PATH IS <span className="text-[#14f195]">READY</span>
          </h1>

          {/* XP bonus */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Zap className="w-4 h-4 text-[#9945ff]" />
            <span className="text-sm font-mono text-[#9945ff]">+50 XP onboarding bonus earned!</span>
          </div>

          {/* Recommended track */}
          <div className="border border-[#9945ff]/40 bg-[#9945ff]/5 p-6 mb-6 text-left">
            <div className="text-[9px] font-mono text-[#9945ff] uppercase tracking-widest mb-3">
              RECOMMENDED TRACK
            </div>
            <div className="font-display font-black text-2xl uppercase mb-2">
              {trackNames[recommendedTrack]}
            </div>
            <p className="text-xs font-mono text-[#555] leading-relaxed">
              {trackDescriptions[recommendedTrack]}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push("/courses")}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#9945ff] text-white font-mono text-xs uppercase tracking-widest hover:bg-[#8835ef] transition-colors"
            >
              START LEARNING <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="flex-1 px-6 py-3 border border-[#1a1a1a] text-[#444] font-mono text-xs uppercase tracking-widest hover:border-[#9945ff] hover:text-[#9945ff] transition-colors"
            >
              GO TO DASHBOARD
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const question = questions[currentQ];
  const progress = ((currentQ) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center px-4 py-12">

      {/* Progress bar */}
      <div className="w-full max-w-lg mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono text-[#333] uppercase tracking-widest">
            // SKILL_ASSESSMENT
          </span>
          <span className="text-[10px] font-mono text-[#9945ff]">
            {currentQ + 1}/{questions.length}
          </span>
        </div>
        <div className="h-1 bg-[#1a1a1a] w-full">
          <motion.div
            className="h-full bg-gradient-to-r from-[#9945ff] to-[#14f195]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tighter mb-8 text-[#f5f5f0]">
              {question.question}
            </h2>

            <div className="space-y-3 mb-8">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value, option.track)}
                  className={cn(
                    "w-full text-left p-4 border transition-all",
                    selectedOption === option.value
                      ? "border-[#9945ff] bg-[#9945ff]/10"
                      : "border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#9945ff]/40 hover:bg-[#0d0d0d]"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-4 h-4 border shrink-0 flex items-center justify-center",
                      selectedOption === option.value
                        ? "border-[#9945ff] bg-[#9945ff]"
                        : "border-[#333]"
                    )}>
                      {selectedOption === option.value && (
                        <div className="w-2 h-2 bg-white" />
                      )}
                    </div>
                    <div>
                      <div className={cn(
                        "text-sm font-mono font-bold uppercase tracking-widest",
                        selectedOption === option.value ? "text-[#9945ff]" : "text-[#f5f5f0]"
                      )}>
                        {option.label}
                      </div>
                      <div className="text-[11px] font-mono text-[#444] mt-0.5">{option.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={handleSkip}
                className="text-[10px] font-mono text-[#333] hover:text-[#444] transition-colors uppercase tracking-widest"
              >
                SKIP QUIZ →
              </button>
              <button
                onClick={handleNext}
                disabled={!selectedOption}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors",
                  selectedOption
                    ? "bg-[#9945ff] text-white hover:bg-[#8835ef]"
                    : "bg-[#1a1a1a] text-[#333] cursor-not-allowed"
                )}
              >
                {currentQ === questions.length - 1 ? "FINISH" : "NEXT"}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}