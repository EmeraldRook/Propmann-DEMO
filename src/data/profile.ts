import type { ResidentProfile } from '@/types';

export const residentProfile: ResidentProfile = {
  id: 'R001',
  propertyId: 'sri-angkasa',
  propertyName: 'Sri Angkasa Residences',
  name: 'Ahmad Razali bin Mohd Yusof',
  email: 'ahmad.razali@email.com',
  phone: '+60123456789',
  unit: '12B',
  floor: 12,
  leaseStart: '2024-03-01',
  leaseEnd: '2026-02-28',
  monthlyRent: 1800,
  outstandingBalance: 0,
  documents: [
    { name: 'Tenancy Agreement', type: 'pdf', url: '#' },
    { name: 'House Rules', type: 'pdf', url: '#' },
    { name: 'Move-in Checklist', type: 'pdf', url: '#' },
    { name: 'Insurance Certificate', type: 'pdf', url: '#' },
  ],
};
