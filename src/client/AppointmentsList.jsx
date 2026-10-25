import React, { useState } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { StatusBadge } from '../components/StatusBadge';
import { RescheduleModal } from './RescheduleModal';
import { formatDate, formatTime, getRelativeDate, isWithin24Hours } from '../utils/dateHelpers';
import { Calendar, Clock, ChevronRight, Bell, CheckCircle2, History } from 'lucide-react';

function AppointmentCard({ apt, isPast }) {
  const { cancelAppointment, confirmAttendance } = useAppointments();
  const [showReschedule, setShowReschedule] = useState(false);
  const [showCancel, setShowCancel] = useState(false);

  const needsConfirm =
    !isPast && apt.status === 'Booked' && !apt.confirmed && isWithin24Hours(apt.date, apt.time);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Confirmation reminder strip */}
        {needsConfirm && (
          <div className="bg-amber-50 border-b border-amber-100 px-4 py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-amber-700 text-xs font-medium">
  <Bell size={13} />
  {getRelativeDate(apt.date) === 'Today'
    ? "Today's appointment — please confirm!"
    : getRelativeDate(apt.date) === 'Tomorrow'
      ? "Tomorrow's appointment — please confirm!"
      : `Appointment on ${getRelativeDate(apt.date)} — please confirm!`}
</div>
            <button
              onClick={() => confirmAttendance(apt.id)}
              className="text-xs font-semibold text-green-700 hover:underline shrink-0"
            >
              Confirm ✓
            </button>
          </div>
        )}

        {/* Confirmed strip */}
        {!isPast && apt.confirmed && (
          <div className="bg-green-50 border-b border-green-100 px-4 py-2 flex items-center gap-2 text-green-700 text-xs font-medium">
            <CheckCircle2 size={13} />
            Attendance confirmed
          </div>
        )}

        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-gray-900">{apt.clientName}</p>
              <p className="text-xs text-gray-400 mt-0.5">{apt.phone || 'No phone'}</p>
            </div>
            <StatusBadge status={apt.status} />
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-green-600" />
              {getRelativeDate(apt.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-green-600" />
              {formatTime(apt.time)}
            </span>
          </div>

          {!isPast && apt.status === 'Booked' && (
            <div className="flex gap-2 pt-1">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => setShowReschedule(true)}
              >
                Reschedule
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="flex-1"
                onClick={() => setShowCancel(true)}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Reschedule modal */}
      <Modal isOpen={showReschedule} onClose={() => setShowReschedule(false)} title="Reschedule Appointment">
        <RescheduleModal appointment={apt} onClose={() => setShowReschedule(false)} />
      </Modal>

      {/* Cancel confirm modal */}
      <Modal isOpen={showCancel} onClose={() => setShowCancel(false)} title="Cancel Appointment?">
        <div className="flex flex-col gap-4">
          <p className="text-gray-600 text-sm">
            Are you sure you want to cancel your appointment on{' '}
            <strong>{formatDate(apt.date)}</strong> at <strong>{formatTime(apt.time)}</strong>?
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setShowCancel(false)}>
              Keep it
            </Button>
            <Button
              variant="danger"
              className="flex-1"
              onClick={() => { cancelAppointment(apt.id); setShowCancel(false); }}
            >
              Yes, cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export function AppointmentsList() {
  const { upcomingAppointments, pastAppointments } = useAppointments();
  const [tab, setTab] = useState('upcoming');

  const list = tab === 'upcoming' ? upcomingAppointments : pastAppointments;

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-xl p-1">
        {['upcoming', 'past'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={[
              'flex-1 py-2 text-sm font-semibold rounded-lg capitalize transition-all',
              tab === t ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700',
            ].join(' ')}
          >
            {t === 'upcoming' ? `Upcoming (${upcomingAppointments.length})` : `Past (${pastAppointments.length})`}
          </button>
        ))}
      </div>

      {/* List */}
      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
            {tab === 'upcoming'
              ? <Calendar size={24} className="text-gray-400" />
              : <History size={24} className="text-gray-400" />}
          </div>
          <p className="text-gray-500 text-sm">
            {tab === 'upcoming' ? 'No upcoming appointments' : 'No past appointments yet'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {list.map((apt) => (
            <AppointmentCard key={apt.id} apt={apt} isPast={tab === 'past'} />
          ))}
        </div>
      )}
    </div>
  );
}
