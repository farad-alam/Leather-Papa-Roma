"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./EmbossingBanner.module.css";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeUpAnim = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const stampAnim = {
  hidden: { opacity: 0, scale: 1.5, rotate: -15 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      mass: 1.2,
      delay: 0.2
    }
  }
};

export default function EmbossingBanner() {
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'm interested in custom embossing on a leather product.")}`;

  return (
    <section className={`${styles.section} noise-bg`} aria-labelledby="embossing-heading">
      <div className={`container ${styles.inner}`}>
        {/* Decorative monogram preview with stamp animation */}
        <div className={styles.monogramCol}>
          <motion.div
            className={styles.monogram}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={stampAnim}
            aria-hidden="true"
          >
            <span className={styles.monogramLetter}>AR</span>
          </motion.div>
          <motion.span
             className={styles.monogramLabel}
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 1, duration: 1 }}
          >
            Your Initials Here
          </motion.span>
        </div>

        <motion.div
          className={styles.content}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span variants={fadeUpAnim} className={styles.kicker}>Custom Embossing & Monogramming</motion.span>
          <motion.h2 variants={fadeUpAnim} id="embossing-heading" className={styles.title}>
            Make It <em className="display-serif">Truly Yours</em>
          </motion.h2>
          <motion.p variants={fadeUpAnim} className={styles.body}>
            Add a personal touch — emboss a name, initials, or monogram on select
            leather pieces. Perfect for gifts that feel one-of-a-kind. Available on
            wallets, cardholders, diary covers, and more.
          </motion.p>

          <div className={styles.steps}>
            {[
              { n: "01", label: "Choose your product" },
              { n: "02", label: "Toggle 'Add Embossing' on the product page" },
              { n: "03", label: "We'll confirm details via WhatsApp" },
            ].map((step) => (
              <motion.div variants={fadeUpAnim} key={step.n} className={styles.step}>
                <span className={styles.stepNum}>{step.n}</span>
                <span className={styles.stepLabel}>{step.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUpAnim} className={styles.ctas}>
            <Link href="/shop" className="btn btn-primary btn-lg">
              Shop Embossable Items
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-lg"
            >
              Ask via WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
