"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, getShippingFee, generateOrderNumber, BD_DISTRICTS } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./checkout.module.css";

type PaymentMethod = "bkash" | "nagad" | "cod";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const router = useRouter();
  const sub = subtotal();

  const [district, setDistrict] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [txnId, setTxnId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    specialInstructions: "",
  });

  const shippingFee = district ? getShippingFee(district) : 0;
  const total = sub + shippingFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.customerName.trim()) newErrors.customerName = "Full name is required";
    if (!/^01[3-9]\d{8}$/.test(form.customerPhone)) newErrors.customerPhone = "Enter a valid Bangladeshi phone number";
    if (!form.customerAddress.trim()) newErrors.customerAddress = "Delivery address is required";
    if (!district) newErrors.district = "Please select your district";
    if ((payment === "bkash" || payment === "nagad") && !txnId.trim()) {
      newErrors.txnId = "Transaction ID is required for this payment method";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const orderNumber = generateOrderNumber();
      const orderData = {
        orderNumber,
        ...form,
        district,
        items: items.map((i) => ({
          productId: i.productId,
          name: i.name,
          slug: i.slug,
          image: i.image,
          price: i.price,
          qty: i.qty,
          embossingRequested: i.embossingRequested,
        })),
        subtotal: sub,
        shippingFee,
        total,
        paymentMethod: payment,
        transactionId: txnId || null,
        status: payment === "cod" ? "PENDING_DELIVERY" : "PENDING_VERIFICATION",
        embossingRequested: items.some((i) => i.embossingRequested),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Order failed");

      clearCart();
      router.push(`/order-success?order=${orderNumber}`);
    } catch {
      setErrors({ submit: "Something went wrong. Please try again or order via WhatsApp." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h1>Your cart is empty</h1>
        <a href="/shop" className="btn btn-primary">Browse Products</a>
      </div>
    );
  }

  const bkashNumber = process.env.NEXT_PUBLIC_BKASH_NUMBER;
  const nagadNumber = process.env.NEXT_PUBLIC_NAGAD_NUMBER;

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.pageTitle}>Checkout</h1>

        <form onSubmit={handleSubmit} className={styles.layout} noValidate>
          {/* Left: Form */}
          <div className={styles.formCol}>
            {/* ── Step 1: Customer Info ── */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.stepNum}>1</span> Delivery Details
              </h2>

              <div className={styles.formGrid}>
                <div className={`form-group ${styles.fullWidth}`}>
                  <label className="label" htmlFor="customerName">Full Name *</label>
                  <input id="customerName" name="customerName" className="input" type="text"
                    placeholder="Your full name" value={form.customerName} onChange={handleChange} />
                  {errors.customerName && <span className={styles.error}>{errors.customerName}</span>}
                </div>

                <div className="form-group">
                  <label className="label" htmlFor="customerPhone">Phone Number *</label>
                  <input id="customerPhone" name="customerPhone" className="input" type="tel"
                    placeholder="01XXXXXXXXX" value={form.customerPhone} onChange={handleChange} />
                  {errors.customerPhone && <span className={styles.error}>{errors.customerPhone}</span>}
                </div>

                <div className="form-group">
                  <label className="label" htmlFor="district">District *</label>
                  <select
                    id="district"
                    className="input"
                    value={district}
                    onChange={(e) => { setDistrict(e.target.value); setErrors({ ...errors, district: "" }); }}
                  >
                    <option value="">Select your district</option>
                    {BD_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  {errors.district && <span className={styles.error}>{errors.district}</span>}
                </div>

                <div className={`form-group ${styles.fullWidth}`}>
                  <label className="label" htmlFor="customerAddress">Full Address *</label>
                  <input id="customerAddress" name="customerAddress" className="input" type="text"
                    placeholder="House/flat, road, area, thana..." value={form.customerAddress} onChange={handleChange} />
                  {errors.customerAddress && <span className={styles.error}>{errors.customerAddress}</span>}
                </div>

                <div className={`form-group ${styles.fullWidth}`}>
                  <label className="label" htmlFor="specialInstructions">Special Instructions</label>
                  <textarea id="specialInstructions" name="specialInstructions" className="input"
                    rows={3} placeholder="Any notes for delivery or packaging..."
                    value={form.specialInstructions} onChange={handleChange} />
                </div>
              </div>
            </section>

            {/* ── Step 2: Delivery Fee ── */}
            {district && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.stepNum}>2</span> Delivery
                </h2>
                <div className={styles.deliveryInfo}>
                  <div className={styles.deliveryRow}>
                    <span>📦 {district === "Dhaka" ? "Inside Dhaka" : "Outside Dhaka"} delivery</span>
                    <span className={styles.deliveryPrice}>{formatPrice(shippingFee)}</span>
                  </div>
                  <p className={styles.deliveryEst}>
                    Estimated delivery: {district === "Dhaka" ? "2–3 business days" : "3–5 business days"}
                  </p>
                </div>
              </section>
            )}

            {/* ── Step 3: Payment ── */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.stepNum}>3</span> Payment Method
              </h2>

              <div className={styles.paymentOptions}>
                {/* bKash */}
                <label className={[styles.payOption, payment === "bkash" ? styles.activePayOption : ""].join(" ")}>
                  <input type="radio" name="payment" value="bkash"
                    checked={payment === "bkash"} onChange={() => setPayment("bkash")} className={styles.radioInput} />
                  <div className={styles.payBadge} style={{ background: "#E2136E" }}>bKash</div>
                  <div className={styles.payDetails}>
                    <strong>Pay via bKash</strong>
                    <p>Send money to merchant number, then enter TrxID below</p>
                  </div>
                </label>

                {/* Nagad */}
                <label className={[styles.payOption, payment === "nagad" ? styles.activePayOption : ""].join(" ")}>
                  <input type="radio" name="payment" value="nagad"
                    checked={payment === "nagad"} onChange={() => setPayment("nagad")} className={styles.radioInput} />
                  <div className={styles.payBadge} style={{ background: "#F26522" }}>Nagad</div>
                  <div className={styles.payDetails}>
                    <strong>Pay via Nagad</strong>
                    <p>Send money to merchant number, then enter TrxID below</p>
                  </div>
                </label>

                {/* COD */}
                <label className={[styles.payOption, payment === "cod" ? styles.activePayOption : ""].join(" ")}>
                  <input type="radio" name="payment" value="cod"
                    checked={payment === "cod"} onChange={() => setPayment("cod")} className={styles.radioInput} />
                  <div className={styles.payBadge} style={{ background: "#2d7a3a" }}>COD</div>
                  <div className={styles.payDetails}>
                    <strong>Cash on Delivery</strong>
                    <p>Pay when your order arrives at your door</p>
                  </div>
                </label>
              </div>

              {/* Payment instructions */}
              {(payment === "bkash" || payment === "nagad") && (
                <div className={styles.payInstructions}>
                  <p className={styles.payStep}>
                    <strong>Step 1:</strong> Send{" "}
                    <strong>{formatPrice(total || sub)}</strong> to{" "}
                    <span className={styles.merchantNumber}>
                      {payment === "bkash" ? bkashNumber : nagadNumber}
                    </span>{" "}
                    ({payment === "bkash" ? "bKash" : "Nagad"} Send Money)
                  </p>
                  <p className={styles.payStep}>
                    <strong>Step 2:</strong> Copy the Transaction ID from your app/SMS
                  </p>
                  <p className={styles.payStep}>
                    <strong>Step 3:</strong> Enter it below
                  </p>
                  <div className="form-group" style={{ marginTop: "1rem" }}>
                    <label className="label" htmlFor="txnId">
                      Transaction ID (TrxID) *
                    </label>
                    <input
                      id="txnId"
                      className="input"
                      type="text"
                      placeholder="e.g. 8C5RT6X..."
                      value={txnId}
                      onChange={(e) => { setTxnId(e.target.value); setErrors({ ...errors, txnId: "" }); }}
                    />
                    {errors.txnId && <span className={styles.error}>{errors.txnId}</span>}
                  </div>
                </div>
              )}
            </section>

            {errors.submit && (
              <div className={styles.submitError}>{errors.submit}</div>
            )}

            <button
              type="submit"
              className={`btn btn-primary btn-lg ${styles.submitBtn}`}
              disabled={isSubmitting}
              id="place-order-btn"
            >
              {isSubmitting ? "Placing Order..." : `Place Order — ${formatPrice(total || sub)}`}
            </button>

            <p className={styles.trustLine}>
              🔒 Your information is secure · No hidden fees · Easy returns
            </p>
          </div>

          {/* Right: Order Summary */}
          <aside className={styles.summaryCol}>
            <div className={styles.summary}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryItems}>
                {items.map((item) => (
                  <div key={item.productId} className={styles.summaryItem}>
                    <div className={styles.summaryItemImage}>
                      <Image
                        src={item.image || "/products/wallet.png"}
                        alt={item.name}
                        fill
                        sizes="56px"
                        style={{ objectFit: "cover" }}
                      />
                      <span className={styles.summaryItemQty}>{item.qty}</span>
                    </div>
                    <div className={styles.summaryItemInfo}>
                      <span className={styles.summaryItemName}>{item.name}</span>
                      {item.embossingRequested && (
                        <span className={styles.embossingNote}>✦ Embossing requested</span>
                      )}
                    </div>
                    <span className={styles.summaryItemPrice}>
                      {formatPrice(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              <div className={styles.summaryTotals}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>{formatPrice(sub)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span>{district ? formatPrice(shippingFee) : "—"}</span>
                </div>
                <hr className="divider" />
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total</span>
                  <span className={styles.totalAmount}>{formatPrice(total || sub)}</span>
                </div>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
