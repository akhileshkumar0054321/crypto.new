"use client";

import React, { useState, useEffect } from "react";

interface CryptoAvatarProps {
  coinId?: string;
  symbol?: string;
  name?: string;
  imageUrl?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  className?: string;
}

// ── Native Vector SVG Icons for Top Cryptocurrencies (0ms latency, zero failure) ──
function BtcIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
      <circle cx="16" cy="16" r="16" fill="#F7931A" />
      <path
        d="M21.9 13.6c.3-2-1.2-3.1-3.3-3.8l.7-2.7-1.7-.4-.7 2.6c-.4-.1-.9-.2-1.3-.3l.7-2.7-1.7-.4-.7 2.7c-.4-.1-.7-.2-1.1-.3l-2.3-.6-.5 1.8s1.3.3 1.2.3c.7.2.8.7.8 1.1l-.8 3.3c.1 0 .1 0 .2.1l-.2 0-1.1 4.6c-.1.2-.3.6-.8.4 0 0-1.2-.3-1.2-.3l-.8 2 2.2.6c.4.1.8.2 1.2.3l-.7 2.8 1.7.4.7-2.7c.5.1.9.2 1.4.3l-.7 2.7 1.7.4.7-2.8c2.9.5 5.1.3 6-2.3.7-2.1 0-3.3-1.5-4.1 1.1-.3 1.9-1.1 2.1-2.7zm-3.8 5.7c-.5 2.1-4 .9-5.1.7l.9-3.7c1.1.3 4.8.8 4.2 3zm.5-5.9c-.5 1.9-3.4.9-4.3.7l.8-3.4c1 .2 4.1.7 3.5 2.7z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function EthIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
      <circle cx="16" cy="16" r="16" fill="#627EEA" />
      <g fill="#FFFFFF" fillRule="evenodd">
        <path d="M16.498 4v8.87l7.497 3.35z" fillOpacity=".6" />
        <path d="M16.498 4L9 16.22l7.498-3.35z" />
        <path d="M16.498 21.968v6.027L24 17.616z" fillOpacity=".6" />
        <path d="M16.498 27.995v-6.027L9 17.616z" />
        <path d="M16.498 20.573l7.497-4.352-7.497-3.348z" fillOpacity=".2" />
        <path d="M9 16.221l7.498 4.352v-7.7z" fillOpacity=".6" />
      </g>
    </svg>
  );
}

function SolIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
      <circle cx="16" cy="16" r="16" fill="#14151a" />
      <defs>
        <linearGradient id="solGrad" x1="24" y1="8" x2="8" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
      </defs>
      <path
        d="M9.5 20.9c.2-.2.5-.3.8-.3h12.4c.5 0 .8.6.5 1l-2.2 2.2c-.2.2-.5.3-.8.3H7.8c-.5 0-.8-.6-.5-1l2.2-2.2zm0-9.6c.2-.2.5-.3.8-.3h12.4c.5 0 .8.6.5 1L21 14.2c-.2.2-.5.3-.8.3H7.8c-.5 0-.8-.6-.5-1l2.2-2.2zm11 4.8c-.2-.2-.5-.3-.8-.3H7.3c-.5 0-.8.6-.5 1l2.2 2.2c.2.2.5.3.8.3h12.4c.5 0 .8-.6.5-1l-2.2-2.2z"
        fill="url(#solGrad)"
      />
    </svg>
  );
}

function BnbIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
      <circle cx="16" cy="16" r="16" fill="#F3BA2F" />
      <path
        d="M16 6.5l3.8 3.8-3.8 3.8-3.8-3.8L16 6.5zm5.9 5.9l3.8 3.8-3.8 3.8-3.8-3.8 3.8-3.8zM10.1 12.4l3.8 3.8-3.8 3.8-3.8-3.8 3.8-3.8zM16 18.3l3.8 3.8-3.8 3.8-3.8-3.8 3.8-3.8zm0-3.8l2-2 2 2-2 2-2-2z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function XrpIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
      <circle cx="16" cy="16" r="16" fill="#23292F" />
      <path
        d="M24.2 8h2.3l-5.6 5.5c-2.7 2.6-7.1 2.6-9.8 0L5.5 8h2.3l4.4 4.3c1.5 1.5 3.9 1.5 5.4 0L24.2 8zm-16.4 16h-2.3l5.6-5.5c2.7-2.6 7.1-2.6 9.8 0l5.6 5.5h-2.3l-4.4-4.3c-1.5-1.5-3.9-1.5-5.4 0L7.8 24z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function DogeIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
      <circle cx="16" cy="16" r="16" fill="#C2A633" />
      <path
        d="M11 9h6c4.4 0 7 2.8 7 7s-2.6 7-7 7h-6V9zm4 11.5h2c2.8 0 4.5-1.8 4.5-4.5s-1.7-4.5-4.5-4.5h-2v9zM10 15h7v2h-7v-2z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function AdaIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
      <circle cx="16" cy="16" r="16" fill="#0033AD" />
      <circle cx="16" cy="16" r="3" fill="#FFFFFF" />
      <circle cx="16" cy="8.5" r="1.5" fill="#FFFFFF" />
      <circle cx="16" cy="23.5" r="1.5" fill="#FFFFFF" />
      <circle cx="8.5" cy="16" r="1.5" fill="#FFFFFF" />
      <circle cx="23.5" cy="16" r="1.5" fill="#FFFFFF" />
      <circle cx="10.7" cy="10.7" r="1.2" fill="#FFFFFF" />
      <circle cx="21.3" cy="10.7" r="1.2" fill="#FFFFFF" />
      <circle cx="10.7" cy="21.3" r="1.2" fill="#FFFFFF" />
      <circle cx="21.3" cy="21.3" r="1.2" fill="#FFFFFF" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
      <circle cx="16" cy="16" r="16" fill="#375BD2" />
      <path
        d="M16 6.5L8.5 11v9.5L16 25l7.5-4.5V11L16 6.5zm4.8 12.3L16 21.6l-4.8-2.8v-5.6L16 10.4l4.8 2.8v5.6z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function AvaxIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
      <circle cx="16" cy="16" r="16" fill="#E84142" />
      <path
        d="M17.4 8.7c-.6-1-2.1-1-2.8 0L7.2 21.3c-.6 1 .1 2.3 1.4 2.3h3.5c.8 0 1.5-.4 1.9-1.1l2-3.5 2 3.5c.4.7 1.1 1.1 1.9 1.1h3.5c1.2 0 2-1.3 1.4-2.3L17.4 8.7z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function DotIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
      <circle cx="16" cy="16" r="16" fill="#E6007A" />
      <circle cx="16" cy="11" r="3.2" fill="#FFFFFF" />
      <circle cx="16" cy="21" r="3.2" fill="#FFFFFF" />
      <circle cx="10.5" cy="16" r="2.2" fill="#FFFFFF" />
      <circle cx="21.5" cy="16" r="2.2" fill="#FFFFFF" />
    </svg>
  );
}

function PolygonIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
      <circle cx="16" cy="16" r="16" fill="#8247E5" />
      <path
        d="M21.1 13.5l-3.3-1.9c-.5-.3-1.1-.3-1.6 0l-3.3 1.9-3.3-1.9c-.5-.3-.8-.8-.8-1.4v-3.8c0-.6.3-1.1.8-1.4l3.3-1.9c.5-.3 1.1-.3 1.6 0l3.3 1.9 3.3-1.9c.5-.3.8-.8.8-1.4V0"
        fill="none"
      />
      <path
        d="M16 11.2l4.8 2.8v5.5L16 22.3l-4.8-2.8V14L16 11.2zm0-2.3l-6.8 3.9c-.7.4-1.2 1.2-1.2 2v7.8c0 .8.4 1.6 1.2 2L16 28.5l6.8-3.9c.7-.4 1.2-1.2 1.2-2V14.8c0-.8-.4-1.6-1.2-2L16 8.9z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function TonIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
      <circle cx="16" cy="16" r="16" fill="#0098EA" />
      <path
        d="M16 7.5L8.5 12l7.5 12.5L23.5 12 16 7.5zm0 2.8l4.8 2.9-4.8 8-4.8-8 4.8-2.9z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function UsdtIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
      <circle cx="16" cy="16" r="16" fill="#26A17B" />
      <path
        d="M17.9 14.7v-2.2h4.5V9.3H9.6v3.2h4.5v2.2c-4.4.2-7.7 1.1-7.7 2.2s3.3 2 7.7 2.2v5.6h3.8v-5.6c4.4-.2 7.7-1.1 7.7-2.2s-3.3-2-7.7-2.2zm0 3.3c-3.1 0-5.7-.6-6.2-1.3.5-.7 3.1-1.2 6.2-1.2s5.7.5 6.2 1.2c-.5.7-3.1 1.3-6.2 1.3z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function UsdcIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
      <circle cx="16" cy="16" r="16" fill="#2775CA" />
      <path
        d="M16 6.5C10.8 6.5 6.5 10.8 6.5 16S10.8 25.5 16 25.5 25.5 21.2 25.5 16 21.2 6.5 16 6.5zm0 17.2c-4.3 0-7.7-3.4-7.7-7.7S11.7 8.3 16 8.3s7.7 3.4 7.7 7.7-3.4 7.7-7.7 7.7zm1.1-12.7h-2.2v1.1c-1.4.2-2.3 1.1-2.3 2.2 0 1.4 1 2 2.7 2.3 1.3.3 1.7.6 1.7 1.2 0 .6-.5 1-1.5 1-1 0-1.6-.4-1.8-1.2h-1.6c.2 1.5 1.2 2.3 2.5 2.5v1.1h2.2v-1.1c1.4-.2 2.4-1.1 2.4-2.3 0-1.3-.9-2-2.6-2.3-1.3-.3-1.8-.6-1.8-1.2 0-.6.5-1 1.4-1 .8 0 1.4.4 1.6 1h1.6c-.2-1.3-1-2.1-2.3-2.3V11z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function PepeIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
      <circle cx="16" cy="16" r="16" fill="#4B9B38" />
      <circle cx="11.5" cy="12.5" r="4.5" fill="#FFFFFF" />
      <circle cx="20.5" cy="12.5" r="4.5" fill="#FFFFFF" />
      <circle cx="12" cy="12.5" r="2.2" fill="#1e293b" />
      <circle cx="20" cy="12.5" r="2.2" fill="#1e293b" />
      <path
        d="M8.5 19.5c2.5 3 12.5 3 15 0"
        stroke="#DC2626"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NearIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
      <circle cx="16" cy="16" r="16" fill="#000000" />
      <path
        d="M9.5 22.5V9.5h3.2l7.1 9.8V9.5h2.7v13h-3.2l-7.1-9.8v9.8H9.5z"
        fill="#00EC97"
      />
    </svg>
  );
}

function UniIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
      <circle cx="16" cy="16" r="16" fill="#FF007A" />
      <path
        d="M17.5 8c0 3.5-2.5 5.5-2.5 5.5s3.5-1 5.5 1c2.5 2.5 1 6-1 7.5s-4.5 1.5-6.5 0-2-4 0-6.5 4.5-3 4.5-7.5z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function SuiIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
      <circle cx="16" cy="16" r="16" fill="#2A82E4" />
      <path
        d="M16 7c-4 5-6 8.5-6 12 0 3.3 2.7 6 6 6s6-2.7 6-6c0-3.5-2-7-6-12zm0 20c-2.2 0-4-1.8-4-4 0-2.4 1.6-5.3 4-8.7 2.4 3.4 4 6.3 4 8.7 0 2.2-1.8 4-4 4z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function ArbIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
      <circle cx="16" cy="16" r="16" fill="#28A0F0" />
      <path
        d="M16 7.5L9 21.5h3.5l1.8-3.6h3.4l1.8 3.6h3.5L16 7.5zm0 6.8l1.3 2.7h-2.6L16 14.3z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function ShibIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
      <circle cx="16" cy="16" r="16" fill="#FFA409" />
      <path
        d="M10 10l3 4-2 3 5 4 5-4-2-3 3-4-4 1-2 2-2-2-4-1z"
        fill="#FFFFFF"
      />
      <circle cx="13" cy="16" r="1" fill="#1a1a1a" />
      <circle cx="19" cy="16" r="1" fill="#1a1a1a" />
    </svg>
  );
}

// Map tokens to instant vector icons
const VECTOR_ICONS: Record<string, React.FC> = {
  btc: BtcIcon,
  bitcoin: BtcIcon,
  eth: EthIcon,
  ethereum: EthIcon,
  sol: SolIcon,
  solana: SolIcon,
  bnb: BnbIcon,
  binancecoin: BnbIcon,
  xrp: XrpIcon,
  ripple: XrpIcon,
  doge: DogeIcon,
  dogecoin: DogeIcon,
  ada: AdaIcon,
  cardano: AdaIcon,
  link: LinkIcon,
  chainlink: LinkIcon,
  avax: AvaxIcon,
  "avalanche-2": AvaxIcon,
  dot: DotIcon,
  polkadot: DotIcon,
  matic: PolygonIcon,
  pol: PolygonIcon,
  polygon: PolygonIcon,
  "matic-network": PolygonIcon,
  ton: TonIcon,
  "the-open-network": TonIcon,
  usdt: UsdtIcon,
  tether: UsdtIcon,
  usdc: UsdcIcon,
  "usd-coin": UsdcIcon,
  pepe: PepeIcon,
  near: NearIcon,
  uni: UniIcon,
  uniswap: UniIcon,
  sui: SuiIcon,
  arb: ArbIcon,
  arbitrum: ArbIcon,
  shib: ShibIcon,
  "shiba-inu": ShibIcon,
};

