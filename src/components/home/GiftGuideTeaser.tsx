import Link from "next/link";
import Image from "next/image";
import styles from "./GiftGuideTeaser.module.css";

const GIFT_CARDS = [
  {
    id: "him",
    label: "Gift for Him",
    desc: "Wallets, belts & cardholders — timeless everyday essentials.",
    href: "/gift-guide#for-him",
    image: "/products/wallet.png",
  },
  {
    id: "her",
    label: "Gift for Her",
    desc: "Elegant diary covers, cardholders & delicate accessories.",
    href: "/gift-guide#for-her",
    image: "/products/diary.png",
  },
  {
    id: "corporate",
    label: "Corporate Gifts",
    desc: "Branded, embossed leather gifts for teams & clients.",
    href: "/gift-guide#corporate",
    image: "/products/gift-set.png",
  },
];

export default function GiftGuideTeaser() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="gift-heading">
      <div className="container">
        <div className={styles.header}>
          <span className="label-caps">Gift Guide</span>
          <h2 id="gift-heading" className={styles.title}>
            The Gift That <em>Says Something</em>
          </h2>
          <p className={styles.sub}>
            Full-grain leather ages beautifully and becomes more personal over time —
            making it one of the most thoughtful gifts you can give.
          </p>
        </div>

        <div className={styles.grid}>
          {GIFT_CARDS.map((card) => (
            <Link key={card.id} href={card.href} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.img}
                />
                <div className={styles.overlay} />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{card.label}</h3>
                <p className={styles.cardDesc}>{card.desc}</p>
                <span className={styles.cardLink}>Explore →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.footer}>
          <Link href="/gift-guide" className="btn btn-primary">
            View Full Gift Guide
          </Link>
        </div>
      </div>
    </section>
  );
}
