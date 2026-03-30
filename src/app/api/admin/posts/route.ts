import type { NextRequest } from "next/server";
import { jsonOk, requireAdminJson } from "@/lib/server/api";
import { postCreateSchema } from "@/lib/validation/schemas";

export async function POST(request: NextRequest) {
  const access = await requireAdminJson({
    request,
    minRole: "editor",
    schema: postCreateSchema,
  });

  if (!access.ok) {
    return access.response;
  }

  return jsonOk({
    action: "post.create",
    status: "draft",
    locale: access.data.locale,
    title: access.data.title,
    message: "Draft creation contract is wired. Persist this through the Supabase post tables after migrations are applied.",
  });
}
