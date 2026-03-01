'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { MonthlySummary } from '@/types';
import { formatRM } from '@/lib/format';

interface RevenueChartProps {
  data: MonthlySummary[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  if (data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => Math.max(d.income, d.collected)));
  const chartHeight = 200;
  const chartWidth = 500;
  const padding = { top: 10, right: 10, bottom: 30, left: 10 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const xStep = innerWidth / (data.length - 1 || 1);

  const getY = (val: number) =>
    padding.top + innerHeight - (val / maxValue) * innerHeight;

  const incomePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${padding.left + i * xStep} ${getY(d.income)}`)
    .join(' ');

  const collectedPath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${padding.left + i * xStep} ${getY(d.collected)}`)
    .join(' ');

  const areaPath = `${collectedPath} L ${padding.left + (data.length - 1) * xStep} ${chartHeight - padding.bottom} L ${padding.left} ${chartHeight - padding.bottom} Z`;

  const lastIncome = data[data.length - 1];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Revenue Overview</CardTitle>
        <p className="text-sm text-muted-foreground">
          Last {data.length} months &middot; Latest: {formatRM(lastIncome.collected)} collected
        </p>
      </CardHeader>
      <CardContent>
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
          {/* Area fill */}
          <path d={areaPath} fill="oklch(0.484 0.095 175.8 / 0.1)" />

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
            <line
              key={ratio}
              x1={padding.left}
              x2={chartWidth - padding.right}
              y1={padding.top + innerHeight * (1 - ratio)}
              y2={padding.top + innerHeight * (1 - ratio)}
              stroke="currentColor"
              strokeOpacity={0.06}
            />
          ))}

          {/* Income line */}
          <path d={incomePath} fill="none" stroke="oklch(0.556 0.01 247)" strokeWidth={2} strokeDasharray="6 4" />

          {/* Collected line */}
          <path d={collectedPath} fill="none" stroke="oklch(0.484 0.095 175.8)" strokeWidth={2.5} strokeLinecap="round" />

          {/* Data points */}
          {data.map((d, i) => (
            <circle
              key={d.month}
              cx={padding.left + i * xStep}
              cy={getY(d.collected)}
              r={3.5}
              fill="oklch(0.484 0.095 175.8)"
              stroke="white"
              strokeWidth={2}
            />
          ))}

          {/* Month labels */}
          {data.map((d, i) => (
            <text
              key={d.month}
              x={padding.left + i * xStep}
              y={chartHeight - 8}
              textAnchor="middle"
              className="text-[10px] fill-muted-foreground"
            >
              {d.month.split('-')[1]}
            </text>
          ))}
        </svg>

        <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded bg-primary" />
            Collected
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded border border-muted-foreground border-dashed" />
            Target
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
