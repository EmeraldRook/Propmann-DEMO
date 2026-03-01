'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { Header } from '@/components/manager/header';
import { StatCard } from '@/components/manager/stat-card';
import { DataTable } from '@/components/manager/data-table';
import { Badge } from '@/components/ui/badge';
import { useProperty } from '@/context/PropertyContext';
import { RecordPaymentSheet } from '@/components/manager/record-payment-sheet';
import { getPaymentsByProperty, getMonthlySummariesByProperty } from '@/data/financials';
import type { Payment } from '@/types';
import { formatRM, formatDate } from '@/lib/format';

const statusVariant: Record<Payment['status'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
  paid: 'default',
  pending: 'secondary',
  overdue: 'destructive',
};

const columns: ColumnDef<Payment>[] = [
  { accessorKey: 'residentName', header: 'Resident', cell: ({ row }) => <span className="font-medium">{row.original.residentName}</span> },
  { accessorKey: 'unit', header: 'Unit' },
  { accessorKey: 'amount', header: 'Amount', cell: ({ row }) => formatRM(row.original.amount) },
  { accessorKey: 'type', header: 'Type', cell: ({ row }) => <span className="capitalize">{row.original.type.replace('_', ' ')}</span> },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status]} className="capitalize">
        {row.original.status}
      </Badge>
    ),
  },
  { accessorKey: 'dueDate', header: 'Due Date', cell: ({ row }) => formatDate(row.original.dueDate) },
  { accessorKey: 'paidDate', header: 'Paid Date', cell: ({ row }) => row.original.paidDate ? formatDate(row.original.paidDate) : <span className="text-muted-foreground">—</span> },
  { accessorKey: 'method', header: 'Method', cell: ({ row }) => row.original.method ? <span className="capitalize">{row.original.method.replace('_', ' ')}</span> : <span className="text-muted-foreground">—</span> },
];

export default function FinancialsPage() {
  const { selectedProperty } = useProperty();
  const payments = getPaymentsByProperty(selectedProperty.id);
  const summaries = getMonthlySummariesByProperty(selectedProperty.id);

  const latest = summaries[summaries.length - 1];
  const collected = payments.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const overdueCount = payments.filter((p) => p.status === 'overdue').length;

  return (
    <>
      <Header title="Financials" />
      <div className="p-4 lg:p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total Collected" value={formatRM(collected)} icon={DollarSign} />
          <StatCard
            label="Monthly Income"
            value={latest ? formatRM(latest.income) : '—'}
            icon={TrendingUp}
            trend={latest ? `Expenses: ${formatRM(latest.expenses)}` : undefined}
          />
          <StatCard
            label="Overdue"
            value={String(overdueCount)}
            icon={AlertCircle}
            badge={overdueCount > 0 ? { label: 'Action needed', variant: 'destructive' } : undefined}
          />
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Payment Records</h2>
          <RecordPaymentSheet />
        </div>

        <DataTable columns={columns} data={payments} />
      </div>
    </>
  );
}
