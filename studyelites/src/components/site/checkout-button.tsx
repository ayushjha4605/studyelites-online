"use client";

import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { startRazorpayCheckout } from "@/lib/razorpay-client";
import { useToast } from "@/hooks/use-toast";
import {
  PaymentSuccessDialog,
  type VerifyPaymentResponseView,
} from "@/components/site/payment-success-dialog";
import { Loader2 } from "lucide-react";

type CheckoutButtonProps = {
  itemId: string;
  label: string;
  buyerName?: string;
  buyerEmail?: string;
  buyerPhone?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
};

/**
 * Reusable "Buy Now" / "Join Now" button.
 *
 * Flow:
 *  1. Click → backend creates Razorpay order (server sets the real price).
 *  2. Razorpay checkout modal opens (key id only — never the secret).
 *  3. On success, backend verifies the HMAC signature server-side.
 *  4. On verified success, show the success dialog (with Telegram link for
 *     membership items).
 */
export function CheckoutButton({
  itemId,
  label,
  buyerName,
  buyerEmail,
  buyerPhone,
  variant = "default",
  size = "default",
  className,
}: CheckoutButtonProps) {
  const { toast } = useToast();
  const [busy, setBusy] = React.useState(false);
  const [result, setResult] = React.useState<VerifyPaymentResponseView | null>(
    null
  );

  async function handleClick() {
    if (busy) return;
    setBusy(true);
    try {
      const r = await startRazorpayCheckout({
        itemId,
        buyerName,
        buyerEmail,
        buyerPhone,
        onDismiss: () => {
          toast({
            title: "Payment cancelled",
            description: "You closed the checkout without completing payment.",
          });
        },
      });
      setResult(r as VerifyPaymentResponseView);
      toast({
        title: "Payment verified ✓",
        description: "Your access has been unlocked.",
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      // "Checkout dismissed." is intentional, don't show as an error toast.
      if (!/dismiss/i.test(message)) {
        toast({
          title: "Payment failed",
          description: message,
          variant: "destructive",
        });
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        className={className}
        disabled={busy}
        onClick={handleClick}
        aria-label={label}
      >
        {busy ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Processing…
          </>
        ) : (
          label
        )}
      </Button>

      <PaymentSuccessDialog
        result={result}
        onClose={() => setResult(null)}
      />
    </>
  );
}
