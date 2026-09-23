"use client";

import { COUNTRIES } from "@/lib/types";
import { useCountry } from "@/lib/country";

type Props = {
  heading?: string;
};

export function CountrySelector({
  heading = "Where are you exploring from?",
}: Props) {
  const { country, setCountryCode, ready } = useCountry();

  if (!ready) {
    return (
      <div className="rounded-2xl border border-forest-100 bg-white p-5 text-sm text-ink-700">
        Loading country options…
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-forest-100 bg-white p-5 shadow-sm">
      <h2 className="font-display text-lg text-ink-900">{heading}</h2>
      <p className="mt-1 text-sm text-ink-700">
        Assessment questions are shared. Education pathways will use Ghana or
        Nigeria information once verified data is available.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {COUNTRIES.map((option) => {
          const selected = country?.code === option.code;
          return (
            <button
              key={option.code}
              type="button"
              onClick={() => setCountryCode(option.code)}
              className={`rounded-xl border px-4 py-3 text-left ${
                selected
                  ? "border-forest-600 bg-forest-50 text-forest-700"
                  : "border-forest-100 hover:border-forest-500"
              }`}
            >
              <span className="block text-sm font-semibold">{option.name}</span>
              <span className="text-xs text-ink-700">{option.code}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
