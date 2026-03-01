'use client';

import { useState } from 'react';
import { Table, Card, Tag, Select, Space, Input, Button, Badge, Typography, Avatar, Drawer, Timeline, Descriptions } from 'antd';
import { SearchOutlined, PlusOutlined, FilterOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { maintenanceRequests } from '@/data/maintenance';
import { MaintenanceRequest } from '@/types';

const { Text, Title } = Typography;

const statusColors: Record<string, string> = {
  new: 'blue',
  in_progress: 'orange',
  completed: 'green',
  closed: 'default',
};

const priorityColors: Record<string, string> = {
  urgent: 'red',
  medium: 'orange',
  low: 'default',
};

const categoryLabels: Record<string, string> = {
  plumbing: 'Plumbing',
  electrical: 'Electrical',
  hvac: 'HVAC',
  appliance: 'Appliance',
  general: 'General',
  other: 'Other',
};

export default function MaintenancePage() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchText, setSearchText] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);

  const filtered = maintenanceRequests.filter((r) => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && r.priority !== priorityFilter) return false;
    if (searchText && !r.title.toLowerCase().includes(searchText.toLowerCase()) && !r.residentName.toLowerCase().includes(searchText.toLowerCase())) return false;
    return true;
  });

  const columns: ColumnsType<MaintenanceRequest> = [
    {
      title: 'Request',
      key: 'request',
      render: (_, record) => (
        <div>
          <Text strong style={{ fontSize: 13 }}>{record.title}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {categoryLabels[record.category]} &middot; Unit {record.unitNumber}
          </Text>
        </div>
      ),
    },
    {
      title: 'Resident',
      dataIndex: 'residentName',
      key: 'resident',
      render: (name: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar size="small" style={{ backgroundColor: '#0f766e' }}>
            {name.split(' ').map((w) => w[0]).join('')}
          </Avatar>
          <Text style={{ fontSize: 13 }}>{name}</Text>
        </div>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      render: (priority: string) => (
        <Tag color={priorityColors[priority]} style={{ borderRadius: 12, textTransform: 'capitalize' }}>
          {priority}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <Tag color={statusColors[status]} style={{ borderRadius: 12 }}>
          {status === 'in_progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Assigned',
      dataIndex: 'assignedTo',
      key: 'assigned',
      render: (val: string | undefined) => (
        <Text type={val ? undefined : 'secondary'} style={{ fontSize: 13 }}>
          {val || 'Unassigned'}
        </Text>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'date',
      width: 100,
      render: (date: string) => (
        <Text type="secondary" style={{ fontSize: 12 }}>
          {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </Text>
      ),
    },
  ];

  const statusCounts = {
    all: maintenanceRequests.length,
    new: maintenanceRequests.filter((r) => r.status === 'new').length,
    in_progress: maintenanceRequests.filter((r) => r.status === 'in_progress').length,
    completed: maintenanceRequests.filter((r) => r.status === 'completed').length,
    closed: maintenanceRequests.filter((r) => r.status === 'closed').length,
  };

  return (
    <div>
      {/* Stats row */}
      <Space size={12} style={{ marginBottom: 24 }}>
        {Object.entries(statusCounts).map(([key, count]) => (
          <Badge
            key={key}
            count={count}
            style={{
              backgroundColor:
                key === 'all' ? '#64748b' : key === 'new' ? '#3b82f6' : key === 'in_progress' ? '#f59e0b' : key === 'completed' ? '#10b981' : '#64748b',
            }}
          >
            <Tag
              style={{
                cursor: 'pointer',
                borderRadius: 8,
                padding: '4px 12px',
                fontWeight: statusFilter === key ? 600 : 400,
                borderColor: statusFilter === key ? '#0f766e' : undefined,
                color: statusFilter === key ? '#0f766e' : undefined,
              }}
              onClick={() => setStatusFilter(key)}
            >
              {key === 'all' ? 'All' : key === 'in_progress' ? 'In Progress' : key.charAt(0).toUpperCase() + key.slice(1)}
            </Tag>
          </Badge>
        ))}
      </Space>

      <Card>
        {/* Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <Space>
            <Input
              placeholder="Search requests..."
              prefix={<SearchOutlined />}
              aria-label="Search maintenance requests"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 280 }}
            />
            <Select
              value={priorityFilter}
              onChange={setPriorityFilter}
              style={{ width: 140 }}
              options={[
                { value: 'all', label: 'All Priorities' },
                { value: 'urgent', label: 'Urgent' },
                { value: 'medium', label: 'Medium' },
                { value: 'low', label: 'Low' },
              ]}
            />
          </Space>
          <Button type="primary" icon={<PlusOutlined />}>
            Create Request
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
          onRow={(record) => ({
            onClick: () => setSelectedRequest(record),
            style: { cursor: 'pointer' },
          })}
        />
      </Card>

      {/* Detail Drawer */}
      <Drawer
        title="Request Details"
        open={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        width={480}
      >
        {selectedRequest && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <Title level={4} style={{ marginBottom: 4 }}>{selectedRequest.title}</Title>
              <Space>
                <Tag color={priorityColors[selectedRequest.priority]} style={{ borderRadius: 12, textTransform: 'capitalize' }}>
                  {selectedRequest.priority}
                </Tag>
                <Tag color={statusColors[selectedRequest.status]} style={{ borderRadius: 12 }}>
                  {selectedRequest.status === 'in_progress' ? 'In Progress' : selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                </Tag>
              </Space>
            </div>

            <Descriptions column={1} size="small" style={{ marginBottom: 24 }}>
              <Descriptions.Item label="Category">{categoryLabels[selectedRequest.category]}</Descriptions.Item>
              <Descriptions.Item label="Unit">{selectedRequest.unitNumber}</Descriptions.Item>
              <Descriptions.Item label="Resident">{selectedRequest.residentName}</Descriptions.Item>
              <Descriptions.Item label="Assigned">{selectedRequest.assignedTo || 'Unassigned'}</Descriptions.Item>
              <Descriptions.Item label="Created">
                {new Date(selectedRequest.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </Descriptions.Item>
            </Descriptions>

            <Title level={5}>Description</Title>
            <Text style={{ display: 'block', marginBottom: 24, color: '#475569' }}>
              {selectedRequest.description}
            </Text>

            <Title level={5}>Timeline</Title>
            <Timeline
              items={[
                {
                  color: '#3b82f6',
                  children: (
                    <>
                      <Text strong style={{ fontSize: 13 }}>Request created</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {new Date(selectedRequest.createdAt).toLocaleString()}
                      </Text>
                    </>
                  ),
                },
                ...(selectedRequest.assignedTo
                  ? [
                      {
                        color: '#f59e0b',
                        children: (
                          <>
                            <Text strong style={{ fontSize: 13 }}>
                              Assigned to {selectedRequest.assignedTo}
                            </Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {new Date(selectedRequest.updatedAt).toLocaleString()}
                            </Text>
                          </>
                        ),
                      },
                    ]
                  : []),
                ...(selectedRequest.status === 'completed' || selectedRequest.status === 'closed'
                  ? [
                      {
                        color: '#10b981',
                        children: (
                          <>
                            <Text strong style={{ fontSize: 13 }}>
                              Request {selectedRequest.status}
                            </Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {new Date(selectedRequest.updatedAt).toLocaleString()}
                            </Text>
                          </>
                        ),
                      },
                    ]
                  : []),
              ]}
            />
          </div>
        )}
      </Drawer>
    </div>
  );
}
