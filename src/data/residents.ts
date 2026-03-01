import { Resident } from '@/types';

export const residents: Resident[] = [
  { id: 'r-1', name: 'Ahmad Razali', email: 'ahmad.razali@email.com', phone: '+60 12-345 6789', propertyId: 'prop-1', unitId: 'u-6', unitNumber: '12B', leaseStart: '2025-06-01', leaseEnd: '2026-05-31', rentAmount: 2400 },
  { id: 'r-2', name: 'Tan Mei Ling', email: 'tan.meiling@email.com', phone: '+60 13-234 5678', propertyId: 'prop-1', unitId: 'u-2', unitNumber: '3C', leaseStart: '2025-09-01', leaseEnd: '2026-08-31', rentAmount: 2200 },
  { id: 'r-3', name: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', phone: '+60 11-987 6543', propertyId: 'prop-1', unitId: 'u-5', unitNumber: '8A', leaseStart: '2025-03-01', leaseEnd: '2026-02-28', rentAmount: 3100 },
  { id: 'r-4', name: 'Nurul Aisyah', email: 'nurul.aisyah@email.com', phone: '+60 12-111 2222', propertyId: 'prop-1', unitId: 'u-2', unitNumber: '3C', leaseStart: '2025-07-01', leaseEnd: '2026-06-30', rentAmount: 2200 },
  { id: 'r-5', name: 'Wong Kai Wen', email: 'wong.kaiwen@email.com', phone: '+60 16-555 6666', propertyId: 'prop-1', unitId: 'u-4', unitNumber: '7A', leaseStart: '2025-01-01', leaseEnd: '2025-12-31', rentAmount: 2600 },
  { id: 'r-6', name: 'Deepa Nair', email: 'deepa.nair@email.com', phone: '+60 17-777 8888', propertyId: 'prop-1', unitId: 'u-3', unitNumber: '5B', leaseStart: '2025-04-01', leaseEnd: '2026-03-31', rentAmount: 2500 },
  { id: 'r-7', name: 'Faizal Ibrahim', email: 'faizal.ibrahim@email.com', phone: '+60 18-333 4444', propertyId: 'prop-1', unitId: 'u-1', unitNumber: '1A', leaseStart: '2025-02-01', leaseEnd: '2026-01-31', rentAmount: 2800 },
  { id: 'r-8', name: 'Lim Siew Chin', email: 'lim.siewchin@email.com', phone: '+60 19-999 0000', propertyId: 'prop-1', unitId: 'u-7', unitNumber: '15D', leaseStart: '2025-05-01', leaseEnd: '2026-04-30', rentAmount: 2700 },
  { id: 'r-9', name: 'Siti Hajar', email: 'siti.hajar@email.com', phone: '+60 10-123 4567', propertyId: 'prop-1', unitId: 'u-8', unitNumber: '18C', leaseStart: '2025-08-01', leaseEnd: '2026-07-31', rentAmount: 3200 },
  { id: 'r-10', name: 'Lee Jun Kit', email: 'lee.junkit@email.com', phone: '+60 12-876 5432', propertyId: 'prop-1', unitId: 'u-9', unitNumber: '22A', leaseStart: '2025-10-01', leaseEnd: '2026-09-30', rentAmount: 3500 },
  { id: 'r-11', name: 'Hafiz Abdullah', email: 'hafiz.abdullah@email.com', phone: '+60 13-456 7890', propertyId: 'prop-2', unitId: 'u-20', unitNumber: '1A', leaseStart: '2025-03-01', leaseEnd: '2026-02-28', rentAmount: 2000 },
  { id: 'r-12', name: 'Chong Mei Yee', email: 'chong.meiyee@email.com', phone: '+60 11-234 5678', propertyId: 'prop-2', unitId: 'u-22', unitNumber: '10B', leaseStart: '2025-06-01', leaseEnd: '2026-05-31', rentAmount: 2600 },
  { id: 'r-13', name: 'Arjun Pillai', email: 'arjun.pillai@email.com', phone: '+60 12-345 7890', propertyId: 'prop-2', unitId: 'u-21', unitNumber: '6D', leaseStart: '2025-11-01', leaseEnd: '2026-10-31', rentAmount: 2300 },
  { id: 'r-14', name: 'Nor Azizah', email: 'nor.azizah@email.com', phone: '+60 14-678 9012', propertyId: 'prop-2', unitId: 'u-25', unitNumber: '3B', leaseStart: '2025-04-01', leaseEnd: '2026-03-31', rentAmount: 2100 },
  { id: 'r-15', name: 'Kavitha Rajan', email: 'kavitha.rajan@email.com', phone: '+60 15-789 0123', propertyId: 'prop-2', unitId: 'u-26', unitNumber: '5A', leaseStart: '2025-08-01', leaseEnd: '2026-07-31', rentAmount: 2200 },
  { id: 'r-16', name: 'Tan Wei Liang', email: 'tan.weiliang@email.com', phone: '+60 16-890 1234', propertyId: 'prop-2', unitId: 'u-27', unitNumber: '7C', leaseStart: '2025-05-01', leaseEnd: '2026-04-30', rentAmount: 2500 },
  { id: 'r-17', name: 'Zulkifli Hassan', email: 'zulkifli.hassan@email.com', phone: '+60 17-901 2345', propertyId: 'prop-2', unitId: 'u-28', unitNumber: '9A', leaseStart: '2025-07-01', leaseEnd: '2026-06-30', rentAmount: 2700 },
];

export const currentResident = residents[0]; // Ahmad Razali for resident portal
