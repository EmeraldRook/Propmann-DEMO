'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Wrench, DollarSign, Calendar, User } from 'lucide-react';

const tabs = [
  { href: '/resident', label: 'Home', icon: Home },
  { href: '/resident/requests', label: 'Requests', icon: Wrench },
  { href: '/resident/payments', label: 'Payments', icon: DollarSign },
  { href: '/resident/amenities', label: 'Amenities', icon: Calendar },
  { href: '/resident/profile', label: 'Profile', icon: User },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-pb">
      <div className="max-w-[430px] mx-auto flex">
        {tabs.map((tab) => {
          const isActive =
            tab.href === '/resident'
              ? pathname === '/resident'
              : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition-colors ${
                isActive ? 'text-teal-700' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <tab.icon className={`size-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
