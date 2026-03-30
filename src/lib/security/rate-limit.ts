import { CONTACT_RATE_LIMIT } from "@/lib/config/constants";

type WindowEntry = {
  hits: number[];
};

const store = new Map<string, WindowEntry>();

export function checkContactRateLimit(key: string) {
  const now = Date.now();
  const entry = store.get(key) ?? { hits: [] };

  entry.hits = entry.hits.filter((timestamp) => now - timestamp <= 24 * 60 * 60 * 1000);

  const in2Min = entry.hits.filter((timestamp) => now - timestamp <= 2 * 60 * 1000).length;
  const inHour = entry.hits.filter((timestamp) => now - timestamp <= 60 * 60 * 1000).length;
  const inDay = entry.hits.length;

  if (
    in2Min >= CONTACT_RATE_LIMIT.per2Min ||
    inHour >= CONTACT_RATE_LIMIT.perHour ||
    inDay >= CONTACT_RATE_LIMIT.perDay
  ) {
    store.set(key, entry);
    return false;
  }

  entry.hits.push(now);
  store.set(key, entry);
  return true;
}
