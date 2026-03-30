import { type Locale } from "@/lib/config/constants";
import { postContent, profileContent, projectContent } from "@/lib/content/site-content";

export function getProfileCopy(locale: Locale) {
  return {
    hero: profileContent.hero[locale],
    about: profileContent.about[locale],
  };
}

export function getPublishedProjects(locale: Locale) {
  return projectContent
    .filter((project) => project.status === "published" || project.status === "retired")
    .map((project) => ({
      id: project.id,
      featured: project.featured,
      publishedAt: project.publishedAt,
      updatedAt: project.updatedAt,
      tags: project.tags,
      ...project.translations[locale],
    }));
}

export function getProjectBySlug(locale: Locale, slug: string) {
  const project = projectContent.find((entry) => entry.translations[locale].slug === slug);
  if (!project || (project.status !== "published" && project.status !== "retired")) {
    return null;
  }

  return {
    id: project.id,
    status: project.status,
    featured: project.featured,
    publishedAt: project.publishedAt,
    updatedAt: project.updatedAt,
    tags: project.tags,
    ...project.translations[locale],
  };
}

export function getPublishedPosts(locale: Locale) {
  return postContent
    .filter((post) => post.status === "published" || post.status === "retired")
    .map((post) => ({
      id: post.id,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      readingMinutes: post.readingMinutes,
      ...post.translations[locale],
    }));
}

export function getPostBySlug(locale: Locale, slug: string) {
  const post = postContent.find((entry) => entry.translations[locale].slug === slug);
  if (!post || (post.status !== "published" && post.status !== "retired")) {
    return null;
  }

  return {
    id: post.id,
    status: post.status,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    readingMinutes: post.readingMinutes,
    ...post.translations[locale],
  };
}
