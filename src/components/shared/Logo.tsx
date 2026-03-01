import React from 'react';

interface LogoProps {
  size?: number;
  collapsed?: boolean;
}

export default function Logo({ size = 40, collapsed = false }: LogoProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="10" fill="#0f766e" />
        <text
          x="7"
          y="27"
          fontFamily="var(--font-inter), sans-serif"
          fontWeight="800"
          fontSize="18"
          fill="#d4a853"
        >
          P
        </text>
        <text
          x="20"
          y="27"
          fontFamily="var(--font-inter), sans-serif"
          fontWeight="800"
          fontSize="18"
          fill="#ffffff"
        >
          M
        </text>
      </svg>
      {!collapsed && (
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.5px',
          }}
        >
          Propmann
        </span>
      )}
    </div>
  );
}
