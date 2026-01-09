export default function Footer() {
    return (
        <footer className="w-full py-8 border-t border-white/10 bg-black text-center relative z-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-neutral-500">
                        © 2025 Smart Wardrobe AI. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-neutral-500 hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="text-neutral-500 hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="text-neutral-500 hover:text-white transition-colors">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
