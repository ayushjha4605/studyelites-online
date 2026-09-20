"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackBar } from "@/components/site/back-bar";
import { CheckoutButton } from "@/components/site/checkout-button";
import type { CatalogItemDisplay, PageId } from "@/lib/products";
import {
  CheckCircle2,
  FileText,
  ExternalLink,
  ShieldCheck,
  Clock,
  Download,
  BookOpen,
  Tag,
} from "lucide-react";

/**
 * Single product detail page. Shows:
 *  - Full cover image (object-contain so nothing gets cropped)
 *  - Product name, tagline, description
 *  - Full topics list (always visible, not accordion)
 *  - Demo PDF download button
 *  - Buy Now button
 *  - "What you get" + trust badges
 */
export function ProductDetailView({
  product,
  onNavigate,
}: {
  product: CatalogItemDisplay;
  onNavigate: (p: PageId) => void;
}) {
  return (
    <div>
      <BackBar currentLabel={product.name} onBack={() => onNavigate("products")} />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
          {/* LEFT: Cover image + price + actions */}
          <div className="space-y-4">
            {/* Full cover image — object-contain so the WHOLE image is visible */}
            <div className="overflow-hidden rounded-2xl border border-border bg-muted/30 p-3 shadow-sm">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                <img
                  src={product.coverImage}
                  alt={`${product.name} cover`}
                  className="h-full w-full object-contain"
                />
                {product.isSample && (
                  <div className="absolute left-3 top-3">
                    <Badge className="bg-background/85 text-blue-700 dark:text-blue-300 shadow-sm ring-1 ring-black/5">
                      Demo / sample
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Price + Buy Now */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Price
                    </p>
                    <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                      {product.priceLabel}
                    </p>
                  </div>
                  <Badge variant="outline" className="border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300">
                    One-time
                  </Badge>
                </div>
                {product.priceNote && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {product.priceNote}
                  </p>
                )}

                <div className="mt-4 space-y-2">
                  <CheckoutButton
                    itemId={product.id}
                    label={`Buy Now — ${product.priceLabel}`}
                    size="lg"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  />

                  {product.demoPdfUrl && (
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="w-full border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                    >
                      <a
                        href={product.demoPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        <FileText className="size-4" />
                        View free demo PDF
                        <ExternalLink className="size-3" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Trust badges */}
            <div className="grid grid-cols-1 gap-2">
              <TrustChip icon={<ShieldCheck className="size-4" />} label="Server-side payment verification" />
              <TrustChip icon={<Download className="size-4" />} label="Instant download after payment" />
              <TrustChip icon={<Clock className="size-4" />} label="Lifetime access (no expiry)" />
            </div>
          </div>

          {/* RIGHT: Product details */}
          <div className="space-y-6">
            <div>
              <Badge
                variant="outline"
                className="border-blue-300 dark:border-blue-700 bg-background text-blue-700 dark:text-blue-300"
              >
                <Tag className="size-3" />
                {product.tagline}
              </Badge>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* What's inside */}
            {product.topics.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <BookOpen className="size-5 text-blue-600" />
                    What&apos;s inside
                  </CardTitle>
                  <CardDescription>
                    {product.topics.length} topics covered in the full PDF
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {product.topics.map((t, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-foreground/90"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-600" />
                        <span className="leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Demo PDF callout */}
            {product.demoPdfUrl && (
              <Card className="border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                      <FileText className="size-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground">
                        Free demo PDF available
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        Preview the structure, depth and quality of the full
                        product before buying. The demo PDF contains sample
                        chapters, worked examples and a practice question bank
                        with answer key.
                      </p>
                      <Button
                        asChild
                        size="sm"
                        className="mt-3 bg-blue-600 text-white hover:bg-blue-700"
                      >
                        <a
                          href={product.demoPdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                        >
                          <FileText className="size-4" />
                          Open demo PDF
                          <ExternalLink className="size-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* How purchase works */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldCheck className="size-5 text-blue-600" />
                  How purchase works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <Step
                  n={1}
                  title="Click Buy Now"
                  desc="A Razorpay checkout modal opens. We never see your card or banking details — Razorpay handles payment directly."
                />
                <Step
                  n={2}
                  title="Server verifies the payment"
                  desc="After you pay, our backend verifies the Razorpay HMAC signature and the amount before granting access."
                />
                <Step
                  n={3}
                  title="Download link unlocks"
                  desc="On verified success, a dialog shows your Order ID and the download link for the full PDF."
                />
              </CardContent>
            </Card>

            {/* Footer note */}
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-xs text-muted-foreground">
              <p>
                For any access issue or query, write to{" "}
                <a
                  href="mailto:ankushjha4806@gmail.com"
                  className="font-medium text-blue-700 dark:text-blue-300 hover:underline"
                >
                  ankushjha4806@gmail.com
                </a>{" "}
                with your Order ID.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustChip({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border/70 bg-card px-4 py-2.5 text-sm text-foreground/80">
      <span className="text-blue-600">{icon}</span>
      {label}
    </div>
  );
}

function Step({
  n,
  title,
  desc,
}: {
  n: number;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
        {n}
      </span>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
          {desc}
        </p>
      </div>
    </div>
  );
}
