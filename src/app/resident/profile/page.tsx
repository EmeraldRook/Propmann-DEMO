'use client';

import { Typography, Switch } from 'antd';
import { currentResident } from '@/data/residents';

const { Text } = Typography;

export default function ProfilePage() {
  const resident = currentResident;

  return (
    <div>
      {/* Header with avatar */}
      <div
        style={{
          background: 'linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #14b8a6 100%)',
          padding: '48px 20px 32px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          {resident.name.split(' ').map((w) => w[0]).join('')}
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 4px' }}>{resident.name}</h1>
        <p style={{ fontSize: 13, opacity: 0.7, margin: 0 }}>Unit {resident.unitNumber} &middot; Seri Kasturi Residences</p>
      </div>

      <div style={{ padding: 20 }}>
        {/* Personal Info */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 16,
            border: '1px solid #f1f5f9',
            overflow: 'hidden',
            marginBottom: 20,
          }}
        >
          <div style={{ padding: '16px 16px 8px' }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', margin: 0 }}>Personal Information</h2>
          </div>
          {[
            { label: 'Email', value: resident.email },
            { label: 'Phone', value: resident.phone },
            { label: 'Unit', value: resident.unitNumber },
          ].map((item, i) => (
            <div
              key={item.label}
              style={{
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: i > 0 ? '1px solid #f1f5f9' : undefined,
              }}
            >
              <Text type="secondary" style={{ fontSize: 13 }}>{item.label}</Text>
              <Text style={{ fontSize: 13, fontWeight: 500 }}>{item.value}</Text>
            </div>
          ))}
        </div>

        {/* Lease Details */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 16,
            border: '1px solid #f1f5f9',
            overflow: 'hidden',
            marginBottom: 20,
          }}
        >
          <div style={{ padding: '16px 16px 8px' }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', margin: 0 }}>Lease Details</h2>
          </div>
          {[
            { label: 'Lease Start', value: new Date(resident.leaseStart).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
            { label: 'Lease End', value: new Date(resident.leaseEnd).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
            { label: 'Monthly Rent', value: `RM ${resident.rentAmount.toLocaleString()}` },
          ].map((item, i) => (
            <div
              key={item.label}
              style={{
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: i > 0 ? '1px solid #f1f5f9' : undefined,
              }}
            >
              <Text type="secondary" style={{ fontSize: 13 }}>{item.label}</Text>
              <Text style={{ fontSize: 13, fontWeight: 500 }}>{item.value}</Text>
            </div>
          ))}
        </div>

        {/* Documents */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 16,
            border: '1px solid #f1f5f9',
            overflow: 'hidden',
            marginBottom: 20,
          }}
        >
          <div style={{ padding: '16px 16px 8px' }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', margin: 0 }}>Documents</h2>
          </div>
          {['Lease Agreement', 'House Rules'].map((doc, i) => (
            <div
              key={doc}
              style={{
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: i > 0 ? '1px solid #f1f5f9' : undefined,
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="16" height="16" fill="none" stroke="#64748b" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <Text style={{ fontSize: 13 }}>{doc}</Text>
              </div>
              <svg width="16" height="16" fill="none" stroke="#64748b" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>

        {/* Notification Preferences */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 16,
            border: '1px solid #f1f5f9',
            overflow: 'hidden',
            marginBottom: 20,
          }}
        >
          <div style={{ padding: '16px 16px 8px' }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', margin: 0 }}>Notifications</h2>
          </div>
          {[
            { label: 'Payment Reminders', defaultChecked: true },
            { label: 'Maintenance Updates', defaultChecked: true },
            { label: 'Announcements', defaultChecked: true },
            { label: 'Booking Confirmations', defaultChecked: false },
          ].map((item, i) => (
            <div
              key={item.label}
              style={{
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: i > 0 ? '1px solid #f1f5f9' : undefined,
              }}
            >
              <Text style={{ fontSize: 13 }}>{item.label}</Text>
              <Switch defaultChecked={item.defaultChecked} size="small" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
