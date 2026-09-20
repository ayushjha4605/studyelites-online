# StudyElites.online

Premium digital education store for Indian government exam aspirants.
Sells digital study material for SSC, Banking, Railway, GK, Quantitative
Aptitude, English and UPSC — plus a ₹29 30-day membership with Telegram
community access.

## Tech Stack

- Next.js 16 (App Router) + TypeScript 5
- Tailwind CSS 4 + shadcn/ui component library
- Razorpay payments (server-side HMAC signature verification)
- Prisma ORM (SQLite for dev, configurable for production)

## Quick Start

```bash
# 1. Install dependencies
bun install
#   (or: npm install / pnpm install)

# 2. Create .env from sample and fill in real values
cp .env.example .env
#   Edit .env with your Razorpay keys + Telegram link

# 3. Run dev server
bun run dev

# 4. Open http://localhost:3000
```

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── api/razorpay/         # Payment API routes
│   │   ├── create-order/     # POST — create Razorpay order
│   │   └── verify-payment/   # POST — verify HMAC signature
│   ├── layout.tsx            # Root layout + metadata
│   ├── page.tsx              # SPA host (5 views via hash routing)
│   └── globals.css           # Blue/white theme tokens
├── components/
│   ├── site/                 # StudyElites-specific components
│   │   ├── home-view.tsx
│   │   ├── products-view.tsx
│   │   ├── membership-view.tsx
│   │   ├── about-view.tsx
│   │   ├── contact-view.tsx
│   │   ├── product-card.tsx
│   │   ├── checkout-button.tsx
│   │   ├── payment-success-dialog.tsx
│   │   ├── policy-modal.tsx
│   │   ├── site-header.tsx
│   │   ├── site-footer.tsx
│   │   └── back-bar.tsx
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── razorpay.ts           # Server-side Razorpay client + CATALOG
│   ├── razorpay-client.ts    # Client-side checkout helper
│   ├── products.ts           # Display catalog (display-only prices)
│   └── utils.ts
├── hooks/                    # React hooks
public/
├── covers/                   # AI-generated product cover images
└── demo-*.pdf             # 7 free demo PDFs (one per product)
prisma/
└── schema.prisma
```

## Deployment

See `DEPLOYMENT-GUIDE.md` (included separately) for full step-by-step
instructions on deploying to Vercel + setting up Razorpay + connecting
a custom domain.

## Important Notes

- **`.env` is NOT included in this zip** — copy `.env.example` to `.env`
  and fill in your real Razorpay keys + Telegram group link.
- All prices are server-authoritative in `src/lib/razorpay.ts` (CATALOG).
  The display prices in `src/lib/products.ts` are for display only and
  re-validated server-side at checkout.
- Razorpay secret key is NEVER shipped to the browser. Only the public
  key id (`NEXT_PUBLIC_RAZORPAY_KEY_ID`) is exposed to the client.

## Contact

ankushjha4806@gmail.com
