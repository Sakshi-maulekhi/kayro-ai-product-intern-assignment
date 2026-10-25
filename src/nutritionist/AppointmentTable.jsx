import React, { useState } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { StatusBadge } from '../components/StatusBadge';
import { AddAppointmentModal } from './AddAppointmentModal';
import { formatDate, formatTime, getRelativeDate } from '../utils/dateHelpers';
import {
  Calendar,
  Clock,
  Phone,
  User,
  CalendarPlus,
  Filter,
  ChevronDown,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from 'lucide-react';

const STATUSES = ['Booked', 'Done', 'No-show'];

function StatusDropdown({ currentStatus, onChange }) {
  const [open, setOpen] = useState(false);

  const colors = {
    Booked: 'text-blue-700',
    Done: 'text-green-700',
    'No-show': 'text-red-600',
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-800 transition px-2 py-1 rounded-lg hover:bg-gray-100"
      >
        <span>Change</span>
        <ChevronDown size={12} />
      </button>
      {open && (
        <div className="absolute right-0 top-7 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20 min-w-[110px]">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => { onChange(s); setOpen(false); }}
              className={`flex items-center w-full px-3 py-2 text-xs font-semibold hover:bg-gray-50 transition ${colors[s] ?? ''} ${s === currentStatus ? 'opacity-40 cursor-default' : ''}`}
              disabled={s === currentStatus}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AppointmentRow({ apt }) {
  const { setStatus } = useAppointments();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3 transition hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
              <User size={14} className="text-green-700" />
            </div>
            <span className="font-semibold text-gray-900">{apt.clientName}</span>
          </div>
          {apt.phone ? (
            <div className="flex items-center gap-1.5 text-xs text-gray-400 pl-9">
              <Phone size={11} />
              {apt.phone}
            </div>
          ) : (
            <div className="text-xs text-gray-300 pl-9">No phone on file</div>
          )}
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <StatusBadge status={apt.status} />
          <StatusDropdown currentStatus={apt.status} onChange={(s) => setStatus(apt.id, s)} />
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500 pl-1">
        <span className="flex items-center gap-1.5">
          <Calendar size={13} className="text-green-600" />
          {getRelativeDate(apt.date)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={13} className="text-green-600" />
          {formatTime(apt.time)}
        </span>
      </div>

      {/* No-show prevention: confirmed flag visible to nutritionist */}
      {apt.status === 'Booked' && (
        <div className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg w-fit ${
          apt.confirmed
            ? 'bg-green-50 text-green-700'
            : 'bg-amber-50 text-amber-600'
        }`}>
          {apt.confirmed
            ? <><CheckCircle2 size={12} /> Client confirmed attendance</>
            : <><XCircle size={12} /> Attendance not confirmed</>}
        </div>
      )}
    </div>
  );
}

export function AppointmentTable() {
  const { appointments, todayAppointments, today } = useAppointments();
  const [filterToday, setFilterToday] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const list = filterToday ? todayAppointments : appointments;

  const counts = {
    total: appointments.length,
    today: todayAppointments.length,
    booked: appointments.filter((a) => a.status === 'Booked').length,
    done: appointments.filter((a) => a.status === 'Done').length,
    noshow: appointments.filter((a) => a.status === 'No-show').length,
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-blue-50 rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold text-blue-700">{counts.booked}</p>
          <p className="text-xs text-blue-500 font-medium">Booked</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold text-green-700">{counts.done}</p>
          <p className="text-xs text-green-500 font-medium">Done</p>
        </div>
        <div className="bg-red-50 rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold text-red-600">{counts.noshow}</p>
          <p className="text-xs text-red-400 font-medium">No-show</p>
        </div>
      </div>

      {/* Filter + Add row */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setFilterToday((v) => !v)}
          className={[
            'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border transition-all',
            filterToday
              ? 'bg-green-700 text-white border-green-700 shadow-sm'
              : 'bg-white text-gray-600 border-gray-200 hover:border-green-400',
          ].join(' ')}
        >
          <Filter size={14} />
          {filterToday ? `Today (${counts.today})` : 'Filter: Today'}
        </button>

        <Button size="sm" className="ml-auto" onClick={() => setShowAdd(true)}>
          <CalendarPlus size={15} />
          Add
        </Button>
      </div>

      {/* List */}
      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
            <Calendar size={22} className="text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm">
            {filterToday ? 'No appointments today' : 'No appointments yet'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {list.map((apt) => (
            <AppointmentRow key={apt.id} apt={apt} />
          ))}
        </div>
      )}

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add Appointment">
        <AddAppointmentModal onClose={() => setShowAdd(false)} />
      </Modal>
    </div>
  );
}
