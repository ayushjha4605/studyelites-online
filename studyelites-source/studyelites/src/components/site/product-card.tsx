"use client";

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CheckoutButton } from "@/components/site/checkout-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { CatalogItemDisplay } from "@/lib/products";
import { FileText, ExternalLink } from "lucide-react";

/**
 * Reusable product card. Renders the real product cover image and the
 * Buy Now / Join Now CTA. All pricing is server-authoritative — the price
 * shown here is for display only and is re-validated server-side at checkout.
 */
export function ProductCard({
  item,
  ctaLabel = "Buy Now",
  className,
}: {
  item: CatalogItemDisplay;
  ctaLabel?: string;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "group flex flex-col overflow-hidden transition-shadow hover:shadow-md",
        className
      )}
    >
      {/* Cover image */}
      <div
        className={cn(
          "relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br",
          item.accent
        )}
        role="img"
        aria-label={`${item.name} cover`}
      >
        <Image
          src={item.coverImage}
          alt={`${item.name} cover`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={false}
        />
        {item.isSample && (
          <div className="absolute left-3 top-3">
            <Badge
              variant="secondary"
              className="bg-background/85 text-blue-700 dark:text-blue-300 shadow-sm ring-1 ring-black/5"
            >
              Demo / sample
            </Badge>
          </div>
        )}
        <div className="absolute right-3 top-3">
          <Badge
            variant="outline"
            className="bg-background/85 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 shadow-sm"
          >
            {item.priceLabel}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold leading-tight text-foreground">
            {item.name}
          </h3>
        </div>
        <p className="text-xs font-medium text-blue-700">{item.tagline}</p>
      </CardHeader>

      <CardContent className="flex-1 pt-0">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        {item.priceNote && (
          <p className="mt-2 text-xs text-muted-foreground/80">{item.priceNote}</p>
        )}

        {/* Topics list (expandable) */}
        {item.topics.length > 0 && (
          <Accordion type="single" collapsible className="mt-3">
            <AccordionItem value="topics" className="border-0">
              <AccordionTrigger className="py-2 text-xs font-medium text-blue-700 hover:no-underline">
                What&apos;s inside ({item.topics.length} topics)
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1.5 pb-1">
                  {item.topics.map((t, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-1.5 text-xs text-muted-foreground"
                    >
                      <span className="mt-1 size-1 shrink-0 rounded-full bg-blue-500" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {/* Demo PDF download */}
        {item.demoPdfUrl && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="mt-3 w-full border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30"
          >
            <a
              href={item.demoPdfUrl}
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
      </CardContent>

      <CardFooter className="pt-0">
        <CheckoutButton
          itemId={item.id}
          label={ctaLabel}
          className="w-full bg-blue-600 hover:bg-blue-700"
        />
      </CardFooter>
    </Card>
  );
}
