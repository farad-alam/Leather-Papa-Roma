"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, buildWhatsAppUrl } from "@/lib/utils";
import styles from "./ProductDetail.module.css";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: string;
  description: string;
  material: string;
  dimensions: string;
  inStock: boolean;
  allowEmbossing: boolean;
};

export default function ProductDetail({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [embossingRequested, setEmbossingRequested] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      price: product.price,
      qty,
      embossingRequested,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappOrder = buildWhatsAppUrl(
    `Hi, I'd like to order: ${product.name} (×${qty}) — ৳${product.price * qty}. Please confirm availability.`
  );

  const whatsappEmbossing = buildWhatsAppUrl(
    `Hi, I'd like to add custom embossing to my order of: ${product.name}. Could you help me with the details?`
  );

  return (
    <div className={styles.wrapper}>
      {/* Image gallery */}
      <div className={styles.gallery}>
        <div className={styles.mainImage}>
          <Image
            src={product.images[activeImage]}
            alt={`${product.name} — image ${activeImage + 1}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.mainImg}
          />
        </div>
        {product.images.length > 1 && (
          <div className={styles.thumbnails}>
            {product.images.map((img, i) => (
              <button
                key={i}
                className={[styles.thumb, i === activeImage ? styles.activeThumb : ""].join(" ")}
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={img} alt="" fill sizes="80px" className={styles.thumbImg} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product info */}
      <div className={styles.info}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/shop">Shop</Link>
          <span>›</span>
          <span>{product.name}</span>
        </nav>

        {/* Category + name */}
        <span className={`label-caps ${styles.category}`}>{product.category}</span>
        <h1 className={styles.name}>{product.name}</h1>

        {/* Price + stock */}
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          {product.inStock ? (
            <span className="badge badge-green">In Stock</span>
          ) : (
            <span className="badge badge-red">Out of Stock</span>
          )}
        </div>

        <hr className="divider" />

        {/* Description */}
        <p className={styles.description}>{product.description}</p>

        {/* Details */}
        <div className={styles.details}>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Material</span>
            <span className={styles.detailValue}>{product.material}</span>
          </div>
          {product.dimensions && (
            <div className={styles.detail}>
              <span className={styles.detailLabel}>Dimensions</span>
              <span className={styles.detailValue}>{product.dimensions}</span>
            </div>
          )}
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Dispatch</span>
            <span className={styles.detailValue}>2–3 business days</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Shipping</span>
            <span className={styles.detailValue}>Dhaka ৳80 · Outside ৳150</span>
          </div>
        </div>

        <hr className="divider" />

        {/* Embossing toggle */}
        {product.allowEmbossing && (
          <div className={styles.embossingBlock}>
            <label className={styles.embossingLabel}>
              <input
                type="checkbox"
                className={styles.embossingCheck}
                checked={embossingRequested}
                onChange={(e) => setEmbossingRequested(e.target.checked)}
                id="embossing-toggle"
              />
              <span className={styles.embossingText}>
                <span className={styles.embossingIcon}>✦</span>
                <span>
                  <strong>Request Custom Embossing</strong>
                  <br />
                  <small>We&apos;ll confirm the text & details via WhatsApp</small>
                </span>
              </span>
            </label>
            {embossingRequested && (
              <a
                href={whatsappEmbossing}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-whatsapp btn-sm ${styles.embossingWhatsapp}`}
              >
                <WhatsAppIcon /> Discuss Embossing via WhatsApp
              </a>
            )}
          </div>
        )}

        {/* Quantity + Add to cart */}
        <div className={styles.actions}>
          <div className={styles.qtyWrapper}>
            <button
              className={styles.qtyBtn}
              onClick={() => setQty(Math.max(1, qty - 1))}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className={styles.qty}>{qty}</span>
            <button
              className={styles.qtyBtn}
              onClick={() => setQty(qty + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            className={`btn btn-primary ${styles.addBtn}`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            id="add-to-cart-btn"
          >
            {added ? "✓ Added!" : "Add to Cart"}
          </button>
        </div>

        {/* WhatsApp order */}
        <a
          href={whatsappOrder}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-whatsapp ${styles.whatsappBtn}`}
          id="whatsapp-order-btn"
        >
          <WhatsAppIcon /> Order via WhatsApp
        </a>

        {/* Trust row */}
        <div className={styles.trustRow}>
          {["Genuine Full-Grain Leather", "Secure Checkout", "Nationwide Delivery"].map((t) => (
            <span key={t} className={styles.trustItem}>
              <CheckIcon /> {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
