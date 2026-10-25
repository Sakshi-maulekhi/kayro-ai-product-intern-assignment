import React, { useState } from 'react';
import { AppointmentProvider } from './context/AppointmentContext';
import { ClientApp } from './client/ClientApp';
import { NutritionistApp } from './nutritionist/NutritionistApp';
import { Smartphone, LayoutDashboard } from 'lucide-react';

const MODES = [
  { id: 'client', label: 'Client App', Icon: Smartphone },
  { id: 'nutritionist', label: 'Nutritionist', Icon: LayoutDashboard },
];

function ModeSwitcher({ mode, onChange }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto mt-2 bg-white border border-gray-200 shadow-lg rounded-2xl p-1 flex gap-1">
        {MODES.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={[
              'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all',
              mode === id
                ? 'bg-green-700 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50',
            ].join(' ')}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState('client');

  return (
    <AppointmentProvider>
      <ModeSwitcher mode={mode} onChange={setMode} />

      {/* Offset for the switcher bar */}
      <div className="pt-12">
        {mode === 'client' ? <ClientApp /> : <NutritionistApp />}
      </div>
    </AppointmentProvider>
  );
}
