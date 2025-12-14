'use client';

import { Meh, SearchX } from 'lucide-react';
import VehicleCard from './VehicleCard';

export default function VehicleGrid({ vehicles }) {
  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
           <Meh className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No vehicles found</h3>
        <p className="text-gray-500">Try adjusting your filters to find more vehicles.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}