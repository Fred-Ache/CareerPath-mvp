"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CareerMatch } from "@/lib/recommendation";

export default function ResultsPage() {
  const [matches, setMatches] = useState<CareerMatch[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("careerpath-results");
    if (stored) {
      setMatches(JSON.parse(stored) as CareerMatch[]);
    }
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest-600">
            Career matches
          </p>
          <h1 className="mt-2 font-display text-3xl text-ink-900 md:text-4xl">
            Your top career matches
          </h1>
        </div>
        <Link
          href="/assessment"
          className="inline-flex rounded-full border border-forest-200 px-4 py-2 text-sm font-medium text-forest-700 hover:bg-forest-50"
        >
          Retake assessment
        </Link>
      </div>

      {matches.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-forest-200 bg-white p-6 text-ink-700">
          No results yet. Complete the assessment to see your career recommendations.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {matches.map((match) => (
            <article
              key={match.slug}
              className="rounded-2xl border border-forest-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-forest-600">
                    Match score
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-ink-900">{match.name}</h2>
                </div>
                <span className="rounded-full bg-forest-50 px-2.5 py-1 text-sm font-semibold text-forest-700">
                  {match.score}%
                </span>
              </div>

              <p className="mt-4 text-sm text-ink-700">{match.summary}</p>

              <ul className="mt-4 space-y-2 text-sm text-ink-700">
                {match.reasons.map((reason) => (
                  <li key={reason} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-forest-500" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/careers/${match.slug}`}
                className="mt-5 inline-flex rounded-full bg-forest-600 px-4 py-2 text-sm font-semibold text-white hover:bg-forest-700"
              >
                View profile
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
