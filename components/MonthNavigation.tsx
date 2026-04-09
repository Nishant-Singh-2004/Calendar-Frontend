'use client';

import { formatMonthYear } from '@/lib/calendar-utils';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

interface MonthNavigationProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export default function MonthNavigation({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
}: MonthNavigationProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={onPrevMonth}
        className="p-2 rounded-full hover:bg-stone-200 transition-colors duration-200"
        aria-label="Previous month"
      >
        <ChevronLeft className="w-5 h-5 text-stone-600" />
      </button>
      
      <div className="flex items-center gap-3">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-stone-800">
          {formatMonthYear(currentDate)}
        </h2>
        <button
          onClick={onToday}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-stone-100 hover:bg-stone-200 rounded-full transition-colors duration-200 text-stone-700"
        >
          <CalendarDays className="w-4 h-4" />
          <span className="hidden sm:inline">Today</span>
        </button>
      </div>
      
      <button
        onClick={onNextMonth}
        className="p-2 rounded-full hover:bg-stone-200 transition-colors duration-200"
        aria-label="Next month"
      >
        <ChevronRight className="w-5 h-5 text-stone-600" />
      </button>
    </div>
  );
}