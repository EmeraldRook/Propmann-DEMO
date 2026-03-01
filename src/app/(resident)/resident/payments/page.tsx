'use client';

import React from 'react';
import ResidentHeader from '@/components/resident/ResidentHeader';
import BottomTabBar from '@/components/resident/BottomTabBar';
import { residentProfile } from '@/data/profile';
import { getPaymentsByResident } from '@/data/financials';
import { formatRM, formatDate } from '@/lib/format';

const statusStyle: Record<string, { bg: string; color: string }> = {
  paid: { bg: '#dcfce7', color: '#16a34a' },
  pending: { bg: '#fef3c7', color: '#d97706' },
  overdue: { bg: '#fee2e2', color: '#dc2626' },
};

export default function ResidentPaymentsPage() {
  const payments = getPaymentsByResident(residentProfile.id);
  const outstanding = payments.filter((p) => p.status === 'pending' || p.status === 'overdue');
  const totalOutstanding = outstanding.reduce((s, p) => s + p.amount, 0);

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      <ResidentHeader greeting="Payments" />

      <div style={{ padding: '16px' }}>
        {/* Balance card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
            borderRadius: 16,
            padding: 24,
            color: '#fff',
            marginTop: -12,
            marginBottom: 20,
            boxShadow: '0 4px 12px rgba(15, 118, 110, 0.3)',
          }}
        >
          <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 4 }}>Outstanding Balance</div>
          <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>
            {totalOutstanding > 0 ? formatRM(totalOutstanding) : 'RM 0.00'}
          </div>
          <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 16 }}>
            Monthly rent: {formatRM(residentProfile.monthlyRent)}
          </div>
          <button
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 12,
              padding: '12px',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Pay Now
          </button>
        </div>

        {/* Payment history */}
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: '#1a1a1a' }}>
          Payment History
        </div>

        {payments.map((payment) => {
          const style = statusStyle[payment.status];
          return (
            <div
              key={payment.id}
              style={{
                background: '#ffffff',
                borderRadius: 14,
                padding: 16,
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                marginBottom: 10,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{formatRM(payment.amount)}</div>
                  <div style={{ fontSize: 12, color: '#888', textTransform: 'capitalize' }}>
                    {payment.type.replace('_', ' ')}
                  </div>
                </div>
                <span
                  style={{
                    padding: '3px 10px',
                    borderRadius: 10,
                    fontSize: 11,
                    fontWeight: 600,
                    background: style.bg,
                    color: style.color,
                  }}
                >
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#999' }}>
                <span>Due: {formatDate(payment.dueDate)}</span>
                {payment.paidDate && <span>Paid: {formatDate(payment.paidDate)}</span>}
              </div>
              {payment.reference && (
                <div style={{ fontSize: 11, color: '#bbb', marginTop: 4, fontFamily: 'monospace' }}>
                  Ref: {payment.reference}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <BottomTabBar />
    </div>
  );
}
