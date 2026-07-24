import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Papa Roma Leather — Premium Full-Grain Leather Goods Bangladesh",
    template: "%s | Papa Roma Leather",
  },
  description:
    "Premium full-grain leather goods with optional custom embossing — wallets, cardholders, belts, diary covers, and more. Crafted for professionals and gift-buyers across Bangladesh. Order via cart or WhatsApp.",
  keywords: [
    "leather goods Bangladesh",
    "full grain leather wallet",
    "leather cardholder Bangladesh",
    "custom embossing leather",
    "leather belt Bangladesh",
    "leather diary cover",
    "leather gift Bangladesh",
    "premium leather accessories Dhaka",
  ],
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Papa Roma Leather",
    title: "Papa Roma Leather — Premium Full-Grain Leather Goods",
    description:
      "Crafted full-grain leather goods with custom embossing, for professionals and gift-buyers across Bangladesh.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Papa Roma Leather",
    description: "Premium full-grain leather goods from Bangladesh.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
