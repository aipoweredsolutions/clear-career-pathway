'use client'

import React, { useState } from 'react'
import { Check, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card'
import { initializePaddle, Paddle } from '@paddle/paddle-js'
import { trackEvent } from '@/lib/utils/analytics'

interface PricingCardProps {
    tier: {
        name: string
        price: number
        period: string
        description: string
        features: string[]
        limitations: string[]
        cta: string
        ctaLink: string
        highlighted: boolean
        badge?: string
        paddlePriceId?: string
    }
    isLoggedIn: boolean
}

export function PricingCard({ tier, isLoggedIn }: PricingCardProps) {
    const [isLoading, setIsLoading] = useState(false)
    const paddleRef = React.useRef<Paddle | undefined>(undefined)

    // Lazily initialize Paddle only when needed (on first paid click)
    const getPaddle = async (): Promise<Paddle | undefined> => {
        if (paddleRef.current) return paddleRef.current
        const paddleInstance = await initializePaddle({
            environment: (process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
            token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
        })
        if (paddleInstance) {
            paddleRef.current = paddleInstance
        }
        return paddleRef.current
    }

    const handleAction = async () => {
        trackEvent('pricing_click', { tierName: tier.name, price: tier.price })

        if (!isLoggedIn) {
            window.location.href = tier.ctaLink
            return
        }

        if (!tier.paddlePriceId) {
            window.location.href = '/dashboard'
            return
        }

        setIsLoading(true)
        try {
            const paddle = await getPaddle()
            if (!paddle) {
                alert('Payment system failed to load. Please try again.')
                return
            }

            const response = await fetch('/api/auth/me')
            const userData = await response.json()
            const userId = userData.user?.id

            paddle.Checkout.open({
                items: [
                    {
                        priceId: tier.paddlePriceId,
                        quantity: 1,
                    },
                ],
                customData: {
                    userId: userId
                }
            })
        } catch (error: any) {
            console.error('Paddle Checkout error:', error)
            alert('Failed to initiate checkout. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card
            className={`flex flex-col h-full ${tier.highlighted ? 'ring-2 ring-primary-600 shadow-xl scale-105 z-10' : ''}`}
        >
            <CardHeader className="pb-6">
                {tier.highlighted && (
                    <div className="absolute top-0 right-6 transform -translate-y-1/2">
                        <div className="inline-block bg-gradient-to-r from-primary-600 to-primary-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wide">
                            {tier.badge || 'MOST POPULAR'}
                        </div>
                    </div>
                )}
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">{tier.name}</h3>
                <div className="mb-2">
                    <span className="text-4xl font-bold text-neutral-900">{tier.price === 0 ? 'Free' : `$${tier.price}`}</span>
                    <span className="text-neutral-600">/{tier.period}</span>
                </div>
                <p className="text-neutral-700 mt-2">{tier.description}</p>
            </CardHeader>

            <CardContent className="flex-1 pb-8">
                <ul className="space-y-4">
                    {tier.features.map((feature, index) => (
                        <li key={`feat-${index}`} className="flex items-start">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success-50 flex items-center justify-center mr-3 mt-0.5">
                                <Check className="w-4 h-4 text-success-600" />
                            </div>
                            <span className="text-neutral-700 leading-tight">{feature}</span>
                        </li>
                    ))}
                    {tier.limitations && tier.limitations.map((limitation, index) => (
                        <li key={`lim-${index}`} className="flex items-start opacity-60">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center mr-3 mt-0.5">
                                <X className="w-4 h-4 text-neutral-400" />
                            </div>
                            <span className="text-neutral-500 line-through leading-tight">{limitation}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>

            <CardFooter className="pt-0">
                <Button
                    variant={tier.highlighted ? 'primary' : 'outline'}
                    size="lg"
                    className="w-full"
                    onClick={handleAction}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        tier.cta
                    )}
                </Button>
            </CardFooter>
        </Card>
    )
}
