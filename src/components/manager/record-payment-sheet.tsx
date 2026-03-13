'use client';

import { useState } from 'react';
import { Plus, Link2, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useDemoForm } from '@/hooks/use-demo-form';
import { isStripeEnabled } from '@/components/stripe-provider';

const residents: Record<string, string> = {
  R001: 'Ahmad Razali - Unit 12B',
  R003: 'Tan Wei Ming - Unit 15C',
  R005: 'Muhammad Faizal - Unit 10B',
  R007: 'Rajesh Krishnan - Unit 11C',
};

const typeLabels: Record<string, string> = {
  rental: 'Rental',
  maintenance_fee: 'Maintenance Fee',
  penalty: 'Penalty',
  deposit: 'Deposit',
  other: 'Other',
};

export function RecordPaymentSheet() {
  const { open, setOpen, pending, submit } = useDemoForm({
    successMessage: 'Payment recorded',
  });

  const [resident, setResident] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [method, setMethod] = useState('');
  const [linkPending, setLinkPending] = useState(false);
  const [paymentLink, setPaymentLink] = useState('');
  const [copied, setCopied] = useState(false);

  const canSubmit = resident && amount && type && method;
  const canSendLink = resident && amount && type;
  const stripeEnabled = isStripeEnabled();

  function resetForm() {
    setResident('');
    setAmount('');
    setType('');
    setMethod('');
    setPaymentLink('');
    setCopied(false);
  }

  function handleSubmit() {
    if (!canSubmit) return;
    submit(resetForm);
  }

  async function handleSendLink() {
    if (!canSendLink) return;
    setLinkPending(true);
    setPaymentLink('');

    try {
      const description = `${typeLabels[type] ?? type} - ${residents[resident] ?? resident}`;
      const res = await fetch('/api/stripe/create-payment-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(amount), description }),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        setPaymentLink(data.url);
        toast.success('Payment link created');
      }
    } catch {
      toast.error('Failed to create payment link');
    } finally {
      setLinkPending(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(paymentLink);
    setCopied(true);
    toast.success('Link copied');
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="size-4 mr-2" />
          Record Payment
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Record Payment</SheetTitle>
          <SheetDescription>Record a manual payment from a resident.</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 px-4">
          <div className="space-y-2">
            <Label htmlFor="pay-resident">Resident</Label>
            <Select value={resident} onValueChange={setResident}>
              <SelectTrigger id="pay-resident">
                <SelectValue placeholder="Select resident" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(residents).map(([id, label]) => (
                  <SelectItem key={id} value={id}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pay-amount">Amount (RM)</Label>
            <Input
              id="pay-amount"
              type="number"
              placeholder="0.00"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pay-type">Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="pay-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(typeLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pay-method">Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger id="pay-method">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online_banking">Online Banking</SelectItem>
                <SelectItem value="fpx">FPX</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="cheque">Cheque</SelectItem>
                <SelectItem value="auto_debit">Auto Debit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Payment Link result */}
          {paymentLink && (
            <div className="space-y-2">
              <Label>Payment Link</Label>
              <div className="flex items-center gap-2">
                <Input value={paymentLink} readOnly className="text-xs font-mono" />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  onClick={handleCopy}
                >
                  {copied ? <Check className="size-4 text-green-600" /> : <Copy className="size-4" />}
                </Button>
              </div>
            </div>
          )}
        </div>
        <SheetFooter>
          <div className="flex w-full gap-2">
            {stripeEnabled && (
              <Button
                variant="outline"
                className="flex-1"
                disabled={!canSendLink || linkPending}
                onClick={handleSendLink}
              >
                <Link2 className="size-4 mr-2" />
                {linkPending ? 'Creating…' : 'Send Payment Link'}
              </Button>
            )}
            <Button
              className="flex-1"
              disabled={!canSubmit || pending}
              onClick={handleSubmit}
            >
              {pending ? 'Recording…' : 'Record Payment'}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
