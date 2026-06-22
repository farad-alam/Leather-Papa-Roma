import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/product/ProductCard";
import styles from "./gift-guide.module.css";

export const metadata: Metadata = {
  title: "Gift Guide — Papa Roma Leather",
  description: "Curated leather gifts for him, for her, and corporate gifting. Find the perfect full-grain leather piece with optional custom monogramming.",
};

// Mock curated lists
const FOR_HIM = [
  { id: 1, name: "Classic Bifold Wallet", slug: "classic-bifold-wallet", price: 2800, image: "/products/wallet.png", category: "Wallets", inStock: true, allowEmbossing: true },
  { id: 4, name: "Executive Belt — 35mm", slug: "executive-belt-35mm", price: 3200, image: "/products/belt.png", category: "Belts", inStock: true, allowEmbossing: false },
];

const FOR_HER = [
  { id: 3, name: "Slim Card Holder", slug: "slim-card-holder", price: 1400, image: "/products/cardholder.png", category: "Cardholders", inStock: true, allowEmbossing: true },
  { id: 5, name: "A5 Leather Diary Cover", slug: "a5-leather-diary-cover", price: 2200, image: "/products/diary.png", category: "Diary Covers", inStock: true, allowEmbossing: true },
];

const CORPORATE = [
  { id: 6, name: "The Signature Gift Set", slug: "signature-gift-set", price: 4500, image: "/products/gift-set.png", category: "Gift Sets", inStock: true, allowEmbossing: true },
];

export default function GiftGuidePage() {
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I need help picking a gift / I want to discuss corporate gifting.")}`;

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.hero}>
        <div className={styles.heroBg}>
          <Image src="/products/gift-set.png" alt="Leather gifts" fill style={{ objectFit: "cover" }} priority />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.title}>The Papa Roma<br /><em>Gift Guide</em></h1>
          <p className={styles.subtitle}>
            A well-made leather good is more than a gift; it is a companion that
            grows more beautiful over time. Explore our curated selections.
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.sections}>
          {/* For Him */}
          <section id="for-him" className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Gifts for Him</h2>
              <p className={styles.sectionDesc}>Timeless essentials for the modern professional.</p>
            </div>
            <div className={styles.grid}>
              {FOR_HIM.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>

          <hr className="divider" />

          {/* For Her */}
          <section id="for-her" className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Gifts for Her</h2>
              <p className={styles.sectionDesc}>Elegant, minimal pieces crafted to last a lifetime.</p>
            </div>
            <div className={styles.grid}>
              {FOR_HER.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>

          <hr className="divider" />

          {/* Corporate */}
          <section id="corporate" className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Corporate Gifting</h2>
              <p className={styles.sectionDesc}>
                Show appreciation to your team or clients with premium leather goods.
                We offer bulk discounts and custom logo embossing for corporate orders.
              </p>
            </div>
            <div className={styles.grid}>
              {CORPORATE.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        </div>

        {/* Need help footer */}
        <div className={styles.helpBox}>
          <h3>Need a recommendation?</h3>
          <p>Message us on WhatsApp and we&apos;ll help you pick the perfect piece.</p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Chat with a Guide
          </a>
        </div>
      </div>
    </div>
  );
}
