"use client";

import { useState } from "react";
import { ThesisAndInvalidation } from "@/types";
import { signalsApi } from "@/lib/api";
import {
  Target,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Search,
  RefreshCw,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Milestone,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { CryptoAvatar } from "@/components/ui/CryptoAvatar";

interface Props {
  initialTheses?: ThesisAndInvalidation[];
  coinId?: string;
}

export function ThesisInvalidationView({ initialTheses = [], coinId }: Props) {
  const [currentCoin, setCurrentCoin] = useState<string>(
    coinId || initialTheses[0]?.coin_id || "bitcoin"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [thesisData, setThesisData] = useState<ThesisAndInvalidation | null>(
    initialTheses.find((t) => t.coin_id === (coinId || "bitcoin")) || initialTheses[0] || null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFetchOrGenerate = async (targetCoin: string) => {
    setIsLoading(true);
    try {
      const res = await signalsApi.getThesisInvalidation(targetCoin);
      if (res.data?.success && res.data?.data) {
        setThesisData(res.data.data);
        setCurrentCoin(targetCoin);
      }
    } catch (err) {
      console.error("Thesis generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    handleFetchOrGenerate(searchQuery.trim().toLowerCase());
  };

  const quickCoins = [
    { id: "bitcoin", label: "Bitcoin (BTC)" },
    { id: "solana", label: "Solana (SOL)" },
    { id: "sui", label: "Sui Network (SUI)" },
    { id: "ethereum", label: "Ethereum (ETH)" },
    { id: "bittensor", label: "Bittensor (TAO)" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-900/60 border border-emerald-500/30 backdrop-blur-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Target size={18} className="text-emerald-400" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Trade Thesis & Exit Plan
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                OPPORTUNITY & EXIT RULES
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Explains why the investment opportunity exists, target upside price levels, and the exact stop-loss rules that tell you when to exit.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {quickCoins.map((qc) => (
              <button
                key={qc.id}
                type="button"
                onClick={() => handleFetchOrGenerate(qc.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  currentCoin.toLowerCase() === qc.id
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                    : "bg-slate-900 text-slate-300 border border-slate-800 hover:text-white"
                }`}
              >
                {qc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mt-5 pt-4 border-t border-slate-800/80 flex gap-2">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Generate Thesis & Invalidation for any cryptocurrency (e.g. Near, Hyperliquid, Aerodrome)..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Sparkles size={14} />
            <span>{isLoading ? "Generating Thesis..." : "Build Thesis"}</span>
          </button>
        </form>
      </div>

      {/* Main Thesis Display */}
      {isLoading ? (
        <div className="p-16 text-center rounded-2xl bg-[#0c1019] border border-emerald-500/20 space-y-3">
          <RefreshCw size={28} className="animate-spin text-emerald-400 mx-auto" />
          <p className="text-sm font-bold text-white">Synthesizing Investment Thesis & Invalidation Rules...</p>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Formulating macro thesis, asymmetric upside horizons, catalyst timeline, and programmatic stop boundaries.
          </p>
        </div>
      ) : thesisData ? (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#0c1019] border border-emerald-500/30 space-y-6 shadow-2xl">
            {/* Header with Risk-Reward and Target Multiple */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <CryptoAvatar
                  coinId={thesisData.coin_id}
                  symbol={thesisData.symbol}
                  name={thesisData.name}
                  size="lg"
                  className="w-12 h-12 rounded-2xl"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{thesisData.name} Investment Thesis</h3>
                    <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                      {thesisData.symbol}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-300">
                    Current Base Price: ${thesisData.current_price_usd >= 1 ? thesisData.current_price_usd.toLocaleString() : thesisData.current_price_usd.toFixed(6)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-mono block">Upside Potential</span>
                  <span className="text-base font-extrabold font-mono text-emerald-400 block mt-0.5">
                    {thesisData.asymmetric_upside_multiple}
                  </span>
                </div>

                <div className="text-right pl-4 border-l border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono block">Risk/Reward Asymmetry</span>
                  <span className="text-sm font-bold font-mono text-cyan-300 block mt-0.5">
                    {thesisData.risk_to_reward_ratio}
                  </span>
                </div>
              </div>
            </div>

            {/* Plain English Summary & Why It Matters Banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-500/30 space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Target size={13} />
                  <span>The Investment Opportunity in Simple Words</span>
                </span>
                <p className="text-xs text-emerald-100/90 font-medium leading-relaxed">
                  {thesisData.simple_opportunity_summary || thesisData.core_opportunity_thesis.slice(0, 200) + "..."}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <TrendingUp size={13} />
                  <span>Expected Price Growth & Outlook</span>
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {thesisData.target_summary || `Expected price of ${thesisData.target_price_horizon.target} based on ecosystem adoption and market inflows.`}
                </p>
              </div>
            </div>

            {/* Core Thesis & Why Now */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Target size={13} />
                  <span>1. Detailed Market Thesis (Why this coin grows)</span>
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {thesisData.core_opportunity_thesis}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Sparkles size={13} />
                  <span>2. Why The Opportunity Exists Right Now</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {thesisData.why_opportunity_exists_now}
                </p>
              </div>
            </div>

            {/* Expected Price Horizons */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider font-mono block">
                Expected Price Horizons
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 font-mono block">Conservative Expected Price</span>
                  <span className="text-sm font-bold font-mono text-slate-200 block mt-1">
                    {thesisData.target_price_horizon.conservative}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center">
                  <span className="text-[10px] text-emerald-400 font-mono block">Base Case Expected Price</span>
                  <span className="text-base font-extrabold font-mono text-emerald-300 block mt-1">
                    {thesisData.target_price_horizon.target}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-center">
                  <span className="text-[10px] text-cyan-400 font-mono block">Bull Cycle Expected Price</span>
                  <span className="text-base font-extrabold font-mono text-cyan-300 block mt-1">
                    {thesisData.target_price_horizon.moonshot}
                  </span>
                </div>
              </div>
            </div>

            {/* Exit Rules & Hard Stops */}
            <div className="p-5 rounded-2xl bg-rose-950/15 border border-rose-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} className="text-rose-400" />
                  <span className="text-sm font-bold text-rose-300">
                    When to Exit & Stop Loss Rules (What Makes This Trade Wrong)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded font-bold">
                  EXIT TRIGGER CONDITIONS
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If any of these conditions happen in the real market, <strong className="text-white">exit or reduce your position</strong> to avoid heavy losses:
              </p>

              {/* Plain English Exit Rules Bullet List */}
              {thesisData.plain_exit_rules && thesisData.plain_exit_rules.length > 0 && (
                <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono font-bold text-rose-300 uppercase tracking-wider block">
                    Direct Plain-English Exit Checklist:
                  </span>
                  <div className="space-y-1.5">
                    {thesisData.plain_exit_rules.map((rule, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                        <span className="text-rose-400 font-bold font-mono">#{idx + 1}</span>
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-1">
                {thesisData.deterministic_invalidation_rules.map((rule) => {
                  const isHardStop = rule.severity === "HARD_STOP";
                  return (
                    <div
                      key={rule.id}
                      className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
                              isHardStop
                                ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                                : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                            }`}
                          >
                            {rule.severity.replace(/_/g, " ")}
                          </span>
                          <span className="font-mono text-[11px] text-slate-400">
                            Trigger Level: <strong className="text-slate-200">{rule.threshold_metric}</strong>
                          </span>
                        </div>
                        <p className="text-slate-300">{rule.condition}</p>
                      </div>

                      <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-4 min-w-[200px]">
                        <span className="text-[10px] text-slate-500 font-mono block">Action Required:</span>
                        <span className="font-bold text-rose-300 text-[11px] block mt-0.5">
                          {rule.invalidation_action}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Catalyst Milestones & Tactical Execution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Milestone size={14} className="text-emerald-400" />
                  <span>Key Catalyst Milestones</span>
                </span>
                <div className="space-y-2">
                  {thesisData.catalyst_milestones.map((cat, idx) => (
                    <div key={idx} className="text-xs space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded font-bold">
                          {cat.timeframe}
                        </span>
                        <span className="font-bold text-slate-200">{cat.event}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 pl-1">{cat.expected_impact}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-blue-400" />
                  <span>Tactical Execution Guide</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {thesisData.execution_guide}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/coin/${thesisData.coin_id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>Inspect Live On-Chain Metrics</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
