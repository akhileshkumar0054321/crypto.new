import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { PriceTicker } from "@/components/layout/PriceTicker";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Remix crypto | Real-Time Cryptocurrency Intelligence & Risk Radar",
  description: "Real-time cryptocurrency market intelligence, live price tracking, early trend discovery, whale activity tracking, market divergence detection, downside risk checks, and trade exit planning.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#08090e] text-slate-100 antialiased min-h-screen" suppressHydrationWarning>
        <Providers>
          <div className="flex flex-col min-h-screen overflow-x-hidden bg-[#08090e]">
            <PriceTicker />
            <Navbar />
            <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 bg-[#08090e]">
              <div className="max-w-7xl mx-auto animate-fade-in w-full">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
