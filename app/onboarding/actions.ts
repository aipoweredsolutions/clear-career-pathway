'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveOnboardingPreferences(data: {
    goal: string | null;
    experience: string | null;
    industry: string | null;
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'User not authenticated' }
    }

    const { error } = await supabase
        .from('profiles')
        .update({
            career_goal: data.goal,
            experience_level: data.experience,
            industry: data.industry,
            has_completed_onboarding: true,
            onboarding_completed_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

    if (error) {
        console.error('Error saving onboarding preferences:', error)
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    revalidatePath('/onboarding')
    
    return { success: true }
}
