import { Building, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Property } from '@/types';
import { getOccupancyPercent, formatRM } from '@/lib/format';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const occupancy = getOccupancyPercent(property.occupiedUnits, property.totalUnits);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <Building className="size-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm font-semibold leading-snug">{property.name}</CardTitle>
            <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <MapPin className="size-3" />
              {property.city}, {property.state}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Occupancy</span>
          <span className="font-medium">{property.occupiedUnits}/{property.totalUnits} units</span>
        </div>
        <Progress value={occupancy} className="h-2" />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Maintenance Fee</span>
          <span className="font-medium">{formatRM(property.maintenanceFee)}/mo</span>
        </div>
      </CardContent>
    </Card>
  );
}
