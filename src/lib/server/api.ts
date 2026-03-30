import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { ZodType } from "zod";
import type { AdminRole } from "@/lib/security/admin-access";
import { requireAdminApiAccess } from "@/lib/security/admin-access";

export async function parseJson<T>(request: NextRequest, schema: ZodType<T>) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return {
      ok: false as const,
      response: NextResponse.json(
        {
          ok: false,
          error: parsed.error.issues[0]?.message || "Invalid request payload.",
        },
        { status: 400 },
      ),
    };
  }

  return { ok: true as const, data: parsed.data };
}

export async function requireAdminJson<T>({
  request,
  minRole,
  schema,
}: {
  request: NextRequest;
  minRole: AdminRole;
  schema: ZodType<T>;
}) {
  const access = await requireAdminApiAccess(request, minRole);
  if (!access.ok) {
    return access;
  }

  const parsed = await parseJson(request, schema);
  if (!parsed.ok) {
    return parsed;
  }

  return {
    ok: true as const,
    session: access.session,
    data: parsed.data,
  };
}

export function jsonOk(payload: Record<string, unknown>, init?: ResponseInit) {
  return NextResponse.json({ ok: true, ...payload }, init);
}

export function jsonError(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}
