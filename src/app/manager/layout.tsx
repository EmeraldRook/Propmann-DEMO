'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ConfigProvider, Layout, Menu, Avatar, Typography, Select, Badge } from 'antd';
import {
  HomeOutlined,
  ToolOutlined,
  TeamOutlined,
  DollarOutlined,
  NotificationOutlined,
  CalendarOutlined,
  BankOutlined,
  BellOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Logo } from '@/components/shared/Logo';
import { properties } from '@/data/properties';
import { PropertyProvider, useProperty } from '@/contexts/PropertyContext';
import managerTheme from '@/theme/managerTheme';

const { Sider, Header, Content } = Layout;
const { Text } = Typography;

const menuItems = [
  { key: '/manager', icon: <HomeOutlined />, label: 'Dashboard' },
  { key: '/manager/maintenance', icon: <ToolOutlined />, label: 'Maintenance' },
  { key: '/manager/residents', icon: <TeamOutlined />, label: 'Residents' },
  { key: '/manager/financials', icon: <DollarOutlined />, label: 'Financials' },
  { key: '/manager/announcements', icon: <NotificationOutlined />, label: 'Announcements' },
  { key: '/manager/amenities', icon: <CalendarOutlined />, label: 'Amenities' },
  { key: '/manager/properties', icon: <BankOutlined />, label: 'Properties' },
];

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <PropertyProvider>
      <ManagerLayoutInner>{children}</ManagerLayoutInner>
    </PropertyProvider>
  );
}

function ManagerLayoutInner({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { selectedProperty, setSelectedProperty } = useProperty();

  return (
    <ConfigProvider theme={managerTheme}>
      {/* #4 Skip link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          width={256}
          style={{
            background: 'linear-gradient(180deg, #0f172a 0%, #134e4a 100%)',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 20,
          }}
        >
          {/* Logo */}
          <div
            style={{
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #14b8a6, #0f766e)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Logo size={22} />
            </div>
            <Text strong style={{ color: 'white', fontSize: 18, letterSpacing: '-0.02em' }}>
              Propmann
            </Text>
          </div>

          {/* Navigation */}
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[pathname]}
            items={menuItems}
            onClick={({ key }) => router.push(key)}
            style={{
              background: 'transparent',
              borderInlineEnd: 'none',
              padding: '12px 8px',
            }}
          />

          {/* User info */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '16px 20px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <Avatar
              style={{ backgroundColor: 'rgba(20,184,166,0.3)', color: 'white' }}
              size={36}
            >
              SM
            </Avatar>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Text
                strong
                style={{ color: 'white', fontSize: 13, display: 'block' }}
                ellipsis
              >
                Sarah Mitchell
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
                Property Manager
              </Text>
            </div>
            <SettingOutlined style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }} />
          </div>
        </Sider>

        <Layout style={{ marginLeft: 256 }}>
          {/* Top bar */}
          <Header
            style={{
              background: '#fff',
              borderBottom: '1px solid #e2e8f0',
              padding: '0 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 64,
              position: 'sticky',
              top: 0,
              zIndex: 10,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1.5 }}>
              <Text strong style={{ fontSize: 18, color: '#0f172a' }}>
                {menuItems.find((m) => m.key === pathname)?.label || 'Dashboard'}
              </Text>
              <Text style={{ fontSize: 13, color: '#64748b' }}>
                Welcome back, Sarah
              </Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Select
                value={selectedProperty}
                onChange={setSelectedProperty}
                style={{ width: 220 }}
                options={properties.map((p) => ({
                  value: p.id,
                  label: `${p.name} (${p.unitCount} units)`,
                }))}
              />
              <Badge dot>
                <BellOutlined
                  aria-label="Notifications"
                  role="button"
                  tabIndex={0}
                  style={{ fontSize: 20, color: '#64748b', cursor: 'pointer' }}
                />
              </Badge>
            </div>
          </Header>

          <Content id="main-content" role="main" style={{ padding: 32 }}>
            <div key={pathname} className="page-transition">
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
