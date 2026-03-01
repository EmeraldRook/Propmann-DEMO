import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Propmann — Property Management',
    short_name: 'Propmann',
    description: 'Smart property management for modern living',
    start_url: '/resident',
    display: 'standalone',
    background_color: '#f0fdfa',
    theme_color: '#0f766e',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
