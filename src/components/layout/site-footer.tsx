import Link from "next/link";
import type { Locale } from "@/lib/config/constants";
import { withLocale } from "@/lib/config/site";

export function SiteFooter({ locale }: Readonly<{ locale: Locale }>) {
  return (
    <footer className="border-t-2 border-border py-10">
      <div className="content-grid flex flex-col gap-5 text-sm text-text-muted md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono uppercase tracking-[0.16em] text-text">Operating, not decorating.</p>
          <p className="mt-2 prose-width">
            Security boundaries, bilingual publishing, accessible interfaces, and clear recovery rules
            come before decorative polish.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={withLocale(locale, "/privacy")}>Privacy</Link>
          <Link href={withLocale(locale, "/contact-policy")}>Contact Policy</Link>
          <Link href="https://github.com/YoongeonChoi" rel="noreferrer" target="_blank">
            GitHub
          </Link>
          <Link href="/admin">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
