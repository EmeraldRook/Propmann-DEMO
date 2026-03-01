import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  badge?: { label: string; variant?: 'default' | 'secondary' | 'destructive' | 'outline' };
  progress?: { value: number; label: string };
  trend?: string;
}

export function StatCard({ label, value, icon: Icon, badge, progress, trend }: StatCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            {trend && <p className="text-xs text-muted-foreground">{trend}</p>}
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <Icon className="size-5 text-primary" />
            </div>
            {badge && (
              <Badge variant={badge.variant ?? 'secondary'} className="text-xs">
                {badge.label}
              </Badge>
            )}
          </div>
        </div>
        {progress && (
          <div className="mt-4 space-y-1.5">
            <Progress value={progress.value} className="h-2" />
            <p className="text-xs text-muted-foreground">{progress.label}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
