'use client';

import { useState, useMemo, useEffect } from 'react';
import { mockVehicles } from '@/app/data/mockVehicles';
import FilterBar from '@/app/components/FilterBar';
import VehicleGrid from '@/app/components/VehicleGrid';
import Dropdown from '@/app/components/Dropdown';
import { CarFrontIcon } from 'lucide-react';

export default function StockVehiclesPage() {
  const [filters, setFilters] = useState({
    keyword: '',
    make: '',
    model: '',
    location: '',
    minPrice: 0,
    maxPrice: 100000,
    minYear: '',
    maxYear: ''
  });

  const [visibleCount, setVisibleCount] = useState(12);
  const [sortBy, setSortBy] = useState('featured');
  const itemsPerPage = 12;

  // Sort options for the dropdown
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'monthly-low', label: 'Monthly: Low to High' },
    { value: 'monthly-high', label: 'Monthly: High to Low' },
    { value: 'year-new', label: 'Year: Newest First' },
  ];

  // Format sort label for display
  const formatSortLabel = (value) => {
    const option = sortOptions.find(opt => opt.value === value);
    return option ? `Sort by: ${option.label}` : 'Sort by: Featured';
  };

  // Filters
  const filteredVehicles = useMemo(() => {
    let vehicles = [...mockVehicles];

    vehicles = vehicles.filter(vehicle => {
      // Keyword search
      if (filters.keyword) {
        const searchStr = `${vehicle.make} ${vehicle.model} ${vehicle.description} ${vehicle.registration}`.toLowerCase();
        if (!searchStr.includes(filters.keyword.toLowerCase())) return false;
      }

      // Make filter
      if (filters.make && vehicle.make !== filters.make) return false;

      // Model filter 
      if (filters.model && !vehicle.model.toLowerCase().includes(filters.model.toLowerCase())) return false;

      // Location filter
      if (filters.location && vehicle.location !== filters.location) return false;

      // Price filter
      if (vehicle.price < filters.minPrice || vehicle.price > filters.maxPrice) return false;

      return true;
    });

    //  sorting
    switch (sortBy) {
      case 'price-low':
        vehicles.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        vehicles.sort((a, b) => b.price - a.price);
        break;
      case 'year-new':
        vehicles.sort((a, b) => b.year - a.year);
        break;
      case 'monthly-low':
        vehicles.sort((a, b) => a.monthlyPrice - b.monthlyPrice);
        break;
      case 'monthly-high':
        vehicles.sort((a, b) => b.monthlyPrice - a.monthlyPrice);
        break;
      case 'featured':
      default:
      
        break;
    }

    return vehicles;
  }, [filters, sortBy]);

  const visibleVehicles = useMemo(() => {
    return filteredVehicles.slice(0, visibleCount);
  }, [filteredVehicles, visibleCount]);

           // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [filters, sortBy]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + itemsPerPage);
  };

  // Calculate statistics
  const stats = useMemo(() => {
    if (filteredVehicles.length === 0) {
      return {
        totalVehicles: 0,
        averagePrice: 0,
        averageMonthly: 0,
      };
    }

    const totalPrice = filteredVehicles.reduce((sum, vehicle) => sum + vehicle.price, 0);
    const totalMonthly = filteredVehicles.reduce((sum, vehicle) => sum + vehicle.monthlyPrice, 0);

    return {
      totalVehicles: filteredVehicles.length,
      averagePrice: Math.round(totalPrice / filteredVehicles.length),
      averageMonthly: Math.round(totalMonthly / filteredVehicles.length),
    };
  }, [filteredVehicles]);

  const hasMoreVehicles = visibleVehicles.length < filteredVehicles.length;

  return (
    <div className="min-h-screen bg-[#F2F3F3]">
      <main className="container mx-auto px-4 py-6">
        {/* header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CarFrontIcon className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                  Stock Vehicles
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Browse Stock Vehicles
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Choose your next car from one of our stock dealerships
              </p>
            </div>
          </div>
        </div>
        {/* Filters */}
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
        />

        {/* Results Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Showing {visibleVehicles.length} of {filteredVehicles.length} Vehicles
            </h2>
          </div>
          <div className="flex items-center">
            {/* Using Dropdown component for sorting */}
            <Dropdown
              label=""
              value={sortBy}
              options={sortOptions}
              placeholder="Sort by: Featured"
              onChange={(value) => setSortBy(value)}
              onClear={() => setSortBy('featured')}
              formatLabel={formatSortLabel}
              className="min-w-[200px]"
            />
          </div>
        </div>
        <VehicleGrid vehicles={visibleVehicles} />

        {hasMoreVehicles && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Load More ({filteredVehicles.length - visibleVehicles.length} more vehicles)
            </button>
          </div>
        )}

        {!hasMoreVehicles && filteredVehicles.length > 0 && (
          <div className="text-center mt-8 text-gray-600">
            All {filteredVehicles.length}  vehicles displayed
          </div>
        )}
      </main>
    </div>
  );
}