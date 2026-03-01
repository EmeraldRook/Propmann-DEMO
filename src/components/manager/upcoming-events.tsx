import { CalendarDays, Wrench, Users, PartyPopper, ClipboardCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { UpcomingEvent } from '@/types';
import { formatDate } from '@/lib/format';

const typeIcons: Record<UpcomingEvent['type'], typeof CalendarDays> = {
  meeting: Users,
  maintenance: Wrench,
  event: PartyPopper,
  inspection: ClipboardCheck,
};

const typeColors: Record<UpcomingEvent['type'], string> = {
  meeting: 'text-blue-600 bg-blue-50',
  maintenance: 'text-amber-600 bg-amber-50',
  event: 'text-purple-600 bg-purple-50',
  inspection: 'text-teal-600 bg-teal-50',
};

interface UpcomingEventsProps {
  events: UpcomingEvent[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {events.slice(0, 5).map((event) => {
          const Icon = typeIcons[event.type];
          const color = typeColors[event.type];
          return (
            <div key={event.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors">
              <div className={`rounded-md p-1.5 ${color}`}>
                <Icon className="size-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-snug">{event.title}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(event.date, 'D MMM')} &middot; {event.time}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
