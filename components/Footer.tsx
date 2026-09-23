import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-forest-100 bg-forest-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-ink-700 sm:flex-row sm:items-center sm:justify-between">
        <p>
          CareerPath helps young people in Ghana and Nigeria explore careers
          with explainable guidance — not a one-path aptitude test.
        </p>
        <div className="flex gap-4">
          <Link href="/careers" className="hover:text-forest-700">
            Careers
          </Link>
          <Link href="/mentors" className="hover:text-forest-700">
            Mentors
          </Link>
          <Link href="/dashboard" className="hover:text-forest-700">
            Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}
