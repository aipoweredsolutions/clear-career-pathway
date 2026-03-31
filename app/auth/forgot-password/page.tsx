'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { ArrowLeft, Mail, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
        })

        setLoading(false)

        if (error) {
            setError(error.message)
        } else {
            setSent(true)
        }
    }

    return (
        <div className="min-h-screen bg-neutral-50 pt-20 flex flex-col items-center justify-center p-4">
            {/* Ambient Background */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md">
                {/* Logo Mark */}
                <div className="flex justify-center mb-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(59,130,246,0.35)] group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-black text-neutral-900 tracking-tighter">
                            Clear Career Path
                        </span>
                    </Link>
                </div>

                <div className="bg-white rounded-3xl border border-neutral-200 shadow-xl shadow-neutral-900/5 overflow-hidden">
                    {sent ? (
                        /* ── SUCCESS STATE ── */
                        <div className="p-10 text-center">
                            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h1 className="text-2xl font-black text-neutral-900 mb-3 tracking-tight">
                                Check Your Inbox
                            </h1>
                            <p className="text-neutral-500 leading-relaxed mb-2">
                                We've sent a password reset link to:
                            </p>
                            <p className="font-bold text-neutral-900 text-lg mb-6">{email}</p>
                            <p className="text-sm text-neutral-400 leading-relaxed mb-8">
                                The link will expire in <strong className="text-neutral-600">60 minutes</strong>.
                                If you don't see the email, check your spam folder.
                            </p>

                            <div className="space-y-3">
                                <button
                                    onClick={() => { setSent(false); setEmail('') }}
                                    className="w-full py-3 border border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 font-semibold rounded-xl transition text-sm"
                                >
                                    Try a different email
                                </button>
                                <Link
                                    href="/auth/login"
                                    className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition text-sm flex items-center justify-center gap-2"
                                >
                                    Back to Sign In
                                </Link>
                            </div>
                        </div>
                    ) : (
                        /* ── FORM STATE ── */
                        <>
                            <div className="px-8 pt-8 pb-6 border-b border-neutral-100">
                                <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center mb-5">
                                    <Mail className="w-6 h-6 text-primary-600" />
                                </div>
                                <h1 className="text-2xl font-black text-neutral-900 tracking-tight mb-2">
                                    Forgot Your Password?
                                </h1>
                                <p className="text-neutral-500 text-sm leading-relaxed">
                                    No worries — enter your email and we'll send you a secure reset link instantly.
                                </p>
                            </div>

                            <div className="p-8">
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-1.5">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                                            <input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                placeholder="you@example.com"
                                                required
                                                autoFocus
                                                className="w-full pl-11 pr-4 py-3 border border-neutral-200 rounded-xl text-sm text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition placeholder:text-neutral-400"
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm font-medium">
                                            <AlertCircle className="w-5 h-5 shrink-0" />
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 active:scale-[0.98] text-white font-bold rounded-xl transition-all shadow-lg shadow-primary-200 flex items-center justify-center gap-2 disabled:opacity-60"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Sending link...
                                            </>
                                        ) : (
                                            <>
                                                <Mail className="w-4 h-4" />
                                                Send Reset Link
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>

                            <div className="px-8 pb-8 flex justify-center">
                                <Link
                                    href="/auth/login"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-400 hover:text-neutral-700 transition"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Sign In
                                </Link>
                            </div>
                        </>
                    )}
                </div>

                <p className="text-center text-xs text-neutral-400 mt-6">
                    Don&apos;t have an account?{' '}
                    <Link href="/auth/signup" className="text-primary-600 font-semibold hover:text-primary-700">
                        Sign up for free
                    </Link>
                </p>
            </div>
        </div>
    )
}
