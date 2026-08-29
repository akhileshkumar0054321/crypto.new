"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShieldAlert,
  Bell,
  Briefcase,
  FileText,
  Sliders,
  Zap,
  ChevronRight,
  Activity,
  ShieldCheck,
  Newspaper,
  CreditCard,
  Sparkles,
  Radio,
} from "lucide-react";
import { useLiveMarket } from "@/lib/context/LiveMarketContext";

const NAV = [
  { href: "/",              icon: LayoutDashboard, label: "Market Overview",          section: "main" },
  { href: "/signals",       icon: Zap,              label: "Market Signals & Trends",  section: "main", badge: "HOT" },
  { href: "/radar",         icon: Radio,            label: "Crypto Radar",             section: "main" },
  { href: "/news",          icon: Newspaper,       label: "Crypto News & AI",         section: "main" },
  { href: "/risk-explorer", icon: ShieldAlert,     label: "Market Insights",          section: "main" },
  { href: "/portfolio",     icon: Briefcase,       label: "Portfolio",                section: "main" },
  { href: "/alerts",        icon: Bell,            label: "Price Alerts",             section: "main" },
  { href: "/reports",       icon: FileText,        label: "Market Reports",           section: "tools" },
  { href: "/settings",      icon: Sliders,         label: "Settings",                 section: "tools" },
  { href: "/pricing",       icon: CreditCard,      label: "Pricing & Plans",          section: "tools", badge: "PRO" },
];

export function Sidebar() {
  const path = usePathname();
  const { isLive, globalStats } = useLiveMarket();

  return (
    <aside
      className="w-60 flex-shrink-0 flex flex-col h-full select-none"
      style={{
        background: "linear-gradient(180deg, #0d1117 0%, #0a0b0f 100%)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
            boxShadow: "0 0 16px rgba(59,130,246,0.4)",
          }}
        >
          <Zap size={16} className="text-white" />
        </div>
        <div>
          <p className="text-white font-extrabold text-sm leading-none tracking-tight">CryptoVision</p>
          <p className="text-slate-500 text-[10px] font-semibold mt-1 uppercase tracking-wider">
            Market & Risk Scanner
          </p>
        </div>
      </div>

      {/* Live Indicator Bar */}
      <div className="px-4 mb-4">
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition ${
            isLive
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-slate-800/60 border-slate-700/60 text-slate-400"
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-400 animate-ping" : "bg-slate-500"}`} />
          <span className="text-[11px] font-bold tracking-wider">
            {isLive ? "LIVE DATA CONNECTED" : "DATA PAUSED"}
          </span>
          <Activity size={12} className="ml-auto" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        <p className="px-2 mb-1.5 text-slate-500 text-[10px] font-bold tracking-wider uppercase">
          MAIN MENU
        </p>
        {NAV.filter((n) => n.section === "main").map((item) => {
          const { href, icon: Icon, label, badge } = item as any;
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                active
                  ? "bg-blue-600/15 text-blue-400 border border-blue-500/25 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
              }`}
            >
              <Icon size={15} className="flex-shrink-0" />
              <span>{label}</span>
              {badge && (
                <span className="ml-auto px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-extrabold">
                  {badge}
                </span>
              )}
              {active && !badge && <ChevronRight size={12} className="ml-auto opacity-60" />}
            </Link>
          );
        })}

        <div className="my-3 border-t border-white/5" />

        <p className="px-2 mb-1.5 text-slate-500 text-[10px] font-bold tracking-wider uppercase">
          TOOLS & SETTINGS
        </p>
        {NAV.filter((n) => n.section === "tools").map((item) => {
          const { href, icon: Icon, label, badge } = item as any;
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                active
                  ? "bg-blue-600/15 text-blue-400 border border-blue-500/25 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
              }`}
            >
              <Icon size={15} className="flex-shrink-0" />
              <span>{label}</span>
              {badge && (
                <span className="ml-auto px-1.5 py-0.2 rounded bg-blue-600 text-white text-[9px] font-extrabold shadow-sm">
                  {badge}
                </span>
              )}
              {active && !badge && <ChevronRight size={12} className="ml-auto opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Info Node */}
      <div className="px-4 pb-5">
        <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-300">Live Feed Status</span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">{globalStats.latencyMs}ms</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-blue-500" />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
            <span>Real-time Feeds</span>
            <span className="text-slate-400">All Systems Normal</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
