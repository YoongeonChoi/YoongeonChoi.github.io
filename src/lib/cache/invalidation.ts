import { revalidatePath, revalidateTag } from "next/cache";
import type { Locale } from "@/lib/config/constants";

export function revalidatePostSurface(locale: Locale, slug: string) {
  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/writing`);
  revalidatePath(`/${locale}/writing/${slug}`);
  revalidatePath("/sitemap.xml");
  revalidateTag(`locale:${locale}`, "max");
  revalidateTag("collection:posts", "max");
  revalidateTag(`post:${locale}:${slug}`, "max");
}

export function revalidateProjectSurface(locale: Locale, slug: string) {
  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/projects`);
  revalidatePath(`/${locale}/projects/${slug}`);
  revalidatePath("/sitemap.xml");
  revalidateTag(`locale:${locale}`, "max");
  revalidateTag("collection:projects", "max");
  revalidateTag(`project:${locale}:${slug}`, "max");
}

export function revalidateLocaleSurface(locale: Locale) {
  revalidatePath(`/${locale}`);
  revalidatePath("/sitemap.xml");
  revalidateTag(`locale:${locale}`, "max");
}
