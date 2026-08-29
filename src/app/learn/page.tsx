"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  TrendingDown,
  Shield,
  Activity,
  Layers,
  Search,
  Lock,
  Cpu,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  FileText,
  DollarSign,
  PieChart,
  LineChart,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Target,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Database,
  Globe,
  Radio,
  Eye,
  Info,
} from "lucide-react";

export default function LearnAndAboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Platform FAQs
  const faqs = [
    {
      q: "What is the mission of CryptoVision?",
      a: "CryptoVision was built to bring institutional-quality market clarity to everyday crypto investors and traders. By aggregating live exchange feeds, on-chain whale activity, sentiment analysis, and risk scoring in one place, we help users make informed, data-backed decisions and reduce downside risk.",
    },
    {
      q: "How does CryptoVision evaluate cryptocurrency risk?",
      a: "Risk is evaluated across multiple dimensions including smart contract permissions, liquidity depth, holder distribution, trading volume quality, social momentum, and sentiment data. These factors combine into an intuitive 0-100 risk score to help you identify high-risk assets before allocating capital.",
    },
    {
      q: "Are the prices and chart data real-time?",
      a: "Yes. CryptoVision connects to live exchange feeds (Binance, CoinGecko, DexScreener, DefiLlama) to deliver sub-second price updates, multi-timeframe candlestick charting, and order book activity.",
    },
    {
      q: "Do I need to connect a crypto wallet to use CryptoVision?",
      a: "No. CryptoVision is 100% non-custodial and privacy-focused. You can research coins, track whale flows, monitor market sentiment, and test portfolio scenarios freely without ever connecting a wallet, sharing private keys, or creating a mandatory account.",
    },
    {
      q: "Can market risk be completely eliminated?",
      a: "No. In cryptocurrency and financial markets, risk can never be entirely eliminated due to market volatility, liquidity shifts, and macro events. CryptoVision's objective is to help investors systematically reduce risk through transparency, verifiable data, and disciplined exit planning.",
    },
  ];

  // Core pillars of the application
  const pillars = [
    {
      title: "Reducing Investment Risk",
      icon: TrendingDown,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      description:
        "Cryptocurrency markets are volatile and complex. CryptoVision provides multi-factor risk scores, liquidity depth metrics, and contract checks to help investors proactively identify red flags and reduce downside exposure.",
    },
    {
      title: "Real-Time Market Transparency",
      icon: Activity,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      description:
        "We aggregate live data from decentralized liquidity pools, leading spot exchanges, and verified indexers to ensure you see real volume, accurate prices, and timely market movements.",
    },
    {
      title: "Clear, Actionable Intelligence",
      icon: Target,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
      description:
        "Raw blockchain data is often overwhelming. We transform on-chain metrics, tokenomics vesting schedules, and whale transactions into plain-English summaries, ratings, and clear exit criteria.",
    },
    {
      title: "Privacy & Non-Custodial Security",
      icon: Lock,
      color: "text-teal-400",
      bg: "bg-teal-500/10",
      border: "border-teal-500/30",
      description:
        "We never request seed phrases, private keys, or wallet connections. All analytics, portfolio simulations, and coin scanners run safely in your browser without tracking personal financial data.",
    },
  ];

  // Data sources & methodologies
  const dataSources = [
    {
      name: "CoinGecko & Binance",
      type: "Spot Market Data",
      description: "Live pricing, 24h trading volume, market capitalization rankings, and historical OHLCV data.",
    },
    {
      name: "DexScreener",
      type: "DEX & Small-Caps",
      description: "Decentralized pair liquidity, newly launched tokens, pair age, and dynamic swap volumes.",
    },
    {
      name: "DefiLlama",
      type: "DeFi & Yield Telemetry",
      description: "Total Value Locked (TVL), protocol fees, multi-chain staking yields, and stablecoin metrics.",
    },
    {
      name: "NLP Sentiment Engine",
      type: "Market Sentiment",
      description: "Natural language processing of breaking crypto headlines to quantify prevailing market mood.",
    },
  ];

  // Glossary terms
  const glossary = [
    {
      term: "Total Value Locked (TVL)",
      definition:
        "The cumulative dollar value of all cryptocurrency assets deposited, staked, or locked in a decentralized protocol's smart contracts.",
    },
    {
      term: "Impermanent Loss (IL)",
      definition:
        "The difference in dollar value between holding assets in a wallet versus depositing them into an Automated Market Maker (AMM) liquidity pool when token prices diverge.",
    },
    {
      term: "Liquidity Lock",
      definition:
        "Securing Liquidity Provider (LP) tokens in a verified smart contract locker for a set duration, ensuring liquidity cannot be abruptly withdrawn.",
    },
    {
      term: "Token Unlock Cliff",
      definition:
        "A scheduled date when a large block of previously locked team, advisor, or early-investor tokens becomes available for sale in the open market.",
    },
    {
      term: "CVD (Cumulative Volume Delta)",
      definition:
        "The net cumulative difference between aggressive market buy volume and market sell volume, identifying real spot accumulation or distribution.",
    },
    {
      term: "Whale Concentration",
      definition:
        "The percentage of total circulating supply controlled by the top wallet addresses, highlighting centralization and sell-off risks.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 pb-24">
      {/* ── Top Hero & About Header ────────────────────────────────────────── */}
      <div className="relative border-b border-slate-800/80 bg-gradient-to-b from-[#0e1424] via-[#090d18] to-[#07090e] overflow-hidden pt-12 pb-16">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono mb-6">
            <Info size={14} />
            <span>About CryptoVision</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Transparent Cryptocurrency Intelligence & <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400">
              Risk Management
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            CryptoVision is a real-time market intelligence platform designed to reduce informational asymmetry in cryptocurrency markets. We provide investors with clear, accessible data across spot prices, liquidity depth, on-chain whale activity, and multi-factor risk scores.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            <div className="p-4 rounded-2xl bg-[#0b101d]/90 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Real-Time Feeds</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400 mt-1 block">Live Tickers</span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Sub-second updates</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0b101d]/90 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Chains Monitored</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-blue-400 mt-1 block">30+ Networks</span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">L1s, L2s & DeFi</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0b101d]/90 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Risk Framework</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-cyan-400 mt-1 block">0–100 Scale</span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Multi-factor scoring</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0b101d]/90 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Data Privacy</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-purple-400 mt-1 block">Non-Custodial</span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">No wallet link required</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content Container ───────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* SECTION 1: CORE APP PILLARS                                            */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Target size={20} />
            </div>
            <div>
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider font-mono">Foundational Principles</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">What CryptoVision Is Built For</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0b0f19] border border-slate-800/80 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${pillar.bg} border ${pillar.border} flex items-center justify-center ${pillar.color}`}>
                      <Icon size={18} />
                    </div>
                    <h3 className="font-bold text-white text-base">{pillar.title}</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/30 via-slate-900 to-indigo-950/30 border border-blue-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Our Core Standard: Strict Non-Custodial Integrity</span>
              </h4>
              <p className="text-xs text-slate-400 max-w-2xl">
                We never store private keys, request seed phrases, or custody user assets. CryptoVision is purely an analytical research and risk assessment platform.
              </p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <span>Explore Market Radar</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* SECTION 2: DATA SOURCES & METHODOLOGY                                  */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Database size={20} />
            </div>
            <div>
              <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider font-mono">Data Architecture</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">How We Gather & Analyze Market Data</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dataSources.map((source, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0b0f19] border border-slate-800/80 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">{source.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                    {source.type}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {source.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* SECTION 3: RISK SCORING EXPLAINER (0-100)                              */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <ShieldCheck size={20} />
            </div>
            <div>
              <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider font-mono">Scoring Matrix</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Understanding Risk Scores (0–100)</h2>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            CryptoVision calculates a composite risk rating between 0 (Lowest Risk / Established Integrity) and 100 (Critical Risk / High Threat). This helps users quickly differentiate established assets from volatile or high-risk tokens.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 text-xs">0 – 25 : LOW RISK</span>
                <ShieldCheck size={14} className="text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Established assets with high liquidity, renounced or multi-sig governance, and deep secondary market books.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-400 text-xs">26 – 50 : MODERATE</span>
                <Activity size={14} className="text-blue-400" />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Standard tokens with verified code and good liquidity, but standard centralization or volatility factors.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400 text-xs">51 – 75 : ELEVATED</span>
                <AlertTriangle size={14} className="text-amber-400" />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Caution advised. Higher holder concentration, lower liquidity depth, or higher price volatility.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-400 text-xs">76 – 100 : CRITICAL</span>
                <TrendingDown size={14} className="text-rose-400" />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                High hazard. Extreme holder centralization, unverified contracts, or thin unlocked liquidity pools.
              </p>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* SECTION 4: GLOSSARY OF TERMS                                           */}
        {/* ═════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BookOpen size={20} />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider font-mono">Terminology</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Cryptocurrency & Risk Glossary</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {glossary.map((g, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#0b0f19] border border-slate-800/80 space-y-1.5 hover:border-amber-500/30 transition"
              >
                <h3 className="font-bold text-white text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{g.term}</span>
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {g.definition}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════ */}
        {/* SECTION 5: FREQUENTLY ASKED QUESTIONS (FAQ)                           */}
        {/* ═════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <HelpCircle size={20} />
            </div>
            <div>
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider font-mono">General Inquiries</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Frequently Asked Questions</h2>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#0b0f19] border border-slate-800 overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-900/50 transition cursor-pointer"
                  >
                    <span className="font-bold text-sm text-white">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp size={16} className="text-blue-400 shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Bottom CTA ──────────────────────────────────────────────────────── */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-950/60 via-[#0d1424] to-emerald-950/60 border border-blue-500/30 text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-400/40 flex items-center justify-center text-blue-300 mx-auto">
            <Activity size={24} />
          </div>
          <h3 className="text-2xl font-black text-white">Start Researching Cryptocurrency Markets</h3>
          <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
            Access live price charts, risk ratings, whale flow tracking, and DeFi yield telemetry right now.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
            <Link
              href="/"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              Go to Market Radar
            </Link>
            <Link
              href="/signals"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              View Alpha & Signals
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
