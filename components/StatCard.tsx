
import React, { memo } from 'react';
import type { StatCardProps } from '../types';

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="bg-surface-variant/50 dark:bg-surface-variant/50 p-4 rounded-2xl">
      <p className="text-sm text-on-surface-variant mb-1">{label}</p>
      <p className="text-xl font-bold text-on-surface">{value}</p>
    </div>
  );
};

export default memo(StatCard);
