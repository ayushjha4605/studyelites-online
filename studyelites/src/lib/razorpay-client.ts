"use client";

/**
 * Loads the Razorpay checkout.js script on demand.
 * Cached so we only inject the <script> tag once.
 */
let _checkoutPromise: Promise<void> | null = null;

export function loadRazorpayCheckout(): Promise<void> {
  if (_checkoutPromise) return _checkoutPromise;

  _checkoutPromise = new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Razorpay cannot be loaded on the server."));
      return;
    }

    const existing = document.getElementById(
      "razorpay-checkout-script"
    ) as HTMLScriptElement | null;

    if (existing) {
      if ((window as unknown as { Razorpay?: unknown }).Razorpay) {
        resolve();
      } else {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () =>
          reject(new Error("Failed to load Razorpay checkout script."))
        );
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-checkout-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Razorpay checkout script."));
    document.head.appendChild(script);
  });

  return _checkoutPromise;
}

export type CreateOrderResponse = {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  itemName: string;
  itemId: string;
  kind: "product" | "membership";
};

export type VerifyPaymentResponse = {
  success: true;
  itemId: string;
  itemName: string;
  kind: "product" | "membership";
  amount: number;
  currency: string;
  orderId: string;
  paymentId: string;
  telegramLink?: string;
};

/**
 * Calls the backend to create a Razorpay order for the given item id.
 * The backend reads the authoritative amount from the server-side catalog
 * (the client never sends a price).
 */
export async function createOrder(itemId: string): Promise<CreateOrderResponse> {
  const res = await fetch("/api/razorpay/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || "Unable to create payment order.");
  }
  return data as CreateOrderResponse;
}

/**
 * Calls the backend to verify a Razorpay payment using HMAC signature
 * verification. Only after this returns success should the buyer be given
 * access to the digital product / Telegram community.
 */
export async function verifyPayment(params: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  itemId: string;
}): Promise<VerifyPaymentResponse> {
  const res = await fetch("/api/razorpay/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || "Payment verification failed.");
  }
  return data as VerifyPaymentResponse;
}

/**
 * Opens the Razorpay checkout modal for a given item, then verifies the
 * payment server-side. Resolves with the verification result.
 *
 * `onDismiss` is invoked if the user closes the checkout modal without paying.
 */
export async function startRazorpayCheckout(opts: {
  itemId: string;
  buyerName?: string;
  buyerEmail?: string;
  buyerPhone?: string;
  onDismiss?: () => void;
}): Promise<VerifyPaymentResponse> {
  const { itemId, buyerName, buyerEmail, buyerPhone, onDismiss } = opts;

  await loadRazorpayCheckout();

  const order = await createOrder(itemId);

  const verification = new Promise<VerifyPaymentResponse>((resolve, reject) => {
    const options: Record<string, unknown> = {
      key: order.keyId, // public key only
      amount: order.amount,
      currency: order.currency,
      name: "StudyElites",
      description: order.itemName,
      order_id: order.orderId,
      // Branding
      theme: { color: "#1d4ed8" },
      // Prefill (optional)
      prefill: {
        name: buyerName || "",
        email: buyerEmail || "",
        contact: buyerPhone || "",
      },
      notes: {
        item_id: order.itemId,
        kind: order.kind,
        source: "studyelites.online",
      },
      handler: async function (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        try {
          const result = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            itemId: order.itemId,
          });
          resolve(result);
        } catch (err) {
          reject(err);
        }
      },
      modal: {
        ondismiss: () => {
          onDismiss?.();
          reject(new Error("Checkout dismissed."));
        },
      },
    };

    const rzp = new (window as unknown as { Razorpay: new (opts: unknown) => { open: () => void } }).Razorpay(options);
    rzp.open();
  });

  return verification;
}
