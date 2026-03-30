import Link from "next/link";
import type { Locale } from "@/lib/config/constants";
import { withLocale } from "@/lib/config/site";

type PostCardProps = {
  locale: Locale;
  post: {
    slug: string;
    title: string;
    summary: string;
    readingMinutes: number;
    publishedAt: string;
  };
};

export function PostCard({ locale, post }: Readonly<PostCardProps>) {
  return (
    <article className="section-frame flex h-full flex-col p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-muted">
        {new Date(post.publishedAt).toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US")} /{" "}
        {post.readingMinutes} min
      </p>
      <h3 className="mt-4 font-heading text-2xl font-bold tracking-tight">{post.title}</h3>
      <p className="mt-4 flex-1 text-text-muted">{post.summary}</p>
      <Link className="action-button secondary mt-6 w-fit" href={withLocale(locale, `/writing/${post.slug}`)}>
        Read article
      </Link>
    </article>
  );
}
