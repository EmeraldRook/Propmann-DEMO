'use client';

import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { PropertyProvider } from '@/context/PropertyContext';
import { properties } from '@/data/properties';
import managerTheme from '@/theme/managerTheme';
import Sidebar from '@/components/manager/Sidebar';
import Header from '@/components/manager/Header';

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AntdRegistry>
      <ConfigProvider theme={managerTheme}>
        <PropertyProvider properties={properties}>
          <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                marginLeft: collapsed ? 80 : 260,
                transition: 'margin-left 200ms ease',
              }}
            >
              <Header collapsed={collapsed} onToggleCollapse={() => setCollapsed((c) => !c)} />
              <main style={{ flex: 1, padding: 24, background: '#f5f5f5' }}>
                {children}
              </main>
            </div>
          </div>
        </PropertyProvider>
      </ConfigProvider>
    </AntdRegistry>
  );
}
