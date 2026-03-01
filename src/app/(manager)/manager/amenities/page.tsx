'use client';

import React from 'react';
import { Card, Tag, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useProperty } from '@/context/PropertyContext';
import { getAmenitiesByProperty, getBookingsByProperty } from '@/data/amenities';
import type { AmenityBooking } from '@/types';
import { formatDate } from '@/lib/format';

const statusColors: Record<string, string> = {
  available: 'green',
  maintenance: 'orange',
  closed: 'red',
};

export default function AmenitiesPage() {
  const { selectedProperty } = useProperty();
  const amenities = getAmenitiesByProperty(selectedProperty.id);
  const bookings = getBookingsByProperty(selectedProperty.id);

  const bookingColumns: ColumnsType<AmenityBooking> = [
    { title: 'Amenity', dataIndex: 'amenityName', width: 160 },
    {
      title: 'Resident',
      dataIndex: 'residentName',
      render: (name: string, record) => (
        <div>
          <div style={{ fontWeight: 600 }}>{name}</div>
          <div style={{ fontSize: 12, color: '#888' }}>Unit {record.unit}</div>
        </div>
      ),
    },
    { title: 'Date', dataIndex: 'date', width: 120, render: (d: string) => formatDate(d) },
    { title: 'Time', width: 140, render: (_: unknown, record: AmenityBooking) => `${record.startTime} - ${record.endTime}` },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 110,
      render: (s: string) => <Tag color={s === 'confirmed' ? 'green' : s === 'pending' ? 'orange' : 'default'}>{s.charAt(0).toUpperCase() + s.slice(1)}</Tag>,
    },
  ];

  return (
    <div>
      {/* Amenity cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {amenities.map((amenity) => (
          <Card
            key={amenity.id}
            style={{ borderRadius: 16, border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
            bodyStyle={{ padding: 20 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ fontSize: 28 }}>{amenity.icon}</div>
              <Tag color={statusColors[amenity.status]}>
                {amenity.status.charAt(0).toUpperCase() + amenity.status.slice(1)}
              </Tag>
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{amenity.name}</div>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 12, lineHeight: 1.5 }}>{amenity.description}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: '#888' }}>
              <span>Hours: {amenity.operatingHours}</span>
              {amenity.maxCapacity && <span>Capacity: {amenity.maxCapacity} pax</span>}
              <span>Booking: {amenity.bookingRequired ? 'Required' : 'Walk-in'}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Upcoming Bookings */}
      <Card
        title="Upcoming Bookings"
        style={{ borderRadius: 16, border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
      >
        <Table
          dataSource={bookings}
          columns={bookingColumns}
          rowKey="id"
          pagination={false}
          size="middle"
        />
      </Card>
    </div>
  );
}
