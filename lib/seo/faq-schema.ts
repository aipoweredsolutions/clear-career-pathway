/**
 * Generates FAQPage JSON-LD structured data for AI search engines.
 * AI models like ChatGPT and Gemini use this to provide direct answers and citations.
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    }
}

/**
 * Generates HowTo JSON-LD structured data.
 * Ideal for "How to build an ATS resume" queries.
 */
export function generateHowToSchema(name: string, description: string, steps: { name: string; text: string; url?: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": name,
        "description": description,
        "step": steps.map((step, index) => ({
            "@type": "HowToStep",
            "name": step.name,
            "text": step.text,
            "position": index + 1,
            "url": step.url
        }))
    }
}
