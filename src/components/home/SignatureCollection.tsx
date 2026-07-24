"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScroll, useMotionValueEvent } from "framer-motion";
import styles from "./SignatureCollection.module.css";

const FRAME_COUNT = 240;
const FRAME_URL = (index: number) =>
  `/Leather%20Product%20-frames/frame-${index.toString().padStart(4, "0")}.jpg`;

// Frame ranges for each product (0-indexed)
// 240 frames / 4 products = 60 frames each
const PRODUCT_SEGMENTS = [
  { start: 0,   end: 59  }, // Wallet
  { start: 60,  end: 119 }, // Diary
  { start: 120, end: 179 }, // Belt
  { start: 180, end: 239 }, // Key Fob
];

const PRODUCTS = [
  {
    id: "wallet",
    kicker: "01 / 04",
    title: "Signature Bifold Wallet",
    tagline: "Carry less. Say more.",
    desc: "Crafted from full-grain leather that ages beautifully. Designed to hold your essentials without the bulk.",
    link: "/shop",
    image: "/Leather Product -frames/frame-0060.jpg",
  },
  {
    id: "diary",
    kicker: "02 / 04",
    title: "Executive Diary Cover",
    tagline: "Every great story begins here.",
    desc: "Protect your thoughts and plans in a premium leather cover that speaks of professionalism and timeless style.",
    link: "/shop",
    image: "/Leather Product -frames/frame-0113.jpg",
  },
  {
    id: "belt",
    kicker: "03 / 04",
    title: "Heritage Leather Belt",
    tagline: "Hold it together, in style.",
    desc: "A staple for any wardrobe. Sturdy, elegant, and made from a single piece of full-grain leather.",
    link: "/shop",
    image: "/Leather Product -frames/frame-0163.jpg",
  },
  {
    id: "keyholder",
    kicker: "04 / 04",
    title: "Artisan Key Fob",
    tagline: "Even the small things deserve craft.",
    desc: "Keep your keys organized and silent. A touch of luxury you carry with you every single day.",
    link: "/shop",
    image: "/Leather Product -frames/frame-0200.jpg",
  },
];

export default function SignatureCollection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const loaderRef    = useRef<HTMLDivElement>(null);
  const loaderTextRef = useRef<HTMLSpanElement>(null);
  const imagesRef    = useRef<HTMLImageElement[]>([]);
  const isMobileRef  = useRef(false);

  // Refs to each text card DOM element — no React state, no re-renders
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const activeCardRef = useRef<number>(0); // track which card is active

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Canvas rendering ────────────────────────────────────────────────────
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    const hRatio = rect.width / img.width;
    const vRatio = rect.height / img.height;
    const ratio  = Math.max(hRatio, vRatio);
    const sx = (rect.width  - img.width  * ratio) / 2;
    const sy = (rect.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, sx, sy, img.width * ratio, img.height * ratio);
  };

  // ── Text card swap — pure DOM manipulation, zero React state ────────────
  const showCard = (index: number) => {
    const prev = activeCardRef.current;
    if (prev === index) return;

    const prevEl = cardRefs.current[prev];
    const nextEl = cardRefs.current[index];

    if (prevEl) {
      prevEl.style.opacity = "0";
      prevEl.style.transform = "translateY(-20px)";
      prevEl.style.pointerEvents = "none";
    }
    if (nextEl) {
      nextEl.style.opacity = "1";
      nextEl.style.transform = "translateY(0px)";
      nextEl.style.pointerEvents = "auto";
    }

    activeCardRef.current = index;
  };

  // ── Single scroll listener drives both canvas and text card ─────────────
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (isMobileRef.current) return;

    // Canvas frame
    const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(progress * FRAME_COUNT)));
    requestAnimationFrame(() => renderFrame(frameIndex));

    // Active text card (which quarter of the scroll are we in?)
    const cardIndex = Math.min(3, Math.floor(progress * 4));
    showCard(cardIndex);
  });

  // ── Preload images ───────────────────────────────────────────────────────
  useEffect(() => {
    isMobileRef.current = window.innerWidth <= 768;
    if (isMobileRef.current) return;

    // Set initial card state — card 0 visible, rest hidden
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === 0) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0px)";
        el.style.pointerEvents = "auto";
      } else {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.pointerEvents = "none";
      }
    });

    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = FRAME_URL(i);
      img.onload = () => {
        loaded++;
        if (loaderTextRef.current) {
          loaderTextRef.current.textContent =
            `Loading collection... ${Math.round((loaded / FRAME_COUNT) * 100)}%`;
        }
        if (loaded === 10) renderFrame(0);
        if (loaded >= FRAME_COUNT && loaderRef.current) {
          loaderRef.current.style.opacity = "0";
          loaderRef.current.style.pointerEvents = "none";
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  return (
    <section ref={containerRef} className={styles.wrapper} aria-label="Signature Collection">

      {/* ── Desktop: Sticky full-screen experience ── */}
      <div className={styles.sticky}>

        <canvas ref={canvasRef} className={styles.canvas} />

        <div ref={loaderRef} className={styles.loader}>
          <div className={styles.loaderSpinner} />
          <span ref={loaderTextRef}>Loading collection... 0%</span>
        </div>

        {/* Gradient makes text readable without covering image */}
        <div className={styles.textGradient} aria-hidden="true" />

        {/* Text panel — all cards stacked, only one visible at a time */}
        <div className={styles.textPanel}>
          {PRODUCTS.map((product, i) => (
            <div
              key={product.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={styles.productCard}
              // Initial visibility set in useEffect via DOM ref
              style={{ opacity: 0, transform: "translateY(20px)", pointerEvents: "none" }}
            >
              <span className={styles.kicker}>{product.kicker}</span>
              <h2 className={styles.title}>{product.title}</h2>
              <p className={styles.tagline}>&ldquo;{product.tagline}&rdquo;</p>
              <p className={styles.desc}>{product.desc}</p>
              <Link href={product.link} className={`btn btn-primary ${styles.cta}`}>
                Shop Collection
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: Static vertical stack ── */}
      <div className={styles.mobileFallback}>
        <div className={styles.mobileInner}>
          <h2 className={styles.mobileSectionTitle}>The Signature Collection</h2>
          {PRODUCTS.map((product) => (
            <div key={product.id} className={styles.mobileCard}>
              <div className={styles.mobileImgWrapper}>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="100vw"
                  className={styles.mobileImg}
                />
              </div>
              <span className={styles.kicker}>{product.kicker}</span>
              <h3 className={styles.title} style={{ fontSize: "2rem" }}>
                {product.title}
              </h3>
              <p className={styles.tagline}>&ldquo;{product.tagline}&rdquo;</p>
              <p className={styles.desc}>{product.desc}</p>
              <Link href={product.link} className="btn btn-outline">
                Shop Now
              </Link>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
