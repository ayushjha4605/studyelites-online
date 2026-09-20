"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackBar } from "@/components/site/back-bar";
import {
  BookOpenCheck,
  Globe2,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import type { PageId } from "@/lib/products";

export function AboutView({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  return (
    <div>
      <BackBar currentLabel="About" onBack={() => onNavigate("home")} />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="space-y-2">
          <Badge
            variant="outline"
            className="border-blue-200 bg-white text-blue-800"
          >
            About
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            About StudyElites
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            StudyElites is a small, focused digital education store that sells
            concise study material for popular Indian government job exams. We
            keep things simple, transparent and fast.
          </p>
        </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-blue-700">
              <Target className="size-5" />
              <CardTitle className="text-base">What we do</CardTitle>
            </div>
            <CardDescription>
              Concise, exam-focused material at an honest price.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            <p>
              We sell five digital study products — SSC, Banking, Railway,
              General Knowledge and Quantitative Aptitude — plus an affordable
              ₹29 monthly membership that bundles study access with our
              Telegram educational community. Every product is delivered
              electronically; we do not ship physical goods.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-blue-700">
              <ShieldCheck className="size-5" />
              <CardTitle className="text-base">
                How we handle payments
              </CardTitle>
            </div>
            <CardDescription>
              Secure, verified, transparent.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            <p>
              All payments are processed by Razorpay. We never see or store
              your card or banking credentials. After each transaction, our
              server verifies the Razorpay signature before granting access —
              this protects both buyers and StudyElites from tampered
              payments.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-blue-700">
              <BookOpenCheck className="size-5" />
              <CardTitle className="text-base">
                What our material is — and isn&apos;t
              </CardTitle>
            </div>
            <CardDescription>Setting honest expectations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            <p>
              Our material is a starting point for self-study. We do not
              promise exam selection — that depends on the candidate&apos;s own
              preparation, practice and consistency.
            </p>
            <p>
              We do not run classes, do not offer 1-on-1 mentorship, and do
              not auto-renew your membership.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-blue-700">
              <Users className="size-5" />
              <CardTitle className="text-base">
                The Telegram community
              </CardTitle>
            </div>
            <CardDescription>Optional, member-only.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            <p>
              Membership buyers are invited to our private Telegram
              educational community for topic-wise discussion and quick
              clarifications. Telegram is operated by Telegram FZ-LLC under
              its own terms; participation in the group is subject to
              community rules posted inside.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Honest disclosure block */}
      <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50/50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 ring-1 ring-blue-200">
            <Globe2 className="size-5" />
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">
              Honest disclosure
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We do not display fake student counts, fake sales numbers, fake
              reviews or fake testimonials on this site. Where product
              information is shown as <strong>&ldquo;Demo / sample&rdquo;</strong>,
              it is a placeholder until we publish the real catalog. If you
              spot any misleading claim, please write to
              ankushjha4806@gmail.com — we will correct it.
            </p>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-10 flex flex-wrap gap-3">
        <button
          onClick={() => onNavigate("products")}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Browse products
        </button>
        <button
          onClick={() => onNavigate("membership")}
          className="rounded-md border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
        >
          View membership
        </button>
        <button
          onClick={() => onNavigate("contact")}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-accent"
        >
          Contact support
        </button>
      </div>
      </div>
    </div>
  );
}
