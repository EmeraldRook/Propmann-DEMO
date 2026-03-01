'use client';

import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResidentHeader } from '@/components/resident/resident-header';
import { residentProfile } from '@/data/profile';
import { getAmenitiesByProperty, getBookingsByResident } from '@/data/amenities';
import { formatDate } from '@/lib/format';

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  available: 'default',
  maintenance: 'destructive',
  closed: 'outline',
};

export default function ResidentAmenitiesPage() {
  const amenities = getAmenitiesByProperty(residentProfile.propertyId);
  const myBookings = getBookingsByResident(residentProfile.id);

  return (
    <>
      <ResidentHeader title="Amenities" subtitle={residentProfile.propertyName} />

      <div className="px-4 pt-4 space-y-4 pb-4">
        {/* My bookings */}
        {myBookings.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">My Bookings</h3>
            {myBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="pt-3 pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{booking.amenityName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDate(booking.date, 'D MMM YYYY')} · {booking.startTime} - {booking.endTime}
                      </p>
                    </div>
                    <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'} className="capitalize text-[11px]">
                      {booking.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* All amenities */}
        <h3 className="text-sm font-semibold">Facilities</h3>
        <div className="grid grid-cols-2 gap-3">
          {amenities.map((amenity) => (
            <Card key={amenity.id} className="overflow-hidden">
              <CardContent className="pt-4 pb-3 space-y-2">
                <div className="flex items-start justify-between">
                  <span className="text-2xl">{amenity.icon}</span>
                  <Badge variant={statusVariant[amenity.status]} className="capitalize text-[10px]">
                    {amenity.status}
                  </Badge>
                </div>
                <p className="text-sm font-medium leading-snug">{amenity.name}</p>
                <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock className="size-3" />
                  {amenity.operatingHours}
                </p>
                {amenity.bookingRequired && amenity.status === 'available' && (
                  <Button size="sm" variant="outline" className="w-full h-7 text-xs mt-1">
                    Book
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
