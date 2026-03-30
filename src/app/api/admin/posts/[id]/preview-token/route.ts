import { z } from "zod";
import type { NextRequest } from "next/server";
import { clampPreviewTtlHours, signPreviewPayload } from "@/lib/security/preview";
import { absoluteUrl } from "@/lib/config/site";
import { jsonOk, requireAdminJson } from "@/lib/server/api";
import { localeSchema } from "@/lib/validation/schemas";

const previewSchema = z.object({
  version: z.int().positive(),
  locale: localeSchema,
  slug: z.string().trim().min(1).max(120),
  ttlHours: z.int().positive().max(72).optional(),
});

export async function POST(
  request: NextRequest,
  { params }: Readonly<{ params: Promise<{ id: string }> }>,
) {
  const { id } = await params;
  const access = await requireAdminJson({
    request,
    minRole: "editor",
    schema: previewSchema,
  });

  if (!access.ok) {
    return access.response;
  }

  const ttlHours = clampPreviewTtlHours(access.data.ttlHours);
  const exp = Math.floor(Date.now() / 1000) + ttlHours * 60 * 60;
  const sig = signPreviewPayload("posts", access.data.locale, access.data.slug, exp);
  const previewUrl = absoluteUrl(
    `/api/preview?locale=${access.data.locale}&kind=posts&slug=${encodeURIComponent(access.data.slug)}&exp=${exp}&sig=${sig}`,
  );

  return jsonOk({
    action: "post.preview.issue",
    id,
    previewUrl,
    expiresAt: new Date(exp * 1000).toISOString(),
  });
}
