'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { 
    isFreeTier, 
    canCreateDocument, 
    canAccessTemplate, 
    canExportInFormat,
    canUseAIFeatures,
    getRemainingUsage,
    FREE_TIER_LIMITS
} from '@/lib/utils/free-tier-restrictions'

export function useFreeTier() {
    const { user, subscription } = useAuth()
    const [usage, setUsage] = useState({
        documents: 0,
        exportsThisMonth: 0,
        aiUsageThisMonth: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) {
            setLoading(false)
            return
        }

        async function fetchUsage() {
            const supabase = createClient()
            
            // Get document count
            const { count: docCount } = await supabase
                .from('documents')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', user.id)

            // Get current month usage
            const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM
            const { data: usageData } = await supabase
                .from('user_usage')
                .select('ai_count, export_count')
                .eq('user_id', user.id)
                .eq('month_year', currentMonth)
                .single()

            setUsage({
                documents: docCount || 0,
                exportsThisMonth: usageData?.export_count || 0,
                aiUsageThisMonth: usageData?.ai_count || 0
            })
            setLoading(false)
        }

        fetchUsage()
    }, [user])

    const isFree = isFreeTier(subscription)
    const remaining = getRemainingUsage(subscription, usage)

    return {
        isFree,
        loading,
        usage,
        remaining,
        limits: FREE_TIER_LIMITS,
        canCreateDocument: () => canCreateDocument(subscription, usage.documents),
        canAccessTemplate: (templateId: string) => canAccessTemplate(templateId, subscription),
        canExportInFormat: (format: 'pdf' | 'docx') => canExportInFormat(format, subscription, usage.exportsThisMonth),
        canUseAI: () => canUseAIFeatures(subscription, usage.aiUsageThisMonth),
    }
}
