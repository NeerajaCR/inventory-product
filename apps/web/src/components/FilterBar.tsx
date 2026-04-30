import React from 'react';
import { useProductStore } from '@smart-product-grid/shared';
import {  Filter } from 'lucide-react';

const FilterIcon = Filter as any;

export const FilterBar: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, categories } = useProductStore();

  return (
    <div className="mb-6 py-[2rem] flex gap-[2rem] rounded-xl bg-white p-4 shadow-lg md:flex-row md:items-center md:justify-end">
      {/* Search Input */}
      <div className="relative w-[50%] md:w-40">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-[1.5rem] w-full rounded-[0.5rem] border px-5 py-3 border-gray-300 bg-gray-100 pl-10 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Dropdown */}
      <div className="relative w-[50%] md:w-40">
        <select
          value={selectedCategory || ''}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
          className="h-[1.5rem] w-full rounded-[0.5rem] border px-5 py-3 border-gray-300 bg-gray-100 pl-10 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Button */}
      <button className="flex w-[50%] items-center justify-center gap-2 rounded-[0.5rem] bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 md:w-auto">
        Sort by Rating
      </button>
    </div>
  );
};
