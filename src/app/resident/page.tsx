'use client';

import { useRouter } from 'next/navigation';
import { Typography, Badge } from 'antd';
import { Logo } from '@/components/shared/Logo';
import { currentResident } from '@/data/residents';
import { payments } from '@/data/payments';
import { maintenanceRequests } from '@/data/maintenance';
import { announcements } from '@/data/announcements';
import { bookings } from '@/data/amenities';

const { Text } = Typography;

export default function ResidentHome() {
  const router = useRouter();
  const resident = currentResident;

  // Current rent
  const currentPayment = payments.find(
    (p) => p.residentId === resident.id && p.dueDate.startsWith('2026-03') && p.type === 'rent'
  );

  // Active maintenance request
  const activeRequest = maintenanceRequests.find(
    (r) => r.residentId === resident.id && (r.status === 'new' || r.status === 'in_progress')
  );

  // Latest announcements
  const myAnnouncements = announcements
    .filter((a) => a.propertyId === resident.propertyId || a.propertyId === 'all')
    .slice(0, 2);

  // Upcoming booking
  const myBooking = bookings.find(
    (b) => b.residentId === resident.id && b.status === 'confirmed' && new Date(b.date) >= new Date('2026-02-28')
  );

  const statusSteps = ['new', 'in_progress', 'completed', 'closed'];
  const activeStepIndex = activeRequest ? statusSteps.indexOf(activeRequest.status) : 0;

  return (
    <article>
      {/* Header */}
      <header
        style={{
          background: 'linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #14b8a6 100%)',
          padding: '48px 20px 32px',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Logo size={24} />
            </div>
            <div>
              <p style={{ fontSize: 14, opacity: 0.8, margin: 0 }}>Good morning</p>
              <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{resident.name}</h1>
            </div>
          </div>
          <Badge dot>
            <button
              aria-label="Notifications"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </Badge>
        </div>

        {/* Property badge */}
        <div
          style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            borderRadius: 16,
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Sunset Residences</div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>Unit {resident.unitNumber} &middot; Floor 12</div>
          </div>
          <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </header>

      {/* Content */}
      <section style={{ padding: '0 20px', marginTop: -12, position: 'relative', zIndex: 1 }}>
        {/* Rent Card */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 16,
            padding: 20,
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            border: '1px solid #f1f5f9',
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: '#ecfdf5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="16" height="16" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 10v1" />
                </svg>
              </div>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#64748b' }}>Monthly Rent &middot; Due Mar 1</span>
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                background: '#fffbeb',
                color: '#d97706',
                padding: '4px 10px',
                borderRadius: 12,
              }}
            >
              In 1 day
            </span>
          </div>
          <div style={{ fontSize: 30, fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>
            ${currentPayment?.amount.toLocaleString() || '2,400'}.00
          </div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>/ month</div>
          <button
            onClick={() => router.push('/resident/payments')}
            style={{
              width: '100%',
              padding: '14px 0',
              borderRadius: 12,
              border: 'none',
              background: '#0f766e',
              color: 'white',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px -2px rgba(15,118,110,0.3)',
            }}
          >
            Pay Now
          </button>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[
            {
              label: 'Report Issue',
              bg: '#fffbeb',
              color: '#f59e0b',
              path: '/resident/requests',
              icon: <svg width="24" height="24" fill="none" stroke="#f59e0b" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" /></svg>,
            },
            {
              label: 'Book Amenity',
              bg: '#f5f3ff',
              color: '#8b5cf6',
              path: '/resident/amenities',
              icon: <svg width="24" height="24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
            },
            {
              label: 'Message',
              bg: '#f0fdfa',
              color: '#0f766e',
              path: '/resident/messages',
              icon: <svg width="24" height="24" fill="none" stroke="#0f766e" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
            },
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => router.push(action.path)}
              style={{
                background: '#ffffff',
                borderRadius: 16,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                border: '1px solid #f1f5f9',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 16,
                  background: action.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {action.icon}
              </div>
              <span style={{ fontSize: 12, fontWeight: 500, color: '#475569', textAlign: 'center' }}>
                {action.label}
              </span>
            </button>
          ))}
        </div>

        {/* Active Request */}
        {activeRequest && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h2 style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', margin: 0 }}>Active Request</h2>
              <button
                onClick={() => router.push('/resident/requests')}
                style={{
                  fontSize: 12,
                  color: '#0f766e',
                  fontWeight: 500,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 12px',
                }}
              >
                View all
              </button>
            </div>
            <div
              style={{
                background: '#ffffff',
                borderRadius: 16,
                padding: 16,
                border: '1px solid #f1f5f9',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ display: 'flex', gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: '#fffbeb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="20" fill="none" stroke="#f59e0b" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', marginBottom: 4 }}>
                    {activeRequest.category.charAt(0).toUpperCase() + activeRequest.category.slice(1)} — {activeRequest.title.split(' ').slice(0, 3).join(' ')}
                  </div>
                  <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 12px' }}>
                    {activeRequest.description.slice(0, 80)}...
                  </p>
                  {/* Progress bar */}
                  <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                    {statusSteps.map((_, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: 6,
                          borderRadius: 3,
                          background: i <= activeStepIndex ? '#14b8a6' : '#e2e8f0',
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: '#14b8a6',
                          display: 'inline-block',
                          animation: 'pulse 2s infinite',
                        }}
                      />
                      <span style={{ fontSize: 12, fontWeight: 500, color: '#0f766e' }}>
                        {activeRequest.status === 'in_progress' ? 'In Progress' : 'New'}
                      </span>
                    </div>
                    {activeRequest.assignedTo && (
                      <span style={{ fontSize: 12, color: '#64748b' }}>
                        Assigned to {activeRequest.assignedTo}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Announcements */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', margin: 0 }}>Announcements</h2>
            <button
              onClick={() => router.push('/resident/announcements')}
              style={{
                fontSize: 12,
                color: '#0f766e',
                fontWeight: 500,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 12px',
              }}
            >
              See all
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {myAnnouncements.map((ann) => (
              <div
                key={ann.id}
                style={{
                  background: '#ffffff',
                  borderRadius: 16,
                  padding: 16,
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: ann.type === 'alert' ? '#fef2f2' : ann.type === 'notice' ? '#eff6ff' : '#ecfdf5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="20" height="20" fill="none" stroke={ann.type === 'alert' ? '#ef4444' : ann.type === 'notice' ? '#3b82f6' : '#10b981'} strokeWidth="1.8" viewBox="0 0 24 24">
                      {ann.type === 'alert' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      )}
                    </svg>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{ann.title}</span>
                      {!ann.readBy.includes(resident.id) && (
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#14b8a6', display: 'inline-block' }} />
                      )}
                    </div>
                    <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 8px', lineHeight: 1.5 }}>
                      {ann.content.slice(0, 100)}...
                    </p>
                    <span style={{ fontSize: 11, color: '#64748b' }}>
                      {new Date(ann.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Booking */}
        {myBooking && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h2 style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', margin: 0 }}>My Bookings</h2>
              <button
                onClick={() => router.push('/resident/amenities')}
                style={{
                  fontSize: 12,
                  color: '#0f766e',
                  fontWeight: 500,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 12px',
                }}
              >
                View all
              </button>
            </div>
            <div
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
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 700 }}>
                  {new Date(myBooking.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                </span>
                <span style={{ fontSize: 18, fontWeight: 800 }}>
                  {new Date(myBooking.date).getDate()}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{myBooking.amenityName}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
                  {new Date(myBooking.date).toLocaleDateString('en-US', { weekday: 'long' })}, {myBooking.startTime} - {myBooking.endTime}
                </div>
              </div>
              <button
                style={{
                  fontSize: 12,
                  color: '#f87171',
                  fontWeight: 500,
                  padding: '10px 16px',
                  borderRadius: 8,
                  border: '1px solid #fecaca',
                  background: 'white',
                  cursor: 'pointer',
                  minHeight: 44,
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </article>
  );
}
