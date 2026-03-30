import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/marketing/project-card";
import { isLocale, type Locale } from "@/lib/config/constants";
import { getPublishedProjects } from "@/lib/content/queries";
import { buildPageMetadata } from "@/lib/seo/metadata";

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
    path: "/projects",
    title: locale === "ko" ? "프로젝트" : "Projects",
    description:
      locale === "ko"
        ? "대표 작업과 시스템 설계 중심 프로젝트를 모아둔 아카이브입니다."
        : "An archive of featured work and systems-oriented case studies.",
  });
}

export default async function ProjectsPage({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const projects = getPublishedProjects(typedLocale);

  return (
    <div className="content-grid py-10 md:py-16">
      <div className="mb-8">
        <p className="eyebrow">Projects</p>
        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-6xl">
          {typedLocale === "ko" ? "대표 작업과 구현 사례" : "Featured work and implementation notes"}
        </h1>
      </div>
      <div className="card-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} locale={typedLocale} project={project} />
        ))}
      </div>
    </div>
  );
}
