## Why

The PropmannDEMO app currently simulates payments with a fake confirmation dialog — selecting a method and clicking "Pay" just shows a toast. For demo credibility, we need a real payment flow using Stripe's test/sandbox mode so prospects can experience actual payment UX (card entry, FPX bank selection, GrabPay redirect) without processing real money. This turns a static mockup into a convincing product demo.

## What Changes

- **Stripe Elements integration** in the resident Pay Now dialog — replace the simulated method selector with an embedded Stripe Payment Element showing real card, FPX, and GrabPay options
- **Next.js API routes** for Stripe server-side operations (`/api/stripe/create-payment`, `/api/stripe/create-payment-link`)
- **Payment confirmation screen** after successful payment showing transaction ID, method, and amount
- **Manager Payment Links** — add a "Send Payment Link" action in the record-payment sheet that generates a Stripe Payment Link
- **Drop Touch 'n Go** from payment methods (not natively supported by Stripe); keep FPX, GrabPay, and Credit/Debit Card
- **Extend Payment type** with optional gateway fields (`gatewayProvider`, `gatewayTransactionId`, `gatewayStatus`)

## Capabilities

### New Capabilities
- `stripe-checkout`: Stripe Elements embedded payment flow for residents — PaymentIntent creation, client-side confirmation, success/failure handling, and payment receipt display
- `stripe-payment-links`: Manager-side Stripe Payment Link generation — create shareable payment URLs for residents via the Stripe API

### Modified Capabilities
<!-- No existing OpenSpec capabilities to modify -->

## Impact

- **New dependency**: `@stripe/stripe-js` (client) and `stripe` (server) npm packages
- **New API routes**: `src/app/api/stripe/create-payment/route.ts`, `src/app/api/stripe/create-payment-link/route.ts`
- **Modified components**: `pay-now-dialog.tsx` (major rewrite), `record-payment-sheet.tsx` (add payment link action)
- **Modified types**: `src/types/index.ts` — extend `Payment` interface
- **Environment variables**: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (test keys)
- **Deployment**: Vercel free tier compatible — serverless API routes, no webhooks needed for Level 2 scope
