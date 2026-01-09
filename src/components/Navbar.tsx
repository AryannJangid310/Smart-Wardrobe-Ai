'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/10"
        >
            <div className="text-xl font-bold tracking-tighter text-white">
                Smart Wardrobe <span className="text-purple-400">AI</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
                <Link href="#features" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Features</Link>
                <Link href="#how-it-works" className="text-sm font-medium text-white/70 hover:text-white transition-colors">How it Works</Link>
                <Link href="#pricing" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Pricing</Link>
            </div>

            <div className="flex items-center space-x-4">
                <Link href="/login" className="text-sm font-medium text-white hover:text-purple-400 transition-colors">
                    Login
                </Link>
                <Link href="/signup" className="px-4 py-2 text-sm font-bold text-black bg-white rounded-full hover:bg-neutral-200 transition-colors">
                    Get Started
                </Link>
            </div>
        </motion.nav>
    );
}
