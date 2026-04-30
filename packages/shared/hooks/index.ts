import { useQuery, useMutation } from '@tanstack/react-query';
import { productApi } from '../api';
import { useProductStore, type ProductStore } from '../store/useProductStore';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: productApi.getProducts,
    staleTime: Infinity,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: productApi.getCategories,
    staleTime: Infinity,
  });
};

export const useUpdateCategory = () => {
  const updateProductCategory = useProductStore((state: ProductStore) => state.updateProductCategory);
  
  return useMutation({
    mutationFn: ({ id, category }: { id: number; category: string }) => 
      updateProductCategory(id, category),
  });
};
