'use client';

import { Header } from '@/components/manager/header';
import { PropertyCard } from '@/components/manager/property-card';
import { useProperty } from '@/context/PropertyContext';

export default function PropertiesPage() {
  const { allProperties } = useProperty();

  return (
    <>
      <Header title="Properties" />
      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allProperties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </>
  );
}
