"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import styles from "./HeroSection.module.css";

const FRAME_COUNT = 285;
const FRAME_URL = (index: number) => 
  `/Hero%20Scroll%20animation%20images/ezgif-frame-${index.toString().padStart(3, "0")}.jpg`;

export default function HeroSection() {
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to order a leather product.")}`;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // State for image preloading
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Preload images
  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => window.innerWidth <= 768;
    setIsMobile(checkMobile());
    if (checkMobile()) return; // Skip heavy preload on mobile

    let loaded = 0;
    const images: HTMLImageElement[] = [];

    // Preload all frames
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = FRAME_URL(i);
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded > 10) {
          // We can start once we have the first few frames
          setIsReady(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Render to canvas
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (canvas && img && img.complete) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Adjust for device pixel ratio for retina screens
        const dpr = window.devicePixelRatio || 1;
        
        // Only set canvas dimensions if they've changed to avoid clearing
        const rect = canvas.getBoundingClientRect();
        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
           canvas.width = rect.width * dpr;
           canvas.height = rect.height * dpr;
           ctx.scale(dpr, dpr);
        }

        // Draw image keeping aspect ratio (object-fit: contain equivalent)
        const hRatio = rect.width / img.width;
        const vRatio = rect.height / img.height;
        const ratio = Math.min(hRatio, vRatio);
        const centerShift_x = (rect.width - img.width * ratio) / 2;
        const centerShift_y = (rect.height - img.height * ratio) / 2;

        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.drawImage(img, 0, 0, img.width, img.height,
          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      }
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile) return;
    // Map progress 0-1 to frame index 0-284
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(latest * FRAME_COUNT))
    );
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  // Initial draw once ready
  useEffect(() => {
    if (isReady && !isMobile) {
      renderFrame(0);
    }
  }, [isReady, isMobile]);


  // Progressive fade-in animations mapped to scrollYProgress
  // Kicker fades in 10% - 20%
  const kickerOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const kickerY = useTransform(scrollYProgress, [0.1, 0.2], [30, 0]);

  // Headline fades in 30% - 40%
  const headlineOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0.3, 0.4], [30, 0]);

  // Subtext fades in 50% - 60%
  const subOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.5, 0.6], [30, 0]);

  // CTAs fade in 70% - 80%
  const ctaOpacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.7, 0.8], [30, 0]);

  return (
    <section ref={containerRef} className={styles.heroWrapper} aria-label="Hero">
      <div className={styles.stickyContainer}>
        
        {/* Canvas for Desktop */}
        <canvas ref={canvasRef} className={styles.canvas} />

        {/* Fallback Static Image for Mobile */}
        <div className={styles.staticBg}>
          <Image
            src="/hero.png"
            alt="Premium full-grain leather goods by Papa Roma Leather"
            fill
            priority
            sizes="100vw"
            className={styles.bgImg}
          />
        </div>
        
        <div className={styles.overlay} />

        {/* Loader Overlay (desktop only) */}
        {!isMobile && !isReady && (
          <div className={styles.loader}>
            <div className={styles.loaderSpinner} />
            <span>Loading experience... {Math.round((loadedCount / FRAME_COUNT) * 100)}%</span>
          </div>
        )}

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.inner}>
            
            <motion.span 
              className={styles.kicker}
              style={{ opacity: isMobile ? 1 : kickerOpacity, y: isMobile ? 0 : kickerY }}
              initial={isMobile ? { opacity: 0, y: 30 } : false}
              animate={isMobile ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.8 }}
            >
              Full-Grain Leather · Handcrafted in Bangladesh
            </motion.span>

            <h1 className={styles.headline}>
              <motion.span 
                style={{ display: "block", opacity: isMobile ? 1 : headlineOpacity, y: isMobile ? 0 : headlineY }}
                initial={isMobile ? { opacity: 0, y: 30 } : false}
                animate={isMobile ? { opacity: 1, y: 0 } : false}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Crafted to Last.
              </motion.span>
              <motion.em 
                style={{ display: "block", opacity: isMobile ? 1 : headlineOpacity, y: isMobile ? 0 : headlineY }}
                initial={isMobile ? { opacity: 0, y: 30 } : false}
                animate={isMobile ? { opacity: 1, y: 0 } : false}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Signed by You.
              </motion.em>
            </h1>

            <motion.p 
              className={styles.sub}
              style={{ opacity: isMobile ? 1 : subOpacity, y: isMobile ? 0 : subY }}
              initial={isMobile ? { opacity: 0, y: 30 } : false}
              animate={isMobile ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Premium leather wallets, cardholders, belts &amp; diary covers —
              with optional custom embossing for a personal touch.
            </motion.p>

            <motion.div 
              className={styles.ctas}
              style={{ opacity: isMobile ? 1 : ctaOpacity, y: isMobile ? 0 : ctaY }}
              initial={isMobile ? { opacity: 0, y: 30 } : false}
              animate={isMobile ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/shop" className="btn btn-primary btn-lg">
                Shop Collection
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-lg"
              >
                <WhatsAppIcon /> Order via WhatsApp
              </a>
            </motion.div>

            {/* Trust strip (fades in with CTAs) */}
            <motion.div 
              className={styles.trust}
              style={{ opacity: isMobile ? 1 : ctaOpacity, y: isMobile ? 0 : ctaY }}
              initial={isMobile ? { opacity: 0, y: 30 } : false}
              animate={isMobile ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {["100% Full-Grain Leather", "Custom Embossing Available", "Ships Across Bangladesh"].map(
                (item) => (
                  <span key={item} className={styles.trustItem}>
                    <CheckIcon /> {item}
                  </span>
                )
              )}
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator (fades out slightly on scroll) */}
        <motion.div
          className={styles.scrollIndicator}
          aria-hidden="true"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        >
          <div className={styles.scrollLine} />
          <span className={styles.scrollLabel}>Scroll</span>
        </motion.div>

      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.437-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
