'use client';

import { Calendar, Clock } from 'lucide-react';
import { Header } from '@/components/manager/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useProperty } from '@/context/PropertyContext';
import { getAmenitiesByProperty, getBookingsByProperty } from '@/data/amenities';
import { formatDate } from '@/lib/format';
import { toast } from 'sonner';

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  available: 'default',
  maintenance: 'destructive',
  closed: 'outline',
};

const bookingVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  confirmed: 'default',
  pending: 'secondary',
  cancelled: 'outline',
};

export default function AmenitiesPage() {
  const { selectedProperty } = useProperty();
  const amenities = getAmenitiesByProperty(selectedProperty.id);
  const bookings = getBookingsByProperty(selectedProperty.id);

  return (
    <>
      <Header title="Amenities" />
      <div className="p-4 lg:p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {amenities.map((amenity) => (
            <Card key={amenity.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{amenity.icon}</span>
                    <CardTitle className="text-sm font-semibold">{amenity.name}</CardTitle>
                  </div>
                  <Badge variant={statusVariant[amenity.status]} className="capitalize">
                    {amenity.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">{amenity.description}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {amenity.operatingHours}
                </div>
                {amenity.maxCapacity && (
                  <p className="text-xs text-muted-foreground">Max capacity: {amenity.maxCapacity}</p>
                )}
                {amenity.bookingRequired && (
                  <Badge variant="outline" className="text-xs">Booking Required</Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {bookings.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Upcoming Bookings</h2>
            <div className="grid gap-3">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <Calendar className="size-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{booking.amenityName}</p>
                          <p className="text-xs text-muted-foreground">
                            {booking.residentName} ({booking.unit}) &middot;{' '}
                            {formatDate(booking.date, 'D MMM YYYY')} &middot;{' '}
                            {booking.startTime} - {booking.endTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        {booking.status === 'pending' ? (
                          <>
                            <Button
                              size="sm"
                              variant="default"
                              className="h-7 text-xs"
                              onClick={() => toast.success(`Booking ${booking.id} approved`)}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs"
                              onClick={() => toast.success(`Booking ${booking.id} rejected`)}
                            >
                              Reject
                            </Button>
                          </>
                        ) : (
                          <Badge variant={bookingVariant[booking.status]} className="capitalize">
                            {booking.status}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
