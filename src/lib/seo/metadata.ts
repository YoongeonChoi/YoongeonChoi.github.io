import type { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/config/constants";
import {
  absoluteUrl,
  getBaseUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  withLocale,
} from "@/lib/config/site";

type PageMetadataInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
};

export function buildRootMetadata(): Metadata {
  const baseUrl = getBaseUrl();

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `${SITE_NAME} | ${SITE_TAGLINE}`,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    alternates: {
      canonical: "/ko",
      languages: {
        ko: "/ko",
        en: "/en",
        "x-default": "/ko",
      },
    },
    openGraph: {
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: `${baseUrl}/ko`,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
}: PageMetadataInput): Metadata {
  const canonical = withLocale(locale, path);
  const alternates = Object.fromEntries(
    LOCALES.map((entry) => [entry, withLocale(entry, path)]),
  ) as Record<Locale, string>;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ...alternates,
        ...(locale === DEFAULT_LOCALE ? { "x-default": "/ko" } : {}),
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(canonical),
      siteName: SITE_NAME,
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function buildProfileStructuredData(locale: Locale) {
  const path = withLocale(locale, "/about");
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl(path),
    mainEntity: {
      "@type": "Person",
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: absoluteUrl(withLocale(locale, "")),
    },
  };
}

export function buildArticleStructuredData(input: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.publishedAt,
    dateModified: input.updatedAt ?? input.publishedAt,
    author: {
      "@type": "Person",
      name: SITE_NAME,
    },
    image: absoluteUrl("/opengraph-image"),
    mainEntityOfPage: absoluteUrl(withLocale(input.locale, `/writing/${input.slug}`)),
  };
}

export function buildBreadcrumbStructuredData(
  locale: Locale,
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(withLocale(locale, item.path)),
    })),
  };
}
