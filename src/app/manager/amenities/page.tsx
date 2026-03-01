'use client';

import { Card, Row, Col, Tag, Typography, Table, Badge, Button, Space } from 'antd';
import { PlusOutlined, CalendarOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { amenities, bookings } from '@/data/amenities';
import { useProperty } from '@/contexts/PropertyContext';
import { Booking } from '@/types';

const { Text, Title } = Typography;

export default function AmenitiesPage() {
  const { selectedProperty } = useProperty();
  const propertyAmenities = amenities.filter((a) => a.propertyId === selectedProperty);
  const propertyAmenityIds = new Set(propertyAmenities.map((a) => a.id));
  const propertyBookings = bookings.filter((b) => propertyAmenityIds.has(b.amenityId));
  const bookingColumns: ColumnsType<Booking> = [
    {
      title: 'Amenity',
      dataIndex: 'amenityName',
      key: 'amenity',
      render: (val: string) => <Text strong style={{ fontSize: 13 }}>{val}</Text>,
    },
    {
      title: 'Resident',
      dataIndex: 'residentName',
      key: 'resident',
      render: (val: string) => <Text style={{ fontSize: 13 }}>{val}</Text>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (val: string) => (
        <Text style={{ fontSize: 13 }}>
          {new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </Text>
      ),
    },
    {
      title: 'Time',
      key: 'time',
      width: 140,
      render: (_, record) => (
        <Text type="secondary" style={{ fontSize: 13 }}>
          {record.startTime} - {record.endTime}
        </Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag
          color={status === 'confirmed' ? 'success' : 'default'}
          style={{ borderRadius: 12 }}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      {/* Amenity cards */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={5} style={{ margin: 0 }}>Amenities</Title>
        <Button type="primary" icon={<PlusOutlined />}>Add Amenity</Button>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        {propertyAmenities.map((am) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={am.id}>
            <Card hoverable>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: am.available ? '#f0fdfa' : '#fef2f2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CalendarOutlined style={{ fontSize: 18, color: am.available ? '#0f766e' : '#ef4444' }} />
                </div>
                {am.available ? (
                  <Badge status="success" text={<Text style={{ fontSize: 12 }}>Available</Text>} />
                ) : (
                  <Badge status="error" text={<Text style={{ fontSize: 12 }}>Unavailable</Text>} />
                )}
              </div>
              <Text strong style={{ fontSize: 14 }}>{am.name}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginTop: 4 }}>
                {am.description}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Upcoming Bookings */}
      <Card title="Upcoming Bookings">
        <Table
          columns={bookingColumns}
          dataSource={propertyBookings.filter((b) => b.status === 'confirmed' && new Date(b.date) >= new Date('2026-02-28'))}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  );
}
