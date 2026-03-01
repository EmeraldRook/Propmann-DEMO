'use client';

import React from 'react';
import { Card, Progress } from 'antd';
import { HomeOutlined, TeamOutlined, ToolOutlined, EnvironmentOutlined } from '@ant-design/icons';
import type { Property } from '@/types';
import { formatRM, getOccupancyPercent } from '@/lib/format';

interface PropertyCardProps {
  property: Property;
  openTickets: number;
  compact?: boolean;
}

export default function PropertyCard({ property, openTickets, compact = false }: PropertyCardProps) {
  const occupancy = getOccupancyPercent(property.occupiedUnits, property.totalUnits);

  if (compact) {
    return (
      <Card
        style={{ borderRadius: 16, border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
        bodyStyle={{ padding: 16 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{property.name}</div>
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 600,
              background: occupancy >= 90 ? '#dcfce7' : '#fef9c3',
              color: occupancy >= 90 ? '#16a34a' : '#d97706',
            }}
          >
            {occupancy}% occupied
          </span>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#666' }}>
          <span><HomeOutlined /> {property.totalUnits} units</span>
          <span><TeamOutlined /> {property.occupiedUnits} occupied</span>
          <span><ToolOutlined /> {openTickets} open tickets</span>
        </div>
      </Card>
    );
  }

  return (
    <Card
      style={{ borderRadius: 16, border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
      bodyStyle={{ padding: 24 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{property.name}</div>
          <div style={{ fontSize: 13, color: '#666', display: 'flex', alignItems: 'center', gap: 4 }}>
            <EnvironmentOutlined /> {property.address}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>Total Units</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{property.totalUnits}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>Occupied</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{property.occupiedUnits}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>Maintenance Fee</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{formatRM(property.maintenanceFee)}</div>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#666', marginBottom: 4 }}>
          <span>Occupancy</span>
          <span style={{ fontWeight: 600 }}>{occupancy}%</span>
        </div>
        <Progress percent={occupancy} strokeColor="#0f766e" showInfo={false} size="small" />
      </div>

      <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#666', borderTop: '1px solid #f5f5f5', paddingTop: 12 }}>
        <span><ToolOutlined /> {openTickets} open tickets</span>
        <span>{property.amenities.length} amenities</span>
      </div>
    </Card>
  );
}
