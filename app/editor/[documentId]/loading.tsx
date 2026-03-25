import { Loader2 } from 'lucide-react'

export default function EditorLoading() {
    return (
        <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center gap-6">
            <div className="relative">
                <div className="w-20 h-20 border-4 border-primary-500/20 rounded-full animate-ping" />
                <Loader2 className="w-10 h-10 text-primary-500 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="text-center">
                <h2 className="text-xl font-black text-white uppercase tracking-[0.3em] mb-2">Deploying Editor</h2>
                <p className="text-neutral-500 font-bold text-xs uppercase tracking-widest">Building your workstation...</p>
            </div>
        </div>
    )
}
