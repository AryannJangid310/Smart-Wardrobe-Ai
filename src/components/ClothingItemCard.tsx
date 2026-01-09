import { motion } from 'framer-motion';

interface ClothingItem {
    id: string;
    name: string;
    category: string;
    color: string;
    imageUrl?: string;
}

export default function ClothingItemCard({ item }: { item: ClothingItem }) {
    return (
        <div className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-600 transition-colors">
            <div className="aspect-[3/4] bg-neutral-800 relative overflow-hidden">
                {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-4xl bg-neutral-800">
                        👕
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                    <button className="w-full py-2 bg-white text-black rounded-lg font-bold text-sm">
                        Generate Outfit
                    </button>
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-bold text-lg text-white truncate">{item.name}</h3>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-neutral-400">{item.category}</span>
                    <div
                        className="w-4 h-4 rounded-full border border-neutral-700"
                        style={{ backgroundColor: item.color }}
                        title={item.color}
                    />
                </div>
            </div>
        </div>
    );
}
