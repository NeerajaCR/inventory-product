export interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  description: string;
  category: string;
  image: string;
  badge?: string;
  subtitle?: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type Category = string;

export interface StoreState {
  products: Product[];
  categories: Category[];
  searchQuery: string;
  selectedCategory: Category | null;
  sortBy: 'price' | 'rating' | null;
  pendingUpdates: Record<number, Partial<Product>>;
  
  // History for Undo/Redo
  past: Partial<StoreState>[];
  future: Partial<StoreState>[];
}

export interface StoreActions {
  setProducts: (products: Product[]) => void;
  setCategories: (categories: Category[]) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: Category | null) => void;
  setSortBy: (sortBy: 'price' | 'rating' | null) => void;
  updateProductCategory: (productId: number, newCategory: string) => Promise<void>;
  undo: () => void;
  redo: () => void;
  applyPeriodicUpdate: (updates: Product[]) => void;
}
