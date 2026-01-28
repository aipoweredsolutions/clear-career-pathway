import { SupabaseClient } from '@supabase/supabase-js'
import { UserSubscription } from '@/lib/types/resume'

/**
 * Fetches the user's current subscription from Supabase
 */
export async function fetchUserSubscription(supabase: SupabaseClient, userId: string): Promise<UserSubscription | null> {
    const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*, tier:subscription_tiers(name)')
        .eq('user_id', userId)
        .maybeSingle()

    if (error || !data) {
        if (error) console.error('Error fetching subscription:', error)
        return null
    }

    const tierName = (data.tier as any)?.name || 'free'

    // Map snake_case from DB to camelCase for the app
    return {
        id: data.id,
        userId: data.user_id,
        tierId: tierName, // Use the name as the tierId in the app
        paddleSubscriptionId: data.paddle_subscription_id,
        paddleCustomerId: data.paddle_customer_id,
        status: data.status,
        currentPeriodStart: data.current_period_start,
        currentPeriodEnd: data.current_period_end,
        createdAt: data.created_at,
        updatedAt: data.updated_at
    }
}



/**
 * Checks if a user has access to a specific feature or template
 */
export function hasPremiumAccess(subscription: UserSubscription | null): boolean {
    if (!subscription) return false

    // Check if subscription is active
    if (subscription.status !== 'active') {
        // We might want to allow past_due for a grace period, but let's be strict for now
        return false
    }

    // Check if the tier is 'premium' or 'pro'
    return subscription.tierId === 'premium' || subscription.tierId === 'pro'
}

/**
 * Checks if a user can export a document based on their tier
 */
export function canExportFormat(subscription: UserSubscription | null, format: 'pdf' | 'docx' | 'md' | 'html'): boolean {
    const tier = subscription?.tierId || 'free'

    if (format === 'pdf') return true // Everyone can PDF (maybe watermarked)

    if (format === 'docx') {
        return tier === 'starter' || tier === 'premium' || tier === 'pro' || tier === 'basic'
    }

    if (format === 'md' || format === 'html') {
        return tier === 'premium' || tier === 'pro'
    }

    return false
}

