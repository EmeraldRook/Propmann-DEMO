## ADDED Requirements

### Requirement: Payment Link creation API
The system SHALL expose a POST endpoint at `/api/stripe/create-payment-link` that creates a Stripe Payment Link for a specified amount and resident description, and returns the shareable URL.

#### Scenario: Successful Payment Link creation
- **WHEN** a POST request is made to `/api/stripe/create-payment-link` with `{ "amount": 2350, "description": "Maintenance Fee - Unit 15C" }`
- **THEN** the server SHALL create a Stripe Product and Price for the specified amount in MYR, generate a Payment Link, and return `{ "url": "https://buy.stripe.com/test_xxx", "id": "plink_xxx" }` with status 200

#### Scenario: Missing required fields
- **WHEN** a POST request is made without `amount` or `description`
- **THEN** the server SHALL return status 400 with `{ "error": "Amount and description are required" }`

#### Scenario: Stripe keys not configured
- **WHEN** the `STRIPE_SECRET_KEY` environment variable is not set
- **THEN** the server SHALL return status 500 with `{ "error": "Stripe is not configured" }`

### Requirement: Send Payment Link action in manager UI
The system SHALL add a "Send Payment Link" action in the Record Payment sheet that generates a Stripe Payment Link and displays the shareable URL to the manager.

#### Scenario: Manager generates payment link
- **WHEN** a manager fills in the resident, amount, and type fields in the Record Payment sheet and clicks "Send Payment Link"
- **THEN** the system SHALL call `/api/stripe/create-payment-link` with the amount and a description derived from resident name and payment type, and display the returned URL in a copyable format

#### Scenario: Payment link generation without Stripe
- **WHEN** Stripe environment variables are NOT configured and the manager clicks "Send Payment Link"
- **THEN** the button SHALL either be hidden or show a tooltip indicating Stripe is not configured

#### Scenario: Copying the payment link
- **WHEN** a payment link URL is displayed after generation
- **THEN** the manager SHALL be able to click a copy button to copy the URL to clipboard, with a toast confirming "Link copied"
