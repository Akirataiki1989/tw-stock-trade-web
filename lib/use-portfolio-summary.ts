"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api-client";

export type PortfolioSummary = {
  totalAssets: number;
  todayChangePct: number;
  availableCash: number;
  cashPct: number;
  holdingsValue: number;
  positionCount: number;
  winRate: number;
  tradeCount: number;
};

type Portfolio = { total_value: number; cash: number };
type PerformanceEntry = { daily_return_pct: number; holdings_value: number };
type PortfolioStats = { win_rate: number; total_trades: number };
type Holding = { id: number };

export function usePortfolioSummary(token: string | null) {
  const [summary, setSummary] = useState<PortfolioSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const [portfolio, performance, holdings, stats] = await Promise.all([
          apiGet<Portfolio>("/portfolio", token),
          apiGet<PerformanceEntry[]>("/portfolio/performance", token),
          apiGet<Holding[]>("/portfolio/holdings", token),
          apiGet<PortfolioStats>("/portfolio/stats", token),
        ]);
        if (cancelled) return;

        const latest = performance[performance.length - 1];
        setSummary({
          totalAssets: portfolio.total_value,
          todayChangePct: latest ? latest.daily_return_pct : 0,
          availableCash: portfolio.cash,
          cashPct: portfolio.total_value > 0 ? (portfolio.cash / portfolio.total_value) * 100 : 0,
          holdingsValue: latest ? latest.holdings_value : portfolio.total_value - portfolio.cash,
          positionCount: holdings.length,
          winRate: stats.win_rate,
          tradeCount: stats.total_trades,
        });
      } catch {
        if (!cancelled) setError("Failed to load portfolio summary");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  return { summary, isLoading, error };
}
