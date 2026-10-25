import React from 'react';
import { AppointmentTable } from './AppointmentTable';
import { Leaf, BarChart2 } from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';

export function NutritionistApp() {
  const { today, appointments } = useAppointments();
  const todayCount = appointments.filter((a) => a.date === today).length;

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col max-w-2xl mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="px-5 py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-green-700 flex items-center justify-center">
            <Leaf size={16} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 leading-none">NutriCare</p>
            <p className="text-xs text-gray-400">Dashboard</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {todayCount > 0 && (
              <span className="text-xs font-semibold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full border border-amber-200">
                {todayCount} today
              </span>
            )}
            <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-semibold border border-green-200">
              Nutritionist
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 py-5 pb-10">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900">Appointments</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage and track all client visits</p>
        </div>
        <AppointmentTable />
      </main>
    </div>
  );
}
