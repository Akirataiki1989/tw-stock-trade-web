"use client";

import { useEffect, useState } from "react";
import { SignOutIcon } from "@phosphor-icons/react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Ticker } from "@/components/layout/ticker";
import { useAuth } from "@/lib/auth-context";
import { useQuoteStream } from "@/lib/use-quote-stream";
import { isTwseMarketOpen } from "@/lib/market-hours";

const DEFAULT_SYMBOL = "2330";

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

export function Header() {
  const { token, logout } = useAuth();
  const { quote, connected } = useQuoteStream(token, DEFAULT_SYMBOL);
  const [marketOpen, setMarketOpen] = useState(false);

  useEffect(() => {
    function update() {
      setMarketOpen(isTwseMarketOpen());
    }
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

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
        <StatusDot label="API" active={connected} />
        <ThemeToggle />
        {token && (
          <button
            type="button"
            onClick={logout}
            aria-label="Sign out"
            className="flex h-8 w-8 items-center justify-center rounded-sm text-zinc-500 hover:text-zinc-100"
          >
            <SignOutIcon size={18} />
          </button>
        )}
      </div>
    </header>
  );
}
