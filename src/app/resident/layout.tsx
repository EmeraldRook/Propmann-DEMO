'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ConfigProvider } from 'antd';

const tabs = [
  {
    key: '/resident',
    label: 'Home',
    icon: (active: boolean) => (
      <svg width="24" height="24" fill="none" stroke={active ? '#0f766e' : '#64748b'} strokeWidth={active ? 2.2 : 1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    key: '/resident/requests',
    label: 'Requests',
    icon: (active: boolean) => (
      <svg width="24" height="24" fill="none" stroke={active ? '#0f766e' : '#64748b'} strokeWidth={active ? 2.2 : 1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
      </svg>
    ),
  },
  {
    key: '/resident/payments',
    label: 'Payments',
    icon: (active: boolean) => (
      <svg width="24" height="24" fill="none" stroke={active ? '#0f766e' : '#64748b'} strokeWidth={active ? 2.2 : 1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 10v1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: '/resident/amenities',
    label: 'Amenities',
    icon: (active: boolean) => (
      <svg width="24" height="24" fill="none" stroke={active ? '#0f766e' : '#64748b'} strokeWidth={active ? 2.2 : 1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    key: '/resident/profile',
    label: 'Profile',
    icon: (active: boolean) => (
      <svg width="24" height="24" fill="none" stroke={active ? '#0f766e' : '#64748b'} strokeWidth={active ? 2.2 : 1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

export default function ResidentLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0f766e',
          borderRadius: 12,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          colorBgLayout: '#f0fdfa',
        },
      }}
    >
      <div
        style={{
          maxWidth: 430,
          margin: '0 auto',
          minHeight: '100dvh',
          background: '#f0fdfa',
          position: 'relative',
          paddingBottom: 80,
        }}
      >
        <main id="resident-content">
          {children}
        </main>

        {/* Bottom Tab Bar */}
        <nav
          aria-label="Main navigation"
          style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: 430,
            background: '#ffffff',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '4px 0 env(safe-area-inset-bottom, 8px)',
            zIndex: 50,
          }}
        >
          {tabs.map((tab) => {
            const active = pathname === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => router.push(tab.key)}
                aria-label={tab.label}
                aria-current={active ? 'page' : undefined}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  padding: '12px 14px',
                  minHeight: 48,
                  minWidth: 48,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: active ? '#0f766e' : '#64748b',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                {tab.icon(active)}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: active ? 600 : 500,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </ConfigProvider>
  );
}
