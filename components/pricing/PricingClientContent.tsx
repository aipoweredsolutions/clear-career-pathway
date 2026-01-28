'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export function PricingClientContent() {
    const searchParams = useSearchParams()
    const reason = searchParams.get('reason')

    useEffect(() => {
        if (reason === 'limit_reached') {
            toast.warning('Document limit reached', {
                description: 'You have reached the maximum number of resumes allowed on your current plan. Please upgrade to create more.',
                duration: 6000,
            })
        }
    }, [reason])

    return null
}
