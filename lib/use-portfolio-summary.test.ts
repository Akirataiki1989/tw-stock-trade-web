import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { apiGet } from "./api-client";
import { usePortfolioSummary } from "./use-portfolio-summary";

vi.mock("./api-client", () => ({
  apiGet: vi.fn(),
}));

describe("usePortfolioSummary", () => {
  afterEach(() => {
    vi.mocked(apiGet).mockReset();
  });

  it("returns null summary and is not loading when there is no token", () => {
    const { result } = renderHook(() => usePortfolioSummary(null));
    expect(result.current.summary).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it("combines the four portfolio endpoints into one summary", async () => {
    vi.mocked(apiGet).mockImplementation(async (path: unknown) => {
      if (path === "/portfolio") return { total_value: 1000000, cash: 600000 };
      if (path === "/portfolio/performance") {
        return [{ daily_return_pct: 1.5, holdings_value: 400000 }];
      }
      if (path === "/portfolio/holdings") return [{ id: 1 }, { id: 2 }];
      if (path === "/portfolio/stats") return { win_rate: 62.5, total_trades: 8 };
      throw new Error(`unexpected path ${String(path)}`);
    });

    const { result } = renderHook(() => usePortfolioSummary("test-token"));

    await waitFor(() => expect(result.current.summary).not.toBeNull());

    expect(result.current.summary).toEqual({
      totalAssets: 1000000,
      todayChangePct: 1.5,
      availableCash: 600000,
      cashPct: 60,
      holdingsValue: 400000,
      positionCount: 2,
      winRate: 62.5,
      tradeCount: 8,
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("sets an error message when a request fails", async () => {
    vi.mocked(apiGet).mockRejectedValue(new Error("network down"));

    const { result } = renderHook(() => usePortfolioSummary("test-token"));

    await waitFor(() => expect(result.current.error).not.toBeNull());
    expect(result.current.summary).toBeNull();
  });
});
