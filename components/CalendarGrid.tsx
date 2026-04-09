
'use client';

import { CalendarDay, getWeekdayNames } from '@/lib/calendar-utils';
import DayCell from './DayCell';

interface CalendarGridProps {
  days: CalendarDay[];
  onDateClick: (date: Date) => void;
}

export default function CalendarGrid({ days, onDateClick }: CalendarGridProps) {
  const weekdays = getWeekdayNames();
  
  // Split days into weeks (7 days per week)
  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  
  return (<>
    <div className="w-full">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {weekdays.map(day => (
          <div
            key={day}
            className="text-center py-2 text-xs font-semibold text-stone-500 tracking-wider"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="space-y-1">
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="grid grid-cols-7 gap-1">
            {week.map((day, dayIdx) => (
              <DayCell key={dayIdx} day={day} onClick={onDateClick} />
            ))}
          </div>
        ))}
      </div>
    </div></>
  );
}