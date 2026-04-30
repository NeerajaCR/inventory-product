import React from 'react';
import { useProductStore } from '@smart-product-grid/shared';
import { Undo2, Redo2 } from 'lucide-react';

const Undo2Icon = Undo2 as any;
const Redo2Icon = Redo2 as any;

export const UndoRedoControls: React.FC = () => {
  const { undo, redo, past, future } = useProductStore();

  return (
    <div className="flex items-center bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-full px-6 py-3 gap-8">
      <div className="flex items-center gap-3 pr-8 border-r border-gray-200/50">
        <button
          onClick={undo}
          disabled={past.length === 0}
          className={`text-gray-400 hover:text-blue-600 transition-all ${past.length === 0 ? 'opacity-30 cursor-not-allowed' : 'active:scale-90'}`}
          title="Undo"
        >
          <Undo2Icon size={20} />
        </button>
        <button
          onClick={redo}
          disabled={future.length === 0}
          className={`text-gray-400 hover:text-blue-600 transition-all ${future.length === 0 ? 'opacity-30 cursor-not-allowed' : 'active:scale-90'}`}
          title="Redo"
        >
          <Redo2Icon size={20} />
        </button>
      </div>

      <div className="flex items-center gap-10">
        {['UNDO', 'REDO', 'SHORTCUTS', 'SUPPORT'].map((item) => (
          <button 
            key={item}
            className="text-[10px] font-bold text-gray-400 tracking-widest hover:text-gray-900 transition-colors"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 pl-8 border-l border-gray-200/50 ml-2">
        <div className="flex flex-col text-[8px] font-bold text-gray-300 tracking-tighter leading-none">
          <span>© 2024</span>
          <span>GRIDSYSTEM</span>
          <span>PRO</span>
        </div>
      </div>
    </div>
  );
};
