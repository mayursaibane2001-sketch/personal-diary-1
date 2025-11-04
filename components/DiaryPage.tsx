
import React, { useState } from 'react';
import { DiaryEntry, EntryCategory } from '../types';
import { TrashIcon } from './Icons';

interface DiaryPageProps {
  entry: DiaryEntry;
  onDelete: (id: string) => void;
}

const categoryStyles: Record<EntryCategory, { bg: string, text: string, border: string }> = {
  [EntryCategory.Note]: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  [EntryCategory.Task]: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
  [EntryCategory.Goal]: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
};

const DiaryPage: React.FC<DiaryPageProps> = ({ entry, onDelete }) => {
  const [isTearing, setIsTearing] = useState(false);

  const handleDelete = () => {
    setIsTearing(true);
    setTimeout(() => {
      onDelete(entry.id);
    }, 500); // Match duration of animation
  };

  const style = categoryStyles[entry.category];
  
  return (
    <div
      className={`
        bg-white shadow-lg rounded-md p-6 flex flex-col h-96
        transition-all duration-500 ease-in-out transform-gpu
        ${isTearing ? 'rotate-[-8deg] -translate-x-full opacity-0' : 'rotate-0 translate-x-0 opacity-100'}
      `}
      style={{
        backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 2.24rem, #e5e7eb 2.25rem)`,
        backgroundSize: '100% 2.25rem',
        lineHeight: '2.25rem'
      }}
    >
      <div className="flex justify-between items-start mb-2 bg-white pb-2 -mt-2">
        <div>
          <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full border ${style.bg} ${style.text} ${style.border}`}>
            {entry.category}
          </span>
          <p className="text-sm text-stone-500 mt-2">{entry.date}</p>
        </div>
        <button
          onClick={handleDelete}
          className="text-stone-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-100"
          aria-label="Delete entry"
        >
          <TrashIcon />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto pr-2 text-stone-800 text-lg whitespace-pre-wrap">
        <p>{entry.content}</p>
      </div>
    </div>
  );
};

export default DiaryPage;
