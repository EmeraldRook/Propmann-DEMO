'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Property } from '@/types';

interface PropertyContextValue {
  selectedProperty: Property | null;
  allProperties: Property[];
  switchProperty: (id: string) => void;
}

const PropertyContext = createContext<PropertyContextValue>({
  selectedProperty: null,
  allProperties: [],
  switchProperty: () => {},
});

export function PropertyProvider({
  children,
  properties,
}: {
  children: React.ReactNode;
  properties: Property[];
}) {
  const [selectedId, setSelectedId] = useState(properties[0]?.id ?? '');

  const switchProperty = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const selectedProperty = properties.find((p) => p.id === selectedId) ?? properties[0] ?? null;

  return (
    <PropertyContext.Provider value={{ selectedProperty, allProperties: properties, switchProperty }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperty() {
  const ctx = useContext(PropertyContext);
  if (!ctx.selectedProperty) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return ctx as PropertyContextValue & { selectedProperty: Property };
}
