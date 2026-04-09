'use client';

import { useCalendar } from '@/hooks/useCalendar';
import { generateCalendarDays } from '@/lib/calendar-utils';
import MonthNavigation from './MonthNavigation';
import CalendarGrid from './CalendarGrid';
import HeroImage from './HeroImage';
import NotesSection from './NotesSection';

export default function Calendar() {
  const {
    currentMonth,
    startDate,
    endDate,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    handleDateClick,
    clearSelection,
  } = useCalendar();
  
  const days = generateCalendarDays(currentMonth, startDate, endDate);
  
  return (
    <div className="calendar-paper rounded-3xl p-5 md:p-8 transition-all duration-300">
      {/* Wall Calendar Aesthetic Header */}
      <div className="mb-6 relative">
        <HeroImage currentMonth={currentMonth} />
      </div>
      
      {/* Main Content: Calendar + Notes */}
      <div className="flex flex-col lg:flex-row gap-8 mt-2">
        {/* Calendar Section */}
        <div className="flex-1">
          <MonthNavigation
            currentDate={currentMonth}
            onPrevMonth={goToPreviousMonth}
            onNextMonth={goToNextMonth}
            onToday={goToToday}
          />
          
          <CalendarGrid days={days} onDateClick={handleDateClick} />
          
          {/* Clear selection button */}
          {(startDate || endDate) && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearSelection}
                className="text-xs text-stone-500 hover:text-stone-700 underline underline-offset-2 transition-colors"
              >
                Clear selection
              </button>
            </div>
          )}
        </div>
        
        {/* Notes Section */}
        <div className="lg:w-80">
          <NotesSection
            currentMonth={currentMonth}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </div>
    </div>
  );
}