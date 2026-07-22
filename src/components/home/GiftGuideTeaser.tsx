"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./GiftGuideTeaser.module.css";

const GIFT_CARDS = [
  {
    id: "him",
    label: "Gift for Him",
    desc: "Wallets, belts & cardholders — timeless everyday essentials.",
    href: "/gift-guide#for-him",
    image: "/products/wallet.png",
    align: "start" // For asymmetric layout
  },
  {
    id: "her",
    label: "Gift for Her",
    desc: "Elegant diary covers, cardholders & delicate accessories.",
    href: "/gift-guide#for-her",
    image: "/products/diary.png",
    align: "end"
  },
  {
    id: "corporate",
    label: "Corporate Gifts",
    desc: "Branded, embossed leather gifts for teams & clients.",
    href: "/gift-guide#corporate",
    image: "/products/gift-set.png",
    align: "start"
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardAnim = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function GiftGuideTeaser() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="gift-heading">
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <span className="label-caps">Gift Guide</span>
          <h2 id="gift-heading" className={styles.title}>
            The Gift That <em className="display-serif">Says Something</em>
          </h2>
          <p className={styles.sub}>
            Full-grain leather ages beautifully and becomes more personal over time —
            making it one of the most thoughtful gifts you can give.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {GIFT_CARDS.map((card) => (
            <motion.div
              key={card.id}
              className={`${styles.cardWrapper} ${styles[card.align]}`}
              variants={cardAnim}
            >
              <Link href={card.href} className={styles.card}>
                <div className={styles.imageWrap}>
                  <Image
                    src={card.image}
                    alt={card.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.img}
                  />
                  <div className={styles.overlay} />
                </div>
                
                {/* Always visible minimal label */}
                <div className={styles.cardLabelVisible}>
                  <span className={styles.cardTitle}>{card.label}</span>
                </div>

                {/* Hover slide-up panel */}
                <div className={styles.cardHoverPanel}>
                  <h3 className={styles.cardTitleHover}>{card.label}</h3>
                  <p className={styles.cardDesc}>{card.desc}</p>
                  <span className={styles.cardLink}>Explore →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.footer}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link href="/gift-guide" className="btn btn-primary">
            View Full Gift Guide
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
