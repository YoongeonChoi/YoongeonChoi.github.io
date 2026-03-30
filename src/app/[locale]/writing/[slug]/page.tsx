import { notFound } from "next/navigation";
import { ContentSections } from "@/components/marketing/content-sections";
import { isLocale, LOCALES, type Locale } from "@/lib/config/constants";
import { getPostBySlug, getPublishedPosts } from "@/lib/content/queries";
import { buildArticleStructuredData, buildBreadcrumbStructuredData, buildPageMetadata } from "@/lib/seo/metadata";

export async function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getPublishedPosts(locale).map((post) => ({
      locale,
      slug: post.slug,
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

  const post = getPostBySlug(locale, slug);
  if (!post) {
    return {};
  }

  return buildPageMetadata({
    locale,
    path: `/writing/${slug}`,
    title: post.seoTitle,
    description: post.seoDescription,
  });
}

export default async function WritingDetailPage({
  params,
}: Readonly<{
  params: Promise<{ locale: string; slug: string }>;
}>) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const post = getPostBySlug(typedLocale, slug);
  if (!post) {
    notFound();
  }

  const articleStructuredData = buildArticleStructuredData({
    locale: typedLocale,
    slug: post.slug,
    title: post.title,
    description: post.summary,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
  });

  const breadcrumb = buildBreadcrumbStructuredData(typedLocale, [
    { name: typedLocale === "ko" ? "홈" : "Home", path: "" },
    { name: typedLocale === "ko" ? "글" : "Writing", path: "/writing" },
    { name: post.title, path: `/writing/${post.slug}` },
  ]);

  return (
    <div className="content-grid py-10 md:py-16">
      <section className="section-frame hard-shadow p-8 md:p-12">
        <p className="eyebrow">
          {new Date(post.publishedAt).toLocaleDateString(typedLocale === "ko" ? "ko-KR" : "en-US")} /{" "}
          {post.readingMinutes} min
        </p>
        <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight md:text-6xl">{post.title}</h1>
        <p className="prose-width mt-6 text-lg text-text-muted">{post.summary}</p>
      </section>
      <div className="mt-8">
        <ContentSections sections={post.sections} />
      </div>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        type="application/ld+json"
      />
    </div>
  );
}
