'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card'
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react'

interface AuthFormProps {
    type: 'login' | 'signup'
}

// ─── Brand SVG Icons ──────────────────────────────────────────────────────────

function GoogleIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    )
}

function LinkedInIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    )
}

// ─── Auth Form ────────────────────────────────────────────────────────────────

export function AuthForm({ type }: AuthFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [oauthLoading, setOauthLoading] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const router = useRouter()
    const searchParams = useSearchParams()

    const sanitizeRedirect = (value: string | null) => {
        if (!value || !value.startsWith('/') || value.startsWith('//') || value.startsWith('/auth')) {
            return null
        }
        return value
    }

    const buildEditorTarget = () => {
        const params = new URLSearchParams()
        const template = searchParams.get('template')
        const color = searchParams.get('color')
        const sample = searchParams.get('sample')
        const documentType = searchParams.get('type')

        if (template) params.set('template', template)
        if (color) params.set('color', color)
        if (sample) params.set('sample', sample)
        if (documentType) params.set('type', documentType)

        const query = params.toString()
        return query ? `/editor/new?${query}` : null
    }

    const getPostAuthTarget = () => {
        const explicitRedirect = sanitizeRedirect(searchParams.get('redirect') || searchParams.get('next'))
        if (explicitRedirect) return explicitRedirect

        const tier = searchParams.get('tier')
        if (tier) return `/pricing?tier=${encodeURIComponent(tier)}`

        const editorTarget = buildEditorTarget()
        if (editorTarget) return editorTarget

        return type === 'signup' ? '/onboarding' : '/dashboard'
    }

    const getCallbackUrl = () => {
        const next = getPostAuthTarget()
        return `${location.origin}/auth/callback?next=${encodeURIComponent(next)}`
    }

    const getAuthSwitchHref = () => {
        const query = searchParams.toString()
        const path = type === 'login' ? '/auth/signup' : '/auth/login'
        return query ? `${path}?${query}` : path
    }

    const handleOAuthLogin = async (provider: 'google' | 'linkedin_oidc') => {
        setOauthLoading(provider)
        setError(null)
        setMessage(null)

        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: getCallbackUrl(),
                },
            })
            if (error) throw error
        } catch (err: any) {
            console.error(`${provider} OAuth error:`, err)
            if (err.message?.includes('Provider not enabled') || err.message?.includes('Unsupported provider')) {
                setError(`${provider === 'google' ? 'Google' : 'LinkedIn'} sign-in is not available yet. Please use email and password for now.`)
            } else {
                setError(err.message || `Failed to sign in with ${provider === 'google' ? 'Google' : 'LinkedIn'}`)
            }
            setOauthLoading(null)
        }
    }

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setMessage(null)

        try {
            if (type === 'login') {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
                router.push(getPostAuthTarget())
                router.refresh()
            } else {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: getCallbackUrl(),
                    },
                })
                if (error) throw error

                // Check if email confirmation is required
                if (data.user && !data.session) {
                    setMessage('Check your email to confirm your account. We will bring you back to your next step after confirmation.')
                } else if (data.session) {
                    // Auto-confirmed (email confirmation disabled in Supabase)
                    setMessage('Account created successfully. Taking you to the next step...')
                    setTimeout(() => {
                        router.push(getPostAuthTarget())
                        router.refresh()
                    }, 1500)
                } else {
                    setMessage('Account created. You can now sign in.')
                }
            }
        } catch (err: any) {
            console.error('Auth error:', err)
            // Provide human-readable errors for common Supabase issues
            if (err.message?.includes('Database error saving new user')) {
                setError('We could not finish setting up your profile. Please try again in a moment.')
            } else if (err.message?.includes('Failed to fetch')) {
                setError('Network error. Please check your connection and try again.')
            } else {
                setError(err.message || 'An error occurred during authentication')
            }
        } finally {
            setLoading(false)
        }
    }

    const isAnyLoading = loading || !!oauthLoading

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
                <h1 className="text-2xl font-bold text-neutral-900">
                    {type === 'login' ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-neutral-600 mt-2">
                    {type === 'login'
                        ? 'Sign in to access your career documents'
                        : 'Start building your professional career story'}
                </p>
            </CardHeader>

            <CardContent>
                {/* ── Social OAuth Buttons ── */}
                <div className="space-y-3 mb-6">
                    <button
                        type="button"
                        onClick={() => handleOAuthLogin('google')}
                        disabled={isAnyLoading}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border-2 border-neutral-200 rounded-xl text-sm font-bold text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {oauthLoading === 'google' ? (
                            <Loader2 className="w-5 h-5 animate-spin text-neutral-400" />
                        ) : (
                            <GoogleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        )}
                        Continue with Google
                    </button>

                    <button
                        type="button"
                        onClick={() => handleOAuthLogin('linkedin_oidc')}
                        disabled={isAnyLoading}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border-2 border-neutral-200 rounded-xl text-sm font-bold text-neutral-700 hover:border-[#0A66C2] hover:bg-blue-50/30 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {oauthLoading === 'linkedin_oidc' ? (
                            <Loader2 className="w-5 h-5 animate-spin text-[#0A66C2]" />
                        ) : (
                            <LinkedInIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        )}
                        Continue with LinkedIn
                    </button>
                </div>

                {/* ── Divider ── */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-neutral-200" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="bg-white px-4 text-neutral-400 font-bold uppercase tracking-widest">
                            or use email
                        </span>
                    </div>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        minLength={6}
                    />

                    {type === 'login' && (
                        <div className="flex justify-end -mt-2">
                            <Link
                                href="/auth/forgot-password"
                                className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    )}

                    {error && (
                        <div className="bg-danger-50 text-danger-700 p-3 rounded-lg text-sm flex flex-col gap-2">
                            <div className="flex items-start">
                                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                            {process.env.NODE_ENV === 'development' && email === 'test@clearcareerpath.com' && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="mt-1 self-start text-xs border-danger-200 text-danger-700 hover:bg-danger-100"
                                    onClick={async () => {
                                        setLoading(true)
                                        try {
                                            const { error: signUpError } = await supabase.auth.signUp({
                                                email: 'test@clearcareerpath.com',
                                                password: 'password123',
                                            })
                                            if (signUpError) throw signUpError
                                            setMessage('Test account initialized! You can now sign in.')
                                            setError(null)
                                        } catch (err: any) {
                                            setError(err.message)
                                        } finally {
                                            setLoading(false)
                                        }
                                    }}
                                >
                                    Click here to initialize/reset test account
                                </Button>
                            )}
                        </div>
                    )}

                    {message && (
                        <div className="bg-success-50 text-success-700 p-3 rounded-lg text-sm flex items-start">
                            <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                            <span>{message}</span>
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full shadow-lg shadow-primary-200/50 transition-all active:scale-[0.98]"
                        disabled={loading}
                    >
                        {loading
                            ? 'Processing...'
                            : type === 'login'
                                ? 'Sign In'
                                : 'Create Account'}
                    </Button>

                    {/* Local development shortcut */}
                    {process.env.NODE_ENV === 'development' && type === 'login' && (
                        <div className="mt-8 pt-8 border-t border-neutral-100">
                            <div className="bg-primary-50/50 rounded-2xl p-5 border border-primary-100 shadow-sm relative overflow-hidden group">
                                {/* Decor */}
                                <div className="absolute -right-4 -top-4 w-12 h-12 bg-primary-100/50 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />

                                <h3 className="text-[10px] font-black text-primary-900 uppercase tracking-[0.2em] mb-4 flex items-center justify-between">
                                    Test Environment
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-ping" />
                                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                                    </div>
                                </h3>

                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={async () => {
                                        setLoading(true)
                                        setError(null)
                                        setMessage(null)

                                        const useBypass = true; // Developer Bypass Mode

                                        try {
                                            // 1. Attempt Real Login
                                            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                                                email: 'test@clearcareerpath.com',
                                                password: 'password123',
                                            })

                                            if (!signInError && data.session) {
                                                router.push(getPostAuthTarget())
                                                router.refresh()
                                                return
                                            }

                                            // 2. Fallback to Guest Mode for ANY error (Invalid credentials, offline, etc.)
                                            if (useBypass) {
                                                console.log('Auth failed or project offline. Falling back to Guest Mode.');
                                                setMessage('Accessing via Developer Guest Mode...');

                                                // Set cookie for AuthProvider
                                                document.cookie = "mock_session=true; path=/; max-age=3600";

                                                setTimeout(() => {
                                                    window.location.href = getPostAuthTarget();
                                                }, 1000);
                                            } else {
                                                setError(signInError?.message || 'Authentication failed')
                                            }
                                        } catch (err: any) {
                                            // Catch network errors/fetch failures
                                            if (useBypass) {
                                                setMessage('Live database unreachable. Entering Guest Mode...');
                                                document.cookie = "mock_session=true; path=/; max-age=3600";
                                                setTimeout(() => { window.location.href = getPostAuthTarget(); }, 1000);
                                            } else {
                                                setError(err.message)
                                            }
                                        } finally {
                                            setLoading(false)
                                        }
                                    }}
                                    className="w-full text-left transition-all disabled:opacity-50"
                                >
                                    <div className="p-3.5 rounded-xl bg-primary-600 border border-primary-500 shadow-xl hover:bg-primary-700 transition-all transform hover:-translate-y-0.5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-primary-100 font-black uppercase tracking-wider mb-0.5">Reviewer Access</span>
                                                <span className="text-sm font-bold text-white">One-Click Test Login</span>
                                                <span className="text-[10px] text-primary-200 font-medium whitespace-nowrap">Instant Access (No DB required)</span>
                                            </div>
                                            <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
                                                <CheckCircle className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </button>

                                <p className="mt-4 text-[10px] text-primary-700/60 font-medium leading-relaxed flex items-start gap-2">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                    Reviewer access. Automatically uses <b>Guest Mode</b> if the database project is unreachable.
                                </p>
                            </div>
                        </div>
                    )}
                </form>
            </CardContent>

            <CardFooter className="justify-center">
                <p className="text-sm text-neutral-600">
                    {type === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <Link
                        href={getAuthSwitchHref()}
                        className="text-primary-600 font-semibold hover:text-primary-700"
                    >
                        {type === 'login' ? 'Sign Up' : 'Sign In'}
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}
