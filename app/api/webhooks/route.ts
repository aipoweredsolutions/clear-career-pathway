import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Paddle Webhook Secret (Public Key for Classic, or Secret for Billing)
// Assuming Paddle Billing (Modern) which uses a secret for HMAC verification
const PADDLE_WEBHOOK_SECRET = process.env.PADDLE_WEBHOOK_SECRET!

function verifyPaddleSignature(signature: string, body: string, secret: string) {
    const [tsPart, hmacPart] = signature.split(';')
    const ts = tsPart.split('=')[1]
    const hmac = hmacPart.split('=')[1]

    const signedPayload = `${ts}:${body}`
    const expectedHmac = crypto
        .createHmac('sha256', secret)
        .update(signedPayload)
        .digest('hex')

    return hmac === expectedHmac
}

export async function POST(req: NextRequest) {
    const body = await req.text()
    const signature = req.headers.get('paddle-signature') || ''

    if (!verifyPaddleSignature(signature, body, PADDLE_WEBHOOK_SECRET)) {
        console.error('Paddle Webhook Signature Verification Failed')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)
    const eventType = event.event_type
    const data = event.data

    try {
        switch (eventType) {
            case 'subscription.created':
            case 'subscription.updated': {
                const userId = data.custom_data?.userId
                if (!userId) {
                    console.error('No userId found in Paddle custom_data')
                    break
                }

                await supabase
                    .from('user_subscriptions')
                    .upsert({
                        user_id: userId,
                        paddle_subscription_id: data.id,
                        status: data.status,
                        current_period_start: data.current_billing_period?.starts_at,
                        current_period_end: data.current_billing_period?.ends_at,
                        tier_id: 'pro', // Map this based on price_id/product_id
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'user_id' })
                break
            }
            case 'subscription.canceled': {
                await supabase
                    .from('user_subscriptions')
                    .update({
                        status: 'canceled',
                        updated_at: new Date().toISOString()
                    })
                    .eq('paddle_subscription_id', data.id)
                break
            }
        }

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Paddle Webhook Error:', error)
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 })
    }
}
