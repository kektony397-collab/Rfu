
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDebounce } from './hooks/useDebounce';
import { DEFAULT_VALUES } from './constants';
import { formatCurrency, formatNumber } from './utils/formatters';
import { exportToPDF } from './utils/pdfExporter';
import { themes, THEME_NAMES } from './themes';
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
  const [amount, setAmount] = useLocalStorage('amount', DEFAULT_VALUES.AMOUNT);
  const [theme, setTheme] = useLocalStorage('theme', 'default');

  const [snackbar, setSnackbar] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  const debouncedPrice = useDebounce(petrolPrice, 250);
  const debouncedMileage = useDebounce(mileage, 250);
  const debouncedDistance = useDebounce(distance, 250);
  const debouncedAmount = useDebounce(amount, 250);

  useEffect(() => {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = themes[theme === 'system' ? (isSystemDark ? 'dark' : 'default') : theme];

    if (currentTheme.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const existingScript = document.getElementById('theme-config-script');
    if (existingScript) existingScript.remove();
    
    const tailwindScript = document.createElement('script');
    tailwindScript.id = 'theme-config-script';
    tailwindScript.innerHTML = `
      tailwind.config.theme.extend.colors = ${JSON.stringify(currentTheme.colors)};
    `;
    document.head.appendChild(tailwindScript);

  }, [theme]);

  const toggleTheme = useCallback(() => {
    const currentIndex = THEME_NAMES.indexOf(theme);
    const nextTheme = THEME_NAMES[(currentIndex + 1) % THEME_NAMES.length];
    setTheme(nextTheme);
  }, [theme, setTheme]);

  const calculations = useMemo(() => {
    const price = Number(debouncedPrice) || 0;
    const mil = Number(debouncedMileage) || 1;
    const dist = Number(debouncedDistance) || 0;
    const amt = Number(debouncedAmount) || 0;
    const tankSize = DEFAULT_VALUES.TANK_SIZE;

    const costPerKm = price > 0 && mil > 0 ? price / mil : 0;
    const dailyCost = costPerKm * dist;
    const monthlyCost = dailyCost * 30;
    const tankRange = mil * tankSize;
    const tankCost = price * tankSize;
    const litresForAmount = price > 0 ? amt / price : 0;
    const rangeForAmount = litresForAmount * mil;

    return { costPerKm, dailyCost, monthlyCost, tankRange, tankCost, litresForAmount, rangeForAmount };
  }, [debouncedPrice, debouncedMileage, debouncedDistance, debouncedAmount]);

  const { costPerKm, dailyCost, monthlyCost, tankRange, tankCost, litresForAmount, rangeForAmount } = calculations;
  
  useEffect(() => {
    document.title = `${formatCurrency(dailyCost)}/day | Fuel Calc`;
  }, [dailyCost]);

  const handleReset = useCallback(() => {
    setPetrolPrice(DEFAULT_VALUES.PETROL_PRICE);
    setMileage(DEFAULT_VALUES.MILEAGE);
    setDistance(DEFAULT_VALUES.DISTANCE);
    setAmount(DEFAULT_VALUES.AMOUNT);
    showSnackbar('Inputs reset to default values.');
  }, [setPetrolPrice, setMileage, setDistance, setAmount]);
  
  const showSnackbar = (message: string) => {
    setSnackbar({ message, visible: true });
    setTimeout(() => setSnackbar({ message: '', visible: false }), 3000);
  };

  const handleShare = useCallback(async () => {
    const shareText = `📊 *Rapido Fuel Summary*
Petrol: ${formatCurrency(petrolPrice)}/L
Mileage: ${mileage} km/L
Daily Run: ${distance} km
--------------------
*Cost/km: ${formatCurrency(costPerKm)}*
*Daily Cost: ${formatCurrency(dailyCost)}*
--------------------
Full Tank (${DEFAULT_VALUES.TANK_SIZE}L) gives ~${formatNumber(tankRange, 0)} km range.
    `;
    
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
  }, [dailyCost, mileage, petrolPrice, costPerKm, tankRange, distance]);

  const handleExportPdf = () => {
    const data = {
        inputs: {
            petrolPrice,
            mileage,
            distance,
            amount
        },
        calculations
    };
    exportToPDF(data);
    showSnackbar('PDF report generated.');
  };

  return (
    <div className="min-h-screen bg-background text-on-background transition-colors duration-300 flex flex-col">
      <TopAppBar theme={theme} toggleTheme={toggleTheme} onExport={handleExportPdf} />
      <main className="p-4 pt-20 pb-28 max-w-6xl mx-auto w-full flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Column 1: Inputs & Scenarios */}
          <div className="flex flex-col gap-4">
            <Card>
              <h2 className="text-lg font-bold text-secondary flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined">input</span>Inputs
              </h2>
              <p className="text-sm text-on-surface-variant mb-4">
                अपने शहर का पेट्रोल रेट और बाइक की average डालें। सभी बदलाव तुरंत save और calculate होते हैं।
              </p>
              <div className="space-y-4">
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
            </Card>

            <Card>
              <h2 className="text-lg font-bold text-secondary flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined">rule</span>Scenarios
              </h2>
              <p className="text-sm text-on-surface-variant mb-4">
                अलग-अलग mileage पर தினசரி செலவுகளைப் பார்க்கவும்.
              </p>
              <ScenarioTable petrolPrice={debouncedPrice} />
            </Card>
          </div>

          {/* Column 2: Results */}
          <div className="flex flex-col gap-4">
             <Card>
                <h2 className="text-lg font-bold text-secondary flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined">monitoring</span>Results
                </h2>
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <StatCard label="Fuel Cost / day" value={formatCurrency(dailyCost)} />
                    <StatCard label="Fuel Cost / km" value={formatCurrency(costPerKm)} />
                    <StatCard label="Full Tank Range" value={`${formatNumber(tankRange, 0)} km`} />
                    <StatCard label="Full Tank Cost" value={formatCurrency(tankCost)} />
                </div>
                
                <p className="text-sm font-medium text-on-surface-variant mb-2">Quick Refill Check:</p>
                <InputField
                  id="amount"
                  label="Refill Amount"
                  unit="₹"
                  value={amount}
                  onChange={setAmount}
                  min={50}
                  max={1000}
                  step={10}
                />
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <StatCard label="₹ Amount → Litres" value={`${formatNumber(litresForAmount, 2)} L`} />
                    <StatCard label="₹ Amount → Range" value={`${formatNumber(rangeForAmount, 0)} km`} />
                </div>
                
                <div className="flex justify-start mt-6">
                    <button onClick={handleReset} className="px-6 py-2.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-full transition-colors">Reset to Defaults</button>
                </div>
             </Card>
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-sm text-on-surface-variant">
        Created By Yash K Pathak
      </footer>
      <FAB onClick={handleShare} />
      <Snackbar message={snackbar.message} isVisible={snackbar.visible} />
    </div>
  );
};

export default App;