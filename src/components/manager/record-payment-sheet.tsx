'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
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

export function RecordPaymentSheet() {
  const { open, setOpen, pending, submit } = useDemoForm({
    successMessage: 'Payment recorded',
  });

  const [resident, setResident] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');
  const [method, setMethod] = useState('');

  const canSubmit = resident && amount && type && method;

  function handleSubmit() {
    if (!canSubmit) return;
    submit(() => {
      setResident('');
      setAmount('');
      setType('');
      setMethod('');
    });
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
                <SelectItem value="R001">Ahmad Razali - Unit 12B</SelectItem>
                <SelectItem value="R003">Tan Wei Ming - Unit 15C</SelectItem>
                <SelectItem value="R005">Muhammad Faizal - Unit 10B</SelectItem>
                <SelectItem value="R007">Rajesh Krishnan - Unit 11C</SelectItem>
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
                <SelectItem value="rental">Rental</SelectItem>
                <SelectItem value="maintenance_fee">Maintenance Fee</SelectItem>
                <SelectItem value="penalty">Penalty</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="other">Other</SelectItem>
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
        </div>
        <SheetFooter>
          <Button
            className="w-full"
            disabled={!canSubmit || pending}
            onClick={handleSubmit}
          >
            {pending ? 'Recording…' : 'Record Payment'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
