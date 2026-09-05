import React from 'react';

export const Card = ({
  children,
  className = '',
  hover = false,
  ...props
}) => {
  return (
    <div
      className={`bg-[#141414] rounded-2xl border border-white/10 p-6 shadow-lg ${
        hover
          ? 'hover:border-orange-500/30 hover:shadow-orange-500/10 transition-all duration-200'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};