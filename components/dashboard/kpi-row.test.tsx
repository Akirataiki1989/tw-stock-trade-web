import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { KpiRow } from "./kpi-row";
import type { PortfolioSummary } from "@/lib/use-portfolio-summary";

const summary: PortfolioSummary = {
  totalAssets: 1000000,
  todayChangePct: 1.5,
  availableCash: 600000,
  cashPct: 60,
  holdingsValue: 400000,
  positionCount: 2,
  winRate: 62.5,
  tradeCount: 8,
};

describe("KpiRow", () => {
  it("renders formatted TWD amounts and labels for all four slots", () => {
    render(<KpiRow summary={summary} />);

    expect(screen.getByText("NT$1,000,000")).toBeInTheDocument();
    expect(screen.getByText("NT$600,000")).toBeInTheDocument();
    expect(screen.getByText("NT$400,000")).toBeInTheDocument();
    expect(screen.getByText("2 positions")).toBeInTheDocument();
    expect(screen.getByText("62.5%")).toBeInTheDocument();
    expect(screen.getByText("8 trades")).toBeInTheDocument();
  });

  it("colors a positive today change green", () => {
    render(<KpiRow summary={summary} />);
    expect(screen.getByText("+1.50%")).toHaveClass("text-emerald-400");
  });

  it("colors a negative today change red", () => {
    render(<KpiRow summary={{ ...summary, todayChangePct: -1.5 }} />);
    expect(screen.getByText("-1.50%")).toHaveClass("text-red-400");
  });

  it("renders a zero state when summary is null", () => {
    render(<KpiRow summary={null} />);
    expect(screen.getAllByText("NT$0")).toHaveLength(3);
  });
});
