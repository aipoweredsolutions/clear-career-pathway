'use client'

import { Inter } from 'next/font/google'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
                    <div className="w-24 h-24 bg-rose-100 rounded-[2.5rem] flex items-center justify-center mb-8 relative">
                        <div className="absolute inset-0 bg-rose-200 rounded-[2.5rem] blur-2xl opacity-30 -z-10 animate-pulse" />
                        <span className="text-4xl text-rose-600 font-bold">!</span>
                    </div>

                    <h1 className="text-5xl font-black text-neutral-900 mb-6 tracking-tighter uppercase italic">
                        Critical Failure
                    </h1>

                    <p className="text-neutral-500 max-w-md mb-12 font-medium leading-relaxed">
                        The application has encountered a core-level exception. This usually happens when the root system cannot initialize.
                    </p>

                    <button
                        onClick={() => reset()}
                        className="group flex items-center justify-center gap-3 bg-rose-600 text-white px-10 py-5 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-rose-700 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-rose-200"
                    >
                        Re-Initialize System
                    </button>

                    {process.env.NODE_ENV === 'development' && (
                        <div className="mt-16 p-8 bg-neutral-950 rounded-[2rem] text-left max-w-3xl w-full border border-white/10 shadow-3xl">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-4">Kernel Stack Trace</p>
                            <code className="text-xs text-emerald-400 font-mono break-all leading-relaxed opacity-80">
                                {error.stack || error.message}
                            </code>
                        </div>
                    )}
                </div>
            </body>
        </html>
    )
}
