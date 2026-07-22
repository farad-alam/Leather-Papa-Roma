"use client";

import { motion } from "framer-motion";
import styles from "./MarqueeTicker.module.css";

const ITEMS = [
  "Full-Grain Leather",
  "Handcrafted in Bangladesh",
  "Custom Embossing",
  "Ships Nationwide",
];

export default function MarqueeTicker() {
  // We duplicate the items enough times to ensure the screen is filled during the animation
  const repeatedItems = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className={styles.marqueeWrapper}>
      <motion.div
        className={styles.marqueeInner}
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
      >
        {repeatedItems.map((item, idx) => (
          <div key={idx} className={styles.itemWrapper}>
            <span className={styles.item}>{item}</span>
            <span className={styles.separator}>·</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
