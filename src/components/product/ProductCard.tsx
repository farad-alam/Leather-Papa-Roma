"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import styles from "./ProductCard.module.css";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  allowEmbossing: boolean;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      price: product.price,
      qty: 1,
      embossingRequested: false,
    });
  };

  return (
    <article className={styles.card}>
      <Link href={`/products/${product.slug}`} className={styles.imageWrap}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={styles.img}
        />
        {/* Overlay on hover */}
        <div className={styles.overlay}>
          <span className={styles.viewBtn}>View Details</span>
        </div>
        {/* Badges */}
        <div className={styles.badges}>
          {product.allowEmbossing && (
            <span className={`badge badge-gold ${styles.badge}`}>✦ Embossing</span>
          )}
          {!product.inStock && (
            <span className={`badge badge-grey ${styles.badge}`}>Out of Stock</span>
          )}
        </div>
      </Link>

      <div className={styles.info}>
        <div className={styles.meta}>
          <span className={styles.category}>{product.category}</span>
        </div>
        <h3 className={styles.name}>
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <div className={styles.bottom}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          <button
            className={`btn btn-primary btn-sm ${styles.addBtn}`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
