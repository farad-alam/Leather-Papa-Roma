import styles from "./orders.module.css";
import { formatPrice } from "@/lib/utils";

// Mock data
const ORDERS = [
  { id: "PRL-X8K9M", customer: "Arif Rahman", phone: "01712345678", location: "Dhaka", total: 4200, status: "PENDING_VERIFICATION", date: "2 mins ago" },
  { id: "PRL-J2P4Q", customer: "Nadia Sultana", phone: "01812345678", location: "Chittagong", total: 2200, status: "PENDING_DELIVERY", date: "1 hour ago" },
  { id: "PRL-M5N1L", customer: "Tanvir Ahmed", phone: "01912345678", location: "Sylhet", total: 1400, status: "DELIVERED", date: "5 hours ago" },
  { id: "PRL-K9L3P", customer: "Sumaiya Hasan", phone: "01612345678", location: "Dhaka", total: 5600, status: "PENDING_VERIFICATION", date: "1 day ago" },
  { id: "PRL-Q2W4E", customer: "Jamal Uddin", phone: "01512345678", location: "Rajshahi", total: 2800, status: "CANCELLED", date: "2 days ago" },
];

export default function AdminOrdersPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Orders</h1>
        <p className={styles.subtitle}>Manage all customer orders here.</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.search}>
          <input type="text" placeholder="Search by Order # or Customer..." className={styles.input} />
        </div>
        <select className={styles.select}>
          <option value="all">All Statuses</option>
          <option value="PENDING_VERIFICATION">Pending Verification</option>
          <option value="PENDING_DELIVERY">Pending Delivery</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Location</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((order) => (
              <tr key={order.id}>
                <td className={styles.cellId}>{order.id}</td>
                <td>
                  <div className={styles.cellCustomer}>
                    <span>{order.customer}</span>
                    <span className={styles.cellPhone}>{order.phone}</span>
                  </div>
                </td>
                <td>{order.location}</td>
                <td className={styles.cellPrice}>{formatPrice(order.total)}</td>
                <td>
                  <span className={`${styles.badge} ${styles[order.status]}`}>
                    {order.status.replace("_", " ")}
                  </span>
                </td>
                <td className={styles.cellTime}>{order.date}</td>
                <td>
                  <button className={styles.actionBtn}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
