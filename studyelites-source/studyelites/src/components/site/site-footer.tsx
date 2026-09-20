"use client";

import * as React from "react";
import { GraduationCap, Mail } from "lucide-react";
import { PolicyModal, type PolicyId } from "@/components/site/policy-modal";
import type { PageId } from "@/lib/products";

const POLICY_LINKS: { id: PolicyId; label: string }[] = [
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms & Conditions" },
  { id: "refund", label: "Refund Policy" },
];

export function SiteFooter({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  const [policy, setPolicy] = React.useState<PolicyId | null>(null);

  return (
    <footer className="mt-auto border-t border-border/70 bg-section-soft">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-blue-700">
              <span className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
                <GraduationCap className="size-5" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-base font-bold tracking-tight text-foreground">
                  StudyElites
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  .online
                </span>
              </span>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
              Digital study material for Indian government exam aspirants.
              Concise material, honest pricing, secure Razorpay payments with
              server-side verification.
            </p>
            <a
              href="mailto:ankushjha4806@gmail.com"
              className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 hover:underline"
            >
              <Mail className="size-3.5" />
              ankushjha4806@gmail.com
            </a>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterCol title="Site">
              <FooterButton onClick={() => onNavigate("home")}>
                Home
              </FooterButton>
              <FooterButton onClick={() => onNavigate("products")}>
                Products
              </FooterButton>
              <FooterButton onClick={() => onNavigate("membership")}>
                Membership
              </FooterButton>
            </FooterCol>

            <FooterCol title="Company">
              <FooterButton onClick={() => onNavigate("about")}>
                About
              </FooterButton>
              <FooterButton onClick={() => onNavigate("contact")}>
                Contact
              </FooterButton>
            </FooterCol>

            <FooterCol title="Legal">
              {POLICY_LINKS.map((l) => (
                <FooterButton
                  key={l.id}
                  onClick={() => setPolicy(l.id)}
                >
                  {l.label}
                </FooterButton>
              ))}
            </FooterCol>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} StudyElites.online · All rights
            reserved.
          </p>
          <p className="text-muted-foreground/80">
            Payments secured by Razorpay · No card data stored on our servers.
          </p>
        </div>
      </div>

      <PolicyModal policy={policy} onClose={() => setPolicy(null)} />
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/80">
        {title}
      </h4>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function FooterButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left text-sm text-muted-foreground transition-colors hover:text-blue-700"
    >
      {children}
    </button>
  );
}
