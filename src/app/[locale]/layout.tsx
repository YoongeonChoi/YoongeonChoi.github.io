import type { ReactNode } from "react";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PreviewBanner } from "@/components/marketing/preview-banner";
import { isLocale, LOCALES, type Locale } from "@/lib/config/constants";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const preview = await draftMode();

  return (
    <div className="site-shell">
      {preview.isEnabled ? <PreviewBanner /> : null}
      <SiteHeader locale={locale as Locale} />
      <main className="pb-16" id="main-content">
        {children}
      </main>
      <SiteFooter locale={locale as Locale} />
    </div>
  );
}
