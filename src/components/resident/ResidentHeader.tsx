'use client';

import React from 'react';
import { residentProfile } from '@/data/profile';

interface ResidentHeaderProps {
  greeting?: string;
}

export default function ResidentHeader({ greeting }: ResidentHeaderProps) {
  const firstName = residentProfile.name.split(' ')[0];
  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
        padding: '24px 20px 28px',
        color: '#ffffff',
      }}
    >
      <div style={{ fontSize: 15, opacity: 0.85, marginBottom: 4 }}>
        {greeting || timeGreeting},
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>{firstName}!</div>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(255,255,255,0.15)',
          borderRadius: 20,
          padding: '6px 14px',
          fontSize: 13,
        }}
      >
        <span style={{ fontWeight: 600 }}>{residentProfile.propertyName}</span>
        <span style={{ opacity: 0.7 }}>·</span>
        <span>Unit {residentProfile.unit}</span>
      </div>
    </div>
  );
}
