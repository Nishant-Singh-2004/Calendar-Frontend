'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getRangeKey, getMonthKey } from '@/lib/calendar-utils';
import { FileText, Save, Trash2, Calendar, CalendarRange } from 'lucide-react';

interface NotesSectionProps {
  currentMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
}

export default function NotesSection({ currentMonth, startDate, endDate }: NotesSectionProps) {
  const monthKey = getMonthKey(currentMonth.getFullYear(), currentMonth.getMonth());
  const [monthlyNote, setMonthlyNote] = useLocalStorage(monthKey, '');
  
  const rangeKey = getRangeKey(startDate, endDate);
  const [rangeNote, setRangeNote] = useLocalStorage(rangeKey || '', '');
  const [localRangeNote, setLocalRangeNote] = useState('');
  
  useEffect(() => {
    setLocalRangeNote(rangeNote);
  }, [rangeNote]);
  
  const handleSaveRangeNote = () => {
    if (rangeKey) {
      setRangeNote(localRangeNote);
    }
  };
  
  const handleClearRangeNote = () => {
    if (rangeKey) {
      setRangeNote('');
      setLocalRangeNote('');
    }
  };
  
  const hasRangeSelected = startDate && endDate;
  const rangeDisplay = hasRangeSelected
    ? `${format(startDate!, 'MMM d')} - ${format(endDate!, 'MMM d, yyyy')}`
    : null;
  
  return (
    <div className="space-y-6 animate-slide-up">
      {/* Monthly Notes */}
      <div className="bg-stone-50/80 rounded-xl p-4 border border-stone-200 shadow-inner-paper">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-stone-500" />
          <h3 className="font-serif font-semibold text-stone-700">Monthly Memo</h3>
        </div>
        <textarea
          value={monthlyNote}
          onChange={(e) => setMonthlyNote(e.target.value)}
          placeholder="Jot down general notes for the month..."
          className="w-full h-28 p-3 text-sm bg-white rounded-lg border border-stone-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none"
        />
      </div>
      
      {/* Range Notes */}
      <div className="bg-stone-50/80 rounded-xl p-4 border border-stone-200 shadow-inner-paper">
        <div className="flex items-center gap-2 mb-3">
          {hasRangeSelected ? (
            <CalendarRange className="w-4 h-4 text-emerald-600" />
          ) : (
            <Calendar className="w-4 h-4 text-stone-500" />
          )}
          <h3 className="font-serif font-semibold text-stone-700">
            {hasRangeSelected ? 'Range Notes' : 'Date Range Notes'}
          </h3>
        </div>
        
        {hasRangeSelected ? (
          <div className="space-y-3">
            <div className="text-xs font-medium text-emerald-700 bg-emerald-50 inline-block px-2 py-1 rounded-full">
              {rangeDisplay}
            </div>
            <textarea
              value={localRangeNote}
              onChange={(e) => setLocalRangeNote(e.target.value)}
              placeholder={`Write a note for ${rangeDisplay}...`}
              className="w-full h-24 p-3 text-sm bg-white rounded-lg border border-stone-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveRangeNote}
                className="flex items-center gap-1 px-3 py-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                <Save className="w-3 h-3" />
                Save Note
              </button>
              <button
                onClick={handleClearRangeNote}
                className="flex items-center gap-1 px-3 py-1.5 text-xs bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Clear
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-stone-400 text-sm">
            <CalendarRange className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Select a date range on the calendar</p>
            <p className="text-xs mt-1">Click a date, then another to create a range</p>
          </div>
        )}
      </div>
      
      {/* Info */}
      <div className="text-xs text-stone-400 text-center pt-2">
        Notes are saved automatically in your browser
      </div>
    </div>
  );
}