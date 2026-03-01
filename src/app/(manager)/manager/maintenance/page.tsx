'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { Wrench, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { Header } from '@/components/manager/header';
import { StatCard } from '@/components/manager/stat-card';
import { DataTable } from '@/components/manager/data-table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useProperty } from '@/context/PropertyContext';
import { getMaintenanceByProperty } from '@/data/maintenance';
import type { MaintenanceRequest, MaintenanceStatus, MaintenancePriority } from '@/types';
import { formatDate } from '@/lib/format';
import { useState } from 'react';
import { MaintenanceActions } from '@/components/manager/maintenance-actions';

const statusVariant: Record<MaintenanceStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  new: 'default',
  in_progress: 'secondary',
  completed: 'outline',
  closed: 'outline',
};

const statusLabel: Record<MaintenanceStatus, string> = {
  new: 'New',
  in_progress: 'In Progress',
  completed: 'Completed',
  closed: 'Closed',
};

const priorityVariant: Record<MaintenancePriority, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  low: 'outline',
  medium: 'secondary',
  high: 'default',
  urgent: 'destructive',
};

const columns: ColumnDef<MaintenanceRequest>[] = [
  { accessorKey: 'id', header: 'ID', cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span> },
  { accessorKey: 'title', header: 'Title', cell: ({ row }) => <span className="font-medium">{row.original.title}</span> },
  { accessorKey: 'category', header: 'Category', cell: ({ row }) => <span className="capitalize">{row.original.category.replace('_', ' ')}</span> },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => (
      <Badge variant={priorityVariant[row.original.priority]} className="capitalize">
        {row.original.priority}
      </Badge>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status]}>
        {statusLabel[row.original.status]}
      </Badge>
    ),
  },
  { accessorKey: 'assignedTo', header: 'Assigned To', cell: ({ row }) => row.original.assignedTo || <span className="text-muted-foreground">—</span> },
  { accessorKey: 'createdAt', header: 'Created', cell: ({ row }) => formatDate(row.original.createdAt, 'DD MMM YYYY') },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => <MaintenanceActions request={row.original} />,
  },
];

export default function MaintenancePage() {
  const { selectedProperty } = useProperty();
  const requests = getMaintenanceByProperty(selectedProperty.id);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filtered = requests.filter((r) => {
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && r.priority !== priorityFilter) return false;
    return true;
  });

  const openCount = requests.filter((r) => r.status === 'new' || r.status === 'in_progress').length;
  const urgentCount = requests.filter((r) => r.priority === 'urgent').length;
  const completedCount = requests.filter((r) => r.status === 'completed' || r.status === 'closed').length;

  return (
    <>
      <Header title="Maintenance" />
      <div className="p-4 lg:p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Open Requests" value={String(openCount)} icon={Clock} />
          <StatCard label="Urgent" value={String(urgentCount)} icon={AlertTriangle} badge={urgentCount > 0 ? { label: 'Needs attention', variant: 'destructive' } : undefined} />
          <StatCard label="Completed" value={String(completedCount)} icon={CheckCircle} />
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          toolbar={
            <div className="flex flex-wrap gap-3">
              <Input
                placeholder="Search requests..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-xs"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          }
        />
      </div>
    </>
  );
}
