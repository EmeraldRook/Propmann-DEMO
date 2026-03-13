## 1. Setup & Dependencies

- [x] 1.1 Install `stripe` (server) and `@stripe/stripe-js` + `@stripe/react-stripe-js` (client) npm packages
- [x] 1.2 Add `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to `.env.local` with test keys placeholder and add `.env.local` to `.gitignore` if not already. Note: `NEXT_PUBLIC_` vars are inlined at build time — on Vercel, set them in the dashboard before deploying
- [x] 1.3 Create `src/lib/stripe.ts` — server-side Stripe client initialization (lazy, checks for env var)
- [x] 1.4 Create `src/components/stripe-provider.tsx` — client-side `StripeProvider` component: call `loadStripe()` at module level (outside component), wrap children with `<Elements>` using `{ mode: 'payment', amount (in sen), currency: 'myr', appearance }` options — no `clientSecret` needed at init

## 2. API Routes

- [x] 2.1 Create `src/app/api/stripe/create-payment/route.ts` — POST handler that creates a PaymentIntent; receives amount in RM, converts to sen (× 100), sets currency to 'myr' with `automatic_payment_methods` enabled, returns `clientSecret`; validates amount, checks for Stripe config
- [x] 2.2 Create `src/app/api/stripe/create-payment-link/route.ts` — POST handler that creates a Product + Price + Payment Link for given amount/description in MYR, returns `url` and `id`; validates inputs, checks for Stripe config

## 3. Payment Type Extension

- [x] 3.1 Extend `Payment` interface in `src/types/index.ts` with optional fields: `gatewayProvider`, `gatewayTransactionId`, `gatewayStatus`

## 4. Resident Pay Now Dialog (Stripe Elements)

- [x] 4.1 Create `src/components/resident/stripe-payment-form.tsx` — embedded Payment Element form with Pay button, loading state, and error display. Submit flow: (1) `elements.submit()` to validate, (2) fetch `clientSecret` from `/api/stripe/create-payment`, (3) `stripe.confirmPayment({ elements, clientSecret, redirect: 'if_required', confirmParams: { return_url } })`. Card payments resolve inline (returns `paymentIntent`); FPX/GrabPay redirect automatically.
- [x] 4.2 Refactor `src/components/resident/pay-now-dialog.tsx` — wrap `StripePaymentForm` in `StripeProvider` (no upfront API call needed — Elements renders immediately in deferred mode); fall back to simulated flow when `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is not set
- [x] 4.3 Create payment receipt/success view inside the dialog — display amount, payment method, transaction ID (PaymentIntent ID), and timestamp; shown after inline card confirmation using the `paymentIntent` object returned by `confirmPayment`

## 5. Redirect Return Handling (FPX / GrabPay)

- [x] 5.1 Update `src/app/(resident)/resident/payments/page.tsx` to detect `payment_status` and `payment_intent` query params and display a success banner/dialog with transaction details when present

## 6. Manager Payment Links

- [x] 6.1 Update `src/components/manager/record-payment-sheet.tsx` — add a "Send Payment Link" button alongside "Record Payment"; on click, call `/api/stripe/create-payment-link` with resident/amount/type data
- [x] 6.2 Add payment link result display — show the generated URL in a copyable field with a copy-to-clipboard button and toast confirmation; hide the button when Stripe is not configured

## 7. Cleanup & Polish

- [x] 7.1 Remove Touch 'n Go from any UI labels or payment method references (pay-now-dialog fallback, record-payment-sheet method selector)
- [x] 7.2 Verify build succeeds (`npm run build`) and no TypeScript errors
- [ ] 7.3 Test locally with Stripe test keys — requires real `sk_test_` / `pk_test_` keys in `.env.local` — card payment, FPX redirect, GrabPay redirect, payment link generation
