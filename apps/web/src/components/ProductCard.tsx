import { type Product, useProductStore } from '@smart-product-grid/shared';
import { ShoppingCart, Star, Edit3 } from 'lucide-react';
import React, { useState } from 'react';

const StarIcon = Star as any;
const ShoppingCartIcon = ShoppingCart as any;
const EditIcon = Edit3 as any;

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
  const { categories, updateProductCategory } = useProductStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newCategory, setNewCategory] = useState(product.category);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCategoryUpdate = async () => {
    setIsUpdating(true);
    setError(null);
    try {
      await updateProductCategory(product.id, newCategory);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update category');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsUpdating(false);
    }
  };

  const badgeColor = product.badge?.includes('-') ? 'bg-red-500' : 'bg-gray-800';

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className='px-[1rem] py-[1rem]'>
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
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
            <div className="text-lg font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </div>
          </div>

          {isEditing ? (
            <div className="mt-4">
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2">
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              <button
                onClick={handleCategoryUpdate}
                disabled={isUpdating}
                className="mt-2 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                {isUpdating ? 'Updating...' : 'Update Category'}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300">
              <EditIcon size={16} /> Edit Category
            </button>
          )}

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
      </div>

      {/* Add to Cart Button */}
      <button className="flex items-center justify-center bg-blue-500 text-white py-2 text-sm font-medium hover:bg-blue-600 transition">
        <ShoppingCartIcon size={16} />
        Add to Cart
      </button>
    </div>
  );
});
