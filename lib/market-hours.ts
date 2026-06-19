export function isTwseMarketOpen(date: Date = new Date()): boolean {
  const taipei = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Taipei" }));
  const day = taipei.getDay();
  if (day === 0 || day === 6) return false;

  const minutes = taipei.getHours() * 60 + taipei.getMinutes();
  return minutes >= 9 * 60 && minutes <= 13 * 60 + 30;
}
