import type { Amenity, AmenityBooking } from '@/types';

export const amenities: Amenity[] = [
  // ── Sri Angkasa Residences ──
  { id: 'AM001', propertyId: 'sri-angkasa', name: 'Swimming Pool', description: 'Olympic-length swimming pool with separate children\'s wading pool', operatingHours: '7:00 AM - 10:00 PM', status: 'available', bookingRequired: false, maxCapacity: 50, icon: '🏊' },
  { id: 'AM002', propertyId: 'sri-angkasa', name: 'Gymnasium', description: 'Fully equipped gym with cardio and weight training stations', operatingHours: '6:00 AM - 11:00 PM', status: 'available', bookingRequired: false, maxCapacity: 20, icon: '💪' },
  { id: 'AM003', propertyId: 'sri-angkasa', name: 'BBQ Area', description: 'Outdoor BBQ pits with dining tables and washing facilities', operatingHours: '10:00 AM - 10:00 PM', status: 'available', bookingRequired: true, maxCapacity: 30, icon: '🔥' },
  { id: 'AM004', propertyId: 'sri-angkasa', name: 'Function Hall', description: 'Air-conditioned function hall for events and gatherings', operatingHours: '9:00 AM - 10:00 PM', status: 'available', bookingRequired: true, maxCapacity: 80, icon: '🎉' },
  { id: 'AM005', propertyId: 'sri-angkasa', name: 'Playground', description: 'Children\'s playground with slides, swings and climbing frames', operatingHours: '7:00 AM - 8:00 PM', status: 'available', bookingRequired: false, icon: '🛝' },
  { id: 'AM006', propertyId: 'sri-angkasa', name: 'Surau', description: 'Prayer room for Muslim residents', operatingHours: '24 hours', status: 'available', bookingRequired: false, icon: '🕌' },

  // ── The Verdana @ Mont Kiara ──
  { id: 'AM101', propertyId: 'verdana-mk', name: 'Infinity Pool', description: 'Stunning rooftop infinity pool with city skyline view', operatingHours: '7:00 AM - 10:00 PM', status: 'maintenance', bookingRequired: false, maxCapacity: 30, icon: '🏊' },
  { id: 'AM102', propertyId: 'verdana-mk', name: 'Sky Gym', description: 'Premium gymnasium on Level 35 with panoramic views', operatingHours: '5:00 AM - 11:00 PM', status: 'available', bookingRequired: false, maxCapacity: 15, icon: '💪' },
  { id: 'AM103', propertyId: 'verdana-mk', name: 'Tennis Court', description: 'Professional-grade tennis court with floodlights', operatingHours: '7:00 AM - 10:00 PM', status: 'available', bookingRequired: true, maxCapacity: 4, icon: '🎾' },
  { id: 'AM104', propertyId: 'verdana-mk', name: 'Co-Working Space', description: 'Modern co-working area with high-speed WiFi and meeting pods', operatingHours: '7:00 AM - 10:00 PM', status: 'available', bookingRequired: true, maxCapacity: 20, icon: '💻' },
  { id: 'AM105', propertyId: 'verdana-mk', name: 'Sauna & Steam Room', description: 'Relaxation suite with dry sauna and wet steam room', operatingHours: '8:00 AM - 10:00 PM', status: 'available', bookingRequired: false, maxCapacity: 8, icon: '🧖' },
  { id: 'AM106', propertyId: 'verdana-mk', name: 'Rooftop Garden', description: 'Landscaped rooftop garden with seating and event space', operatingHours: '7:00 AM - 10:00 PM', status: 'available', bookingRequired: true, maxCapacity: 40, icon: '🌿' },
];

export const amenityBookings: AmenityBooking[] = [
  // Sri Angkasa
  { id: 'AB001', amenityId: 'AM003', amenityName: 'BBQ Area', propertyId: 'sri-angkasa', residentId: 'R001', residentName: 'Ahmad Razali bin Mohd Yusof', unit: '12B', date: '2026-03-08', startTime: '17:00', endTime: '21:00', status: 'confirmed' },
  { id: 'AB002', amenityId: 'AM004', amenityName: 'Function Hall', propertyId: 'sri-angkasa', residentId: 'R003', residentName: 'Tan Wei Ming', unit: '15C', date: '2026-03-15', startTime: '14:00', endTime: '18:00', status: 'confirmed' },
  { id: 'AB003', amenityId: 'AM003', amenityName: 'BBQ Area', propertyId: 'sri-angkasa', residentId: 'R006', residentName: 'Lim Siew Ling', unit: '06A', date: '2026-03-10', startTime: '18:00', endTime: '22:00', status: 'pending' },
  { id: 'AB004', amenityId: 'AM004', amenityName: 'Function Hall', propertyId: 'sri-angkasa', residentId: 'R008', residentName: 'Nurul Izzah binti Omar', unit: '09D', date: '2026-03-22', startTime: '10:00', endTime: '14:00', status: 'confirmed' },

  // Verdana
  { id: 'AB101', amenityId: 'AM103', amenityName: 'Tennis Court', propertyId: 'verdana-mk', residentId: 'R101', residentName: 'Datuk Azman bin Mokhtar', unit: '22A', date: '2026-03-05', startTime: '07:00', endTime: '09:00', status: 'confirmed' },
  { id: 'AB102', amenityId: 'AM104', amenityName: 'Co-Working Space', propertyId: 'verdana-mk', residentId: 'R102', residentName: 'Jennifer Chua Mei Ling', unit: '18B', date: '2026-03-03', startTime: '09:00', endTime: '13:00', status: 'confirmed' },
  { id: 'AB103', amenityId: 'AM106', amenityName: 'Rooftop Garden', propertyId: 'verdana-mk', residentId: 'R104', residentName: 'Nurul Ain binti Kamaruddin', unit: '20A', date: '2026-03-15', startTime: '19:00', endTime: '22:00', status: 'confirmed' },
  { id: 'AB104', amenityId: 'AM103', amenityName: 'Tennis Court', propertyId: 'verdana-mk', residentId: 'R105', residentName: 'Ong Jia Hao', unit: '12B', date: '2026-03-07', startTime: '17:00', endTime: '19:00', status: 'pending' },
];

export function getAmenitiesByProperty(propertyId: string): Amenity[] {
  return amenities.filter((a) => a.propertyId === propertyId);
}

export function getBookingsByProperty(propertyId: string): AmenityBooking[] {
  return amenityBookings.filter((b) => b.propertyId === propertyId);
}

export function getBookingsByResident(residentId: string): AmenityBooking[] {
  return amenityBookings.filter((b) => b.residentId === residentId);
}
