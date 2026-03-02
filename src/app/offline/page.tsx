"use client";

export default function OfflinePage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-lg">
        {/* Brand mark */}
        <svg
          width={64}
          height={64}
          viewBox="0 0 40 40"
          fill="none"
          className="mx-auto mb-6"
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

        <h1 className="mb-2 text-xl font-semibold text-gray-900">
          You&apos;re offline
        </h1>
        <p className="mb-6 text-sm text-gray-500">
          Check your internet connection and try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-800 active:bg-teal-900"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
