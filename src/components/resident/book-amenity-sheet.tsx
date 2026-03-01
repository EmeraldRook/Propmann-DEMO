'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

interface BookAmenitySheetProps {
  amenityName: string;
  children: React.ReactNode;
}

export function BookAmenitySheet({ amenityName, children }: BookAmenitySheetProps) {
  const { open, setOpen, pending, submit } = useDemoForm({
    successMessage: `Booking confirmed for ${amenityName}`,
  });

  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [notes, setNotes] = useState('');

  const canSubmit = date && timeSlot;

  function handleSubmit() {
    if (!canSubmit) return;
    submit(() => {
      setDate('');
      setTimeSlot('');
      setNotes('');
    });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-2xl max-h-[90dvh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Book {amenityName}</SheetTitle>
          <SheetDescription>Select your preferred date and time slot.</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 px-4">
          <div className="space-y-2">
            <Label htmlFor="book-date">Date</Label>
            <Input
              id="book-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="book-time">Time Slot</Label>
            <Select value={timeSlot} onValueChange={setTimeSlot}>
              <SelectTrigger id="book-time">
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="07:00-09:00">7:00 AM - 9:00 AM</SelectItem>
                <SelectItem value="09:00-11:00">9:00 AM - 11:00 AM</SelectItem>
                <SelectItem value="11:00-13:00">11:00 AM - 1:00 PM</SelectItem>
                <SelectItem value="14:00-16:00">2:00 PM - 4:00 PM</SelectItem>
                <SelectItem value="16:00-18:00">4:00 PM - 6:00 PM</SelectItem>
                <SelectItem value="18:00-20:00">6:00 PM - 8:00 PM</SelectItem>
                <SelectItem value="20:00-22:00">8:00 PM - 10:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="book-notes">Notes (optional)</Label>
            <Textarea
              id="book-notes"
              placeholder="Any special requirements..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        <SheetFooter>
          <Button
            className="w-full bg-teal-700 hover:bg-teal-800"
            disabled={!canSubmit || pending}
            onClick={handleSubmit}
          >
            {pending ? 'Booking…' : 'Confirm Booking'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
