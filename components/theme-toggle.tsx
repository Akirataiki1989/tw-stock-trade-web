"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";

const STORAGE_KEY = "tw-stock-trade-theme";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    // One-time sync from localStorage (an external system) on mount; not derivable from props/state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(stored !== "light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-8 w-8 items-center justify-center rounded-sm text-zinc-500 hover:text-zinc-100"
    >
      {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
    </button>
  );
}
