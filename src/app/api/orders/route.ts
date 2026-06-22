import { NextRequest, NextResponse } from "next/server";

// Orders API — POST creates a new order
// Will connect to Neon DB via Drizzle once DATABASE_URL is set
// For now returns a mock success to validate the checkout flow

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const required = ["orderNumber", "customerName", "customerPhone", "customerAddress", "district", "items", "subtotal", "shippingFee", "total", "paymentMethod"];
    for (const field of required) {
      if (!body[field] && body[field] !== 0) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }

    // Validate TrxID for digital payments
    if ((body.paymentMethod === "bkash" || body.paymentMethod === "nagad") && !body.transactionId) {
      return NextResponse.json({ error: "Transaction ID is required for bKash/Nagad orders" }, { status: 400 });
    }

    // TODO: Insert into Neon DB via Drizzle
    // const order = await db.insert(orders).values({ ... }).returning();

    // For now: log order and return success
    console.log("[ORDER CREATED]", {
      orderNumber: body.orderNumber,
      customer: body.customerName,
      phone: body.customerPhone,
      total: body.total,
      payment: body.paymentMethod,
      txnId: body.transactionId,
      status: body.status,
    });

    return NextResponse.json(
      { success: true, orderNumber: body.orderNumber },
      { status: 201 }
    );
  } catch (error) {
    console.error("[ORDER ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  // TODO: Fetch orders from Neon DB
  return NextResponse.json({ orders: [] });
}
