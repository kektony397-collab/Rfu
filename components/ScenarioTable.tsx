
import React, { useMemo } from 'react';
import { formatCurrency } from '../utils/formatters';
import type { ScenarioTableProps } from '../types';

const MILEAGE_SCENARIOS = [45, 50, 55, 60, 65];
const DISTANCE_SCENARIOS = [80, 100, 120, 150, 200];

const ScenarioTable: React.FC<ScenarioTableProps> = ({ petrolPrice }) => {
  const data = useMemo(() => {
    return MILEAGE_SCENARIOS.map(mileage => {
      const rowData = DISTANCE_SCENARIOS.map(distance => {
        if (mileage > 0 && petrolPrice > 0) {
          const dailyCost = (petrolPrice / mileage) * distance;
          return formatCurrency(dailyCost);
        }
        return 'N/A';
      });
      return [ `${mileage} km/L`, ...rowData ];
    });
  }, [petrolPrice]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="p-3 text-sm font-medium text-on-surface-variant border-b border-outline/50">Mileage</th>
            {DISTANCE_SCENARIOS.map(distance => (
              <th key={distance} className="p-3 text-sm font-medium text-on-surface-variant text-right border-b border-outline/50">{distance} km</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={`p-3 text-sm border-b border-outline/20 ${cellIndex === 0 ? 'font-medium text-on-surface-variant' : 'text-right text-on-surface'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScenarioTable;
