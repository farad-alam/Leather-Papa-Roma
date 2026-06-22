"use client";

import { useState } from "react";
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

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive((a) => (a + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[active];

  return (
    <section className={`section ${styles.section}`} aria-labelledby="testimonials-heading">
      <div className="container">
        <div className={styles.header}>
          <span className="label-caps">Customer Stories</span>
          <h2 id="testimonials-heading" className={styles.title}>
            What Our Customers Say
          </h2>
        </div>

        <div className={styles.carousel}>
          <button
            className={styles.navBtn}
            onClick={prev}
            aria-label="Previous testimonial"
          >
            ←
          </button>

          <div className={styles.card} key={t.id}>
            {/* Stars */}
            <div className={styles.stars} aria-label={`${t.rating} out of 5 stars`}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i} className={styles.star}>★</span>
              ))}
            </div>

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
          </div>

          <button
            className={styles.navBtn}
            onClick={next}
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>

        {/* Dots */}
        <div className={styles.dots} role="tablist" aria-label="Testimonials">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={[styles.dot, i === active ? styles.activeDot : ""].join(" ")}
              onClick={() => setActive(i)}
              role="tab"
              aria-selected={i === active}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
