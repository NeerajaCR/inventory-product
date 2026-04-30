import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useProductStore, useUpdateCategory, ProductStore } from '@smart-product-grid/shared';
import { Check, X, Tag } from 'lucide-react-native';
import tw from 'twrnc';

const CheckIcon = Check as any;
const XIcon = X as any;
const TagIcon = Tag as any;

interface CategoryEditorProps {
  productId: number;
  currentCategory: string;
}

export const CategoryEditor: React.FC<CategoryEditorProps> = ({ productId, currentCategory }) => {
  const [isEditing, setIsEditing] = useState(false);
  const categories = useProductStore((state: ProductStore) => state.categories);
  const { mutate: updateCategory, isPending } = useUpdateCategory();

  const handleUpdate = (newCategory: string) => {
    if (newCategory === currentCategory) {
      setIsEditing(false);
      return;
    }
    updateCategory(
      { id: productId, category: newCategory },
      {
        onSuccess: () => setIsEditing(false),
        onError: () => {
          // Error handling is managed by the optimistic update in the store
          setIsEditing(false);
        },
      }
    );
  };

  if (!isEditing) {
    return (
      <TouchableOpacity
        onPress={() => setIsEditing(true)}
        style={tw`flex-row items-center bg-[#F3F0FF] px-2 py-1 rounded-lg self-start mt-1 border border-blue-50`}
      >
        <TagIcon size={10} color="#4F46E5" />
        <Text style={tw`text-[10px] font-bold text-[#4F46E5] ml-1 uppercase tracking-tighter`}>
          {currentCategory}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={tw`mt-1 bg-white border border-blue-100 rounded-xl p-2 shadow-sm`}>
      <View style={tw`flex-row items-center justify-between mb-2 px-1`}>
        <Text style={tw`text-[10px] font-black text-gray-500 uppercase tracking-widest`}>Change Category</Text>
        <TouchableOpacity onPress={() => setIsEditing(false)}>
          <XIcon size={14} color="#94A3B8" />
        </TouchableOpacity>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`gap-2 pb-1`}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => handleUpdate(cat)}
            disabled={isPending}
            style={tw`px-3 py-1.5 rounded-lg flex-row items-center ${
              cat === currentCategory ? 'bg-blue-600' : 'bg-gray-100'
            }`}
          >
            {isPending && cat !== currentCategory ? (
              <ActivityIndicator size="small" color="#94A3B8" />
            ) : (
              <>
                {cat === currentCategory && <CheckIcon size={10} color="white" style={tw`mr-1`} />}
                <Text style={tw`text-[10px] font-bold ${cat === currentCategory ? 'text-white' : 'text-gray-600'}`}>
                  {cat}
                </Text>
              </>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
