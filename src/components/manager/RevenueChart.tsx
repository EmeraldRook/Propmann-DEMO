'use client';

import React from 'react';
import { Card } from 'antd';
import type { MonthlySummary } from '@/types';
import { formatRM } from '@/lib/format';

interface RevenueChartProps {
  data: MonthlySummary[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  if (data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => Math.max(d.income, d.expenses)));
  const chartHeight = 200;
  const chartWidth = 500;
  const padding = { top: 20, right: 20, bottom: 40, left: 20 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const xStep = innerWidth / (data.length - 1 || 1);
  const yScale = (val: number) => innerHeight - (val / maxValue) * innerHeight;

  const incomePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${padding.left + i * xStep} ${padding.top + yScale(d.income)}`)
    .join(' ');

  const expensePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${padding.left + i * xStep} ${padding.top + yScale(d.expenses)}`)
    .join(' ');

  const months = data.map((d) => {
    const [, m] = d.month.split('-');
    const names = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return names[parseInt(m)];
  });

  const latestIncome = data[data.length - 1].income;
  const latestExpenses = data[data.length - 1].expenses;

  return (
    <Card
      title="Revenue Trend"
      style={{ borderRadius: 16, border: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
      extra={
        <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
          <span><span style={{ color: '#0f766e', fontWeight: 700 }}>●</span> Income ({formatRM(latestIncome)})</span>
          <span><span style={{ color: '#dc2626', fontWeight: 700 }}>●</span> Expenses ({formatRM(latestExpenses)})</span>
        </div>
      }
    >
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', height: 'auto' }}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((frac) => (
          <line
            key={frac}
            x1={padding.left}
            y1={padding.top + innerHeight * (1 - frac)}
            x2={chartWidth - padding.right}
            y2={padding.top + innerHeight * (1 - frac)}
            stroke="#f0f0f0"
            strokeWidth={1}
          />
        ))}

        {/* Income line */}
        <path d={incomePath} fill="none" stroke="#0f766e" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

        {/* Expense line (dashed) */}
        <path d={expensePath} fill="none" stroke="#dc2626" strokeWidth={2} strokeDasharray="6 4" strokeLinecap="round" strokeLinejoin="round" />

        {/* Data points - income */}
        {data.map((d, i) => (
          <circle key={`inc-${i}`} cx={padding.left + i * xStep} cy={padding.top + yScale(d.income)} r={4} fill="#0f766e" />
        ))}

        {/* Data points - expenses */}
        {data.map((d, i) => (
          <circle key={`exp-${i}`} cx={padding.left + i * xStep} cy={padding.top + yScale(d.expenses)} r={3.5} fill="#dc2626" />
        ))}

        {/* Month labels */}
        {months.map((label, i) => (
          <text
            key={i}
            x={padding.left + i * xStep}
            y={chartHeight - 8}
            textAnchor="middle"
            fontSize={11}
            fill="#999"
          >
            {label}
          </text>
        ))}
      </svg>
    </Card>
  );
}
