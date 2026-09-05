import React from 'react';

const variants = {
  primary:
    'bg-[#ff6b00] hover:bg-[#ff8533] text-white shadow-lg shadow-orange-500/20 border border-transparent',

  secondary:
    'bg-[#141414] hover:bg-[#1f1f1f] text-gray-200 border border-white/10 shadow-sm',

  accent:
    'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-500/20',

  ghost:
    'bg-transparent hover:bg-white/5 text-gray-400 hover:text-white',

  danger:
    'bg-red-600 hover:bg-red-500 text-white'
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs font-medium rounded-lg',
  md: 'px-4 py-2 text-sm font-medium rounded-lg',
  lg: 'px-5 py-2.5 text-base font-semibold rounded-xl'
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-[#050505] disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}

      {children}
    </button>
  );
};