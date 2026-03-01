'use client';

import React, { useState } from 'react';
import { Table, Input, Tag, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useProperty } from '@/context/PropertyContext';
import { getResidentsByProperty } from '@/data/residents';
import type { Resident } from '@/types';
import { formatDate, formatRM, getInitials } from '@/lib/format';

export default function ResidentsPage() {
  const { selectedProperty } = useProperty();
  const allResidents = getResidentsByProperty(selectedProperty.id);
  const [search, setSearch] = useState('');

  const filtered = allResidents.filter((r) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return r.name.toLowerCase().includes(q) || r.unit.toLowerCase().includes(q) || r.email.toLowerCase().includes(q);
  });

  const columns: ColumnsType<Resident> = [
    {
      title: 'Resident',
      dataIndex: 'name',
      render: (name: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#e0f2fe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 13,
              color: '#0284c7',
              flexShrink: 0,
            }}
          >
            {getInitials(name)}
          </div>
          <span style={{ fontWeight: 600 }}>{name}</span>
        </div>
      ),
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      width: 80,
      render: (unit: string) => <span style={{ fontWeight: 600 }}>{unit}</span>,
    },
    {
      title: 'Floor',
      dataIndex: 'floor',
      width: 60,
    },
    {
      title: 'Contact',
      dataIndex: 'email',
      render: (email: string, record) => (
        <div>
          <div style={{ fontSize: 13 }}>{email}</div>
          <div style={{ fontSize: 12, color: '#888' }}>{record.phone}</div>
        </div>
      ),
    },
    {
      title: 'Rent',
      dataIndex: 'monthlyRent',
      width: 130,
      render: (rent: number) => formatRM(rent),
    },
    {
      title: 'Lease End',
      dataIndex: 'leaseEnd',
      width: 120,
      render: (d: string) => formatDate(d),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 100,
      render: (status: string) => {
        const colors: Record<string, string> = { active: 'green', notice: 'orange', vacated: 'default' };
        return <Tag color={colors[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Tag>;
      },
    },
  ];

  return (
    <div>
      <Card style={{ borderRadius: 16, border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Input
            placeholder="Search by name, unit, or email..."
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 320 }}
          />
          <div style={{ fontSize: 13, color: '#888' }}>
            {allResidents.length} resident{allResidents.length !== 1 ? 's' : ''} · {selectedProperty.name}
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
