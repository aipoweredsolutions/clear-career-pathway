import { useState, useEffect } from 'react'

export interface TierLimits {
    name: string
    displayName: string
    maxDocuments: number
    maxExportsPerMonth: number
    aiCreditsPerMonth: number
    proFeatures: boolean
    multiPage: boolean
    bonusAICredits: number
    effectiveAICredits: number
    currentMonthAICount: number
    currentMonthExportCount: number
    totalDocumentCount: number
    isPro: boolean
    isLifetime: boolean
}

export function useTierLimits() {
    const [limits, setLimits] = useState<TierLimits | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchLimits() {
            try {
                const res = await fetch('/api/auth/me')
                if (!res.ok) {
                    if (res.status === 401) {
                        setLoading(false)
                        return
                    }
                    throw new Error('Failed to fetch tier limits')
                }
                const data = await res.json()
                setLimits(data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchLimits()
    }, [])

    return {
        ...limits,
        tier: limits?.name,
        loading,
        error,
        aiCredits: limits ? limits.effectiveAICredits - limits.currentMonthAICount : 0
    }
}
