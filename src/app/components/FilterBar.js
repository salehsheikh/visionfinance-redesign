'use client';

import { Search, Filter, X } from 'lucide-react';
import Dropdown from './Dropdown';
import {
  getModelsForMake, vehicleMakes,
  priceRanges,
} from '../data/mockVehicles';



export default function FilterBar({ filters, onFilterChange }) {
  const handleChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };

    if (key === 'make') {
      updatedFilters.model = '';
    }

    onFilterChange(updatedFilters);
  };

  const handleClear = (key) => {
    onFilterChange({ ...filters, [key]: '' });
  };

  const handleClearAll = () => {
    onFilterChange({
      keyword: '',
      make: '',
      model: '',
      minPrice: 0,
      maxPrice: 100000,
    });
  };

  // Format price range  display
  const formatPriceRange = (min, max) => {
    if (min === 0 && max === 100000) return 'Any Price';

    const range = priceRanges.find(r => r.min === min && r.max === max);
    return range ? range.label : `£${min.toLocaleString()} - £${max.toLocaleString()}`;
  };

                  // available models for selected make
  const availableModels = getModelsForMake(filters.make);

  const makeOptions = vehicleMakes.map(make => ({
    value: make,
    label: make
  }));

  const modelOptions = availableModels.map(model => ({
    value: model,
    label: model
  }));

  const priceOptions = priceRanges.map(range => ({
    value: `${range.min}-${range.max}`,
    label: range.label
  }));

  return (
    <div className="bg-white rounded-xl p-4 md:p-6 card-shadow mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-gray-800">Filter Vehicles</h2>
        </div>
        <button
          onClick={handleClearAll}
          className="text-sm cursor-pointer text-gray-600 hover:text-blue-600 font-medium flex items-center gap-1"
        >
          <X className="w-4 h-4" />
          Clear all
        </button>
      </div>

      <div className="space-y-4">
                                 {/*   Keyword Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by keyword..."
            value={filters.keyword}
            onChange={(e) => handleChange('keyword', e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {filters.keyword && (
            <button
              onClick={() => handleClear('keyword')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Make Dropdown */}
          <Dropdown
            label="Make"
            value={filters.make}
            options={makeOptions}
            placeholder="All Makes"
            onChange={(value) => handleChange('make', value)}
            onClear={() => handleClear('make')}
          />

          {/* Model Dropdown */}
          <Dropdown
            label="Model"
            value={filters.model}
            options={modelOptions}
            placeholder={filters.make ? `All ${filters.make} Models` : "Select Make First"}
            onChange={(value) => handleChange('model', value)}
            onClear={() => handleClear('model')}
            disabled={!filters.make}
          />

                     {/* Price Range Dropdown */}
          <Dropdown
            label="Price Range"
            value={`${filters.minPrice}-${filters.maxPrice}`}
            options={priceOptions}
            placeholder="Any Price"
            onChange={(value) => {
              const [min, max] = value.split('-').map(Number);
              handleChange('minPrice', min);
              handleChange('maxPrice', max);
            }}
            onClear={() => {
              handleChange('minPrice', 0);
              handleChange('maxPrice', 100000);
            }}
            formatLabel={(value) => {
              const [min, max] = value.split('-').map(Number);
              return formatPriceRange(min, max);
            }}
          />
        </div>
      </div>
    </div>
  );
}