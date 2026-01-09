'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OutfitsPage() {
    const [generating, setGenerating] = useState(false);
    const [outfits, setOutfits] = useState([]);

    const generateOutfits = async () => {
        setGenerating(true);
        try {
            const res = await fetch('/api/outfits/generate', { method: 'POST' });
            const data = await res.json();
            // Map API response to local state or usage
            // For now, we just use the IDs to render the cards
            if (res.ok) {
                setOutfits(data.outfits);
            } else {
                alert(data.error || 'Failed to generate outfits');
            }
        } catch (e) {
            console.error(e);
            alert("Something went wrong");
        } finally {
            setGenerating(false);
        }
    };

    const saveToCalendar = async (outfitId: string) => {
        const date = prompt("Enter date (YYYY-MM-DD):", new Date().toISOString().split('T')[0]);
        if (!date) return;

        try {
            const res = await fetch('/api/calendar/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ outfitId, date })
            });

            if (res.ok) {
                alert("Outfit saved to calendar!");
                // Optionally redirect to calendar
            } else {
                alert("Failed to save to calendar");
            }
        } catch (e) {
            console.error(e);
            alert("Error saving to calendar");
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">AI Outfit Generator</h1>
                    <p className="text-neutral-400">Let AI create the perfect look for any occasion.</p>
                </div>
            </header>

            {/* Control Panel */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                <h2 className="font-bold mb-4">Select Occasion</h2>
                <div className="flex flex-wrap gap-3 mb-6">
                    {['Casual', 'Work', 'Date Night', 'Party', 'Gym'].map((tag) => (
                        <button key={tag} className="px-4 py-2 rounded-full border border-neutral-700 hover:bg-white hover:text-black transition-colors text-sm">
                            {tag}
                        </button>
                    ))}
                </div>
                <button
                    onClick={generateOutfits}
                    disabled={generating}
                    className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {generating ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>✨ Generate Outfits</>
                    )}
                </button>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {outfits.map((outfit: any) => (
                        <motion.div
                            key={outfit.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden group"
                        >
                            <div className="aspect-[4/3] bg-neutral-800 relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center gap-4">
                                    {outfit.items.map((item: any, i: number) => (
                                        <div
                                            key={item.id}
                                            className={`w-24 h-32 bg-neutral-700 rounded-lg shadow-lg relative overflow-hidden transform ${i === 0 ? '-rotate-6' : 'rotate-6'}`}
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={item.imageUrl} alt="Clothing Item" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg">{outfit.name}</h3>
                                    <span className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded">{outfit.matchScore}% Match</span>
                                </div>
                                <p className="text-sm text-neutral-400 mb-4">{outfit.description}</p>
                                <button
                                    onClick={() => (outfit as any).id && saveToCalendar((outfit as any).id)}
                                    className="w-full py-2 border border-neutral-700 rounded-lg hover:bg-white hover:text-black transition-colors font-medium"
                                >
                                    Save to Calendar
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
