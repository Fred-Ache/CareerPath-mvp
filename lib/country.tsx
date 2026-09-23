"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { COUNTRIES, type Country, type CountryCode } from "@/lib/types";

const STORAGE_KEY = "careerpath-country";

type CountryContextValue = {
  country: Country | null;
  setCountryCode: (code: CountryCode) => void;
  ready: boolean;
};

const CountryContext = createContext<CountryContextValue | null>(null);

function readStoredCountry(): Country | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return COUNTRIES.find((c) => c.code === stored) ?? null;
}

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountry] = useState<Country | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCountry(readStoredCountry());
    setReady(true);
  }, []);

  const setCountryCode = useCallback((code: CountryCode) => {
    const next = COUNTRIES.find((c) => c.code === code) ?? null;
    setCountry(next);
    if (next) {
      window.localStorage.setItem(STORAGE_KEY, next.code);
    }
  }, []);

  const value = useMemo(
    () => ({ country, setCountryCode, ready }),
    [country, setCountryCode, ready],
  );

  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  );
}

export function useCountry() {
  const ctx = useContext(CountryContext);
  if (!ctx) {
    throw new Error("useCountry must be used within CountryProvider");
  }
  return ctx;
}
