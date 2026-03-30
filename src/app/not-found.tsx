import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-shell flex items-center py-24">
      <div className="content-grid">
        <section className="section-frame hard-shadow p-8 md:p-12">
          <p className="eyebrow">404 / Not Found</p>
          <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight md:text-6xl">
            The route exists in the plan, not on the site.
          </h1>
          <p className="prose-width mt-6 text-lg text-text-muted">
            Requested content was not found, has been retired, or never became part of the
            published surface.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="action-button" href="/ko">
              Go to /ko
            </Link>
            <Link className="action-button secondary" href="/en">
              Go to /en
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
