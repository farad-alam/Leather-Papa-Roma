import type { Metadata } from "next";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact Us — Papa Roma Leather",
  description: "Get in touch with Papa Roma Leather. We're here to help with orders, custom embossing requests, and corporate gifting.",
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I have a question about Papa Roma Leather.")}`;

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <span className="label-caps">Get in Touch</span>
          <h1 className={styles.title}>We&apos;re Here to Help</h1>
          <p className={styles.subtitle}>
            Whether you have a question about our leather, need help with an order,
            or want to discuss a corporate gift, we&apos;re just a message away.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Contact Methods */}
          <div className={styles.methods}>
            <div className={styles.card}>
              <div className={styles.icon}>📱</div>
              <h2>WhatsApp (Fastest)</h2>
              <p>Message us directly for the quickest response regarding orders or custom embossing.</p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                Chat on WhatsApp
              </a>
            </div>

            <div className={styles.card}>
              <div className={styles.icon}>✉️</div>
              <h2>Email</h2>
              <p>For business inquiries, corporate gifting, or detailed questions.</p>
              <a href="mailto:hello@paparomaleather.com" className="btn btn-outline">
                hello@paparomaleather.com
              </a>
            </div>

            <div className={styles.card}>
              <div className={styles.icon}>🕒</div>
              <h2>Hours</h2>
              <p>
                <strong>Saturday – Thursday:</strong> 10:00 AM – 8:00 PM<br />
                <strong>Friday:</strong> Closed
              </p>
            </div>
          </div>

          {/* FAQs */}
          <div className={styles.faqs}>
            <h2>Frequently Asked Questions</h2>
            
            <div className={styles.faq}>
              <h3>How long does delivery take?</h3>
              <p>Inside Dhaka: 2-3 business days. Outside Dhaka: 3-5 business days via Pathao/Steadfast.</p>
            </div>

            <div className={styles.faq}>
              <h3>Do you offer Cash on Delivery?</h3>
              <p>Yes, we offer Cash on Delivery (COD) across Bangladesh. You can also pay in advance via bKash or Nagad.</p>
            </div>

            <div className={styles.faq}>
              <h3>How does custom embossing work?</h3>
              <p>Select the embossing option on the product page, checkout, and we will contact you via WhatsApp to confirm the exact text, font, and placement before we emboss your item.</p>
            </div>

            <div className={styles.faq}>
              <h3>What is your return policy?</h3>
              <p>We accept returns within 3 days of delivery if the product is defective or damaged. Custom embossed items cannot be returned unless defective.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
