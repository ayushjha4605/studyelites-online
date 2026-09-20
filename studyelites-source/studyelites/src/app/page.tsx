"use client";

import * as React from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { HomeView } from "@/components/site/home-view";
import { ProductsView } from "@/components/site/products-view";
import { MembershipView } from "@/components/site/membership-view";
import { AboutView } from "@/components/site/about-view";
import { ContactView } from "@/components/site/contact-view";
import type { PageId } from "@/lib/products";

/**
 * StudyElites.online — single-page MVP.
 *
 * Per project constraints only the `/` route is exposed to the user, so the
 * five "pages" (Home / Products / Membership / About / Contact) are switched
 * via client-side state. Hash is mirrored so users can bookmark and use the
 * browser back button in a basic way.
 */
export default function Home() {
  const [page, setPage] = React.useState<PageId>("home");

  // Read initial page from URL hash on mount, and listen for hashchange.
  React.useEffect(() => {
    const fromHash = (): PageId => {
      const h = window.location.hash.replace(/^#\/?/, "").toLowerCase();
      if (
        h === "products" ||
        h === "membership" ||
        h === "about" ||
        h === "contact"
      ) {
        return h;
      }
      return "home";
    };

    setPage(fromHash());

    const onHashChange = () => setPage(fromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Scroll to top whenever page changes.
  const navigate = React.useCallback((p: PageId) => {
    setPage(p);
    if (typeof window !== "undefined") {
      const newHash = p === "home" ? "" : `#/${p}`;
      if (window.location.hash.replace(/^#\/?/, "") !== p) {
        window.history.pushState(null, "", newHash || window.location.pathname);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader current={page} onNavigate={navigate} />

      <main className="flex-1">
        {page === "home" && <HomeView onNavigate={navigate} />}
        {page === "products" && <ProductsView onNavigate={navigate} />}
        {page === "membership" && <MembershipView onNavigate={navigate} />}
        {page === "about" && <AboutView onNavigate={navigate} />}
        {page === "contact" && <ContactView onNavigate={navigate} />}
      </main>

      <SiteFooter onNavigate={navigate} />
    </div>
  );
}
