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
import { Search, RotateCcw, LayoutGrid } from 'lucide-react-native';
import tw from 'twrnc';

const SearchIcon = Search as any;
const RotateCcwIcon = RotateCcw as any;
const LayoutGridIcon = LayoutGrid as any;

const queryClient = new QueryClient();

const MainApp = () => {
  const { data: productsResult, isLoading } = useProducts();
  const { data: categoriesResult } = useCategories();
  
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
      
      {/* Header & Search */}
      <View style={tw`px-4 pt-4 pb-2`}>
        <View style={tw`bg-[#F3F0FF] rounded-2xl flex-row items-center px-4 py-3 shadow-sm`}>
          <SearchIcon size={20} color="#94A3B8" />
          <TextInput
            placeholder="Search products, brands, or category"
            placeholderTextColor="#94A3B8"
            style={tw`flex-1 ml-3 text-gray-900 font-medium`}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Sorting & Categories */}
      <View style={tw`py-2 gap-2`}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-2 flex-row`}>
          <TouchableOpacity 
            onPress={() => setSortBy(null)}
            style={tw`px-4 py-2 rounded-xl flex-row items-center ${!sortBy ? 'bg-[#4F46E5]' : 'bg-[#F3F0FF]'}`}
          >
            <Text style={tw`font-bold text-[10px] ${!sortBy ? 'text-white' : 'text-[#4F46E5]'}`}>Newest First</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setSortBy('priceLowToHigh')}
            style={tw`px-4 py-2 rounded-xl flex-row items-center ${sortBy === 'priceLowToHigh' ? 'bg-[#4F46E5]' : 'bg-[#F3F0FF]'}`}
          >
            <Text style={tw`font-bold text-[10px] ${sortBy === 'priceLowToHigh' ? 'text-white' : 'text-[#4F46E5]'}`}>Price: Low to High</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setSortBy('highestRated')}
            style={tw`px-4 py-2 rounded-xl flex-row items-center ${sortBy === 'highestRated' ? 'bg-[#4F46E5]' : 'bg-[#F3F0FF]'}`}
          >
            <Text style={tw`font-bold text-[10px] ${sortBy === 'highestRated' ? 'text-white' : 'text-[#4F46E5]'}`}>Highest Rated</Text>
          </TouchableOpacity>
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`px-4 gap-2 flex-row border-t border-gray-50 pt-2`}>
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
