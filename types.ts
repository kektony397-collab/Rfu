
export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface InputFieldProps {
  id: string;
  label: string;
  unit: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

export interface StatCardProps {
    label: string;
    value: string;
}

export interface ScenarioTableProps {
    petrolPrice: number;
}

export interface TopAppBarProps {
    theme: string;
    toggleTheme: () => void;
    onExport: () => void;
}
