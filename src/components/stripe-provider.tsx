'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

interface StripeProviderProps {
  amount: number; // in RM
  children: React.ReactNode;
}

export function StripeProvider({ amount, children }: StripeProviderProps) {
  if (!stripePromise) return null;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: 'payment',
        amount: Math.round(amount * 100), // RM to sen
        currency: 'myr',
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#0f766e', // teal-700 to match app theme
          },
        },
      }}
    >
      {children}
    </Elements>
  );
}

export function isStripeEnabled(): boolean {
  return !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
}
