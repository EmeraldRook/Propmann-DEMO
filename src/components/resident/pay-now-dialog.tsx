'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useDemoForm } from '@/hooks/use-demo-form';
import { formatRM } from '@/lib/format';

interface PayNowDialogProps {
  amount: number;
  children: React.ReactNode;
}

export function PayNowDialog({ amount, children }: PayNowDialogProps) {
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
                <SelectItem value="ewallet">e-Wallet (Touch &apos;n Go / GrabPay)</SelectItem>
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
