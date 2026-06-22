import { Metadata } from "next";
import ProductDetail from "@/components/product/ProductDetail";
import styles from "./product.module.css";

// Static product data for initial build — replace with DB fetch
const PRODUCTS: Record<string, {
  id: number; name: string; slug: string; price: number; images: string[];
  category: string; description: string; material: string; dimensions: string;
  inStock: boolean; allowEmbossing: boolean;
}> = {
  "classic-bifold-wallet": {
    id: 1, name: "Classic Bifold Wallet", slug: "classic-bifold-wallet", price: 2800,
    images: ["/products/wallet.png"],
    category: "Wallets",
    description: "A timeless bifold wallet crafted from premium full-grain cowhide leather. Features 6 card slots, 2 bill compartments, and a slim profile that fits comfortably in any pocket. The leather is hand-stitched with waxed thread that outlasts the wallet itself. As you use it daily, it develops a rich, unique patina — no two wallets age the same way.",
    material: "Full-Grain Cowhide Leather", dimensions: "11cm × 9cm × 1.2cm",
    inStock: true, allowEmbossing: true,
  },
  "slim-card-holder": {
    id: 3, name: "Slim Card Holder", slug: "slim-card-holder", price: 1400,
    images: ["/products/cardholder.png"],
    category: "Cardholders",
    description: "A slim, minimalist card holder for those who prefer to carry only what's essential. Holds 4–6 cards with ease. The snap-fit leather construction keeps cards secure without bulk. Ideal for daily carry or as a complement to a larger wallet.",
    material: "Full-Grain Cowhide Leather", dimensions: "9.5cm × 6.5cm × 0.6cm",
    inStock: true, allowEmbossing: true,
  },
  "executive-belt-35mm": {
    id: 4, name: "Executive Belt — 35mm", slug: "executive-belt-35mm", price: 3200,
    images: ["/products/belt.png"],
    category: "Belts",
    description: "A refined 35mm dress belt cut from a single piece of full-grain leather. Fitted with a solid brass pin-buckle, polished to a warm gold finish. The belt is pre-shaped for comfort and will soften and conform to your body over time. Suitable for formal and smart-casual wear.",
    material: "Full-Grain Cowhide Leather · Brass Buckle", dimensions: "Available: 30\"–42\"",
    inStock: true, allowEmbossing: false,
  },
  "a5-leather-diary-cover": {
    id: 5, name: "A5 Leather Diary Cover", slug: "a5-leather-diary-cover", price: 2200,
    images: ["/products/diary.png"],
    category: "Diary Covers",
    description: "A beautifully crafted A5 leather journal cover with pen loop and elastic closure. Accepts any standard A5 insert or refill. The full-grain leather surface is untreated to allow natural ageing. An excellent gift for professionals, writers, or anyone who values the written word.",
    material: "Full-Grain Cowhide Leather", dimensions: "Fits A5 (21cm × 15cm)",
    inStock: true, allowEmbossing: true,
  },
  "signature-gift-set": {
    id: 6, name: "The Signature Gift Set", slug: "signature-gift-set", price: 4500,
    images: ["/products/gift-set.png"],
    category: "Gift Sets",
    description: "Our curated Signature Gift Set pairs a Classic Bifold Wallet with a Slim Card Holder, presented in a premium matte black gift box with ivory tissue and a gold ribbon. Optional custom embossing available on both pieces. Perfect for birthdays, promotions, anniversaries, or corporate gifting.",
    material: "Full-Grain Cowhide Leather · Gift Box Included", dimensions: "Box: 22cm × 16cm × 5cm",
    inStock: true, allowEmbossing: true,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS[slug];
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — Papa Roma Leather`,
    description: product.description.slice(0, 160),
    openGraph: { title: product.name, images: product.images[0] },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS[slug];

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Product not found</h1>
        <p>The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <a href="/shop" className="btn btn-primary">Back to Shop</a>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <ProductDetail product={product} />
      </div>
    </div>
  );
}
