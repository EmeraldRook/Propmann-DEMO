'use client';

import React from 'react';
import { useProperty } from '@/context/PropertyContext';
import { getMaintenanceByProperty } from '@/data/maintenance';
import PropertyCard from '@/components/manager/PropertyCard';

export default function PropertiesPage() {
  const { allProperties } = useProperty();

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {allProperties.map((property) => {
          const openTickets = getMaintenanceByProperty(property.id).filter(
            (m) => m.status === 'new' || m.status === 'in_progress'
          ).length;
          return (
            <PropertyCard key={property.id} property={property} openTickets={openTickets} />
          );
        })}
      </div>
    </div>
  );
}
