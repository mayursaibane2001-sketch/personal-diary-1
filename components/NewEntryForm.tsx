
import React, { useState } from 'react';
import { DiaryEntry, EntryCategory } from '../types';

interface NewEntryFormProps {
  onSave: (entry: Omit<DiaryEntry, 'id' | 'date'>) => void;
  onCancel: () => void;
}

const NewEntryForm: React.FC<NewEntryFormProps> = ({ onSave, onCancel }) => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<EntryCategory>(EntryCategory.Note);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSave({ content, category });
      setContent('');
      setCategory(EntryCategory.Note);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white shadow-xl rounded-lg p-6 animate-fade-in"
      style={{
        backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 2.49rem, #e5e7eb 2.5rem)`,
        backgroundSize: '100% 2.5rem',
      }}
    >
      <div className="bg-white pb-4">
        <h2 className="text-2xl font-bold text-stone-700">What's on your mind?</h2>
        <p className="text-stone-500">Choose a category for your new entry.</p>

        <div className="flex flex-wrap gap-4 my-4">
          {Object.values(EntryCategory).map(cat => (
            <div key={cat}>
              <input
                type="radio"
                id={cat}
                name="category"
                value={cat}
                checked={category === cat}
                onChange={() => setCategory(cat)}
                className="hidden peer"
              />
              <label
                htmlFor={cat}
                className="capitalize inline-block px-4 py-2 rounded-full border-2 cursor-pointer transition-all peer-checked:bg-stone-800 peer-checked:text-white peer-checked:border-stone-800"
              >
                {cat}
              </label>
            </div>
          ))}
        </div>
      </div>

      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Start writing here..."
        className="w-full h-64 bg-transparent border-none focus:ring-0 resize-none text-xl p-0 text-stone-800 placeholder-stone-400"
        style={{ lineHeight: '2.5rem' }}
      />
      
      <div className="flex justify-end gap-4 mt-4 bg-white pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 rounded-full text-stone-700 bg-stone-200 hover:bg-stone-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-full bg-green-600 text-white font-bold hover:bg-green-700 transition-colors disabled:bg-stone-400"
          disabled={!content.trim()}
        >
          Save Entry
        </button>
      </div>
    </form>
  );
};

export default NewEntryForm;
