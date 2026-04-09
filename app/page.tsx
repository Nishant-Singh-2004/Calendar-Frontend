'use client';

import Calendar from '@/components/Calendar';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200 py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Calendar />
      </div>
    </main>
  );
}