import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import styles from "./admin.module.css";

export const metadata = { title: "Admin — Papa Roma Leather" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAuth = cookieStore.get("admin_auth")?.value === "true";

  if (!isAuth) {
    redirect("/admin/login");
  }

  return (
    <div className={styles.layout}>
      <AdminSidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
