'use client';

import React from 'react';
import { Card } from 'antd';
import type { UpcomingEvent } from '@/types';
import dayjs from 'dayjs';

const typeColors: Record<string, string> = {
  meeting: '#7c3aed',
  maintenance: '#d97706',
  event: '#0f766e',
  inspection: '#0284c7',
};

interface UpcomingEventsProps {
  events: UpcomingEvent[];
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <Card
      title="Upcoming Events"
      style={{ borderRadius: 16, border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
      bodyStyle={{ padding: 0 }}
    >
      {events.map((event, i) => {
        const d = dayjs(event.date);
        const color = typeColors[event.type] || '#666';
        return (
          <div
            key={event.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '14px 20px',
              borderBottom: i < events.length - 1 ? '1px solid #f5f5f5' : 'none',
            }}
          >
            {/* Date badge */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: '#f5f5f5',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 600, color: '#999', textTransform: 'uppercase' }}>
                {d.format('MMM')}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>
                {d.format('DD')}
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{event.title}</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{event.time}</div>
            </div>

            <span
              style={{
                padding: '2px 8px',
                borderRadius: 8,
                fontSize: 10,
                fontWeight: 600,
                background: color + '15',
                color,
                textTransform: 'capitalize',
              }}
            >
              {event.type}
            </span>
          </div>
        );
      })}
    </Card>
  );
}
