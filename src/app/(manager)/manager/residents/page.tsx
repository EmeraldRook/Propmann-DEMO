'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { Users } from 'lucide-react';
import { Header } from '@/components/manager/header';
import { StatCard } from '@/components/manager/stat-card';
import { DataTable } from '@/components/manager/data-table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useProperty } from '@/context/PropertyContext';
import { getResidentsByProperty } from '@/data/residents';
import type { Resident } from '@/types';
import { formatRM, formatDate, getInitials } from '@/lib/format';
import { useState } from 'react';

const statusVariant: Record<Resident['status'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
  active: 'default',
  notice: 'destructive',
  vacated: 'outline',
};

const columns: ColumnDef<Resident>[] = [
  {
    accessorKey: 'name',
    header: 'Resident',
    cell: ({ row }) => (
      <div className="flex items-center gap-2.5">
        <Avatar className="size-8">
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
            {getInitials(row.original.name)}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium">{row.original.name}</span>
      </div>
    ),
  },
  { accessorKey: 'unit', header: 'Unit' },
  { accessorKey: 'floor', header: 'Floor' },
  { accessorKey: 'phone', header: 'Contact', cell: ({ row }) => <span className="text-sm">{row.original.phone}</span> },
  { accessorKey: 'monthlyRent', header: 'Rent', cell: ({ row }) => formatRM(row.original.monthlyRent) },
  { accessorKey: 'leaseEnd', header: 'Lease End', cell: ({ row }) => formatDate(row.original.leaseEnd) },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status]} className="capitalize">
        {row.original.status}
      </Badge>
    ),
  },
];

export default function ResidentsPage() {
  const { selectedProperty } = useProperty();
  const residents = getResidentsByProperty(selectedProperty.id);
  const [search, setSearch] = useState('');

  const filtered = residents.filter((r) => {
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.unit.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const activeCount = residents.filter((r) => r.status === 'active').length;
  const noticeCount = residents.filter((r) => r.status === 'notice').length;

  return (
    <>
      <Header title="Residents" />
      <div className="p-4 lg:p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total Residents" value={String(residents.length)} icon={Users} />
          <StatCard label="Active" value={String(activeCount)} icon={Users} badge={{ label: 'Active', variant: 'default' }} />
          <StatCard label="Notice Period" value={String(noticeCount)} icon={Users} badge={noticeCount > 0 ? { label: 'Leaving soon', variant: 'destructive' } : undefined} />
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          toolbar={
            <Input
              placeholder="Search residents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />
          }
        />
      </div>
    </>
  );
}
