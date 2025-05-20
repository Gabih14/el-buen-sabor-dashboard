import React from 'react';
import Card from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    positive: boolean;
  };
  icon: React.ReactNode;
  color: 'red' | 'amber' | 'emerald' | 'blue' | 'purple';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => {
  const colorClasses = {
    red: 'bg-red-100 text-red-600',
    amber: 'bg-amber-100 text-amber-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className={`p-2 rounded-full ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
      
      {change && (
        <div className="mt-4">
          <span 
            className={`inline-flex items-center text-sm font-medium ${
              change.positive ? 'text-emerald-600' : 'text-red-600'
            }`}
          >
            {change.positive ? '↑' : '↓'} {change.value}
            <span className="ml-1 text-gray-500">vs último mes</span>
          </span>
        </div>
      )}
    </Card>
  );
};

export default StatCard;