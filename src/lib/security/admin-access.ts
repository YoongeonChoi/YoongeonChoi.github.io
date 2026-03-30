import "server-only";

import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";
import { assertAdminOrigin } from "@/lib/security/request-security";
import { getServerSupabaseClient } from "@/lib/supabase/server-client";

export type AdminRole = "owner" | "editor" | "viewer";

type AdminSession = {
  user: User;
  role: AdminRole;
};

const roleRank: Record<AdminRole, number> = {
  owner: 3,
  editor: 2,
  viewer: 1,
};

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const supabase = await getServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const { data, error } = await supabase
      .from("admin_users")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error || !data?.role) {
      return null;
    }

    if (!["owner", "editor", "viewer"].includes(data.role)) {
      return null;
    }

    return {
      user,
      role: data.role as AdminRole,
    };
  } catch {
    return null;
  }
}

export async function requireAdminPageAccess(minRole: AdminRole = "viewer") {
  const session = await getAdminSession();

  if (!session || roleRank[session.role] < roleRank[minRole]) {
    redirect("/ko/unauthorized");
  }

  return session;
}

export async function requireAdminApiAccess(
  request: NextRequest,
  minRole: AdminRole = "viewer",
) {
  try {
    assertAdminOrigin(request);
  } catch (error) {
    return {
      ok: false as const,
      response: NextResponse.json(
        {
          ok: false,
          error: error instanceof Error ? error.message : "Origin is not allowed.",
        },
        { status: 403 },
      ),
    };
  }

  const session = await getAdminSession();
  if (!session) {
    return {
      ok: false as const,
      response: NextResponse.json({ ok: false, error: "Authentication required." }, { status: 401 }),
    };
  }

  if (roleRank[session.role] < roleRank[minRole]) {
    return {
      ok: false as const,
      response: NextResponse.json({ ok: false, error: "Insufficient role." }, { status: 403 }),
    };
  }

  return { ok: true as const, session };
}
