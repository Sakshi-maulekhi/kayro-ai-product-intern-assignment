import React, { useState } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { getTodayStr, formatTime } from '../utils/dateHelpers';
import { AlertCircle, CheckCircle2, CalendarPlus } from 'lucide-react';

const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '14:00', '14:30', '15:00',
  '15:30', '16:00', '16:30', '17:00',
];

export function AddAppointmentModal({ onClose }) {
  const { addAppointment, isSlotTaken } = useAppointments();
  const today = getTodayStr();

  const [form, setForm] = useState({ clientName: '', phone: '', date: '', time: '' });
  const [errors, setErrors] = useState({});
  const [slotError, setSlotError] = useState(false);
  const [done, setDone] = useState(false);

  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: '' }));
    if (key === 'date' || key === 'time') setSlotError(false);
  }

  function validate() {
    const errs = {};
    if (!form.clientName.trim()) errs.clientName = 'Name is required';
    if (!form.date) errs.date = 'Date is required';
    if (!form.time) errs.time = 'Time slot is required';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    if (isSlotTaken(form.date, form.time)) {
      setSlotError(true);
      return;
    }

    const ok = addAppointment(form);
    if (ok) {
      setDone(true);
      setTimeout(() => { onClose(); }, 1500);
    }
  }

  const takenSlots = TIME_SLOTS.filter((t) => form.date && isSlotTaken(form.date, t));

  if (done) {
    return (
      <div className="flex flex-col items-center py-8 gap-3 text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 size={30} className="text-green-600" />
        </div>
        <p className="font-bold text-gray-900">Appointment added!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input
        label="Client Name"
        id="add-clientName"
        placeholder="e.g. Riya Shah"
        value={form.clientName}
        onChange={(e) => set('clientName', e.target.value)}
        error={errors.clientName}
      />
      <Input
        label="Phone (optional)"
        id="add-phone"
        type="tel"
        placeholder="98200 11111"
        value={form.phone}
        onChange={(e) => set('phone', e.target.value)}
      />
      <div className="flex flex-col gap-1">
        <label htmlFor="add-date" className="text-sm font-medium text-gray-700">Date</label>
        <input
          id="add-date"
          type="date"
          value={form.date}
          onChange={(e) => set('date', e.target.value)}
          className={[
            'w-full px-4 py-2.5 rounded-xl border bg-white text-gray-900',
            'focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition',
            errors.date ? 'border-red-400' : 'border-gray-200',
          ].join(' ')}
        />
        {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-700">Time Slot</p>
        <div className="grid grid-cols-4 gap-2">
          {TIME_SLOTS.map((slot) => {
            const taken = takenSlots.includes(slot);
            const selected = form.time === slot;
            return (
              <button
                key={slot}
                type="button"
                disabled={taken}
                onClick={() => set('time', slot)}
                className={[
                  'py-2 rounded-xl text-xs font-semibold border transition-all',
                  taken
                    ? 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed line-through'
                    : selected
                    ? 'bg-green-700 text-white border-green-700'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-green-400 hover:bg-green-50',
                ].join(' ')}
              >
                {formatTime(slot)}
              </button>
            );
          })}
        </div>
        {errors.time && <p className="text-xs text-red-500">{errors.time}</p>}
        {slotError && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-xl p-3">
            <AlertCircle size={15} />
            Slot already booked. Pick another.
          </div>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full">
        <CalendarPlus size={16} />
        Add Appointment
      </Button>
    </form>
  );
}
