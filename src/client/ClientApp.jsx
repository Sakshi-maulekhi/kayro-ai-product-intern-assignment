import React, { useState } from 'react';
import { HomeScreen } from './HomeScreen';
import { AppointmentsList } from './AppointmentsList';
import { BookingForm } from './BookingForm';
import { Modal } from '../components/Modal';
import { Home, Calendar, CalendarPlus, Leaf } from 'lucide-react';

const TABS = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'appointments', label: 'Appointments', Icon: Calendar },
  { id: 'book', label: 'Book', Icon: CalendarPlus },
];

export function ClientApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [showBook, setShowBook] = useState(false);

  function handleNavTab(id) {
    if (id === 'book') {
      setShowBook(true);
    } else {
      setActiveTab(id);
    }
  }

  function navigateTo(tabId) {
    setActiveTab(tabId);
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col max-w-md mx-auto relative">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-5 py-4 flex items-center gap-2 shadow-sm">
        <div className="w-7 h-7 rounded-full bg-green-700 flex items-center justify-center">
          <Leaf size={14} className="text-white" />
        </div>
        <span className="font-bold text-gray-900 tracking-tight">NutriCare</span>
        <span className="ml-auto text-xs text-gray-400 bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
          Client
        </span>
      </header>

      {/* Page content */}
      <main className="flex-1 overflow-y-auto px-4 py-5 pb-24">
        {activeTab === 'home' && <HomeScreen onNavigate={navigateTo} />}
        {activeTab === 'appointments' && <AppointmentsList />}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 shadow-lg z-30">
        <div className="flex">
          {TABS.map(({ id, label, Icon }) => {
            const active = id !== 'book' && activeTab === id;
            return (
              <button
                key={id}
                onClick={() => handleNavTab(id)}
                className={[
                  'flex-1 flex flex-col items-center py-3 gap-1 text-xs font-medium transition-colors',
                  id === 'book'
                    ? 'text-green-700'
                    : active
                    ? 'text-green-700'
                    : 'text-gray-400 hover:text-gray-600',
                ].join(' ')}
              >
                {id === 'book' ? (
                  <div className="w-10 h-10 -mt-5 rounded-full bg-green-700 flex items-center justify-center shadow-lg">
                    <Icon size={20} className="text-white" />
                  </div>
                ) : (
                  <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
                )}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Book modal (triggered from bottom nav "Book" button) */}
      <Modal isOpen={showBook} onClose={() => setShowBook(false)} title="Book a Consultation">
        <BookingForm onSuccess={() => setShowBook(false)} />
      </Modal>
    </div>
  );
}
