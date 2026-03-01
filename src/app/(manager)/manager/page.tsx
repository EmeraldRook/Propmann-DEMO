'use client';

import { Building, Users, Wrench, DollarSign } from 'lucide-react';
import { Header } from '@/components/manager/header';
import { StatCard } from '@/components/manager/stat-card';
import { RevenueChart } from '@/components/manager/revenue-chart';
import { ActivityFeed } from '@/components/manager/activity-feed';
import { PropertyCard } from '@/components/manager/property-card';
import { UpcomingEvents } from '@/components/manager/upcoming-events';
import { useProperty } from '@/context/PropertyContext';
import { getMaintenanceByProperty } from '@/data/maintenance';
import { getResidentsByProperty } from '@/data/residents';
import { getPaymentsByProperty, getMonthlySummariesByProperty } from '@/data/financials';
import { getActivityByProperty, getEventsByProperty } from '@/data/activity';
import { formatRM, getOccupancyPercent } from '@/lib/format';

export default function DashboardPage() {
  const { selectedProperty, allProperties } = useProperty();
  const pid = selectedProperty.id;

  const residents = getResidentsByProperty(pid);
  const requests = getMaintenanceByProperty(pid);
  const payments = getPaymentsByProperty(pid);
  const summaries = getMonthlySummariesByProperty(pid);
  const activities = getActivityByProperty(pid);
  const events = getEventsByProperty(pid);

  const openRequests = requests.filter((r) => r.status === 'new' || r.status === 'in_progress');
  const occupancy = getOccupancyPercent(selectedProperty.occupiedUnits, selectedProperty.totalUnits);
  const currentMonthPayments = payments.filter((p) => p.dueDate.startsWith('2026-03') || p.dueDate.startsWith('2026-02'));
  const collected = currentMonthPayments.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0);

  return (
    <>
      <Header title="Dashboard" />
      <div className="p-4 lg:p-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            label="Total Units"
            value={`${selectedProperty.occupiedUnits} / ${selectedProperty.totalUnits}`}
            icon={Building}
            progress={{ value: occupancy, label: `${occupancy}% occupied` }}
          />
          <StatCard
            label="Active Residents"
            value={String(residents.filter((r) => r.status === 'active').length)}
            icon={Users}
            badge={{ label: `${residents.filter((r) => r.status === 'notice').length} notice`, variant: 'outline' }}
          />
          <StatCard
            label="Open Requests"
            value={String(openRequests.length)}
            icon={Wrench}
            badge={{
              label: `${requests.filter((r) => r.priority === 'urgent').length} urgent`,
              variant: requests.filter((r) => r.priority === 'urgent').length > 0 ? 'destructive' : 'secondary',
            }}
          />
          <StatCard
            label="Collected (This Month)"
            value={formatRM(collected)}
            icon={DollarSign}
            trend={`${currentMonthPayments.filter((p) => p.status === 'overdue').length} overdue`}
          />
        </div>

        {/* Chart + Events row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <RevenueChart data={summaries} />
          </div>
          <UpcomingEvents events={events} />
        </div>

        {/* Activity + Properties row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ActivityFeed items={activities} />
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Properties</h3>
            <div className="grid gap-4">
              {allProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
