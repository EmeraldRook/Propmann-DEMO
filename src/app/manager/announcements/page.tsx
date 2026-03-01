'use client';

import { Card, Button, List, Tag, Typography, Space, Avatar, Badge } from 'antd';
import { PlusOutlined, NotificationOutlined, AlertOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { announcements } from '@/data/announcements';
import { residents } from '@/data/residents';

const { Text, Title, Paragraph } = Typography;

const typeConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
  alert: { color: '#ef4444', icon: <AlertOutlined style={{ color: '#ef4444' }} />, label: 'Alert' },
  notice: { color: '#3b82f6', icon: <InfoCircleOutlined style={{ color: '#3b82f6' }} />, label: 'Notice' },
  update: { color: '#10b981', icon: <NotificationOutlined style={{ color: '#10b981' }} />, label: 'Update' },
};

export default function AnnouncementsPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <div />
        <Button type="primary" icon={<PlusOutlined />} size="large">
          Post Announcement
        </Button>
      </div>

      <List
        dataSource={announcements}
        renderItem={(ann) => {
          const config = typeConfig[ann.type];
          const totalResidents = ann.propertyId === 'all'
            ? residents.length
            : residents.filter((r) => r.propertyId === ann.propertyId).length;
          const readCount = ann.readBy.length;

          return (
            <Card style={{ marginBottom: 16 }} hoverable>
              <div style={{ display: 'flex', gap: 16 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background:
                      ann.type === 'alert' ? '#fef2f2' : ann.type === 'notice' ? '#eff6ff' : '#ecfdf5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {config.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <Text strong style={{ fontSize: 15 }}>{ann.title}</Text>
                    <Tag
                      color={ann.type === 'alert' ? 'error' : ann.type === 'notice' ? 'blue' : 'success'}
                      style={{ borderRadius: 8 }}
                    >
                      {config.label}
                    </Tag>
                    {ann.propertyId === 'all' ? (
                      <Tag style={{ borderRadius: 8 }}>All Properties</Tag>
                    ) : null}
                  </div>
                  <Paragraph
                    type="secondary"
                    style={{ fontSize: 13, marginBottom: 8 }}
                    ellipsis={{ rows: 2 }}
                  >
                    {ann.content}
                  </Paragraph>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {new Date(ann.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Read by {readCount}/{totalResidents} residents
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          );
        }}
      />
    </div>
  );
}
