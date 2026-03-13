'use client';

import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import type { PaymentIntent } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { formatRM } from '@/lib/format';

interface StripePaymentFormProps {
  amount: number; // in RM
  onSuccess?: () => void;
}

export function StripePaymentForm({ amount, onSuccess }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [completed, setCompleted] = useState<PaymentIntent | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setError(null);
    setPending(true);

    // Step 1: Validate the form
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? 'Validation failed');
      setPending(false);
      return;
    }

    // Step 2: Create PaymentIntent on server
    const res = await fetch('/api/stripe/create-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
      setPending(false);
      return;
    }

    // Step 3: Confirm payment — cards resolve inline, FPX/GrabPay redirect
    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret: data.clientSecret,
      redirect: 'if_required',
      confirmParams: {
        return_url: `${window.location.origin}/resident/payments?payment_status=success`,
      },
    });

    setPending(false);

    if (confirmError) {
      setError(confirmError.message ?? 'Payment failed');
    } else if (paymentIntent) {
      setCompleted(paymentIntent);
      onSuccess?.();
    }
  }

  // Receipt view after successful card payment
  if (completed) {
    return (
      <div className="text-center space-y-4 py-4">
        <CheckCircle2 className="size-12 text-green-600 mx-auto" />
        <div>
          <p className="text-lg font-semibold text-green-700">Payment Successful</p>
          <p className="text-2xl font-bold mt-1">{formatRM(amount)}</p>
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Transaction: <span className="font-mono text-xs">{completed.id}</span></p>
          <p>Method: <span className="capitalize">{completed.payment_method_types?.[0] ?? 'Card'}</span></p>
          <p>Status: <span className="capitalize text-green-600 font-medium">{completed.status}</span></p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement
        options={{
          layout: 'tabs',
        }}
      />
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      <Button
        type="submit"
        className="w-full bg-teal-700 hover:bg-teal-800"
        disabled={!stripe || !elements || pending}
      >
        {pending ? 'Processing…' : `Pay ${formatRM(amount)}`}
      </Button>
    </form>
  );
}
