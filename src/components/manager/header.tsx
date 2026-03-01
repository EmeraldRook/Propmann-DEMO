'use client';

import { Bell } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PropertySelector } from './property-selector';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-5" />
      <h1 className="text-lg font-semibold tracking-tight">{title}</h1>

      <div className="ml-auto flex items-center gap-3">
        <PropertySelector />
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-4" />
          <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px]">3</Badge>
        </Button>
      </div>
    </header>
  );
}
