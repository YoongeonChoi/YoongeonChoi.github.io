import { notFound } from "next/navigation";
import { getProfileCopy } from "@/lib/content/queries";
import { buildPageMetadata, buildProfileStructuredData } from "@/lib/seo/metadata";
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
    path: "/about",
    title: locale === "ko" ? "소개" : "About",
    description:
      locale === "ko"
        ? "컴퓨터공학과 디자인 감각을 함께 묶어 운영형 웹 시스템을 만드는 방식에 대한 소개입니다."
        : "How I combine computer engineering, design, and operational web systems.",
  });
}

export default async function AboutPage({
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
  const structuredData = buildProfileStructuredData(typedLocale);

  return (
    <div className="content-grid py-10 md:py-16">
      <section className="section-frame hard-shadow p-8 md:p-12">
        <p className="eyebrow">About</p>
        <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight md:text-6xl">
          {profile.about.title}
        </h1>
        <div className="prose-width mt-8 space-y-5 text-lg text-text-muted">
          {profile.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
    </div>
  );
}
