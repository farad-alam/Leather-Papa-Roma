"use client";

import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotal } =
    useCartStore();
  const sub = subtotal();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={[styles.drawer, isOpen ? styles.open : ""].join(" ")}
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Your Cart
            {items.length > 0 && (
              <span className={styles.count}>{items.length}</span>
            )}
          </h2>
          <button
            className={styles.closeBtn}
            onClick={closeCart}
            aria-label="Close cart"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <BagIcon />
            </div>
            <p className={styles.emptyText}>Your cart is empty</p>
            <button onClick={closeCart} className="btn btn-primary btn-sm">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map((item) => (
                <div key={`${item.productId}-${item.embossingRequested}`} className={styles.item}>
                  <div className={styles.itemImage}>
                    <Image
                      src={item.image || "/products/wallet.png"}
                      alt={item.name}
                      fill
                      sizes="72px"
                      className={styles.img}
                    />
                  </div>
                  <div className={styles.itemInfo}>
                    <Link
                      href={`/products/${item.slug}`}
                      className={styles.itemName}
                      onClick={closeCart}
                    >
                      {item.name}
                    </Link>
                    {item.embossingRequested && (
                      <span className={`badge badge-gold ${styles.embossingBadge}`}>
                        🪡 Embossing Requested
                      </span>
                    )}
                    <div className={styles.itemBottom}>
                      {/* Qty controls */}
                      <div className={styles.qtyControl}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQty(item.productId, item.qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className={styles.qty}>{item.qty}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQty(item.productId, item.qty + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className={styles.itemPrice}>
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.productId)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className={styles.footer}>
              {/* Embossing notice */}
              {items.some((i) => i.embossingRequested) && (
                <div className={styles.embossingNote}>
                  🪡 You&apos;ve requested embossing on one or more items. We&apos;ll reach out via WhatsApp to confirm details before dispatch.
                </div>
              )}

              <div className={styles.subtotalRow}>
                <span>Subtotal</span>
                <span className={styles.subtotalAmount}>{formatPrice(sub)}</span>
              </div>
              <p className={styles.shippingNote}>
                Shipping calculated at checkout
              </p>
              <Link
                href="/checkout"
                className={`btn btn-primary ${styles.checkoutBtn}`}
                onClick={closeCart}
              >
                Proceed to Checkout
              </Link>
              <button onClick={closeCart} className={styles.continueLink}>
                ← Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}
