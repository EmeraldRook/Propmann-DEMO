'use client';

import Link from 'next/link';
import { Wrench, DollarSign, Calendar, Megaphone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResidentHeader } from '@/components/resident/resident-header';
import { residentProfile } from '@/data/profile';
import { getMaintenanceByResident } from '@/data/maintenance';
import { getPaymentsByResident } from '@/data/financials';
import { getAnnouncementsByProperty } from '@/data/announcements';
import { formatRM, formatRelativeTime } from '@/lib/format';

const quickActions = [
  { href: '/resident/requests', label: 'Maintenance', icon: Wrench, color: 'bg-amber-50 text-amber-600' },
  { href: '/resident/payments', label: 'Payments', icon: DollarSign, color: 'bg-emerald-50 text-emerald-600' },
  { href: '/resident/amenities', label: 'Amenities', icon: Calendar, color: 'bg-blue-50 text-blue-600' },
  { href: '/resident/announcements', label: 'News', icon: Megaphone, color: 'bg-purple-50 text-purple-600' },
];

export default function ResidentHomePage() {
  const profile = residentProfile;
  const requests = getMaintenanceByResident(profile.id);
  const payments = getPaymentsByResident(profile.id);
  const announcements = getAnnouncementsByProperty(profile.propertyId);

  const activeRequests = requests.filter((r) => r.status === 'new' || r.status === 'in_progress');
  const nextPayment = payments.find((p) => p.status === 'pending');

  return (
    <>
      <ResidentHeader title={profile.name.split(' ')[0]} subtitle={`${profile.propertyName} · Unit ${profile.unit}`} />

      <div className="px-4 pt-4 space-y-4 pb-4">
        {/* Rent card */}
        <Card className="bg-gradient-to-br from-teal-700 to-teal-500 text-white border-0 shadow-lg">
          <CardContent className="pt-5 pb-4">
            <p className="text-teal-100 text-xs font-medium">Monthly Rent</p>
            <p className="text-2xl font-bold mt-0.5">{formatRM(profile.monthlyRent)}</p>
            {nextPayment && (
              <div className="flex items-center justify-between mt-3">
                <span className="text-teal-100 text-xs">Due: {nextPayment.dueDate}</span>
                <Button size="sm" variant="secondary" className="h-7 text-xs font-semibold bg-white text-teal-700 hover:bg-teal-50">
                  Pay Now
                </Button>
              </div>
            )}
            {profile.outstandingBalance === 0 && !nextPayment && (
              <p className="text-teal-100 text-xs mt-2">All paid up!</p>
            )}
          </CardContent>
        </Card>

        {/* Quick actions */}
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href} className="flex flex-col items-center gap-1.5 group">
              <div className={`rounded-xl p-3 ${action.color} group-hover:scale-105 transition-transform`}>
                <action.icon className="size-5" />
              </div>
              <span className="text-[11px] font-medium text-gray-600">{action.label}</span>
            </Link>
          ))}
        </div>

        {/* Active requests */}
        {activeRequests.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Active Requests</h3>
              <Link href="/resident/requests" className="text-xs text-primary font-medium">View all</Link>
            </div>
            {activeRequests.slice(0, 2).map((req) => (
              <Card key={req.id}>
                <CardContent className="pt-3 pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{req.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 capitalize">{req.category.replace('_', ' ')}</p>
                    </div>
                    <Badge variant={req.status === 'new' ? 'default' : 'secondary'} className="capitalize shrink-0 text-[11px]">
                      {req.status === 'in_progress' ? 'In Progress' : 'New'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Announcements preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Latest Announcements</h3>
            <Link href="/resident/announcements" className="text-xs text-primary font-medium">View all</Link>
          </div>
          {announcements.slice(0, 2).map((a) => (
            <Card key={a.id}>
              <CardContent className="pt-3 pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium leading-snug">{a.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{formatRelativeTime(a.createdAt)}</p>
                  </div>
                  <Badge variant="outline" className="capitalize shrink-0 text-[11px]">{a.category}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
