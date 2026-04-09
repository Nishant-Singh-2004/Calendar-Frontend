import { useState, useCallback } from 'react';
import { startOfDay, isSameDay, isBefore } from 'date-fns';

interface UseCalendarProps {
  initialDate?: Date;
}

export function useCalendar({ initialDate = new Date() }: UseCalendarProps = {}) {
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfDay(initialDate));
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  const goToPreviousMonth = useCallback(() => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return startOfDay(newDate);
    });
    // Clear selection when month changes
    setStartDate(null);
    setEndDate(null);
  }, []);
  
  const goToNextMonth = useCallback(() => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return startOfDay(newDate);
    });
    setStartDate(null);
    setEndDate(null);
  }, []);
  
  const goToToday = useCallback(() => {
    setCurrentMonth(startOfDay(new Date()));
    setStartDate(null);
    setEndDate(null);
  }, []);
  
  const handleDateClick = useCallback((date: Date) => {
    const clickedDate = startOfDay(date);
    
    // If no start date, set start
    if (startDate === null) {
      setStartDate(clickedDate);
      setEndDate(null);
      return;
    }
    
    // If start exists but no end
    if (startDate !== null && endDate === null) {
      // If clicking same date, clear selection
      if (isSameDay(clickedDate, startDate)) {
        setStartDate(null);
        setEndDate(null);
        return;
      }
      
      // Set end date (order doesn't matter - we'll sort later)
      setEndDate(clickedDate);
      return;
    }
    
    // If both start and end exist, reset and set new start
    setStartDate(clickedDate);
    setEndDate(null);
  }, [startDate, endDate]);
  
  const clearSelection = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
  }, []);
  
  // Get ordered start and end (start <= end)
  const orderedStart = startDate && endDate && isBefore(endDate, startDate) ? endDate : startDate;
  const orderedEnd = startDate && endDate && isBefore(endDate, startDate) ? startDate : endDate;
  
  return {
    currentMonth,
    startDate: orderedStart,
    endDate: orderedEnd,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    handleDateClick,
    clearSelection,
  };
}