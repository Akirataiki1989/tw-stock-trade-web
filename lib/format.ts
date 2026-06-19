export function formatTwd(amount: number): string {
  return `NT$${Math.round(amount).toLocaleString("en-US")}`;
}

export function formatPct(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}
