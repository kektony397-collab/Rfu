
import React from 'react';
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
    <div className="space-y-2">
      <div className="relative">
        <input
          type="number"
          id={id}
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          placeholder=" " // Required for :placeholder-shown selector
          className="w-full bg-transparent text-on-surface font-medium border border-outline focus:border-primary focus:outline-none rounded-lg p-4 pt-6 appearance-none [-moz-appearance:textfield]"
        />
        <label 
          htmlFor={id} 
          className="absolute top-1 left-4 text-xs text-primary transition-all pointer-events-none"
        >
          {label} ({unit})
        </label>
      </div>
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
        aria-label={`${label} slider`}
      />
    </div>
  );
};

export default InputField;
