"use client";

export default function GlobalError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    <html lang="ko">
      <body className="bg-bg text-text">
        <main className="site-shell flex items-center py-24">
          <div className="content-grid">
            <section className="section-frame hard-shadow p-8 md:p-12">
              <p className="eyebrow">500 / Global Error</p>
              <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight md:text-6xl">
                The publishing system hit an unexpected boundary.
              </h1>
              <p className="prose-width mt-6 text-lg text-text-muted">
                {error.message || "An unknown error interrupted the current request."}
              </p>
              <button className="action-button mt-8" onClick={() => reset()} type="button">
                Retry render
              </button>
            </section>
          </div>
        </main>
      </body>
    </html>
  );
}
