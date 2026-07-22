"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import styles from "./FeaturedProducts.module.css";

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

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemAnim = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function FeaturedProducts({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section className={`section ${styles.section}`} aria-labelledby="featured-heading">
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="label-caps">Featured</span>
            <h2 id="featured-heading" className={styles.title}>
              Our Most Loved Pieces
            </h2>
          </div>
          
          <div className={styles.actions}>
            <div className={styles.navControls}>
              <button onClick={scrollLeft} className={styles.navBtn} aria-label="Scroll left">←</button>
              <button onClick={scrollRight} className={styles.navBtn} aria-label="Scroll right">→</button>
            </div>
            <Link href="/shop" className="btn btn-outline">
              View All
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Horizontal Rail */}
      <div className={styles.railWrapper}>
        <motion.div
          ref={scrollRef}
          className={`snap-x-container ${styles.rail}`}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              className={`snap-align-center ${styles.railItem}`}
              variants={itemAnim}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
          {/* Add a 'View All' card at the end of the rail */}
          <motion.div className={`snap-align-center ${styles.railItem} ${styles.viewAllCard}`} variants={itemAnim}>
            <Link href="/shop" className={styles.viewAllInner}>
              <span className={styles.viewAllText}>Discover<br/>The Collection</span>
              <span className={styles.viewAllArrow}>→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
