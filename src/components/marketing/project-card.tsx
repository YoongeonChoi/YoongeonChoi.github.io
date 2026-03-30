import Link from "next/link";
import type { Locale } from "@/lib/config/constants";
import { withLocale } from "@/lib/config/site";

type ProjectCardProps = {
  locale: Locale;
  project: {
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    featured: boolean;
  };
};

export function ProjectCard({ locale, project }: Readonly<ProjectCardProps>) {
  return (
    <article className="section-frame hard-shadow flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <p className="eyebrow">{project.featured ? "Featured" : "Archive"}</p>
        <div className="flex flex-wrap justify-end gap-2 text-xs text-text-muted">
          {project.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </div>
      <h3 className="mt-6 font-heading text-2xl font-bold tracking-tight">{project.title}</h3>
      <p className="mt-4 flex-1 text-text-muted">{project.summary}</p>
      <Link className="action-button mt-6 w-fit" href={withLocale(locale, `/projects/${project.slug}`)}>
        Open case study
      </Link>
    </article>
  );
}
