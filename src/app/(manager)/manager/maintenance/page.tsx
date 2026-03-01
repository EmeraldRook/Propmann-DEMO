'use client';

import React, { useState } from 'react';
import { Table, Tag, Select, Input, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useProperty } from '@/context/PropertyContext';
import { getMaintenanceByProperty } from '@/data/maintenance';
import type { MaintenanceRequest, MaintenanceStatus, MaintenancePriority } from '@/types';
import { formatDate } from '@/lib/format';

const statusConfig: Record<MaintenanceStatus, { color: string; label: string }> = {
  new: { color: 'blue', label: 'New' },
  in_progress: { color: 'orange', label: 'In Progress' },
  completed: { color: 'green', label: 'Completed' },
  closed: { color: 'default', label: 'Closed' },
};

const priorityConfig: Record<MaintenancePriority, { color: string; label: string }> = {
  low: { color: 'default', label: 'Low' },
  medium: { color: 'blue', label: 'Medium' },
  high: { color: 'orange', label: 'High' },
  urgent: { color: 'red', label: 'Urgent' },
};

export default function MaintenancePage() {
  const { selectedProperty } = useProperty();
  const allRequests = getMaintenanceByProperty(selectedProperty.id);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = allRequests.filter((r) => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && r.priority !== priorityFilter) return false;
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.residentName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const columns: ColumnsType<MaintenanceRequest> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 90,
      render: (id: string) => <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{id}</span>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (title: string, record) => (
        <div>
          <div style={{ fontWeight: 600 }}>{title}</div>
          <div style={{ fontSize: 12, color: '#888' }}>{record.residentName} · Unit {record.unit}</div>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      width: 120,
      render: (cat: string) => <span style={{ textTransform: 'capitalize' }}>{cat.replace('_', ' ')}</span>,
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      width: 100,
      render: (p: MaintenancePriority) => <Tag color={priorityConfig[p].color}>{priorityConfig[p].label}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 120,
      render: (s: MaintenanceStatus) => <Tag color={statusConfig[s].color}>{statusConfig[s].label}</Tag>,
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      width: 180,
      render: (val?: string) => val || <span style={{ color: '#ccc' }}>Unassigned</span>,
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      width: 120,
      render: (d: string) => formatDate(d, 'DD MMM'),
    },
  ];

  const openCount = allRequests.filter((r) => r.status === 'new' || r.status === 'in_progress').length;

  return (
    <div>
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {(['new', 'in_progress', 'completed', 'closed'] as MaintenanceStatus[]).map((s) => {
          const count = allRequests.filter((r) => r.status === s).length;
          const cfg = statusConfig[s];
          return (
            <Card key={s} bodyStyle={{ padding: 16, textAlign: 'center' }} style={{ borderRadius: 12, border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{count}</div>
              <Tag color={cfg.color} style={{ marginTop: 4 }}>{cfg.label}</Tag>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card style={{ borderRadius: 16, border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <Input
            placeholder="Search by title or resident..."
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 280 }}
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 150 }}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'new', label: 'New' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'completed', label: 'Completed' },
              { value: 'closed', label: 'Closed' },
            ]}
          />
          <Select
            value={priorityFilter}
            onChange={setPriorityFilter}
            style={{ width: 150 }}
            options={[
              { value: 'all', label: 'All Priority' },
              { value: 'urgent', label: 'Urgent' },
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
              { value: 'low', label: 'Low' },
            ]}
          />
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 13, color: '#888', alignSelf: 'center' }}>
            {openCount} open request{openCount !== 1 ? 's' : ''}
          </div>
        </div>

        <Table
          dataSource={filtered}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          size="middle"
        />
      </Card>
    </div>
  );
}
