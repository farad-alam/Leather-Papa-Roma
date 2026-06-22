export type CartItem = {
  productId: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  qty: number;
  embossingRequested: boolean;
};

export type PaymentMethod = "bkash" | "nagad" | "cod";

export type CheckoutFormData = {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  district: string;
  specialInstructions: string;
  paymentMethod: PaymentMethod;
  transactionId?: string;
};

export type ProductWithCategory = {
  id: number;
  name: string;
  slug: string;
  categoryId: number | null;
  description: string | null;
  shortDescription: string | null;
  price: number;
  images: string[];
  inStock: boolean;
  featured: boolean;
  allowEmbossing: boolean;
  tags: string[] | null;
  material: string | null;
  dimensions: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  category?: {
    id: number;
    name: string;
    slug: string;
  } | null;
};
