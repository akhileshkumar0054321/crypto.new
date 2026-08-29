"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { coinApi } from "@/lib/api";
import { useLiveMarket } from "@/lib/context/LiveMarketContext";
import { puterKvGet, puterKvSet } from "@/lib/puter";
import {
  Briefcase,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Plus,
  Trash2,
  PieChart as PieIcon,
  AlertTriangle,
  Zap,
  Activity,
  ArrowUpRight,
  BarChart2,
  LineChart,
  Layers,
  Search,
  CheckCircle2,
  RefreshCw,
  Sliders,
  DollarSign,
  Maximize2,
  LayoutGrid,
  Table as TableIcon,
  Info,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { CryptoAvatar } from "@/components/ui/CryptoAvatar";
import { RealtimeCoinMiniBarGraph } from "@/components/charts/RealtimeCoinMiniBarGraph";
import { RealtimeCoinChartModal } from "@/components/charts/RealtimeCoinChartModal";

interface Holding {
  coin_id: string;
  symbol: string;
  name: string;
  amount: number;
  avgBuyPrice: number;
}

const DEFAULT_HOLDINGS: Holding[] = [
  { coin_id: "bitcoin", symbol: "BTC", name: "Bitcoin", amount: 1.25, avgBuyPrice: 64200 },
  { coin_id: "ethereum", symbol: "ETH", name: "Ethereum", amount: 8.5, avgBuyPrice: 2650 },
  { coin_id: "solana", symbol: "SOL", name: "Solana", amount: 45, avgBuyPrice: 110 },
  { coin_id: "pepe", symbol: "PEPE", name: "Pepe", amount: 500000000, avgBuyPrice: 0.0000032 },
  { coin_id: "sui", symbol: "SUI", name: "Sui", amount: 1200, avgBuyPrice: 1.85 },
];

const POPULAR_COINS_PRESETS = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "solana", symbol: "SOL", name: "Solana" },
  { id: "binancecoin", symbol: "BNB", name: "BNB" },
  { id: "ripple", symbol: "XRP", name: "XRP" },
  { id: "cardano", symbol: "ADA", name: "Cardano" },
  { id: "dogecoin", symbol: "DOGE", name: "Dogecoin" },
  { id: "pepe", symbol: "PEPE", name: "Pepe" },
  { id: "avalanche-2", symbol: "AVAX", name: "Avalanche" },
  { id: "sui", symbol: "SUI", name: "Sui" },
  { id: "near", symbol: "NEAR", name: "NEAR" },
  { id: "bittensor", symbol: "TAO", name: "Bittensor" },
];

