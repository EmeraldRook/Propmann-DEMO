'use client';

import React from 'react';
import ResidentHeader from '@/components/resident/ResidentHeader';
import BottomTabBar from '@/components/resident/BottomTabBar';
import { residentProfile } from '@/data/profile';
import { getMaintenanceByResident } from '@/data/maintenance';
import { getAnnouncementsByProperty } from '@/data/announcements';
import { formatRM } from '@/lib/format';
import { useRouter } from 'next/navigation';

export default function ResidentHomePage() {
  const router = useRouter();
  const activeRequests = getMaintenanceByResident(residentProfile.id).filter(
    (r) => r.status === 'new' || r.status === 'in_progress'
  );
  const announcements = getAnnouncementsByProperty(residentProfile.propertyId).slice(0, 3);

  const quickActions = [
    { label: 'Pay Rent', icon: '💰', path: '/resident/payments', color: '#dcfce7' },
    { label: 'New Request', icon: '🔧', path: '/resident/requests', color: '#fef3c7' },
    { label: 'Book Amenity', icon: '📅', path: '/resident/amenities', color: '#e0f2fe' },
    { label: 'My Profile', icon: '👤', path: '/resident/profile', color: '#f3e8ff' },
  ];

  return (
    <div style={{ background: '#f8f9fa' }}>
      <ResidentHeader />

      <div style={{ padding: '0 16px', marginTop: -12 }}>
        {/* Rent card */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 16,
            padding: 20,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            marginBottom: 16,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>Monthly Rent</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: '#1a1a1a' }}>
                {formatRM(residentProfile.monthlyRent)}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>Outstanding</div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: residentProfile.outstandingBalance > 0 ? '#dc2626' : '#16a34a',
                }}
              >
                {residentProfile.outstandingBalance > 0
                  ? formatRM(residentProfile.outstandingBalance)
                  : 'All Paid'}
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => router.push(action.path)}
              style={{
                background: '#ffffff',
                border: 'none',
                borderRadius: 14,
                padding: '16px 8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: action.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                }}
              >
                {action.icon}
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#444' }}>{action.label}</span>
            </button>
          ))}
        </div>

        {/* Active request */}
        {activeRequests.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, color: '#1a1a1a' }}>
              Active Request
            </div>
            {activeRequests.map((req) => (
              <div
                key={req.id}
                style={{
                  background: '#ffffff',
                  borderRadius: 14,
                  padding: 16,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  marginBottom: 8,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{req.title}</span>
                  <span
                    style={{
                      padding: '2px 10px',
                      borderRadius: 10,
                      fontSize: 11,
                      fontWeight: 600,
                      background: req.status === 'in_progress' ? '#fef3c7' : '#e0f2fe',
                      color: req.status === 'in_progress' ? '#d97706' : '#0284c7',
                    }}
                  >
                    {req.status === 'in_progress' ? 'In Progress' : 'New'}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: '#888' }}>
                  {req.assignedTo ? `Assigned to ${req.assignedTo}` : 'Awaiting assignment'}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recent announcements */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, color: '#1a1a1a' }}>
            Announcements
          </div>
          {announcements.map((ann) => (
            <div
              key={ann.id}
              style={{
                background: '#ffffff',
                borderRadius: 14,
                padding: 16,
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                marginBottom: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span
                  style={{
                    padding: '1px 8px',
                    borderRadius: 8,
                    fontSize: 10,
                    fontWeight: 600,
                    background: ann.category === 'emergency' ? '#fee2e2' : '#f0fdf4',
                    color: ann.category === 'emergency' ? '#dc2626' : '#16a34a',
                  }}
                >
                  {ann.category.charAt(0).toUpperCase() + ann.category.slice(1)}
                </span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{ann.title}</div>
              <div style={{ fontSize: 12, color: '#888', lineHeight: 1.5 }}>
                {ann.content.slice(0, 100)}...
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomTabBar />
    </div>
  );
}
