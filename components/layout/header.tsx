import { ThemeToggle } from "@/components/theme-toggle";
import { Ticker, type Quote } from "@/components/layout/ticker";

function StatusDot({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`h-1.5 w-1.5 rounded-full ${active ? "bg-emerald-400" : "bg-zinc-600"}`}
      />
      <span className="text-xs text-zinc-500">{label}</span>
    </div>
  );
}

export function Header({
  quote,
  marketOpen = false,
  apiConnected = false,
}: {
  quote?: Quote;
  marketOpen?: boolean;
  apiConnected?: boolean;
}) {
  return (
    <header className="grid h-16 grid-cols-3 items-center border-b border-zinc-800 bg-zinc-950 px-6">
      <div className="flex items-center">
        <span className="text-base font-semibold text-zinc-100">TW Trade</span>
      </div>

      <div className="flex justify-center">
        <Ticker quote={quote} />
      </div>

      <div className="flex items-center justify-end gap-4">
        <StatusDot label="Market" active={marketOpen} />
        <StatusDot label="API" active={apiConnected} />
        <ThemeToggle />
      </div>
    </header>
  );
}
