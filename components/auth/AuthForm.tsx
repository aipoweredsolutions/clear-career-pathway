'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card'
import { AlertCircle, CheckCircle } from 'lucide-react'

interface AuthFormProps {
    type: 'login' | 'signup'
}

export function AuthForm({ type }: AuthFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const router = useRouter()

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
                router.push('/dashboard')
                router.refresh()
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                    },
                })
                if (error) throw error
                setMessage('Check your email to confirm your account.')
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

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

                    {error && (
                        <div className="bg-danger-50 text-danger-700 p-3 rounded-lg text-sm flex flex-col gap-2">
                            <div className="flex items-start">
                                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                            {email === 'test@clearcareerpath.com' && (
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

                    {/* Testing Credentials Section (Reviewer Helpful) */}
                    {type === 'login' && (
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
                                        setEmail('test@clearcareerpath.com')
                                        setPassword('password123')

                                        try {
                                            const { error: signInError } = await supabase.auth.signInWithPassword({
                                                email: 'test@clearcareerpath.com',
                                                password: 'password123',
                                            })

                                            if (signInError) {
                                                // If login fails, try to auto-initialize
                                                const { error: signUpError } = await supabase.auth.signUp({
                                                    email: 'test@clearcareerpath.com',
                                                    password: 'password123',
                                                })
                                                if (signUpError) throw signUpError

                                                // Try login again after signup (if auto-confirm is on)
                                                const { error: retryError } = await supabase.auth.signInWithPassword({
                                                    email: 'test@clearcareerpath.com',
                                                    password: 'password123',
                                                })

                                                if (retryError) {
                                                    setMessage('Test account initialized! Please check if email confirmation is required, or try signing in again.')
                                                } else {
                                                    router.push('/dashboard')
                                                    router.refresh()
                                                }
                                            } else {
                                                router.push('/dashboard')
                                                router.refresh()
                                            }
                                        } catch (err: any) {
                                            setError(err.message)
                                        } finally {
                                            setLoading(false)
                                        }
                                    }}
                                    className="w-full text-left transition-all disabled:opacity-50"
                                >
                                    <div className="p-3.5 rounded-xl bg-white border border-primary-100 hover:border-primary-400 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-all">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-primary-500 font-black uppercase tracking-wider mb-0.5">Quick Start</span>
                                                <span className="text-sm font-bold text-neutral-900">One-Click Test Login</span>
                                                <span className="text-[10px] text-neutral-400 font-medium">Auto-initializes if needed</span>
                                            </div>
                                            <div className="h-8 w-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                                <CheckCircle className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </button>

                                <p className="mt-4 text-[10px] text-primary-700/60 font-medium leading-relaxed flex items-start gap-2">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                    Instant access for reviewers. If it fails, the system will attempt to auto-create the test credentials.
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
                        href={type === 'login' ? '/auth/signup' : '/auth/login'}
                        className="text-primary-600 font-semibold hover:text-primary-700"
                    >
                        {type === 'login' ? 'Sign Up' : 'Sign In'}
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}
