'use client';

import React from 'react';
import ResidentHeader from '@/components/resident/ResidentHeader';
import BottomTabBar from '@/components/resident/BottomTabBar';
import { residentProfile } from '@/data/profile';
import { getMaintenanceByResident } from '@/data/maintenance';
import { formatDate } from '@/lib/format';

const statusStyle: Record<string, { bg: string; color: string; label: string }> = {
  new: { bg: '#e0f2fe', color: '#0284c7', label: 'New' },
  in_progress: { bg: '#fef3c7', color: '#d97706', label: 'In Progress' },
  completed: { bg: '#dcfce7', color: '#16a34a', label: 'Completed' },
  closed: { bg: '#f3f4f6', color: '#6b7280', label: 'Closed' },
};

export default function ResidentRequestsPage() {
  const requests = getMaintenanceByResident(residentProfile.id);

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      <ResidentHeader greeting="Maintenance" />

      <div style={{ padding: '16px' }}>
        {/* New request button */}
        <button
          style={{
            width: '100%',
            background: '#0f766e',
            color: '#fff',
            border: 'none',
            borderRadius: 14,
            padding: '14px',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: 20,
          }}
        >
          + Submit New Request
        </button>

        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: '#1a1a1a' }}>
          My Requests ({requests.length})
        </div>

        {requests.map((req) => {
          const style = statusStyle[req.status];
          return (
            <div
              key={req.id}
              style={{
                background: '#ffffff',
                borderRadius: 14,
                padding: 16,
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                marginBottom: 10,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{req.title}</div>
                  <div style={{ fontSize: 12, color: '#888', textTransform: 'capitalize' }}>
                    {req.category.replace('_', ' ')} · Unit {req.unit}
                  </div>
                </div>
                <span
                  style={{
                    padding: '3px 10px',
                    borderRadius: 10,
                    fontSize: 11,
                    fontWeight: 600,
                    background: style.bg,
                    color: style.color,
                    flexShrink: 0,
                  }}
                >
                  {style.label}
                </span>
              </div>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 8, lineHeight: 1.5 }}>
                {req.description}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#999' }}>
                <span>Created {formatDate(req.createdAt, 'DD MMM YYYY')}</span>
                {req.assignedTo && <span>Assigned: {req.assignedTo}</span>}
              </div>
            </div>
          );
        })}
      </div>

      <BottomTabBar />
    </div>
  );
}
