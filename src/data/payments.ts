import { Payment } from '@/types';

export const payments: Payment[] = [
  // March rent — mix of paid, pending, overdue
  { id: 'pay-1', residentId: 'r-1', residentName: 'Ahmad Razali', unitNumber: '12B', propertyId: 'prop-1', amount: 2400, type: 'rent', status: 'pending', dueDate: '2026-03-01' },
  { id: 'pay-2', residentId: 'r-3', residentName: 'Rajesh Kumar', unitNumber: '8A', propertyId: 'prop-1', amount: 3100, type: 'rent', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-27' },
  { id: 'pay-3', residentId: 'r-4', residentName: 'Nurul Aisyah', unitNumber: '3C', propertyId: 'prop-1', amount: 2200, type: 'rent', status: 'pending', dueDate: '2026-03-01' },
  { id: 'pay-4', residentId: 'r-5', residentName: 'Wong Kai Wen', unitNumber: '7A', propertyId: 'prop-1', amount: 2600, type: 'rent', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-28' },
  { id: 'pay-5', residentId: 'r-6', residentName: 'Deepa Nair', unitNumber: '5B', propertyId: 'prop-1', amount: 2500, type: 'rent', status: 'pending', dueDate: '2026-03-01' },
  { id: 'pay-6', residentId: 'r-7', residentName: 'Faizal Ibrahim', unitNumber: '1A', propertyId: 'prop-1', amount: 2800, type: 'rent', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-25' },
  { id: 'pay-7', residentId: 'r-8', residentName: 'Lim Siew Chin', unitNumber: '15D', propertyId: 'prop-1', amount: 2700, type: 'rent', status: 'pending', dueDate: '2026-03-01' },
  { id: 'pay-8', residentId: 'r-9', residentName: 'Siti Hajar', unitNumber: '18C', propertyId: 'prop-1', amount: 3200, type: 'rent', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-26' },
  { id: 'pay-9', residentId: 'r-10', residentName: 'Lee Jun Kit', unitNumber: '22A', propertyId: 'prop-1', amount: 3500, type: 'rent', status: 'pending', dueDate: '2026-03-01' },
  { id: 'pay-10', residentId: 'r-11', residentName: 'Hafiz Abdullah', unitNumber: '1A', propertyId: 'prop-2', amount: 2000, type: 'rent', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-28' },
  { id: 'pay-11', residentId: 'r-12', residentName: 'Chong Mei Yee', unitNumber: '10B', propertyId: 'prop-2', amount: 2600, type: 'rent', status: 'pending', dueDate: '2026-03-01' },
  { id: 'pay-12', residentId: 'r-13', residentName: 'Arjun Pillai', unitNumber: '6D', propertyId: 'prop-2', amount: 2300, type: 'rent', status: 'pending', dueDate: '2026-03-01' },
  { id: 'pay-18', residentId: 'r-14', residentName: 'Nor Azizah', unitNumber: '3B', propertyId: 'prop-2', amount: 2100, type: 'rent', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-27' },
  { id: 'pay-19', residentId: 'r-15', residentName: 'Kavitha Rajan', unitNumber: '5A', propertyId: 'prop-2', amount: 2200, type: 'rent', status: 'pending', dueDate: '2026-03-01' },
  { id: 'pay-20', residentId: 'r-16', residentName: 'Tan Wei Liang', unitNumber: '7C', propertyId: 'prop-2', amount: 2500, type: 'rent', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-26' },
  { id: 'pay-21', residentId: 'r-17', residentName: 'Zulkifli Hassan', unitNumber: '9A', propertyId: 'prop-2', amount: 2700, type: 'rent', status: 'pending', dueDate: '2026-03-01' },

  // February rent (history) — all paid or overdue
  { id: 'pay-13', residentId: 'r-1', residentName: 'Ahmad Razali', unitNumber: '12B', propertyId: 'prop-1', amount: 2400, type: 'rent', status: 'paid', dueDate: '2026-02-01', paidDate: '2026-01-30' },
  { id: 'pay-14', residentId: 'r-3', residentName: 'Rajesh Kumar', unitNumber: '8A', propertyId: 'prop-1', amount: 3100, type: 'rent', status: 'paid', dueDate: '2026-02-01', paidDate: '2026-02-01' },
  { id: 'pay-15', residentId: 'r-2', residentName: 'Tan Mei Ling', unitNumber: '3C', propertyId: 'prop-1', amount: 2200, type: 'rent', status: 'overdue', dueDate: '2026-02-01' },
  { id: 'pay-22', residentId: 'r-11', residentName: 'Hafiz Abdullah', unitNumber: '1A', propertyId: 'prop-2', amount: 2000, type: 'rent', status: 'paid', dueDate: '2026-02-01', paidDate: '2026-01-31' },
  { id: 'pay-23', residentId: 'r-14', residentName: 'Nor Azizah', unitNumber: '3B', propertyId: 'prop-2', amount: 2100, type: 'rent', status: 'overdue', dueDate: '2026-02-01' },

  // Fees
  { id: 'pay-16', residentId: 'r-1', residentName: 'Ahmad Razali', unitNumber: '12B', propertyId: 'prop-1', amount: 50, type: 'fee', status: 'paid', dueDate: '2026-02-15', paidDate: '2026-02-15' },
  { id: 'pay-17', residentId: 'r-10', residentName: 'Lee Jun Kit', unitNumber: '22A', propertyId: 'prop-1', amount: 500, type: 'deposit', status: 'paid', dueDate: '2025-10-01', paidDate: '2025-10-01' },
  { id: 'pay-24', residentId: 'r-16', residentName: 'Tan Wei Liang', unitNumber: '7C', propertyId: 'prop-2', amount: 75, type: 'fee', status: 'paid', dueDate: '2026-02-10', paidDate: '2026-02-10' },
];
