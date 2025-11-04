
import React from 'react';
import { EntryCategory } from '../types';

interface FilterControlsProps {
  currentFilter: EntryCategory | 'all';
  onFilterChange: (filter: EntryCategory | 'all') => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ currentFilter, onFilterChange }) => {
  const filters: (EntryCategory | 'all')[] = ['all', EntryCategory.Note, EntryCategory.Task, EntryCategory.Goal];

  const getButtonClass = (filter: EntryCategory | 'all') => {
    const baseClass = "capitalize px-4 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 shadow-sm";
    if (currentFilter === filter) {
      return `${baseClass} bg-stone-800 text-white scale-110`;
    }
    return `${baseClass} bg-white text-stone-700 hover:bg-stone-200`;
  };

  return (
    <div className="flex items-center bg-stone-300 p-2 rounded-full shadow-inner gap-2">
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={getButtonClass(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterControls;
