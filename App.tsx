
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDebounce } from './hooks/useDebounce';
import { DEFAULT_VALUES } from './constants';
import { formatCurrency } from './utils/formatters';
import TopAppBar from './components/TopAppBar';
import InputField from './components/InputField';
import Card from './components/Card';
import StatCard from './components/StatCard';
import ScenarioTable from './components/ScenarioTable';
import FAB from './components/FAB';
import Snackbar from './components/Snackbar';

const App: React.FC = () => {
  const [petrolPrice, setPetrolPrice] = useLocalStorage('petrolPrice', DEFAULT_VALUES.PETROL_PRICE);
  const [mileage, setMileage] = useLocalStorage('mileage', DEFAULT_VALUES.MILEAGE);
  const [distance, setDistance] = useLocalStorage('distance', DEFAULT_VALUES.DISTANCE);
  const [theme, setTheme] = useLocalStorage('theme', 'system');

  const [snackbar, setSnackbar] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  const debouncedPrice = useDebounce(petrolPrice, 250);
  const debouncedMileage = useDebounce(mileage, 250);
  const debouncedDistance = useDebounce(distance, 250);

  useEffect(() => {
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      // Update Tailwind config for dark mode colors
      const tailwindScript = document.createElement('script');
      tailwindScript.id = 'dark-theme-config';
      tailwindScript.innerHTML = `
        tailwind.config.theme.extend.colors = {
          ...tailwind.config.theme.extend.colors,
          'background': '#141218',
          'on-background': '#E6E1E5',
          'surface': '#141218',
          'on-surface': '#E6E1E5',
          'surface-variant': '#49454F',
          'on-surface-variant': '#CAC4D0',
          'surface-container-lowest': '#0F0D13',
          'surface-container-low': '#1C1B1F',
          'surface-container': '#201F23',
          'surface-container-high': '#2B292D',
          'surface-container-highest': '#363438',
        }
      `;
      document.head.appendChild(tailwindScript);
    } else {
      document.documentElement.classList.remove('dark');
      document.getElementById('dark-theme-config')?.remove();
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const themes = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  }, [theme, setTheme]);

  const calculations = useMemo(() => {
    const price = Number(debouncedPrice) || 0;
    const mil = Number(debouncedMileage) || 1;
    const dist = Number(debouncedDistance) || 0;

    const costPerKm = price / mil;
    const dailyCost = costPerKm * dist;
    const monthlyCost = dailyCost * 30;

    return { costPerKm, dailyCost, monthlyCost };
  }, [debouncedPrice, debouncedMileage, debouncedDistance]);

  const { costPerKm, dailyCost, monthlyCost } = calculations;
  
  useEffect(() => {
    document.title = `₹${dailyCost.toFixed(2)}/day | Fuel Calc`;
  }, [dailyCost]);

  const handleReset = useCallback(() => {
    setPetrolPrice(DEFAULT_VALUES.PETROL_PRICE);
    setMileage(DEFAULT_VALUES.MILEAGE);
    setDistance(DEFAULT_VALUES.DISTANCE);
    showSnackbar('Inputs reset to default values.');
  }, [setPetrolPrice, setMileage, setDistance]);
  
  const showSnackbar = (message: string) => {
    setSnackbar({ message, visible: true });
    setTimeout(() => setSnackbar({ message: '', visible: false }), 3000);
  };

  const handleShare = useCallback(async () => {
    const shareText = `My daily fuel cost is ${formatCurrency(dailyCost)}, with my bike's mileage of ${mileage} km/l at a petrol price of ${formatCurrency(petrolPrice)}/litre. Calculated with Rapido Fuel Calculator.`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Fuel Cost Calculation',
          text: shareText,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        showSnackbar('Results copied to clipboard!');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        showSnackbar('Failed to copy results.');
      }
    }
  }, [dailyCost, mileage, petrolPrice]);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <TopAppBar theme={theme} toggleTheme={toggleTheme} />
      <main className="p-4 pt-20 pb-24 max-w-4xl mx-auto space-y-6">
        <section id="inputs">
          <h2 className="text-xl font-medium text-on-surface-variant mb-4">Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              id="petrol-price"
              label="Petrol Price"
              unit="₹/L"
              value={petrolPrice}
              onChange={setPetrolPrice}
              min={80}
              max={130}
              step={0.01}
            />
            <InputField
              id="mileage"
              label="Bike Mileage"
              unit="km/L"
              value={mileage}
              onChange={setMileage}
              min={30}
              max={80}
              step={1}
            />
            <InputField
              id="distance"
              label="Daily Distance"
              unit="km"
              value={distance}
              onChange={setDistance}
              min={10}
              max={300}
              step={1}
            />
          </div>
           <div className="flex justify-end mt-4">
              <button onClick={handleReset} className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-full transition-colors">Reset to Defaults</button>
           </div>
        </section>

        <section id="results">
          <h2 className="text-xl font-medium text-on-surface-variant mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard label="Daily Cost" value={formatCurrency(dailyCost)} />
            <StatCard label="Monthly Cost" value={formatCurrency(monthlyCost)} />
            <StatCard label="Cost per KM" value={formatCurrency(costPerKm)} />
          </div>
        </section>

        <section id="scenarios">
          <h2 className="text-xl font-medium text-on-surface-variant mb-4">Scenarios</h2>
          <Card>
            <ScenarioTable petrolPrice={debouncedPrice} />
          </Card>
        </section>
      </main>
      <FAB onClick={handleShare} />
      <Snackbar message={snackbar.message} isVisible={snackbar.visible} />
    </div>
  );
};

export default App;
