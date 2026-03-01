'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface PropertyContextValue {
  selectedProperty: string;
  setSelectedProperty: (id: string) => void;
}

const PropertyContext = createContext<PropertyContextValue | null>(null);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [selectedProperty, setSelectedProperty] = useState('prop-1');
  return (
    <PropertyContext.Provider value={{ selectedProperty, setSelectedProperty }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperty() {
  const ctx = useContext(PropertyContext);
  if (!ctx) throw new Error('useProperty must be used within PropertyProvider');
  return ctx;
}
