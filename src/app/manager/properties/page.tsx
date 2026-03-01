'use client';

import { Card, Row, Col, Typography, Tag, Table, Progress, Statistic, Space, Button } from 'antd';
import { PlusOutlined, BankOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { properties, units } from '@/data/properties';
import { residents } from '@/data/residents';
import { Unit } from '@/types';

const { Text, Title } = Typography;

export default function PropertiesPage() {
  const unitColumns: ColumnsType<Unit> = [
    {
      title: 'Unit',
      dataIndex: 'number',
      key: 'number',
      width: 80,
      render: (val: string) => <Tag style={{ borderRadius: 8 }}>{val}</Tag>,
    },
    {
      title: 'Floor',
      dataIndex: 'floor',
      key: 'floor',
      width: 60,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <Tag
          color={status === 'occupied' ? 'success' : status === 'vacant' ? 'warning' : 'default'}
          style={{ borderRadius: 12, textTransform: 'capitalize' }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Resident',
      key: 'resident',
      render: (_, record) => {
        if (!record.residentId) return <Text type="secondary">—</Text>;
        const resident = residents.find((r) => r.id === record.residentId);
        return <Text style={{ fontSize: 13 }}>{resident?.name || '—'}</Text>;
      },
    },
    {
      title: 'Rent',
      dataIndex: 'rentAmount',
      key: 'rent',
      width: 100,
      render: (val: number) => <Text strong>${val.toLocaleString()}</Text>,
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <div />
        <Button type="primary" icon={<PlusOutlined />} size="large">
          Add Property
        </Button>
      </div>

      {properties.map((prop) => {
        const propUnits = units.filter((u) => u.propertyId === prop.id);
        const occupied = propUnits.filter((u) => u.status === 'occupied').length;
        const vacant = propUnits.filter((u) => u.status === 'vacant').length;
        const maintenance = propUnits.filter((u) => u.status === 'maintenance').length;
        const occupancyRate = propUnits.length > 0 ? Math.round((occupied / propUnits.length) * 100) : 0;
        const totalRent = propUnits.reduce((s, u) => s + u.rentAmount, 0);

        return (
          <Card key={prop.id} style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background:
                    prop.id === 'prop-1'
                      ? 'linear-gradient(135deg, #2dd4bf, #0f766e)'
                      : 'linear-gradient(135deg, #34d399, #059669)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                {prop.name
                  .split(' ')
                  .map((w) => w[0])
                  .join('')}
              </div>
              <div>
                <Title level={4} style={{ margin: 0 }}>{prop.name}</Title>
                <Text type="secondary">{prop.address}</Text>
              </div>
            </div>

            <Row gutter={[24, 16]} style={{ marginBottom: 24 }}>
              <Col xs={12} sm={6}>
                <Statistic title="Total Units" value={propUnits.length} />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title="Occupancy"
                  value={occupancyRate}
                  suffix="%"
                  valueStyle={{ color: '#10b981' }}
                />
                <Progress percent={occupancyRate} showInfo={false} strokeColor="#10b981" />
              </Col>
              <Col xs={12} sm={6}>
                <Space direction="vertical" size={4}>
                  <Statistic title="Status" value={occupied} suffix="occupied" />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {vacant} vacant &middot; {maintenance} maintenance
                  </Text>
                </Space>
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title="Total Monthly Rent"
                  value={totalRent}
                  prefix="$"
                  valueStyle={{ color: '#0f766e' }}
                />
              </Col>
            </Row>

            <Title level={5}>Units</Title>
            <Table
              columns={unitColumns}
              dataSource={propUnits}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        );
      })}
    </div>
  );
}
