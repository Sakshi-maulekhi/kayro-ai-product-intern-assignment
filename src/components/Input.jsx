import React from 'react';

export function Input({ label, id, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={[
          'w-full px-4 py-2.5 rounded-xl border transition-all duration-150',
          'bg-white text-gray-900 placeholder-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400',
          error ? 'border-red-400 focus:ring-red-300' : 'border-gray-200',
          className,
        ].join(' ')}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}
