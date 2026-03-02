"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useXPBalance } from "@/hooks/useXPBalance";
import { shortenAddress, formatXP } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";

const filters = ["ALL_TIME", "MONTHLY", "WEEKLY"];

export default function LeaderboardPage() {
  const { publicKey } = useWallet();
  const { entries, loading, refetch } = useLeaderboard();
  const { xp, level } = useXPBalance();
  const [activeFilter, setActiveFilter] = useState("ALL_TIME");

  return (
    <div className="min-h-screen bg-[#020202]">

      {/* Header */}
      <div className="border-b border-[#1a1a1a] px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[10px] font-mono text-[#333] uppercase tracking-widest">// LEADERBOARD</span>
          <div className="flex-1 h-px bg-[#1a1a1a]" />
          <button
            onClick={refetch}
            className="flex items-center gap-2 text-[10px] font-mono text-[#444] hover:text-[#9945ff] transition-colors uppercase tracking-widest"
          >
            <RefreshCw className={cn("w-3 h-3", loading && "animate-spin")} />
            <span className="hidden sm:block">REFRESH</span>
          </button>
        </div>
        <h1 className="font-display font-black text-4xl md:text-6xl uppercase tracking-tighter">
          TOP <span className="text-[#9945ff]">BUILDERS</span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">

        {/* Your stats */}
        {publicKey && (
          <div className="border border-[#9945ff]/30 bg-[#9945ff]/5 p-4 md:p-6 mb-8 md:mb-12">
            <div className="text-[10px] font-mono text-[#9945ff] uppercase tracking-widest mb-4">// YOUR_STATS</div>
            <div className="flex flex-wrap items-center gap-6 md:gap-12">
              <div>
                <div className="text-[10px] font-mono text-[#444] mb-1">WALLET</div>
                <div className="text-xs md:text-sm font-mono text-[#f5f5f0]">{shortenAddress(publicKey.toBase58(), 8)}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#444] mb-1">TOTAL_XP</div>
                <div className="text-xs md:text-sm font-mono text-[#9945ff] font-bold">{formatXP(xp)}_XP</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#444] mb-1">LEVEL</div>
                <div className="text-xs md:text-sm font-mono text-[#14f195] font-bold">LVL_{level}</div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 md:px-5 py-2 md:py-2.5 text-[10px] font-mono uppercase tracking-widest transition-colors border",
                activeFilter === filter
                  ? "bg-[#9945ff] text-white border-[#9945ff]"
                  : "bg-[#020202] text-[#444] border-[#1a1a1a] hover:text-[#f5f5f0] hover:bg-[#0a0a0a]"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-2 mb-8">
          {entries.map((entry, i) => {
            const isUser = publicKey?.toBase58() === entry.wallet;
            return (
              <motion.div
                key={entry.wallet}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className={cn(
                  "flex items-center gap-3 p-4 border transition-colors",
                  isUser ? "border-[#9945ff]/40 bg-[#9945ff]/5" : "border-[#1a1a1a] bg-[#0a0a0a]"
                )}
              >
                <span className={cn(
                  "text-lg font-black font-display w-8 shrink-0",
                  entry.rank === 1 ? "text-[#14f195]" :
                  entry.rank === 2 ? "text-[#9945ff]" :
                  entry.rank === 3 ? "text-[#ff3366]" : "text-[#444]"
                )}>
                  {entry.rank.toString().padStart(2, "0")}
                </span>
                <div className={cn(
                  "w-8 h-8 flex items-center justify-center text-[10px] font-mono font-bold shrink-0",
                  entry.rank === 1 ? "bg-[#14f195]/20 text-[#14f195]" :
                  entry.rank === 2 ? "bg-[#9945ff]/20 text-[#9945ff]" :
                  entry.rank === 3 ? "bg-[#ff3366]/20 text-[#ff3366]" : "bg-[#1a1a1a] text-[#444]"
                )}>
                  {entry.wallet.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-xs font-mono truncate", isUser ? "text-[#9945ff]" : "text-[#666]")}>
                      {shortenAddress(entry.wallet, 6)}
                    </span>
                    {isUser && <span className="text-[9px] font-mono text-[#9945ff] border border-[#9945ff]/40 px-1.5 py-0.5 shrink-0">YOU</span>}
                  </div>
                  <span className={cn("text-[9px] font-mono", entry.rank <= 3 ? "text-[#14f195]" : "text-[#555]")}>
                    LVL_{entry.level}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm font-black font-display text-[#f5f5f0]">{formatXP(entry.xp)}</span>
                  <div className="text-[9px] font-mono text-[#333]">XP</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block border border-[#1a1a1a] overflow-hidden">
          <div className="flex border-b border-[#1a1a1a] bg-[#0a0a0a]">
            <div className="w-16 shrink-0 px-4 py-3 text-[10px] font-mono text-[#333] uppercase tracking-widest border-r border-[#1a1a1a]">RANK</div>
            <div className="w-12 shrink-0 px-3 py-3 border-r border-[#1a1a1a]" />
            <div className="flex-1 px-4 py-3 text-[10px] font-mono text-[#333] uppercase tracking-widest border-r border-[#1a1a1a]">WALLET</div>
            <div className="w-36 shrink-0 px-4 py-3 text-[10px] font-mono text-[#333] uppercase tracking-widest border-r border-[#1a1a1a] text-right">TOTAL_XP</div>
            <div className="w-28 shrink-0 px-4 py-3 text-[10px] font-mono text-[#333] uppercase tracking-widest text-right">LEVEL</div>
          </div>
          <div className="divide-y divide-[#1a1a1a]">
            {entries.map((entry, i) => {
              const isUser = publicKey?.toBase58() === entry.wallet;
              return (
                <motion.div
                  key={entry.wallet}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={cn(
                    "flex transition-colors",
                    isUser ? "bg-[#9945ff]/5 border-l-2 border-l-[#9945ff]" : "hover:bg-[#0a0a0a]"
                  )}
                >
                  <div className="w-16 shrink-0 px-4 py-4 flex items-center border-r border-[#1a1a1a]">
                    <span className={cn(
                      "text-sm font-black font-display",
                      entry.rank === 1 ? "text-[#14f195]" :
                      entry.rank === 2 ? "text-[#9945ff]" :
                      entry.rank === 3 ? "text-[#ff3366]" : "text-[#444]"
                    )}>
                      {entry.rank.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <div className="w-12 shrink-0 px-3 py-4 flex items-center justify-center border-r border-[#1a1a1a]">
                    <div className={cn(
                      "w-6 h-6 flex items-center justify-center text-[9px] font-mono font-bold",
                      entry.rank === 1 ? "bg-[#14f195]/20 text-[#14f195]" :
                      entry.rank === 2 ? "bg-[#9945ff]/20 text-[#9945ff]" :
                      entry.rank === 3 ? "bg-[#ff3366]/20 text-[#ff3366]" : "bg-[#1a1a1a] text-[#444]"
                    )}>
                      {entry.wallet.slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-1 px-4 py-4 flex items-center gap-3 border-r border-[#1a1a1a] min-w-0">
                    <span className={cn("text-xs font-mono truncate", isUser ? "text-[#9945ff]" : "text-[#666]")}>
                      {shortenAddress(entry.wallet, 10)}
                    </span>
                    {isUser && (
                      <span className="shrink-0 text-[9px] font-mono text-[#9945ff] border border-[#9945ff]/40 px-1.5 py-0.5 uppercase tracking-widest">
                        YOU
                      </span>
                    )}
                  </div>
                  <div className="w-36 shrink-0 px-4 py-4 flex items-center justify-end gap-1 border-r border-[#1a1a1a]">
                    <span className="text-sm font-black font-display text-[#f5f5f0]">{formatXP(entry.xp)}</span>
                    <span className="text-[10px] font-mono text-[#333]">XP</span>
                  </div>
                  <div className="w-28 shrink-0 px-4 py-4 flex items-center justify-end">
                    <span className={cn("text-xs font-mono font-bold", entry.rank <= 3 ? "text-[#14f195]" : "text-[#555]")}>
                      LVL_{entry.level}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {loading && (
          <div className="text-center py-12 border-t border-[#1a1a1a]">
            <div className="text-[10px] font-mono text-[#333] uppercase tracking-widest animate-pulse">
              FETCHING_ON_CHAIN_DATA...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}