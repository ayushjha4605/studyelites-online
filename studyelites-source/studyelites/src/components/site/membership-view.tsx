"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackBar } from "@/components/site/back-bar";
import { CheckoutButton } from "@/components/site/checkout-button";
import { MEMBERSHIP, type PageId } from "@/lib/products";
import {
  BadgeCheck,
  CheckCircle2,
  Clock,
  Lock,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

export function MembershipView({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  return (
    <div>
      <BackBar currentLabel="Membership" onBack={() => onNavigate("home")} />
      <div className="bg-hero-gradient">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="space-y-2 text-center">
          <Badge
            variant="outline"
            className="border-blue-200 bg-white text-blue-800"
          >
            Membership
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            StudyElites 30-Day Membership
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
            30-day access to StudyElites educational study materials and the
            associated Telegram educational community. After successful
            Razorpay payment, the Telegram membership access instructions
            appear on this page.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
          {/* Pricing card */}
          <Card className="overflow-hidden">
            {/* Membership cover image */}
            <div className="relative aspect-[16/8] w-full overflow-hidden bg-gradient-to-br from-blue-600/20 to-indigo-600/10">
              <img
                src={MEMBERSHIP.coverImage}
                alt="StudyElites Membership"
                className="h-full w-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {MEMBERSHIP.name}
                  </CardTitle>
                  <CardDescription>{MEMBERSHIP.tagline}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-700">
                    {MEMBERSHIP.priceLabel}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    one-time · 30-day access
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {MEMBERSHIP.description}
              </p>

              <ul className="mt-5 space-y-2.5 text-sm">
                <Perk text="30-day access to StudyElites study materials" />
                <Perk text="Membership in the Telegram educational community" />
                <Perk text="Secure Razorpay checkout with server-side verification" />
                <Perk text="No auto-renewal — re-join when you want" />
              </ul>
            </CardContent>
            <CardFooter>
              <CheckoutButton
                itemId={MEMBERSHIP.id}
                label="Join Now — ₹29"
                size="lg"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              />
            </CardFooter>
          </Card>

          {/* What you get / How it works */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldCheck className="size-5 text-blue-600" />
                  How payment &amp; access work
                </CardTitle>
                <CardDescription>
                  Three short steps, all verified server-side.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Step
                  n={1}
                  title="Click Join Now — ₹29"
                  description="You'll be shown a Razorpay checkout modal. We never see your card or banking details — Razorpay handles payment directly."
                />
                <Step
                  n={2}
                  title="Server verifies the payment"
                  description="After you pay, our backend verifies the Razorpay HMAC signature and the amount before marking the membership as paid."
                />
                <Step
                  n={3}
                  title="Telegram access unlocks"
                  description="On verified success, a success dialog on this page shows a 'Join Telegram' button. Your membership is active for 30 days from today."
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MessageCircle className="size-5 text-blue-600" />
                  Telegram educational community
                </CardTitle>
                <CardDescription>
                  What you can expect inside the group.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2.5 text-sm text-muted-foreground">
                <Perk text="Topic-wise discussion threads aligned to exam syllabi" />
                <Perk text="Quick clarifications on study material" />
                <Perk text="Community rules enforced inside the group" />
              </CardContent>
            </Card>

            <div className="flex items-start gap-3 rounded-lg border border-border bg-white p-4 text-xs text-muted-foreground">
              <Lock className="mt-0.5 size-4 shrink-0 text-blue-600" />
              <p>
                The Telegram invite link is provided only after successful
                payment verification. Do not share your access with anyone
                else — it is non-transferable. See our Terms &amp; Conditions
                for details.
              </p>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          <TrustChip icon={<ShieldCheck className="size-4" />} label="Server-side payment verification" />
          <TrustChip icon={<Clock className="size-4" />} label="30-day access from payment date" />
          <TrustChip icon={<BadgeCheck className="size-4" />} label="No auto-renewal" />
        </div>
        </div>
      </div>
    </div>
  );
}

function Perk({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-600" />
      <span className="text-sm text-foreground/90">{text}</span>
    </li>
  );
}

function Step({
  n,
  title,
  description,
}: {
  n: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
        {n}
      </span>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
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
    <div className="flex items-center gap-2 rounded-lg border border-border/70 bg-white px-4 py-3 text-sm text-foreground/80">
      <span className="text-blue-600">{icon}</span>
      {label}
    </div>
  );
}
