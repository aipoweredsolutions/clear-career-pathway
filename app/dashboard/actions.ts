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

    // --- CHECK DOCUMENT LIMITS ---
    const { data: sub } = await supabase
        .from('user_subscriptions')
        .select('*, tier:subscription_tiers(*)')
        .eq('user_id', session.user.id)
        .maybeSingle()

    const tier = sub?.tier as any
    const docLimit = tier?.max_documents ?? 1 // Default to 1 for free

    const { count } = await supabase
        .from('documents')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', session.user.id)

    if (docLimit !== null && (count || 0) >= docLimit) {
        // Instead of redirecting, we could throw or return an error, 
        // but since this is directly called from a form action, 
        // it's better to redirect with a param or handle in the UI.
        // For simplicity and to match current flow, let's redirect to pricing.
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
            // Normalized schema does not use a content json blob
        })
        .select()
        .single()

    if (error) {
        console.error('Error creating resume:', error)
        throw new Error('Failed to create resume')
    }

    // Optionally init empty personal_info to make fetching easier?
    // For now, we trust the fetcher to handle missing relations.

    redirect(`/editor/${data.id}`)
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
