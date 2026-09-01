import React from 'react';

export const ProgressBar = ({ progress = 0, label, scoreText, color = 'bg-brand-900' }) => {
  return (
    <div className="w-full">
      {(label || scoreText) && (
        <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
          <span>{label}</span>
          <span className="text-slate-500 font-semibold">{scoreText || `${progress}%`}</span>
        </div>
      )}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
};