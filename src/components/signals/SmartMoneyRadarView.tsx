"use client";

import { useState } from "react";
import { SmartMoneyFlowItem, SmartMoneyInterestCategory } from "@/types";
import {
  TrendingUp,
  TrendingDown,
  ArrowRightLeft,
  AlertTriangle,
  ArrowUpRight,
  ShieldAlert,
  ShieldCheck,
  Search,
  Clock,
  Coins,
  CheckCircle2,
  Info,
  Layers,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { CryptoAvatar } from "@/components/ui/CryptoAvatar";

interface Props {
  smartMoneyList: SmartMoneyFlowItem[];
  isLoading?: boolean;
}

export function SmartMoneyRadarView({ smartMoneyList = [], isLoading }: Props) {
  const [selectedCoinId, setSelectedCoinId] = useState<string>(
    smartMoneyList[0]?.coin_id || "bitcoin"
  );
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");

  const activeItem =
    smartMoneyList.find((s) => s.coin_id === selectedCoinId) || smartMoneyList[0];

  const filteredList = smartMoneyList.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.symbol.toLowerCase().includes(search.toLowerCase()) ||
      s.reason_for_interest?.toLowerCase().includes(search.toLowerCase());

    let matchCategory = true;
    if (categoryFilter === "GAINING") {
      matchCategory = s.interest_category === "GAINING_INTEREST";
    } else if (categoryFilter === "LOSING") {
      matchCategory = s.interest_category === "LOSING_INTEREST";
    } else if (categoryFilter === "NEUTRAL") {
      matchCategory = s.interest_category === "NEUTRAL_INTEREST";
    }

    return matchSearch && matchCategory;
  });

  const gainingCount = smartMoneyList.filter((s) => s.interest_category === "GAINING_INTEREST").length;
  const losingCount = smartMoneyList.filter((s) => s.interest_category === "LOSING_INTEREST").length;
  const neutralCount = smartMoneyList.filter((s) => s.interest_category === "NEUTRAL_INTEREST").length;

  const getCategoryBadge = (item: SmartMoneyFlowItem) => {
    if (item.has_unexplained_spike) {
      return {
        label: "Abrupt Interest (High Caution)",
        bg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
        icon: <AlertTriangle size={13} className="text-amber-400" />,
      };
    }

    switch (item.interest_category) {
      case "GAINING_INTEREST":
        return {
          label: item.interest_status_label || "Gaining Interest",
          bg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
          icon: <TrendingUp size={13} className="text-emerald-400" />,
        };
      case "LOSING_INTEREST":
        return {
          label: item.interest_status_label || "Losing Interest",
          bg: "bg-rose-500/20 text-rose-300 border-rose-500/40",
          icon: <TrendingDown size={13} className="text-rose-400" />,
        };
      case "NEUTRAL_INTEREST":
      default:
        return {
          label: item.interest_status_label || "Neutral / Midpoint",
          bg: "bg-slate-700/40 text-slate-300 border-slate-600/40",
          icon: <ArrowRightLeft size={13} className="text-slate-400" />,
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-slate-900/80 border border-cyan-500/20 backdrop-blur-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Coins size={18} className="text-cyan-400" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Smart Money Interest Tracker
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                BUYING & SELLING ACTIVITY
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Analyzes market activity and past buying history to identify which coins are genuinely gaining interest from smart money, which are losing interest, and which are holding in the middle.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setCategoryFilter("ALL")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                categoryFilter === "ALL"
                  ? "bg-cyan-600 text-white shadow-sm shadow-cyan-500/30"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
              }`}
            >
              All Coins ({smartMoneyList.length})
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter("GAINING")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                categoryFilter === "GAINING"
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-500/30"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
              }`}
            >
              <TrendingUp size={13} className="text-emerald-400" />
              <span>Gaining Interest ({gainingCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter("LOSING")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                categoryFilter === "LOSING"
                  ? "bg-rose-600 text-white shadow-sm shadow-rose-500/30"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
              }`}
            >
              <TrendingDown size={13} className="text-rose-400" />
              <span>Losing Interest ({losingCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter("NEUTRAL")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                categoryFilter === "NEUTRAL"
                  ? "bg-slate-700 text-white shadow-sm"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
              }`}
            >
              <ArrowRightLeft size={13} className="text-slate-400" />
              <span>Neutral / Mid ({neutralCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Coin Selector List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={14} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search coin name, symbol, or reason..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
            />
          </div>

          <div className="space-y-2.5">
            {filteredList.map((item) => {
              const isSelected = item.coin_id === activeItem?.coin_id;
              const badge = getCategoryBadge(item);

              return (
                <div
                  key={item.coin_id}
                  onClick={() => setSelectedCoinId(item.coin_id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-slate-900/95 border-cyan-500/70 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/30"
                      : "bg-[#0c1019] border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <CryptoAvatar
                        coinId={item.coin_id}
                        symbol={item.symbol}
                        name={item.name}
                        size="md"
                        className="w-10 h-10 rounded-xl"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white text-sm">{item.name}</span>
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded font-semibold uppercase">
                            {item.symbol}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-mono font-bold text-slate-300">
                            ${item.price_usd >= 1 ? item.price_usd.toLocaleString() : item.price_usd.toFixed(6)}
                          </span>
                          <span
                            className={`text-[10px] font-mono font-bold ${
                              item.price_change_24h >= 0 ? "text-emerald-400" : "text-rose-400"
                            }`}
                          >
                            {item.price_change_24h >= 0 ? "+" : ""}
                            {item.price_change_24h}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-sans">24h Net Inflow</span>
                      <span
                        className={`text-xs font-mono font-bold ${
                          item.net_smart_inflow_24h_usd >= 0 ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {item.net_smart_inflow_24h_usd >= 0 ? "+" : ""}$
                        {(Math.abs(item.net_smart_inflow_24h_usd) / 1e6).toFixed(1)}M
                      </span>
                    </div>
                  </div>

                  {/* Status Pill & Reason Snippet */}
                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg border text-[10px] font-semibold ${badge.bg}`}
                    >
                      {badge.icon}
                      <span>{badge.label}</span>
                    </span>

                    <span className="text-[11px] font-mono text-slate-400">
                      Score: <strong className="text-cyan-300">{item.smart_money_score}/100</strong>
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredList.length === 0 && (
              <div className="p-8 text-center rounded-2xl bg-[#0c1019] border border-slate-800 text-slate-400 text-xs">
                No coins match your filter criteria.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Deep Inspection Details (7 cols) */}
        {activeItem && (
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0c1019] border border-cyan-500/30 space-y-5 shadow-2xl">
              {/* Top Details Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <CryptoAvatar
                    coinId={activeItem.coin_id}
                    symbol={activeItem.symbol}
                    name={activeItem.name}
                    size="lg"
                    className="w-12 h-12 rounded-2xl"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{activeItem.name}</h3>
                      <span className="text-xs font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-bold uppercase">
                        {activeItem.symbol}
                      </span>
                      {(() => {
                        const badge = getCategoryBadge(activeItem);
                        return (
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg border text-[11px] font-semibold ${badge.bg}`}
                          >
                            {badge.icon}
                            <span>{badge.label}</span>
                          </span>
                        );
                      })()}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      ${activeItem.price_usd >= 1 ? activeItem.price_usd.toLocaleString() : activeItem.price_usd.toFixed(6)} USD · 24h change: {activeItem.price_change_24h}%
                    </p>
                  </div>
                </div>

                <Link
                  href={`/coin/${activeItem.coin_id}`}
                  className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold transition inline-flex items-center gap-1"
                >
                  <span>Coin Overview</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              {/* Retail Trap Warning Box (If Unexplained Spike or Distribution) */}
              {activeItem.retail_warning_note ? (
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-1.5 text-amber-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                    <AlertTriangle size={15} className="text-amber-400 shrink-0" />
                    <span>Retail Caution Alert:</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-200">
                    {activeItem.retail_warning_note}
                  </p>
                </div>
              ) : activeItem.interest_category === "LOSING_INTEREST" ? (
                <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1 text-xs text-rose-200">
                  <div className="flex items-center gap-1.5 font-bold text-rose-300">
                    <ShieldAlert size={14} className="text-rose-400" />
                    <span>Losing Interest Advisory:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Large holders have been depositing coins onto exchanges to sell during price spikes. Retail buyers should be careful of potential sell pressure.
                  </p>
                </div>
              ) : null}

              {/* Main Reason for Interest Box */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>Why it is gaining or losing interest (Market Activity):</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {activeItem.reason_for_interest || activeItem.primary_driver}
                </p>
              </div>

              {/* Past Buying History Box */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                  <Clock size={13} className="text-blue-400" />
                  <span>Past Buying History & Wallet Behavior:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeItem.past_buying_history ||
                    "Past buying records show consistent order activity over the last 14 to 30 days."}
                </p>
              </div>

              {/* 4 Simple Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-sans">24h Net Inflow</span>
                  <span
                    className={`text-sm font-bold font-mono ${
                      activeItem.net_smart_inflow_24h_usd >= 0 ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {activeItem.net_smart_inflow_24h_usd >= 0 ? "+" : ""}$
                    {(Math.abs(activeItem.net_smart_inflow_24h_usd) / 1e6).toFixed(1)}M
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-sans">Exchange Transfers</span>
                  <span
                    className={`text-sm font-bold font-mono ${
                      activeItem.exchange_net_flow_24h_usd <= 0 ? "text-emerald-400" : "text-amber-400"
                    }`}
                  >
                    {activeItem.exchange_net_flow_24h_usd <= 0 ? "" : "+"}$
                    {(activeItem.exchange_net_flow_24h_usd / 1e6).toFixed(1)}M
                  </span>
                  <span className="text-[9px] text-slate-500 block">
                    {activeItem.exchange_net_flow_24h_usd <= 0 ? "(Withdrawn to Storage)" : "(Deposited to Sell)"}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-sans">Top Holder Growth</span>
                  <span
                    className={`text-sm font-bold font-mono ${
                      activeItem.top_100_whale_delta_pct >= 0 ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {activeItem.top_100_whale_delta_pct >= 0 ? "+" : ""}
                    {activeItem.top_100_whale_delta_pct.toFixed(2)}%
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-sans">Buy vs Sell Orders</span>
                  <div className="flex items-center gap-1.5 font-mono text-xs mt-0.5">
                    <span className="font-bold text-emerald-400">+{activeItem.cluster_buy_count_24h}</span>
                    <span className="text-slate-600">/</span>
                    <span className="font-bold text-rose-400">-{activeItem.cluster_sell_count_24h}</span>
                  </div>
                </div>
              </div>

              {/* Summary Conclusion */}
              <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/20 space-y-1">
                <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck size={13} />
                  <span>Market Summary:</span>
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">{activeItem.summary_verdict}</p>
              </div>

              {/* Recent Major Transactions */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider font-sans">
                    Recent Large Wallet Transactions
                  </span>
                  <span className="text-[10px] text-slate-500">Live Activity Feed</span>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {activeItem.recent_major_transactions.map((tx) => {
                    const isBuy = tx.type === "BUY" || tx.type === "TRANSFER_OUT";
                    return (
                      <div
                        key={tx.id}
                        className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs hover:border-slate-700 transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`p-1.5 rounded-lg text-[10px] font-mono font-bold ${
                              isBuy
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                            }`}
                          >
                            {tx.type}
                          </span>
                          <div>
                            <span className="font-bold text-slate-200 block">{tx.wallet_label}</span>
                            <span className="text-[10px] font-sans text-slate-500">
                              {tx.entity_type} · {tx.address_hint}
                            </span>
                          </div>
                        </div>

                        <div className="text-right font-mono">
                          <span className="font-bold text-white block">
                            ${(tx.amount_usd / 1e6).toFixed(2)}M
                          </span>
                          <span className="text-[10px] text-slate-400">{tx.timestamp}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
