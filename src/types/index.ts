export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  totalUnits: number;
  occupiedUnits: number;
  maintenanceFee: number;
  image?: string;
  amenities: string[];
  description: string;
}

export interface Resident {
  id: string;
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  unit: string;
  floor: number;
  leaseStart: string;
  leaseEnd: string;
  monthlyRent: number;
  status: 'active' | 'notice' | 'vacated';
  avatar?: string;
}

export type MaintenanceStatus = 'new' | 'in_progress' | 'completed' | 'closed';
export type MaintenancePriority = 'low' | 'medium' | 'high' | 'urgent';
export type MaintenanceCategory =
  | 'plumbing'
  | 'electrical'
  | 'aircon'
  | 'pest_control'
  | 'appliance'
  | 'general'
  | 'structural'
  | 'other';

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  residentId: string;
  residentName: string;
  unit: string;
  category: MaintenanceCategory;
  title: string;
  description: string;
  status: MaintenanceStatus;
  priority: MaintenancePriority;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

export interface Payment {
  id: string;
  propertyId: string;
  residentId: string;
  residentName: string;
  unit: string;
  amount: number;
  type: 'maintenance_fee' | 'rental' | 'penalty' | 'deposit' | 'other';
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate?: string;
  method?: 'online_banking' | 'fpx' | 'cash' | 'cheque' | 'auto_debit';
  reference?: string;
}

export interface MonthlySummary {
  propertyId: string;
  month: string;
  income: number;
  expenses: number;
  collected: number;
  outstanding: number;
}

export interface Announcement {
  id: string;
  propertyId: string;
  title: string;
  content: string;
  category: 'general' | 'maintenance' | 'event' | 'emergency' | 'billing';
  createdAt: string;
  author: string;
  readCount: number;
  totalRecipients: number;
}

export interface Amenity {
  id: string;
  propertyId: string;
  name: string;
  description: string;
  operatingHours: string;
  status: 'available' | 'maintenance' | 'closed';
  bookingRequired: boolean;
  maxCapacity?: number;
  icon: string;
}

export interface AmenityBooking {
  id: string;
  amenityId: string;
  amenityName: string;
  propertyId: string;
  residentId: string;
  residentName: string;
  unit: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface ActivityItem {
  id: string;
  propertyId: string;
  type: 'payment' | 'maintenance' | 'move_in' | 'move_out' | 'announcement' | 'booking';
  title: string;
  description: string;
  timestamp: string;
  icon?: string;
}

export interface ResidentProfile {
  id: string;
  propertyId: string;
  propertyName: string;
  name: string;
  email: string;
  phone: string;
  unit: string;
  floor: number;
  leaseStart: string;
  leaseEnd: string;
  monthlyRent: number;
  outstandingBalance: number;
  documents: { name: string; type: string; url: string }[];
}

export interface UpcomingEvent {
  id: string;
  propertyId: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'maintenance' | 'event' | 'inspection';
}
