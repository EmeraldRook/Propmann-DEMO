export interface Property {
  id: string;
  name: string;
  address: string;
  unitCount: number;
  occupiedUnits: number;
  image?: string;
}

export interface Unit {
  id: string;
  propertyId: string;
  number: string;
  floor: number;
  status: 'occupied' | 'vacant' | 'maintenance';
  residentId?: string;
  rentAmount: number;
}

export interface Resident {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  unitId: string;
  unitNumber: string;
  leaseStart: string;
  leaseEnd: string;
  rentAmount: number;
  avatar?: string;
}

export type MaintenanceCategory =
  | 'plumbing'
  | 'electrical'
  | 'hvac'
  | 'appliance'
  | 'general'
  | 'other';

export type MaintenanceStatus = 'new' | 'in_progress' | 'completed' | 'closed';
export type MaintenancePriority = 'urgent' | 'medium' | 'low';

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  unitId: string;
  unitNumber: string;
  residentId: string;
  residentName: string;
  category: MaintenanceCategory;
  title: string;
  description: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Announcement {
  id: string;
  propertyId: string | 'all';
  title: string;
  content: string;
  type: 'notice' | 'alert' | 'update';
  createdAt: string;
  readBy: string[];
}

export interface Amenity {
  id: string;
  propertyId: string;
  name: string;
  description: string;
  available: boolean;
}

export interface Booking {
  id: string;
  amenityId: string;
  amenityName: string;
  residentId: string;
  residentName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'cancelled';
}

export interface Payment {
  id: string;
  residentId: string;
  residentName: string;
  unitNumber: string;
  propertyId: string;
  amount: number;
  type: 'rent' | 'fee' | 'deposit';
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: 'manager' | 'resident';
  content: string;
  timestamp: string;
}
