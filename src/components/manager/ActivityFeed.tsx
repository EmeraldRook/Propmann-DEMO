'use client';

import React from 'react';
import { Card } from 'antd';
import {
  DollarOutlined,
  ToolOutlined,
  NotificationOutlined,
  CalendarOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';
import type { ActivityItem } from '@/types';
import { formatRelativeTime } from '@/lib/format';

const typeConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  payment: { icon: <DollarOutlined />, color: '#16a34a' },
  maintenance: { icon: <ToolOutlined />, color: '#d97706' },
  announcement: { icon: <NotificationOutlined />, color: '#0284c7' },
  booking: { icon: <CalendarOutlined />, color: '#7c3aed' },
  move_in: { icon: <UserAddOutlined />, color: '#0f766e' },
  move_out: { icon: <UserDeleteOutlined />, color: '#dc2626' },
};

interface ActivityFeedProps {
  items: ActivityItem[];
  limit?: number;
}

export default function ActivityFeed({ items, limit = 6 }: ActivityFeedProps) {
  const displayItems = items.slice(0, limit);

  return (
    <Card
      title="Recent Activity"
      style={{ borderRadius: 16, border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
      bodyStyle={{ padding: 0 }}
    >
      {displayItems.map((item, i) => {
        const config = typeConfig[item.type] || typeConfig.maintenance;
        return (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              padding: '14px 20px',
              borderBottom: i < displayItems.length - 1 ? '1px solid #f5f5f5' : 'none',
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: config.color + '12',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: config.color,
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              {config.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{item.title}</div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 2 }} className="truncate">
                {item.description}
              </div>
            </div>
            <div style={{ fontSize: 11, color: '#999', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {formatRelativeTime(item.timestamp)}
            </div>
          </div>
        );
      })}
    </Card>
  );
}
