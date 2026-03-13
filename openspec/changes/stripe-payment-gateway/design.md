## Context

PropmannDEMO is a static Next.js 16 demo app (React 19, Tailwind v4, shadcn/ui) deployed to Vercel free tier. All data is in-memory mock data — no database, no backend state. The resident portal has a `PayNowDialog` that simulates payment via a method selector + toast. The manager dashboard has a `RecordPaymentSheet` for manual payment logging.

We're adding Stripe test-mode integration so demo users experience real payment UX (card forms, FPX bank redirects, GrabPay) without processing real money.

**Constraints:**
- Vercel free tier (10s serverless timeout, no persistent processes)
- No database — cannot persist payment state server-side
- Malaysian market — FPX and GrabPay are primary methods alongside cards
- Demo scope (Level 2) — real Stripe API calls but no webhook-based state management

## Goals / Non-Goals

**Goals:**
- Embed Stripe Payment Element in the resident Pay Now dialog with FPX, GrabPay, and card support
- Create Next.js Route Handlers for PaymentIntent creation and Payment Link generation
- Show a payment confirmation/receipt after successful payment with real Stripe transaction data
- Add a "Send Payment Link" action on the manager side
- Work on Vercel free tier with no additional infrastructure

**Non-Goals:**
- Webhook handling or server-side payment state persistence (Level 3 scope)
- Stripe Subscriptions for recurring rent (FPX doesn't support recurring; keep as one-time payments)
- Touch 'n Go eWallet (not natively supported by Stripe)
- Real payment processing or production Stripe keys
- Updating mock data arrays after payment (no database to sync)

## Decisions

### 1. Stripe Elements (Payment Element) over Checkout

**Choice:** Embedded Payment Element in the existing dialog
**Over:** Stripe Checkout (redirect to stripe.com)

**Rationale:** The Payment Element renders inline inside our dialog, keeping users in the app. It auto-displays available payment methods (card, FPX, GrabPay) based on the PaymentIntent currency (MYR). This provides a more impressive demo experience than redirecting to a generic Stripe page. The tradeoff is more client-side code, but the Payment Element handles most complexity.

### 2. Deferred PaymentIntent pattern (mode-based Elements init)

**Choice:** Initialize `<Elements>` with `mode: 'payment', amount, currency: 'myr'` — render the Payment Element immediately without a `clientSecret`. Create the PaymentIntent server-side only when the user clicks Pay (after `elements.submit()` validates the form).
**Over:** Fetching `clientSecret` before rendering Elements (requires a loading spinner on dialog open).

**Rationale:** The Payment Element renders instantly when the dialog opens — no API call needed up front. The flow is: (1) user opens dialog → Element renders immediately, (2) user fills in details and clicks Pay → `elements.submit()` validates, (3) fetch `clientSecret` from `/api/stripe/create-payment`, (4) call `stripe.confirmPayment({ elements, clientSecret })`. This is the recommended pattern from the latest `@stripe/react-stripe-js` docs and provides better perceived performance for the demo.

### 3. API route structure

**Choice:** Two Route Handlers under `src/app/api/stripe/`
- `create-payment/route.ts` — creates PaymentIntent, returns client_secret
- `create-payment-link/route.ts` — creates Stripe Payment Link, returns URL

**Rationale:** Minimal surface area. Each route does one thing. No shared middleware needed. Both are simple Stripe SDK calls well within the 10s serverless timeout.

### 4. Payment confirmation with `redirect: 'if_required'`

**Choice:** Call `stripe.confirmPayment()` with `redirect: 'if_required'` to handle card payments inline and only redirect for FPX/GrabPay.
**Over:** Always redirecting (default behavior without this flag), or webhook-based confirmation.

**Rationale:** Without `redirect: 'if_required'`, even card payments redirect to `return_url`, making it impossible to show an in-dialog receipt. With this flag: (a) card payments resolve inline and return the `paymentIntent` object — we use it to display receipt info (amount, method, transaction ID) directly in the dialog; (b) FPX and GrabPay still redirect to the bank/wallet as required, then return to our `return_url`. This is the key to having both an in-dialog receipt for cards and redirect support for local payment methods.

### 5. Stripe provider architecture

**Choice:** Create a `StripeProvider` wrapper component that loads `@stripe/stripe-js` via `loadStripe()` and wraps the payment dialog with `<Elements>` using `mode: 'payment'` options.
**Rationale:** `loadStripe()` is called once outside the component tree (module-level) to avoid re-creating on every render. The `<Elements>` provider receives `{ mode: 'payment', amount, currency: 'myr', appearance }` as options — no `clientSecret` needed at init time. This keeps the provider isolated and lazy-loadable.

### 6. FPX/GrabPay return URL handling

**Choice:** Use `return_url` pointing to `/resident/payments?payment_status=success&payment_intent={PAYMENT_INTENT_ID}` for redirect-based methods
**Rationale:** FPX and GrabPay redirect the user to their bank/wallet, then back. The return URL needs to be our payments page where we can show the confirmation. The Payment Element handles the redirect automatically when `return_url` is provided to `confirmPayment()`.

### 7. Environment variable pattern

**Choice:** `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (client) and `STRIPE_SECRET_KEY` (server-only)
**Rationale:** Standard Stripe + Next.js pattern. The `NEXT_PUBLIC_` prefix exposes the publishable key to the browser (safe — it's designed for this). The secret key stays server-side only in Route Handlers. Both use test-mode keys (`pk_test_*`, `sk_test_*`).

## Risks / Trade-offs

**[No Stripe keys configured]** → App must gracefully degrade. If env vars are missing, fall back to the existing simulated payment flow. This ensures the demo still works without Stripe setup.

**[FPX/GrabPay redirect leaves the app]** → User momentarily leaves the app during bank auth. Stripe's test mode shows a simulated bank page. The `return_url` brings them back. Acceptable for a demo.

**[No server-side payment verification]** → A determined user could fake a successful payment client-side. Acceptable for a demo app with no real money involved.

**[Stripe.js bundle size]** → `@stripe/stripe-js` loads Stripe's JS asynchronously from their CDN (~40KB). It's lazy-loaded only when the payment dialog opens, so no impact on initial page load.

**[Payment Link requires Stripe product/price]** → Stripe Payment Links need a Price object. We'll create an ad-hoc price in the API route using `stripe.prices.create()` with the payment amount. This is fine for test mode.
