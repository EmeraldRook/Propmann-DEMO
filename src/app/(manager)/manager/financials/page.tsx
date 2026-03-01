'use client';

import React from 'react';
import { Table, Tag, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  DollarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useProperty } from '@/context/PropertyContext';
import { getPaymentsByProperty, getMonthlySummariesByProperty } from '@/data/financials';
import type { Payment } from '@/types';
import { formatRM, formatDate } from '@/lib/format';
import RevenueChart from '@/components/manager/RevenueChart';

export default function FinancialsPage() {
  const { selectedProperty } = useProperty();
  const payments = getPaymentsByProperty(selectedProperty.id);
  const summaries = getMonthlySummariesByProperty(selectedProperty.id);

  const paid = payments.filter((p) => p.status === 'paid');
  const pending = payments.filter((p) => p.status === 'pending');
  const overdue = payments.filter((p) => p.status === 'overdue');
  const totalCollected = paid.reduce((s, p) => s + p.amount, 0);
  const totalPending = pending.reduce((s, p) => s + p.amount, 0);
  const totalOverdue = overdue.reduce((s, p) => s + p.amount, 0);

  const columns: ColumnsType<Payment> = [
    {
      title: 'Resident',
      dataIndex: 'residentName',
      render: (name: string, record) => (
        <div>
          <div style={{ fontWeight: 600 }}>{name}</div>
          <div style={{ fontSize: 12, color: '#888' }}>Unit {record.unit}</div>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      width: 140,
      render: (amount: number) => <span style={{ fontWeight: 600 }}>{formatRM(amount)}</span>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      width: 140,
      render: (type: string) => <span style={{ textTransform: 'capitalize' }}>{type.replace('_', ' ')}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 110,
      render: (status: string) => {
        const colors: Record<string, string> = { paid: 'green', pending: 'orange', overdue: 'red' };
        return <Tag color={colors[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Tag>;
      },
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      width: 120,
      render: (d: string) => formatDate(d),
    },
    {
      title: 'Paid Date',
      dataIndex: 'paidDate',
      width: 120,
      render: (d?: string) => d ? formatDate(d) : <span style={{ color: '#ccc' }}>—</span>,
    },
    {
      title: 'Method',
      dataIndex: 'method',
      width: 130,
      render: (method?: string) => method ? <span style={{ textTransform: 'capitalize' }}>{method.replace('_', ' ')}</span> : <span style={{ color: '#ccc' }}>—</span>,
    },
  ];

  return (
    <div>
      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <Card bodyStyle={{ padding: 20 }} style={{ borderRadius: 16, border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', fontSize: 20 }}>
              <CheckCircleOutlined />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{formatRM(totalCollected)}</div>
              <div style={{ fontSize: 13, color: '#888' }}>Collected ({paid.length} payments)</div>
            </div>
          </div>
        </Card>
        <Card bodyStyle={{ padding: 20 }} style={{ borderRadius: 16, border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fef9c3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', fontSize: 20 }}>
              <ClockCircleOutlined />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{formatRM(totalPending)}</div>
              <div style={{ fontSize: 13, color: '#888' }}>Pending ({pending.length} payments)</div>
            </div>
          </div>
        </Card>
        <Card bodyStyle={{ padding: 20 }} style={{ borderRadius: 16, border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', fontSize: 20 }}>
              <ExclamationCircleOutlined />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{formatRM(totalOverdue)}</div>
              <div style={{ fontSize: 13, color: '#888' }}>Overdue ({overdue.length} payments)</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue chart */}
      <div style={{ marginBottom: 24 }}>
        <RevenueChart data={summaries} />
      </div>

      {/* Payments table */}
      <Card
        title="Payment History"
        style={{ borderRadius: 16, border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
      >
        <Table
          dataSource={payments}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          size="middle"
        />
      </Card>
    </div>
  );
}
