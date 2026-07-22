import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CraftStory from "@/components/home/CraftStory";
import EmbossingBanner from "@/components/home/EmbossingBanner";
import GiftGuideTeaser from "@/components/home/GiftGuideTeaser";
import Testimonials from "@/components/home/Testimonials";
import MarqueeTicker from "@/components/home/MarqueeTicker";

export const metadata: Metadata = {
  title: "Papa Roma Leather — Premium Full-Grain Leather Goods Bangladesh",
  description:
    "Premium full-grain leather wallets, cardholders, belts, diary covers and more — with optional custom embossing. Crafted for professionals and gift-buyers across Bangladesh. bKash, Nagad & COD accepted.",
};

// Mock featured products for initial build
const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Classic Bifold Wallet",
    slug: "classic-bifold-wallet",
    price: 2800,
    image: "/products/wallet.png",
    category: "Wallets",
    inStock: true,
    allowEmbossing: true,
  },
  {
    id: 2,
    name: "Slim Card Holder",
    slug: "slim-card-holder",
    price: 1400,
    image: "/products/cardholder.png",
    category: "Cardholders",
    inStock: true,
    allowEmbossing: true,
  },
  {
    id: 3,
    name: "Executive Belt",
    slug: "executive-belt",
    price: 3200,
    image: "/products/belt.png",
    category: "Belts",
    inStock: true,
    allowEmbossing: false,
  },
  {
    id: 4,
    name: "Leather Diary Cover",
    slug: "leather-diary-cover",
    price: 2200,
    image: "/products/diary.png",
    category: "Diary Covers",
    inStock: true,
    allowEmbossing: true,
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <MarqueeTicker />
      <FeaturedProducts products={FEATURED_PRODUCTS} />
      <CraftStory />
      <EmbossingBanner />
      <GiftGuideTeaser />
      <Testimonials />
    </>
  );
}
