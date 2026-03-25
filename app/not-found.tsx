import Link from 'next/link'
import { FileSearch, Home, ArrowRight } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-24 h-24 bg-primary-50 rounded-[2.5rem] flex items-center justify-center mb-10 relative">
                <div className="absolute inset-0 bg-primary-200 rounded-[2.5rem] blur-2xl opacity-20 -z-10 animate-pulse" />
                <FileSearch className="w-12 h-12 text-primary-500" />
            </div>

            <h1 className="text-6xl font-black text-neutral-900 mb-6 tracking-tighter uppercase italic">
                404 <span className="text-primary-500">Lost</span>
            </h1>

            <p className="text-neutral-500 max-w-sm mb-12 font-medium leading-relaxed">
                The document or page you are looking for has been archived or moved to a different sector.
            </p>

            <Link
                href="/"
                className="group flex items-center justify-center gap-3 bg-neutral-900 text-white px-10 py-5 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-neutral-200"
            >
                <Home className="w-4 h-4" />
                Back to Dashboard
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="mt-20 grid grid-cols-2 gap-8 text-left opacity-40">
                <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-2">Coordinate A</p>
                    <div className="h-0.5 w-12 bg-neutral-200 rounded-full" />
                </div>
                <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-2">Coordinate B</p>
                    <div className="h-0.5 w-12 bg-neutral-200 rounded-full" />
                </div>
            </div>
        </div>
    )
}
