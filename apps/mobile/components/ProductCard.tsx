import React from 'react';
import { View, Text, Image } from 'react-native';
import { type Product } from '@smart-product-grid/shared';
import { Star } from 'lucide-react-native';
import { CategoryEditor } from './CategoryEditor';
import tw from 'twrnc';

const StarIcon = Star as any;

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <View style={tw`bg-white rounded-3xl mb-6 shadow-xl border border-gray-100 overflow-hidden`}>
      {/* Image Area */}
      <View style={tw`relative h-72 w-full p-4 items-center justify-center bg-gray-50`}>
        <Image
          source={{ uri: product.image }}
          style={tw`w-full h-full`}
          resizeMode="contain"
        />
      </View>

      {/* Content Area */}
      <View style={tw`p-6 pb-8`}>
        <Text style={tw`text-xl font-bold text-gray-900`} numberOfLines={1}>
          {product.title}
        </Text>
        
        <CategoryEditor productId={product.id} currentCategory={product.category} />

        {/* Rating */}
        <View style={tw`flex-row items-center gap-1 mb-6 mt-4`}>
          <StarIcon size={12} fill="#FACC15" color="#FACC15" />
          <Text style={tw`text-gray-400 text-xs font-bold font-mono`}>
            {product.rating.rate} ({product.rating.count} reviews)
          </Text>
        </View>

        {/* Bottom Row: Price */}
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-2xl font-black text-gray-900`}>
            ${product.price.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};
