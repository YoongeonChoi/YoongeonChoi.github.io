import type { ContentSection } from "@/lib/content/site-content";

export function ContentSections({ sections }: Readonly<{ sections: ContentSection[] }>) {
  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <section key={section.heading} className="section-frame p-6 md:p-8">
          <h2 className="font-heading text-2xl font-bold tracking-tight">{section.heading}</h2>
          <div className="mt-4 space-y-4 text-text-muted">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
