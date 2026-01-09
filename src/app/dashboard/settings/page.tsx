'use client';

import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
    const { data: session } = useSession();

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-neutral-400">Manage your account and preferences.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Profile Section */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-6">Profile</h2>
                    <div className="flex items-center gap-4 mb-6">
                        {session?.user?.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={session.user.image} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-white/10" />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-neutral-800 flex items-center justify-center text-2xl font-bold border-2 border-white/10">
                                {session?.user?.name?.[0] || 'U'}
                            </div>
                        )}
                        <div>
                            <p className="font-bold text-lg">{session?.user?.name || 'User'}</p>
                            <p className="text-neutral-400">{session?.user?.email}</p>
                            <span className="inline-block mt-2 px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full border border-indigo-500/20">
                                Free Plan
                            </span>
                        </div>
                    </div>
                </div>

                {/* Preferences Section */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-6">Preferences</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-xl">
                            <div>
                                <p className="font-medium">Email Notifications</p>
                                <p className="text-xs text-neutral-400">Receive weekly style digests</p>
                            </div>
                            <div className="w-10 h-6 bg-green-500 rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Actions */}
                <div className="md:col-span-2 bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-6 text-red-400">Danger Zone</h2>
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div>
                            <p className="font-medium">Sign Out</p>
                            <p className="text-sm text-neutral-400">Securely log out of your account on this device.</p>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: '/login' })}
                            className="px-6 py-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors font-medium"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
