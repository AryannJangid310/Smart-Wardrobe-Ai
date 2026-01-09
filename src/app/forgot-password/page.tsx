'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type ResetMethod = 'email' | 'mobile';

export default function ForgotPasswordPage() {
    const [method, setMethod] = useState<ResetMethod>('email');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'request' | 'verify'>('request');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    method,
                    email: method === 'email' ? email : undefined,
                    mobile: method === 'mobile' ? mobile : undefined
                }),
            });

            if (res.ok) {
                if (method === 'mobile' && step === 'request') {
                    setStep('verify');
                } else {
                    setIsSubmitted(true);
                }
            } else {
                const data = await res.json();
                alert(data.message || 'Request failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-pink-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-orange-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
                    <p className="text-white/60">
                        {isSubmitted
                            ? "Check your inbox/messages!"
                            : "Choose how you want to reset your password"}
                    </p>
                </div>

                {!isSubmitted ? (
                    <>
                        {/* Method Toggle */}
                        <div className="flex p-1 mb-6 bg-white/5 rounded-xl border border-white/10">
                            <button
                                onClick={() => { setMethod('email'); setStep('request'); }}
                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${method === 'email'
                                    ? 'bg-white text-black shadow-lg'
                                    : 'text-white/60 hover:text-white'
                                    }`}
                            >
                                Email
                            </button>
                            <button
                                onClick={() => { setMethod('mobile'); setStep('request'); }}
                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${method === 'mobile'
                                    ? 'bg-white text-black shadow-lg'
                                    : 'text-white/60 hover:text-white'
                                    }`}
                            >
                                Mobile OTP
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <AnimatePresence mode="wait">
                                {method === 'email' ? (
                                    <motion.div
                                        key="email"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-2"
                                    >
                                        <label className="text-sm font-medium text-white/80">Email Address</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-pink-500 text-white placeholder-white/30 transition-colors"
                                            placeholder="name@example.com"
                                            required
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="mobile"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-4"
                                    >
                                        {step === 'request' ? (
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-white/80">Mobile Number</label>
                                                <input
                                                    type="tel"
                                                    value={mobile}
                                                    onChange={(e) => setMobile(e.target.value)}
                                                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-white/30 transition-colors"
                                                    placeholder="+1 (555) 000-0000"
                                                    required
                                                />
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-white/80">Enter OTP</label>
                                                <input
                                                    type="text"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-white/30 transition-colors text-center tracking-widest text-xl"
                                                    placeholder="000000"
                                                    maxLength={6}
                                                    required
                                                />
                                                <p className="text-xs text-white/40 text-center">
                                                    Code sent to {mobile}
                                                </p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-4 px-6 bg-gradient-to-r text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${method === 'email'
                                    ? 'from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 shadow-rose-500/20'
                                    : 'from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-orange-500/20'
                                    }`}
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                                ) : (
                                    method === 'email'
                                        ? 'Send Reset Link'
                                        : (step === 'request' ? 'Send OTP' : 'Verify & Reset')
                                )}
                            </button>
                        </form>
                    </>
                ) : (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center py-8"
                    >
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                            <span className="text-2xl">✓</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Request Sent!</h3>
                        <p className="text-white/60 mb-6">
                            {method === 'email'
                                ? `We've sent a password reset link to ${email}`
                                : "Password reset successfully!"}
                        </p>
                    </motion.div>
                )}

                <div className="mt-8 text-center">
                    <Link href="/login" className="text-white/40 hover:text-white font-medium transition-colors text-sm">
                        ← Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
