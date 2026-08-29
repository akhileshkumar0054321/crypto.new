"use client";

import { useState, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { signalsApi } from "@/lib/api";
import { EarlySignalDetectorView } from "@/components/signals/EarlySignalDetectorView";
import { SmartMoneyRadarView } from "@/components/signals/SmartMoneyRadarView";
import { SignalConflictDetectorView } from "@/components/signals/SignalConflictDetectorView";
import { DevilsAdvocateView } from "@/components/signals/DevilsAdvocateView";
import { ThesisInvalidationView } from "@/components/signals/ThesisInvalidationView";
import {
  Zap,
  Radio,
  AlertTriangle,
  Skull,
  Target,
  Sparkles,
  RefreshCw,
  Layers,
  Flame,
  ShieldCheck,
  TrendingUp,
  Coins,
  ArrowRightLeft,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

function SignalsContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "early";
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  const { data: overviewRes, isLoading, refetch } = useQuery({
    queryKey: ["signals-overview"],
    queryFn: () => signalsApi.getOverview().then((r) => r.data?.data),
    refetchInterval: 30000,
  });

  const earlySignals = overviewRes?.earlySignals || [];
  const smartMoney = overviewRes?.smartMoney || [];
  const signalConflicts = overviewRes?.signalConflicts || [];
  const topDevilsAdvocate = overviewRes?.topDevilsAdvocate || [];
  const topTheses = overviewRes?.topTheses || [];
  const stats = overviewRes?.stats;

  const tabs = [
    {
      id: "early",
      label: "1. Early Trends",
      shortLabel: "Early Trends",
      icon: <Zap size={14} className="text-amber-400" />,
      badge: `${earlySignals.length} Found`,
      badgeColor: "bg-amber-500/20 text-amber-300",
    },
    {
      id: "smart-money",
      label: "2. Smart Money Interest",
      shortLabel: "Smart Money",
      icon: <Coins size={14} className="text-cyan-400" />,
      badge: "Market Inflows",
      badgeColor: "bg-cyan-500/20 text-cyan-300",
    },
    {
      id: "conflicts",
      label: "3. Price vs Real Activity",
      shortLabel: "Price vs Reality",
      icon: <ArrowRightLeft size={14} className="text-rose-400" />,
      badge: `${stats?.activeBullTrapsDetected || 1} Traps Active`,
      badgeColor: "bg-rose-500/20 text-rose-300",
    },
    {
      id: "devils-advocate",
      label: "4. Downside & Risk Check",
      shortLabel: "Risk Check",
      icon: <Skull size={14} className="text-red-400" />,
      badge: "Objective AI",
      badgeColor: "bg-red-500/20 text-red-300",
    },
    {
      id: "thesis-invalidation",
      label: "5. Trade Thesis & Exit Plan",
      shortLabel: "Thesis & Exits",
      icon: <Target size={14} className="text-emerald-400" />,
      badge: "Actionable",
      badgeColor: "bg-emerald-500/20 text-emerald-300",
    },
  ];

  return (
    <main className="min-h-screen bg-[#070a10] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              MARKET SIGNALS
            </span>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live Data Feed
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Crypto Signals & Market Trends
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Early trend detection, smart money tracking, price vs real activity checks, and downside risk checks based on live market activity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isLoading}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-semibold transition cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={13} className={isLoading ? "animate-spin text-blue-400" : ""} />
            <span>Refresh Signals</span>
          </button>
        </div>
      </div>

      {/* 5-Tab Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                  isActive ? "bg-white/20 text-white" : tab.badgeColor
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Tab Views */}
      <div className="animate-fade-in">
        {activeTab === "early" && (
          <EarlySignalDetectorView
            signals={earlySignals}
            isLoading={isLoading}
            onRefresh={refetch}
          />
        )}

        {activeTab === "smart-money" && (
          <SmartMoneyRadarView
            smartMoneyList={smartMoney}
            isLoading={isLoading}
          />
        )}

        {activeTab === "conflicts" && (
          <SignalConflictDetectorView
            conflicts={signalConflicts}
            isLoading={isLoading}
          />
        )}

        {activeTab === "devils-advocate" && (
          <DevilsAdvocateView
            initialData={topDevilsAdvocate}
          />
        )}

        {activeTab === "thesis-invalidation" && (
          <ThesisInvalidationView
            initialTheses={topTheses}
          />
        )}
      </div>
    </main>
  );
}

export default function SignalsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070a10] flex items-center justify-center p-12 text-slate-400 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span>Loading Signals & Alpha Intelligence Center...</span>
          </div>
        </div>
      }
    >
      <SignalsContent />
    </Suspense>
  );
}
