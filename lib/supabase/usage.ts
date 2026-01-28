import { SupabaseClient } from '@supabase/supabase-js'

export interface UserUsage {
    id: string
    userId: string
    monthYear: string
    aiCount: number
    exportCount: number
}

/**
 * Checks and increments AI usage for a user
 * Returns { allowed: boolean, currentCount: number, limit: number }
 */
export async function checkAndIncrementAIUsage(
    supabase: SupabaseClient,
    userId: string,
    limit: number | null
): Promise<{ allowed: boolean; current: number }> {
    const monthYear = new Date().toISOString().substring(0, 7) // YYYY-MM

    // 1. Get or create usage record for this month
    const { data: usage, error } = await supabase
        .from('user_usage')
        .select('*')
        .eq('user_id', userId)
        .eq('month_year', monthYear)
        .maybeSingle()

    if (error) {
        console.error('Error fetching usage:', error)
        // Fail open or closed? Let's fail closed for security, but maybe open for UX.
        // Actually, if the table doesn't exist yet, we'll get an error.
        return { allowed: true, current: 0 }
    }

    const currentCount = usage?.ai_count || 0

    // 2. Check against limit (null means unlimited)
    if (limit !== null && currentCount >= limit) {
        return { allowed: false, current: currentCount }
    }

    // 3. Increment usage
    const { error: upsertError } = await supabase
        .from('user_usage')
        .upsert({
            user_id: userId,
            month_year: monthYear,
            ai_count: currentCount + 1,
            updated_at: new Date().toISOString()
        }, { onConflict: 'user_id, month_year' })

    if (upsertError) {
        console.error('Error incrementing usage:', upsertError)
    }

    return { allowed: true, current: currentCount + 1 }
}

/**
 * Gets current usage for the dashboard
 */
export async function getUserUsage(supabase: SupabaseClient, userId: string): Promise<UserUsage | null> {
    const monthYear = new Date().toISOString().substring(0, 7)
    const { data, error } = await supabase
        .from('user_usage')
        .select('*')
        .eq('user_id', userId)
        .eq('month_year', monthYear)
        .maybeSingle()

    if (error || !data) return null

    return {
        id: data.id,
        userId: data.user_id,
        monthYear: data.month_year,
        aiCount: data.ai_count,
        exportCount: data.export_count
    }
}
