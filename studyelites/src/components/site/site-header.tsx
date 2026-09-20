"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { GraduationCap, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { NAV_ITEMS, type PageId } from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * Site header. Renders both a desktop nav and a mobile slide-out menu.
 * The active "page" is managed by the parent SPA via `current` / `onNavigate`.
 */
export function SiteHeader({
  current,
  onNavigate,
}: {
  current: PageId;
  onNavigate: (page: PageId) => void;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleNav = (id: PageId) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNav("home");
          }}
          className="flex items-center gap-2 text-blue-700"
          aria-label="StudyElites home"
        >
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
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={cn(
                "nav-underline text-sm font-medium text-foreground/80 transition-colors hover:text-blue-700",
                current === item.id && "text-blue-700"
              )}
              data-active={current === item.id}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop actions: theme toggle + CTA */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button
            onClick={() => handleNav("membership")}
            className="bg-blue-600 text-white hover:bg-blue-700"
            size="sm"
          >
            Join ₹29 Membership
          </Button>
        </div>

        {/* Mobile actions: theme toggle + menu */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
          <SheetContent side="right" className="w-72 p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-2 border-b border-border/70 px-4 py-4">
                <span className="flex size-7 items-center justify-center rounded-md bg-blue-600 text-white">
                  <GraduationCap className="size-4" />
                </span>
                <span className="text-sm font-semibold text-foreground">
                  StudyElites
                </span>
              </div>
              <nav className="flex flex-col gap-1 p-3">
                {NAV_ITEMS.map((item) => (
                  <SheetClose asChild key={item.id}>
                    <button
                      onClick={() => handleNav(item.id)}
                      className={cn(
                        "rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
                        current === item.id
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80 hover:bg-accent"
                      )}
                    >
                      {item.label}
                    </button>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto p-3">
                <SheetClose asChild>
                  <Button
                    onClick={() => handleNav("membership")}
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Join ₹29 Membership
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        </div>
      </div>
    </header>
  );
}
