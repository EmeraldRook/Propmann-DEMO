'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
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

export function SubmitRequestSheet() {
  const { open, setOpen, pending, submit } = useDemoForm({
    successMessage: 'Request submitted successfully',
  });

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');

  const canSubmit = title.trim() && category && priority && description.trim();

  function handleSubmit() {
    if (!canSubmit) return;
    submit(() => {
      setTitle('');
      setCategory('');
      setPriority('');
      setDescription('');
    });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="w-full bg-teal-700 hover:bg-teal-800">
          <Plus className="size-4 mr-2" />
          Submit New Request
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-2xl max-h-[90dvh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>New Maintenance Request</SheetTitle>
          <SheetDescription>Submit a request for your unit.</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 px-4">
          <div className="space-y-2">
            <Label htmlFor="req-title">Title</Label>
            <Input
              id="req-title"
              placeholder="e.g. Leaking kitchen tap"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="req-category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="req-category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="aircon">Air Conditioning</SelectItem>
                <SelectItem value="pest_control">Pest Control</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="req-priority">Priority</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger id="req-priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="req-desc">Description</Label>
            <Textarea
              id="req-desc"
              placeholder="Describe the issue in detail..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <SheetFooter>
          <Button
            className="w-full bg-teal-700 hover:bg-teal-800"
            disabled={!canSubmit || pending}
            onClick={handleSubmit}
          >
            {pending ? 'Submitting…' : 'Submit Request'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
