import { Property, Unit } from '@/types';

export const properties: Property[] = [
  {
    id: 'prop-1',
    name: 'Sunset Residences',
    address: 'Jl. Sunset Boulevard 88, Jakarta Selatan',
    unitCount: 48,
    occupiedUnits: 44,
  },
  {
    id: 'prop-2',
    name: 'Green Towers',
    address: 'Jl. Kemang Raya 45, Jakarta Selatan',
    unitCount: 32,
    occupiedUnits: 28,
  },
];

export const units: Unit[] = [
  // Sunset Residences units
  { id: 'u-1', propertyId: 'prop-1', number: '1A', floor: 1, status: 'occupied', residentId: 'r-7', rentAmount: 2800 },
  { id: 'u-2', propertyId: 'prop-1', number: '3C', floor: 3, status: 'occupied', residentId: 'r-4', rentAmount: 2200 },
  { id: 'u-3', propertyId: 'prop-1', number: '5B', floor: 5, status: 'occupied', residentId: 'r-6', rentAmount: 2500 },
  { id: 'u-4', propertyId: 'prop-1', number: '7A', floor: 7, status: 'occupied', residentId: 'r-5', rentAmount: 2600 },
  { id: 'u-5', propertyId: 'prop-1', number: '8A', floor: 8, status: 'occupied', residentId: 'r-3', rentAmount: 3100 },
  { id: 'u-6', propertyId: 'prop-1', number: '12B', floor: 12, status: 'occupied', residentId: 'r-1', rentAmount: 2400 },
  { id: 'u-7', propertyId: 'prop-1', number: '15D', floor: 15, status: 'occupied', residentId: 'r-8', rentAmount: 2700 },
  { id: 'u-8', propertyId: 'prop-1', number: '18C', floor: 18, status: 'occupied', residentId: 'r-9', rentAmount: 3200 },
  { id: 'u-9', propertyId: 'prop-1', number: '22A', floor: 22, status: 'occupied', residentId: 'r-10', rentAmount: 3500 },
  { id: 'u-10', propertyId: 'prop-1', number: '9B', floor: 9, status: 'vacant', rentAmount: 2400 },
  { id: 'u-11', propertyId: 'prop-1', number: '14A', floor: 14, status: 'vacant', rentAmount: 2800 },
  { id: 'u-12', propertyId: 'prop-1', number: '20C', floor: 20, status: 'maintenance', rentAmount: 3000 },
  { id: 'u-13', propertyId: 'prop-1', number: '25B', floor: 25, status: 'vacant', rentAmount: 3400 },
  // Green Towers units
  { id: 'u-20', propertyId: 'prop-2', number: '1A', floor: 1, status: 'occupied', residentId: 'r-11', rentAmount: 2000 },
  { id: 'u-21', propertyId: 'prop-2', number: '6D', floor: 6, status: 'occupied', residentId: 'r-13', rentAmount: 2300 },
  { id: 'u-22', propertyId: 'prop-2', number: '10B', floor: 10, status: 'occupied', residentId: 'r-12', rentAmount: 2600 },
  { id: 'u-23', propertyId: 'prop-2', number: '4C', floor: 4, status: 'vacant', rentAmount: 2100 },
  { id: 'u-24', propertyId: 'prop-2', number: '8A', floor: 8, status: 'vacant', rentAmount: 2400 },
];
