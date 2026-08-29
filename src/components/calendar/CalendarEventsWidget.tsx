"use client";

import React, { useEffect, useRef, memo } from "react";

interface CalendarWidgetProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

function CalendarWidgetComponent({
  width = "100%",
  height = 550,
  className = "",
}: CalendarWidgetProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainer = container.current;
    if (!currentContainer) return;

    let scriptElement: HTMLScriptElement | null = null;
    let isCleanedUp = false;

    try {
      // Clear previous scripts/widgets safely
      while (currentContainer.firstChild) {
        currentContainer.removeChild(currentContainer.firstChild);
      }

      const widgetDiv = document.createElement("div");
      widgetDiv.className = "tradingview-widget-container__widget";
      widgetDiv.style.height = "calc(100% - 24px)";
      widgetDiv.style.width = "100%";
      currentContainer.appendChild(widgetDiv);

      const copyrightDiv = document.createElement("div");
      copyrightDiv.className = "tradingview-widget-copyright text-[11px] text-slate-500 px-2 py-1 flex items-center justify-between";
      copyrightDiv.innerHTML = `
        <span class="text-slate-400 font-medium">Economic Calendar</span>
        <span class="text-slate-500">Live Global Releases</span>
      `;
      currentContainer.appendChild(copyrightDiv);

      const script = document.createElement("script");
      scriptElement = script;
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
      script.type = "text/javascript";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onerror = () => {
        // Suppress script error
      };
      script.innerHTML = JSON.stringify({
        colorTheme: "dark",
        isTransparent: false,
        locale: "en",
        countryFilter: "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu",
        importanceFilter: "-1,0,1",
        width: "100%",
        height: typeof height === "number" ? height : 550,
      });

      if (!isCleanedUp) {
        currentContainer.appendChild(script);
      }
    } catch {
      // Safe fallback
    }

    return () => {
      isCleanedUp = true;
      if (scriptElement && scriptElement.parentNode) {
        try {
          scriptElement.parentNode.removeChild(scriptElement);
        } catch {
          // ignore
        }
      }
    };
  }, [height]);

  return (
    <div
      className={`tradingview-widget-container rounded-xl overflow-hidden bg-[#0d121c] border border-slate-800 ${className}`}
      ref={container}
      style={{ width, height }}
    />
  );
}

export const CalendarEventsWidget = memo(CalendarWidgetComponent);
export default CalendarEventsWidget;
