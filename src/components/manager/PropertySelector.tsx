'use client';

import React from 'react';
import { Select } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useProperty } from '@/context/PropertyContext';

export default function PropertySelector() {
  const { selectedProperty, allProperties, switchProperty } = useProperty();

  return (
    <Select
      value={selectedProperty.id}
      onChange={switchProperty}
      style={{ width: 320 }}
      suffixIcon={<HomeOutlined />}
      options={allProperties.map((p) => ({
        value: p.id,
        label: (
          <div style={{ display: 'flex', flexDirection: 'column', padding: '2px 0' }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</span>
            <span style={{ fontSize: 11, color: '#888' }}>
              {p.address.split(',')[0]} &middot; {p.totalUnits} units
            </span>
          </div>
        ),
      }))}
      optionLabelProp="label"
    />
  );
}
