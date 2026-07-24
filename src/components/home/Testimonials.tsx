"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Testimonials.module.css";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Arif Rahman",
    product: "Classic Bifold Wallet",
    rating: 5,
    text: "Bought this for myself after searching for a genuine full-grain wallet for months. The quality is exceptional — you can feel it's real. The stitching is perfect. Very happy with the purchase.",
    verified: true,
  },
  {
    id: 2,
    name: "Nadia Sultana",
    product: "Leather Diary Cover",
    rating: 5,
    text: "Ordered with custom embossing as a gift for my husband's promotion. The team was super responsive on WhatsApp and delivered exactly what I asked for. He was absolutely delighted!",
    verified: true,
  },
  {
    id: 3,
    name: "Tanvir Ahmed",
    product: "Slim Card Holder",
    rating: 5,
    text: "Sleek, slim, and high quality. The leather already feels like it's aging beautifully after just a few weeks. Shipping was fast and the packaging was premium too.",
    verified: true,
  },
];

const AUTOPLAY_INTERVAL = 6000;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout>(null);
  const startTimeRef = useRef<number>(Date.now());

  const next = () => setActive((a) => (a + 1) % TESTIMONIALS.length);

  useEffect(() => {
    if (isPaused) return;

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const percent = (elapsed / AUTOPLAY_INTERVAL) * 100;
      
      if (percent >= 100) {
        next();
        startTimeRef.current = Date.now();
        setProgress(0);
      } else {
        setProgress(percent);
      }
      timerRef.current = requestAnimationFrame(tick) as any;
    };

    timerRef.current = requestAnimationFrame(tick) as any;

    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current as any);
    };
  }, [active, isPaused]);

  // Reset timer on manual navigation
  const handleNav = (index: number) => {
    setActive(index);
    startTimeRef.current = Date.now();
    setProgress(0);
  };

  const t = TESTIMONIALS[active];

  return (
    <section className={`section ${styles.section}`} aria-labelledby="testimonials-heading">
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="testimonials-heading" className={styles.title}>
            <span className={styles.titleLine1}>Customer</span>
            <span className={styles.titleLine2}>Stories</span>
          </h2>
        </motion.div>

        <div
          className={styles.carouselArea}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            startTimeRef.current = Date.now() - (progress / 100) * AUTOPLAY_INTERVAL;
          }}
        >
          <div className={styles.quoteMarkLeft} aria-hidden="true">“</div>

          <div className={styles.cardContainer}>
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={styles.card}
              >
                <blockquote className={styles.quote}>
                  {t.text}
                </blockquote>
                <div className={styles.author}>
                  {t.name}
                  {t.verified && <span className={styles.verifiedDot}>• Verified Buyer</span>}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.quoteMarkRight} aria-hidden="true">”</div>
        </div>

        {/* Progress Bar & Dots */}
        <div className={styles.controls}>
          <div className={styles.dots} role="tablist" aria-label="Testimonials">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={[styles.dot, i === active ? styles.activeDot : ""].join(" ")}
                onClick={() => handleNav(i)}
                role="tab"
                aria-selected={i === active}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
          
          <div className={styles.progressBarBg}>
            <div className={styles.progressBarFill} style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
