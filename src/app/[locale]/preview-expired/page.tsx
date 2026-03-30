import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/config/constants";
import { withLocale } from "@/lib/config/site";

export default async function PreviewExpiredPage({
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
    <div className="content-grid py-16">
      <section className="section-frame hard-shadow p-8 md:p-12">
        <p className="eyebrow">Preview Expired</p>
        <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight md:text-6xl">
          {typedLocale === "ko" ? "프리뷰 토큰이 만료되었습니다" : "The preview token has expired"}
        </h1>
        <p className="mt-6 text-text-muted">
          {typedLocale === "ko"
            ? "새 프리뷰 링크를 발급받아 다시 확인해 주세요."
            : "Issue a new preview link to inspect the unpublished surface again."}
        </p>
        <Link className="action-button mt-8" href={withLocale(typedLocale, "")}>
          {typedLocale === "ko" ? "홈으로 이동" : "Go home"}
        </Link>
      </section>
    </div>
  );
}
