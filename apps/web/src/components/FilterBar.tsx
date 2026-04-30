import React from 'react';
import { useProductStore } from '@smart-product-grid/shared';

export const FilterBar: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, sortBy, setSortBy } = useProductStore();

  const handleSortToggle = () => {
    if (sortBy === null) {
      setSortBy('priceLowToHigh');
    } else if (sortBy === 'priceLowToHigh') {
      setSortBy('highestRated');
    } else {
      setSortBy(null);
    }
  };

  const getSortLabel = () => {
    if (sortBy === 'priceLowToHigh') return 'Sorted by Pricing';
    if (sortBy === 'highestRated') return 'Sorted by Rating';
    return 'Sort by ';
  };

  const categories = [
    'All Categories',
    "men's clothing",
    'jewelery',
    'electronics',
    "women's clothing"
  ];

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
          value={selectedCategory || 'All Categories'}
          onChange={(e) => setSelectedCategory(e.target.value === 'All Categories' ? null : e.target.value)}
          className="h-[1.5rem] w-full rounded-[0.5rem] border px-5 py-3 border-gray-300 bg-gray-100 pl-10 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {categories.map((cat) => (
            <option key={cat} value={cat === 'All Categories' ? '' : cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSortToggle}
        className={`flex min-w-[140px] items-center justify-center gap-2 rounded-[0.5rem] px-5 py-3 text-sm font-medium shadow-md transition-all md:w-auto ${sortBy
            ? 'bg-blue-700 text-white ring-2 ring-blue-400 ring-offset-2'
            : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}>
        {getSortLabel()}
      </button>
    </div>
  );
};
