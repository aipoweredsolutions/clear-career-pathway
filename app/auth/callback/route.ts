import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const type = requestUrl.searchParams.get('type')
    const next = requestUrl.searchParams.get('next') ?? '/dashboard'

    if (code) {
        const supabase = await createClient()
        await supabase.auth.exchangeCodeForSession(code)
    }

    // Password recovery emails redirect here with type=recovery.
    // Send these users to the reset-password form so they can set their new password.
    if (type === 'recovery') {
        return NextResponse.redirect(`${requestUrl.origin}/auth/reset-password`)
    }

    // All other auth callbacks (signup confirmation, magic link, OAuth)
    // redirect to the intended destination or the dashboard.
    return NextResponse.redirect(`${requestUrl.origin}${next}`)
}
