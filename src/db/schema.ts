import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─── Categories ──────────────────────────────────────────────────────────────

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  imageUrl: text("image_url"),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Products ────────────────────────────────────────────────────────────────

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  description: text("description"),
  shortDescription: text("short_description"),
  price: integer("price").notNull(), // BDT integer e.g. 2500 = ৳2,500
  images: text("images").array().notNull().default([]),
  inStock: boolean("in_stock").default(true).notNull(),
  featured: boolean("featured").default(false).notNull(),
  allowEmbossing: boolean("allow_embossing").default(false).notNull(),
  tags: text("tags").array().default([]),
  material: text("material").default("Full-Grain Leather"),
  dimensions: text("dimensions"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Orders ──────────────────────────────────────────────────────────────────

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").unique().notNull(),
  // Customer details
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerAddress: text("customer_address").notNull(),
  district: text("district").notNull(),
  specialInstructions: text("special_instructions"),
  // Order items as JSON
  items: jsonb("items").notNull(), // [{ productId, name, slug, image, price, qty, embossingRequested }]
  // Pricing
  subtotal: integer("subtotal").notNull(),
  shippingFee: integer("shipping_fee").notNull(),
  total: integer("total").notNull(),
  // Payment
  paymentMethod: text("payment_method").notNull(), // 'bkash' | 'nagad' | 'cod'
  transactionId: text("transaction_id"), // null for COD
  // Status
  status: text("status").notNull().default("PENDING_VERIFICATION"),
  // 'PENDING_VERIFICATION' | 'PENDING_DELIVERY' | 'VERIFIED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  // Flags
  embossingRequested: boolean("embossing_requested").default(false),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Relations ───────────────────────────────────────────────────────────────

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));

// ─── Types (inferred) ────────────────────────────────────────────────────────

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export type OrderItem = {
  productId: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  qty: number;
  embossingRequested: boolean;
};

export type OrderStatus =
  | "PENDING_VERIFICATION"
  | "PENDING_DELIVERY"
  | "VERIFIED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";
