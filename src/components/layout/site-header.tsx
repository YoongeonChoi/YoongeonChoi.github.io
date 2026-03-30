import Link from "next/link";
import type { Locale } from "@/lib/config/constants";
import { getLocaleLabel, SITE_NAME, withLocale } from "@/lib/config/site";

const nav = [
  { href: "", label: { ko: "홈", en: "Home" } },
  { href: "/projects", label: { ko: "프로젝트", en: "Projects" } },
  { href: "/writing", label: { ko: "글", en: "Writing" } },
  { href: "/about", label: { ko: "소개", en: "About" } },
  { href: "/resume", label: { ko: "이력", en: "Resume" } },
  { href: "/contact", label: { ko: "연락", en: "Contact" } },
];

export function SiteHeader({ locale }: Readonly<{ locale: Locale }>) {
  const oppositeLocale: Locale = locale === "ko" ? "en" : "ko";

  return (
    <header className="sticky top-0 z-40 border-b-2 border-border bg-bg/95 backdrop-blur-md">
      <div className="content-grid flex flex-wrap items-center justify-between gap-4 py-4">
        <Link className="font-heading text-lg font-bold tracking-tight" href={withLocale(locale, "")}>
          {SITE_NAME}
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-2 md:gap-4">
          {nav.map((item) => (
            <Link
              key={item.href || "home"}
              className="px-2 py-1 text-sm font-medium text-text-muted transition-colors hover:text-text"
              href={withLocale(locale, item.href)}
            >
              {item.label[locale]}
            </Link>
          ))}
          <Link
            className="action-button secondary !min-h-10 !px-4 !text-sm"
            href={withLocale(oppositeLocale, "")}
          >
            {getLocaleLabel(oppositeLocale)}
          </Link>
        </nav>
      </div>
    </header>
  );
}
