
import React from 'react';
import Card from './Card';
import type { InputFieldProps } from '../types';

const InputField: React.FC<InputFieldProps> = ({ id, label, unit, value, onChange, min, max, step }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    } else if (e.target.value === '') {
        onChange(0);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };
  
  const progress = ((value - min) / (max - min)) * 100;

  return (
    <Card className="p-4 space-y-3">
      <div className="flex justify-between items-baseline">
        <label htmlFor={id} className="text-on-surface-variant text-sm font-medium">
          {label}
        </label>
        <div className="flex items-center bg-surface-container-highest dark:bg-surface-container-highest rounded-full px-3 py-1">
          <input
            type="number"
            id={id}
            value={value}
            onChange={handleInputChange}
            min={min}
            max={max}
            step={step}
            className="w-20 bg-transparent text-on-surface font-medium text-right outline-none appearance-none [-moz-appearance:textfield]"
          />
          <span className="text-on-surface-variant text-sm ml-1">{unit}</span>
        </div>
      </div>
      <div className="relative h-5 flex items-center">
        <input
          type="range"
          value={value}
          onChange={handleSliderChange}
          min={min}
          max={max}
          step={step}
          className="w-full h-1 bg-surface-variant rounded-full appearance-none cursor-pointer slider-thumb"
          style={{ 
              background: `linear-gradient(to right, #6750A4 ${progress}%, #CAC4D0 ${progress}%)`
          }}
        />
      </div>
    </Card>
  );
};

export default InputField;
