"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  TrendingDown,
  Shield,
  Activity,
  Layers,
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
  Globe,
  Radio,
  Eye,
  Info,
} from "lucide-react";

export function LearnAndAboutContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is the mission of CryptoVision?",
      a: "CryptoVision was built to bring institutional-quality risk intelligence to cryptocurrency investors. By connecting live exchange feeds, on-chain whale activity, sentiment analysis, and multi-factor algorithmic risk scoring in one place, we help users understand what can go wrong before making investment decisions.",
    },
    {
      q: "How does CryptoVision evaluate cryptocurrency risk?",
      a: "Risk is evaluated across multiple dimensions including smart contract permissions, liquidity depth, holder distribution, trading volume quality, social momentum, and sentiment data. These factors combine into an intuitive 0-100 risk score with dedicated signal conflict and thesis invalidation logic.",
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

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c121e] via-[#090d16] to-[#06080e] border border-slate-800/80 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering Smarter Decisions
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            See Beyond Crypto Prices with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300">
              Connected Risk Intelligence
            </span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            CryptoVision is a comprehensive decision-support and risk-management platform designed to uncover hidden vulnerabilities, challenge narratives, and detect early signals before volatility causes capital loss.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/20"
            >
              Explore Live Market
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/signals"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-all border border-slate-700"
            >
              View Early Signals
            </Link>
          </div>
        </div>
      </div>

      {/* Core Principles / Mission */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#0b0f19]/90 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Connected Risk Scoring</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Evaluating liquidity depth, whale distribution, token supply schedules, and administrative contract privileges to form a balanced 0-100 risk score.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0b0f19]/90 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Devil&apos;s Advocate &amp; Invalidation</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Actively challenging investment biases by identifying the strongest counter-arguments and clear conditions that would invalidate a thesis.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0b0f19]/90 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Early Trend &amp; Conflict Radar</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Spotting divergence when price rises on low liquidity, whale selling, or hidden dilution before mainstream retail participants notice.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="rounded-2xl bg-[#0b0f19]/90 border border-slate-800 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-800/80 bg-[#070a11] overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left text-white font-medium text-base hover:text-blue-400 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LearnAndAboutContent;
