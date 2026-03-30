import Link from "next/link";
import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { isLocale, type Locale } from "@/lib/config/constants";
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
    path: "/resume",
    title: locale === "ko" ? "이력 요약" : "Resume",
    description:
      locale === "ko"
        ? "프로젝트, 운영 원칙, 협업 방식이 압축된 1페이지 이력 요약입니다."
        : "A one-page resume surface covering projects, operating principles, and collaboration style.",
  });
}

export default async function ResumePage({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;

  return (
    <div className="content-grid py-10 md:py-16">
      <section className="section-frame hard-shadow p-8 md:p-12">
        <p className="eyebrow">Resume</p>
        <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
          <div className="prose-width">
            <h1 className="font-heading text-4xl font-bold tracking-tight md:text-6xl">
              {typedLocale === "ko" ? "1페이지 이력 요약" : "One-page resume summary"}
            </h1>
            <p className="mt-6 text-lg text-text-muted">
              {typedLocale === "ko"
                ? "시스템 설계, 운영 규칙, 보안 경계, 다국어 출판 경험을 중심으로 프로젝트를 정리합니다."
                : "A concise summary of system design, operational rules, security boundaries, and bilingual publishing work."}
            </p>
          </div>
          <div className="text-sm text-text-muted">
            <p>{typedLocale === "ko" ? "마지막 업데이트" : "Last updated"}</p>
            <p className="mt-1 font-mono text-text">2026-03-31</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="section-frame p-5">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">Focus</p>
            <p className="mt-3 font-heading text-2xl font-bold">
              {typedLocale === "ko" ? "Operations-first frontend systems" : "Operations-first frontend systems"}
            </p>
          </div>
          <div className="section-frame p-5">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">Strength</p>
            <p className="mt-3 font-heading text-2xl font-bold">
              {typedLocale === "ko" ? "보안·SEO·접근성 동시 설계" : "Security, SEO, and accessibility in one system"}
            </p>
          </div>
          <div className="section-frame p-5">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">Mode</p>
            <p className="mt-3 font-heading text-2xl font-bold">
              {typedLocale === "ko" ? "문서 기반 구현" : "Docs-first execution"}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link className="action-button" href={withLocale(typedLocale, "/projects")}>
            {typedLocale === "ko" ? "프로젝트 보기" : "View projects"}
          </Link>
          <Link className="action-button secondary" href={withLocale(typedLocale, "/contact")}>
            {typedLocale === "ko" ? "연락하기" : "Contact"}
          </Link>
        </div>
      </section>
    </div>
  );
}
