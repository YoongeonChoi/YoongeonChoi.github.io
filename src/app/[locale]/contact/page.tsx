import { notFound } from "next/navigation";
import { ContactForm } from "@/components/marketing/contact-form";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { isLocale, type Locale } from "@/lib/config/constants";

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
    path: "/contact",
    title: locale === "ko" ? "연락" : "Contact",
    description:
      locale === "ko"
        ? "협업, 채용, 발표, 질문에 대한 연락 정책과 문의 양식입니다."
        : "Contact channels, collaboration scope, and inquiry policy.",
  });
}

export default async function ContactPage({
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
      <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr]">
        <section className="section-frame p-8">
          <p className="eyebrow">Contact Policy</p>
          <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight">
            {typedLocale === "ko" ? "명확한 범위 안에서 답합니다" : "Clear contact scope, clear response policy"}
          </h1>
          <div className="mt-6 space-y-4 text-text-muted">
            <p>
              {typedLocale === "ko"
                ? "협업 제안, 채용, 발표, 구조적인 질문에는 답합니다."
                : "I respond to collaboration proposals, hiring outreach, speaking invitations, and well-scoped questions."}
            </p>
            <p>
              {typedLocale === "ko"
                ? "무차별 영업, 템플릿 메일, 과도한 개인정보가 포함된 문의는 응답하지 않을 수 있습니다."
                : "Cold sales, generic templates, and messages with excessive personal data may not receive a reply."}
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-text">
              {typedLocale === "ko" ? "SLA: 영업일 기준 3일" : "SLA: within 3 business days"}
            </p>
          </div>
        </section>

        <ContactForm />
      </div>
    </div>
  );
}
