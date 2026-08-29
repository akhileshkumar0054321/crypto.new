"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useState, useEffect } from "react";
import { LiveMarketProvider } from "@/lib/context/LiveMarketContext";
import { UserPlanProvider } from "@/lib/context/UserPlanContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  useEffect(() => {
    // Suppress cross-origin third-party script errors (TradingView / Puter / CDN iframe issues)
    const isBenignScriptError = (msg: string, src?: string) => {
      const lowerMsg = (msg || "").toLowerCase();
      const lowerSrc = (src || "").toLowerCase();
      return (
        !msg ||
        lowerMsg.includes("script error") ||
        lowerMsg.includes("queryselector") ||
        lowerMsg.includes("cannot read properties of null") ||
        lowerMsg.includes("reading 'queryselector'") ||
        lowerMsg.includes("tradingview") ||
        lowerMsg.includes("puter") ||
        lowerSrc.includes("tradingview.com") ||
        lowerSrc.includes("puter.com")
      );
    };

    const handleGlobalError = (event: ErrorEvent) => {
      const msg = event.message || (event.error?.message ?? "");
      const filename = event.filename || "";
      if (isBenignScriptError(msg, filename)) {
        event.preventDefault();
        event.stopPropagation();
        return true;
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reasonStr = String(event.reason?.message || event.reason || "");
      if (isBenignScriptError(reasonStr)) {
        event.preventDefault();
      }
    };

    window.addEventListener("error", handleGlobalError, true);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleGlobalError, true);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LiveMarketProvider>
        <UserPlanProvider>
          {children}
          <Toaster
            position="top-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "#161d30",
                border: "1px solid #1e2d45",
                color: "#ffffff",
              },
            }}
          />
        </UserPlanProvider>
      </LiveMarketProvider>
    </QueryClientProvider>
  );
}
