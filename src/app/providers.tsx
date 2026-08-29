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
    const handleGlobalError = (event: ErrorEvent) => {
      const msg = event.message || "";
      const filename = event.filename || "";
      if (
        !msg ||
        msg === "Script error." ||
        msg.includes("Script error") ||
        msg.includes("querySelector") ||
        filename.includes("tradingview.com") ||
        filename.includes("puter.com")
      ) {
        event.preventDefault();
        return true;
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reasonStr = String(event.reason?.message || event.reason || "");
      if (
        reasonStr.includes("Script error") ||
        reasonStr.includes("tradingview") ||
        reasonStr.includes("puter") ||
        reasonStr.includes("querySelector")
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("error", handleGlobalError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleGlobalError);
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
