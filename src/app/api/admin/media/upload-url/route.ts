import path from "node:path";
import type { NextRequest } from "next/server";
import { SIGNED_UPLOAD_URL_TTL_HOURS } from "@/lib/config/constants";
import { jsonError, jsonOk, requireAdminJson } from "@/lib/server/api";
import { getServerSupabaseClient } from "@/lib/supabase/server-client";
import { mediaUploadRequestSchema } from "@/lib/validation/schemas";

function sanitizeFilename(filename: string) {
  return path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, "-");
}

export async function POST(request: NextRequest) {
  const access = await requireAdminJson({
    request,
    minRole: "editor",
    schema: mediaUploadRequestSchema,
  });

  if (!access.ok) {
    return access.response;
  }

  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "media";
  const filepath = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${sanitizeFilename(access.data.filename)}`;

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return jsonOk({
      action: "media.upload-url.issue",
      bucket,
      path: filepath,
      expiresInHours: SIGNED_UPLOAD_URL_TTL_HOURS,
      upload: "local-scaffold",
    });
  }

  try {
    const supabase = await getServerSupabaseClient();
    const { data, error } = await supabase.storage.from(bucket).createSignedUploadUrl(filepath);

    if (error) {
      throw error;
    }

    return jsonOk({
      action: "media.upload-url.issue",
      bucket,
      path: filepath,
      token: data.token,
      signedUrl: data.signedUrl,
      expiresInHours: SIGNED_UPLOAD_URL_TTL_HOURS,
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Signed upload URL issuance failed.", 503);
  }
}
