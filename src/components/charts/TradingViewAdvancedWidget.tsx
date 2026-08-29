"use client";

import React, { useEffect, useRef, useState, memo } from "react";

export interface TradingViewWidgetProps {
  symbol?: string;
  coinId?: string;
  coinName?: string;
  interval?: "1" | "3" | "5" | "15" | "30" | "60" | "120" | "240" | "D" | "W" | "M";
  theme?: "dark" | "light";
  style?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  height?: string | number;
  width?: string | number;
  allowSymbolChange?: boolean;
  hideSideToolbar?: boolean;
  hideTopToolbar?: boolean;
  hideLegend?: boolean;
  hideVolume?: boolean;
  studies?: string[];
  backgroundColor?: string;
  gridColor?: string;
  className?: string;
  containerId?: string;
}

/**
 * Resolves a cryptocurrency symbol or coin identifier into a valid TradingView ticker.
 */
export function resolveTradingViewSymbol(symbol?: string, coinId?: string): string {
  if (!symbol && !coinId) return "BINANCE:BTCUSDT";

  const rawSym = (symbol || "").trim().toUpperCase();
  const rawId = (coinId || "").trim().toLowerCase();

  // If already contains an exchange prefix (e.g. BINANCE:, COINBASE:, NASDAQ:, BYBIT:, OKX:)
  if (rawSym.includes(":")) {
    return rawSym;
  }

  // Explicit mappings for major cryptocurrencies & meme tokens
  const symbolMap: Record<string, string> = {
    BTC: "BINANCE:BTCUSDT",
    BITCOIN: "BINANCE:BTCUSDT",
    ETH: "BINANCE:ETHUSDT",
    ETHEREUM: "BINANCE:ETHUSDT",
    SOL: "BINANCE:SOLUSDT",
    SOLANA: "BINANCE:SOLUSDT",
    BNB: "BINANCE:BNBUSDT",
    BINANCECOIN: "BINANCE:BNBUSDT",
    XRP: "BINANCE:XRPUSDT",
    RIPPLE: "BINANCE:XRPUSDT",
    ADA: "BINANCE:ADAUSDT",
    CARDANO: "BINANCE:ADAUSDT",
    DOGE: "BINANCE:DOGEUSDT",
    DOGECOIN: "BINANCE:DOGEUSDT",
    SHIB: "BINANCE:SHIBUSDT",
    "SHIBA-INU": "BINANCE:SHIBUSDT",
    PEPE: "BINANCE:PEPEUSDT",
    AVAX: "BINANCE:AVAXUSDT",
    "AVALANCHE-2": "BINANCE:AVAXUSDT",
    SUI: "BINANCE:SUIUSDT",
    NEAR: "BINANCE:NEARUSDT",
    LINK: "BINANCE:LINKUSDT",
    CHAINLINK: "BINANCE:LINKUSDT",
    DOT: "BINANCE:DOTUSDT",
    POLKADOT: "BINANCE:DOTUSDT",
    UNI: "BINANCE:UNIUSDT",
    UNISWAP: "BINANCE:UNIUSDT",
    TON: "OKX:TONUSDT",
    "THE-OPEN-NETWORK": "OKX:TONUSDT",
    APT: "BINANCE:APTUSDT",
    APTOS: "BINANCE:APTUSDT",
    RENDER: "BINANCE:RENDERUSDT",
    RNDR: "BINANCE:RENDERUSDT",
    "RENDER-TOKEN": "BINANCE:RENDERUSDT",
    FET: "BINANCE:FETUSDT",
    "FETCH-AI": "BINANCE:FETUSDT",
    TAO: "BINANCE:TAOUSDT",
    BITTENSOR: "BINANCE:TAOUSDT",
    ARB: "BINANCE:ARBUSDT",
    ARBITRUM: "BINANCE:ARBUSDT",
    OP: "BINANCE:OPUSDT",
    OPTIMISM: "BINANCE:OPUSDT",
    POL: "BINANCE:POLUSDT",
    MATIC: "BINANCE:POLUSDT",
    "MATIC-NETWORK": "BINANCE:POLUSDT",
    WIF: "BINANCE:WIFUSDT",
    DOGWIFCOIN: "BINANCE:WIFUSDT",
    FLOKI: "BINANCE:FLOKIUSDT",
    BONK: "BINANCE:BONKUSDT",
    WLD: "BINANCE:WLDUSDT",
    "WORLDCOIN-WLD": "BINANCE:WLDUSDT",
    AAVE: "BINANCE:AAVEUSDT",
    MKR: "BINANCE:MKRUSDT",
    MAKER: "BINANCE:MKRUSDT",
    CRV: "BINANCE:CRVUSDT",
    "CURVE-DAO-TOKEN": "BINANCE:CRVUSDT",
    TIA: "BINANCE:TIAUSDT",
    CELESTIA: "BINANCE:TIAUSDT",
    INJ: "BINANCE:INJUSDT",
    INJECTIVE: "BINANCE:INJUSDT",
    SEI: "BINANCE:SEIUSDT",
    KAS: "BYBIT:KASUSDT",
    KASPA: "BYBIT:KASUSDT",
    STX: "BINANCE:STXUSDT",
    STACKS: "BINANCE:STXUSDT",
    ICP: "BINANCE:ICPUSDT",
    "INTERNET-COMPUTER": "BINANCE:ICPUSDT",
    LTC: "BINANCE:LTCUSDT",
    LITECOIN: "BINANCE:LTCUSDT",
    TRX: "BINANCE:TRXUSDT",
    TRON: "BINANCE:TRXUSDT",
    USDT: "BINANCE:USDCUSDT",
    USDC: "BINANCE:USDCUSDT",
  };

  if (symbolMap[rawSym]) return symbolMap[rawSym];
  if (symbolMap[rawId]) return symbolMap[rawId];

  // Clean the symbol: remove non-alphanumeric
  const cleanSym = rawSym.replace(/[^A-Z0-9]/g, "");
  if (!cleanSym) return "BINANCE:BTCUSDT";

  // Standard Binance crypto USDT pair default
  return `BINANCE:${cleanSym}USDT`;
}

