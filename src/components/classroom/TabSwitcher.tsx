'use client';

import { Grid, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils'; // If not using cn(), replace with clsx or template strings

interface TabSwitcherProps {
  active: 'classroom' | 'creator';
  onChange: (tab: 'classroom' | 'creator') => void;
}

export function TabSwitcher({ active, onChange }: TabSwitcherProps) {
  return (
    <div className="flex justify-center w-full py-6">
      <div className="inline-flex rounded-xl border border-gray-300 bg-white shadow-sm overflow-hidden">
        <button
          onClick={() => onChange('classroom')}
          className={cn(
            'flex items-center gap-2 px-5 py-2 text-sm font-medium transition-all duration-150',
            active === 'classroom'
              ? 'bg-white text-gray-900 shadow-inner'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          )}
        >
          <Grid className="h-4 w-4" />
          Classroom
        </button>
        <button
          onClick={() => onChange('creator')}
          className={cn(
            'flex items-center gap-2 px-5 py-2 text-sm font-medium transition-all duration-150',
            active === 'creator'
              ? 'bg-white text-gray-900 shadow-inner'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          )}
        >
          <BookOpen className="h-4 w-4" />
          Content Creator
        </button>
      </div>
    </div>
  );
}