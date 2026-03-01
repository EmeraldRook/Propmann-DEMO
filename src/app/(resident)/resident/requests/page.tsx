'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResidentHeader } from '@/components/resident/resident-header';
import { SubmitRequestSheet } from '@/components/resident/submit-request-sheet';
import { residentProfile } from '@/data/profile';
import { getMaintenanceByResident } from '@/data/maintenance';
import { formatRelativeTime } from '@/lib/format';
import type { MaintenanceStatus } from '@/types';

const statusVariant: Record<MaintenanceStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  new: 'default',
  in_progress: 'secondary',
  completed: 'outline',
  closed: 'outline',
};

const statusLabel: Record<MaintenanceStatus, string> = {
  new: 'New',
  in_progress: 'In Progress',
  completed: 'Completed',
  closed: 'Closed',
};

export default function ResidentRequestsPage() {
  const requests = getMaintenanceByResident(residentProfile.id);

  return (
    <>
      <ResidentHeader title="Maintenance" subtitle="Requests" />

      <div className="px-4 pt-4 space-y-3 pb-4">
        <SubmitRequestSheet />

        {requests.map((req) => (
          <Card key={req.id}>
            <CardContent className="pt-4 pb-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">{req.title}</p>
                  <p className="text-xs text-muted-foreground capitalize mt-0.5">{req.category.replace('_', ' ')}</p>
                </div>
                <Badge variant={statusVariant[req.status]} className="shrink-0 text-[11px]">
                  {statusLabel[req.status]}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{req.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{formatRelativeTime(req.createdAt)}</span>
                {req.assignedTo && <span>Assigned: {req.assignedTo}</span>}
              </div>
            </CardContent>
          </Card>
        ))}

        {requests.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No maintenance requests</p>
          </div>
        )}
      </div>
    </>
  );
}
