'use client';

import { useState } from 'react';
import { Typography, Tag, Button, Modal, DatePicker, TimePicker } from 'antd';
import { amenities, bookings } from '@/data/amenities';
import { currentResident } from '@/data/residents';

const { Text } = Typography;

export default function AmenitiesPage() {
  const [showBooking, setShowBooking] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'browse' | 'mine'>('browse');
  const [submitting, setSubmitting] = useState(false);

  const myBookings = bookings.filter((b) => b.residentId === currentResident.id);
  const propAmenities = amenities.filter((a) => a.propertyId === currentResident.propertyId);
  const selectedAmenity = propAmenities.find((a) => a.id === showBooking);

  return (
    <div>
      {/* Header */}
      <div style={{ padding: '48px 20px 0', background: '#ffffff', borderBottom: '1px solid #f1f5f9' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: '0 0 16px' }}>Amenities</h1>
        <div style={{ display: 'flex', gap: 0 }}>
          {(['browse', 'mine'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '12px 0',
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${activeTab === tab ? '#0f766e' : 'transparent'}`,
                color: activeTab === tab ? '#0f766e' : '#64748b',
                fontWeight: activeTab === tab ? 600 : 500,
                fontSize: 14,
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {tab === 'browse' ? 'Browse' : 'My Bookings'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: 20 }}>
        {activeTab === 'browse' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {propAmenities.map((am) => (
              <div
                key={am.id}
                style={{
                  background: '#ffffff',
                  borderRadius: 16,
                  padding: 16,
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#1e293b', marginBottom: 4 }}>{am.name}</div>
                    <p style={{ fontSize: 12, color: '#64748b', margin: 0, lineHeight: 1.5 }}>{am.description}</p>
                  </div>
                  {am.available ? (
                    <Tag
                      style={{ borderRadius: 12, background: '#ecfdf5', color: '#10b981', border: 'none', fontWeight: 500, fontSize: 11 }}
                    >
                      Available
                    </Tag>
                  ) : (
                    <Tag style={{ borderRadius: 12, background: '#fef2f2', color: '#ef4444', border: 'none', fontWeight: 500, fontSize: 11 }}>
                      Unavailable
                    </Tag>
                  )}
                </div>
                {am.available && (
                  <button
                    onClick={() => setShowBooking(am.id)}
                    style={{
                      width: '100%',
                      padding: '12px 0',
                      borderRadius: 12,
                      border: '1px solid #0f766e',
                      background: 'white',
                      color: '#0f766e',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Book Now
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {myBookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <Text type="secondary">No bookings yet</Text>
              </div>
            ) : (
              myBookings.map((bk) => (
                <div
                  key={bk.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: 16,
                    padding: 16,
                    border: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 12,
                      background: bk.status === 'cancelled' ? '#f1f5f9' : 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: bk.status === 'cancelled' ? '#64748b' : 'white',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: 9, fontWeight: 700 }}>
                      {new Date(bk.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                    </span>
                    <span style={{ fontSize: 16, fontWeight: 800 }}>{new Date(bk.date).getDate()}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{bk.amenityName}</div>
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
                      {bk.startTime} - {bk.endTime}
                    </div>
                  </div>
                  <Tag
                    style={{
                      borderRadius: 12,
                      border: 'none',
                      background: bk.status === 'confirmed' ? '#ecfdf5' : '#f1f5f9',
                      color: bk.status === 'confirmed' ? '#10b981' : '#64748b',
                      fontWeight: 500,
                      fontSize: 11,
                    }}
                  >
                    {bk.status.charAt(0).toUpperCase() + bk.status.slice(1)}
                  </Tag>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <Modal
        open={!!selectedAmenity}
        onCancel={() => setShowBooking(null)}
        title={`Book ${selectedAmenity?.name}`}
        footer={null}
      >
        <div style={{ padding: '16px 0' }}>
          <div style={{ marginBottom: 16 }}>
            <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 8 }}>Select Date</Text>
            <DatePicker style={{ width: '100%' }} size="large" />
          </div>
          <div style={{ marginBottom: 24 }}>
            <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 8 }}>Select Time</Text>
            <TimePicker.RangePicker style={{ width: '100%' }} size="large" format="HH:mm" />
          </div>
          <Button
            type="primary"
            block
            size="large"
            loading={submitting}
            onClick={() => {
              setSubmitting(true);
              setTimeout(() => { setSubmitting(false); setShowBooking(null); }, 1000);
            }}
            style={{ borderRadius: 12 }}
          >
            Confirm Booking
          </Button>
        </div>
      </Modal>
    </div>
  );
}
