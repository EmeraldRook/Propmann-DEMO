import {
  DollarSign,
  Wrench,
  UserPlus,
  UserMinus,
  Megaphone,
  CalendarCheck,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ActivityItem } from '@/types';
import { formatRelativeTime } from '@/lib/format';

const iconMap: Record<ActivityItem['type'], typeof DollarSign> = {
  payment: DollarSign,
  maintenance: Wrench,
  move_in: UserPlus,
  move_out: UserMinus,
  announcement: Megaphone,
  booking: CalendarCheck,
};

const colorMap: Record<ActivityItem['type'], string> = {
  payment: 'text-emerald-600 bg-emerald-50',
  maintenance: 'text-amber-600 bg-amber-50',
  move_in: 'text-blue-600 bg-blue-50',
  move_out: 'text-rose-600 bg-rose-50',
  announcement: 'text-purple-600 bg-purple-50',
  booking: 'text-teal-600 bg-teal-50',
};

interface ActivityFeedProps {
  items: ActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {items.slice(0, 8).map((item) => {
          const Icon = iconMap[item.type];
          const color = colorMap[item.type];
          return (
            <div key={item.id} className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors">
              <div className={`rounded-md p-1.5 ${color}`}>
                <Icon className="size-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-snug">{item.title}</p>
                <p className="text-xs text-muted-foreground truncate">{item.description}</p>
              </div>
              <span className="text-[11px] text-muted-foreground whitespace-nowrap mt-0.5">
                {formatRelativeTime(item.timestamp)}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
