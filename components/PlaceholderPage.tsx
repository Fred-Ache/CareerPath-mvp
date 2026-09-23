import Link from "next/link";

type Props = {
  title: string;
  description: string;
  nextHref?: string;
  nextLabel?: string;
};

export function PlaceholderPage({
  title,
  description,
  nextHref,
  nextLabel,
}: Props) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs font-semibold uppercase tracking-wide text-forest-600">
        Coming in a later stage
      </p>
      <h1 className="mt-2 font-display text-3xl text-ink-900">{title}</h1>
      <p className="mt-3 text-ink-700">{description}</p>
      <div className="mt-8 rounded-2xl border border-dashed border-forest-200 bg-forest-50 p-6 text-sm text-ink-700">
        This page is a working route with placeholder content. Database,
        assessment scoring, and verified career data have not been connected
        yet.
      </div>
      {nextHref && nextLabel ? (
        <Link
          href={nextHref}
          className="mt-8 inline-flex rounded-full bg-forest-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-700"
        >
          {nextLabel}
        </Link>
      ) : null}
    </div>
  );
}
