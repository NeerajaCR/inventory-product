import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { type Product, useProductStore } from '@smart-product-grid/shared';
import { Star, ShoppingCart } from 'lucide-react-native';
import tw from 'twrnc';

const StarIcon = Star as any;
const ShoppingCartIcon = ShoppingCart as any;

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { updateProductCategory } = useProductStore();
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <View style={tw`bg-white rounded-3xl mb-6 shadow-xl border border-gray-100 overflow-hidden`}>
      {/* Image Area */}
      <View style={tw`relative h-72 w-full p-4 items-center justify-center bg-gray-50`}>
        <Image
          source={{ uri: product.image }}
          style={tw`w-full h-full`}
          resizeMode="contain"
        />
        
        {/* Category Badge */}
        <View style={tw`absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-sm`}>
          <Text style={tw`text-[10px] font-black uppercase text-blue-900 tracking-wider`}>
            {product.category}
          </Text>
        </View>
      </View>

      {/* Content Area */}
      <View style={tw`p-6 pb-8`}>
        <Text style={tw`text-xl font-bold text-gray-900 mb-1`} numberOfLines={1}>
          {product.title}
        </Text>
        
        {/* Rating */}
        <View style={tw`flex-row items-center gap-1 mb-6`}>
          <StarIcon size={12} fill="#FACC15" color="#FACC15" />
          <Text style={tw`text-gray-400 text-xs font-bold font-mono`}>
            {product.rating.rate} ({product.rating.count} reviews)
          </Text>
        </View>

        {/* Bottom Row: Price & Action */}
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-2xl font-black text-gray-900`}>
            ${product.price.toFixed(2)}
          </Text>
          
          <TouchableOpacity 
            style={tw`bg-blue-700 w-12 h-12 rounded-2xl items-center justify-center shadow-lg active:scale-95`}
          >
            {isUpdating ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <ShoppingCartIcon size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
