"use client";

import * as React from "react";
import { ProductCard } from "@/components/site/product-card";
import { BackBar } from "@/components/site/back-bar";
import { MORE_PRODUCTS, type PageId } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Info } from "lucide-react";

export function ProductsView({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  return (
    <div>
      <BackBar currentLabel="Products" onBack={() => onNavigate("home")} />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="space-y-2">
          <Badge
            variant="outline"
            className="border-blue-300 dark:border-blue-700 bg-background text-blue-700 dark:text-blue-300"
          >
            Products
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Digital study material
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Four more study packs beyond the featured pair on the home page —
            Banking, Railway, General Knowledge and Quantitative Aptitude.
            Prices are in Indian Rupees (₹), inclusive of taxes. Each purchase
            is verified server-side via Razorpay before access is granted.
          </p>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 text-sm text-blue-900 dark:text-blue-100">
          <Info className="mt-0.5 size-4 shrink-0 text-blue-600" />
          <p>
            Items marked <strong>&ldquo;Demo / sample&rdquo;</strong> ship with
            original sample content written for StudyElites. The SSC product
            has a free <strong>demo PDF</strong> you can preview before buying —
            click &ldquo;View free demo PDF&rdquo; on its card.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {MORE_PRODUCTS.map((p) => (
            <ProductCard
              key={p.id}
              item={p}
              ctaLabel="Buy Now"
              onViewDetails={() => onNavigate("product-detail", p.id)}
            />
          ))}
        </div>

        {/* Membership teaser */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-6 sm:p-8 md:flex-row md:items-center">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Want it all?
            </h2>
            <p className="max-w-xl text-sm text-muted-foreground">
              Get the StudyElites 30-Day Membership for ₹29 — 30-day access to
              all six study materials plus the Telegram educational community.
            </p>
          </div>
          <Button
            onClick={() => onNavigate("membership")}
            size="lg"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            View membership
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
