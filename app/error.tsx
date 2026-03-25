'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RefreshCcw, Home, AlertTriangle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application Error:', error)
    }, [error])

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center mb-8 animate-bounce">
                <AlertTriangle className="w-10 h-10 text-rose-500" />
            </div>

            <h2 className="text-4xl font-black text-neutral-900 mb-4 tracking-tight uppercase italic">
                Systems Malfunction
            </h2>

            <p className="text-neutral-500 max-w-md mb-12 font-medium leading-relaxed">
                Something went wrong while processing your career data. We&apos;ve logged the technical details and our team has been notified.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => reset()}
                    className="flex items-center justify-center gap-2 bg-neutral-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-neutral-200"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Attempt Recovery
                </button>

                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 bg-white border-2 border-neutral-100 text-neutral-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-neutral-50 transition-all hover:scale-105 active:scale-95"
                >
                    <Home className="w-4 h-4" />
                    Return Base
                </Link>
            </div>

            {process.env.NODE_ENV === 'development' && (
                <div className="mt-16 p-6 bg-rose-50 border border-rose-100 rounded-3xl text-left max-w-2xl w-full">
                    <p className="text-[10px] font-black uppercase tracking-wider text-rose-400 mb-2">Technical Debug Log</p>
                    <code className="text-xs text-rose-700 font-mono break-all leading-relaxed">
                        {error.message || 'Unknown runtime exception'}
                    </code>
                    {error.digest && (
                        <p className="mt-2 text-[10px] text-rose-400">Digest: {error.digest}</p>
                    )}
                </div>
            )}
        </div>
    )
}
