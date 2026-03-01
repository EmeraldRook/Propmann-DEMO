import type { ActivityItem, UpcomingEvent } from '@/types';

export const activityItems: ActivityItem[] = [
  // ── Sri Angkasa Residences ──
  { id: 'ACT001', propertyId: 'sri-angkasa', type: 'payment', title: 'Payment Received', description: 'Ahmad Razali bin Mohd Yusof (12B) paid RM 2,150.00', timestamp: '2026-02-28T09:15:00' },
  { id: 'ACT002', propertyId: 'sri-angkasa', type: 'maintenance', title: 'New Maintenance Request', description: 'Muhammad Faizal (10B) — Front door lock jamming', timestamp: '2026-02-28T07:45:00' },
  { id: 'ACT003', propertyId: 'sri-angkasa', type: 'payment', title: 'Payment Received', description: 'Amirah binti Ismail (05B) paid RM 1,900.00', timestamp: '2026-02-28T06:30:00' },
  { id: 'ACT004', propertyId: 'sri-angkasa', type: 'maintenance', title: 'Request Assigned', description: 'Aircon repair (12B) assigned to CoolTech Aircon Services', timestamp: '2026-02-26T14:00:00' },
  { id: 'ACT005', propertyId: 'sri-angkasa', type: 'announcement', title: 'Announcement Posted', description: 'Water Tank Cleaning — 8 March 2026', timestamp: '2026-02-28T10:00:00' },
  { id: 'ACT006', propertyId: 'sri-angkasa', type: 'booking', title: 'Amenity Booking', description: 'Ahmad Razali (12B) booked BBQ Area for 8 March', timestamp: '2026-02-27T16:00:00' },
  { id: 'ACT007', propertyId: 'sri-angkasa', type: 'payment', title: 'Payment Received', description: 'Priya a/p Subramaniam (03D) paid RM 1,850.00', timestamp: '2026-02-28T14:20:00' },
  { id: 'ACT008', propertyId: 'sri-angkasa', type: 'maintenance', title: 'Request Completed', description: 'Faulty power socket (15C) — resolved by Syarikat Elektrik Jaya', timestamp: '2026-02-23T16:30:00' },

  // ── The Verdana @ Mont Kiara ──
  { id: 'ACT101', propertyId: 'verdana-mk', type: 'maintenance', title: 'Urgent Request', description: 'Kavitha a/p Rajan (25A) — Balcony glass panel crack', timestamp: '2026-02-25T15:00:00' },
  { id: 'ACT102', propertyId: 'verdana-mk', type: 'payment', title: 'Payment Received', description: 'Mohd Hafiz bin Zakaria (08C) paid RM 3,350.00', timestamp: '2026-02-28T11:00:00' },
  { id: 'ACT103', propertyId: 'verdana-mk', type: 'announcement', title: 'Announcement Posted', description: 'Infinity Pool Retiling — 10-14 March', timestamp: '2026-02-27T09:00:00' },
  { id: 'ACT104', propertyId: 'verdana-mk', type: 'booking', title: 'Amenity Booking', description: 'Jennifer Chua (18B) booked Co-Working Space for 3 March', timestamp: '2026-02-27T14:00:00' },
  { id: 'ACT105', propertyId: 'verdana-mk', type: 'payment', title: 'Payment Received', description: 'Nurul Ain binti Kamaruddin (20A) paid RM 4,750.00', timestamp: '2026-02-27T10:30:00' },
  { id: 'ACT106', propertyId: 'verdana-mk', type: 'maintenance', title: 'New Maintenance Request', description: 'Jennifer Chua (18B) — Ceiling water stain expanding', timestamp: '2026-02-28T06:30:00' },
  { id: 'ACT107', propertyId: 'verdana-mk', type: 'move_in', title: 'New Resident', description: 'Mohd Hafiz bin Zakaria moved into unit 08C', timestamp: '2026-02-01T10:00:00' },
];

export const upcomingEvents: UpcomingEvent[] = [
  // Sri Angkasa
  { id: 'EV001', propertyId: 'sri-angkasa', title: 'Lift Maintenance — Tower A', date: '2026-03-03', time: '10:00 AM', type: 'maintenance' },
  { id: 'EV002', propertyId: 'sri-angkasa', title: 'Water Tank Cleaning', date: '2026-03-08', time: '9:00 AM', type: 'maintenance' },
  { id: 'EV003', propertyId: 'sri-angkasa', title: 'JMB Committee Meeting', date: '2026-03-12', time: '8:00 PM', type: 'meeting' },
  { id: 'EV004', propertyId: 'sri-angkasa', title: 'Hari Raya Open House', date: '2026-04-05', time: '11:00 AM', type: 'event' },

  // Verdana
  { id: 'EV101', propertyId: 'verdana-mk', title: 'Pool Retiling Begins', date: '2026-03-10', time: '8:00 AM', type: 'maintenance' },
  { id: 'EV102', propertyId: 'verdana-mk', title: 'Wine & Cheese Night', date: '2026-03-15', time: '7:00 PM', type: 'event' },
  { id: 'EV103', propertyId: 'verdana-mk', title: 'Fire Drill Exercise', date: '2026-03-20', time: '10:00 AM', type: 'event' },
  { id: 'EV104', propertyId: 'verdana-mk', title: 'Annual General Meeting', date: '2026-03-28', time: '8:00 PM', type: 'meeting' },
];

export function getActivityByProperty(propertyId: string): ActivityItem[] {
  return activityItems
    .filter((a) => a.propertyId === propertyId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function getEventsByProperty(propertyId: string): UpcomingEvent[] {
  return upcomingEvents
    .filter((e) => e.propertyId === propertyId)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
