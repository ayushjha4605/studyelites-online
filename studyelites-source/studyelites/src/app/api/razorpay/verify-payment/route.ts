import { NextRequest, NextResponse } from "next/server";
import { getRazorpay, getCatalogItem, verifyPaymentSignature } from "@/lib/razorpay";

/**
 * POST /api/razorpay/verify-payment
 *
 * Body: {
 *   razorpay_order_id: string,
 *   razorpay_payment_id: string,
 *   razorpay_signature: string,
 *   itemId: string
 * }
 *
 * Verifies the HMAC signature returned by Razorpay checkout against the
 * server-side secret. Only after signature verification succeeds do we
 * "release" the digital product / membership to the buyer.
 *
 * For membership items we additionally return the private Telegram invite link
 * (read from process.env.TELEGRAM_GROUP_LINK).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      itemId,
    } = body ?? {};

    if (
      typeof razorpay_order_id !== "string" ||
      typeof razorpay_payment_id !== "string" ||
      typeof razorpay_signature !== "string" ||
      typeof itemId !== "string"
    ) {
      return NextResponse.json(
        { error: "Missing payment parameters." },
        { status: 400 }
      );
    }

    const item = getCatalogItem(itemId);
    if (!item) {
      return NextResponse.json(
        { error: "Invalid item reference." },
        { status: 400 }
      );
    }

    // 1) Verify the cryptographic signature — this proves the payment really
    //    came from Razorpay and was not tampered with.
    const ok = verifyPaymentSignature({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    if (!ok) {
      return NextResponse.json(
        { error: "Payment verification failed. Please contact support." },
        { status: 400 }
      );
    }

    // 2) Fetch the order from Razorpay to cross-check the amount actually
    //    paid matches the catalog price for this item.
    const razorpay = getRazorpay();
    const order = (await razorpay.orders.fetch(razorpay_order_id)) as {
      amount?: number;
      currency?: string;
      status?: string;
      amount_paid?: number;
    };

    if (
      !order ||
      order.amount !== item.amount ||
      order.amount_paid !== item.amount
    ) {
      return NextResponse.json(
        { error: "Payment amount mismatch. Please contact support." },
        { status: 400 }
      );
    }

    // 3) Success. For membership items, attach the Telegram access link.
    let telegramLink: string | undefined;
    if (item.kind === "membership") {
      telegramLink = process.env.TELEGRAM_GROUP_LINK;
      if (!telegramLink) {
        // Payment is valid; we just couldn't resolve the link server-side.
        console.warn(
          "[razorpay/verify-payment] TELEGRAM_GROUP_LINK is not set in .env"
        );
      }
    }

    return NextResponse.json({
      success: true,
      itemId: item.id,
      itemName: item.name,
      kind: item.kind,
      amount: item.amount,
      currency: item.currency,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      telegramLink,
    });
  } catch (err) {
    console.error("[razorpay/verify-payment] error:", err);
    return NextResponse.json(
      { error: "Unable to verify payment right now. Please contact support." },
      { status: 500 }
    );
  }
}
