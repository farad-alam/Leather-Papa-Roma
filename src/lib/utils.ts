/**
 * Format a price integer (BDT) to Bengali Taka display string
 * e.g. 2500 → "৳2,500"
 */
export function formatPrice(amount: number): string {
  return `৳${amount.toLocaleString("en-BD")}`;
}

/**
 * Generate an order number in the format PR-YYYYMMDD-XXXX
 */
export function generateOrderNumber(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `PR-${dateStr}-${rand}`;
}

/**
 * Slugify a string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Build a pre-filled WhatsApp URL
 */
export function buildWhatsAppUrl(message: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

/**
 * Get the shipping fee for a district
 * Dhaka district → ৳80, everything else → ৳150
 */
export function getShippingFee(district: string): number {
  const dhakaDistricts = ["Dhaka"];
  const isDhaka = dhakaDistricts.some((d) =>
    district.toLowerCase().includes(d.toLowerCase())
  );
  return isDhaka
    ? Number(process.env.NEXT_PUBLIC_SHIPPING_DHAKA ?? 80)
    : Number(process.env.NEXT_PUBLIC_SHIPPING_OUTSIDE ?? 150);
}

/**
 * Bangladesh districts list
 */
export const BD_DISTRICTS = [
  "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura",
  "Brahmanbaria", "Chandpur", "Chapai Nawabganj", "Chattogram", "Chuadanga",
  "Cox's Bazar", "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni",
  "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore",
  "Jhalokati", "Jhenaidah", "Joypurhat", "Khagrachhari", "Khulna", "Kishoreganj",
  "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura",
  "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon",
  "Narail", "Narayanganj", "Narsingdi", "Natore", "Netrokona", "Nilphamari",
  "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari",
  "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur",
  "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon",
].sort();