function TradingViewWidgetComponent({
  symbol = "BTC",
  coinId,
  coinName,
  interval = "D",
  theme = "dark",
  style = "1",
  height = "100%",
  width = "100%",
  allowSymbolChange = true,
  hideSideToolbar = false,
  hideTopToolbar = false,
  hideLegend = false,
  hideVolume = false,
  studies = [],
  backgroundColor = "#0A0E1A",
  gridColor = "rgba(242, 242, 242, 0.06)",
  className = "",
}: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tvSymbol = resolveTradingViewSymbol(symbol, coinId);
  const displayName = coinName || symbol || "Cryptocurrency";
  const [widgetKey, setWidgetKey] = useState(0);

  // Increment key when essential config changes to cleanly re-mount without race conditions
  useEffect(() => {
    setWidgetKey((prev) => prev + 1);
  }, [tvSymbol, interval, theme, style]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isMounted = true;

    try {
      // Clear out any previous scripts/nodes safely
      container.innerHTML = "";

      const widgetContainer = document.createElement("div");
      widgetContainer.className = "tradingview-widget-container__widget";
      widgetContainer.style.height = "calc(100% - 28px)";
      widgetContainer.style.width = "100%";
      container.appendChild(widgetContainer);

      const copyright = document.createElement("div");
      copyright.className = "tradingview-widget-copyright";
      copyright.style.height = "28px";
      copyright.style.display = "flex";
      copyright.style.alignItems = "center";
      copyright.style.justifyContent = "space-between";
      copyright.style.padding = "0 8px";
      copyright.innerHTML = `
        <a href="https://www.tradingview.com/symbols/${encodeURIComponent(tvSymbol.replace(":", "-"))}/" rel="noopener nofollow" target="_blank" style="text-decoration: none;">
          <span class="blue-text" style="color: #60a5fa; font-size: 11px; font-weight: 600;">${displayName} (${tvSymbol}) Real-Time Chart</span>
        </a>
        <span class="trademark" style="color: #64748b; font-size: 11px;">TradingView</span>
      `;
      container.appendChild(copyright);

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onerror = () => {
        // Safe error suppression for external widget load
      };

      const widgetConfig = {
        allow_symbol_change: allowSymbolChange,
        calendar: false,
        details: true,
        hide_side_toolbar: hideSideToolbar,
        hide_top_toolbar: hideTopToolbar,
        hide_legend: hideLegend,
        hide_volume: hideVolume,
        hotlist: false,
        interval: interval,
        locale: "en",
        save_image: true,
        style: style,
        symbol: tvSymbol,
        theme: theme,
        timezone: "Etc/UTC",
        backgroundColor: backgroundColor,
        gridColor: gridColor,
        watchlist: [],
        withdateranges: true,
        compareSymbols: [],
        support_host: "https://www.tradingview.com",
        studies: studies,
        autosize: true,
      };

      script.innerHTML = JSON.stringify(widgetConfig);

      if (isMounted) {
        container.appendChild(script);
      }
    } catch {
      // Ignore widget init errors
    }

    return () => {
      isMounted = false;
      if (container) {
        try {
          container.innerHTML = "";
        } catch {
          // ignore
        }
      }
    };
  }, [
    widgetKey,
    tvSymbol,
    displayName,
    interval,
    theme,
    style,
    allowSymbolChange,
    hideSideToolbar,
    hideTopToolbar,
    hideLegend,
    hideVolume,
    backgroundColor,
    gridColor,
    studies,
  ]);

  return (
    <div
      key={`tv-adv-${widgetKey}`}
      className={`tradingview-widget-container h-full w-full rounded-xl overflow-hidden ${className}`}
      ref={containerRef}
      style={{ height, width }}
    />
  );
}

export const TradingViewAdvancedWidget = memo(TradingViewWidgetComponent);
export default TradingViewAdvancedWidget;
