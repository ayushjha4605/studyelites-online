"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/site/product-card";
import { FEATURED_PRODUCTS, type PageId } from "@/lib/products";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Globe2,
  Headphones,
  Lock,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

/**
 * Home view. Hero + "why us" + featured products preview + membership CTA.
 */
export function HomeView({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  const featured = FEATURED_PRODUCTS;

  return (
    <div>
      {/* Hero */}
      <section className="bg-hero-gradient">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div className="space-y-6">
            <Badge
              variant="outline"
              className="border-blue-300 dark:border-blue-700 bg-background/70 text-blue-700 dark:text-blue-300"
            >
              <Sparkles className="size-3.5" />
              Digital study material for Indian govt exam aspirants
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Premium study material,{" "}
              <span className="text-blue-700">delivered instantly.</span>
            </h1>
            <p className="max-w-prose text-base leading-relaxed text-muted-foreground">
              StudyElites curates concise, exam-focused study material for SSC,
              Banking, Railway, GK and Quantitative Aptitude — plus a 30-day
              membership that includes access to our Telegram educational
              community. Buy, pay securely via Razorpay, and get instant access.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={() => onNavigate("products")}
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Browse products
                <ArrowRight className="size-4" />
              </Button>
              <Button
                onClick={() => onNavigate("membership")}
                size="lg"
                variant="outline"
                className="border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30"
              >
                Join membership · ₹29
              </Button>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Lock className="size-4 text-blue-600" />
                Razorpay secure checkout
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-blue-600" />
                Server-side payment verification
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-blue-600" />
                Mobile-friendly
              </span>
            </div>
          </div>

          {/* Decorative side panel — shows the SSC product cover */}
          <div className="relative hidden md:block">
            <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-blue-200 dark:border-blue-800/50 bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-blue-700">
                  Featured product
                </span>
                <span className="rounded-full bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 text-xs font-semibold text-blue-800 dark:text-blue-200">
                  Digital
                </span>
              </div>
              <div className="mt-4 aspect-[16/10] w-full overflow-hidden rounded-lg bg-muted">
                <img
                  src="/covers/ssc.png"
                  alt="SSC Study Material cover"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">
                    SSC Study Material
                  </p>
                  <p className="text-xs text-muted-foreground">
                    CGL · CHSL · MTS · CPO · PDF
                  </p>
                </div>
                <span className="rounded-md bg-blue-600 px-2 py-1 text-xs font-bold text-white">
                  ₹49
                </span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <Stat label="Products" value="6" />
                <Stat label="Membership" value="₹29" />
                <Stat label="Access" value="30 days" />
              </div>
              <div className="mt-5 rounded-lg bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
                The SSC Study Material includes a free demo PDF preview —
                click &ldquo;View free demo PDF&rdquo; on the product card to
                see exactly what you&apos;re buying before you pay.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-section-soft border-y border-border/70">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-2 sm:px-6 md:grid-cols-4">
          <Feature
            icon={<ShieldCheck className="size-5" />}
            title="Secure payments"
            description="Every payment is verified server-side using Razorpay HMAC signatures."
          />
          <Feature
            icon={<Globe2 className="size-5" />}
            title="Exam-focused"
            description="Material is structured around SSC, Banking, Railway and aptitude patterns."
          />
          <Feature
            icon={<Users className="size-5" />}
            title="Telegram community"
            description="Membership unlocks a private Telegram educational community."
          />
          <Feature
            icon={<Headphones className="size-5" />}
            title="Simple support"
            description="One email — ankushjha4806@gmail.com — for any access issue."
          />
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Featured products
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Our two premium study packs. Want more? Browse all four mid-tier
            products on the Products page.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {featured.map((p) => (
            <ProductCard key={p.id} item={p} />
          ))}
        </div>

        {/* Browse More Products CTA */}
        <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-6 sm:p-8">
          <div className="text-center">
            <h3 className="text-lg font-bold tracking-tight text-foreground">
              4 more products available
            </h3>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Banking · Railway · General Knowledge · Quantitative Aptitude —
              each with full theory, practice sets and worked solutions.
            </p>
          </div>
          <Button
            onClick={() => onNavigate("products")}
            size="lg"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Browse More Products
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </section>

      {/* Membership banner */}
      <section className="bg-section-soft border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Badge
              variant="outline"
              className="border-blue-300 dark:border-blue-700 bg-background text-blue-700 dark:text-blue-300"
            >
              Membership
            </Badge>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              StudyElites 30-Day Membership — ₹29
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              30-day access to all six StudyElites digital study materials and
              the associated Telegram educational community. After successful
              Razorpay payment, the Telegram access instructions appear on the
              Membership page.
            </p>
          </div>
          <Button
            onClick={() => onNavigate("membership")}
            size="lg"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Join Now — ₹29
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/70 bg-muted/30 px-2 py-3">
      <p className="text-sm font-bold text-blue-700">{value}</p>
      <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border/70 bg-card p-5">
      <div className="flex size-9 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
        {icon}
      </div>
      <h3 className="mt-3 text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
