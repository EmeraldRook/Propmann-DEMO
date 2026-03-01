'use client';

import { Card, Row, Col, Statistic, Progress, Typography, Tag, Button, Space, Timeline } from 'antd';
import {
  BankOutlined,
  ToolOutlined,
  DollarOutlined,
  TeamOutlined,
  PlusOutlined,
  UserAddOutlined,
  EditOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import { properties } from '@/data/properties';
import { maintenanceRequests } from '@/data/maintenance';
import { residents } from '@/data/residents';
import { payments } from '@/data/payments';
import { useProperty } from '@/contexts/PropertyContext';

const { Text, Title } = Typography;

export default function ManagerDashboard() {
  const { selectedProperty } = useProperty();
  const prop = properties.find((p) => p.id === selectedProperty) || properties[0];
  const occupancyRate = Math.round((prop.occupiedUnits / prop.unitCount) * 100);
  const openRequests = maintenanceRequests.filter(
    (r) => r.propertyId === selectedProperty && (r.status === 'new' || r.status === 'in_progress')
  );
  const urgentCount = openRequests.filter((r) => r.priority === 'urgent').length;
  const mediumCount = openRequests.filter((r) => r.priority === 'medium').length;
  const lowCount = openRequests.filter((r) => r.priority === 'low').length;

  const marchPayments = payments.filter((p) => p.dueDate.startsWith('2026-03') && p.propertyId === selectedProperty);
  const paidCount = marchPayments.filter((p) => p.status === 'paid').length;
  const totalRent = marchPayments.reduce((sum, p) => sum + p.amount, 0);
  const collectedRent = marchPayments.filter((p) => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const collectionRate = totalRent > 0 ? Math.round((collectedRent / totalRent) * 100) : 0;

  const propResidents = residents.filter((r) => r.propertyId === selectedProperty);

  return (
    <div>
      {/* Quick Actions */}
      <Space style={{ marginBottom: 24 }}>
        <Button type="primary" icon={<PlusOutlined />} size="large">
          Post Announcement
        </Button>
        <Button icon={<UserAddOutlined />} size="large">
          Add Resident
        </Button>
        <Button icon={<EditOutlined />} size="large">
          Create Request
        </Button>
      </Space>

      {/* Stats */}
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={12} lg={6}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: '#f0fdfa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BankOutlined style={{ fontSize: 18, color: '#0f766e' }} />
              </div>
              <Tag color="success" style={{ borderRadius: 12 }}>
                <ArrowUpOutlined /> +2 this month
              </Tag>
            </div>
            <Statistic
              title="Occupancy Rate"
              value={occupancyRate}
              suffix="%"
              valueStyle={{ fontWeight: 700, fontSize: 28 }}
            />
            <Progress
              percent={occupancyRate}
              showInfo={false}
              strokeColor="#14b8a6"
              style={{ marginTop: 12 }}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {prop.occupiedUnits}/{prop.unitCount} units
            </Text>
          </Card>
        </Col>

        <Col xs={12} lg={6}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: '#fffbeb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ToolOutlined style={{ fontSize: 18, color: '#f59e0b' }} />
              </div>
              <Tag color="error" style={{ borderRadius: 12 }}>
                {urgentCount} urgent
              </Tag>
            </div>
            <Statistic
              title="Open Requests"
              value={openRequests.length}
              valueStyle={{ fontWeight: 700, fontSize: 28 }}
            />
            <Space style={{ marginTop: 12 }}>
              <Tag color="red">{urgentCount} urgent</Tag>
              <Tag color="orange">{mediumCount} medium</Tag>
              <Tag>{lowCount} low</Tag>
            </Space>
          </Card>
        </Col>

        <Col xs={12} lg={6}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: '#ecfdf5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <DollarOutlined style={{ fontSize: 18, color: '#10b981' }} />
              </div>
              <Tag color="success" style={{ borderRadius: 12 }}>
                {collectionRate}% collected
              </Tag>
            </div>
            <Statistic
              title="Monthly Revenue"
              value={totalRent}
              prefix="$"
              formatter={(value) =>
                `${Number(value).toLocaleString()}`
              }
              valueStyle={{ fontWeight: 700, fontSize: 28 }}
            />
            <Progress
              percent={collectionRate}
              showInfo={false}
              strokeColor="#10b981"
              style={{ marginTop: 12 }}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {paidCount}/{marchPayments.length} payments received
            </Text>
          </Card>
        </Col>

        <Col xs={12} lg={6}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 16 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: '#f5f3ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TeamOutlined style={{ fontSize: 18, color: '#8b5cf6' }} />
              </div>
              <Tag color="purple" style={{ borderRadius: 12 }}>
                2 pending
              </Tag>
            </div>
            <Statistic
              title="Total Residents"
              value={propResidents.length}
              valueStyle={{ fontWeight: 700, fontSize: 28 }}
            />
            <Text type="secondary" style={{ fontSize: 12, marginTop: 12, display: 'block' }}>
              {prop.occupiedUnits} occupied units &middot; {prop.unitCount - prop.occupiedUnits} vacant
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Bottom section */}
      <Row gutter={[24, 24]}>
        {/* Properties Overview */}
        <Col xs={24} lg={16}>
          <Card title="My Properties" extra={<a href="/manager/properties">Manage all</a>}>
            <Row gutter={16}>
              {properties.map((p) => (
                <Col xs={24} sm={12} key={p.id}>
                  <Card
                    size="small"
                    hoverable
                    style={{ marginBottom: 16 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          background:
                            p.id === 'prop-1'
                              ? 'linear-gradient(135deg, #2dd4bf, #0f766e)'
                              : 'linear-gradient(135deg, #34d399, #059669)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: 14,
                        }}
                      >
                        {p.name
                          .split(' ')
                          .map((w) => w[0])
                          .join('')}
                      </div>
                      <div>
                        <Text strong>{p.name}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {p.address.split(',')[0]}
                        </Text>
                      </div>
                    </div>
                    <Row gutter={8}>
                      <Col span={8} style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            background: '#f8fafc',
                            borderRadius: 8,
                            padding: '8px 0',
                          }}
                        >
                          <Text strong style={{ fontSize: 14 }}>
                            {p.unitCount}
                          </Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: 11 }}>
                            Units
                          </Text>
                        </div>
                      </Col>
                      <Col span={8} style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            background: '#f8fafc',
                            borderRadius: 8,
                            padding: '8px 0',
                          }}
                        >
                          <Text strong style={{ fontSize: 14, color: '#10b981' }}>
                            {Math.round((p.occupiedUnits / p.unitCount) * 100)}%
                          </Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: 11 }}>
                            Occ.
                          </Text>
                        </div>
                      </Col>
                      <Col span={8} style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            background: '#f8fafc',
                            borderRadius: 8,
                            padding: '8px 0',
                          }}
                        >
                          <Text strong style={{ fontSize: 14, color: '#f59e0b' }}>
                            {maintenanceRequests.filter(
                              (r) =>
                                r.propertyId === p.id &&
                                (r.status === 'new' || r.status === 'in_progress')
                            ).length}
                          </Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: 11 }}>
                            Tickets
                          </Text>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        {/* Recent Activity + Upcoming */}
        <Col xs={24} lg={8}>
          <Card title="Recent Activity" style={{ marginBottom: 24 }}>
            <Timeline
              items={[
                {
                  color: '#10b981',
                  children: (
                    <>
                      <Text strong style={{ fontSize: 13 }}>Rent payment received</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Unit 12B &middot; Ahmad Rizki &middot; $2,400
                      </Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 11 }}>2m ago</Text>
                    </>
                  ),
                },
                {
                  color: '#f59e0b',
                  children: (
                    <>
                      <Text strong style={{ fontSize: 13 }}>Urgent request submitted</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Unit 7A &middot; Water leak in bathroom
                      </Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 11 }}>15m ago</Text>
                    </>
                  ),
                },
                {
                  color: '#0f766e',
                  children: (
                    <>
                      <Text strong style={{ fontSize: 13 }}>New resident onboarded</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Unit 3C &middot; Lisa Tanaka
                      </Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 11 }}>1h ago</Text>
                    </>
                  ),
                },
                {
                  color: '#10b981',
                  children: (
                    <>
                      <Text strong style={{ fontSize: 13 }}>Request completed</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Unit 15D &middot; AC repair
                      </Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 11 }}>3h ago</Text>
                    </>
                  ),
                },
                {
                  color: '#8b5cf6',
                  children: (
                    <>
                      <Text strong style={{ fontSize: 13 }}>Amenity booked</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        BBQ Area &middot; Mar 2, 4-6 PM
                      </Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 11 }}>5h ago</Text>
                    </>
                  ),
                },
              ]}
            />
          </Card>

          <Card title="Upcoming">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { month: 'MAR', day: '1', color: '#ef4444', bg: '#fef2f2', label: 'Rent Due Date', sub: '22 of 44 units pending' },
                { month: 'MAR', day: '3', color: '#0f766e', bg: '#f0fdfa', label: 'Plumber — Unit 7A', sub: 'Scheduled 9:00 AM' },
                { month: 'MAR', day: '5', color: '#8b5cf6', bg: '#f5f3ff', label: 'Lease Expiry — Unit 9B', sub: 'Renewal pending review' },
                { month: 'MAR', day: '8', color: '#10b981', bg: '#ecfdf5', label: 'Building Inspection', sub: 'Annual fire safety check' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 44,
                      height: 52,
                      borderRadius: 10,
                      background: item.bg,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 700, color: item.color }}>{item.month}</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: item.color }}>{item.day}</span>
                  </div>
                  <div>
                    <Text strong style={{ fontSize: 13 }}>{item.label}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>{item.sub}</Text>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
