import type { ReactNode } from "react";
import { requireAdminPageAccess } from "@/lib/security/admin-access";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  await requireAdminPageAccess("viewer");

  return (
    <div className="min-h-screen bg-bg">
      <main className="content-grid py-10 md:py-16">{children}</main>
    </div>
  );
}
