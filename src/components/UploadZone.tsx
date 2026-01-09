'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeImageAction, uploadItem } from '@/app/actions';
import { useRouter } from 'next/navigation';

export default function UploadZone() {
    const router = useRouter();
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any>(null);

    const handleSave = async () => {
        if (!file) return;
        setIsSaving(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const result = await uploadItem(formData);

            if (result.success) {
                router.push('/dashboard/wardrobe');
            } else {
                alert("Failed to save item: " + result.error);
                setIsSaving(false);
            }
        } catch (e) {
            console.error(e);
            alert("An unexpected error occurred");
            setIsSaving(false);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFile = async (file: File) => {
        setFile(file);
        setAnalyzing(true);
        setAnalysisResult(null);

        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64 = reader.result as string;
                const result = await analyzeImageAction(base64);
                if (result.success) {
                    setAnalysisResult(result.data);
                }
                setAnalyzing(false);
            };
        } catch (e) {
            console.error(e);
            setAnalyzing(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <motion.div
                layout
                className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${dragActive ? 'border-indigo-500 bg-indigo-500/10 scale-[1.02]' : 'border-neutral-700 hover:border-neutral-500 bg-neutral-900/50'
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {!file && (
                    <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                        accept="image/*"
                    />
                )}

                <AnimatePresence mode="wait">
                    {file ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="space-y-6"
                        >
                            <div className="w-32 h-32 mx-auto bg-neutral-800 rounded-xl overflow-hidden relative shadow-lg">
                                {/* In real app, use URL.createObjectURL(file) */}
                                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                                    👕
                                </div>
                                {analyzing && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                    </div>
                                )}
                            </div>

                            <div>
                                <p className="text-xl font-bold text-white">{file.name}</p>
                                <p className="text-sm text-neutral-400">
                                    {analyzing ? "AI Analyzing patterns & colors..." : "Analysis Complete"}
                                </p>
                            </div>

                            {!analyzing && analysisResult && (
                                <div className="grid grid-cols-2 gap-4 text-left bg-neutral-800/50 p-4 rounded-xl border border-neutral-700">
                                    <div>
                                        <span className="text-xs text-neutral-500 uppercase tracking-wider">Category</span>
                                        <p className="font-medium text-indigo-400">{analysisResult.category}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-neutral-500 uppercase tracking-wider">Color</span>
                                        <p className="font-medium text-pink-400">{analysisResult.color}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-xs text-neutral-500 uppercase tracking-wider">Style Tags</span>
                                        <div className="flex gap-2 mt-1">
                                            {analysisResult.tags.map((tag: string) => (
                                                <span key={tag} className="bg-white/10 px-2 py-1 rounded text-xs">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!analyzing && (
                                <div className="flex gap-4 justify-center pt-4">
                                    <button
                                        onClick={() => setFile(null)}
                                        className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="px-6 py-2 rounded-full bg-white text-black font-bold hover:bg-neutral-200 transition-colors shadow-lg shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {isSaving ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            "Add to Wardrobe"
                                        )}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-4"
                        >
                            <div className="w-20 h-20 bg-neutral-800 rounded-full mx-auto flex items-center justify-center shadow-inner">
                                <span className="text-3xl">📤</span>
                            </div>
                            <div>
                                <p className="text-lg font-bold text-white">Upload Clothing Item</p>
                                <p className="text-sm text-neutral-400 mt-1">Drag & drop or click to browse</p>
                            </div>
                            <div className="text-xs text-neutral-600">
                                Supported: JPG, PNG, WEBP
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
