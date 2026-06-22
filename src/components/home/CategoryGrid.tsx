import Link from "next/link";
import Image from "next/image";
import styles from "./CategoryGrid.module.css";

const CATEGORIES = [
  {
    name: "Wallets",
    slug: "wallets",
    image: "/products/wallet.png",
    span: "large",
  },
  {
    name: "Cardholders",
    slug: "cardholders",
    image: "/products/cardholder.png",
    span: "small",
  },
  {
    name: "Belts",
    slug: "belts",
    image: "/products/belt.png",
    span: "small",
  },
  {
    name: "Diary Covers",
    slug: "diary-covers",
    image: "/products/diary.png",
    span: "medium",
  },
  {
    name: "Gift Sets",
    slug: "gift-sets",
    image: "/products/gift-set.png",
    span: "medium",
  },
];

export default function CategoryGrid() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="categories-heading">
      <div className="container">
        <div className={styles.header}>
          <span className="label-caps">Browse by Category</span>
          <h2 id="categories-heading" className={styles.title}>
            A Collection Built for the Discerning Few
          </h2>
        </div>

        <div className={styles.grid}>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className={[styles.card, styles[cat.span]].join(" ")}
              aria-label={`Shop ${cat.name}`}
            >
              <div className="img-zoom-wrap" style={{ position: "absolute", inset: 0 }}>
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.img}
                />
              </div>
              <div className={styles.cardOverlay} />
              <div className={styles.cardLabel}>
                <span className={styles.cardName}>{cat.name}</span>
                <span className={styles.cardArrow}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
