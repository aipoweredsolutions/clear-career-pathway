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
                        <div className="bg-danger-50 text-danger-700 p-3 rounded-lg text-sm flex items-start">
                            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                            <span>{error}</span>
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
                        className="w-full"
                        disabled={loading}
                    >
                        {loading
                            ? 'Loading...'
                            : type === 'login'
                                ? 'Sign In'
                                : 'Create Account'}
                    </Button>
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
