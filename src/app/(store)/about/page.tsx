import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "Our Craft — Papa Roma Leather",
  description: "Learn about the heritage of Papa Roma Leather. We craft premium full-grain leather goods for those who appreciate the real thing.",
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroBg}>
          <Image src="/craft-texture.png" alt="Leather craft" fill style={{ objectFit: "cover" }} priority />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.title}>Our Craft</h1>
          <p className={styles.subtitle}>
            Built on a simple belief: the things you carry every day should
            earn character, not show wear.
          </p>
        </div>
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.grid}>
          {/* Text Col */}
          <div className={styles.textCol}>
            <span className="label-caps">The Papa Roma Standard</span>
            <h2>Why Full-Grain Leather?</h2>
            <p>
              Most leather products on the market today are made from "genuine leather" or
              bonded leather — essentially the scraps and lower layers of the hide,
              glued together and painted to look uniform. They look fine on day one,
              but peel and crack within months.
            </p>
            <p>
              We exclusively use <strong>full-grain leather</strong>. It is the top layer
              of the hide, retaining all its natural strength and grain. Because the surface
              isn't sanded away, it absorbs oils from your hands and develops a rich patina
              over time. It doesn't wear out; it wears in.
            </p>

            <h2 style={{ marginTop: "2rem" }}>The Craft</h2>
            <p>
              Great materials demand great craftsmanship. We use traditional saddle-stitching
              methods for our core pieces. Unlike machine lock-stitching (where one broken
              loop unravels the whole seam), saddle stitching uses two needles passing from
              opposite sides. If a thread ever breaks, the rest holds firm.
            </p>
            <p>
              Edges are burnished by hand until smooth, then sealed with natural waxes.
              It's a slow process, but it produces a piece that will outlast anything
              mass-produced.
            </p>

            <div className={styles.signature}>
              — The Papa Roma Team
            </div>

            <div className={styles.cta}>
              <Link href="/shop" className="btn btn-primary">
                Explore the Collection
              </Link>
            </div>
          </div>

          {/* Image Col */}
          <div className={styles.imageCol}>
            <div className={styles.imageWrap}>
              <Image
                src="/hero.png"
                alt="Papa Roma leather goods collection"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.imageWrap}>
              <Image
                src="/products/wallet.png"
                alt="Close up of wallet stitching"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
