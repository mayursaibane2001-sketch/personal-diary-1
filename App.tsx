
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { DiaryEntry, EntryCategory } from './types';
import Header from './components/Header';
import FilterControls from './components/FilterControls';
import NewEntryForm from './components/NewEntryForm';
import DiaryPage from './components/DiaryPage';
import { PlusCircleIcon } from './components/Icons';


const App: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [filter, setFilter] = useState<EntryCategory | 'all'>('all');
  const [isAdding, setIsAdding] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedEntries = localStorage.getItem('diaryEntries');
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      }
    } catch (error) {
      console.error("Failed to load entries from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('diaryEntries', JSON.stringify(entries));
    } catch (error) {
      console.error("Failed to save entries to localStorage", error);
    }
  }, [entries]);

  const addEntry = useCallback((entry: Omit<DiaryEntry, 'id' | 'date'>) => {
    const newEntry: DiaryEntry = {
      ...entry,
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };
    setEntries(prev => [newEntry, ...prev]);
    setIsAdding(false);
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  }, []);

  const filteredEntries = useMemo(() => {
    if (filter === 'all') {
      return entries;
    }
    return entries.filter(entry => entry.category === filter);
  }, [entries, filter]);

  return (
    <div className="min-h-screen bg-stone-100/50">
      <div className="container mx-auto p-4 md:p-8 max-w-7xl">
        <Header />

        {isAdding ? (
          <NewEntryForm onSave={addEntry} onCancel={() => setIsAdding(false)} />
        ) : (
          <>
            <div className="my-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <FilterControls currentFilter={filter} onFilterChange={setFilter} />
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
              >
                <PlusCircleIcon />
                New Entry
              </button>
            </div>
            
            {filteredEntries.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEntries.map(entry => (
                    <DiaryPage key={entry.id} entry={entry} onDelete={deleteEntry} />
                ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl text-stone-600">No entries yet.</h2>
                    <p className="text-stone-500 mt-2">Click "New Entry" to start your diary!</p>
                </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
