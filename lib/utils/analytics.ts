type EventName =
    | 'template_preview'
    | 'template_use'
    | 'faq_expand'
    | 'pricing_click'
    | 'auth_signup_start'
    | 'auth_login_start'
    | 'resume_export'
    | 'ai_suggestion_use'

export const trackEvent = (eventName: EventName, properties?: Record<string, any>) => {
    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics] Event: ${eventName}`, properties)
    }

    // In production, you would send this to your analytics provider
    // e.g., PostHog, Google Analytics, Vercel Analytics
    /*
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, properties)
    }
    */
}
