"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export type PolicyId = "privacy" | "terms" | "refund";

const POLICY_CONTENT: Record<
  PolicyId,
  { title: string; subtitle: string; body: React.ReactNode }
> = {
  privacy: {
    title: "Privacy Policy",
    subtitle: "How StudyElites handles your information",
    body: (
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          StudyElites (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates the website
          StudyElites.online and sells digital educational study material. This
          Privacy Policy explains what information we collect when you use the
          website or make a purchase, and how we use and protect it.
        </p>
        <h4 className="text-sm font-semibold text-foreground">
          1. Information we collect
        </h4>
        <p>
          We collect the minimum information needed to process your order: your
          name, email address, and phone number (if you choose to provide them
          to Razorpay during checkout). We also receive order and payment
          status from Razorpay. We do not collect payment card numbers —
          card data is handled directly by Razorpay and never touches our
          servers.
        </p>
        <h4 className="text-sm font-semibold text-foreground">
          2. How we use information
        </h4>
        <p>
          We use your information to deliver the digital product you
          purchased, to provide access to the Telegram educational community
          for membership buyers, to send you a payment receipt, and to respond
          to your support requests. We do not sell or rent your information
          to third parties.
        </p>
        <h4 className="text-sm font-semibold text-foreground">
          3. Razorpay payments
        </h4>
        <p>
          Payment processing is handled by Razorpay under its own privacy
          policy. We receive a payment identifier and verification status from
          Razorpay; we do not store your card or net-banking credentials.
        </p>
        <h4 className="text-sm font-semibold text-foreground">
          4. Telegram community
        </h4>
        <p>
          Membership purchases are granted access to our private Telegram
          educational community. Telegram is operated by Telegram FZ-LLC and
          is governed by its own terms. Your participation in the community
          is subject to community rules available inside the group.
        </p>
        <h4 className="text-sm font-semibold text-foreground">
          5. Data retention
        </h4>
        <p>
          We retain transaction records (order id, payment id, item
          purchased, timestamp) for the period required by applicable law or
          as needed to provide customer support.
        </p>
        <h4 className="text-sm font-semibold text-foreground">
          6. Your rights
        </h4>
        <p>
          You may request access to or correction of your personal
          information by contacting us at ankushjha4806@gmail.com.
        </p>
        <h4 className="text-sm font-semibold text-foreground">7. Contact</h4>
        <p>
          For any privacy-related queries, write to
          ankushjha4806@gmail.com.
        </p>
      </div>
    ),
  },
  terms: {
    title: "Terms & Conditions",
    subtitle: "The terms under which we provide our services",
    body: (
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          By accessing or purchasing from StudyElites.online you agree to the
          following terms. If you do not agree, please do not use the website
          or purchase any product.
        </p>
        <h4 className="text-sm font-semibold text-foreground">
          1. Digital products
        </h4>
        <p>
          All products sold on StudyElites.online are digital educational
          study material delivered electronically. After successful payment
          verification, access is provided as described on the relevant
          product page.
        </p>
        <h4 className="text-sm font-semibold text-foreground">
          2. Membership
        </h4>
        <p>
          The StudyElites 30-Day Membership grants access to StudyElites
          educational study materials and the associated Telegram educational
          community for a period of 30 days from the date of successful
          payment. Access is non-transferable and is intended for personal,
          individual use only.
        </p>
        <h4 className="text-sm font-semibold text-foreground">
          3. Pricing
        </h4>
        <p>
          All prices are listed in Indian Rupees (₹) and are inclusive of
          applicable taxes. Prices may change at any time without prior
          notice; any change does not affect orders already placed.
        </p>
        <h4 className="text-sm font-semibold text-foreground">
          4. Payment
        </h4>
        <p>
          Payments are processed securely by Razorpay. We verify each
          payment server-side before granting access. We do not store your
          card or banking credentials.
        </p>
        <h4 className="text-sm font-semibold text-foreground">
          5. Acceptable use
        </h4>
        <p>
          You agree not to reproduce, redistribute, resell, or share the
          purchased material or your membership access with anyone else.
          Violation may result in immediate termination of access without
          refund.
        </p>
        <h4 className="text-sm font-semibold text-foreground">
          6. Refunds
        </h4>
        <p>
          Refunds are governed by our Refund Policy, available separately on
          this website.
        </p>
        <h4 className="text-sm font-semibold text-foreground">
          7. Disclaimer
        </h4>
        <p>
          Study material is provided for general educational purposes only.
          We make no guarantees regarding examination outcomes. Success in any
          examination depends on the candidate&apos;s own preparation and
          effort.
        </p>
        <h4 className="text-sm font-semibold text-foreground">
          8. Changes to terms
        </h4>
        <p>
          We may update these terms from time to time. Continued use of the
          website after changes constitutes acceptance of the revised terms.
        </p>
      </div>
    ),
  },
  refund: {
    title: "Refund Policy",
    subtitle: "Our policy on refunds for digital products",
    body: (
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Because StudyElites sells digital products that can be accessed
          immediately after payment, refunds are handled on a case-by-case
          basis under the following principles.
        </p>
        <h4 className="text-sm font-semibold text-foreground">
          1. Digital downloads
        </h4>
        <p>
          Digital study material is delivered electronically and is
          considered &ldquo;consumed&rdquo; once access is granted. Refund
          requests for digital downloads are evaluated on a case-by-case
          basis and may be granted only where the product was not delivered
          or is materially different from what was described on the website
          at the time of purchase.
        </p>
        <h4 className="text-sm font-semibold text-foreground">
          2. Membership
        </h4>
        <p>
          The StudyElites 30-Day Membership is a digital access subscription.
          Because access and community membership are granted immediately
          upon successful payment, membership fees are non-refundable except
          where payment could not be processed or where access could not be
          granted due to a fault on our side.
        </p>
        <h4 className="text-sm font-semibold text-foreground">
          3. Duplicate or failed payments
        </h4>
        <p>
          If you were charged more than once for the same order, or your
          account was charged but you did not receive access, please contact
          ankushjha4806@gmail.com within 7 days with your payment
          details. Verified duplicate charges will be refunded in full.
        </p>
        <h4 className="text-sm font-semibold text-foreground">
          4. How to request a refund
        </h4>
        <p>
          Send an email to ankushjha4806@gmail.com with your order ID,
          payment ID, and a short description of the issue. We aim to
          respond within 3 business days.
        </p>
        <h4 className="text-sm font-semibold text-foreground">
          5. Refund method
        </h4>
        <p>
          Approved refunds are processed back to the original payment method
          used at checkout, via Razorpay. The time taken for the refund to
          reflect in your account depends on your bank or card issuer.
        </p>
      </div>
    ),
  },
};

export function PolicyModal({
  policy,
  onClose,
}: {
  policy: PolicyId | null;
  onClose: () => void;
}) {
  const content = policy ? POLICY_CONTENT[policy] : null;
  return (
    <Dialog open={policy !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{content?.title}</DialogTitle>
          <DialogDescription>{content?.subtitle}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="pr-2">{content?.body}</div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
