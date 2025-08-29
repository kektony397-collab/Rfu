
import React, { memo } from 'react';
import Card from './Card';
import type { StatCardProps } from '../types';

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <Card className="p-4 flex flex-col items-start justify-center">
      <p className="text-sm text-on-surface-variant">{label}</p>
      <p className="text-2xl font-medium text-primary mt-1">{value}</p>
    </Card>
  );
};

export default memo(StatCard);
