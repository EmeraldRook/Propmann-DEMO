'use client';

import { useState } from 'react';
import { Typography, Tag, Button, Modal, Form, Input, Select, Radio } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { maintenanceRequests } from '@/data/maintenance';
import { currentResident } from '@/data/residents';

const { Text } = Typography;
const { TextArea } = Input;

const statusColors: Record<string, string> = {
  new: '#3b82f6',
  in_progress: '#f59e0b',
  completed: '#10b981',
  closed: '#64748b',
};

const statusLabels: Record<string, string> = {
  new: 'New',
  in_progress: 'In Progress',
  completed: 'Completed',
  closed: 'Closed',
};

const categoryIcons: Record<string, string> = {
  plumbing: '#3b82f6',
  electrical: '#f59e0b',
  hvac: '#8b5cf6',
  appliance: '#ec4899',
  general: '#64748b',
  other: '#64748b',
};

export default function RequestsPage() {
  const [showNew, setShowNew] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  const myRequests = maintenanceRequests.filter((r) => r.residentId === currentResident.id);
  const statusSteps = ['new', 'in_progress', 'completed', 'closed'];

  const selected = myRequests.find((r) => r.id === selectedRequest);

  return (
    <div>
      {/* Header */}
      <div style={{ padding: '48px 20px 20px', background: '#ffffff', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: 0 }}>My Requests</h1>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setShowNew(true)}
            style={{ borderRadius: 12 }}
          >
            New
          </Button>
        </div>
      </div>

      {/* Request list */}
      <div style={{ padding: 20 }}>
        {myRequests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <Text type="secondary">No maintenance requests yet</Text>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {myRequests.map((req) => {
              const stepIndex = statusSteps.indexOf(req.status);
              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedRequest(req.id)}
                  style={{
                    background: '#ffffff',
                    borderRadius: 16,
                    padding: 16,
                    border: '1px solid #f1f5f9',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                    <div style={{ display: 'flex', gap: 12, flex: 1 }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 12,
                          background: `${categoryIcons[req.category]}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <svg width="20" height="20" fill="none" stroke={categoryIcons[req.category]} strokeWidth="1.8" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{req.title}</div>
                        <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
                          {req.category.charAt(0).toUpperCase() + req.category.slice(1)} &middot; {new Date(req.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    <Tag
                      style={{
                        borderRadius: 12,
                        border: 'none',
                        background: `${statusColors[req.status]}15`,
                        color: statusColors[req.status],
                        fontWeight: 500,
                        fontSize: 11,
                      }}
                    >
                      {statusLabels[req.status]}
                    </Tag>
                  </div>

                  {/* Mini progress */}
                  <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                    {statusSteps.map((_, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: 4,
                          borderRadius: 2,
                          background: i <= stepIndex ? '#14b8a6' : '#e2e8f0',
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal
        open={!!selected}
        onCancel={() => setSelectedRequest(null)}
        footer={null}
        title={selected?.title}
      >
        {selected && (
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <Tag color={selected.priority === 'urgent' ? 'red' : selected.priority === 'medium' ? 'orange' : 'default'} style={{ borderRadius: 8 }}>
                {selected.priority}
              </Tag>
              <Tag style={{ borderRadius: 8, background: `${statusColors[selected.status]}15`, color: statusColors[selected.status], border: 'none' }}>
                {statusLabels[selected.status]}
              </Tag>
            </div>
            <p style={{ color: '#475569', marginBottom: 16 }}>{selected.description}</p>
            <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>Category</Text>
                <Text style={{ fontSize: 13 }}>{selected.category.charAt(0).toUpperCase() + selected.category.slice(1)}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>Submitted</Text>
                <Text style={{ fontSize: 13 }}>
                  {new Date(selected.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </Text>
              </div>
              {selected.assignedTo && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>Assigned to</Text>
                  <Text style={{ fontSize: 13 }}>{selected.assignedTo}</Text>
                </div>
              )}
            </div>

            {/* Progress */}
            <div style={{ marginTop: 20 }}>
              <Text strong style={{ fontSize: 13 }}>Progress</Text>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                {statusSteps.map((step, i) => (
                  <div key={step} style={{ flex: 1, textAlign: 'center' }}>
                    <div
                      style={{
                        height: 6,
                        borderRadius: 3,
                        background: i <= statusSteps.indexOf(selected.status) ? '#14b8a6' : '#e2e8f0',
                        marginBottom: 4,
                      }}
                    />
                    <span style={{ fontSize: 10, color: i <= statusSteps.indexOf(selected.status) ? '#0f766e' : '#64748b' }}>
                      {statusLabels[step]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* New Request Modal */}
      <Modal
        open={showNew}
        onCancel={() => setShowNew(false)}
        title="Submit New Request"
        footer={null}
      >
        <Form layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item label="Category" required>
            <Select
              placeholder="Select category"
              options={[
                { value: 'plumbing', label: 'Plumbing' },
                { value: 'electrical', label: 'Electrical' },
                { value: 'hvac', label: 'HVAC' },
                { value: 'appliance', label: 'Appliance' },
                { value: 'general', label: 'General' },
                { value: 'other', label: 'Other' },
              ]}
            />
          </Form.Item>
          <Form.Item label="Title" required>
            <Input placeholder="Brief description of the issue" />
          </Form.Item>
          <Form.Item label="Description" required>
            <TextArea rows={3} placeholder="Describe the issue in detail..." />
          </Form.Item>
          <Form.Item label="Priority">
            <Radio.Group defaultValue="medium">
              <Radio.Button value="low">Low</Radio.Button>
              <Radio.Button value="medium">Medium</Radio.Button>
              <Radio.Button value="urgent">Urgent</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Button
            type="primary"
            block
            size="large"
            loading={submitting}
            onClick={() => {
              setSubmitting(true);
              setTimeout(() => { setSubmitting(false); setShowNew(false); }, 1000);
            }}
          >
            Submit Request
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
