import Image from "next/image";
import styles from "./CraftStory.module.css";

const STATS = [
  { value: "100%", label: "Full-Grain Leather" },
  { value: "Hand", label: "Stitched" },
  { value: "2–3", label: "Day Dispatch" },
];

export default function CraftStory() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="craft-heading">
      <div className={`container ${styles.inner}`}>
        {/* Image side */}
        <div className={styles.imageCol}>
          <div className={styles.imageWrap}>
            <Image
              src="/craft-texture.png"
              alt="Close-up of premium full-grain leather texture and stitching"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.img}
            />
          </div>
          {/* Floating stat card */}
          <div className={styles.statCard}>
            <span className={styles.statCardValue}>10+</span>
            <span className={styles.statCardLabel}>Years of craft</span>
          </div>
        </div>

        {/* Text side */}
        <div className={styles.textCol}>
          <span className="label-caps">Our Craft</span>
          <hr className="divider-gold" style={{ margin: "1rem 0" }} />
          <h2 id="craft-heading" className={styles.title}>
            Leather That Tells <em>Your Story</em>
          </h2>
          <p className={styles.body}>
            Full-grain leather is the finest, most durable cut from the hide. Unlike
            corrected or bonded leather, it retains the natural surface — complete
            with its unique markings and grain. As you use it, it develops a rich patina
            that makes each piece uniquely yours.
          </p>
          <p className={styles.body}>
            Every Papa Roma product is hand-stitched with saddle thread for strength
            that outlasts machine stitching. We believe the things you carry every day
            should earn character, not show wear.
          </p>

          {/* Stats strip */}
          <div className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
