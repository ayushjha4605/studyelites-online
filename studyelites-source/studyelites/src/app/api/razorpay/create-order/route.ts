import { NextRequest, NextResponse } from "next/server";
import { getRazorpay, getCatalogItem } from "@/lib/razorpay";

/**
 * POST /api/razorpay/create-order
 *
 * Body: { itemId: string }
 *
 * Creates a Razorpay order for the given catalog item. The order amount is
 * read from the server-side CATALOG (never trusted from the client), so the
 * price cannot be tampered with.
 *
 * Returns: { orderId, amount, currency, keyId, itemName, itemId, kind }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const itemId = typeof body?.itemId === "string" ? body.itemId : "";

    const item = getCatalogItem(itemId);
    if (!item) {
      return NextResponse.json(
        { error: "Invalid item. Please choose a valid product." },
        { status: 400 }
      );
    }

    const razorpay = getRazorpay();

    const order = await razorpay.orders.create({
      amount: item.amount,
      currency: item.currency,
      receipt: `se_${item.id}_${Date.now()}`,
      notes: {
        item_id: item.id,
        item_name: item.name,
        kind: item.kind,
        source: "studyelites.online",
      },
    });

    if (!order || !(order as { id?: string }).id) {
      return NextResponse.json(
        { error: "Failed to create payment order. Please try again." },
        { status: 502 }
      );
    }

    // Only the public key id is exposed to the client — never the secret.
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!keyId) {
      return NextResponse.json(
        { error: "Payment gateway is not configured. Please contact support." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      orderId: (order as { id: string }).id,
      amount: item.amount,
      currency: item.currency,
      keyId,
      itemName: item.name,
      itemId: item.id,
      kind: item.kind,
    });
  } catch (err) {
    console.error("[razorpay/create-order] error:", err);
    return NextResponse.json(
      { error: "Unable to initiate payment right now. Please try again later." },
      { status: 500 }
    );
  }
}
