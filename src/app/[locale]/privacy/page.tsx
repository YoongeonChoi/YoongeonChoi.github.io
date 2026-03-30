import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { isLocale } from "@/lib/config/constants";

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
    path: "/privacy",
    title: locale === "ko" ? "개인정보 처리 안내" : "Privacy",
    description:
      locale === "ko"
        ? "문의, 분석, 로그, 인증에 대한 최소 수집 및 보존 정책."
        : "Privacy notice covering contact, analytics, logging, and authentication.",
  });
}

export default async function PrivacyPage({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const isKo = locale === "ko";

  return (
    <div className="content-grid py-10 md:py-16">
      <section className="section-frame hard-shadow p-8 md:p-12">
        <p className="eyebrow">Privacy</p>
        <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight md:text-6xl">
          {isKo ? "개인정보 최소 수집 원칙" : "Minimum data collection policy"}
        </h1>
        <div className="prose-width mt-8 space-y-5 text-text-muted">
          <p>
            {isKo
              ? "이 사이트는 문의 처리, 인증, 보안 로그, 성능 측정을 위해 필요한 최소 정보만 수집합니다."
              : "This site collects the minimum information required for contact handling, authentication, security logging, and performance measurement."}
          </p>
          <p>
            {isKo
              ? "문의 데이터는 목적이 끝나면 삭제되며, abuse 증거가 필요한 경우에만 제한적으로 더 보존됩니다."
              : "Contact data is deleted after its purpose ends, with limited retention only when abuse evidence must be preserved."}
          </p>
          <p>
            {isKo
              ? "원시 IP와 User-Agent는 영구 저장하지 않고, 영속 영역에는 salted hash만 남깁니다."
              : "Raw IP and user-agent values are not stored long term; only salted hashes remain in persistent storage."}
          </p>
        </div>
      </section>
    </div>
  );
}
