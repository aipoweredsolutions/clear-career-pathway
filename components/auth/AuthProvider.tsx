'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface AuthContextType {
    user: User | null
    session: Session | null
    loading: boolean
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true,
    signOut: async () => { },
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check for mock session first (Developer Bypass)
        const isMock = document.cookie.includes('mock_session=true')

        if (isMock) {
            setUser({
                id: 'mock-user-id',
                email: 'tester@example.com',
                user_metadata: { full_name: 'Test Reviewer' },
                app_metadata: {},
                aud: 'authenticated',
                created_at: new Date().toISOString()
            } as any)
            setSession({
                access_token: 'mock-token',
                refresh_token: 'mock-refresh',
                expires_in: 3600,
                expires_at: Math.floor(Date.now() / 1000) + 3600,
                user: { id: 'mock-user-id', email: 'tester@example.com' } as any
            } as any)
            setLoading(false)
            return
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session) {
                    setUser(session.user)
                    setSession(session)
                } else {
                    setUser(null)
                    setSession(null)
                }
                setLoading(false)
            }
        )

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const signOut = async () => {
        document.cookie = "mock_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        await supabase.auth.signOut()
        router.push('/')
    }

    return (
        <AuthContext.Provider value={{ user, session, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
