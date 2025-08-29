
import React, { useMemo } from 'react';
import { formatCurrency } from '../utils/formatters';
import type { ScenarioTableProps } from '../types';

const MILEAGE_SCENARIOS = [40, 50, 60, 70];
const DISTANCE_SCENARIOS = [50, 100, 150, 200];

const ScenarioTable: React.FC<ScenarioTableProps> = ({ petrolPrice }) => {
  const data = useMemo(() => {
    return DISTANCE_SCENARIOS.map(distance => {
      const row: (string | number)[] = [distance];
      MILEAGE_SCENARIOS.forEach(mileage => {
        if (mileage > 0) {
          const dailyCost = (petrolPrice / mileage) * distance;
          row.push(formatCurrency(dailyCost));
        } else {
          row.push('N/A');
        }
      });
      return row;
    });
  }, [petrolPrice]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="p-3 text-sm font-medium text-on-surface-variant border-b border-outline-variant">Dist. (km)</th>
            {MILEAGE_SCENARIOS.map(mileage => (
              <th key={mileage} className="p-3 text-sm font-medium text-on-surface-variant text-right border-b border-outline-variant">{mileage} km/L</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-on-surface/5">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={`p-3 text-sm ${cellIndex === 0 ? 'font-medium text-on-surface-variant' : 'text-right text-on-surface'}`}>
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
