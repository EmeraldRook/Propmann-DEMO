import { Payment } from '@/types';

export const payments: Payment[] = [
  // March rent — mix of paid, pending, overdue
  { id: 'pay-1', residentId: 'r-1', residentName: 'Ahmad Rizki', unitNumber: '12B', propertyId: 'prop-1', amount: 2400, type: 'rent', status: 'pending', dueDate: '2026-03-01' },
  { id: 'pay-2', residentId: 'r-3', residentName: 'David Chen', unitNumber: '8A', propertyId: 'prop-1', amount: 3100, type: 'rent', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-27' },
  { id: 'pay-3', residentId: 'r-4', residentName: 'Maria Santos', unitNumber: '3C', propertyId: 'prop-1', amount: 2200, type: 'rent', status: 'pending', dueDate: '2026-03-01' },
  { id: 'pay-4', residentId: 'r-5', residentName: 'Budi Santoso', unitNumber: '7A', propertyId: 'prop-1', amount: 2600, type: 'rent', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-28' },
  { id: 'pay-5', residentId: 'r-6', residentName: 'Priya Sharma', unitNumber: '5B', propertyId: 'prop-1', amount: 2500, type: 'rent', status: 'pending', dueDate: '2026-03-01' },
  { id: 'pay-6', residentId: 'r-7', residentName: 'James Wilson', unitNumber: '1A', propertyId: 'prop-1', amount: 2800, type: 'rent', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-25' },
  { id: 'pay-7', residentId: 'r-8', residentName: 'Siti Nurhaliza', unitNumber: '15D', propertyId: 'prop-1', amount: 2700, type: 'rent', status: 'pending', dueDate: '2026-03-01' },
  { id: 'pay-8', residentId: 'r-9', residentName: 'Sarah Kim', unitNumber: '18C', propertyId: 'prop-1', amount: 3200, type: 'rent', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-26' },
  { id: 'pay-9', residentId: 'r-10', residentName: 'Robert Taylor', unitNumber: '22A', propertyId: 'prop-1', amount: 3500, type: 'rent', status: 'pending', dueDate: '2026-03-01' },
  { id: 'pay-10', residentId: 'r-11', residentName: 'Michael Brown', unitNumber: '1A', propertyId: 'prop-2', amount: 2000, type: 'rent', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-28' },
  { id: 'pay-11', residentId: 'r-12', residentName: 'Aisha Rahman', unitNumber: '10B', propertyId: 'prop-2', amount: 2600, type: 'rent', status: 'pending', dueDate: '2026-03-01' },
  { id: 'pay-12', residentId: 'r-13', residentName: 'Carlos Rodriguez', unitNumber: '6D', propertyId: 'prop-2', amount: 2300, type: 'rent', status: 'pending', dueDate: '2026-03-01' },

  // February rent (history) — all paid or overdue
  { id: 'pay-13', residentId: 'r-1', residentName: 'Ahmad Rizki', unitNumber: '12B', propertyId: 'prop-1', amount: 2400, type: 'rent', status: 'paid', dueDate: '2026-02-01', paidDate: '2026-01-30' },
  { id: 'pay-14', residentId: 'r-3', residentName: 'David Chen', unitNumber: '8A', propertyId: 'prop-1', amount: 3100, type: 'rent', status: 'paid', dueDate: '2026-02-01', paidDate: '2026-02-01' },
  { id: 'pay-15', residentId: 'r-2', residentName: 'Lisa Tanaka', unitNumber: '3C', propertyId: 'prop-1', amount: 2200, type: 'rent', status: 'overdue', dueDate: '2026-02-01' },

  // Fees
  { id: 'pay-16', residentId: 'r-1', residentName: 'Ahmad Rizki', unitNumber: '12B', propertyId: 'prop-1', amount: 50, type: 'fee', status: 'paid', dueDate: '2026-02-15', paidDate: '2026-02-15' },
  { id: 'pay-17', residentId: 'r-10', residentName: 'Robert Taylor', unitNumber: '22A', propertyId: 'prop-1', amount: 500, type: 'deposit', status: 'paid', dueDate: '2025-10-01', paidDate: '2025-10-01' },
];
