'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function ParallaxSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={ref} className="min-h-screen flex items-center justify-center relative py-20 bg-background overflow-hidden">
            {/* Background Gradient Blob */}
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <motion.div style={{ y, opacity }} className="relative z-10">
                    <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-card border border-border/50 flex flex-col justify-between shadow-2xl relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                        {/* Feature Image */}
                        <div className="absolute inset-0">
                            <img
                                src="/images/outfit-showcase.png"
                                alt="Outfit Analysis"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        </div>

                        <div className="mt-auto relative z-20 p-6">
                            <div className="space-y-3 mb-6">
                                <div className="w-3/4 h-6 bg-white/20 rounded-md backdrop-blur-md" />
                                <div className="w-full h-4 bg-white/10 rounded-md backdrop-blur-md" />
                            </div>

                            <div className="flex gap-3">
                                <div className="px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-200 text-sm backdrop-blur-md border border-indigo-500/20">#Casual</div>
                                <div className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-200 text-sm backdrop-blur-md border border-purple-500/20">#Summer</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                        AI-Powered <br />
                        <span className="text-gradient">Style Analysis</span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                        Upload your wardrobe and let our advanced computer vision algorithms detect style, color, and seasonality to curated the perfect look for any occasion.
                    </p>
                    <Link href="/dashboard" className="px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] inline-block">
                        Experience Demo
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
