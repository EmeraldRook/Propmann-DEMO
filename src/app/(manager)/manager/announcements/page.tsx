'use client';

import { Megaphone } from 'lucide-react';
import { Header } from '@/components/manager/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useProperty } from '@/context/PropertyContext';
import { getAnnouncementsByProperty } from '@/data/announcements';
import { formatRelativeTime } from '@/lib/format';

const categoryVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  general: 'secondary',
  maintenance: 'outline',
  event: 'default',
  emergency: 'destructive',
  billing: 'secondary',
};

export default function AnnouncementsPage() {
  const { selectedProperty } = useProperty();
  const announcements = getAnnouncementsByProperty(selectedProperty.id);

  return (
    <>
      <Header title="Announcements" />
      <div className="p-4 lg:p-6 space-y-4">
        {announcements.map((announcement) => {
          const readPercent = Math.round((announcement.readCount / announcement.totalRecipients) * 100);
          return (
            <Card key={announcement.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2 mt-0.5">
                      <Megaphone className="size-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-semibold leading-snug">{announcement.title}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        {announcement.author} &middot; {formatRelativeTime(announcement.createdAt)}
                      </p>
                    </div>
                  </div>
                  <Badge variant={categoryVariant[announcement.category]} className="capitalize shrink-0">
                    {announcement.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{announcement.content}</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Read by</span>
                    <span>{announcement.readCount} / {announcement.totalRecipients} ({readPercent}%)</span>
                  </div>
                  <Progress value={readPercent} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
