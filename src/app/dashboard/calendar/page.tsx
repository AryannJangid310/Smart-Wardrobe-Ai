'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CalendarPage() {
    const [entries, setEntries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const res = await fetch('/api/calendar');
                const data = await res.json();
                if (data.success) {
                    setEntries(data.entries);
                }
            } catch (error) {
                console.error("Failed to fetch calendar entries", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEntries();
    }, []);

    // Simple calendar logic
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        return { days, firstDay };
    };

    const { days, firstDay } = getDaysInMonth(selectedDate);

    // Generate calendar grid
    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(null);
    }
    for (let i = 1; i <= days; i++) {
        calendarDays.push(i);
    }

    const getEntryForDay = (day: number) => {
        if (!day) return null;
        const targetDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
        return entries.find(e => {
            const entryDate = new Date(e.date);
            return entryDate.getDate() === targetDate.getDate() &&
                entryDate.getMonth() === targetDate.getMonth() &&
                entryDate.getFullYear() === targetDate.getFullYear();
        });
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold">Outfit Calendar</h1>
                <p className="text-neutral-400">Plan your looks for the month.</p>
            </header>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">
                        {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}
                            className="p-2 hover:bg-neutral-800 rounded-lg"
                        >
                            ←
                        </button>
                        <button
                            onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}
                            className="p-2 hover:bg-neutral-800 rounded-lg"
                        >
                            →
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-4 text-center mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                        <div key={d} className="text-neutral-500 font-medium text-sm">{d}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-4">
                    {calendarDays.map((day, i) => {
                        const entry = getEntryForDay(day as number);
                        return (
                            <div
                                key={i}
                                className={`min-h-[100px] border border-neutral-800 rounded-xl p-2 relative ${day ? 'bg-neutral-900/50 hover:bg-neutral-800/50 transition-colors' : 'border-transparent'}`}
                            >
                                {day && (
                                    <>
                                        <span className={`text-sm ${entry ? 'font-bold text-white' : 'text-neutral-500'}`}>
                                            {day}
                                        </span>
                                        {entry && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="mt-2"
                                            >
                                                <div className="w-full aspect-square rounded-lg overflow-hidden relative group cursor-pointer">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={entry.outfit.items[0]?.imageUrl}
                                                        alt="Outfit"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1">
                                                        <span className="text-[10px] text-center leading-tight">
                                                            {entry.outfit.name}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
