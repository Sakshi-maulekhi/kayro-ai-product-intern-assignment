import React from 'react';

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 ' +
    'focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-green-700 hover:bg-green-800 text-white shadow-sm hover:shadow-md active:scale-95',
    secondary:
      'bg-stone-100 hover:bg-stone-200 text-green-800 border border-stone-200',
    ghost: 'bg-transparent hover:bg-green-50 text-green-700',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm active:scale-95',
    outline:
      'border-2 border-green-600 text-green-700 hover:bg-green-50 active:scale-95',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
