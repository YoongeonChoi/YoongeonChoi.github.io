import Link from "next/link";

export default function AdminHomePage() {
  return (
    <section className="section-frame hard-shadow p-8 md:p-12">
      <p className="eyebrow">Admin</p>
      <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight md:text-6xl">
        Operations console
      </h1>
      <p className="prose-width mt-6 text-text-muted">
        This protected surface is where preview issuance, publishing, content revisions, inbox triage,
        and media operations will be controlled under Supabase SSR auth and RLS.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="action-button" href="/admin/posts">
          Posts
        </Link>
        <Link className="action-button secondary" href="/admin/projects">
          Projects
        </Link>
        <Link className="action-button secondary" href="/admin/contact">
          Inbox
        </Link>
      </div>
    </section>
  );
}
