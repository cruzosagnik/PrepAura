import React from 'react';
import { Card } from './Card';

export const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  trend = 'up'
}) => {
  return (
    <Card className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          {title}
        </p>

        <h4 className="text-2xl font-bold text-white mt-1">
          {value}
        </h4>

        {change && (
          <p
            className={`text-xs mt-1.5 font-medium ${
              trend === 'up'
                ? 'text-orange-400'
                : 'text-gray-500'
            }`}
          >
            {change}
          </p>
        )}
      </div>

      <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500 border border-orange-500/20">
        <Icon className="w-6 h-6" />
      </div>
    </Card>
  );
};