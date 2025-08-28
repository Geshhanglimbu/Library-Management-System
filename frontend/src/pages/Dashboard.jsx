import React from 'react';
import Statcard from '../components/dashboard/statcard';
import stats from '../components/dashboard/statdata.js';

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Dashboard Overview
      </h1>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <Statcard
            key={index}
            title={item.title}
            count={item.count}
            icon={<item.icon className="text-3xl" />}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
}
