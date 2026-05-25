import { createClient, createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const type = requestUrl.searchParams.get('type')
    const next = requestUrl.searchParams.get('next') ?? '/dashboard'
    const cookieStore = await cookies()
    const referralCode = cookieStore.get('referral_code')?.value

    if (code) {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.exchangeCodeForSession(code)

        // Process referral if this is a new user and we have a referral code
        if (user && referralCode) {
            const adminSupabase = createAdminClient()
            
            // 1. Find referrer
            const { data: referrer } = await adminSupabase
                .from('profiles')
                .select('id')
                .eq('referral_code', referralCode)
                .single()

            if (referrer && referrer.id !== user.id) {
                // 2. Check if this user was already referred (prevent double rewards)
                const { data: existing } = await adminSupabase
                    .from('referrals')
                    .select('id')
                    .eq('referred_id', user.id)
                    .maybeSingle()

                if (!existing) {
                    // 3. Create referral record
                    await adminSupabase.from('referrals').insert({
                        referrer_id: referrer.id,
                        referred_id: user.id,
                        status: 'rewarded',
                        rewarded_at: new Date().toISOString()
                    })

                    // 4. Award credits (Update profiles for permanent bonus)
                    // Award Referrer
                    await adminSupabase.rpc('increment_bonus_credits', { 
                        p_user_id: referrer.id, 
                        p_amount: 5 
                    })

                    // Award Referred User
                    await adminSupabase.rpc('increment_bonus_credits', { 
                        p_user_id: user.id, 
                        p_amount: 5 
                    })
                }
            }
        }
    }

    // Password recovery emails redirect here with type=recovery.
    if (type === 'recovery') {
        return NextResponse.redirect(`${requestUrl.origin}/auth/reset-password`)
    }

    const response = NextResponse.redirect(`${requestUrl.origin}${next}`)
    
    // Clear referral cookie after processing
    if (referralCode) {
        response.cookies.delete('referral_code')
    }

    return response
}
