import type { NextRequest } from "next/server";
import { jsonOk, requireAdminJson } from "@/lib/server/api";
import { postUpdateSchema } from "@/lib/validation/schemas";

export async function PATCH(
  request: NextRequest,
  { params }: Readonly<{ params: Promise<{ id: string }> }>,
) {
  const { id } = await params;
  const access = await requireAdminJson({
    request,
    minRole: "editor",
    schema: postUpdateSchema,
  });

  if (!access.ok) {
    return access.response;
  }

  return jsonOk({
    action: "project.update",
    id,
    nextVersion: access.data.version + 1,
    payload: access.data,
  });
}
