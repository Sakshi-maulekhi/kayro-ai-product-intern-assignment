import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { SEED_APPOINTMENTS } from '../data/seed';

const STORAGE_KEY = 'nutricare_appointments_v2';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return SEED_APPOINTMENTS;
}

function saveState(appointments) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  } catch {}
}

function generateId() {
  return `apt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// ─── Reducer ────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const newApt = {
        ...action.payload,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      return [...state, newApt];
    }
    case 'CANCEL':
      return state.filter((a) => a.id !== action.id);
    case 'RESCHEDULE':
      return state.map((a) =>
        a.id === action.id
          ? { ...a, date: action.date, time: action.time, status: 'Booked', confirmed: false }
          : a
      );
    case 'SET_STATUS':
      return state.map((a) => (a.id === action.id ? { ...a, status: action.status } : a));
    case 'CONFIRM':
      return state.map((a) => (a.id === action.id ? { ...a, confirmed: true } : a));
    case 'RESET':
      return SEED_APPOINTMENTS;
    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────
const AppointmentContext = createContext(null);

export function AppointmentProvider({ children }) {
  const [appointments, dispatch] = useReducer(reducer, null, loadState);

  useEffect(() => {
    saveState(appointments);
  }, [appointments]);

  const today = new Date().toISOString().slice(0, 10);

  function isSlotTaken(date, time, excludeId = null) {
    return appointments.some(
      (a) =>
        a.date === date &&
        a.time === time &&
        a.id !== excludeId &&
        a.status !== 'Cancelled'
    );
  }

  function addAppointment(data) {
    if (isSlotTaken(data.date, data.time)) return false;
    dispatch({ type: 'ADD', payload: { ...data, status: 'Booked', confirmed: false } });
    return true;
  }

  function cancelAppointment(id) {
    dispatch({ type: 'CANCEL', id });
  }

  function rescheduleAppointment(id, date, time) {
    if (isSlotTaken(date, time, id)) return false;
    dispatch({ type: 'RESCHEDULE', id, date, time });
    return true;
  }

  function setStatus(id, status) {
    dispatch({ type: 'SET_STATUS', id, status });
  }

  function confirmAttendance(id) {
    dispatch({ type: 'CONFIRM', id });
  }

  function resetData() {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: 'RESET' });
  }

  const sorted = [...appointments].sort((a, b) => {
    const da = `${a.date}T${a.time}`;
    const db = `${b.date}T${b.time}`;
    return da < db ? -1 : da > db ? 1 : 0;
  });

  const upcomingAppointments = sorted.filter(
    (a) => a.status === 'Booked' && `${a.date}T${a.time}` >= `${today}T00:00`
  );

  const pastAppointments = sorted.filter(
    (a) =>
      a.status === 'Done' ||
      a.status === 'No-show' ||
      (a.status === 'Booked' && `${a.date}T${a.time}` < `${today}T00:00`)
  );

  const todayAppointments = sorted.filter((a) => a.date === today);

  return (
    <AppointmentContext.Provider
      value={{
        appointments: sorted,
        upcomingAppointments,
        pastAppointments,
        todayAppointments,
        isSlotTaken,
        addAppointment,
        cancelAppointment,
        rescheduleAppointment,
        setStatus,
        confirmAttendance,
        resetData,
        today,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  const ctx = useContext(AppointmentContext);
  if (!ctx) throw new Error('useAppointments must be inside AppointmentProvider');
  return ctx;
}
