export const PRICING_TIERS = [
    {
        name: 'Single Download',
        price: 4.99,
        period: 'per download',
        description: 'Perfect for a single professional resume export',
        features: [
            'Unlock 1 clean PDF/DOCX export',
            'All Standard Templates',
            'Watermark removed',
        ],
        limitations: [
            'No ongoing Resume Builder Access',
            'No Career Roadmap',
        ],
        cta: 'Buy 1 Download',
        ctaLink: '/auth/signup?tier=single',
        highlighted: false,
        paddlePriceId: process.env.NEXT_PUBLIC_PADDLE_SINGLE_PRICE_ID
    },
    {
        name: 'Download Bundle',
        price: 9.99,
        period: '5 downloads',
        description: 'Great for applying to multiple roles',
        features: [
            'Unlock 5 clean PDF/DOCX exports',
            'All Standard & Creative Templates',
            'Download history tracking',
            'Save versions of your resume',
        ],
        limitations: [
            'No Career Roadmap',
        ],
        cta: 'Buy Bundle',
        ctaLink: '/auth/signup?tier=bundle',
        highlighted: true,
        badge: 'Most Flexible',
        paddlePriceId: process.env.NEXT_PUBLIC_PADDLE_BUNDLE_PRICE_ID
    },
    {
        name: 'Power User Plan',
        price: 19.99,
        period: 'month',
        yearlyPrice: 199.99,
        description: 'Comprehensive career management',
        features: [
            'Unlimited resume tailoring',
            'Unlimited exports (PDF, DOCX)',
            'Unlimited job versions',
            'Unlimited cover letters',
            'Priority AI processing speed',
            'Full Skills Gap & Interview Simulator'
        ],
        limitations: [],
        cta: 'Go Unlimited',
        ctaLink: '/auth/signup?tier=power',
        highlighted: false,
        paddlePriceId: process.env.NEXT_PUBLIC_PADDLE_POWER_PRICE_ID
    }
]
