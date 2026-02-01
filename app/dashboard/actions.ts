'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createResume() {
    const cookieStore = await cookies()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        redirect('/auth/login')
    }

    try {
        // --- ENSURE PROFILE EXISTS (Fix for legacy users) ---
        // Check if profile exists
        const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', session.user.id)
            .maybeSingle()

        if (!profile) {
            console.log('Profile missing for user, creating via RPC...')
            const { error: rpcError } = await supabase.rpc('ensure_user_profile', {
                p_user_id: session.user.id,
                p_email: session.user.email || '',
                p_full_name: session.user.user_metadata?.full_name || ''
            })

            if (rpcError) {
                console.error('Failed to ensure profile via RPC:', rpcError)
                throw new Error(`Failed to initialize user profile: ${rpcError.message}`)
            }

            // Wait a moment for the profile to be established/propagated
            await new Promise(resolve => setTimeout(resolve, 500))
        }
        // ----------------------------------------------------

        // --- CHECK DOCUMENT LIMITS ---
        let docLimit = 1 // Default to 1 for free
        let currentCount = 0

        try {
            const { data: sub } = await supabase
                .from('user_subscriptions')
                .select('*, tier:subscription_tiers(*)')
                .eq('user_id', session.user.id)
                .maybeSingle()

            const tier = sub?.tier as any
            docLimit = tier?.max_documents ?? 1

            const { count } = await supabase
                .from('documents')
                .select('id', { count: 'exact', head: true })
                .eq('user_id', session.user.id)

            currentCount = count || 0
        } catch (limitError) {
            console.warn('Could not check document limits, using defaults:', limitError)
            // Continue with default limits if subscription tables don't exist
        }

        if (docLimit !== null && currentCount >= docLimit) {
            redirect('/pricing?reason=limit_reached')
        }
        // ----------------------------

        const { data, error } = await supabase
            .from('documents')
            .insert({
                user_id: session.user.id,
                title: 'Untitled Resume',
                document_type: 'resume',
                template_id: 'classic', // Default template
            })
            .select()
            .single()

        if (error) {
            console.error('Error creating resume:', error)
            throw new Error(error.message || 'Database error during insert')
        }

        redirect(`/editor/${data.id}`)
    } catch (error: any) {
        console.error('Create resume error:', error)
        // If it's a redirect, re-throw it
        if (error.message?.includes('NEXT_REDIRECT') || error.digest?.startsWith('NEXT_REDIRECT')) {
            throw error
        }
        // Otherwise, show the ACTUAL error
        throw new Error(`Unable to create resume: ${error.message}`)
    }
}

export async function deleteResume(resumeId: string) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )

    const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', resumeId)

    if (error) {
        console.error('Error deleting resume:', error)
        throw new Error('Failed to delete resume')
    }

    revalidatePath('/dashboard')
}
