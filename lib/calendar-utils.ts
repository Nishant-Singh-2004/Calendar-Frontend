import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  getDay, 
  addDays, 
  subDays,
  format,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  startOfDay,
  endOfDay,
  differenceInDays
} from 'date-fns';

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  holiday?: Holiday;
}

export interface Holiday {
  name: string;
  emoji: string;
}

// Predefined holidays for demonstration
const HOLIDAYS: Record<string, Holiday> = {
  '01-01': { name: "New Year's Day", emoji: "🎉" },
  '01-26': { name: "Republic Day", emoji: "🇮🇳" },
  '02-14': { name: "Valentine's Day", emoji: "💕" },
  '03-08': { name: "Women's Day", emoji: "🌸" },
  '03-17': { name: "St. Patrick's Day", emoji: "🍀" },
  '04-01': { name: "April Fools", emoji: "😂" },
  '05-01': { name: "Labor Day", emoji: "⚒️" },
  '06-19': { name: "Juneteenth", emoji: "✊🏾" },
  '07-04': { name: "Independence Day", emoji: "🎆" },
  '08-15': { name: "Independence Day (IN)", emoji: "🇮🇳" },
  '10-31': { name: "Halloween", emoji: "🎃" },
  '11-01': { name: "All Saints' Day", emoji: "🕯️" },
  '12-25': { name: "Christmas", emoji: "🎄" },
  '12-31': { name: "New Year's Eve", emoji: "🎊" },
};

export function getHolidayForDate(date: Date): Holiday | undefined {
  const key = format(date, 'MM-dd');
  return HOLIDAYS[key];
}

export function generateCalendarDays(
  currentDate: Date,
  startDate: Date | null,
  endDate: Date | null
): CalendarDay[] {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  
  // Get the first day of the month's weekday (0 = Sunday)
  const startWeekday = getDay(monthStart);
  
  // Get days from previous month to fill the first week
  const daysFromPrevMonth = startWeekday;
  const prevMonthDays: Date[] = [];
  for (let i = daysFromPrevMonth; i > 0; i--) {
    prevMonthDays.push(subDays(monthStart, i));
  }
  
  // Days in current month
  const currentMonthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get days from next month to fill remaining cells (6 rows * 7 = 42 cells)
  const totalCells = 42;
  const remainingCells = totalCells - (prevMonthDays.length + currentMonthDays.length);
  const nextMonthDays: Date[] = [];
  const lastDayOfMonth = monthEnd;
  for (let i = 1; i <= remainingCells; i++) {
    nextMonthDays.push(addDays(lastDayOfMonth, i));
  }
  
  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  const today = startOfDay(new Date());
  
  return allDays.map(date => {
    const isCurrentMonth = isSameMonth(date, currentDate);
    let isStart = false;
    let isEnd = false;
    let isInRange = false;
    
    if (startDate && endDate && isCurrentMonth) {
      const normalizedDate = startOfDay(date);
      const normalizedStart = startOfDay(startDate);
      const normalizedEnd = startOfDay(endDate);
      
      isStart = isSameDay(normalizedDate, normalizedStart);
      isEnd = isSameDay(normalizedDate, normalizedEnd);
      
      if (normalizedStart <= normalizedEnd) {
        isInRange = isWithinInterval(normalizedDate, { start: normalizedStart, end: normalizedEnd });
      } else {
        isInRange = isWithinInterval(normalizedDate, { start: normalizedEnd, end: normalizedStart });
      }
    } else if (startDate && !endDate && isCurrentMonth) {
      isStart = isSameDay(startOfDay(date), startOfDay(startDate));
    }
    
    const holiday = getHolidayForDate(date);
    
    return {
      date,
      isCurrentMonth,
      isToday: isSameDay(date, today),
      isStart,
      isEnd,
      isInRange,
      holiday,
    };
  });
}

export function formatMonthYear(date: Date): string {
  return format(date, 'MMMM yyyy');
}

export function getWeekdayNames(): string[] {
  return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
}

export function getRangeKey(start: Date | null, end: Date | null): string | null {
  if (!start || !end) return null;
  const startStr = format(start, 'yyyy-MM-dd');
  const endStr = format(end, 'yyyy-MM-dd');
  return `range_${startStr}_to_${endStr}`;
}

export function getMonthKey(year: number, month: number): string {
  return `monthly_note_${year}-${month.toString().padStart(2, '0')}`;
}