import posthog from 'posthog-js'

export type EventName =
    | 'template_preview'
    | 'template_use'
    | 'faq_expand'
    | 'pricing_click'
    | 'auth_signup_start'
    | 'auth_login_start'
    | 'resume_export'
    | 'ai_suggestion_use'
    | 'onboarding_started'
    | 'editor_viewed'
    | 'export_intent'
    | 'paywall_viewed'
    | 'checkout_started'

export const trackEvent = (eventName: EventName | string, properties?: Record<string, any>) => {
    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] Event: ${eventName}`, properties)
    }

    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        posthog.capture(eventName, properties)
    }
}

export const identifyUser = (userId: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        posthog.identify(userId, properties)
    }
}
