import { notFound } from "next/navigation";
import { PostCard } from "@/components/marketing/post-card";
import { isLocale, type Locale } from "@/lib/config/constants";
import { getPublishedPosts } from "@/lib/content/queries";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  return buildPageMetadata({
    locale,
    path: "/writing",
    title: locale === "ko" ? "글" : "Writing",
    description:
      locale === "ko"
        ? "운영, 보안, 접근성, 캐시, SEO를 글로 정리한 저널입니다."
        : "Writing on operations, security, accessibility, cache invalidation, and SEO.",
  });
}

export default async function WritingPage({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const posts = getPublishedPosts(typedLocale);

  return (
    <div className="content-grid py-10 md:py-16">
      <div className="mb-8">
        <p className="eyebrow">Writing</p>
        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-6xl">
          {typedLocale === "ko" ? "구현 규칙을 글로 남깁니다" : "Writing that turns rules into public artifacts"}
        </h1>
      </div>
      <div className="card-grid">
        {posts.map((post) => (
          <PostCard key={post.id} locale={typedLocale} post={post} />
        ))}
      </div>
    </div>
  );
}