export default function PortfolioAnalysisPage() {
  const { getLiveCoin, livePrices } = useLiveMarket();
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedChartCoin, setSelectedChartCoin] = useState<any | null>(null);

  const { data: rawCoins } = useQuery({
    queryKey: ["portfolio-coins"],
    queryFn: () => coinApi.getAll().then((r) => r.data).catch(() => []),
  });
  const coins: any[] = useMemo(() => (Array.isArray(rawCoins) ? rawCoins : []), [rawCoins]);

  const [holdings, setHoldings] = useState<Holding[]>(DEFAULT_HOLDINGS);

  // Load cloud portfolio from Puter KV on mount
  useEffect(() => {
    async function loadPortfolio() {
      const saved = await puterKvGet<Holding[]>("user_portfolio_holdings", DEFAULT_HOLDINGS);
      if (saved && Array.isArray(saved) && saved.length > 0) {
        setHoldings(saved);
      }
    }
    loadPortfolio();
  }, []);

  // Add Asset Form States
  const [newCoinId, setNewCoinId] = useState("bitcoin");
  const [newAmount, setNewAmount] = useState("1");
  const [newBuyPrice, setNewBuyPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Get live data for selected form coin
  const selectedCoinData = useMemo(() => {
    const matched = coins.find((c: any) => c.coin_id === newCoinId);
    const basePrice = matched ? matched.price_usd : 100;
    const baseChange = matched ? matched.price_change_24h : 0;
    const live = getLiveCoin(newCoinId, basePrice, baseChange);
    return {
      coin_id: newCoinId,
      name: matched?.name || newCoinId.toUpperCase(),
      symbol: matched?.symbol?.toUpperCase() || newCoinId.slice(0, 4).toUpperCase(),
      image_url: matched?.image_url,
      price_usd: live.price,
      price_change_24h: live.change24h,
      risk_score: matched?.risk_score || 35,
      direction: live.direction,
    };
  }, [newCoinId, coins, getLiveCoin]);

  // Set default buy price when coin changes
  useEffect(() => {
    if (selectedCoinData && !newBuyPrice) {
      setNewBuyPrice(selectedCoinData.price_usd.toString());
    }
  }, [newCoinId, selectedCoinData]);

  const addHolding = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newCoinId || !newAmount || parseFloat(newAmount) <= 0) return;

    const matched = coins.find((c: any) => c.coin_id === newCoinId);
    const symbol = matched ? matched.symbol?.toUpperCase() : selectedCoinData.symbol;
    const name = matched ? matched.name : selectedCoinData.name;
    const price = parseFloat(newBuyPrice) || selectedCoinData.price_usd;

    // Check if already in portfolio
    const existingIndex = holdings.findIndex((h) => h.coin_id === newCoinId);
    let updated: Holding[];

    if (existingIndex >= 0) {
      // Average in
      const existing = holdings[existingIndex];
      const totalAmount = existing.amount + parseFloat(newAmount);
      const totalCost = existing.amount * existing.avgBuyPrice + parseFloat(newAmount) * price;
      const newAvg = totalCost / totalAmount;

      updated = [...holdings];
      updated[existingIndex] = {
        ...existing,
        amount: totalAmount,
        avgBuyPrice: newAvg,
      };
    } else {
      updated = [
        ...holdings,
        {
          coin_id: newCoinId,
          symbol,
          name,
          amount: parseFloat(newAmount),
          avgBuyPrice: price,
        },
      ];
    }

    setHoldings(updated);
    puterKvSet("user_portfolio_holdings", updated);
    setNewAmount("1");
  };

  const removeHolding = (coinId: string) => {
    const updated = holdings.filter((h) => h.coin_id !== coinId);
    setHoldings(updated);
    puterKvSet("user_portfolio_holdings", updated);
  };

  const resetToDefault = () => {
    setHoldings(DEFAULT_HOLDINGS);
    puterKvSet("user_portfolio_holdings", DEFAULT_HOLDINGS);
  };

  // Evaluate holdings in real-time
  let totalValueUsd = 0;
  let totalCostUsd = 0;
  let total24hChangeDollar = 0;

  const evaluatedHoldings = holdings.map((h) => {
    const matched = coins.find((c: any) => c.coin_id === h.coin_id);
    const basePrice = matched ? matched.price_usd : h.avgBuyPrice;
    const live = getLiveCoin(h.coin_id, basePrice, matched?.price_change_24h || 0);
    const currentPrice = live.price || basePrice;
    const currentValue = h.amount * currentPrice;
    const costBasis = h.amount * h.avgBuyPrice;
    const pnl = currentValue - costBasis;
    const pnlPercent = costBasis > 0 ? (pnl / costBasis) * 100 : 0;
    const riskScore = matched?.risk_score || (h.coin_id === "pepe" ? 78 : 32);
    const change24h = live.change24h ?? 0;
    const value24hAgo = currentValue / (1 + change24h / 100);
    const changeDollar24h = currentValue - value24hAgo;

    totalValueUsd += currentValue;
    totalCostUsd += costBasis;
    total24hChangeDollar += changeDollar24h;

    return {
      ...h,
      currentPrice,
      currentValue,
      costBasis,
      pnl,
      pnlPercent,
      riskScore,
      change24h,
      changeDollar24h,
      direction: live.direction,
      matchedCoin: matched,
    };
  });

  // Calculate allocations & weighted risk
  let weightedRiskScore = 0;
  evaluatedHoldings.forEach((h) => {
    const share = totalValueUsd > 0 ? (h.currentValue / totalValueUsd) * 100 : 0;
    (h as any).sharePercent = share;
    if (totalValueUsd > 0) {
      weightedRiskScore += (h.currentValue / totalValueUsd) * h.riskScore;
    }
  });

  const totalPnl = totalValueUsd - totalCostUsd;
  const totalPnlPct = totalCostUsd > 0 ? (totalPnl / totalCostUsd) * 100 : 0;
  const total24hChangePct =
    totalValueUsd > 0 && totalValueUsd - total24hChangeDollar > 0
      ? (total24hChangeDollar / (totalValueUsd - total24hChangeDollar)) * 100
      : 0;

  // Filter list of available coins for dropdown
  const filteredCoins = useMemo(() => {
    if (!searchQuery) return coins.slice(0, 80);
    const q = searchQuery.toLowerCase();
    return coins.filter(
      (c: any) =>
        c.name?.toLowerCase().includes(q) ||
        c.symbol?.toLowerCase().includes(q) ||
        c.coin_id?.toLowerCase().includes(q)
    );
  }, [coins, searchQuery]);

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-7xl mx-auto">
      {/* ── Page Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold mb-2">
            <Activity size={13} className="animate-pulse text-blue-400" />
            <span>REAL-TIME PORTFOLIO ENGINE</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Briefcase size={28} className="text-blue-400" />
            <span>Portfolio Analysis</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Real-time portfolio analytics, live profit & loss tracking, risk exposure, and asset allocation across decentralized & spot holdings.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          <button
            type="button"
            onClick={resetToDefault}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            title="Reset to default sample portfolio"
          >
            <RefreshCw size={13} />
            <span>Reset Demo</span>
          </button>

          <Link
            href="/pricing"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition"
          >
            <Sparkles size={13} />
            <span>Multi-Wallet Sync</span>
          </Link>
        </div>
      </div>

      {/* ── Overview Financial Metrics ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Value */}
        <div className="card p-5 space-y-2 bg-[#0b0f19] border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider font-mono">
              Total Portfolio Value
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <p className="text-3xl font-black font-mono text-white tracking-tight">
            ${totalValueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/60 font-mono">
            <span className="text-slate-500">Cost Basis:</span>
            <span className="text-slate-300 font-bold">
              ${totalCostUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Total Profit & Loss */}
        <div className="card p-5 space-y-2 bg-[#0b0f19] border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider font-mono">
              Total Net Return (PnL)
            </span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                totalPnl >= 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
              }`}
            >
              {totalPnlPct >= 0 ? "+" : ""}{totalPnlPct.toFixed(2)}% ROI
            </span>
          </div>
          <p
            className={`text-3xl font-black font-mono flex items-center gap-1.5 tracking-tight ${
              totalPnl >= 0 ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {totalPnl >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
            {totalPnl >= 0 ? "+" : ""}${Math.abs(totalPnl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/60 font-mono">
            <span className="text-slate-500">24h Gain/Loss:</span>
            <span className={`font-bold ${total24hChangeDollar >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
              {total24hChangeDollar >= 0 ? "+" : ""}${Math.abs(total24hChangeDollar).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({total24hChangePct >= 0 ? "+" : ""}{total24hChangePct.toFixed(2)}%)
            </span>
          </div>
        </div>

        {/* Weighted Risk Score */}
        <div className="card p-5 space-y-2 bg-[#0b0f19] border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider font-mono">
              Weighted Risk Rating
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                weightedRiskScore >= 70
                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  : weightedRiskScore >= 40
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              }`}
            >
              {weightedRiskScore >= 70 ? "ELEVATED RISK" : weightedRiskScore >= 40 ? "MODERATE" : "LOW RISK"}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black font-mono text-amber-400 tracking-tight">
              {weightedRiskScore.toFixed(1)}
            </p>
            <span className="text-xs text-slate-500 font-mono font-semibold">/ 100</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/60">
            <span className="text-slate-500">Risk Assessment:</span>
            <span className="text-slate-300 font-medium">Weighted by asset size</span>
          </div>
        </div>

        {/* 24h Risk Drawdown / VaR */}
        <div className="card p-5 space-y-2 bg-[#0b0f19] border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider font-mono">
              Value at Risk (24h VaR)
            </span>
            <ShieldAlert size={15} className="text-rose-400" />
          </div>
          <p className="text-3xl font-black font-mono text-rose-400 tracking-tight">
            -${(totalValueUsd * 0.078).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/60">
            <span className="text-slate-500">95% Conf. Drawdown:</span>
            <span className="text-slate-300 font-mono font-bold">~7.8% Max Expected</span>
          </div>
        </div>
      </div>

      {/* ── Asset Allocation Bar ─────────────────────────────────────────────── */}
      {totalValueUsd > 0 && (
        <div className="card p-5 bg-[#0b0f19] border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <PieIcon size={14} className="text-blue-400" />
              <span>Asset Allocation Breakdown</span>
            </span>
            <span className="text-slate-400 font-mono">{holdings.length} Assets in Allocation</span>
          </div>

          {/* Allocation Progress Bar */}
          <div className="w-full h-3.5 rounded-full overflow-hidden flex bg-slate-900 border border-slate-800">
            {evaluatedHoldings.map((h: any, i) => {
              const colors = [
                "bg-amber-500",
                "bg-blue-500",
                "bg-purple-500",
                "bg-emerald-500",
                "bg-cyan-500",
                "bg-rose-500",
                "bg-indigo-500",
                "bg-teal-500",
              ];
              const color = colors[i % colors.length];
              return (
                <div
                  key={h.coin_id}
                  style={{ width: `${Math.max(1, h.sharePercent || 0)}%` }}
                  className={`${color} h-full transition-all duration-500 hover:brightness-125`}
                  title={`${h.name} (${h.symbol}): ${h.sharePercent.toFixed(1)}% ($${h.currentValue.toLocaleString(undefined, { maximumFractionDigits: 0 })})`}
                />
              );
            })}
          </div>

          {/* Allocation Chips */}
          <div className="flex items-center gap-3 flex-wrap pt-1">
            {evaluatedHoldings.map((h: any, i) => {
              const dotColors = [
                "bg-amber-500",
                "bg-blue-500",
                "bg-purple-500",
                "bg-emerald-500",
                "bg-cyan-500",
                "bg-rose-500",
                "bg-indigo-500",
                "bg-teal-500",
              ];
              const dotColor = dotColors[i % dotColors.length];
              return (
                <div key={h.coin_id} className="flex items-center gap-1.5 text-xs font-mono">
                  <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                  <span className="text-slate-300 font-bold">{h.symbol}:</span>
                  <span className="text-slate-400">{h.sharePercent.toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Add Asset to Portfolio (With Live Real-Time Price & Live Graph) ────── */}
      <div className="card p-6 bg-gradient-to-r from-[#0c1220] via-[#090d18] to-[#0c1220] border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Plus size={16} className="text-blue-400" />
              <span>Add Cryptocurrency to Portfolio</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select any coin, adjust quantity, and preview real-time price & live candlestick graph.
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
            {POPULAR_COINS_PRESETS.slice(0, 6).map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setNewCoinId(preset.id);
                  const matched = coins.find((c: any) => c.coin_id === preset.id);
                  const p = matched ? matched.price_usd : 100;
                  setNewBuyPrice(p.toString());
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition cursor-pointer ${
                  newCoinId === preset.id
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                    : "bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {preset.symbol}
              </button>
            ))}
          </div>
        </div>

        {/* Live Asset Preview Banner */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CryptoAvatar
              coinId={selectedCoinData.coin_id}
              symbol={selectedCoinData.symbol}
              name={selectedCoinData.name}
              imageUrl={selectedCoinData.image_url}
              size="lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-white text-base">{selectedCoinData.name}</h4>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                  {selectedCoinData.symbol}
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                    selectedCoinData.price_change_24h >= 0
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-rose-500/20 text-rose-400"
                  }`}
                >
                  {selectedCoinData.price_change_24h >= 0 ? "+" : ""}
                  {selectedCoinData.price_change_24h.toFixed(2)}%
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                <span>Live Feed:</span>
                <span className="font-mono font-bold text-white text-sm">
                  ${selectedCoinData.price_usd >= 1 ? selectedCoinData.price_usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : selectedCoinData.price_usd.toFixed(6)}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </p>
            </div>
          </div>

          {/* Mini Real-Time Graph for selected coin */}
          <div className="flex items-center gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 font-mono font-bold uppercase block">
                24h Real-Time Trend
              </span>
              <RealtimeCoinMiniBarGraph
                coinId={selectedCoinData.coin_id}
                currentPrice={selectedCoinData.price_usd}
                change24h={selectedCoinData.price_change_24h}
                direction={selectedCoinData.direction}
                width={130}
                height={34}
                onClick={() =>
                  setSelectedChartCoin({
                    coin_id: selectedCoinData.coin_id,
                    name: selectedCoinData.name,
                    symbol: selectedCoinData.symbol,
                    price_usd: selectedCoinData.price_usd,
                    price_change_24h: selectedCoinData.price_change_24h,
                  })
                }
              />
            </div>

            {/* Calculated Estimated Cost Preview */}
            <div className="p-2.5 rounded-lg bg-blue-950/30 border border-blue-500/30 text-right">
              <span className="text-[10px] text-blue-300 font-mono uppercase block font-bold">
                Estimated Value
              </span>
              <span className="text-sm font-black font-mono text-white block mt-0.5">
                ${((parseFloat(newAmount) || 0) * (selectedCoinData.price_usd || 0)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Input Controls Grid */}
        <form onSubmit={addHolding} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          {/* Select Cryptocurrency */}
          <div className="sm:col-span-4 space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">
              Choose Asset
            </label>
            <select
              value={newCoinId}
              onChange={(e) => {
                const val = e.target.value;
                setNewCoinId(val);
                const matched = coins.find((c: any) => c.coin_id === val);
                if (matched) {
                  setNewBuyPrice(matched.price_usd.toString());
                }
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500 transition font-mono"
            >
              {filteredCoins.map((c: any) => (
                <option key={c.coin_id} value={c.coin_id}>
                  {c.name} ({c.symbol?.toUpperCase()}) — ${c.price_usd >= 1 ? c.price_usd.toLocaleString(undefined, { maximumFractionDigits: 2 }) : c.price_usd.toFixed(6)}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div className="sm:col-span-3 space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">
              Quantity / Units
            </label>
            <input
              type="number"
              step="any"
              min="0.00000001"
              placeholder="e.g. 2.5"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500 transition font-mono"
              required
            />
          </div>

          {/* Avg Buy Price */}
          <div className="sm:col-span-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">
                Avg Buy Price ($)
              </label>
              <button
                type="button"
                onClick={() => setNewBuyPrice(selectedCoinData.price_usd.toString())}
                className="text-[10px] text-blue-400 hover:text-blue-300 font-mono transition cursor-pointer"
              >
                Use Live
              </button>
            </div>
            <input
              type="number"
              step="any"
              placeholder="e.g. 62500"
              value={newBuyPrice}
              onChange={(e) => setNewBuyPrice(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500 transition font-mono"
            />
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-1.5 cursor-pointer h-[42px]"
            >
              <Plus size={15} />
              <span>Add Holding</span>
            </button>
          </div>
        </form>
      </div>

      {/* ── Portfolio Holdings Section (Clean Aligned Table & Grid Views) ──────── */}
      <div className="card p-0 overflow-hidden bg-[#0b0f19] border-slate-800 shadow-xl">
        {/* Table Header Controls */}
        <div className="p-4 sm:p-5 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Layers size={16} />
            </div>
            <div>
              <h2 className="text-base font-black text-white">Portfolio Holdings & Real-Time Performance</h2>
              <p className="text-xs text-slate-400">
                {holdings.length} assets tracked with live exchange ticks & instant PnL calculation
              </p>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === "table"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <TableIcon size={13} />
              <span>Table View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid size={13} />
              <span>Cards View</span>
            </button>
          </div>
        </div>

        {/* ═══ 1. CLEAN FINANCIAL TABLE VIEW (Precision Alignment) ══════════════ */}
        {viewMode === "table" ? (
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 bg-slate-900/40 text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4 text-left">Asset</th>
                  <th className="py-3.5 px-4 text-right">Live Price</th>
                  <th className="py-3.5 px-4 text-center">24h Real-Time Trend</th>
                  <th className="py-3.5 px-4 text-right">Holdings / Avg Cost</th>
                  <th className="py-3.5 px-4 text-right">Market Value / Share</th>
                  <th className="py-3.5 px-4 text-right">Unrealized PnL</th>
                  <th className="py-3.5 px-4 text-center">Risk Rating</th>
                  <th className="py-3.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {evaluatedHoldings.map((item: any) => {
                  return (
                    <tr
                      key={item.coin_id}
                      className="hover:bg-slate-900/50 transition-colors group"
                    >
                      {/* Asset: Icon + Name + Symbol */}
                      <td className="py-4 px-4 text-left">
                        <Link
                          href={`/coin/${item.coin_id}`}
                          className="flex items-center gap-3 group-hover:text-blue-400 transition"
                        >
                          <CryptoAvatar
                            coinId={item.coin_id}
                            symbol={item.symbol}
                            name={item.name}
                            imageUrl={item.matchedCoin?.image_url}
                            size="md"
                          />
                          <div>
                            <p className="text-white font-bold text-xs group-hover:text-blue-300 transition">
                              {item.name}
                            </p>
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                              {item.symbol}
                            </span>
                          </div>
                        </Link>
                      </td>

                      {/* Live Price & 24h % (Right Aligned) */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-mono text-xs font-bold text-white flex items-center gap-1">
                            ${item.currentPrice >= 1 ? item.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : item.currentPrice.toFixed(6)}
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                item.direction === "up"
                                  ? "bg-emerald-400"
                                  : item.direction === "down"
                                  ? "bg-rose-400"
                                  : "bg-slate-600"
                              }`}
                            />
                          </span>
                          <span
                            className={`text-[10px] font-mono font-bold ${
                              item.change24h >= 0 ? "text-emerald-400" : "text-rose-400"
                            }`}
                          >
                            {item.change24h >= 0 ? "+" : ""}
                            {item.change24h.toFixed(2)}%
                          </span>
                        </div>
                      </td>

                      {/* 24h Real-Time Trend Graph (Center Aligned) */}
                      <td className="py-4 px-4 text-center">
                        <div className="flex justify-center">
                          <RealtimeCoinMiniBarGraph
                            coinId={item.coin_id}
                            currentPrice={item.currentPrice}
                            change24h={item.change24h}
                            direction={item.direction}
                            width={110}
                            height={30}
                            onClick={() =>
                              setSelectedChartCoin({
                                coin_id: item.coin_id,
                                name: item.name,
                                symbol: item.symbol,
                                price_usd: item.currentPrice,
                                price_change_24h: item.change24h,
                              })
                            }
                          />
                        </div>
                      </td>

                      {/* Holdings / Avg Buy Price (Right Aligned) */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex flex-col items-end font-mono">
                          <span className="text-xs font-bold text-slate-100">
                            {item.amount.toLocaleString()} {item.symbol}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Avg: ${item.avgBuyPrice >= 1 ? item.avgBuyPrice.toLocaleString(undefined, { maximumFractionDigits: 2 }) : item.avgBuyPrice.toFixed(6)}
                          </span>
                        </div>
                      </td>

                      {/* Market Value / Portfolio Share (Right Aligned) */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex flex-col items-end font-mono">
                          <span className="text-xs font-bold text-white">
                            ${item.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold">
                            {item.sharePercent ? item.sharePercent.toFixed(1) : "0"}% of port.
                          </span>
                        </div>
                      </td>

                      {/* Unrealized PnL (Right Aligned) */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex flex-col items-end font-mono">
                          <span
                            className={`text-xs font-black flex items-center gap-1 ${
                              item.pnl >= 0 ? "text-emerald-400" : "text-rose-400"
                            }`}
                          >
                            {item.pnl >= 0 ? "+" : ""}${Math.abs(item.pnl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                          <span
                            className={`text-[10px] font-bold ${
                              item.pnlPercent >= 0 ? "text-emerald-400" : "text-rose-400"
                            }`}
                          >
                            {item.pnlPercent >= 0 ? "+" : ""}{item.pnlPercent.toFixed(2)}%
                          </span>
                        </div>
                      </td>

                      {/* Risk Score (Center Aligned) */}
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            item.riskScore >= 70
                              ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                              : item.riskScore >= 40
                              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          }`}
                        >
                          {item.riskScore.toFixed(0)} / 100
                        </span>
                      </td>

                      {/* Action Buttons (Center Aligned) */}
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedChartCoin({
                                coin_id: item.coin_id,
                                name: item.name,
                                symbol: item.symbol,
                                price_usd: item.currentPrice,
                                price_change_24h: item.change24h,
                              })
                            }
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                            title="Expand Live Chart"
                          >
                            <LineChart size={13} />
                          </button>
                          <Link
                            href={`/coin/${item.coin_id}`}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600/30 text-slate-300 hover:text-blue-300 transition"
                            title="View Coin Audit"
                          >
                            <ArrowUpRight size={13} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeHolding(item.coin_id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600/30 text-slate-400 hover:text-rose-400 transition cursor-pointer"
                            title="Remove from portfolio"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* ═══ 2. VISUAL CARDS GRID VIEW ══════════════════════════════════════ */
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {evaluatedHoldings.map((item: any) => (
              <div
                key={item.coin_id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition space-y-4 shadow-lg flex flex-col justify-between"
              >
                {/* Card Top */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <CryptoAvatar
                      coinId={item.coin_id}
                      symbol={item.symbol}
                      name={item.name}
                      imageUrl={item.matchedCoin?.image_url}
                      size="md"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm">{item.name}</h4>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {item.symbol}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        item.change24h >= 0
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-rose-500/20 text-rose-400"
                      }`}
                    >
                      {item.change24h >= 0 ? "+" : ""}
                      {item.change24h.toFixed(2)}%
                    </span>
                    <button
                      type="button"
                      onClick={() => removeHolding(item.coin_id)}
                      className="p-1 rounded hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 transition cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Price & Real-Time Graph */}
                <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">
                      Live Price
                    </span>
                    <span className="text-base font-black font-mono text-white block mt-0.5">
                      ${item.currentPrice >= 1 ? item.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : item.currentPrice.toFixed(6)}
                    </span>
                  </div>
                  <RealtimeCoinMiniBarGraph
                    coinId={item.coin_id}
                    currentPrice={item.currentPrice}
                    change24h={item.change24h}
                    direction={item.direction}
                    width={110}
                    height={32}
                    onClick={() =>
                      setSelectedChartCoin({
                        coin_id: item.coin_id,
                        name: item.name,
                        symbol: item.symbol,
                        price_usd: item.currentPrice,
                        price_change_24h: item.change24h,
                      })
                    }
                  />
                </div>

                {/* 2x2 Financial Metric Details */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 block">Quantity</span>
                    <span className="font-bold text-slate-200 mt-0.5 block">
                      {item.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 block">Avg Cost Basis</span>
                    <span className="font-bold text-slate-200 mt-0.5 block">
                      ${item.avgBuyPrice >= 1 ? item.avgBuyPrice.toLocaleString(undefined, { maximumFractionDigits: 2 }) : item.avgBuyPrice.toFixed(6)}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 block">Market Value</span>
                    <span className="font-bold text-white mt-0.5 block">
                      ${item.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 block">Unrealized PnL</span>
                    <span
                      className={`font-bold mt-0.5 block ${
                        item.pnl >= 0 ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {item.pnl >= 0 ? "+" : ""}${Math.abs(item.pnl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({item.pnlPercent >= 0 ? "+" : ""}{item.pnlPercent.toFixed(1)}%)
                    </span>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      item.riskScore >= 70
                        ? "bg-rose-500/20 text-rose-400"
                        : item.riskScore >= 40
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-emerald-500/20 text-emerald-400"
                    }`}
                  >
                    Risk: {item.riskScore.toFixed(0)}/100
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedChartCoin({
                          coin_id: item.coin_id,
                          name: item.name,
                          symbol: item.symbol,
                          price_usd: item.currentPrice,
                          price_change_24h: item.change24h,
                        })
                      }
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                    >
                      <LineChart size={12} />
                      <span>Chart</span>
                    </button>
                    <Link
                      href={`/coin/${item.coin_id}`}
                      className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-bold flex items-center gap-1 transition"
                    >
                      <span>Audit</span>
                      <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Portfolio Stress Test & Risk Scenarios ────────────────────────────── */}
      <div className="card p-6 bg-[#0b0f19] border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Sliders size={18} />
          </div>
          <div>
            <h3 className="text-base font-black text-white">Market Stress Test Simulations</h3>
            <p className="text-xs text-slate-400">
              Simulate hypothetical macro shocks and market rallies on your active portfolio valuation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-rose-400">Black Swan Crash (-25%)</span>
              <TrendingDown size={14} className="text-rose-400" />
            </div>
            <p className="text-xl font-black font-mono text-white">
              ${(totalValueUsd * 0.75).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-[11px] text-rose-400 font-mono">
              -${(totalValueUsd * 0.25).toLocaleString(undefined, { maximumFractionDigits: 0 })} portfolio impact
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-amber-400">Standard Pullback (-10%)</span>
              <TrendingDown size={14} className="text-amber-400" />
            </div>
            <p className="text-xl font-black font-mono text-white">
              ${(totalValueUsd * 0.90).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-[11px] text-amber-400 font-mono">
              -${(totalValueUsd * 0.10).toLocaleString(undefined, { maximumFractionDigits: 0 })} portfolio impact
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-emerald-400">Bull Market Expansion (+25%)</span>
              <TrendingUp size={14} className="text-emerald-400" />
            </div>
            <p className="text-xl font-black font-mono text-white">
              ${(totalValueUsd * 1.25).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-[11px] text-emerald-400 font-mono">
              +${(totalValueUsd * 0.25).toLocaleString(undefined, { maximumFractionDigits: 0 })} portfolio upside
            </p>
          </div>
        </div>
      </div>

      {/* ── Real-Time Chart Modal ────────────────────────────────────────────── */}
      {selectedChartCoin && (
        <RealtimeCoinChartModal
          coin={selectedChartCoin}
          onClose={() => setSelectedChartCoin(null)}
        />
      )}
    </div>
  );
}
