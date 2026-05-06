export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface UserProfile {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    subscription_tier: SubscriptionTier;
    stripe_customer_id: string | null;
    billing_status: 'active' | 'past_due' | 'canceled' | 'none';
    has_completed_onboarding: boolean;
    created_at: string;
    updated_at: string;
}
