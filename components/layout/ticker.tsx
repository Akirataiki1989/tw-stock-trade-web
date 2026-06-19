export type Quote = {
  symbol: string;
  last_price: number;
  change: number;
  change_pct: number;
};

export function Ticker({ quote }: { quote?: Quote }) {
  if (!quote) {
    return (
      <span className="font-mono text-sm text-zinc-500">
        TWSE --.--
      </span>
    );
  }

  const isUp = quote.change > 0;
  const isDown = quote.change < 0;
  const changeColor = isUp
    ? "text-emerald-400"
    : isDown
      ? "text-red-400"
      : "text-zinc-500";
  const sign = isUp ? "+" : "";

  return (
    <span className="font-mono text-sm text-zinc-100">
      {quote.symbol}{" "}
      <span>{quote.last_price.toFixed(2)}</span>{" "}
      <span className={changeColor}>
        {sign}{quote.change.toFixed(2)} ({sign}{quote.change_pct.toFixed(2)}%)
      </span>
    </span>
  );
}
