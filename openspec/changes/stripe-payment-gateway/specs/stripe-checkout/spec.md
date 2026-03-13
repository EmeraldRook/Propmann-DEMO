## ADDED Requirements

### Requirement: PaymentIntent creation API
The system SHALL expose a POST endpoint at `/api/stripe/create-payment` that creates a Stripe PaymentIntent with the specified amount in MYR currency and returns the `client_secret` to the caller. The amount is received in RM (e.g., 2350) and SHALL be converted to sen (smallest currency unit) by multiplying by 100 (e.g., 235000) before passing to Stripe.

#### Scenario: Successful PaymentIntent creation
- **WHEN** a POST request is made to `/api/stripe/create-payment` with `{ "amount": 2350 }` in the body (amount in RM)
- **THEN** the server SHALL create a Stripe PaymentIntent for 235000 sen (RM 2,350) in MYR currency with `automatic_payment_methods` enabled and return `{ "clientSecret": "pi_xxx_secret_xxx" }` with status 200

#### Scenario: Missing amount
- **WHEN** a POST request is made to `/api/stripe/create-payment` without an `amount` field
- **THEN** the server SHALL return status 400 with `{ "error": "Amount is required" }`

#### Scenario: Stripe keys not configured
- **WHEN** the `STRIPE_SECRET_KEY` environment variable is not set
- **THEN** the server SHALL return status 500 with `{ "error": "Stripe is not configured" }`

### Requirement: Embedded Payment Element in Pay Now dialog
The system SHALL replace the simulated payment method selector in the Pay Now dialog with a Stripe Payment Element that displays available payment methods (Credit/Debit Card, FPX, GrabPay). The `<Elements>` provider SHALL be initialized in deferred mode (`mode: 'payment'`, `amount`, `currency: 'myr'`) so the Payment Element renders immediately without an upfront server call.

#### Scenario: Dialog opens with Stripe configured
- **WHEN** a resident opens the Pay Now dialog and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set
- **THEN** the dialog SHALL immediately render the Stripe Payment Element with available Malaysian payment methods (no loading spinner for API call — the PaymentIntent is created only at submit time)

#### Scenario: Dialog opens without Stripe configured
- **WHEN** a resident opens the Pay Now dialog and Stripe environment variables are NOT set
- **THEN** the dialog SHALL fall back to the existing simulated payment flow (method selector + toast confirmation)

### Requirement: Payment confirmation via card
The system SHALL confirm card payments inline using `stripe.confirmPayment()` with `redirect: 'if_required'` so that card payments resolve without a redirect, and display a success receipt within the dialog. The submit flow SHALL be: (1) call `elements.submit()` to validate, (2) fetch `clientSecret` from `/api/stripe/create-payment`, (3) call `stripe.confirmPayment({ elements, clientSecret, redirect: 'if_required' })`.

#### Scenario: Successful card payment
- **WHEN** a resident enters test card number `4242 4242 4242 4242` with any future expiry and any CVC, and clicks Pay
- **THEN** `confirmPayment` SHALL resolve inline (no redirect) and return the `paymentIntent` object, and the dialog SHALL display a receipt showing the amount paid, payment method ("Card"), and the Stripe PaymentIntent ID as a transaction reference

#### Scenario: Declined card payment
- **WHEN** a resident enters test card number `4000 0000 0000 0002` (always declines) and clicks Pay
- **THEN** the Payment Element SHALL display an inline error message from Stripe indicating the card was declined

### Requirement: Payment confirmation via FPX
The system SHALL support FPX payments by providing a `return_url` to `stripe.confirmPayment()` so that after the bank redirect, the resident returns to the payments page with confirmation.

#### Scenario: Successful FPX payment
- **WHEN** a resident selects FPX, chooses a test bank, and clicks Pay
- **THEN** the browser SHALL redirect to Stripe's test FPX page, and upon clicking "Authenticate", redirect back to `/resident/payments?payment_status=success&payment_intent={id}`

#### Scenario: FPX payment return page
- **WHEN** the resident lands on `/resident/payments` with `payment_status=success` and `payment_intent` query parameters
- **THEN** the page SHALL display a payment success banner or dialog showing the confirmed amount and transaction reference

### Requirement: Payment confirmation via GrabPay
The system SHALL support GrabPay payments using the same redirect-based flow as FPX.

#### Scenario: Successful GrabPay payment
- **WHEN** a resident selects GrabPay and clicks Pay
- **THEN** the browser SHALL redirect to Stripe's test GrabPay page, and upon completion, redirect back to `/resident/payments?payment_status=success&payment_intent={id}`

### Requirement: Stripe provider component
The system SHALL provide a `StripeProvider` component that calls `loadStripe()` at module level (outside the component tree) and wraps payment UI with the `<Elements>` provider using `mode: 'payment'` options (amount, currency: 'myr', appearance).

#### Scenario: Lazy loading
- **WHEN** the Pay Now dialog is opened for the first time
- **THEN** the Stripe.js library SHALL be loaded asynchronously from Stripe's CDN (not on initial page load)

#### Scenario: Elements initialization without clientSecret
- **WHEN** the `StripeProvider` renders with an amount prop
- **THEN** the `<Elements>` provider SHALL be initialized with `{ mode: 'payment', amount: <amount in sen>, currency: 'myr' }` — no `clientSecret` required at this stage

### Requirement: Payment type extension
The system SHALL extend the `Payment` TypeScript interface with optional gateway fields.

#### Scenario: Gateway fields present
- **WHEN** a payment has been processed through Stripe
- **THEN** the Payment object MAY include `gatewayProvider` ("stripe"), `gatewayTransactionId` (PaymentIntent ID), and `gatewayStatus` ("succeeded" | "processing" | "failed")
