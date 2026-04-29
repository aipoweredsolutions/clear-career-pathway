'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Lock, CheckCircle2, AlertCircle, Loader2, Eye, EyeOff, Sparkles, ShieldCheck } from 'lucide-react'

// ─── Strength indicator ──────────────────────────────────────────────────────

function getStrength(pw: string): { score: number; label: string; color: string } {
    let score = 0
    if (pw.length >= 8) score++
    if (pw.length >= 12) score++
    if (/[A-Z]/.test(pw)) score++
    if (/[0-9]/.test(pw)) score++
    if (/[^A-Za-z0-9]/.test(pw)) score++

    if (score <= 1) return { score, label: 'Weak', color: 'bg-red-400' }
    if (score <= 2) return { score, label: 'Fair', color: 'bg-amber-400' }
    if (score <= 3) return { score, label: 'Good', color: 'bg-yellow-400' }
    if (score <= 4) return { score, label: 'Strong', color: 'bg-emerald-400' }
    return { score, label: 'Very Strong', color: 'bg-emerald-500' }
}

// ─── Password Field ───────────────────────────────────────────────────────────

function PasswordField({
    id, label, value, onChange, placeholder
}: {
    id: string; label: string; value: string; onChange: (v: string) => void; placeholder?: string
}) {
    const [show, setShow] = useState(false)
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-semibold text-neutral-700 mb-1.5">
                {label}
            </label>
            <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                <input
                    id={id}
                    type={show ? 'text' : 'password'}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder ?? '••••••••'}
                    required
                    minLength={8}
                    className="w-full pl-11 pr-12 py-3 border border-neutral-200 rounded-xl text-sm text-neutral-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition placeholder:text-neutral-400"
                />
                <button
                    type="button"
                    onClick={() => setShow(s => !s)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition"
                    tabIndex={-1}
                >
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
        </div>
    )
}

// ─── Main page inner (needs useSearchParams) ──────────────────────────────────

function ResetPasswordForm() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [sessionReady, setSessionReady] = useState(false)
    const [sessionError, setSessionError] = useState(false)

    // Supabase sends the user back with a hash fragment containing the tokens.
    // onAuthStateChange fires with event="PASSWORD_RECOVERY" once the session
    // is established from that fragment — that's our signal that we can call
    // updateUser({ password }).
    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'PASSWORD_RECOVERY') {
                setSessionReady(true)
            }
        })
        const subscription = data?.subscription

        // Also handle the case where the user is already in a recovery session
        // (e.g. page refresh after fragment is consumed)
        supabase.auth.getSession().then(({ data }) => {
            const session = data?.session
            if (session) setSessionReady(true)
        })

        // Safety timeout: if no recovery event in 10s, show an error
        const timer = setTimeout(() => {
            setSessionError(prev => {
                // Only set the error if we're not already ready
                if (!sessionReady) return true
                return prev
            })
        }, 10000)

        return () => {
            subscription?.unsubscribe()
            clearTimeout(timer)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const strength = getStrength(password)
    const mismatch = confirm.length > 0 && password !== confirm

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (password !== confirm) {
            setError('Passwords do not match.')
            return
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters.')
            return
        }

        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.updateUser({ password })

        setLoading(false)
        if (error) {
            setError(error.message)
        } else {
            setDone(true)
            setTimeout(() => router.push('/dashboard'), 3000)
        }
    }

    // ── Render: invalid / expired link ───────────────────────────────────────

    if (sessionError && !sessionReady) {
        return (
            <div className="p-10 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="text-2xl font-black text-neutral-900 mb-3 tracking-tight">
                    Link Expired or Invalid
                </h1>
                <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                    This password reset link is no longer valid. Links expire after 60 minutes
                    and can only be used once. Please request a new one.
                </p>
                <Link
                    href="/auth/forgot-password"
                    className="inline-flex items-center justify-center w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition"
                >
                    Request New Reset Link
                </Link>
                <Link href="/auth/login" className="mt-4 block text-sm text-neutral-400 hover:text-neutral-700 font-semibold transition">
                    Back to Sign In
                </Link>
            </div>
        )
    }

    // ── Render: loading session ───────────────────────────────────────────────

    if (!sessionReady && !sessionError) {
        return (
            <div className="p-10 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
                <p className="text-neutral-500 text-sm">Verifying your reset link...</p>
            </div>
        )
    }

    // ── Render: success ───────────────────────────────────────────────────────

    if (done) {
        return (
            <div className="p-10 text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h1 className="text-2xl font-black text-neutral-900 mb-3 tracking-tight">
                    Password Updated!
                </h1>
                <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                    Your password has been changed successfully.
                    Redirecting you to your dashboard in a moment…
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-neutral-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Redirecting to dashboard...
                </div>
            </div>
        )
    }

    // ── Render: form ──────────────────────────────────────────────────────────

    return (
        <>
            <div className="px-8 pt-8 pb-6 border-b border-neutral-100">
                <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center mb-5">
                    <Lock className="w-6 h-6 text-primary-600" />
                </div>
                <h1 className="text-2xl font-black text-neutral-900 tracking-tight mb-2">
                    Set New Password
                </h1>
                <p className="text-neutral-500 text-sm leading-relaxed">
                    Choose a strong password. We recommend at least 12 characters with a mix of letters, numbers, and symbols.
                </p>
            </div>

            <div className="p-8">
                {/* Security badge */}
                <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 mb-6">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-semibold text-emerald-700">Secure reset link verified — set your new password below.</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <PasswordField
                        id="password"
                        label="New Password"
                        value={password}
                        onChange={setPassword}
                        placeholder="Minimum 8 characters"
                    />

                    {/* Strength meter */}
                    {password.length > 0 && (
                        <div>
                            <div className="flex gap-1.5 mb-1.5">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div
                                        key={i}
                                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : 'bg-neutral-100'}`}
                                    />
                                ))}
                            </div>
                            <p className={`text-xs font-semibold ${
                                strength.score <= 1 ? 'text-red-500' :
                                strength.score <= 2 ? 'text-amber-500' :
                                strength.score <= 3 ? 'text-yellow-600' : 'text-emerald-600'
                            }`}>
                                {strength.label} password
                            </p>
                        </div>
                    )}

                    <PasswordField
                        id="confirm"
                        label="Confirm New Password"
                        value={confirm}
                        onChange={setConfirm}
                        placeholder="Re-enter your password"
                    />

                    {/* Mismatch warning */}
                    {mismatch && (
                        <p className="text-xs text-red-500 font-semibold flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5" /> Passwords don&apos;t match
                        </p>
                    )}

                    {error && (
                        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm font-medium">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || mismatch || password.length < 8}
                        className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 active:scale-[0.98] text-white font-bold rounded-xl transition-all shadow-lg shadow-primary-200 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Updating password...</>
                        ) : (
                            <><Lock className="w-4 h-4" /> Set New Password</>
                        )}
                    </button>
                </form>
            </div>
        </>
    )
}

// ─── Page Wrapper ─────────────────────────────────────────────────────────────

export default function ResetPasswordPage() {
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
                    <Suspense fallback={
                        <div className="p-10 text-center">
                            <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
                            <p className="text-neutral-500 text-sm">Loading...</p>
                        </div>
                    }>
                        <ResetPasswordForm />
                    </Suspense>
                </div>

                <p className="text-center text-xs text-neutral-400 mt-6">
                    Remembered your password?{' '}
                    <Link href="/auth/login" className="text-primary-600 font-semibold hover:text-primary-700">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}
