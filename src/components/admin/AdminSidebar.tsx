"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AdminSidebar.module.css";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "◈" },
  { href: "/admin/orders", label: "Orders", icon: "📦" },
  { href: "/admin/products", label: "Products", icon: "🏷" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.href = "/admin/login";
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandText}>
          <span className={styles.brandMain}>PAPA ROMA</span>
          <span className={styles.brandSub}>Admin Panel</span>
        </div>
      </div>

      <nav className={styles.nav}>
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={[
              styles.navItem,
              pathname === item.href ? styles.active : "",
            ].join(" ")}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.footer}>
        <Link href="/" className={styles.viewSite} target="_blank">
          ↗ View Website
        </Link>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
