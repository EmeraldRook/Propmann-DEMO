import type { Resident } from '@/types';

export const residents: Resident[] = [
  // ── Sri Angkasa Residences ──
  { id: 'R001', propertyId: 'sri-angkasa', name: 'Ahmad Razali bin Mohd Yusof', email: 'ahmad.razali@email.com', phone: '+60123456789', unit: '12B', floor: 12, leaseStart: '2024-03-01', leaseEnd: '2026-02-28', monthlyRent: 1800, status: 'active' },
  { id: 'R002', propertyId: 'sri-angkasa', name: 'Siti Nurhaliza binti Abdullah', email: 'siti.nurhaliza@email.com', phone: '+60134567890', unit: '08A', floor: 8, leaseStart: '2024-06-01', leaseEnd: '2026-05-31', monthlyRent: 1650, status: 'active' },
  { id: 'R003', propertyId: 'sri-angkasa', name: 'Tan Wei Ming', email: 'weiming.tan@email.com', phone: '+60175551234', unit: '15C', floor: 15, leaseStart: '2024-01-15', leaseEnd: '2026-01-14', monthlyRent: 2000, status: 'active' },
  { id: 'R004', propertyId: 'sri-angkasa', name: 'Priya a/p Subramaniam', email: 'priya.subra@email.com', phone: '+60162223344', unit: '03D', floor: 3, leaseStart: '2024-09-01', leaseEnd: '2026-08-31', monthlyRent: 1500, status: 'active' },
  { id: 'R005', propertyId: 'sri-angkasa', name: 'Muhammad Faizal bin Hassan', email: 'faizal.hassan@email.com', phone: '+60198765432', unit: '10B', floor: 10, leaseStart: '2023-12-01', leaseEnd: '2025-11-30', monthlyRent: 1750, status: 'active' },
  { id: 'R006', propertyId: 'sri-angkasa', name: 'Lim Siew Ling', email: 'siewling.lim@email.com', phone: '+60143332211', unit: '06A', floor: 6, leaseStart: '2025-01-01', leaseEnd: '2026-12-31', monthlyRent: 1600, status: 'active' },
  { id: 'R007', propertyId: 'sri-angkasa', name: 'Rajesh a/l Krishnan', email: 'rajesh.k@email.com', phone: '+60111234567', unit: '11C', floor: 11, leaseStart: '2024-04-01', leaseEnd: '2026-03-31', monthlyRent: 1900, status: 'active' },
  { id: 'R008', propertyId: 'sri-angkasa', name: 'Nurul Izzah binti Omar', email: 'nurul.izzah@email.com', phone: '+60187776655', unit: '09D', floor: 9, leaseStart: '2024-07-01', leaseEnd: '2026-06-30', monthlyRent: 1700, status: 'active' },
  { id: 'R009', propertyId: 'sri-angkasa', name: 'Wong Kah Wai', email: 'kahwai.wong@email.com', phone: '+60167778899', unit: '14A', floor: 14, leaseStart: '2024-02-01', leaseEnd: '2026-01-31', monthlyRent: 2100, status: 'notice' },
  { id: 'R010', propertyId: 'sri-angkasa', name: 'Amirah binti Ismail', email: 'amirah.ismail@email.com', phone: '+60129998877', unit: '05B', floor: 5, leaseStart: '2024-11-01', leaseEnd: '2026-10-31', monthlyRent: 1550, status: 'active' },

  // ── The Verdana @ Mont Kiara ──
  { id: 'R101', propertyId: 'verdana-mk', name: 'Datuk Azman bin Mokhtar', email: 'azman.mokhtar@email.com', phone: '+60122334455', unit: '22A', floor: 22, leaseStart: '2024-01-01', leaseEnd: '2025-12-31', monthlyRent: 4500, status: 'active' },
  { id: 'R102', propertyId: 'verdana-mk', name: 'Jennifer Chua Mei Ling', email: 'jennifer.chua@email.com', phone: '+60178889900', unit: '18B', floor: 18, leaseStart: '2024-05-01', leaseEnd: '2026-04-30', monthlyRent: 3800, status: 'active' },
  { id: 'R103', propertyId: 'verdana-mk', name: 'Ganesh a/l Muthu', email: 'ganesh.muthu@email.com', phone: '+60196667788', unit: '15C', floor: 15, leaseStart: '2024-03-01', leaseEnd: '2026-02-28', monthlyRent: 3500, status: 'active' },
  { id: 'R104', propertyId: 'verdana-mk', name: 'Nurul Ain binti Kamaruddin', email: 'nurul.ain@email.com', phone: '+60133445566', unit: '20A', floor: 20, leaseStart: '2024-08-01', leaseEnd: '2026-07-31', monthlyRent: 4200, status: 'active' },
  { id: 'R105', propertyId: 'verdana-mk', name: 'Ong Jia Hao', email: 'jiahao.ong@email.com', phone: '+60145556677', unit: '12B', floor: 12, leaseStart: '2024-06-01', leaseEnd: '2026-05-31', monthlyRent: 3200, status: 'active' },
  { id: 'R106', propertyId: 'verdana-mk', name: 'Kavitha a/p Rajan', email: 'kavitha.rajan@email.com', phone: '+60112233445', unit: '25A', floor: 25, leaseStart: '2024-10-01', leaseEnd: '2026-09-30', monthlyRent: 5000, status: 'active' },
  { id: 'R107', propertyId: 'verdana-mk', name: 'Mohd Hafiz bin Zakaria', email: 'hafiz.zakaria@email.com', phone: '+60166778899', unit: '08C', floor: 8, leaseStart: '2024-02-01', leaseEnd: '2026-01-31', monthlyRent: 2800, status: 'active' },
  { id: 'R108', propertyId: 'verdana-mk', name: 'Lee Xin Yi', email: 'xinyi.lee@email.com', phone: '+60189900112', unit: '16B', floor: 16, leaseStart: '2024-07-01', leaseEnd: '2026-06-30', monthlyRent: 3600, status: 'notice' },
];

export function getResidentsByProperty(propertyId: string): Resident[] {
  return residents.filter((r) => r.propertyId === propertyId);
}

export function getResident(id: string): Resident | undefined {
  return residents.find((r) => r.id === id);
}
