"use client";

import { CountryProvider } from "@/lib/country";

export function Providers({ children }: { children: React.ReactNode }) {
  return <CountryProvider>{children}</CountryProvider>;
}
