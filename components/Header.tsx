
import React from 'react';
import { BookOpenIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-stone-800 text-white p-6 rounded-lg shadow-2xl flex items-center justify-center gap-4 border-4 border-stone-600">
      <BookOpenIcon />
      <h1 className="text-3xl md:text-5xl font-bold tracking-wider">
        My Digital Diary
      </h1>
    </header>
  );
};

export default Header;
