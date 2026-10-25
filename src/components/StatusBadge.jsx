import React from 'react';

const STYLES = {
  Booked:    'bg-blue-50 text-blue-700 border border-blue-200',
  Done:      'bg-green-50 text-green-700 border border-green-200',
  'No-show': 'bg-red-50 text-red-600 border border-red-200',
};

const DOTS = {
  Booked:    'bg-blue-500',
  Done:      'bg-green-500',
  'No-show': 'bg-red-500',
};

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
        STYLES[status] ?? 'bg-gray-100 text-gray-600 border border-gray-200'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${DOTS[status] ?? 'bg-gray-400'}`} />
      {status}
    </span>
  );
}
