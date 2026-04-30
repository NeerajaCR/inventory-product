import axios from 'axios';
import { type Product, type Category } from '../types';

const API_BASE_URL = 'https://fakestoreapi.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const productApi = {
  getProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>('/products');
    return response.data;
  },
  getCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>('/products/categories');
    return response.data;
  },
  updateProductCategory: async (id: number, category: string): Promise<Product> => {
    // Simulate network delay
    await new Promise<void>((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Simulate occasional random failure (20% chance)
    if (Math.random() < 0.2) {
      throw new Error('Network Error: Failed to update category');
    }

    const response = await apiClient.patch<Product>(`/products/${id}`, {
      category,
    });
    return response.data;
  },
};
