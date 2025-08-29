
const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatCurrency = (value: number): string => {
  if (!isFinite(value)) return currencyFormatter.format(0);
  return currencyFormatter.format(value);
};

export const formatNumber = (value: number, digits = 1): string => {
    if (!isFinite(value)) return '—';
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: digits,
    }).format(value);
};
