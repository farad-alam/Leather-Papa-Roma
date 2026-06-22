import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import styles from "./shop.module.css";

export const metadata: Metadata = {
  title: "Shop All Products — Papa Roma Leather",
  description:
    "Browse premium full-grain leather wallets, cardholders, belts, diary covers and gift sets. All handcrafted. Optional custom embossing available.",
};

// Static product catalog for initial build — will be replaced by DB fetch
const ALL_PRODUCTS = [
  { id: 1, name: "Classic Bifold Wallet", slug: "classic-bifold-wallet", price: 2800, image: "/products/wallet.png", category: "Wallets", inStock: true, allowEmbossing: true },
  { id: 2, name: "Slim Trifold Wallet", slug: "slim-trifold-wallet", price: 3200, image: "/products/wallet.png", category: "Wallets", inStock: true, allowEmbossing: true },
  { id: 3, name: "Slim Card Holder", slug: "slim-card-holder", price: 1400, image: "/products/cardholder.png", category: "Cardholders", inStock: true, allowEmbossing: true },
  { id: 4, name: "Executive Belt — 35mm", slug: "executive-belt-35mm", price: 3200, image: "/products/belt.png", category: "Belts", inStock: true, allowEmbossing: false },
  { id: 5, name: "A5 Leather Diary Cover", slug: "a5-leather-diary-cover", price: 2200, image: "/products/diary.png", category: "Diary Covers", inStock: true, allowEmbossing: true },
  { id: 6, name: "The Signature Gift Set", slug: "signature-gift-set", price: 4500, image: "/products/gift-set.png", category: "Gift Sets", inStock: true, allowEmbossing: true },
];

const CATEGORIES = ["All", "Wallets", "Cardholders", "Belts", "Diary Covers", "Gift Sets"];

export default function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  return <ShopPageInner searchParamsPromise={searchParams} />;
}

// We use an async inner component to await searchParams
async function ShopPageInner({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{ category?: string; sort?: string }>;
}) {
  const params = await searchParamsPromise;
  const activeCategory = params.category || "All";
  const sort = params.sort || "newest";

  let filtered = activeCategory === "All"
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter((p) => p.category === activeCategory);

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>›</span>
            <span>Shop</span>
          </nav>
          <h1 className={styles.pageTitle}>
            {activeCategory === "All" ? "All Products" : activeCategory}
          </h1>
          <p className={styles.pageCount}>{filtered.length} products</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          {/* Sidebar filters */}
          <aside className={styles.sidebar} aria-label="Filters">
            <div className={styles.filterGroup}>
              <h2 className={`label-caps ${styles.filterTitle}`}>Category</h2>
              <div className={styles.filterOptions}>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    href={cat === "All" ? "/shop" : `/shop?category=${cat}`}
                    className={[
                      styles.filterOption,
                      activeCategory === cat ? styles.active : "",
                    ].join(" ")}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <h2 className={`label-caps ${styles.filterTitle}`}>Features</h2>
              <div className={styles.filterOptions}>
                <Link
                  href={`/shop?category=${activeCategory}&embossing=true`}
                  className={styles.filterOption}
                >
                  ✦ Embossing Available
                </Link>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className={styles.main}>
            {/* Sort bar */}
            <div className={styles.sortBar}>
              <span className={styles.resultCount}>{filtered.length} results</span>
              <div className={styles.sortOptions}>
                <span className={styles.sortLabel}>Sort:</span>
                {[
                  { value: "newest", label: "Newest" },
                  { value: "price-asc", label: "Price: Low–High" },
                  { value: "price-desc", label: "Price: High–Low" },
                ].map((opt) => (
                  <Link
                    key={opt.value}
                    href={`/shop?category=${activeCategory}&sort=${opt.value}`}
                    className={[
                      styles.sortOption,
                      sort === opt.value ? styles.activeSortOption : "",
                    ].join(" ")}
                  >
                    {opt.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Product grid */}
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <p>No products found in this category.</p>
                <Link href="/shop" className="btn btn-outline">
                  View All Products
                </Link>
              </div>
            ) : (
              <div className={styles.grid}>
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
