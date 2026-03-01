'use client';

import React from 'react';
import { Card, Progress } from 'antd';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  badge?: { text: string; color: string };
  progress?: { percent: number; color?: string };
  trend?: { value: string; up: boolean };
}

export default function StatCard({ icon, label, value, badge, progress, trend }: StatCardProps) {
  return (
    <Card
      style={{ borderRadius: 16, border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
      bodyStyle={{ padding: 20 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: '#f0fdfa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            color: '#0f766e',
          }}
        >
          {icon}
        </div>
        {badge && (
          <span
            style={{
              padding: '2px 10px',
              borderRadius: 12,
              fontSize: 12,
              fontWeight: 600,
              background: badge.color + '15',
              color: badge.color,
            }}
          >
            {badge.text}
          </span>
        )}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>{value}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 13, color: '#888' }}>{label}</span>
        {trend && (
          <span style={{ fontSize: 12, fontWeight: 600, color: trend.up ? '#16a34a' : '#dc2626' }}>
            {trend.up ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      {progress && (
        <Progress
          percent={progress.percent}
          strokeColor={progress.color || '#0f766e'}
          size="small"
          showInfo={false}
          style={{ marginTop: 12 }}
        />
      )}
    </Card>
  );
}
