import { Suspense } from "react";
import Link from "next/link";
import styles from "./success.module.css";

function SuccessContent({ searchParams }: { searchParams: Record<string, string> }) {
  const orderNumber = searchParams.order || "—";
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I just placed order #${orderNumber}. Looking forward to receiving it!`)}`;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>✓</div>
        <h1 className={styles.title}>Order Placed!</h1>
        <p className={styles.orderNum}>Order #{orderNumber}</p>
        <p className={styles.message}>
          Thank you for your order. We&apos;ve received it and will begin processing
          shortly. If you paid via bKash or Nagad, our team will verify your
          transaction and confirm via WhatsApp.
        </p>

        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.stepIcon}>📦</span>
            <div>
              <strong>Order Received</strong>
              <p>Your order is in our system</p>
            </div>
          </div>
          <div className={styles.stepArrow}>→</div>
          <div className={styles.step}>
            <span className={styles.stepIcon}>✅</span>
            <div>
              <strong>Verification</strong>
              <p>Payment confirmed (bKash/Nagad) or confirmed on delivery (COD)</p>
            </div>
          </div>
          <div className={styles.stepArrow}>→</div>
          <div className={styles.step}>
            <span className={styles.stepIcon}>🚚</span>
            <div>
              <strong>Dispatched</strong>
              <p>We&apos;ll notify you via WhatsApp</p>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            Follow Up on WhatsApp
          </a>
          <Link href="/shop" className="btn btn-outline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  return (
    <Suspense>
      <SuccessContent searchParams={params} />
    </Suspense>
  );
}
