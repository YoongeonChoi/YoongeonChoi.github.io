import type { NextRequest } from "next/server";
import { adminMutationSchema } from "@/lib/validation/schemas";
import { jsonOk, requireAdminJson } from "@/lib/server/api";

export async function POST(
  request: NextRequest,
  { params }: Readonly<{ params: Promise<{ id: string }> }>,
) {
  const { id } = await params;
  const access = await requireAdminJson({
    request,
    minRole: "editor",
    schema: adminMutationSchema,
  });

  if (!access.ok) {
    return access.response;
  }

  return jsonOk({
    action: "contact.close",
    id,
    nextVersion: access.data.version + 1,
  });
}
