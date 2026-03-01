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

export function CreateAnnouncementSheet() {
  const { open, setOpen, pending, submit } = useDemoForm({
    successMessage: 'Announcement published',
  });

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  const canSubmit = title.trim() && category && content.trim();

  function handleSubmit() {
    if (!canSubmit) return;
    submit(() => {
      setTitle('');
      setCategory('');
      setContent('');
    });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="size-4 mr-2" />
          Create Announcement
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>New Announcement</SheetTitle>
          <SheetDescription>Publish an announcement to all residents.</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 px-4">
          <div className="space-y-2">
            <Label htmlFor="ann-title">Title</Label>
            <Input
              id="ann-title"
              placeholder="e.g. Water supply interruption"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ann-category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="ann-category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ann-content">Content</Label>
            <Textarea
              id="ann-content"
              placeholder="Write your announcement here..."
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <SheetFooter>
          <Button
            className="w-full"
            disabled={!canSubmit || pending}
            onClick={handleSubmit}
          >
            {pending ? 'Publishing…' : 'Publish Announcement'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
