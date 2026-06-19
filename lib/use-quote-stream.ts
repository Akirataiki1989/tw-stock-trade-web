"use client";

import { useEffect, useState } from "react";
import type { Quote } from "@/components/layout/ticker";

const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL;

export function useQuoteStream(token: string | null, symbol: string) {
  const [quote, setQuote] = useState<Quote | undefined>(undefined);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }

    const ws = new WebSocket(`${WS_BASE_URL}/ws/quotes?token=${token}`);

    ws.onopen = () => {
      setConnected(true);
      ws.send(JSON.stringify({ action: "subscribe", symbols: [symbol] }));
    };
    ws.onclose = () => setConnected(false);
    ws.onerror = () => setConnected(false);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "quote") {
        setQuote({
          symbol: data.symbol,
          last_price: data.last_price,
          change: data.change,
          change_pct: data.change_pct,
        });
      }
    };

    return () => ws.close();
  }, [token, symbol]);

  return { quote, connected };
}
