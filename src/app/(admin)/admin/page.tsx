import styles from "./dashboard.module.css";
import { formatPrice } from "@/lib/utils";

// Mock data for the initial layout
const STATS = [
  { label: "Pending Orders", value: "12" },
  { label: "Pending Verification", value: "8" },
  { label: "Today's Revenue", value: formatPrice(18500) },
  { label: "Total Revenue (Month)", value: formatPrice(245000) },
];

const RECENT_ORDERS = [
  { id: "PRL-X8K9M", customer: "Arif Rahman", total: 4200, status: "PENDING_VERIFICATION", date: "2 mins ago" },
  { id: "PRL-J2P4Q", customer: "Nadia Sultana", total: 2200, status: "PENDING_DELIVERY", date: "1 hour ago" },
  { id: "PRL-M5N1L", customer: "Tanvir Ahmed", total: 1400, status: "DELIVERED", date: "5 hours ago" },
  { id: "PRL-K9L3P", customer: "Sumaiya Hasan", total: 5600, status: "PENDING_VERIFICATION", date: "1 day ago" },
];

export default function AdminDashboard() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard Overview</h1>
        <p className={styles.subtitle}>Welcome back. Here&apos;s what&apos;s happening today.</p>
      </div>

      <div className={styles.statsGrid}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <span className={styles.statLabel}>{stat.label}</span>
            <span className={styles.statValue}>{stat.value}</span>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Orders</h2>
          <a href="/admin/orders" className={styles.viewAll}>View all →</a>
        </div>
        
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id}>
                  <td className={styles.cellId}>{order.id}</td>
                  <td>{order.customer}</td>
                  <td className={styles.cellPrice}>{formatPrice(order.total)}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[order.status]}`}>
                      {order.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className={styles.cellTime}>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
