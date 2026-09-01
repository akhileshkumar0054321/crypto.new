"use client";

import { useState } from "react";
import { EarlySignalItem } from "@/types";
import {
  Search,
  Zap,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  RefreshCw,
  Info,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Clock,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { CryptoAvatar } from "@/components/ui/CryptoAvatar";

interface Props {
  signals: EarlySignalItem[];
  isLoading?: boolean;
  onRefresh?: () => void;
}

export function EarlySignalDetectorView({ signals = [], isLoading, onRefresh }: Props) {
  const [search, setSearch] = useState("");
  const [trendFilter, setTrendFilter] = useState<string>("ALL");
  const [minConfidence, setMinConfidence] = useState<number>(70);

  const filters = [
    { key: "ALL", label: "All Trends" },
    { key: "UPWARD", label: "Upward Momentum" },
    { key: "NEUTRAL", label: "Consolidating" },
    { key: "BREAKDOWN", label: "Breakdown Risks" },
  ];

  const filtered = signals.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.symbol.toLowerCase().includes(search.toLowerCase()) ||
      (s.predicted_trend && s.predicted_trend.toLowerCase().includes(search.toLowerCase())) ||
      (s.simple_trend_summary && s.simple_trend_summary.toLowerCase().includes(search.toLowerCase()));

    let matchTrend = true;
    if (trendFilter === "UPWARD") {
      matchTrend = s.trend_direction === "UPWARD";
    } else if (trendFilter === "NEUTRAL") {
      matchTrend = s.trend_direction === "NEUTRAL";
    } else if (trendFilter === "BREAKDOWN") {
      matchTrend = s.breakdown_prediction?.has_breakdown_risk || s.breakdown_prediction?.breakdown_risk_level === "ELEVATED" || s.breakdown_prediction?.breakdown_risk_level === "HIGH";
    }

    const matchConf = (s.breakout_probability_pct || 70) >= minConfidence;

    return matchSearch && matchTrend && matchConf;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-slate-900/80 border border-blue-500/20 backdrop-blur-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <Zap size={18} className="text-amber-400" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Early Trend Detector
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                TREND & BREAKDOWN PREDICTIONS
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Analyzes market activity, trading volume, wallet transfers, and news catalysts to predict which coins are more likely to trend up or possibly experience a breakdown.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-amber-300/90 font-medium pt-0.5">
              <Info size={12} className="shrink-0 text-amber-400" />
              <span>
                Note: Crypto markets are unpredictable. Predictions show estimated probabilities rather than guaranteed certainty.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-right">
              <span className="text-[10px] text-blue-400 font-mono block">MONITORED COINS</span>
              <span className="text-sm font-bold text-white font-mono">{signals.length} Trends Tracked</span>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search coin name, symbol, or reason..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-sans"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full text-xs">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setTrendFilter(f.key)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition cursor-pointer text-xs ${
                  trendFilter === f.key
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                    : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto text-xs text-slate-400">
            <span className="text-[11px] whitespace-nowrap">Min Confidence:</span>
            <select
              value={minConfidence}
              onChange={(e) => setMinConfidence(Number(e.target.value))}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value={50}>50%+</option>
              <option value={70}>70%+</option>
              <option value={80}>80%+ High Probability</option>
            </select>
          </div>
        </div>
      </div>

      {/* Trend Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => {
          const isUpward = item.trend_direction === "UPWARD" || (item.breakout_probability_pct || 0) >= 75;
          const breakdownRisk = item.breakdown_prediction?.breakdown_risk_level || "LOW";
          const hasElevatedBreakdown = breakdownRisk === "ELEVATED" || breakdownRisk === "HIGH";

          return (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-2xl bg-[#0c1019] border border-slate-800/90 hover:border-blue-500/40 transition-all duration-200 shadow-lg flex flex-col justify-between space-y-4"
            >
              {/* Top Row: Coin Info + Estimated Trend Probability */}
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <CryptoAvatar
                      coinId={item.coin_id}
                      symbol={item.symbol}
                      name={item.name}
                      size="md"
                      className="w-11 h-11 rounded-xl"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base">{item.name}</span>
                        <span className="text-xs font-mono uppercase bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-semibold">
                          {item.symbol}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm font-mono font-bold text-slate-100">
                          ${item.price_usd >= 1 ? item.price_usd.toLocaleString() : item.price_usd.toFixed(6)}
                        </span>
                        <span
                          className={`text-xs font-mono font-bold ${
                            item.price_change_24h >= 0 ? "text-emerald-400" : "text-rose-400"
                          }`}
                        >
                          {item.price_change_24h >= 0 ? "+" : ""}
                          {item.price_change_24h.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right px-3 py-1.5 rounded-xl border border-blue-500/30 bg-blue-500/10">
                    <span className="text-[10px] text-blue-300 uppercase block font-semibold">Trend Probability</span>
                    <span className="text-base font-extrabold font-mono text-blue-400">
                      {item.breakout_probability_pct}%
                    </span>
                  </div>
                </div>

                {/* Main Trend Prediction Box */}
                <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                    <TrendingUp size={14} className="text-emerald-400" />
                    <span>Predicted Trend:</span>
                    <span className="text-slate-100 font-semibold">{item.predicted_trend || "Upward trend is more likely"}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.simple_trend_summary || item.why_pre_trend}
                  </p>
                </div>

                {/* Detailed Reasons in Simple Words */}
                <div className="space-y-2 pt-1">
                  <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-400" />
                    <span>Why this trend is more likely:</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300 pl-1">
                    {item.detailed_reasons && item.detailed_reasons.length > 0 ? (
                      item.detailed_reasons.map((reason, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">•</span>
                          <span>{reason}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">•</span>
                          <span>Trading volume increased by {item.volume_surge_ratio}x compared to normal levels.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">•</span>
                          <span>About {item.dormant_wallets_reactivated} inactive wallets started moving coins into storage.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">•</span>
                          <span>Recent news and network updates have supported steady buyer interest.</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Possible Breakdown Warning Box */}
                <div
                  className={`p-3 rounded-xl border space-y-1.5 text-xs ${
                    hasElevatedBreakdown
                      ? "bg-rose-950/20 border-rose-500/30 text-rose-200"
                      : "bg-slate-900/60 border-slate-800 text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold">
                      <AlertTriangle
                        size={13}
                        className={hasElevatedBreakdown ? "text-rose-400" : "text-amber-400"}
                      />
                      <span>Possible Breakdown Analysis:</span>
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                        breakdownRisk === "HIGH"
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : breakdownRisk === "ELEVATED"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      }`}
                    >
                      {breakdownRisk} Risk
                    </span>
                  </div>

                  <p className="text-[11px] leading-relaxed text-slate-300">
                    {item.breakdown_prediction?.breakdown_warning ||
                      "A breakdown is less likely while support holds, but could possibly happen if high selling volume breaks current price levels."}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                    <div className="p-1.5 rounded bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-500 text-[10px] block font-sans">Support Level:</span>
                      <span className="text-slate-200 font-bold">
                        {item.breakdown_prediction?.critical_support || item.entry_zone.split("-")[0] || "Support"}
                      </span>
                    </div>
                    <div className="p-1.5 rounded bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-500 text-[10px] block font-sans">Expected Price Resistance:</span>
                      <span className="text-slate-200 font-bold">
                        {item.breakdown_prediction?.overhead_resistance || item.entry_zone.split("-")[1] || "Resistance"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Info & Details Link */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Clock size={12} className="text-slate-500" />
                  <span>Detected: {item.detected_at}</span>
                </div>

                <Link
                  href={`/coin/${item.coin_id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition"
                >
                  <span>Coin Overview</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-[#0c1019] border border-slate-800 space-y-2">
          <Info size={28} className="text-slate-500 mx-auto" />
          <p className="text-sm font-semibold text-slate-300">No trend predictions match your current filter.</p>
          <p className="text-xs text-slate-500">Try choosing &quot;All Trends&quot; or lowering the minimum confidence level.</p>
        </div>
      )}
    </div>
  );
}

