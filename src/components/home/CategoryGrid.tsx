"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CategoryGrid.module.css";

const CATEGORIES = [
  { name: "Wallets", slug: "wallets", image: "/products/wallet.png" },
  { name: "Cardholders", slug: "cardholders", image: "/products/cardholder.png" },
  { name: "Belts", slug: "belts", image: "/products/belt.png" },
  { name: "Diary Covers", slug: "diary-covers", image: "/products/diary.png" },
  { name: "Gift Sets", slug: "gift-sets", image: "/products/gift-set.png" },
];

export default function CategoryGrid() {
  const [activeIndex, setActiveIndex] = useState(2); // Start with center item
  const [isHovered, setIsHovered] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % CATEGORIES.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + CATEGORIES.length) % CATEGORIES.length);
  }, []);

  // Autoplay every 2.5s (pauses on hover)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      next();
    }, 2500);
    return () => clearInterval(timer);
  }, [next, isHovered]);

  return (
    <section className={`section ${styles.section}`} aria-labelledby="categories-heading">
      <div className="container" style={{ position: "relative" }}>
        
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <span className="label-caps">Browse by Category</span>
          <h2 id="categories-heading" className={styles.title}>
            A Collection Built for the Discerning Few
          </h2>
        </motion.div>

        <div 
          className={styles.carouselContainer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div 
            className={styles.carouselInner}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(e, info) => {
              const swipeThreshold = 20;
              if (info.offset.x > swipeThreshold) {
                prev();
              } else if (info.offset.x < -swipeThreshold) {
                next();
              }
            }}
            style={{ cursor: "grab" }}
            whileTap={{ cursor: "grabbing" }}
          >
            <AnimatePresence initial={false}>
              {CATEGORIES.map((cat, i) => {
                // Calculate circular offset
                let offset = i - activeIndex;
                const half = Math.floor(CATEGORIES.length / 2);
                if (offset > half) offset -= CATEGORIES.length;
                if (offset < -half) offset += CATEGORIES.length;

                // Math for 3D perspective
                let x = 0;
                let z = 0;
                let rotateY = 0;
                let scale = 1;
                let opacity = 1;
                let zIndex = 10;

                if (offset === 0) {
                  x = 0;
                  z = 100;
                  rotateY = 0;
                  scale = 1;
                  opacity = 1;
                  zIndex = 10;
                } else if (offset === -1) {
                  x = -95; // spread further left
                  z = -50; 
                  rotateY = 35; // slightly steeper tilt
                  scale = 0.85;
                  opacity = 0.85;
                  zIndex = 5;
                } else if (offset === 1) {
                  x = 95; // spread further right
                  z = -50;
                  rotateY = -35;
                  scale = 0.85;
                  opacity = 0.85;
                  zIndex = 5;
                } else if (offset === -2) {
                  x = -180; // spread even further left
                  z = -150; 
                  rotateY = 45;
                  scale = 0.7;
                  opacity = 0.6;
                  zIndex = 4;
                } else if (offset === 2) {
                  x = 180; // spread even further right
                  z = -150;
                  rotateY = -45;
                  scale = 0.7;
                  opacity = 0.6;
                  zIndex = 4;
                }

                const isCenter = offset === 0;

                return (
                  <motion.div
                    key={cat.slug}
                    className={styles.cardWrapper}
                    animate={{
                      x: `${x}%`,
                      z,
                      rotateY,
                      scale,
                      opacity,
                      zIndex,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94], // Snappy but smooth cubic bezier
                    }}
                    onClick={() => {
                      if (!isCenter) setActiveIndex(i);
                    }}
                  >
                    {isCenter ? (
                      <Link href={`/shop/${cat.slug}`} className={styles.cardLink} draggable={false}>
                        <CardContent cat={cat} />
                      </Link>
                    ) : (
                      <div className={styles.cardLink}>
                        <CardContent cat={cat} />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <div className={styles.controls}>
            <button className={styles.arrowBtn} onClick={prev} aria-label="Previous category">
              <ArrowLeft />
            </button>
            <button className={styles.arrowBtn} onClick={next} aria-label="Next category">
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardContent({ cat }: { cat: typeof CATEGORIES[0] }) {
  return (
    <>
      <div className={styles.imgWrap}>
        <Image
          src={cat.image}
          alt={cat.name}
          fill
          sizes="(max-width: 768px) 80vw, 30vw"
          className={styles.img}
        />
      </div>
      <div className={styles.cardOverlay} />
      <div className={styles.cardLabel}>
        <span className={styles.cardName}>
          THE "{cat.name.toUpperCase()}" COLLECTION
        </span>
      </div>
    </>
  );
}

function ArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
