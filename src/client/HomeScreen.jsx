import React from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { StatusBadge } from '../components/StatusBadge';
import { formatDate, formatTime, getRelativeDate, isWithin24Hours } from '../utils/dateHelpers';
import {
  Calendar,
  Clock,
  Leaf,
  ChevronRight,
  Bell,
  CheckCircle2,
  CalendarPlus,
} from 'lucide-react';
import { BookingForm } from './BookingForm';
import { useState } from 'react';

export function HomeScreen({ onNavigate }) {
  const { upcomingAppointments, confirmAttendance } = useAppointments();
  const [showBook, setShowBook] = useState(false);

  const next = upcomingAppointments[0] ?? null;
  const needsConfirm =
    next && !next.confirmed && isWithin24Hours(next.date, next.time);

  return (
    <div className="flex flex-col gap-6">
      {/* Hero greeting */}
      <div className="bg-gradient-to-br from-green-700 to-green-500 rounded-3xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-1 opacity-80">
          <Leaf size={16} />
          <span className="text-xs font-medium uppercase tracking-widest">NutriCare</span>
        </div>
        <h1 className="text-2xl font-bold leading-tight">
          Your wellness,<br />our priority 🌿
        </h1>
        <p className="text-sm mt-1 opacity-80">Book or manage your nutrition consultations</p>
      </div>

      {/* Next appointment */}
      {next ? (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 px-1">Next Appointment</p>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            {/* 24h reminder */}
            {needsConfirm && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-amber-700 text-xs font-medium">
                  <Bell size={14} />
                  {getRelativeDate(next.date)}'s visit — confirm your attendance!
                </div>
                <button
                  onClick={() => confirmAttendance(next.id)}
                  className="text-xs font-bold text-green-700 hover:underline shrink-0"
                >
                  I'll be there ✓
                </button>
              </div>
            )}
            {next.confirmed && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4 flex items-center gap-2 text-green-700 text-xs font-medium">
                <CheckCircle2 size={14} />
                You've confirmed this appointment
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-gray-900 text-lg">{next.clientName}</span>
              <StatusBadge status={next.status} />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Calendar size={16} className="text-green-600" />
                <span>{getRelativeDate(next.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Clock size={16} className="text-green-600" />
                <span>{formatTime(next.time)}</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('appointments')}
              className="mt-4 w-full flex items-center justify-between text-sm font-semibold text-green-700 hover:text-green-800 transition"
            >
              <span>View all appointments</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center gap-3 text-center">
          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
            <Calendar size={24} className="text-green-600" />
          </div>
          <p className="font-semibold text-gray-700">No upcoming appointments</p>
          <p className="text-sm text-gray-400">Book your first consultation below</p>
        </div>
      )}

      {/* Book CTA */}
      <Button size="lg" className="w-full" onClick={() => setShowBook(true)}>
        <CalendarPlus size={18} />
        Book a Consultation
      </Button>

      {/* Upcoming count teaser */}
      {upcomingAppointments.length > 1 && (
        <button
          onClick={() => onNavigate('appointments')}
          className="text-center text-sm text-gray-500 hover:text-green-700 transition"
        >
          +{upcomingAppointments.length - 1} more upcoming · View all
        </button>
      )}

      <Modal isOpen={showBook} onClose={() => setShowBook(false)} title="Book a Consultation">
        <BookingForm onSuccess={() => setShowBook(false)} />
      </Modal>
    </div>
  );
}
