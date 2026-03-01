'use client';

import React from 'react';
import ResidentHeader from '@/components/resident/ResidentHeader';
import BottomTabBar from '@/components/resident/BottomTabBar';
import { residentProfile } from '@/data/profile';
import { formatRM, formatDate, formatPhone, getInitials } from '@/lib/format';

export default function ResidentProfilePage() {
  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      <ResidentHeader greeting="My Profile" />

      <div style={{ padding: '16px' }}>
        {/* Profile card */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 16,
            padding: 24,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            marginTop: -12,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: 20,
              flexShrink: 0,
            }}
          >
            {getInitials(residentProfile.name)}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{residentProfile.name}</div>
            <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>
              Unit {residentProfile.unit} · Floor {residentProfile.floor}
            </div>
          </div>
        </div>

        {/* Personal info */}
        <SectionCard title="Personal Information">
          <InfoRow label="Email" value={residentProfile.email} />
          <InfoRow label="Phone" value={formatPhone(residentProfile.phone)} />
          <InfoRow label="Property" value={residentProfile.propertyName} />
          <InfoRow label="Unit" value={residentProfile.unit} />
        </SectionCard>

        {/* Lease details */}
        <SectionCard title="Lease Details">
          <InfoRow label="Lease Start" value={formatDate(residentProfile.leaseStart)} />
          <InfoRow label="Lease End" value={formatDate(residentProfile.leaseEnd)} />
          <InfoRow label="Monthly Rent" value={formatRM(residentProfile.monthlyRent)} />
          <InfoRow
            label="Outstanding"
            value={
              residentProfile.outstandingBalance > 0
                ? formatRM(residentProfile.outstandingBalance)
                : 'None'
            }
            valueColor={residentProfile.outstandingBalance > 0 ? '#dc2626' : '#16a34a'}
          />
        </SectionCard>

        {/* Documents */}
        <SectionCard title="Documents">
          {residentProfile.documents.map((doc, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: i < residentProfile.documents.length - 1 ? '1px solid #f5f5f5' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: '#fee2e2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#dc2626',
                  }}
                >
                  PDF
                </div>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{doc.name}</span>
              </div>
              <button
                style={{
                  background: 'none',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  padding: '6px 14px',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: '#0f766e',
                }}
              >
                View
              </button>
            </div>
          ))}
        </SectionCard>
      </div>

      <BottomTabBar />
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: 14,
        padding: '16px 20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        marginBottom: 12,
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  );
}

function InfoRow({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 0',
        borderBottom: '1px solid #f8f8f8',
        fontSize: 14,
      }}
    >
      <span style={{ color: '#888' }}>{label}</span>
      <span style={{ fontWeight: 600, color: valueColor || '#1a1a1a' }}>{value}</span>
    </div>
  );
}
