import { Amenity, Booking } from '@/types';

export const amenities: Amenity[] = [
  { id: 'am-1', propertyId: 'prop-1', name: 'Rooftop BBQ Area', description: 'Open-air BBQ station with seating for 20. Includes grills, prep tables, and lighting.', available: true },
  { id: 'am-2', propertyId: 'prop-1', name: 'Swimming Pool', description: '25m lap pool with children\'s wading area. Open 6AM-9PM daily.', available: true },
  { id: 'am-3', propertyId: 'prop-1', name: 'Fitness Center', description: 'Fully equipped gym with cardio machines, free weights, and yoga area.', available: true },
  { id: 'am-4', propertyId: 'prop-1', name: 'Meeting Room', description: 'Air-conditioned meeting room for 12 people with projector and whiteboard.', available: true },
  { id: 'am-5', propertyId: 'prop-1', name: 'Children\'s Playground', description: 'Outdoor playground with slides, swings, and soft-fall surfacing.', available: false },
  { id: 'am-6', propertyId: 'prop-2', name: 'Rooftop Lounge', description: 'Lounge area with city views, comfortable seating, and ambient lighting.', available: true },
  { id: 'am-7', propertyId: 'prop-2', name: 'Co-Working Space', description: 'Shared workspace with high-speed WiFi, desks, and printing.', available: true },
  { id: 'am-8', propertyId: 'prop-2', name: 'Yoga Studio', description: 'Dedicated yoga and meditation room with mats and mirrors.', available: true },
  { id: 'am-9', propertyId: 'prop-2', name: 'Mini Theater', description: 'Private screening room with surround sound, seats 15. Booking required.', available: false },
];

export const bookings: Booking[] = [
  { id: 'bk-1', amenityId: 'am-1', amenityName: 'Rooftop BBQ Area', residentId: 'r-1', residentName: 'Ahmad Rizki', date: '2026-03-02', startTime: '16:00', endTime: '18:00', status: 'confirmed' },
  { id: 'bk-2', amenityId: 'am-2', amenityName: 'Swimming Pool', residentId: 'r-6', residentName: 'Priya Sharma', date: '2026-03-01', startTime: '07:00', endTime: '08:00', status: 'confirmed' },
  { id: 'bk-3', amenityId: 'am-4', amenityName: 'Meeting Room', residentId: 'r-9', residentName: 'Sarah Kim', date: '2026-03-03', startTime: '14:00', endTime: '16:00', status: 'confirmed' },
  { id: 'bk-4', amenityId: 'am-3', amenityName: 'Fitness Center', residentId: 'r-3', residentName: 'David Chen', date: '2026-03-01', startTime: '06:00', endTime: '07:30', status: 'confirmed' },
  { id: 'bk-5', amenityId: 'am-1', amenityName: 'Rooftop BBQ Area', residentId: 'r-10', residentName: 'Robert Taylor', date: '2026-03-08', startTime: '17:00', endTime: '20:00', status: 'confirmed' },
  { id: 'bk-6', amenityId: 'am-6', amenityName: 'Rooftop Lounge', residentId: 'r-12', residentName: 'Aisha Rahman', date: '2026-03-05', startTime: '19:00', endTime: '21:00', status: 'confirmed' },
  { id: 'bk-7', amenityId: 'am-2', amenityName: 'Swimming Pool', residentId: 'r-1', residentName: 'Ahmad Rizki', date: '2026-02-26', startTime: '06:00', endTime: '07:00', status: 'confirmed' },
  { id: 'bk-8', amenityId: 'am-4', amenityName: 'Meeting Room', residentId: 'r-5', residentName: 'Budi Santoso', date: '2026-02-24', startTime: '10:00', endTime: '12:00', status: 'cancelled' },
  { id: 'bk-9', amenityId: 'am-7', amenityName: 'Co-Working Space', residentId: 'r-16', residentName: 'Daniel Park', date: '2026-03-03', startTime: '09:00', endTime: '17:00', status: 'confirmed' },
  { id: 'bk-10', amenityId: 'am-8', amenityName: 'Yoga Studio', residentId: 'r-15', residentName: 'Fatima Hassan', date: '2026-03-04', startTime: '07:00', endTime: '08:00', status: 'confirmed' },
  { id: 'bk-11', amenityId: 'am-6', amenityName: 'Rooftop Lounge', residentId: 'r-17', residentName: 'Nina Petrova', date: '2026-03-07', startTime: '18:00', endTime: '20:00', status: 'confirmed' },
];
