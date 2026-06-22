import Link from "next/link";
import styles from "./EmbossingBanner.module.css";

export default function EmbossingBanner() {
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'm interested in custom embossing on a leather product.")}`;

  return (
    <section className={styles.section} aria-labelledby="embossing-heading">
      <div className={`container ${styles.inner}`}>
        {/* Decorative monogram preview */}
        <div className={styles.monogram} aria-hidden="true">
          <span className={styles.monogramLetter}>A</span>
          <span className={styles.monogramLabel}>Your Initials Here</span>
        </div>

        <div className={styles.content}>
          <span className={styles.kicker}>Custom Embossing & Monogramming</span>
          <h2 id="embossing-heading" className={styles.title}>
            Make It <em>Truly Yours</em>
          </h2>
          <p className={styles.body}>
            Add a personal touch — emboss a name, initials, or monogram on select
            leather pieces. Perfect for gifts that feel one-of-a-kind. Available on
            wallets, cardholders, diary covers, and more.
          </p>

          <div className={styles.steps}>
            {[
              { n: "01", label: "Choose your product" },
              { n: "02", label: "Toggle 'Add Embossing' on the product page" },
              { n: "03", label: "We'll confirm details via WhatsApp" },
            ].map((step) => (
              <div key={step.n} className={styles.step}>
                <span className={styles.stepNum}>{step.n}</span>
                <span className={styles.stepLabel}>{step.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.ctas}>
            <Link href="/shop" className="btn btn-primary btn-lg">
              Shop Embossable Items
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-lg"
            >
              Ask via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
