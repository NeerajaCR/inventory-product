import React, { useMemo, useEffect } from 'react';
import { useProducts, useCategories, useProductStore, simulatePeriodicUpdates } from '@smart-product-grid/shared';
import { ProductCard } from './components/ProductCard';
import { FilterBar } from './components/FilterBar';
import { Loader2, AlertCircle } from 'lucide-react';

const Loader2Icon = Loader2 as any;
const AlertCircleIcon = AlertCircle as any;

const App: React.FC = () => {
  const { isLoading: isProductsLoading, isError: isProductsError, refetch: refetchProducts } = useProducts();
  const { isLoading: isCategoriesLoading, isError: isCategoriesError, refetch: refetchCategories } = useCategories();

  const isLoading = isProductsLoading || isCategoriesLoading;
  const isError = isProductsError || isCategoriesError;
  const refetch = () => {
    refetchProducts();
    refetchCategories();
  };
  const {
    products,
    searchQuery,
    selectedCategory,
    sortBy,
    applyPeriodicUpdate
  } = useProductStore();

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedProducts = simulatePeriodicUpdates(products);
      applyPeriodicUpdate(updatedProducts);
    }, 12000);

    return () => clearInterval(interval);
  }, [products, applyPeriodicUpdate]);

  const displayProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(query));
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (sortBy === 'priceLowToHigh') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHighToLow') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'highestRated') {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2Icon className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <AlertCircleIcon className="text-red-500 mb-4" size={48} />
          <p className="text-gray-600">Something went wrong. Please try again.</p>
          <button onClick={() => refetch()} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-[2.5rem] py-[2rem] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Inventory Overview
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Manage and curate your premium collection from a single pane of glass.
          </p>
        </div>

        <FilterBar />

        <div className="grid gap-5 sm:gap-6 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
