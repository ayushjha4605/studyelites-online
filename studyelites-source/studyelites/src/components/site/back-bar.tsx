"use client";

import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PageId } from "@/lib/products";

/**
 * Sticky "Back" button shown at the top of every non-home view so the user
 * can always return to the previous page. Also includes a small label of the
 * current page on the right for orientation.
 */
export function BackBar({
  currentLabel,
  onBack,
  className,
}: {
  currentLabel: string;
  onBack: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "sticky top-16 z-30 border-b border-border/60 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/75",
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-blue-700"
          aria-label="Go back to previous page"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {currentLabel}
        </span>
      </div>
    </div>
  );
}

/** Map page id to a friendly label used by the BackBar. */
export function pageLabel(p: PageId): string {
  switch (p) {
    case "home":
      return "Home";
    case "products":
      return "Products";
    case "membership":
      return "Membership";
    case "about":
      return "About";
    case "contact":
      return "Contact";
  }
}
