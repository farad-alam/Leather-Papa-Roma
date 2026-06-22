import Link from "next/link";
import styles from "./Footer.module.css";

const CATEGORIES = [
  { label: "Wallets", href: "/shop/wallets" },
  { label: "Cardholders", href: "/shop/cardholders" },
  { label: "Belts", href: "/shop/belts" },
  { label: "Diary Covers", href: "/shop/diary-covers" },
  { label: "Pen Holders", href: "/shop/pen-holders" },
  { label: "Gift Sets", href: "/shop/gift-sets" },
];

const LINKS = [
  { label: "Our Craft", href: "/about" },
  { label: "Gift Guide", href: "/gift-guide" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to place an order or ask about your leather products.")}`;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Brand column */}
        <div className={styles.brand}>
          <div className={styles.logoBlock}>
            <span className={styles.logoMain}>PAPA ROMA</span>
            <span className={styles.logoDivider} />
            <span className={styles.logoSub}>LEATHER</span>
          </div>
          <p className={styles.tagline}>
            Full-grain leather goods, crafted for those who appreciate the real thing.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-whatsapp btn-sm ${styles.whatsappBtn}`}
          >
            <WhatsAppIcon /> Chat on WhatsApp
          </a>
        </div>

        {/* Shop column */}
        <div className={styles.col}>
          <h3 className={`label-caps ${styles.colTitle}`}>Shop</h3>
          <ul className={styles.linkList}>
            {CATEGORIES.map((cat) => (
              <li key={cat.href}>
                <Link href={cat.href} className={styles.footerLink}>
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info column */}
        <div className={styles.col}>
          <h3 className={`label-caps ${styles.colTitle}`}>Information</h3>
          <ul className={styles.linkList}>
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.footerLink}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Payment column */}
        <div className={styles.col}>
          <h3 className={`label-caps ${styles.colTitle}`}>We Accept</h3>
          <div className={styles.paymentBadges}>
            <div className={styles.payBadge} style={{ background: "#E2136E" }}>
              <span className={styles.payText}>bKash</span>
            </div>
            <div className={styles.payBadge} style={{ background: "#F26522" }}>
              <span className={styles.payText}>Nagad</span>
            </div>
            <div className={styles.payBadge} style={{ background: "#2d7a3a" }}>
              <span className={styles.payText}>COD</span>
            </div>
          </div>
          <p className={styles.shipping}>
            📦 Ships across Bangladesh<br />
            Dhaka: ৳80 · Outside: ৳150
          </p>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Papa Roma Leather. Crafted with pride in Bangladesh.
          </p>
          <p className={styles.madeIn}>🇧🇩 Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}
