import { notFound } from "next/navigation";
import { isLocale } from "@/lib/config/constants";

export default async function UnauthorizedPage({
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
        <p className="eyebrow">401 / Unauthorized</p>
        <h1 className="mt-6 font-heading text-4xl font-bold tracking-tight md:text-6xl">
          {locale === "ko" ? "로그인이 필요합니다" : "Authentication is required"}
        </h1>
      </section>
    </div>
  );
}
