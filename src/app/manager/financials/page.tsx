'use client';

import { Card, Row, Col, Statistic, Table, Tag, Typography, Progress, Space } from 'antd';
import { DollarOutlined, ArrowUpOutlined, WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { payments } from '@/data/payments';
import { useProperty } from '@/contexts/PropertyContext';
import { Payment } from '@/types';

const { Text, Title } = Typography;

export default function FinancialsPage() {
  const { selectedProperty } = useProperty();
  const propertyPayments = payments.filter((p) => p.propertyId === selectedProperty);
  const marchPayments = propertyPayments.filter((p) => p.dueDate.startsWith('2026-03') && p.type === 'rent');
  const paidPayments = marchPayments.filter((p) => p.status === 'paid');
  const pendingPayments = marchPayments.filter((p) => p.status === 'pending');
  const overduePayments = propertyPayments.filter((p) => p.status === 'overdue');

  const totalExpected = marchPayments.reduce((s, p) => s + p.amount, 0);
  const totalCollected = paidPayments.reduce((s, p) => s + p.amount, 0);
  const totalPending = pendingPayments.reduce((s, p) => s + p.amount, 0);
  const totalOverdue = overduePayments.reduce((s, p) => s + p.amount, 0);
  const collectionPct = totalExpected > 0 ? Math.round((totalCollected / totalExpected) * 100) : 0;

  const columns: ColumnsType<Payment> = [
    {
      title: 'Resident',
      key: 'resident',
      render: (_, record) => (
        <div>
          <Text strong style={{ fontSize: 13 }}>{record.residentName}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>Unit {record.unitNumber}</Text>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
      render: (val: number) => <Text strong>RM {val.toLocaleString()}</Text>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 80,
      render: (val: string) => (
        <Tag style={{ borderRadius: 8, textTransform: 'capitalize' }}>{val}</Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag
          color={status === 'paid' ? 'success' : status === 'overdue' ? 'error' : 'warning'}
          style={{ borderRadius: 12 }}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 120,
      render: (val: string) => (
        <Text type="secondary" style={{ fontSize: 13 }}>
          {new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </Text>
      ),
    },
    {
      title: 'Paid',
      dataIndex: 'paidDate',
      key: 'paidDate',
      width: 120,
      render: (val: string | undefined) =>
        val ? (
          <Text style={{ fontSize: 13, color: '#10b981' }}>
            {new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </Text>
        ) : (
          <Text type="secondary" style={{ fontSize: 12 }}>—</Text>
        ),
    },
  ];

  return (
    <div>
      {/* Summary Stats */}
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={12} lg={6}>
          <Card>
            <Statistic
              title="Expected Revenue"
              value={totalExpected}
              prefix="RM "
              valueStyle={{ fontWeight: 700, color: '#0f172a' }}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>March 2026</Text>
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card>
            <Statistic
              title="Collected"
              value={totalCollected}
              prefix={<><CheckCircleOutlined style={{ color: '#10b981', marginRight: 4 }} />RM </>}
              valueStyle={{ fontWeight: 700, color: '#10b981' }}
            />
            <Progress percent={collectionPct} strokeColor="#10b981" showInfo={false} style={{ marginTop: 8 }} />
            <Text type="secondary" style={{ fontSize: 12 }}>{collectionPct}% of expected</Text>
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card>
            <Statistic
              title="Pending"
              value={totalPending}
              prefix="RM "
              valueStyle={{ fontWeight: 700, color: '#f59e0b' }}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>{pendingPayments.length} payments due</Text>
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card>
            <Statistic
              title="Overdue"
              value={totalOverdue}
              prefix={<><WarningOutlined style={{ color: '#ef4444', marginRight: 4 }} />RM </>}
              valueStyle={{ fontWeight: 700, color: '#ef4444' }}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>{overduePayments.length} overdue payments</Text>
          </Card>
        </Col>
      </Row>

      {/* Payment History */}
      <Card title="Payment History">
        <Table
          columns={columns}
          dataSource={propertyPayments}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </div>
  );
}
