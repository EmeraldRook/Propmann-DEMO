'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResidentHeader } from '@/components/resident/resident-header';
import { PayNowDialog } from '@/components/resident/pay-now-dialog';
import { residentProfile } from '@/data/profile';
import { getPaymentsByResident } from '@/data/financials';
import { formatRM, formatDate } from '@/lib/format';

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  paid: 'default',
  pending: 'secondary',
  overdue: 'destructive',
};

export default function ResidentPaymentsPage() {
  const payments = getPaymentsByResident(residentProfile.id);
  const pending = payments.filter((p) => p.status === 'pending');
  const totalDue = pending.reduce((s, p) => s + p.amount, 0);

  return (
    <>
      <ResidentHeader title="Payments" subtitle="Payment history" />

      <div className="px-4 pt-4 space-y-4 pb-4">
        {/* Balance card */}
        <Card className="bg-gradient-to-br from-teal-700 to-teal-500 text-white border-0 shadow-lg">
          <CardContent className="pt-5 pb-4 text-center">
            <p className="text-teal-100 text-xs font-medium">Outstanding Balance</p>
            <p className="text-3xl font-bold mt-1">{formatRM(totalDue)}</p>
            {totalDue > 0 && (
              <PayNowDialog amount={totalDue}>
                <Button size="sm" variant="secondary" className="mt-3 bg-white text-teal-700 hover:bg-teal-50 font-semibold">
                  Pay Now
                </Button>
              </PayNowDialog>
            )}
          </CardContent>
        </Card>

        {/* Payment history */}
        <h3 className="text-sm font-semibold">Payment History</h3>
        <div className="space-y-2">
          {payments.map((payment) => (
            <Card key={payment.id}>
              <CardContent className="pt-3 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium capitalize">{payment.type.replace('_', ' ')}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Due: {formatDate(payment.dueDate, 'D MMM YYYY')}
                      {payment.paidDate && ` · Paid: ${formatDate(payment.paidDate, 'D MMM YYYY')}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatRM(payment.amount)}</p>
                    <Badge variant={statusVariant[payment.status]} className="capitalize text-[11px] mt-0.5">
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
