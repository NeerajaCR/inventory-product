import * as React from 'react';
import { useMemo, useEffect } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  FlatList, 
  StatusBar, 
  ActivityIndicator, 
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { 
  useProducts, 
  useCategories,
  useProductStore, 
  type ProductStore,
  simulatePeriodicUpdates 
} from '@smart-product-grid/shared';
import { ProductCard } from './components/ProductCard';
import { BottomNav } from './components/BottomNav';
import { Search, RotateCcw, LayoutGrid, ChevronDown } from 'lucide-react-native';
import tw from 'twrnc';

const SearchIcon = Search as any;
const RotateCcwIcon = RotateCcw as any;
const LayoutGridIcon = LayoutGrid as any;
const ChevronDownIcon = ChevronDown as any;

const queryClient = new QueryClient();

const MainApp = () => {
  const { data: productsResult, isLoading } = useProducts();
  const { data: categoriesResult } = useCategories();
  const [isSortDropdownOpen, setIsSortDropdownOpen] = React.useState(false);
  
  const products = useProductStore((state: ProductStore) => state.products);
  const categories = useProductStore((state: ProductStore) => state.categories);
  const setProducts = useProductStore((state: ProductStore) => state.setProducts);
  const setCategories = useProductStore((state: ProductStore) => state.setCategories);
  const searchQuery = useProductStore((state: ProductStore) => state.searchQuery);
  const setSearchQuery = useProductStore((state: ProductStore) => state.setSearchQuery);
  const selectedCategory = useProductStore((state: ProductStore) => state.selectedCategory);
  const setSelectedCategory = useProductStore((state: ProductStore) => state.setSelectedCategory);
  const sortBy = useProductStore((state: ProductStore) => state.sortBy);
  const setSortBy = useProductStore((state: ProductStore) => state.setSortBy);
  const applyPeriodicUpdate = useProductStore((state: ProductStore) => state.applyPeriodicUpdate);

  useEffect(() => {
    if (productsResult) setProducts(productsResult);
  }, [productsResult, setProducts]);

  useEffect(() => {
    if (categoriesResult) setCategories(categoriesResult);
  }, [categoriesResult, setCategories]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedProducts = simulatePeriodicUpdates(products);
      applyPeriodicUpdate(updatedProducts);
    }, 15000);

    return () => clearInterval(interval);
  }, [products]);

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
    } else if (sortBy === 'highestRated') {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  if (isLoading) {
    return (
      <View style={tw`flex-1 bg-white items-center justify-center`}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={tw`mt-4 text-gray-500 font-medium`}>Synchronizing Inventory...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header Row: Search & Sort */}
      <View style={tw`px-4 pt-4 pb-2 flex-row items-center gap-2`}>
        {/* Search Bar (50%) */}
        <View style={tw`flex-1 bg-[#F3F0FF] rounded-2xl flex-row items-center px-4 py-3 shadow-sm`}>
          <SearchIcon size={18} color="#94A3B8" />
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#94A3B8"
            style={tw`flex-1 ml-2 text-gray-900 font-medium text-xs`}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Sort Bar (50%) - Custom Dropdown */}
        <View style={tw`flex-1 relative z-50`}>
          <TouchableOpacity 
            onPress={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            style={tw`bg-[#F3F0FF] rounded-2xl flex-row items-center justify-between px-4 py-3 shadow-sm`}
          >
            <Text style={tw`text-[#4F46E5] font-bold text-[10px]`} numberOfLines={1}>
              {sortBy === 'priceLowToHigh' ? 'Lowest Price to Highest' : 
               sortBy === 'highestRated' ? 'Highest Rating to Lowest' : 
               'Sort by: Show All'}
            </Text>
            <ChevronDownIcon size={14} color="#4F46E5" style={tw`ml-1`} />
          </TouchableOpacity>

          {isSortDropdownOpen && (
            <View style={tw`absolute top-12 left-0 right-0 bg-white rounded-2xl shadow-xl border border-blue-50 py-2 z-50`}>
              <TouchableOpacity 
                onPress={() => { setSortBy(null); setIsSortDropdownOpen(false); }}
                style={tw`px-4 py-3 border-b border-gray-50 flex-row items-center justify-between`}
              >
                <Text style={tw`text-gray-700 text-[10px] font-bold ${!sortBy ? 'text-[#4F46E5]' : ''}`}>Show All</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => { setSortBy('priceLowToHigh'); setIsSortDropdownOpen(false); }}
                style={tw`px-4 py-3 border-b border-gray-50`}
              >
                <Text style={tw`text-gray-700 text-[10px] font-bold ${sortBy === 'priceLowToHigh' ? 'text-[#4F46E5]' : ''}`}>Lowest Price to Highest</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => { setSortBy('highestRated'); setIsSortDropdownOpen(false); }}
                style={tw`px-4 py-3`}
              >
                <Text style={tw`text-gray-700 text-[10px] font-bold ${sortBy === 'highestRated' ? 'text-[#4F46E5]' : ''}`}>Highest Rating to Lowest</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Categories */}
      <View style={tw`pb-2`}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-2 flex-row`}>
          <TouchableOpacity 
            onPress={() => setSelectedCategory(null)}
            style={tw`px-6 py-2 rounded-full ${!selectedCategory ? 'bg-blue-700' : 'bg-[#F3F0FF]'}`}
          >
            <Text style={tw`font-bold text-xs ${!selectedCategory ? 'text-white' : 'text-[#4F46E5]'}`}>All Categories</Text>
          </TouchableOpacity>
          {categories.map((cat: string) => (
            <TouchableOpacity 
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={tw`px-6 py-2 rounded-full ${selectedCategory === cat ? 'bg-blue-700' : 'bg-[#F3F0FF]'}`}
            >
              <Text style={tw`font-bold text-xs ${selectedCategory === cat ? 'text-white' : 'text-[#4F46E5]'}`}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Product List */}
      <FlatList
        data={displayProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={tw`px-4 pb-24`}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={tw`mt-20 items-center`}>
            <LayoutGridIcon size={48} color="#E2E8F0" />
            <Text style={tw`mt-4 text-gray-400 font-medium`}>No items found</Text>
          </View>
        }
      />

      <BottomNav />
    </SafeAreaView>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MainApp />
  </QueryClientProvider>
);

export default App;
