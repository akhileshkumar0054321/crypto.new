"use client";

import React, { useState, useEffect } from "react";
import {
  Flame,
  ShieldAlert,
  Scale,
  Landmark,
  Zap,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Layers,
  Globe,
  Radio,
  Activity,
  Cpu,
} from "lucide-react";

interface NewsImageProps {
  src?: string;
  alt: string;
  category?: string;
  sentiment?: "BULLISH" | "BEARISH" | "NEUTRAL" | "WARNING" | string;
  className?: string;
}

export function NewsImage({
  src,
  alt,
  category = "Breaking Alert",
  sentiment = "NEUTRAL",
  className = "w-full h-full object-cover",
}: NewsImageProps) {
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (src && src.startsWith("http")) {
      const img = new Image();
      img.src = src;
      img.onload = () => setImgLoaded(true);
      img.onerror = () => setImgLoaded(false);
    } else {
      setImgLoaded(false);
    }
  }, [src]);

  // Determine category graphic styling for native vector graphic illustration
  const getCategoryGraphic = () => {
    const catLower = (category || "").toLowerCase();
    const sentLower = (sentiment || "").toLowerCase();

    if (catLower.includes("security") || catLower.includes("exploit") || sentLower === "warning") {
      return {
        bg: "from-rose-950 via-slate-950 to-red-950",
        accent: "text-rose-400",
        glow: "rgba(244, 63, 94, 0.25)",
        border: "border-rose-500/30",
        badge: "bg-rose-500/20 text-rose-300 border-rose-500/40",
        icon: <ShieldAlert size={36} className="text-rose-400" />,
        label: "SECURITY PROTOCOL & FORENSICS",
        sub: "AUTOMATED ON-CHAIN SURVEILLANCE",
      };
    }
    if (catLower.includes("regulation") || catLower.includes("sec") || catLower.includes("court") || catLower.includes("legal")) {
      return {
        bg: "from-amber-950 via-slate-950 to-orange-950",
        accent: "text-amber-400",
        glow: "rgba(245, 158, 11, 0.25)",
        border: "border-amber-500/30",
        badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
        icon: <Scale size={36} className="text-amber-400" />,
        label: "REGULATORY COMPLIANCE & POLICY",
        sub: "GLOBAL JURISDICTION MONITOR",
      };
    }
    if (catLower.includes("whale") || catLower.includes("flow") || catLower.includes("transfer")) {
      return {
        bg: "from-cyan-950 via-slate-950 to-blue-950",
        accent: "text-cyan-400",
        glow: "rgba(6, 182, 212, 0.25)",
        border: "border-cyan-500/30",
        badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
        icon: <Radio size={36} className="text-cyan-400" />,
        label: "WHALE CLUSTERS & LIQUIDITY FLOWS",
        sub: "LARGE ON-CHAIN TX CLUSTERING",
      };
    }
    if (catLower.includes("macro") || catLower.includes("etf") || catLower.includes("fed") || catLower.includes("market")) {
      return {
        bg: "from-indigo-950 via-slate-950 to-blue-950",
        accent: "text-indigo-400",
        glow: "rgba(99, 102, 241, 0.25)",
        border: "border-indigo-500/30",
        badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
        icon: <Landmark size={36} className="text-indigo-400" />,
        label: "MACRO INTELLIGENCE & ETF FLOWS",
        sub: "INSTITUTIONAL LIQUIDITY TRACKER",
      };
    }
    if (catLower.includes("defi") || catLower.includes("layer") || catLower.includes("bridge") || catLower.includes("dex")) {
      return {
        bg: "from-violet-950 via-slate-950 to-indigo-950",
        accent: "text-violet-400",
        glow: "rgba(139, 92, 246, 0.25)",
        border: "border-violet-500/30",
        badge: "bg-violet-500/20 text-violet-300 border-violet-500/40",
        icon: <Layers size={36} className="text-violet-400" />,
        label: "DEFI PROTOCOLS & TVL METRICS",
        sub: "SMART CONTRACT INFRASTRUCTURE",
      };
    }
    if (catLower.includes("meme") || catLower.includes("social") || catLower.includes("pump")) {
      return {
        bg: "from-emerald-950 via-slate-950 to-teal-950",
        accent: "text-emerald-400",
        glow: "rgba(16, 185, 129, 0.25)",
        border: "border-emerald-500/30",
        badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        icon: <Sparkles size={36} className="text-emerald-400" />,
        label: "VIRAL SOCIAL SIGNALS & MEMES",
        sub: "SENTIMENT VELOCITY SPIKES",
      };
    }
    return {
      bg: "from-blue-950 via-slate-950 to-slate-900",
      accent: "text-blue-400",
      glow: "rgba(59, 130, 246, 0.25)",
      border: "border-blue-500/30",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      icon: <Activity size={36} className="text-blue-400" />,
      label: "BREAKING MARKET WIRE",
      sub: "REAL-TIME CRYPTO SURVEILLANCE",
    };
  };

  const theme = getCategoryGraphic();

  // If real external image loaded successfully, show it cleanly
  if (imgLoaded && src) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-slate-950" role="img" aria-label={alt}>
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className={className}
          loading="lazy"
        />
      </div>
    );
  }

  // Pure Vector Cyber Intelligence Graphic Card (100% Reliable, Zero Network Latency)
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative w-full h-full bg-gradient-to-br ${theme.bg} flex flex-col items-center justify-center p-4 overflow-hidden select-none`}
    >
      {/* Dynamic Cyber Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Radiant Glow Orb */}
      <div
        className="absolute w-40 h-40 rounded-full blur-2xl pointer-events-none -top-10 -right-10"
        style={{ background: theme.glow }}
      />
      <div
        className="absolute w-32 h-32 rounded-full blur-2xl pointer-events-none -bottom-10 -left-10"
        style={{ background: theme.glow }}
      />

      {/* Center Radar / Protocol Emblem */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2 max-w-[90%]">
        <div className={`p-3.5 rounded-2xl bg-slate-900/90 border ${theme.border} shadow-xl backdrop-blur-md relative group`}>
          {theme.icon}
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>

        <div className="space-y-0.5">
          <div className={`text-[11px] font-black tracking-widest font-mono uppercase ${theme.accent}`}>
            {theme.label}
          </div>
          <div className="text-[9px] font-medium tracking-wider text-slate-400 font-mono">
            {theme.sub}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsImage;
