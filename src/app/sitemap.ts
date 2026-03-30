import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/config/constants";
import { getBaseUrl, withLocale } from "@/lib/config/site";
import { getPublishedPosts, getPublishedProjects } from "@/lib/content/queries";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const baseEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) => [
    {
      url: `${baseUrl}${withLocale(locale, "")}`,
      lastModified: new Date(),
      priority: locale === DEFAULT_LOCALE ? 1 : 0.8,
    },
    ...["about", "resume", "contact", "privacy", "contact-policy", "projects", "writing"].map(
      (segment) => ({
        url: `${baseUrl}${withLocale(locale, `/${segment}`)}`,
        lastModified: new Date(),
        priority: segment === "projects" || segment === "writing" ? 0.9 : 0.7,
      }),
    ),
  ]);

  const postEntries = LOCALES.flatMap((locale) =>
    getPublishedPosts(locale).map((post) => ({
      url: `${baseUrl}${withLocale(locale, `/writing/${post.slug}`)}`,
      lastModified: new Date(post.updatedAt),
      priority: 0.8,
    })),
  );

  const projectEntries = LOCALES.flatMap((locale) =>
    getPublishedProjects(locale).map((project) => ({
      url: `${baseUrl}${withLocale(locale, `/projects/${project.slug}`)}`,
      lastModified: new Date(project.updatedAt),
      priority: project.featured ? 0.85 : 0.75,
    })),
  );

  return [...baseEntries, ...postEntries, ...projectEntries];
}
