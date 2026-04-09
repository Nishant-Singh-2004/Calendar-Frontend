'use client';

import { CalendarDay } from '@/lib/calendar-utils';
import { format } from 'date-fns';
import clsx from 'clsx';

interface DayCellProps {
  day: CalendarDay;
  onClick: (date: Date) => void;
}

export default function DayCell({ day, onClick }: DayCellProps) {
  const { date, isCurrentMonth, isToday, isStart, isEnd, isInRange, holiday } = day;
  const dayNumber = format(date, 'd');
  
  return (
    <button
      onClick={() => onClick(date)}
      disabled={!isCurrentMonth}
      className={clsx(
        'relative w-full aspect-square rounded-xl transition-all duration-200',
        'flex flex-col items-center justify-center',
        'hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-stone-400',
        !isCurrentMonth && 'opacity-40 cursor-not-allowed',
        isCurrentMonth && 'cursor-pointer',
        // Range styling
        isStart && isEnd && 'bg-gradient-to-br from-emerald-700 to-emerald-800 text-white shadow-md',
        isStart && !isEnd && 'bg-emerald-700 text-white rounded-l-xl rounded-r-none',
        isEnd && !isStart && 'bg-emerald-700 text-white rounded-r-xl rounded-l-none',
        isInRange && !isStart && !isEnd && 'bg-emerald-100 text-emerald-900',
        !isInRange && !isStart && !isEnd && isCurrentMonth && 'bg-white hover:bg-stone-50',
        isToday && !isStart && !isEnd && 'ring-2 ring-amber-500 ring-offset-2 bg-amber-50'
      )}
    >
      <span className={clsx(
        'text-sm font-medium',
        isStart || isEnd ? 'text-white' : 'text-stone-700',
        isToday && !isStart && !isEnd && 'text-amber-700 font-bold'
      )}>
        {dayNumber}
      </span>
      
      {holiday && isCurrentMonth && (
        <div className="absolute -top-1 -right-1 text-xs animate-bounce">
          {holiday.emoji}
        </div>
      )}
      
      {isToday && !isStart && !isEnd && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full" />
      )}
    </button>
  );
}