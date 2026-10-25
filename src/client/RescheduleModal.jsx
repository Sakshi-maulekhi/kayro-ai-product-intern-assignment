import React, { useState } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { getTodayStr, formatDate, formatTime } from '../utils/dateHelpers';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '14:00', '14:30', '15:00',
  '15:30', '16:00', '16:30', '17:00',
];

export function RescheduleModal({ appointment, onClose }) {
  const { rescheduleAppointment, isSlotTaken } = useAppointments();
  const today = getTodayStr();

  const [date, setDate] = useState(appointment.date);
  const [time, setTime] = useState(appointment.time);
  const [slotError, setSlotError] = useState(false);
  const [dateErr, setDateErr] = useState('');

  const takenSlots = TIME_SLOTS.filter(
    (t) => date && isSlotTaken(date, t, appointment.id)
  );

  function handleSave() {
    if (!date) { setDateErr('Please choose a date'); return; }
    if (!time) return;
    if (isSlotTaken(date, time, appointment.id)) {
      setSlotError(true);
      return;
    }
    rescheduleAppointment(appointment.id, date, time);
    onClose();
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Date */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
          <Calendar size={14} /> New Date
        </label>
        <input
          type="date"
          min={today}
          value={date}
          onChange={(e) => { setDate(e.target.value); setDateErr(''); setSlotError(false); }}
          className={[
            'w-full px-4 py-2.5 rounded-xl border bg-white text-gray-900',
            'focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition',
            dateErr ? 'border-red-400' : 'border-gray-200',
          ].join(' ')}
        />
        {dateErr && <p className="text-xs text-red-500">{dateErr}</p>}
      </div>

      {/* Time slots */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
          <Clock size={14} /> New Time Slot
        </p>
        <div className="grid grid-cols-4 gap-2">
          {TIME_SLOTS.map((slot) => {
            const taken = takenSlots.includes(slot);
            const selected = time === slot;
            return (
              <button
                key={slot}
                type="button"
                disabled={taken}
                onClick={() => { setTime(slot); setSlotError(false); }}
                className={[
                  'py-2 rounded-xl text-xs font-semibold border transition-all duration-150',
                  taken
                    ? 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed line-through'
                    : selected
                    ? 'bg-green-700 text-white border-green-700 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-green-400 hover:bg-green-50',
                ].join(' ')}
              >
                {formatTime(slot)}
              </button>
            );
          })}
        </div>
        {slotError && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-xl p-3">
            <AlertCircle size={16} />
            This slot is already booked. Pick another time.
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-1">
        <Button variant="secondary" className="flex-1" onClick={onClose}>
          Cancel
        </Button>
        <Button className="flex-1" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
