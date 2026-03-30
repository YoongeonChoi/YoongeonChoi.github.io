import { notFound } from "next/navigation";
import { ContentSections } from "@/components/marketing/content-sections";
import { isLocale, LOCALES, type Locale } from "@/lib/config/constants";
import { getProjectBySlug, getPublishedProjects } from "@/lib/content/queries";
import { buildBreadcrumbStructuredData, buildPageMetadata } from "@/lib/seo/metadata";

export async function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getPublishedProjects(locale).map((project) => ({
      locale,
      slug: project.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string; slug: string }>;
}>) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  const project = getProjectBySlug(locale, slug);
  if (!project) {
    return {};
  }

  return buildPageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: project.seoTitle,
    description: project.seoDescription,
  });
}

export default async function ProjectDetailPage({
  params,
}: Readonly<{
  params: Promise<{ locale: string; slug: string }>;
}>) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const project = getProjectBySlug(typedLocale, slug);
  if (!project) {
    notFound();
  }

  const breadcrumb = buildBreadcrumbStructuredData(typedLocale, [
    { name: typedLocale === "ko" ? "홈" : "Home", path: "" },
    { name: typedLocale === "ko" ? "프로젝트" : "Projects", path: "/projects" },
    { name: project.title, path: `/projects/${project.slug}` },
  ]);

  return (
    <div className="content-grid py-10 md:py-16">
      <section className="section-frame hard-shadow p-8 md:p-12">
        <p className="eyebrow">{project.featured ? "Featured Case Study" : "Archive Case Study"}</p>
        <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight md:text-6xl">{project.title}</h1>
        <p className="prose-width mt-6 text-lg text-text-muted">{project.summary}</p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-text-muted">
          {project.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </section>
      <div className="mt-8">
        <ContentSections sections={project.sections} />
      </div>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        type="application/ld+json"
      />
    </div>
  );
}
