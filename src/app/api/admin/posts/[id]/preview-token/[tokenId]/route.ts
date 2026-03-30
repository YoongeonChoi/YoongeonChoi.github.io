import type { NextRequest } from "next/server";
import { adminMutationSchema } from "@/lib/validation/schemas";
import { jsonOk, requireAdminJson } from "@/lib/server/api";

export async function DELETE(
  request: NextRequest,
  { params }: Readonly<{ params: Promise<{ id: string; tokenId: string }> }>,
) {
  const { id, tokenId } = await params;
  const access = await requireAdminJson({
    request,
    minRole: "editor",
    schema: adminMutationSchema,
  });

  if (!access.ok) {
    return access.response;
  }

  return jsonOk({
    action: "post.preview.revoke",
    id,
    tokenId,
    nextVersion: access.data.version + 1,
    notice: "Stateless preview signatures are scaffolded; persistent revocation should be backed by a token table.",
  });
}
