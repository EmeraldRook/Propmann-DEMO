'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResidentHeader } from '@/components/resident/resident-header';
import { residentProfile } from '@/data/profile';
import { getAnnouncementsByProperty } from '@/data/announcements';
import { formatRelativeTime } from '@/lib/format';

const categoryVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  general: 'secondary',
  maintenance: 'outline',
  event: 'default',
  emergency: 'destructive',
  billing: 'secondary',
};

export default function ResidentAnnouncementsPage() {
  const announcements = getAnnouncementsByProperty(residentProfile.propertyId);

  return (
    <>
      <ResidentHeader title="Announcements" subtitle={residentProfile.propertyName} />

      <div className="px-4 pt-4 space-y-3 pb-4">
        {announcements.map((a) => (
          <Card key={a.id}>
            <CardContent className="pt-4 pb-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium leading-snug">{a.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {a.author} · {formatRelativeTime(a.createdAt)}
                  </p>
                </div>
                <Badge variant={categoryVariant[a.category]} className="capitalize shrink-0 text-[11px]">
                  {a.category}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{a.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
