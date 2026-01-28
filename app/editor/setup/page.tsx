'use client'

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { LogIn, UserPlus, ArrowRight, UserCircle, ShieldCheck, Zap } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'

export default function EditorSetupPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { user } = useAuth()

    const templateId = searchParams.get('template') || 'classic'
    const color = searchParams.get('color')
    const sampleId = searchParams.get('sample')

    // If user is already logged in, redirect to create a new resume
    React.useEffect(() => {
        if (user) {
            router.push(`/editor/new?template=${templateId}${color ? `&color=${color}` : ''}${sampleId ? `&sample=${sampleId}` : ''}`)
        }
    }, [user, router, templateId, color, sampleId])

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">
                {/* Option 1: Log In / Sign Up */}
                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-neutral-200 flex flex-col group hover:border-primary-500 transition-all duration-500">
                    <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-8 group-hover:scale-110 transition-transform">
                        <UserPlus className="w-8 h-8" />
                    </div>

                    <h2 className="text-3xl font-black text-neutral-900 mb-4 tracking-tight">Save Your Progress</h2>
                    <p className="text-neutral-500 mb-10 leading-relaxed font-medium">
                        Create an account to save your templates, track your applications, and access your resume from any device.
                    </p>

                    <div className="space-y-4 mt-auto">
                        <Link href={`/auth/signup?template=${templateId}${color ? `&color=${color}` : ''}${sampleId ? `&sample=${sampleId}` : ''}`} className="block">
                            <Button size="xl" className="w-full h-16 text-lg font-bold shadow-lg shadow-primary-200">
                                Create Account <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href={`/auth/login?template=${templateId}${color ? `&color=${color}` : ''}${sampleId ? `&sample=${sampleId}` : ''}`} className="block">
                            <Button variant="ghost" size="xl" className="w-full h-16 text-lg font-bold text-neutral-600">
                                Already have an account? Log In
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-8 pt-8 border-t border-neutral-100 flex items-center gap-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                        <div className="flex items-center gap-1.5 line-clamp-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                            Secure & Private
                        </div>
                        <div className="flex items-center gap-1.5 line-clamp-1">
                            <Zap className="w-3.5 h-3.5 text-amber-500" />
                            Cloud Sync
                        </div>
                    </div>
                </div>

                {/* Option 2: Guest Mode */}
                <div className="bg-neutral-900 p-10 rounded-[2.5rem] shadow-2xl flex flex-col group relative overflow-hidden">
                    {/* Abstract Background Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-[80px] -mr-32 -mt-32" />

                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform relative z-10">
                        <UserCircle className="w-8 h-8" />
                    </div>

                    <h2 className="text-3xl font-black text-white mb-4 tracking-tight relative z-10">Continue as Guest</h2>
                    <p className="text-neutral-400 mb-10 leading-relaxed font-medium relative z-10">
                        Start building instantly. Your data is stored in your browser session. You can download and pay without registering.
                    </p>

                    <div className="space-y-4 mt-auto relative z-10">
                        <Link href={`/editor/new?template=${templateId}${color ? `&color=${color}` : ''}${sampleId ? `&sample=${sampleId}` : ''}&guest=true`} className="block">
                            <Button variant="secondary" size="xl" className="w-full h-16 text-lg font-bold bg-white text-neutral-900 hover:bg-neutral-100 shadow-xl">
                                Start as Guest <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <p className="text-center text-xs font-bold text-neutral-500 uppercase tracking-widest py-3">
                            No registration required
                        </p>
                    </div>

                    <p className="mt-8 text-[10px] italic text-neutral-500 font-medium relative z-10">
                        * Note: Progress will not be saved if you close your browser before downloading.
                    </p>
                </div>
            </div>

            <Link href="/" className="mt-12 text-neutral-500 hover:text-neutral-900 font-bold flex items-center gap-2 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Templates
            </Link>
        </div>
    )
}

function ArrowLeft(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
        </svg>
    )
}
