import { notFound } from "next/navigation";
import { isLocale } from "@/lib/config/constants";

export default async function ForbiddenPage({
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
        <p className="eyebrow">403 / Forbidden</p>
        <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight md:text-6xl">
          {locale === "ko" ? "권한이 부족합니다" : "You do not have enough permission"}
        </h1>
      </section>
    </div>
  );
}
