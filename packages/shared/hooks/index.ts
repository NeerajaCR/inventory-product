import { useQuery, useMutation } from '@tanstack/react-query';
import { productApi } from '../api';
import { useProductStore } from '../store/useProductStore';

export const useProducts = () => {
  const setProducts = useProductStore((state) => state.setProducts);
  
  return useQuery(['products'], productApi.getProducts, {
    onSuccess: (data) => {
      setProducts(data);
    },
    staleTime: Infinity, // We manage state manually via Zustand
  });
};

export const useCategories = () => {
  const setCategories = useProductStore((state) => state.setCategories);
  
  return useQuery(['categories'], productApi.getCategories, {
    onSuccess: (data) => {
      setCategories(data);
    },
    staleTime: Infinity,
  });
};

export const useUpdateCategory = () => {
  const updateProductCategory = useProductStore((state) => state.updateProductCategory);
  
  return useMutation(
    ({ id, category }: { id: number; category: string }) => 
      updateProductCategory(id, category)
  );
};
