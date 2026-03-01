import type { Metadata, Viewport } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';

export const metadata: Metadata = {
  title: 'Propmann — Property Management',
  description: 'Smart property management for modern living',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f766e',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
