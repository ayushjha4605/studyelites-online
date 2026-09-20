"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy, ExternalLink, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/**
 * Subset of the backend verify-payment response that this dialog needs.
 */
export type VerifyPaymentResponseView = {
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

export function PaymentSuccessDialog({
  result,
  onClose,
}: {
  result: VerifyPaymentResponseView | null;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const open = result !== null;

  // Format amount: amount is in paise (₹1 = 100).
  const amountRupees = result ? (result.amount / 100).toFixed(2) : "0.00";

  const showTelegram = result?.kind === "membership";

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-green-100 text-green-700">
              <CheckCircle2 className="size-6" />
            </div>
            <div className="text-left">
              <DialogTitle>Payment verified</DialogTitle>
              <DialogDescription>
                Your payment of ₹{amountRupees} was verified successfully.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <div className="rounded-md border border-border bg-muted/40 p-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Item</span>
              <span className="font-medium text-foreground">{result?.itemName}</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-mono text-xs text-foreground">
                {result?.orderId}
              </span>
            </div>
            <div className="mt-1 flex justify-between">
              <span className="text-muted-foreground">Payment ID</span>
              <span className="font-mono text-xs text-foreground">
                {result?.paymentId}
              </span>
            </div>
          </div>

          {showTelegram ? (
            <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-center gap-2 text-blue-700">
                <ShieldCheck className="size-4" />
                <span className="text-sm font-semibold">
                  Telegram membership access
                </span>
              </div>
              <p className="mt-2 text-sm text-blue-900/80">
                Click the button below to join the StudyElites Telegram educational
                community. Your membership is active for 30 days from today.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {result?.telegramLink ? (
                  <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <a
                      href={result.telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="size-4" />
                      Join Telegram
                    </a>
                  </Button>
                ) : (
                  <p className="text-xs text-blue-900/70">
                    Telegram link is being prepared. Please contact support —
                    include your Order ID above.
                  </p>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    if (!result?.orderId) return;
                    navigator.clipboard?.writeText(result.orderId).then(
                      () =>
                        toast({
                          title: "Order ID copied",
                          description: "Saved to clipboard.",
                        }),
                      () =>
                        toast({
                          title: "Couldn't copy",
                          description: "Please copy the Order ID manually.",
                          variant: "destructive",
                        })
                    );
                  }}
                >
                  <Copy className="size-4" />
                  Copy order ID
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-md border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
              Thank you for your purchase. A receipt with your download link
              will be sent to your email shortly. For any access issues, contact
              support quoting your Order ID.
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
