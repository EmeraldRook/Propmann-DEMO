'use client';

import { useRouter } from 'next/navigation';
import { LogoDark } from '@/components/shared/Logo';

export default function Home() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 50%, #f0fdfa 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        {/* Logo */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: 'linear-gradient(135deg, #14b8a6, #0f766e)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 8px 32px -4px rgba(15,118,110,0.3)',
          }}
        >
          <LogoDark size={36} />
        </div>

        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: 8,
            letterSpacing: '-0.02em',
          }}
        >
          Propmann
        </h1>
        <p
          style={{
            fontSize: 16,
            color: '#64748b',
            marginBottom: 48,
            lineHeight: 1.6,
          }}
        >
          Smart property management for modern living.
          <br />
          Choose your portal to continue.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => router.push('/manager')}
            style={{
              padding: '16px 32px',
              borderRadius: 16,
              border: '2px solid #0f766e',
              background: '#0f766e',
              color: 'white',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              minWidth: 200,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#115e59';
              e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(15,118,110,0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#0f766e';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Manager Dashboard
          </button>
          <button
            onClick={() => router.push('/resident')}
            style={{
              padding: '16px 32px',
              borderRadius: 16,
              border: '2px solid #0f766e',
              background: 'white',
              color: '#0f766e',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              minWidth: 200,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#f0fdfa';
              e.currentTarget.style.boxShadow = '0 8px 24px -4px rgba(15,118,110,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Resident Portal
          </button>
        </div>
      </div>
    </div>
  );
}
