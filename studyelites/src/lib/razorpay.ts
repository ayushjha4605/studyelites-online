import Razorpay from "razorpay";

/**
 * Server-only Razorpay client.
 *
 * The Razorpay secret key is read from process.env and NEVER shipped to the
 * browser. This file is only imported from server components / route handlers
 * (App Router `'use server'` / route.ts) — Next.js guarantees these are not
 * bundled into client code.
 */
function getRazorpayKeys() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error(
      "Razorpay keys are not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env"
    );
  }

  return { key_id, key_secret };
}

let _instance: Razorpay | null = null;

export function getRazorpay(): Razorpay {
  if (_instance) return _instance;
  const { key_id, key_secret } = getRazorpayKeys();
  _instance = new Razorpay({ key_id, key_secret });
  return _instance;
}

/**
 * Verify an HMAC signature returned by Razorpay checkout.
 * Uses the server-side secret key — never expose this to the client.
 */
export function verifyPaymentSignature(params: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}): boolean {
  const { key_secret } = getRazorpayKeys();
  const body = `${params.razorpay_order_id}|${params.razorpay_payment_id}`;

  // Node's built-in crypto (not the deprecated npm `crypto` package).
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const nodeCrypto = require("node:crypto");
  const expected = nodeCrypto
    .createHmac("sha256", key_secret)
    .update(body)
    .digest("hex");

  // Constant-time-ish comparison.
  if (expected.length !== params.razorpay_signature.length) return false;
  try {
    return nodeCrypto.timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(params.razorpay_signature, "hex")
    );
  } catch {
    return false;
  }
}

/**
 * Catalog of purchasable items. Keep this server-side so prices cannot be
 * tampered with from the browser. Each item maps a stable `id` to an amount
 * in paise (₹1 = 100 paise) — Razorpay requires integer paise amounts.
 */
export type CatalogItem = {
  id: string;
  name: string;
  description: string;
  amount: number; // paise
  currency: "INR";
  kind: "product" | "membership";
};

export const CATALOG: Record<string, CatalogItem> = {
  "ssc-study-material": {
    id: "ssc-study-material",
    name: "SSC Study Material",
    description:
      "Complete digital study material for SSC CGL, CHSL, MTS and CPO exams.",
    amount: 4900,
    currency: "INR",
    kind: "product",
  },
  "banking-study-material": {
    id: "banking-study-material",
    name: "Banking Study Material",
    description:
      "Section-wise digital study material for IBPS PO/Clerk, SBI PO/Clerk and RBI Grade-B.",
    amount: 4900,
    currency: "INR",
    kind: "product",
  },
  "railway-study-material": {
    id: "railway-study-material",
    name: "Railway Study Material",
    description:
      "Topic-wise digital study material for RRB NTPC, Group D, ALP and JE.",
    amount: 4900,
    currency: "INR",
    kind: "product",
  },
  "general-knowledge-notes": {
    id: "general-knowledge-notes",
    name: "General Knowledge Notes",
    description:
      "Concise Static GK + Current Affairs one-liners for quick revision.",
    amount: 2900,
    currency: "INR",
    kind: "product",
  },
  "quantitative-aptitude-pdf": {
    id: "quantitative-aptitude-pdf",
    name: "Quantitative Aptitude Practice PDF",
    description:
      "1000+ topic-wise Quant practice questions with worked solutions.",
    amount: 2900,
    currency: "INR",
    kind: "product",
  },
  "english-comprehension-notes": {
    id: "english-comprehension-notes",
    name: "English Language & Comprehension Notes",
    description:
      "Complete English Language notes for SSC, Banking and Railway exams.",
    amount: 2900,
    currency: "INR",
    kind: "product",
  },
  "upsc-civil-services-prelims": {
    id: "upsc-civil-services-prelims",
    name: "UPSC Civil Services Prelims Notes",
    description:
      "Topic-wise digital notes for UPSC CSE Prelims General Studies Paper I.",
    amount: 9900, // ₹99
    currency: "INR",
    kind: "product",
  },
  "membership-30day": {
    id: "membership-30day",
    name: "StudyElites 30-Day Membership",
    description: "30-day access to study materials + Telegram community.",
    amount: 2900, // ₹29
    currency: "INR",
    kind: "membership",
  },
};

export function getCatalogItem(id: string): CatalogItem | null {
  return CATALOG[id] ?? null;
}
