'use client';
import { motion } from 'framer-motion';

const features = [
    {
        title: "AI Outfit Curation",
        description: "Get personalized outfit recommendations every morning based on the weather and your schedule.",
        icon: "✨"
    },
    {
        title: "Digital Wardrobe",
        description: "Digitize your entire closet. Mix and match items on your phone before you even get dressed.",
        icon: "📱"
    },
    {
        title: "Style Analytics",
        description: "Understand your wearing habits. See what you wear most and what's gathering dust.",
        icon: "📊"
    },
    {
        title: "Smart Shopping",
        description: "Get suggestions for new items that perfectly complement what you already own.",
        icon: "🛍️"
    }
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-black text-white relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Everything you need to <span className="text-purple-400">elevate your style</span></h2>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        Powerful features designed to help you look your best with zero effort.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-3xl bg-neutral-900/50 border border-white/10 hover:border-purple-500/50 hover:bg-neutral-900/80 transition-all duration-300 group"
                        >
                            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                            <p className="text-neutral-400 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
