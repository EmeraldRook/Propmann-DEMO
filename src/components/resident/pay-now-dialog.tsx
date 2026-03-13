'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { StripeProvider, isStripeEnabled } from '@/components/stripe-provider';
import { StripePaymentForm } from '@/components/resident/stripe-payment-form';
import { useDemoForm } from '@/hooks/use-demo-form';
import { formatRM } from '@/lib/format';

interface PayNowDialogProps {
  amount: number;
  children: React.ReactNode;
}

export function PayNowDialog({ amount, children }: PayNowDialogProps) {
  if (isStripeEnabled()) {
    return <StripePayNowDialog amount={amount}>{children}</StripePayNowDialog>;
  }
  return <SimulatedPayNowDialog amount={amount}>{children}</SimulatedPayNowDialog>;
}

// ── Stripe-powered dialog ──────────────────────────────────────────

function StripePayNowDialog({ amount, children }: PayNowDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Confirm Payment</DialogTitle>
          <DialogDescription>
            You are about to pay <span className="font-semibold text-foreground">{formatRM(amount)}</span>.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 -mx-6 px-6">
          <StripeProvider amount={amount}>
            <StripePaymentForm amount={amount} onSuccess={() => {}} />
          </StripeProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Simulated fallback (no Stripe keys) ────────────────────────────

function SimulatedPayNowDialog({ amount, children }: PayNowDialogProps) {
  const { open, setOpen, pending, submit } = useDemoForm({
    successMessage: `Payment of ${formatRM(amount)} processed`,
  });

  const [method, setMethod] = useState('');

  function handleConfirm() {
    if (!method) return;
    submit(() => setMethod(''));
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Payment</DialogTitle>
          <DialogDescription>
            You are about to pay <span className="font-semibold text-foreground">{formatRM(amount)}</span>.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="pay-method">Payment Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger id="pay-method">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fpx">FPX Online Banking</SelectItem>
                <SelectItem value="credit_card">Credit / Debit Card</SelectItem>
                <SelectItem value="ewallet">e-Wallet (GrabPay)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="w-full bg-teal-700 hover:bg-teal-800"
            disabled={!method || pending}
            onClick={handleConfirm}
          >
            {pending ? 'Processing…' : `Pay ${formatRM(amount)}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
