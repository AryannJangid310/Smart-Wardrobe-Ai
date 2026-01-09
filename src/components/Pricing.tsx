'use client';
import { motion } from 'framer-motion';

const plans = [
    {
        name: "Free",
        price: "$0",
        features: ["Up to 50 items", "Basic outfit generation", "Weekly digest"],
        popular: false
    },
    {
        name: "Pro",
        price: "$5",
        period: "/mo",
        features: ["Unlimited items", "Advanced AI styling", "Weather integration", "Travel packing lists"],
        popular: true
    },
    {
        name: "Lifetime",
        price: "$149",
        period: "one-time",
        features: ["Everything in Pro", "Priority support", "Early access features", "Founder badge"],
        popular: false
    }
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-black text-white relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple Pricing</h2>
                    <p className="text-xl text-neutral-400">Start for free, upgrade for style mastery.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`p-8 rounded-3xl border ${plan.popular ? 'border-purple-500 bg-neutral-900 relative' : 'border-neutral-800 bg-neutral-950'} flex flex-col`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                            <div className="flex items-baseline mb-6">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                {plan.period && <span className="text-neutral-500 ml-1 text-sm">{plan.period}</span>}
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-sm text-neutral-300">
                                        <svg className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular
                                ? 'bg-white text-black hover:scale-105'
                                : 'bg-neutral-800 text-white hover:bg-neutral-700'
                                }`}>
                                Choose {plan.name}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
