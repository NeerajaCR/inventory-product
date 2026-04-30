import { type Product } from '../types';

/**
 * Simulates periodic updates by slightly changing prices and ratings.
 */
export const simulatePeriodicUpdates = (products: Product[]): Product[] => {
  return products.map((product) => {
    // 50% chance to update a product
    if (Math.random() > 0.5) {
      const priceChange = (Math.random() - 0.5) * 5; // Change by +/- 2.5
      const newPrice = Math.max(1, product.price + priceChange);
      
      const ratingChange = (Math.random() - 0.5) * 0.2; // Change by +/- 0.1
      const newRate = Math.min(5, Math.max(0, product.rating.rate + ratingChange));

      return {
        ...product,
        price: Number(newPrice.toFixed(2)),
        rating: {
          ...product.rating,
          rate: Number(newRate.toFixed(1)),
        },
      };
    }
    return product;
  });
};

export const debounce = (fn: Function, ms: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
