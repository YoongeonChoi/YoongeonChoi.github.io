import type { NextRequest } from "next/server";
import { adminMutationSchema } from "@/lib/validation/schemas";
import { jsonOk, requireAdminJson } from "@/lib/server/api";

export async function DELETE(
  request: NextRequest,
  { params }: Readonly<{ params: Promise<{ id: string }> }>,
) {
  const { id } = await params;
  const access = await requireAdminJson({
    request,
    minRole: "owner",
    schema: adminMutationSchema,
  });

  if (!access.ok) {
    return access.response;
  }

  return jsonOk({
    action: "media.delete.request",
    id,
    nextVersion: access.data.version + 1,
    notice: "Hard delete must be blocked until authoritative join-table recount succeeds.",
  });
}
