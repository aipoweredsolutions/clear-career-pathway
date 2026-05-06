'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { UserProfile } from '@/lib/types/user'

interface AuthContextType {
    user: User | null
    session: Session | null
    profile: UserProfile | null
    loading: boolean
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    profile: null,
    loading: true,
    signOut: async () => { },
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [profile, setProfile] = useState<UserProfile | null>(null)
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
            } as any)
            setProfile({
                id: 'mock-user-id',
                email: 'tester@example.com',
                full_name: 'Test Reviewer',
                subscription_tier: 'free',
                billing_status: 'none'
            } as any)
            setLoading(false)
            return
        }

        const fetchProfile = async (userId: string) => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single()
            
            if (!error && data) {
                setProfile(data)
            }
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session) {
                    setUser(session.user)
                    setSession(session)
                    await fetchProfile(session.user.id)
                } else {
                    setUser(null)
                    setSession(null)
                    setProfile(null)
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
        <AuthContext.Provider value={{ user, session, profile, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
