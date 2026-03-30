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
    path: "/contact-policy",
    title: locale === "ko" ? "문의 정책" : "Contact Policy",
    description:
      locale === "ko"
        ? "응답 범위, 스팸 처리, 보존 기간, 연락 채널 정책을 설명합니다."
        : "Response scope, spam handling, retention, and contact channel policy.",
  });
}

export default async function ContactPolicyPage({
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
        <p className="eyebrow">Contact Policy</p>
        <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight md:text-6xl">
          {isKo ? "문의 채널 운영 규칙" : "How the contact channel is operated"}
        </h1>
        <div className="prose-width mt-8 space-y-5 text-text-muted">
          <p>
            {isKo
              ? "응답 대상은 협업 제안, 채용, 발표, 구조적 질문입니다."
              : "Supported topics include collaboration proposals, hiring outreach, speaking invitations, and well-scoped questions."}
          </p>
          <p>
            {isKo
              ? "무차별 영업, 반복 스팸, 과도한 개인정보가 포함된 메시지는 답변 없이 종료될 수 있습니다."
              : "Cold sales, repeated spam, and messages with excessive personal data may be closed without reply."}
          </p>
          <p>
            {isKo
              ? "문의 채널은 anti-spam 검증과 rate limit을 통과해야 하며, 정책 위반 시 차단될 수 있습니다."
              : "The contact channel is protected by anti-spam verification and rate limiting, and abusive traffic may be blocked."}
          </p>
        </div>
      </section>
    </div>
  );
}
