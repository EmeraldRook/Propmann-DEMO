'use client';

import React from 'react';
import ResidentHeader from '@/components/resident/ResidentHeader';
import BottomTabBar from '@/components/resident/BottomTabBar';
import { residentProfile } from '@/data/profile';
import { getAmenitiesByProperty, getBookingsByResident } from '@/data/amenities';
import { formatDate } from '@/lib/format';

const statusColors: Record<string, { bg: string; color: string }> = {
  available: { bg: '#dcfce7', color: '#16a34a' },
  maintenance: { bg: '#fef3c7', color: '#d97706' },
  closed: { bg: '#fee2e2', color: '#dc2626' },
};

export default function ResidentAmenitiesPage() {
  const amenities = getAmenitiesByProperty(residentProfile.propertyId);
  const myBookings = getBookingsByResident(residentProfile.id);

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      <ResidentHeader greeting="Amenities" />

      <div style={{ padding: '16px' }}>
        {/* My bookings */}
        {myBookings.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, color: '#1a1a1a' }}>
              My Bookings
            </div>
            {myBookings.map((booking) => (
              <div
                key={booking.id}
                style={{
                  background: '#ffffff',
                  borderRadius: 14,
                  padding: 16,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  marginBottom: 8,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{booking.amenityName}</div>
                    <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
                      {formatDate(booking.date)} · {booking.startTime} - {booking.endTime}
                    </div>
                  </div>
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: 10,
                      fontSize: 11,
                      fontWeight: 600,
                      background: booking.status === 'confirmed' ? '#dcfce7' : '#fef3c7',
                      color: booking.status === 'confirmed' ? '#16a34a' : '#d97706',
                    }}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Amenities grid */}
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, color: '#1a1a1a' }}>
          Available Amenities
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {amenities.map((amenity) => {
            const sc = statusColors[amenity.status];
            return (
              <div
                key={amenity.id}
                style={{
                  background: '#ffffff',
                  borderRadius: 14,
                  padding: 16,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{amenity.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{amenity.name}</div>
                <div style={{ fontSize: 11, color: '#888', marginBottom: 8, lineHeight: 1.4 }}>
                  {amenity.operatingHours}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: 8,
                      fontSize: 10,
                      fontWeight: 600,
                      background: sc.bg,
                      color: sc.color,
                    }}
                  >
                    {amenity.status.charAt(0).toUpperCase() + amenity.status.slice(1)}
                  </span>
                  {amenity.bookingRequired && amenity.status === 'available' && (
                    <button
                      style={{
                        background: '#0f766e',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '5px 12px',
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Book
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomTabBar />
    </div>
  );
}
