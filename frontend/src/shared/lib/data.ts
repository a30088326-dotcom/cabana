import {
seedCabanas,
seedSettings,
type Cabana,
type SiteSettings,
} from "@elara/contracts";
import { cache } from "react";
const origin = process.env.API_URL || "http://127.0.0.1:4000";
export const getSite = cache(async (): Promise<SiteSettings> => {
  try {
    const r = await fetch(origin + "/api/v1/site", {
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    if (!r.ok) throw new Error("API unavailable");
    return await r.json();
  } catch {
    return seedSettings;
  }
});
export const getCabanas = cache(async (): Promise<Cabana[]> => {
  try {
    const r = await fetch(origin + "/api/v1/cabanas", {
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    if (!r.ok) throw new Error("API unavailable");
    return ((await r.json()) as Cabana[]).sort((a, b) => a.price - b.price);
  } catch {
    return seedCabanas;
  }
});
