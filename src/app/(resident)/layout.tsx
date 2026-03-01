import { BottomTabBar } from '@/components/resident/bottom-tab-bar';

export default function ResidentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="max-w-[430px] mx-auto bg-white min-h-screen shadow-sm relative"
        style={{ paddingBottom: 'calc(52px + env(safe-area-inset-bottom, 0px) + 8px)' }}
      >
        {children}
        <BottomTabBar />
      </div>
    </div>
  );
}
