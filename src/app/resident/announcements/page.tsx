'use client';

import { useState } from 'react';
import { Typography, Tag, Modal } from 'antd';
import { announcements } from '@/data/announcements';
import { currentResident } from '@/data/residents';

const { Text } = Typography;

export default function AnnouncementsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const myAnnouncements = announcements.filter(
    (a) => a.propertyId === currentResident.propertyId || a.propertyId === 'all'
  );

  const selected = myAnnouncements.find((a) => a.id === selectedId);

  return (
    <div>
      {/* Header */}
      <div style={{ padding: '48px 20px 20px', background: '#ffffff', borderBottom: '1px solid #f1f5f9' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: 0 }}>Announcements</h1>
      </div>

      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {myAnnouncements.map((ann) => {
            const isRead = ann.readBy.includes(currentResident.id);
            return (
              <div
                key={ann.id}
                onClick={() => setSelectedId(ann.id)}
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
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke={ann.type === 'alert' ? '#ef4444' : ann.type === 'notice' ? '#3b82f6' : '#10b981'}
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      {ann.type === 'alert' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      )}
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{ann.title}</span>
                      {!isRead && (
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: '#14b8a6',
                            display: 'inline-block',
                          }}
                        />
                      )}
                    </div>
                    <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 8px', lineHeight: 1.5 }}>
                      {ann.content.slice(0, 100)}...
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Tag
                        style={{
                          borderRadius: 8,
                          fontSize: 11,
                          border: 'none',
                          background:
                            ann.type === 'alert' ? '#fef2f2' : ann.type === 'notice' ? '#eff6ff' : '#ecfdf5',
                          color:
                            ann.type === 'alert' ? '#ef4444' : ann.type === 'notice' ? '#3b82f6' : '#10b981',
                        }}
                      >
                        {ann.type.charAt(0).toUpperCase() + ann.type.slice(1)}
                      </Tag>
                      <span style={{ fontSize: 11, color: '#64748b' }}>
                        {new Date(ann.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <Modal
        open={!!selected}
        onCancel={() => setSelectedId(null)}
        footer={null}
        title={null}
      >
        {selected && (
          <div>
            <Tag
              style={{
                borderRadius: 8,
                border: 'none',
                marginBottom: 12,
                background:
                  selected.type === 'alert' ? '#fef2f2' : selected.type === 'notice' ? '#eff6ff' : '#ecfdf5',
                color:
                  selected.type === 'alert' ? '#ef4444' : selected.type === 'notice' ? '#3b82f6' : '#10b981',
              }}
            >
              {selected.type.charAt(0).toUpperCase() + selected.type.slice(1)}
            </Tag>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
              {selected.title}
            </h2>
            <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 16 }}>
              {new Date(selected.createdAt).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
            </Text>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7 }}>{selected.content}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
