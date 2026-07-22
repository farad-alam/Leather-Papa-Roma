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

  const prev = () => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
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
          <span className="label-caps">Customer Stories</span>
          <h2 id="testimonials-heading" className={styles.title}>
            What Our Customers Say
          </h2>
        </motion.div>

        <div
          className={styles.carousel}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            startTimeRef.current = Date.now() - (progress / 100) * AUTOPLAY_INTERVAL;
          }}
        >
          <button className={styles.navBtn} onClick={() => handleNav((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} aria-label="Previous testimonial">←</button>

          <div className={styles.cardWrapper}>
            <div className={styles.quoteMark} aria-hidden="true">"</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={styles.card}
              >
                {/* Stars stagger in */}
                <motion.div
                  className={styles.stars}
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
                  }}
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <motion.span
                      key={i}
                      className={styles.star}
                      variants={{ hidden: { scale: 0 }, show: { scale: 1 } }}
                    >★</motion.span>
                  ))}
                </motion.div>

                <blockquote className={styles.quote}>
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                <div className={styles.author}>
                  <div className={styles.authorInitial}>{t.name[0]}</div>
                  <div>
                    <div className={styles.authorName}>{t.name}</div>
                    <div className={styles.authorProduct}>Purchased: {t.product}</div>
                  </div>
                  {t.verified && (
                    <span className={`badge badge-green ${styles.verifiedBadge}`}>
                      ✓ Verified Buyer
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className={styles.navBtn} onClick={() => handleNav((active + 1) % TESTIMONIALS.length)} aria-label="Next testimonial">→</button>
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
