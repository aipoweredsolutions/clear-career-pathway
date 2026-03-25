import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'
import { PRICING_TIERS } from '@/lib/config/pricing'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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

function getTierFromPriceId(priceId: string) {
    const tier = PRICING_TIERS.find(t => t.paddlePriceId === priceId)
    return tier ? tier.name.toLowerCase().replace(/\s+/g, '_') : 'free'
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

    console.log(`Received Paddle Event: ${eventType}`, data)

    try {
        switch (eventType) {
            case 'subscription.created':
            case 'subscription.updated': {
                const userId = data.custom_data?.userId
                const priceId = data.items?.[0]?.price?.id

                if (!userId) {
                    console.error('No userId found in Paddle custom_data')
                    break
                }

                const tierName = getTierFromPriceId(priceId)

                // Resolve tier name to UUID
                const { data: tierData } = await supabase
                    .from('subscription_tiers')
                    .select('id')
                    .eq('name', tierName)
                    .single()

                if (!tierData) {
                    console.error(`Could not find tier for name ${tierName}`)
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
                        tier_id: tierData.id,
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'user_id' })
                break
            }

            case 'transaction.completed': {
                // Handle one-time purchases (Basic, Starter Pass)
                const userId = data.custom_data?.userId
                const priceId = data.items?.[0]?.price?.id

                if (!userId) break

                const tierName = getTierFromPriceId(priceId)
                const isSubscription = data.subscription_id !== null

                if (!isSubscription) {
                    if (tierName === 'single_download') {
                        // Add 1 credit
                        const { data: profile } = await supabase.from('profiles').select('download_credits').eq('id', userId).single()
                        const credits = (profile?.download_credits || 0) + 1
                        await supabase.from('profiles').update({ download_credits: credits }).eq('id', userId)
                        break
                    } else if (tierName === 'download_bundle') {
                        // Add 5 credits
                        const { data: profile } = await supabase.from('profiles').select('download_credits').eq('id', userId).single()
                        const credits = (profile?.download_credits || 0) + 5
                        await supabase.from('profiles').update({ download_credits: credits }).eq('id', userId)
                        break
                    }

                    // Resolve tier name to UUID for other one-time purchases
                    const { data: tierData } = await supabase
                        .from('subscription_tiers')
                        .select('id')
                        .eq('name', tierName)
                        .single()

                    if (tierName && tierData) {
                        await supabase
                            .from('user_subscriptions')
                            .upsert({
                                user_id: userId,
                                status: 'active',
                                tier_id: tierData.id,
                                updated_at: new Date().toISOString()
                                // One-time purchases don't have periods or subscription IDs
                            }, { onConflict: 'user_id' })
                    }
                }
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