// Vibrant fallback gradients for non-vector tokens
const TOKEN_GRADIENTS: Record<string, string> = {
  floki: "from-amber-500 to-yellow-600 text-black",
  sfm: "from-teal-500 to-emerald-600 text-white",
  rndr: "from-rose-500 to-red-700 text-white",
  fet: "from-cyan-600 to-blue-700 text-white",
  tao: "from-slate-700 to-slate-900 text-white",
  wif: "from-amber-600 to-yellow-700 text-white",
  trx: "from-red-600 to-rose-700 text-white",
  apt: "from-slate-800 to-teal-900 text-teal-300",
  atom: "from-indigo-600 to-purple-800 text-white",
  ftm: "from-blue-600 to-indigo-700 text-white",
  op: "from-red-500 to-rose-600 text-white",
  inj: "from-cyan-500 to-blue-600 text-white",
  kas: "from-teal-400 to-emerald-600 text-black",
  xmr: "from-orange-600 to-amber-700 text-white",
  ltc: "from-slate-400 to-slate-600 text-white",
  bonk: "from-orange-500 to-amber-600 text-white",
  bome: "from-emerald-500 to-teal-700 text-white",
  aave: "from-cyan-500 to-purple-600 text-white",
  mkr: "from-teal-600 to-emerald-800 text-white",
  tia: "from-purple-600 to-pink-600 text-white",
  sei: "from-red-700 to-rose-900 text-white",
  jup: "from-emerald-500 to-teal-600 text-white",
  pendle: "from-blue-500 to-indigo-700 text-white",
};

export function CryptoAvatar({
  coinId = "",
  symbol = "",
  name = "",
  imageUrl = "",
  size = "md",
  className = "",
}: CryptoAvatarProps) {
  const cleanId = (coinId || "").toLowerCase().trim();
  const cleanSym = (symbol || coinId || "CRYPTO").toLowerCase().replace(/[^a-z0-9]/g, "");
  const fallbackSym = (symbol || coinId || name || "C").slice(0, 3).toUpperCase();

  // 1. If we have a native vector icon, render it immediately (0ms latency, impossible to fail!)
  const VectorComponent = VECTOR_ICONS[cleanId] || VECTOR_ICONS[cleanSym];

  // Size mapping
  let sizeClasses = "w-8 h-8 text-xs";
  let pixelSize = 32;

  if (typeof size === "number") {
    sizeClasses = `w-[${size}px] h-[${size}px] text-xs`;
    pixelSize = size;
  } else {
    switch (size) {
      case "xs":
        sizeClasses = "w-4 h-4 text-[8px]";
        pixelSize = 16;
        break;
      case "sm":
        sizeClasses = "w-5 h-5 text-[10px]";
        pixelSize = 20;
        break;
      case "md":
        sizeClasses = "w-8 h-8 text-xs";
        pixelSize = 32;
        break;
      case "lg":
        sizeClasses = "w-11 h-11 text-sm";
        pixelSize = 44;
        break;
      case "xl":
        sizeClasses = "w-14 h-14 text-base";
        pixelSize = 56;
        break;
    }
  }

  // Pre-load external image if provided (only for coins without vector icons)
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!VectorComponent && imageUrl && imageUrl.startsWith("http")) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => setImgLoaded(true);
      img.onerror = () => setImgLoaded(false);
    } else {
      setImgLoaded(false);
    }
  }, [imageUrl, VectorComponent]);

  if (VectorComponent) {
    return (
      <div
        className={`rounded-full flex items-center justify-center flex-shrink-0 select-none overflow-hidden ${sizeClasses} ${className}`}
        title={name || symbol || coinId}
      >
        <VectorComponent />
      </div>
    );
  }

  // If external image successfully loaded
  if (imgLoaded && imageUrl) {
    return (
      <div
        className={`rounded-full flex items-center justify-center flex-shrink-0 select-none overflow-hidden bg-slate-900 border border-slate-700/60 ${sizeClasses} ${className}`}
        title={name || symbol || coinId}
      >
        {/* Empty alt and hidden so browser broken image icons NEVER render */}
        <img
          src={imageUrl}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Crisp gradient fallback badge
  const gradientClass =
    TOKEN_GRADIENTS[cleanSym] || "from-blue-600 via-indigo-600 to-slate-900 text-white";

  return (
    <div
      className={`rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center font-black font-mono tracking-tighter uppercase shadow-sm flex-shrink-0 select-none border border-white/10 ${sizeClasses} ${className}`}
      title={name || symbol || coinId}
    >
      <span>{fallbackSym.slice(0, pixelSize < 24 ? 2 : 3)}</span>
    </div>
  );
}

export default CryptoAvatar;
