import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/marketing/post-card";
import { ProjectCard } from "@/components/marketing/project-card";
import { isLocale, type Locale } from "@/lib/config/constants";
import { getProfileCopy, getPublishedPosts, getPublishedProjects } from "@/lib/content/queries";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { withLocale } from "@/lib/config/site";

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
    path: "",
    title: locale === "ko" ? "개인 PR 시스템" : "Personal PR System",
    description:
      locale === "ko"
        ? "운영과 구현 품질이 동시에 드러나는 개인 PR 사이트의 홈 화면입니다."
        : "The home surface of an operations-first personal PR system.",
  });
}

export default async function LocaleHome({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const profile = getProfileCopy(typedLocale);
  const featuredProjects = getPublishedProjects(typedLocale).filter((project) => project.featured).slice(0, 3);
  const latestPosts = getPublishedPosts(typedLocale).slice(0, 3);

  return (
    <div className="space-y-10 py-10 md:space-y-16 md:py-16">
      <section className="content-grid">
        <div className="section-frame hard-shadow p-8 md:p-12">
          <p className="eyebrow">{profile.hero.eyebrow}</p>
          <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_0.8fr]">
            <div>
              <h1 className="font-heading text-4xl font-bold tracking-tight md:text-7xl">
                {profile.hero.title}
              </h1>
            </div>
            <div className="space-y-6 text-base text-text-muted md:text-lg">
              <p>{profile.hero.summary}</p>
              <div className="flex flex-wrap gap-3">
                <Link className="action-button" href={withLocale(typedLocale, "/projects")}>
                  {profile.hero.ctaPrimary}
                </Link>
                <Link className="action-button secondary" href={withLocale(typedLocale, "/writing")}>
                  {profile.hero.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Featured Work</p>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight md:text-5xl">
              {typedLocale === "ko" ? "구조로 증명한 대표 작업" : "Featured systems work"}
            </h2>
          </div>
          <Link className="action-button secondary" href={withLocale(typedLocale, "/projects")}>
            {typedLocale === "ko" ? "전체 보기" : "View all"}
          </Link>
        </div>
        <div className="card-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} locale={typedLocale} project={project} />
          ))}
        </div>
      </section>

      <section className="content-grid">
        <div className="section-frame p-8 md:p-10">
          <p className="eyebrow">Trust Layer</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              typedLocale === "ko"
                ? "Preview, cache invalidation, 권한 경계를 문서와 코드에 동시에 고정합니다."
                : "Preview, cache invalidation, and authorization boundaries are fixed in both docs and code.",
              typedLocale === "ko"
                ? "mobile p75 Core Web Vitals와 WCAG 2.2 핵심 항목을 출시 게이트로 둡니다."
                : "Mobile p75 Core Web Vitals and WCAG 2.2 essentials are treated as release gates.",
              typedLocale === "ko"
                ? "문의, 개인정보, 미디어, 복구 규칙을 운영 가능한 수준으로 먼저 설계합니다."
                : "Contact intake, privacy, media, and recovery rules are designed as operational systems first.",
            ].map((item) => (
              <p key={item} className="text-text-muted">
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Writing</p>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight md:text-5xl">
              {typedLocale === "ko" ? "설계 원칙을 글로 남깁니다" : "Writing that makes the system legible"}
            </h2>
          </div>
          <Link className="action-button secondary" href={withLocale(typedLocale, "/writing")}>
            {typedLocale === "ko" ? "글 보러가기" : "Open writing"}
          </Link>
        </div>
        <div className="card-grid">
          {latestPosts.map((post) => (
            <PostCard key={post.id} locale={typedLocale} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
