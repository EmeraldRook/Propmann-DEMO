'use client';

import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ResidentHeaderProps {
  title: string;
  subtitle?: string;
}

export function ResidentHeader({ title, subtitle }: ResidentHeaderProps) {
  return (
    <header className="bg-gradient-to-br from-teal-700 to-teal-500 text-white px-4 pt-12 pb-6 rounded-b-3xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-teal-100 text-sm">{subtitle ?? 'Welcome back'}</p>
          <h1 className="text-xl font-bold mt-0.5">{title}</h1>
        </div>
        <button className="relative p-2 rounded-full bg-white/15 hover:bg-white/25 transition-colors">
          <Bell className="size-5" />
          <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px] bg-red-500 text-white border-0">
            2
          </Badge>
        </button>
      </div>
    </header>
  );
}
