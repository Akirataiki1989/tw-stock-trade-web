import { describe, expect, it } from "vitest";
import { formatTwd, formatPct } from "./format";

describe("formatTwd", () => {
  it("formats a whole number with NT$ prefix and thousand separators", () => {
    expect(formatTwd(1234567)).toBe("NT$1,234,567");
  });

  it("rounds fractional amounts to the nearest dollar", () => {
    expect(formatTwd(1000.6)).toBe("NT$1,001");
  });

  it("formats zero", () => {
    expect(formatTwd(0)).toBe("NT$0");
  });
});

describe("formatPct", () => {
  it("prefixes positive values with a plus sign", () => {
    expect(formatPct(1.2)).toBe("+1.20%");
  });

  it("does not add an extra sign for negative values", () => {
    expect(formatPct(-1.2)).toBe("-1.20%");
  });

  it("does not prefix zero with a plus sign", () => {
    expect(formatPct(0)).toBe("0.00%");
  });
});
