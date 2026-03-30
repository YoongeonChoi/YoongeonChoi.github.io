import type { NextRequest } from "next/server";
import { jsonOk, requireAdminJson } from "@/lib/server/api";
import { mediaAttachSchema } from "@/lib/validation/schemas";

export async function POST(request: NextRequest) {
  const access = await requireAdminJson({
    request,
    minRole: "editor",
    schema: mediaAttachSchema,
  });

  if (!access.ok) {
    return access.response;
  }

  return jsonOk({
    action: "media.attach",
    payload: access.data,
    notice: "Before production attach, revalidate bucket/path/mime/bytes/dimensions against storage metadata.",
  });
}
