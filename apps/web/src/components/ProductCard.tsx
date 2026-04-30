import { type Product } from '@smart-product-grid/shared';
import { ShoppingCart, Star } from 'lucide-react';
import React from 'react';

const StarIcon = Star as any;
const ShoppingCartIcon = ShoppingCart as any;

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
  const badgeColor = product.badge?.includes('-') ? 'bg-red-500' : 'bg-gray-800';

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className=' px-[1rem] py-[1rem]'>
        {/* Image */}
        <div className="relative aspect-square bg-gray-50 p-4 sm:p-5">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />

          {product.badge && (
            <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white ${badgeColor}`}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-2 h-[1.5rem] text-base sm:text-lg font-semibold text-gray-800">
            {product.title}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm text-gray-500">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <StarIcon className="text-yellow-400" size={16} />
              <span className="text-sm text-gray-600">
                {product.rating.rate}
              </span>
            </div>

            <span className="text-lg font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Button */}
      <button className="flex items-center justify-center gap-6 border-t bg-blue-600 px-4 py-[0.5rem] text-sm font-medium text-white transition hover:bg-blue-700">
        <ShoppingCartIcon size={16} />
        Add to Cart
      </button>
    </div>
  );
});
