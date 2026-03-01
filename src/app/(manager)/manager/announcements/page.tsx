'use client';

import React from 'react';
import { Card, Tag, Button, Progress } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useProperty } from '@/context/PropertyContext';
import { getAnnouncementsByProperty } from '@/data/announcements';
import { formatRelativeTime } from '@/lib/format';

const categoryConfig: Record<string, { color: string; label: string }> = {
  general: { color: 'blue', label: 'General' },
  maintenance: { color: 'orange', label: 'Maintenance' },
  event: { color: 'green', label: 'Event' },
  emergency: { color: 'red', label: 'Emergency' },
  billing: { color: 'purple', label: 'Billing' },
};

export default function AnnouncementsPage() {
  const { selectedProperty } = useProperty();
  const announcements = getAnnouncementsByProperty(selectedProperty.id);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: '#888' }}>
          {announcements.length} announcement{announcements.length !== 1 ? 's' : ''} · {selectedProperty.name}
        </div>
        <Button type="primary" icon={<PlusOutlined />}>
          New Announcement
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {announcements.map((ann) => {
          const cat = categoryConfig[ann.category] || categoryConfig.general;
          const readPercent = Math.round((ann.readCount / ann.totalRecipients) * 100);

          return (
            <Card
              key={ann.id}
              style={{ borderRadius: 16, border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
              bodyStyle={{ padding: 20 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <Tag color={cat.color}>{cat.label}</Tag>
                    <span style={{ fontSize: 12, color: '#999' }}>{formatRelativeTime(ann.createdAt)}</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a' }}>{ann.title}</div>
                </div>
              </div>

              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, margin: '12px 0' }}>
                {ann.content}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderTop: '1px solid #f5f5f5', paddingTop: 12 }}>
                <div style={{ fontSize: 12, color: '#888' }}>
                  By {ann.author}
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#888' }}>
                  <span>{ann.readCount}/{ann.totalRecipients} read</span>
                  <Progress percent={readPercent} size="small" showInfo={false} style={{ width: 80 }} strokeColor="#0f766e" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
