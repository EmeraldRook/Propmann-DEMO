'use client';

import React from 'react';
import {
  HomeOutlined,
  ToolOutlined,
  DollarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useProperty } from '@/context/PropertyContext';
import { getMaintenanceByProperty } from '@/data/maintenance';
import { getPaymentsByProperty, getMonthlySummariesByProperty } from '@/data/financials';
import { getActivityByProperty, getEventsByProperty } from '@/data/activity';
import { formatRM, getOccupancyPercent } from '@/lib/format';
import StatCard from '@/components/manager/StatCard';
import ActivityFeed from '@/components/manager/ActivityFeed';
import RevenueChart from '@/components/manager/RevenueChart';
import PropertyCard from '@/components/manager/PropertyCard';
import UpcomingEvents from '@/components/manager/UpcomingEvents';

export default function DashboardPage() {
  const { selectedProperty, allProperties } = useProperty();

  const maintenance = getMaintenanceByProperty(selectedProperty.id);
  const payments = getPaymentsByProperty(selectedProperty.id);
  const summaries = getMonthlySummariesByProperty(selectedProperty.id);
  const activity = getActivityByProperty(selectedProperty.id);
  const events = getEventsByProperty(selectedProperty.id);

  const openTickets = maintenance.filter((m) => m.status === 'new' || m.status === 'in_progress').length;
  const urgentTickets = maintenance.filter((m) => m.priority === 'urgent' || m.priority === 'high').length;
  const occupancy = getOccupancyPercent(selectedProperty.occupiedUnits, selectedProperty.totalUnits);
  const paidPayments = payments.filter((p) => p.status === 'paid');
  const overduePayments = payments.filter((p) => p.status === 'overdue');
  const totalCollected = paidPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = overduePayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div style={{ maxWidth: 1200 }}>
      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard
          icon={<HomeOutlined />}
          label="Occupancy Rate"
          value={`${occupancy}%`}
          progress={{ percent: occupancy }}
          badge={{ text: `${selectedProperty.occupiedUnits}/${selectedProperty.totalUnits}`, color: '#0f766e' }}
        />
        <StatCard
          icon={<ToolOutlined />}
          label="Open Requests"
          value={openTickets}
          badge={{ text: `${urgentTickets} urgent`, color: urgentTickets > 0 ? '#dc2626' : '#16a34a' }}
        />
        <StatCard
          icon={<DollarOutlined />}
          label="Collected This Month"
          value={formatRM(totalCollected)}
          trend={{ value: '5.2%', up: true }}
        />
        <StatCard
          icon={<TeamOutlined />}
          label="Overdue Amount"
          value={totalOverdue > 0 ? formatRM(totalOverdue) : 'RM 0.00'}
          badge={totalOverdue > 0
            ? { text: `${overduePayments.length} overdue`, color: '#dc2626' }
            : { text: 'All clear', color: '#16a34a' }
          }
        />
      </div>

      {/* Main content: chart + events */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 24 }}>
        <RevenueChart data={summaries} />
        <UpcomingEvents events={events} />
      </div>

      {/* Activity + Properties */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <ActivityFeed items={activity} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a' }}>Properties Overview</div>
          {allProperties.map((prop) => {
            const propTickets = getMaintenanceByProperty(prop.id).filter(
              (m) => m.status === 'new' || m.status === 'in_progress'
            ).length;
            return <PropertyCard key={prop.id} property={prop} openTickets={propTickets} compact />;
          })}
        </div>
      </div>
    </div>
  );
}
