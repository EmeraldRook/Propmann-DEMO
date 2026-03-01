import type { Property } from '@/types';

export const properties: Property[] = [
  {
    id: 'sri-angkasa',
    name: 'Sri Angkasa Residences',
    address: 'No. 15, Jalan SS 15/4A, 47500 Subang Jaya, Selangor',
    city: 'Subang Jaya',
    state: 'Selangor',
    totalUnits: 120,
    occupiedUnits: 110,
    maintenanceFee: 350,
    amenities: ['Swimming Pool', 'Gym', 'BBQ Area', 'Function Hall', 'Playground', 'Surau'],
    description: 'Mid-range family condominium in the heart of Subang Jaya with excellent connectivity to LRT and major highways.',
  },
  {
    id: 'verdana-mk',
    name: 'The Verdana @ Mont Kiara',
    address: 'No. 8, Jalan Kiara 3, Mont Kiara, 50480 Kuala Lumpur',
    city: 'Mont Kiara',
    state: 'Kuala Lumpur',
    totalUnits: 80,
    occupiedUnits: 70,
    maintenanceFee: 550,
    amenities: ['Infinity Pool', 'Sky Gym', 'Tennis Court', 'Co-Working Space', 'Sauna', 'Rooftop Garden'],
    description: 'Upscale condominium in Mont Kiara catering to professionals and expatriate families with premium facilities.',
  },
];

export function getProperty(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}
