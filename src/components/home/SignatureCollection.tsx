"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import styles from "./SignatureCollection.module.css";

const FRAME_COUNT = 240;
const FRAME_URL = (index: number) =>
  `/Leather%20Product%20-frames/frame-${index.toString().padStart(4, "0")}.jpg`;

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
    desc: "A staple for any wardrobe. Sturdy, elegant, and made from a single piece of full-grain leather for maximum durability.",
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
    image: "/Leather Product -frames/frame-0240.jpg",
  },
];

export default function SignatureCollection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderTextRef = useRef<HTMLSpanElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const isMobileRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Render frame to canvas (Desktop only)
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
    const ratio = Math.max(hRatio, vRatio); // Use max to 'cover' since it's a backdrop
    const sx = (rect.width - img.width * ratio) / 2;
    const sy = (rect.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, sx, sy, img.width * ratio, img.height * ratio);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobileRef.current) return;
    const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(latest * FRAME_COUNT)));
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  // Preload images
  useEffect(() => {
    isMobileRef.current = window.innerWidth <= 768;
    if (isMobileRef.current) return;

    let loaded = 0;
    const images: HTMLImageElement[] = [];

    // The frames are 1-indexed up to 240
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = FRAME_URL(i);
      img.onload = () => {
        loaded++;
        if (loaderTextRef.current) {
          loaderTextRef.current.textContent = `Loading collection... ${Math.round((loaded / FRAME_COUNT) * 100)}%`;
        }
        if (loaded === 10) {
          renderFrame(0);
        }
        if (loaded >= FRAME_COUNT) {
          if (loaderRef.current) {
            loaderRef.current.style.opacity = "0";
            loaderRef.current.style.pointerEvents = "none";
          }
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Opacity & Y transforms for the 4 products
  const opacities = [
    useTransform(scrollYProgress, [0, 0.2, 0.25], [1, 1, 0], { clamp: true }),
    useTransform(scrollYProgress, [0.22, 0.27, 0.45, 0.5], [0, 1, 1, 0], { clamp: true }),
    useTransform(scrollYProgress, [0.47, 0.52, 0.7, 0.75], [0, 1, 1, 0], { clamp: true }),
    useTransform(scrollYProgress, [0.72, 0.77, 1], [0, 1, 1], { clamp: true }),
  ];

  const ys = [
    useTransform(scrollYProgress, [0, 0.2, 0.25], [0, 0, -20], { clamp: true }),
    useTransform(scrollYProgress, [0.22, 0.27, 0.45, 0.5], [20, 0, 0, -20], { clamp: true }),
    useTransform(scrollYProgress, [0.47, 0.52, 0.7, 0.75], [20, 0, 0, -20], { clamp: true }),
    useTransform(scrollYProgress, [0.72, 0.77, 1], [20, 0, 0], { clamp: true }),
  ];

  return (
    <section ref={containerRef} className={styles.wrapper} aria-label="Signature Collection">
      
      {/* Desktop Sticky Scroll Experience */}
      <div className={styles.sticky}>
        
        {/* Left 60%: Canvas */}
        <div className={styles.canvasWrapper}>
          <canvas ref={canvasRef} className={styles.canvas} />
          <div ref={loaderRef} className={styles.loader}>
            <div className={styles.loaderSpinner} />
            <span ref={loaderTextRef}>Loading collection... 0%</span>
          </div>
        </div>

        {/* Right 40%: Text Panel */}
        <div className={styles.textPanel}>
          {PRODUCTS.map((product, i) => {
            const opacity = opacities[i];
            const y = ys[i];
            const pointerEvents = useTransform(opacity, (v) => (v === 0 ? "none" : "auto"));

            return (
              <motion.div
                key={product.id}
                className={styles.productCard}
                style={{ opacity, y, pointerEvents }}
              >
                <span className={styles.kicker}>{product.kicker}</span>
                <h2 className={styles.title}>{product.title}</h2>
                <p className={styles.tagline}>"{product.tagline}"</p>
                <p className={styles.desc}>{product.desc}</p>
                <Link href={product.link} className={`btn btn-primary ${styles.cta}`}>
                  Shop Collection
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile Fallback: Vertical Stack */}
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
              <p className={styles.tagline} style={{ fontSize: "1.2rem" }}>
                "{product.tagline}"
              </p>
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
