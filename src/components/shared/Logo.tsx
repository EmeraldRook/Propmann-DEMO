'use client';

export function Logo({ size = 22 }: { size?: number }) {
  const h = Math.round(size * 16 / 22);
  return (
    <svg width={size} height={h} viewBox="0 0 44 32" fill="none">
      <path
        d="M4 28V4H16C20.418 4 24 7.582 24 12C24 16.418 20.418 20 16 20H12"
        stroke="#FBBF24"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 28V8L30 20L40 8V28"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogoDark({ size = 22 }: { size?: number }) {
  const h = Math.round(size * 16 / 22);
  return (
    <svg width={size} height={h} viewBox="0 0 44 32" fill="none">
      <path
        d="M4 28V4H16C20.418 4 24 7.582 24 12C24 16.418 20.418 20 16 20H12"
        stroke="#FBBF24"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 28V8L30 20L40 8V28"
        stroke="#0f766e"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
