import { notFound } from "next/navigation";
import { isLocale } from "@/lib/config/constants";

export default async function TranslationUnavailablePage({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div className="content-grid py-16">
      <section className="section-frame hard-shadow p-8 md:p-12">
        <p className="eyebrow">Translation unavailable</p>
        <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight md:text-6xl">
          {locale === "ko" ? "이 번역본은 아직 공개되지 않았습니다" : "This translation is not yet published"}
        </h1>
      </section>
    </div>
  );
}
