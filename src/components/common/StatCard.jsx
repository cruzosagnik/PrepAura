import React from 'react';
import { Card } from './Card';

export const StatCard = ({ title, value, change, icon: Icon, trend = 'up' }) => {
  return (
    <Card className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        <h4 className="text-2xl font-bold text-slate-900 mt-1">{value}</h4>
        {change && (
          <p className={`text-xs mt-1.5 font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-slate-500'}`}>
            {change}
          </p>
        )}
      </div>
      <div className="p-3 bg-brand-50 rounded-xl text-brand-700">
        <Icon className="w-6 h-6" />
      </div>
    </Card>
  );
};