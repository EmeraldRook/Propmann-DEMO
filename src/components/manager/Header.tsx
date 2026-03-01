'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Badge, Button } from 'antd';
import { BellOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import PropertySelector from './PropertySelector';

const pageTitles: Record<string, string> = {
  '/manager': 'Dashboard',
  '/manager/maintenance': 'Maintenance Requests',
  '/manager/residents': 'Residents',
  '/manager/financials': 'Financial Overview',
  '/manager/announcements': 'Announcements',
  '/manager/amenities': 'Amenities',
  '/manager/properties': 'Properties',
};

interface HeaderProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Header({ collapsed, onToggleCollapse }: HeaderProps) {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? 'Dashboard';

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: '#ffffff',
        borderBottom: '1px solid #f0f0f0',
        padding: '0 24px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggleCollapse}
          style={{ display: 'none' }}
          className="sidebar-toggle-mobile"
        />
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: '#1a1a1a' }}>{title}</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <PropertySelector />
        <Badge count={3} size="small">
          <Button
            type="text"
            icon={<BellOutlined style={{ fontSize: 20 }} />}
            style={{ color: '#666' }}
          />
        </Badge>
      </div>
    </header>
  );
}
