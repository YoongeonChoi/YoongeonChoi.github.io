import { z } from "zod";
import type { NextRequest } from "next/server";
import { revalidatePostSurface } from "@/lib/cache/invalidation";
import { jsonOk, requireAdminJson } from "@/lib/server/api";
import { localeSchema } from "@/lib/validation/schemas";

const publishSchema = z.object({
  version: z.int().positive(),
  locale: localeSchema,
  slug: z.string().trim().min(1).max(120),
});

export async function POST(
  request: NextRequest,
  { params }: Readonly<{ params: Promise<{ id: string }> }>,
) {
  const { id } = await params;
  const access = await requireAdminJson({
    request,
    minRole: "owner",
    schema: publishSchema,
  });

  if (!access.ok) {
    return access.response;
  }

  revalidatePostSurface(access.data.locale, access.data.slug);

  return jsonOk({
    action: "post.publish",
    id,
    nextVersion: access.data.version + 1,
    cache: "revalidated",
  });
}
