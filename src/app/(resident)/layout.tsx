import React from 'react';

export const metadata = {
  title: 'Propmann — Resident Portal',
};

export default function ResidentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        maxWidth: 430,
        margin: '0 auto',
        minHeight: '100vh',
        background: '#ffffff',
        position: 'relative',
        paddingBottom: 70,
      }}
    >
      {children}
    </div>
  );
}
