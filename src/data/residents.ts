import { Resident } from '@/types';

export const residents: Resident[] = [
  { id: 'r-1', name: 'Ahmad Rizki', email: 'ahmad.rizki@email.com', phone: '+62 812-3456-7890', propertyId: 'prop-1', unitId: 'u-6', unitNumber: '12B', leaseStart: '2025-06-01', leaseEnd: '2026-05-31', rentAmount: 2400 },
  { id: 'r-2', name: 'Lisa Tanaka', email: 'lisa.tanaka@email.com', phone: '+62 813-2345-6789', propertyId: 'prop-1', unitId: 'u-2', unitNumber: '3C', leaseStart: '2025-09-01', leaseEnd: '2026-08-31', rentAmount: 2200 },
  { id: 'r-3', name: 'David Chen', email: 'david.chen@email.com', phone: '+62 821-9876-5432', propertyId: 'prop-1', unitId: 'u-5', unitNumber: '8A', leaseStart: '2025-03-01', leaseEnd: '2026-02-28', rentAmount: 3100 },
  { id: 'r-4', name: 'Maria Santos', email: 'maria.santos@email.com', phone: '+62 822-1111-2222', propertyId: 'prop-1', unitId: 'u-2', unitNumber: '3C', leaseStart: '2025-07-01', leaseEnd: '2026-06-30', rentAmount: 2200 },
  { id: 'r-5', name: 'Budi Santoso', email: 'budi.santoso@email.com', phone: '+62 815-5555-6666', propertyId: 'prop-1', unitId: 'u-4', unitNumber: '7A', leaseStart: '2025-01-01', leaseEnd: '2025-12-31', rentAmount: 2600 },
  { id: 'r-6', name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+62 816-7777-8888', propertyId: 'prop-1', unitId: 'u-3', unitNumber: '5B', leaseStart: '2025-04-01', leaseEnd: '2026-03-31', rentAmount: 2500 },
  { id: 'r-7', name: 'James Wilson', email: 'james.wilson@email.com', phone: '+62 817-3333-4444', propertyId: 'prop-1', unitId: 'u-1', unitNumber: '1A', leaseStart: '2025-02-01', leaseEnd: '2026-01-31', rentAmount: 2800 },
  { id: 'r-8', name: 'Siti Nurhaliza', email: 'siti.n@email.com', phone: '+62 818-9999-0000', propertyId: 'prop-1', unitId: 'u-7', unitNumber: '15D', leaseStart: '2025-05-01', leaseEnd: '2026-04-30', rentAmount: 2700 },
  { id: 'r-9', name: 'Sarah Kim', email: 'sarah.kim@email.com', phone: '+62 819-1234-5678', propertyId: 'prop-1', unitId: 'u-8', unitNumber: '18C', leaseStart: '2025-08-01', leaseEnd: '2026-07-31', rentAmount: 3200 },
  { id: 'r-10', name: 'Robert Taylor', email: 'robert.t@email.com', phone: '+62 812-8765-4321', propertyId: 'prop-1', unitId: 'u-9', unitNumber: '22A', leaseStart: '2025-10-01', leaseEnd: '2026-09-30', rentAmount: 3500 },
  { id: 'r-11', name: 'Michael Brown', email: 'michael.b@email.com', phone: '+62 813-4567-8901', propertyId: 'prop-2', unitId: 'u-20', unitNumber: '1A', leaseStart: '2025-03-01', leaseEnd: '2026-02-28', rentAmount: 2000 },
  { id: 'r-12', name: 'Aisha Rahman', email: 'aisha.r@email.com', phone: '+62 821-2345-6789', propertyId: 'prop-2', unitId: 'u-22', unitNumber: '10B', leaseStart: '2025-06-01', leaseEnd: '2026-05-31', rentAmount: 2600 },
  { id: 'r-13', name: 'Carlos Rodriguez', email: 'carlos.r@email.com', phone: '+62 822-3456-7890', propertyId: 'prop-2', unitId: 'u-21', unitNumber: '6D', leaseStart: '2025-11-01', leaseEnd: '2026-10-31', rentAmount: 2300 },
];

export const currentResident = residents[0]; // Ahmad Rizki for resident portal
