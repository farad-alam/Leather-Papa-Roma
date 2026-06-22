import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import styles from "./FeaturedProducts.module.css";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  allowEmbossing: boolean;
};

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="section" aria-labelledby="featured-heading">
      <div className="container">
        <div className={styles.header}>
          <div>
            <span className="label-caps">Featured</span>
            <h2 id="featured-heading" className={styles.title}>
              Our Most Loved Pieces
            </h2>
          </div>
          <Link href="/shop" className="btn btn-outline">
            View All Products
          </Link>
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
