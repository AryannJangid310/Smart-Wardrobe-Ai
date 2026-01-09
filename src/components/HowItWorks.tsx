'use client';
import { motion } from 'framer-motion';

const steps = [
    {
        number: "01",
        title: "Upload",
        description: "Snap photos of your clothes or import from your favorite stores."
    },
    {
        number: "02",
        title: "Analyze",
        description: "Our AI identifies colors, styles, and patterns automatically."
    },
    {
        number: "03",
        title: "Curate",
        description: "Receive daily lookbooks tailored to your life and local weather."
    }
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-neutral-950 text-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-16">
                    <div className="md:w-1/2">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">How it works</h2>
                        <div className="space-y-12">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    className="flex gap-6"
                                >
                                    <div className="text-4xl font-bold text-neutral-800">{step.number}</div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                                        <p className="text-neutral-400">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="md:w-1/2 relative h-[600px] w-full bg-neutral-900 rounded-3xl overflow-hidden border border-white/5">
                        {/* Placeholder for a demo video or UI mockup */}
                        <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-mono text-sm">
                            [App Demo Interaction]
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
