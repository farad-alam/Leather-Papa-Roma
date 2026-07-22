"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/gift-guide", label: "Gift Guide" },
  { href: "/about", label: "Our Craft" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { toggleCart, itemCount } = useCartStore();
  const count = itemCount();
  const menuRef = useRef<HTMLDivElement>(null);

  // Transparent on hero pages only
  const isHeroPage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // 300vh hero section on homepage, 60px threshold elsewhere.
      const threshold = isHeroPage ? window.innerHeight * 2.8 : 60;
      setScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHeroPage]);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to enquire about your leather products.")}`;

  const navClass = [
    styles.navbar,
    scrolled || !isHeroPage ? styles.solid : styles.transparent,
  ].join(" ");

  return (
    <>
      <header className={navClass} role="banner">
        <div className={styles.inner}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="Papa Roma Leather — Home">
            <div className={styles.logoText}>
              <span className={styles.logoMain}>PAPA ROMA</span>
              <span className={styles.logoDivider} />
              <span className={styles.logoSub}>LEATHER</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className={styles.nav} aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  styles.navLink,
                  pathname.startsWith(link.href) ? styles.active : "",
                ].join(" ")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconBtn}
              aria-label="Order via WhatsApp"
              title="Order via WhatsApp"
            >
              <WhatsAppIcon />
            </a>

            {/* Cart */}
            <button
              className={styles.cartBtn}
              onClick={toggleCart}
              aria-label={`Shopping cart, ${count} item${count !== 1 ? "s" : ""}`}
            >
              <CartIcon />
              {count > 0 && (
                <span className={styles.cartBadge} aria-live="polite">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <>
          <div
            className={styles.mobileOverlay}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div className={styles.mobileMenu} ref={menuRef} role="dialog" aria-label="Navigation menu">
            <button
              className={styles.closeBtn}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
            <div className={styles.mobileLogo}>
              <span className={styles.logoMain}>PAPA ROMA</span>
              <span className={styles.logoDivider} />
              <span className={styles.logoSub}>LEATHER</span>
            </div>
            <nav className={styles.mobileNav} aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.mobileNavLink}
                  style={{ animationDelay: `${i * 60}ms` }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-whatsapp ${styles.mobileWhatsApp}`}
              onClick={() => setMenuOpen(false)}
            >
              <WhatsAppIcon /> Order via WhatsApp
            </a>
          </div>
        </>
      )}
    </>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
