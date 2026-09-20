"use client";

import * as React from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { HomeView } from "@/components/site/home-view";
import { ProductsView } from "@/components/site/products-view";
import { MembershipView } from "@/components/site/membership-view";
import { AboutView } from "@/components/site/about-view";
import { ContactView } from "@/components/site/contact-view";
import { ProductDetailView } from "@/components/site/product-detail-view";
import { findProduct, type PageId } from "@/lib/products";

/**
 * StudyElites.online — single-page MVP.
 *
 * Per project constraints only the `/` route is exposed to the user, so the
 * "pages" (Home / Products / Membership / About / Contact / Product-detail)
 * are switched via client-side state. Hash is mirrored so users can bookmark
 * and use the browser back button in a basic way.
 *
 * For product detail pages the hash is `#/product/<id>` — e.g.
 * `#/product/upsc-civil-services-prelims`.
 */
export default function Home() {
  const [page, setPage] = React.useState<PageId>("home");
  const [activeProductId, setActiveProductId] = React.useState<string | null>(
    null
  );

  // Parse hash → { page, productId }
  const parseHash = React.useCallback(() => {
    if (typeof window === "undefined") return { page: "home" as PageId, productId: null };
    const h = window.location.hash.replace(/^#\/?/, "");
    // Product detail: /product/<id>
    const m = h.match(/^product\/(.+)$/i);
    if (m) {
      const id = m[1];
      if (findProduct(id)) {
        return { page: "product-detail" as PageId, productId: id };
      }
      // Invalid product id — fall back to products list
      return { page: "products" as PageId, productId: null };
    }
    if (h === "products" || h === "membership" || h === "about" || h === "contact") {
      return { page: h as PageId, productId: null };
    }
    return { page: "home" as PageId, productId: null };
  }, []);

  // Read initial page from URL hash on mount, and listen for hashchange.
  React.useEffect(() => {
    const initial = parseHash();
    setPage(initial.page);
    setActiveProductId(initial.productId);

    const onHashChange = () => {
      const r = parseHash();
      setPage(r.page);
      setActiveProductId(r.productId);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [parseHash]);

  // Navigation helper. When going to product-detail, also pass product id.
  const navigate = React.useCallback(
    (p: PageId, productId?: string) => {
      setPage(p);
      if (p === "product-detail" && productId) {
        setActiveProductId(productId);
        if (typeof window !== "undefined") {
          window.history.pushState(null, "", `#/product/${productId}`);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }
      setActiveProductId(null);
      if (typeof window !== "undefined") {
        const newHash = p === "home" ? "" : `#/${p}`;
        if (window.location.hash.replace(/^#\/?/, "") !== p) {
          window.history.pushState(null, "", newHash || window.location.pathname);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    []
  );

  const activeProduct = activeProductId ? findProduct(activeProductId) : null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader current={page === "product-detail" ? "products" : page} onNavigate={navigate} />

      <main className="flex-1">
        {page === "home" && <HomeView onNavigate={navigate} />}
        {page === "products" && <ProductsView onNavigate={navigate} />}
        {page === "membership" && <MembershipView onNavigate={navigate} />}
        {page === "about" && <AboutView onNavigate={navigate} />}
        {page === "contact" && <ContactView onNavigate={navigate} />}
        {page === "product-detail" && activeProduct && (
          <ProductDetailView product={activeProduct} onNavigate={navigate} />
        )}
        {page === "product-detail" && !activeProduct && (
          <ProductsView onNavigate={navigate} />
        )}
      </main>

      <SiteFooter onNavigate={navigate} />
    </div>
  );
}
