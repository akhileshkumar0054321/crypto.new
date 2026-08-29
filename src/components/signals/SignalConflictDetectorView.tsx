"use client";

import { useState } from "react";
import { SignalConflictItem, ConflictSeverity } from "@/types";
import {
  AlertTriangle,
  ShieldAlert,
  ArrowRightLeft,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
  Info,
  CheckCircle2,
  HelpCircle,
  Clock,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { CryptoAvatar } from "@/components/ui/CryptoAvatar";

interface Props {
  conflicts: SignalConflictItem[];
  isLoading?: boolean;
}

export function SignalConflictDetectorView({ conflicts = [], isLoading }: Props) {
  const [filterSeverity, setFilterSeverity] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");

  const filtered = conflicts.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase()) ||
      (c.simple_name_label && c.simple_name_label.toLowerCase().includes(search.toLowerCase())) ||
      (c.divergence_explanation && c.divergence_explanation.toLowerCase().includes(search.toLowerCase()));

    let matchSeverity = true;
    if (filterSeverity === "CRITICAL") {
      matchSeverity = c.conflict_severity === "CRITICAL_DIVERGENCE";
    } else if (filterSeverity === "WARNINGS") {
      matchSeverity =
        c.conflict_severity === "HIGH_DIVERGENCE" || c.conflict_severity === "MODERATE_DIVERGENCE";
    } else if (filterSeverity === "HEALTHY") {
      matchSeverity = c.conflict_severity === "ALIGNED";
    }

    return matchSearch && matchSeverity;
  });

  const getStatusDisplay = (item: SignalConflictItem) => {
    switch (item.conflict_severity) {
      case "CRITICAL_DIVERGENCE":
        return {
          title: item.simple_name_label || "False Rally (Bull Trap Warning)",
          badgeCls: "bg-rose-500/20 text-rose-300 border-rose-500/40",
          icon: <ShieldAlert size={14} className="text-rose-400" />,
          actionCls: "bg-rose-600 text-white shadow-sm shadow-rose-600/30",
          actionLabel: "Caution: High Selling Risk",
        };
      case "HIGH_DIVERGENCE":
        return {
          title: item.simple_name_label || "Hidden Strength (False Drop Warning)",
          badgeCls: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
          icon: <TrendingUp size={14} className="text-emerald-400" />,
          actionCls: "bg-emerald-600 text-white shadow-sm shadow-emerald-600/30",
          actionLabel: "Potential Value Zone",
        };
      case "MODERATE_DIVERGENCE":
        return {
          title: item.simple_name_label || "Artificial Spike (Leverage Bets Only)",
          badgeCls: "bg-amber-500/20 text-amber-300 border-amber-500/40",
          icon: <AlertTriangle size={14} className="text-amber-400" />,
          actionCls: "bg-amber-600 text-white shadow-sm shadow-amber-600/30",
          actionLabel: "Tighten Stop-Loss",
        };
      case "ALIGNED":
      default:
        return {
          title: item.simple_name_label || "Healthy: Real Activity Confirms Price",
          badgeCls: "bg-blue-500/20 text-blue-300 border-blue-500/40",
          icon: <CheckCircle2 size={14} className="text-blue-400" />,
          actionCls: "bg-blue-600 text-white shadow-sm shadow-blue-600/30",
          actionLabel: "Healthy Trend Confirmed",
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900/60 to-slate-900/80 border border-rose-500/20 backdrop-blur-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <ArrowRightLeft size={18} className="text-rose-400" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Price vs Real Activity Disconnect
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                REALITY CHECK
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Detects when a coin’s price movement disagrees with what big wallets and actual buyers are doing. This alerts you to false rallies, artificial leverage spikes, and hidden buying strength.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setFilterSeverity("ALL")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                filterSeverity === "ALL"
                  ? "bg-slate-700 text-white"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
              }`}
            >
              All Signals ({conflicts.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterSeverity("CRITICAL")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                filterSeverity === "CRITICAL"
                  ? "bg-rose-600 text-white shadow-sm shadow-rose-600/30"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
              }`}
            >
              <ShieldAlert size={13} className="text-rose-400" />
              <span>False Rallies</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterSeverity("WARNINGS")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                filterSeverity === "WARNINGS"
                  ? "bg-amber-600 text-white shadow-sm shadow-amber-600/30"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
              }`}
            >
              <AlertTriangle size={13} className="text-amber-400" />
              <span>Warnings & Hidden Support</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterSeverity("HEALTHY")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                filterSeverity === "HEALTHY"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
              }`}
            >
              <CheckCircle2 size={13} className="text-blue-400" />
              <span>Healthy Trends</span>
            </button>
          </div>
        </div>
      </div>

      {/* Disconnect Cards List */}
      <div className="space-y-5">
        {filtered.map((item) => {
          const status = getStatusDisplay(item);

          return (
            <div
              key={item.coin_id}
              className="p-5 sm:p-6 rounded-2xl bg-[#0c1019] border border-slate-800/90 hover:border-slate-700 transition space-y-4 shadow-xl"
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-800/80">
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
                      <h3 className="font-bold text-white text-base">{item.name}</h3>
                      <span className="text-xs font-mono uppercase bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-bold">
                        {item.symbol}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-mono font-bold text-slate-200">
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

                <div className="flex flex-wrap items-center gap-2">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-bold ${status.badgeCls}`}
                  >
                    {status.icon}
                    <span>{status.title}</span>
                  </div>

                  <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${status.actionCls}`}>
                    {status.actionLabel}
                  </span>
                </div>
              </div>

              {/* Surface Appearance vs Reality (2 Simple Cards) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* What Price Action Shows */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                    <TrendingUp size={13} className="text-blue-400" />
                    <span>What the chart / price shows:</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {item.what_price_looks_like || item.signal_vectors.price_trend}
                  </p>
                </div>

                {/* What Is Really Happening Behind the Scenes */}
                <div
                  className={`p-3.5 rounded-xl border space-y-1 ${
                    item.conflict_severity === "CRITICAL_DIVERGENCE"
                      ? "bg-rose-950/20 border-rose-500/30 text-rose-200"
                      : item.conflict_severity === "HIGH_DIVERGENCE"
                      ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-200"
                      : "bg-slate-900/80 border-slate-800 text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    <ArrowRightLeft
                      size={13}
                      className={
                        item.conflict_severity === "CRITICAL_DIVERGENCE"
                          ? "text-rose-400"
                          : item.conflict_severity === "HIGH_DIVERGENCE"
                          ? "text-emerald-400"
                          : "text-cyan-400"
                      }
                    />
                    <span>What is really happening in the market:</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {item.what_is_really_happening || item.divergence_explanation}
                  </p>
                </div>
              </div>

              {/* Detailed Real Analysis in Simple Words */}
              <div className="space-y-2 pt-1">
                <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-cyan-400" />
                  <span>Detailed Market Facts:</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300 pl-1">
                  {item.detailed_analysis_points && item.detailed_analysis_points.length > 0 ? (
                    item.detailed_analysis_points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span>Large wallet activity: {item.signal_vectors.onchain_whales}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span>Direct spot buying vs derivatives: {item.signal_vectors.spot_cvd_orderbook}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span>Network utility & usage: {item.signal_vectors.dev_and_tvl}</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Practical Takeaway / Plain English Advice */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Info size={13} className="text-cyan-400" />
                    <span>Plain English Advice:</span>
                  </span>
                  {item.trap_probability_pct > 20 && (
                    <span className="text-[11px] font-mono text-slate-400">
                      Estimated Trap Risk:{" "}
                      <strong
                        className={
                          item.trap_probability_pct >= 75
                            ? "text-rose-400"
                            : item.trap_probability_pct >= 50
                            ? "text-amber-400"
                            : "text-slate-300"
                        }
                      >
                        {item.trap_probability_pct}%
                      </strong>
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {item.plain_english_advice || item.actionable_playbook}
                </p>
              </div>

              {/* Bottom Info Bar */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Clock size={12} />
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

        {filtered.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-[#0c1019] border border-slate-800 text-slate-400 text-xs">
            No signals match your filter selection.
          </div>
        )}
      </div>
    </div>
  );
}
