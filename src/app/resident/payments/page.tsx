'use client';

import { useState } from 'react';
import { Typography, Tag, Button, Modal } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { payments } from '@/data/payments';
import { currentResident } from '@/data/residents';

const { Text } = Typography;

export default function PaymentsPage() {
  const [showPayModal, setShowPayModal] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const myPayments = payments.filter((p) => p.residentId === currentResident.id);
  const currentDue = myPayments.find((p) => p.dueDate.startsWith('2026-03') && p.type === 'rent');

  const handlePay = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setShowPayModal(false);
      setPaySuccess(true);
      setTimeout(() => setPaySuccess(false), 3000);
    }, 1200);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ padding: '48px 20px 20px', background: '#ffffff', borderBottom: '1px solid #f1f5f9' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: 0 }}>Payments</h1>
      </div>

      <div style={{ padding: 20 }}>
        {/* Current Due */}
        {currentDue && currentDue.status !== 'paid' && (
          <div
            style={{
              background: 'linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #14b8a6 100%)',
              borderRadius: 20,
              padding: 24,
              color: 'white',
              marginBottom: 24,
            }}
          >
            <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>Next Payment Due</div>
            <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 12 }}>
              {new Date(currentDue.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>
              ${currentDue.amount.toLocaleString()}.00
            </div>
            <button
              onClick={() => setShowPayModal(true)}
              style={{
                width: '100%',
                padding: '14px 0',
                borderRadius: 12,
                border: 'none',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
              }}
            >
              Pay Now
            </button>
          </div>
        )}

        {paySuccess && (
          <div
            style={{
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: 12,
              padding: 16,
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <CheckCircleOutlined style={{ color: '#10b981', fontSize: 20 }} />
            <Text style={{ color: '#065f46', fontWeight: 500 }}>Payment successful! Thank you.</Text>
          </div>
        )}

        {/* Payment History */}
        <h2 style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 12 }}>Payment History</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {myPayments.map((payment) => (
            <div
              key={payment.id}
              style={{
                background: '#ffffff',
                borderRadius: 16,
                padding: 16,
                border: '1px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>
                  ${payment.amount.toLocaleString()}
                </div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
                  {payment.type.charAt(0).toUpperCase() + payment.type.slice(1)} &middot; Due{' '}
                  {new Date(payment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                {payment.paidDate && (
                  <div style={{ fontSize: 11, color: '#10b981', marginTop: 2 }}>
                    Paid {new Date(payment.paidDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                )}
              </div>
              <Tag
                style={{
                  borderRadius: 12,
                  border: 'none',
                  background:
                    payment.status === 'paid'
                      ? '#ecfdf5'
                      : payment.status === 'overdue'
                      ? '#fef2f2'
                      : '#fffbeb',
                  color:
                    payment.status === 'paid'
                      ? '#10b981'
                      : payment.status === 'overdue'
                      ? '#ef4444'
                      : '#d97706',
                  fontWeight: 500,
                }}
              >
                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </Tag>
            </div>
          ))}
        </div>
      </div>

      {/* Pay Modal */}
      <Modal
        open={showPayModal}
        onCancel={() => setShowPayModal(false)}
        title="Confirm Payment"
        footer={null}
      >
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
            ${currentDue?.amount.toLocaleString()}.00
          </div>
          <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>March 2026 Rent</Text>
          <div
            style={{
              background: '#f8fafc',
              borderRadius: 12,
              padding: 16,
              marginBottom: 24,
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>Payment Method</Text>
              <Text style={{ fontSize: 13 }}>Bank Transfer (Demo)</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text type="secondary" style={{ fontSize: 12 }}>Unit</Text>
              <Text style={{ fontSize: 13 }}>{currentResident.unitNumber}</Text>
            </div>
          </div>
          <Button type="primary" block size="large" loading={submitting} onClick={handlePay} style={{ borderRadius: 12 }}>
            Confirm Payment
          </Button>
        </div>
      </Modal>
    </div>
  );
}
