'use client';

import { useProperty } from '@/context/PropertyContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function PropertySelector() {
  const { selectedProperty, allProperties, switchProperty } = useProperty();

  if (allProperties.length <= 1) return null;

  return (
    <Select value={selectedProperty.id} onValueChange={switchProperty}>
      <SelectTrigger className="w-[220px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {allProperties.map((p) => (
          <SelectItem key={p.id} value={p.id}>
            {p.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
