import React from 'react';

export const Loading = ({ text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
      <div className="w-8 h-8 border-3 border-brand-900 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm font-medium text-slate-500">{text}</p>
    </div>
  );
};