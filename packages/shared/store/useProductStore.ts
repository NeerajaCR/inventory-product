import { create } from 'zustand';
import { type StoreState, type StoreActions, type Product } from '../types';
import { productApi } from '../api';
import _ from 'lodash';

const MAX_HISTORY = 20;

export const useProductStore = create<StoreState & StoreActions>((set, get) => ({
  products: [],
  categories: [],
  searchQuery: '',
  selectedCategory: null,
  sortBy: null,
  pendingUpdates: {},
  past: [],
  future: [],

  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSortBy: (sortBy) => set({ sortBy }),

  updateProductCategory: async (productId, newCategory) => {
    const { products, past } = get();
    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex === -1) return;

    const oldProduct = products[productIndex];
    const oldCategory = oldProduct.category;

    // 1. Optimistic Update
    const newProducts = [...products];
    newProducts[productIndex] = { ...oldProduct, category: newCategory };

    // Push to history
    const historyEntry = { products };
    const newPast = [historyEntry, ...past].slice(0, MAX_HISTORY);

    set({
      products: newProducts,
      past: newPast,
      future: [], // Clear redo stack on new action
    });

    try {
      await productApi.updateProductCategory(productId, newCategory);
    } catch (error) {
      // 2. Rollback on failure
      console.error('Failed to update category:', error);
      const { products: currentProducts } = get();
      const rollbackProducts = currentProducts.map((p) =>
        p.id === productId ? { ...p, category: oldCategory } : p
      );
      set({ products: rollbackProducts });
      throw error;
    }
  },

  undo: () => {
    const { past, products, future } = get();
    if (past.length === 0) return;

    const previous = past[0];
    const newPast = past.slice(1);
    
    set({
      products: previous.products as Product[],
      past: newPast,
      future: [{ products }, ...future].slice(0, MAX_HISTORY),
    });
  },

  redo: () => {
    const { future, products, past } = get();
    if (future.length === 0) return;

    const next = future[0];
    const newFuture = future.slice(1);

    set({
      products: next.products as Product[],
      future: newFuture,
      past: [{ products }, ...past].slice(0, MAX_HISTORY),
    });
  },

  applyPeriodicUpdate: (updatedProducts) => {
    const { products } = get();
    
    // We want to update only fields like price and rating,
    // but avoid overwriting any manual changes that might be in the history or currently active.
    // In this simple implementation, we just update the products in the current state.
    // To handle conflicts better, we'd need a more complex diffing/merging strategy.
    
    const mergedProducts = products.map((existingProduct) => {
      const update = updatedProducts.find((p) => p.id === existingProduct.id);
      if (update) {
        return {
          ...existingProduct,
          price: update.price,
          oldPrice: existingProduct.price !== update.price ? existingProduct.price : existingProduct.oldPrice,
          rating: update.rating,
          // category is NOT updated from the periodic sync
        };
      }
      return existingProduct;
    });

    set({ products: mergedProducts });
  },
}));
