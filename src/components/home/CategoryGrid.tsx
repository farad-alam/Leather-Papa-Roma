"use client";

import { useRef, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import styles from "./CategoryGrid.module.css";

const CATEGORIES = [
  { name: "Wallets", slug: "wallets", image: "/products/wallet.png", span: "large", count: 12 },
  { name: "Cardholders", slug: "cardholders", image: "/products/cardholder.png", span: "small", count: 8 },
  { name: "Belts", slug: "belts", image: "/products/belt.png", span: "small", count: 5 },
  { name: "Diary Covers", slug: "diary-covers", image: "/products/diary.png", span: "medium", count: 4 },
  { name: "Gift Sets", slug: "gift-sets", image: "/products/gift-set.png", span: "medium", count: 3 },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemAnim = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

function TiltCard({ cat }: { cat: typeof CATEGORIES[0] }) {
  const ref = useRef<HTMLAnchorElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div variants={itemAnim} className={[styles.cardWrapper, styles[cat.span]].join(" ")}>
      <Link href={`/shop/${cat.slug}`} passHref legacyBehavior>
        <motion.a
          ref={ref}
          className={styles.card}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY }}
          aria-label={`Shop ${cat.name}`}
        >
          <div className={styles.imgWrap}>
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.img}
            />
          </div>
          <div className={styles.cardOverlay} />
          
          <div className={styles.countBadge}>{cat.count} Products</div>
          
          <div className={styles.cardLabel}>
            <span className={styles.cardName}>{cat.name}</span>
            <span className={styles.cardArrow}>→</span>
          </div>
        </motion.a>
      </Link>
    </motion.div>
  );
}

export default function CategoryGrid() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="categories-heading">
      <div className="container">
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

        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {CATEGORIES.map((cat) => (
            <TiltCard key={cat.slug} cat={cat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
