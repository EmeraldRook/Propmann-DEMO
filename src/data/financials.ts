import type { Payment, MonthlySummary } from '@/types';

export const payments: Payment[] = [
  // ── Sri Angkasa Residences ──
  { id: 'P001', propertyId: 'sri-angkasa', residentId: 'R001', residentName: 'Ahmad Razali bin Mohd Yusof', unit: '12B', amount: 2150, type: 'maintenance_fee', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-27', method: 'online_banking', reference: 'FPX-20260227-001' },
  { id: 'P002', propertyId: 'sri-angkasa', residentId: 'R002', residentName: 'Siti Nurhaliza binti Abdullah', unit: '08A', amount: 2000, type: 'maintenance_fee', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-25', method: 'fpx', reference: 'FPX-20260225-042' },
  { id: 'P003', propertyId: 'sri-angkasa', residentId: 'R003', residentName: 'Tan Wei Ming', unit: '15C', amount: 2350, type: 'maintenance_fee', status: 'pending', dueDate: '2026-03-01' },
  { id: 'P004', propertyId: 'sri-angkasa', residentId: 'R004', residentName: 'Priya a/p Subramaniam', unit: '03D', amount: 1850, type: 'maintenance_fee', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-28', method: 'auto_debit', reference: 'AD-20260228-004' },
  { id: 'P005', propertyId: 'sri-angkasa', residentId: 'R005', residentName: 'Muhammad Faizal bin Hassan', unit: '10B', amount: 2100, type: 'maintenance_fee', status: 'overdue', dueDate: '2026-02-01' },
  { id: 'P006', propertyId: 'sri-angkasa', residentId: 'R006', residentName: 'Lim Siew Ling', unit: '06A', amount: 1950, type: 'maintenance_fee', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-26', method: 'online_banking', reference: 'FPX-20260226-018' },
  { id: 'P007', propertyId: 'sri-angkasa', residentId: 'R007', residentName: 'Rajesh a/l Krishnan', unit: '11C', amount: 2250, type: 'maintenance_fee', status: 'pending', dueDate: '2026-03-01' },
  { id: 'P008', propertyId: 'sri-angkasa', residentId: 'R008', residentName: 'Nurul Izzah binti Omar', unit: '09D', amount: 2050, type: 'maintenance_fee', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-24', method: 'fpx', reference: 'FPX-20260224-033' },
  { id: 'P009', propertyId: 'sri-angkasa', residentId: 'R009', residentName: 'Wong Kah Wai', unit: '14A', amount: 2450, type: 'maintenance_fee', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-23', method: 'online_banking', reference: 'FPX-20260223-007' },
  { id: 'P010', propertyId: 'sri-angkasa', residentId: 'R010', residentName: 'Amirah binti Ismail', unit: '05B', amount: 1900, type: 'maintenance_fee', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-28', method: 'auto_debit', reference: 'AD-20260228-010' },
  { id: 'P011', propertyId: 'sri-angkasa', residentId: 'R005', residentName: 'Muhammad Faizal bin Hassan', unit: '10B', amount: 50, type: 'penalty', status: 'overdue', dueDate: '2026-02-15' },
  { id: 'P012', propertyId: 'sri-angkasa', residentId: 'R001', residentName: 'Ahmad Razali bin Mohd Yusof', unit: '12B', amount: 2150, type: 'maintenance_fee', status: 'paid', dueDate: '2026-02-01', paidDate: '2026-01-29', method: 'fpx', reference: 'FPX-20260129-019' },

  // ── The Verdana @ Mont Kiara ──
  { id: 'P101', propertyId: 'verdana-mk', residentId: 'R101', residentName: 'Datuk Azman bin Mokhtar', unit: '22A', amount: 5050, type: 'maintenance_fee', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-20', method: 'auto_debit', reference: 'AD-20260220-101' },
  { id: 'P102', propertyId: 'verdana-mk', residentId: 'R102', residentName: 'Jennifer Chua Mei Ling', unit: '18B', amount: 4350, type: 'maintenance_fee', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-26', method: 'online_banking', reference: 'FPX-20260226-102' },
  { id: 'P103', propertyId: 'verdana-mk', residentId: 'R103', residentName: 'Ganesh a/l Muthu', unit: '15C', amount: 4050, type: 'maintenance_fee', status: 'pending', dueDate: '2026-03-01' },
  { id: 'P104', propertyId: 'verdana-mk', residentId: 'R104', residentName: 'Nurul Ain binti Kamaruddin', unit: '20A', amount: 4750, type: 'maintenance_fee', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-27', method: 'fpx', reference: 'FPX-20260227-104' },
  { id: 'P105', propertyId: 'verdana-mk', residentId: 'R105', residentName: 'Ong Jia Hao', unit: '12B', amount: 3750, type: 'maintenance_fee', status: 'overdue', dueDate: '2026-02-01' },
  { id: 'P106', propertyId: 'verdana-mk', residentId: 'R106', residentName: 'Kavitha a/p Rajan', unit: '25A', amount: 5550, type: 'maintenance_fee', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-25', method: 'auto_debit', reference: 'AD-20260225-106' },
  { id: 'P107', propertyId: 'verdana-mk', residentId: 'R107', residentName: 'Mohd Hafiz bin Zakaria', unit: '08C', amount: 3350, type: 'maintenance_fee', status: 'paid', dueDate: '2026-03-01', paidDate: '2026-02-28', method: 'online_banking', reference: 'FPX-20260228-107' },
  { id: 'P108', propertyId: 'verdana-mk', residentId: 'R108', residentName: 'Lee Xin Yi', unit: '16B', amount: 4150, type: 'maintenance_fee', status: 'pending', dueDate: '2026-03-01' },
  { id: 'P109', propertyId: 'verdana-mk', residentId: 'R105', residentName: 'Ong Jia Hao', unit: '12B', amount: 100, type: 'penalty', status: 'overdue', dueDate: '2026-02-15' },
];

export const monthlySummaries: MonthlySummary[] = [
  // Sri Angkasa
  { propertyId: 'sri-angkasa', month: '2025-09', income: 38500, expenses: 22000, collected: 36200, outstanding: 2300 },
  { propertyId: 'sri-angkasa', month: '2025-10', income: 38500, expenses: 24500, collected: 37100, outstanding: 1400 },
  { propertyId: 'sri-angkasa', month: '2025-11', income: 38500, expenses: 21000, collected: 35800, outstanding: 2700 },
  { propertyId: 'sri-angkasa', month: '2025-12', income: 38500, expenses: 28000, collected: 38000, outstanding: 500 },
  { propertyId: 'sri-angkasa', month: '2026-01', income: 38500, expenses: 23000, collected: 37500, outstanding: 1000 },
  { propertyId: 'sri-angkasa', month: '2026-02', income: 38500, expenses: 25000, collected: 34300, outstanding: 4200 },

  // Verdana
  { propertyId: 'verdana-mk', month: '2025-09', income: 44000, expenses: 28000, collected: 42500, outstanding: 1500 },
  { propertyId: 'verdana-mk', month: '2025-10', income: 44000, expenses: 26000, collected: 43200, outstanding: 800 },
  { propertyId: 'verdana-mk', month: '2025-11', income: 44000, expenses: 30000, collected: 41800, outstanding: 2200 },
  { propertyId: 'verdana-mk', month: '2025-12', income: 44000, expenses: 35000, collected: 43500, outstanding: 500 },
  { propertyId: 'verdana-mk', month: '2026-01', income: 44000, expenses: 27000, collected: 42800, outstanding: 1200 },
  { propertyId: 'verdana-mk', month: '2026-02', income: 44000, expenses: 29000, collected: 40100, outstanding: 3900 },
];

export function getPaymentsByProperty(propertyId: string): Payment[] {
  return payments.filter((p) => p.propertyId === propertyId);
}

export function getPaymentsByResident(residentId: string): Payment[] {
  return payments.filter((p) => p.residentId === residentId);
}

export function getMonthlySummariesByProperty(propertyId: string): MonthlySummary[] {
  return monthlySummaries.filter((s) => s.propertyId === propertyId);
}
