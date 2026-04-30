import React, { useState } from 'react';
import { useProductStore } from '@smart-product-grid/shared';
import { Edit3, Check, X } from 'lucide-react';

const EditIcon = Edit3 as any;
const CheckIcon = Check as any;
const XIcon = X as any;

interface CategoryEditorProps {
  productId: number;
  currentCategory: string;
}

export const CategoryEditor: React.FC<CategoryEditorProps> = ({ productId, currentCategory }) => {
  const { categories, updateProductCategory } = useProductStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newCategory, setNewCategory] = useState(currentCategory);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    if (newCategory === currentCategory) {
      setIsEditing(false);
      return;
    }
    
    setIsUpdating(true);
    setError(null);
    try {
      await updateProductCategory(productId, newCategory);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="group/edit mt-auto flex items-center justify-between rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold text-white transition-all hover:bg-blue-700 hover:shadow-md"
      >
        <span className="truncate max-w-[100px] uppercase tracking-widest">{currentCategory}</span>
        <EditIcon size={12} className="ml-2 opacity-70 group-hover/edit:opacity-100" />
      </button>
    );
  }

  return (
    <div className="mt-auto space-y-2 rounded-lg bg-blue-50/50 p-2 border border-blue-100">
      <select
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        disabled={isUpdating}
        className="w-full rounded-md border border-blue-200 bg-white p-1 text-xs focus:ring-2 focus:ring-blue-400 outline-none"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
      <div className="flex gap-1">
        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className="flex flex-1 items-center justify-center rounded bg-blue-600 px-2 py-1 text-[10px] font-bold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isUpdating ? '...' : <CheckIcon size={12} />}
        </button>
        <button
          onClick={() => {
            setIsEditing(false);
            setNewCategory(currentCategory);
          }}
          disabled={isUpdating}
          className="flex items-center justify-center rounded bg-gray-200 px-2 py-1 text-[10px] font-bold text-gray-600 hover:bg-gray-300"
        >
          <XIcon size={12} />
        </button>
      </div>
      {error && <p className="text-[10px] text-red-500">{error}</p>}
    </div>
  );
};
