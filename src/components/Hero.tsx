'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Carousel from './Carousel';
import { motion } from 'framer-motion';

import Image from 'next/image';

export default function Hero() {
    return (
        <section className="h-screen w-full relative overflow-hidden flex items-center justify-center bg-black">
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Suspense fallback={null}>
                        <Carousel />
                    </Suspense>
                </Canvas>
            </div>

            <div className="relative z-10 text-center pointer-events-none">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-6xl md:text-8xl font-bold tracking-tighter text-white"
                >
                    Smart Wardrobe <span className="text-gradient">AI</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-4 text-xl text-neutral-300 font-light tracking-wide"
                >
                    The Future of Style
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mt-8 flex items-center justify-center gap-4 pointer-events-auto"
                >
                    <a href="/login" className="px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform duration-300">
                        Get Started
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
