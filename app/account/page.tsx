import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AccountShell } from '@/components/account/AccountShell'

export const metadata = {
    title: 'My Account',
    description: 'Manage your profile, subscription, and usage.',
}

export default async function AccountPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth/login?redirect=/account')
    }

    // Fetch profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    // Fetch subscription + tier
    const { data: subscription } = await supabase
        .from('user_subscriptions')
        .select('*, tier:subscription_tiers(name, display_name, price_monthly, ai_improvements_per_month, max_documents, max_exports_per_month)')
        .eq('user_id', user.id)
        .maybeSingle()

    // Fetch current month usage
    const monthYear = new Date().toISOString().substring(0, 7)
    const { data: usage } = await supabase
        .from('user_usage')
        .select('ai_count, export_count')
        .eq('user_id', user.id)
        .eq('month_year', monthYear)
        .maybeSingle()

    // Fetch document count
    const { count: documentCount } = await supabase
        .from('documents')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

    // Fetch recent download history (last 10)
    const { data: downloadHistory } = await supabase
        .from('download_history')
        .select('*, document:documents(title)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

    // Fetch Paddle management URLs if subscription exists
    let managementUrls = null
    if (subscription?.paddle_subscription_id) {
        try {
            const isSandbox = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === 'sandbox'
            const baseUrl = isSandbox ? 'https://sandbox-api.paddle.com' : 'https://api.paddle.com'
            const res = await fetch(`${baseUrl}/subscriptions/${subscription.paddle_subscription_id}`, {
                headers: { Authorization: `Bearer ${process.env.PADDLE_API_KEY}` }
            })
            const json = await res.json()
            if (json.data?.management_urls) {
                managementUrls = {
                    cancelUrl: json.data.management_urls.cancel,
                    updateUrl: json.data.management_urls.update_payment_method
                }
            }
        } catch (e) {
            console.error('Failed to fetch Paddle management URLs:', e)
        }
    }

    return (
        <AccountShell
            user={{
                id: user.id,
                email: user.email ?? '',
                fullName: profile?.full_name ?? user.user_metadata?.full_name ?? '',
                createdAt: profile?.created_at ?? user.created_at,
                downloadCredits: profile?.download_credits ?? 0,
            }}
            subscription={subscription}
            usage={{
                aiCount: usage?.ai_count ?? 0,
                exportCount: usage?.export_count ?? 0,
            }}
            documentCount={documentCount ?? 0}
            downloadHistory={downloadHistory ?? []}
            managementUrls={managementUrls}
        />
    )
}
