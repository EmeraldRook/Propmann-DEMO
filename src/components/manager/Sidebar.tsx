'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DashboardOutlined,
  ToolOutlined,
  TeamOutlined,
  DollarOutlined,
  NotificationOutlined,
  CalendarOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import Logo from '@/components/shared/Logo';

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const navItems = [
  { key: '/manager', label: 'Dashboard', icon: <DashboardOutlined /> },
  { key: '/manager/maintenance', label: 'Maintenance', icon: <ToolOutlined /> },
  { key: '/manager/residents', label: 'Residents', icon: <TeamOutlined /> },
  { key: '/manager/financials', label: 'Financials', icon: <DollarOutlined /> },
  { key: '/manager/announcements', label: 'Announcements', icon: <NotificationOutlined /> },
  { key: '/manager/amenities', label: 'Amenities', icon: <CalendarOutlined /> },
  { key: '/manager/properties', label: 'Properties', icon: <HomeOutlined /> },
];

export default function Sidebar({ collapsed, onCollapse }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (key: string) => {
    if (key === '/manager') return pathname === '/manager';
    return pathname.startsWith(key);
  };

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: collapsed ? 80 : 260,
        background: 'linear-gradient(180deg, #0f4c47 0%, #0a3631 100%)',
        transition: 'width 200ms ease',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? '20px 16px' : '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          minHeight: 72,
        }}
      >
        <Logo size={36} collapsed={collapsed} />
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        {navItems.map((item) => {
          const active = isActive(item.key);
          const linkContent = (
            <Link
              key={item.key}
              href={item.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: collapsed ? '12px 0' : '12px 16px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: 10,
                color: active ? '#ffffff' : 'rgba(255,255,255,0.65)',
                background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                transition: 'all 150ms ease',
                marginBottom: 4,
              }}
            >
              <span style={{ fontSize: 18, display: 'flex', alignItems: 'center' }}>
                {item.icon}
              </span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.key} title={item.label} placement="right">
                {linkContent}
              </Tooltip>
            );
          }
          return linkContent;
        })}
      </nav>

      {/* Collapse toggle */}
      <div
        style={{
          padding: '12px 8px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => onCollapse(!collapsed)}
          style={{ color: 'rgba(255,255,255,0.65)' }}
        />
      </div>

      {/* User avatar */}
      <div
        style={{
          padding: collapsed ? '16px 8px' : '16px 24px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          justifyContent: collapsed ? 'center' : 'flex-start',
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: '#d4a853',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          SR
        </div>
        {!collapsed && (
          <div>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>Sarah Rahman</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Property Manager</div>
          </div>
        )}
      </div>
    </aside>
  );
}
