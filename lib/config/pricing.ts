export const PRICING_TIERS = [
    {
        name: 'Free Starter',
        price: 0,
        period: 'forever',
        description: 'Perfect to get started and build your first professional resume.',
        features: [
            '2 Free Premium ATS Templates',
            'Basic Resume Builder Tools',
            'Clean PDF Export (Free Templates)',
            '1 Job Resume Version'
        ],
        limitations: [
            'No DOCX or Markdown Export',
            'No AI Bullet Tailoring',
            'No Cover Letter Generator',
            'Premium Templates Restricted'
        ],
        cta: 'Get Started Free',
        ctaLink: '/auth/signup',
        highlighted: false,
    },
    {
        name: 'Single Export',
        price: 4.99,
        period: 'one-time',
        description: 'Need just one perfect resume? Get a single premium export.',
        features: [
            'Choice of any Premium Template',
            'Single High-Quality PDF Export',
            '7-day access to Editor',
            'AI Keyword Optimization'
        ],
        limitations: [
            'Single Document Only',
            'Limited AI Tailoring'
        ],
        cta: 'Buy Single Export',
        ctaLink: '/auth/signup?tier=single',
        highlighted: false,
        paddlePriceId: process.env.NEXT_PUBLIC_PADDLE_SINGLE_PRICE_ID
    },
    {
        name: 'Pro Monthly',
        price: 14.99,
        period: 'month',
        description: 'Everything you need for an active and successful job search.',
        features: [
            'All 11+ Premium ATS Templates',
            'Unlimited Clean PDF & DOCX Exports',
            'Unlimited AI Resume Tailoring',
            'AI Cover Letter Generator',
            'Real-time ATS Compliance Scoring',
            'Unlimited Resume Versions'
        ],
        limitations: [],
        cta: 'Upgrade to Pro',
        ctaLink: '/auth/signup?tier=pro',
        highlighted: true,
        badge: 'Most Popular',
        paddlePriceId: process.env.NEXT_PUBLIC_PADDLE_POWER_PRICE_ID
    },
    {
        name: 'Lifetime Pro',
        price: 49.99,
        period: 'one-time',
        description: 'Pay once, use forever. Your complete career documentation hub.',
        features: [
            'Everything in Pro Plan, forever',
            'No recurring subscriptions',
            'Early access to Career Roadmap',
            'Early access to Interview Simulator',
            'Priority Customer Support',
            'All future updates & templates'
        ],
        limitations: [],
        cta: 'Get Lifetime Access',
        ctaLink: '/auth/signup?tier=lifetime',
        highlighted: false,
        paddlePriceId: process.env.NEXT_PUBLIC_PADDLE_BUNDLE_PRICE_ID
    }
]
