import Link from "next/link";
import { CountrySelector } from "@/components/CountrySelector";

const steps = [
  {
    title: "Share your interests",
    body: "Answer questions about subjects, hobbies, and how you like to work.",
  },
  {
    title: "See explainable matches",
    body: "Get 3–5 career paths with reasons — an exploration aid, not a verdict.",
  },
  {
    title: "Follow a local pathway",
    body: "View Ghana or Nigeria education information when it has been verified.",
  },
  {
    title: "Ask a mentor",
    body: "Request guidance from professionals when you are ready to talk.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-forest-900 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-forest-100">
              For young people in Ghana and Nigeria
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              Discover careers that fit how you learn and what you enjoy.
            </h1>
            <p className="mt-4 max-w-xl text-forest-50">
              CareerPath turns your interests, school subjects, and preferences
              into clear career options, a simple roadmap, and a way to request
              mentor support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/assessment"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-forest-700 hover:bg-forest-50"
              >
                Start the assessment
              </Link>
              <Link
                href="/careers"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Browse careers
              </Link>
            </div>
          </div>
          <CountrySelector />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-2xl text-ink-900">How it works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl border border-forest-100 bg-white p-5"
            >
              <p className="text-xs font-semibold text-forest-600">
                Step {index + 1}
              </p>
              <h3 className="mt-2 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-700">{step.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
