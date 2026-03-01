'use client';

import { useState } from 'react';
import { Table, Card, Input, Button, Avatar, Typography, Tag, Space, Drawer, Descriptions, Divider } from 'antd';
import { SearchOutlined, UserAddOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { residents } from '@/data/residents';
import { payments } from '@/data/payments';
import { maintenanceRequests } from '@/data/maintenance';
import { Resident } from '@/types';

const { Text, Title } = Typography;

export default function ResidentsPage() {
  const [searchText, setSearchText] = useState('');
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);

  const filtered = residents.filter((r) => {
    if (!searchText) return true;
    const q = searchText.toLowerCase();
    return r.name.toLowerCase().includes(q) || r.unitNumber.toLowerCase().includes(q) || r.email.toLowerCase().includes(q);
  });

  const columns: ColumnsType<Resident> = [
    {
      title: 'Resident',
      key: 'name',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar style={{ backgroundColor: '#0f766e' }}>
            {record.name.split(' ').map((w) => w[0]).join('')}
          </Avatar>
          <div>
            <Text strong style={{ fontSize: 13 }}>{record.name}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>{record.email}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Unit',
      dataIndex: 'unitNumber',
      key: 'unit',
      width: 80,
      render: (val: string) => <Tag style={{ borderRadius: 8 }}>{val}</Tag>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (val: string) => <Text style={{ fontSize: 13 }}>{val}</Text>,
    },
    {
      title: 'Rent',
      dataIndex: 'rentAmount',
      key: 'rent',
      width: 100,
      render: (val: number) => (
        <Text strong style={{ fontSize: 13 }}>
          ${val.toLocaleString()}
        </Text>
      ),
    },
    {
      title: 'Lease End',
      dataIndex: 'leaseEnd',
      key: 'leaseEnd',
      width: 120,
      render: (val: string) => {
        const end = new Date(val);
        const now = new Date();
        const daysLeft = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return (
          <div>
            <Text style={{ fontSize: 13 }}>
              {end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </Text>
            {daysLeft <= 30 && daysLeft > 0 && (
              <>
                <br />
                <Tag color="warning" style={{ borderRadius: 8, fontSize: 11 }}>
                  Expiring soon
                </Tag>
              </>
            )}
          </div>
        );
      },
    },
  ];

  const residentPayments = selectedResident
    ? payments.filter((p) => p.residentId === selectedResident.id)
    : [];
  const residentRequests = selectedResident
    ? maintenanceRequests.filter((r) => r.residentId === selectedResident.id)
    : [];

  return (
    <div>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <Input
            placeholder="Search by name, unit, or email..."
            prefix={<SearchOutlined />}
            aria-label="Search residents"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 320 }}
          />
          <Button type="primary" icon={<UserAddOutlined />}>
            Add Resident
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
          onRow={(record) => ({
            onClick: () => setSelectedResident(record),
            style: { cursor: 'pointer' },
          })}
        />
      </Card>

      {/* Detail Drawer */}
      <Drawer
        title="Resident Profile"
        open={!!selectedResident}
        onClose={() => setSelectedResident(null)}
        width={480}
      >
        {selectedResident && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Avatar size={64} style={{ backgroundColor: '#0f766e', fontSize: 24 }}>
                {selectedResident.name.split(' ').map((w) => w[0]).join('')}
              </Avatar>
              <Title level={4} style={{ marginTop: 12, marginBottom: 4 }}>
                {selectedResident.name}
              </Title>
              <Text type="secondary">Unit {selectedResident.unitNumber}</Text>
            </div>

            <Descriptions column={1} size="small" bordered>
              <Descriptions.Item label={<><MailOutlined /> Email</>}>{selectedResident.email}</Descriptions.Item>
              <Descriptions.Item label={<><PhoneOutlined /> Phone</>}>{selectedResident.phone}</Descriptions.Item>
              <Descriptions.Item label="Lease Start">{selectedResident.leaseStart}</Descriptions.Item>
              <Descriptions.Item label="Lease End">{selectedResident.leaseEnd}</Descriptions.Item>
              <Descriptions.Item label="Monthly Rent">${selectedResident.rentAmount.toLocaleString()}</Descriptions.Item>
            </Descriptions>

            <Divider />

            <Title level={5}>Payment History</Title>
            {residentPayments.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {residentPayments.slice(0, 5).map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 12px',
                      background: '#f8fafc',
                      borderRadius: 8,
                    }}
                  >
                    <div>
                      <Text style={{ fontSize: 13 }}>${p.amount.toLocaleString()}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 11 }}>
                        Due {new Date(p.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </Text>
                    </div>
                    <Tag
                      color={p.status === 'paid' ? 'success' : p.status === 'overdue' ? 'error' : 'warning'}
                      style={{ borderRadius: 8 }}
                    >
                      {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                    </Tag>
                  </div>
                ))}
              </div>
            ) : (
              <Text type="secondary">No payments found</Text>
            )}

            <Divider />

            <Title level={5}>Maintenance Requests</Title>
            {residentRequests.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {residentRequests.map((r) => (
                  <div
                    key={r.id}
                    style={{
                      padding: '8px 12px',
                      background: '#f8fafc',
                      borderRadius: 8,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text strong style={{ fontSize: 13 }}>{r.title}</Text>
                      <Tag
                        color={r.status === 'completed' || r.status === 'closed' ? 'success' : r.status === 'in_progress' ? 'orange' : 'blue'}
                        style={{ borderRadius: 8, fontSize: 11 }}
                      >
                        {r.status === 'in_progress' ? 'In Progress' : r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                      </Tag>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Text type="secondary">No requests</Text>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
}
