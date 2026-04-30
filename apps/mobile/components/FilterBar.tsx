import React from 'react';
import { View, TextInput, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useProductStore } from '@smart-product-grid/shared';
import { Search, Filter as FilterIcon } from 'lucide-react-native';

export const FilterBar: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, categories, sortBy, setSortBy } = useProductStore();
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
    if (sortBy === 'priceLowToHigh') return 'Sort by Pricing';
    if (sortBy === 'highestRated') return 'Sort by Rating';
    return 'Sort by ';
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search products..."
          placeholderTextColor="#64748B"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        <TouchableOpacity 
          style={[styles.categoryChip, !selectedCategory && styles.activeChip]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text style={[styles.chipText, !selectedCategory && styles.activeChipText]}>All</Text>
        </TouchableOpacity>
        {categories.map((cat) => (
          <TouchableOpacity 
            key={cat} 
            style={[styles.categoryChip, selectedCategory === cat && styles.activeChip]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.chipText, selectedCategory === cat && styles.activeChipText]}>{cat}</Text>
          </TouchableOpacity>
        ))}

        {/* Sort Button */}
        <TouchableOpacity 
          style={[styles.categoryChip, sortBy !== null && styles.activeSortChip, { marginLeft: 16 }]}
          onPress={handleSortToggle}
        >
          <Text style={[styles.chipText, sortBy !== null && styles.activeChipText]}>
            {getSortLabel()}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: '#0F172A',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    marginHorizontal: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: '#F8FAFC',
    fontSize: 14,
  },
  categoryScroll: {
    paddingLeft: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  activeChip: {
    backgroundColor: '#38BDF8',
    borderColor: '#38BDF8',
  },
  activeSortChip: {
    backgroundColor: '#0EA5E9',
    borderColor: '#0EA5E9',
  },
  chipText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  activeChipText: {
    color: '#FFFFFF',
  },
});
