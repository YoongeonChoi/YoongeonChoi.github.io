export default function AdminPostsPage() {
  return (
    <section className="section-frame p-8">
      <p className="eyebrow">Admin / Posts</p>
      <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight">Post operations</h1>
      <p className="prose-width mt-6 text-text-muted">
        This surface will manage draft creation, optimistic-locking updates, preview issuance, publish,
        retire, archive, and restore flows. The API endpoints are already scaffolded under
        `/api/admin/posts/*`.
      </p>
    </section>
  );
}
