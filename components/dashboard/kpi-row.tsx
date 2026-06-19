import { formatPct, formatTwd } from "@/lib/format";
import type { PortfolioSummary } from "@/lib/use-portfolio-summary";

const EMPTY_SUMMARY: PortfolioSummary = {
  totalAssets: 0,
  todayChangePct: 0,
  availableCash: 0,
  cashPct: 0,
  holdingsValue: 0,
  positionCount: 0,
  winRate: 0,
  tradeCount: 0,
};

function changeColor(value: number): string {
  if (value > 0) return "text-emerald-400";
  if (value < 0) return "text-red-400";
  return "text-zinc-500";
}

export function KpiRow({ summary }: { summary: PortfolioSummary | null }) {
  const s = summary ?? EMPTY_SUMMARY;

  return (
    <div className="flex h-[72px] items-center">
      <div className="flex h-full w-[28%] flex-col justify-center px-6">
        <span className="text-xs text-zinc-500">Total Assets</span>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-lg text-zinc-100">{formatTwd(s.totalAssets)}</span>
          <span className={`font-mono text-xs ${changeColor(s.todayChangePct)}`}>
            {formatPct(s.todayChangePct)}
          </span>
        </div>
      </div>
      <div className="flex h-full w-[28%] flex-col justify-center border-l border-zinc-800 px-6">
        <span className="text-xs text-zinc-500">Available Cash</span>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-lg text-zinc-100">{formatTwd(s.availableCash)}</span>
          <span className="font-mono text-xs text-zinc-500">{s.cashPct.toFixed(1)}%</span>
        </div>
      </div>
      <div className="flex h-full w-[22%] flex-col justify-center border-l border-zinc-800 px-6">
        <span className="text-xs text-zinc-500">Holdings MV</span>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-lg text-zinc-100">{formatTwd(s.holdingsValue)}</span>
          <span className="text-xs text-zinc-500">{s.positionCount} positions</span>
        </div>
      </div>
      <div className="flex h-full w-[22%] flex-col justify-center border-l border-zinc-800 px-6">
        <span className="text-xs text-zinc-500">Win Rate</span>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-lg text-zinc-100">{s.winRate.toFixed(1)}%</span>
          <span className="text-xs text-zinc-500">{s.tradeCount} trades</span>
        </div>
      </div>
    </div>
  );
}
