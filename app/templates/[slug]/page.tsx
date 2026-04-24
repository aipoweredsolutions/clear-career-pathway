import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTemplateBySlug, SEO_TEMPLATES } from '@/lib/constants/templates-seo'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react'
import { TemplateRenderer } from '@/components/templates/TemplateRenderer'
import { CAREER_SAMPLES } from '@/lib/constants/career-samples'

interface Props {
    params: Promise<{ slug: string }>
}

// 1. Dynamic SEO Metadata Generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const template = getTemplateBySlug(slug)
    
    if (!template) {
        return { title: 'Template Not Found' }
    }

    return {
        title: template.title,
        description: template.description,
        keywords: [template.name, template.industry, 'ATS resume', 'resume template', 'CV format'],
    }
}

// 2. Static path generation for build-time rendering
export async function generateStaticParams() {
    return SEO_TEMPLATES.map((t) => ({
        slug: t.slug,
    }))
}

// 3. The Page Component
export default async function TemplateLandingPage({ params }: Props) {
    const { slug } = await params
    const template = getTemplateBySlug(slug)

    if (!template) {
        notFound()
    }

    // Get the sample data based on the template config
    const sampleData = (CAREER_SAMPLES as any)[template.sampleDataKey] || CAREER_SAMPLES.software_engineer

    // Structured Data for AI SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": template.title,
        "description": template.description,
        "category": "Resume Template",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        },
        "brand": {
            "@type": "Brand",
            "name": "Clear Career Path"
        }
    }

    const faqLd = template.faqs ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": template.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    } : null

    return (
        <div className="min-h-screen bg-[#FDFDFD] pt-24 pb-20 overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {faqLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
                />
            )}
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    
                    {/* Left Column: Content */}
                    <div className="space-y-12">
                        {/* Hero Info */}
                        <div className="relative">
                            <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary-100/50 rounded-full blur-[80px] pointer-events-none" />
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success-50 text-success-700 text-sm font-black tracking-widest uppercase mb-6 shadow-sm border border-success-100">
                                <ShieldCheck className="w-4 h-4" />
                                ATS Parsing Score: {template.atsScore}%
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-950 mb-6 tracking-tighter leading-[1.1] italic">
                                {template.title}
                            </h1>
                            <p className="text-xl text-neutral-500 leading-relaxed mb-8 font-bold">
                                {template.description}
                            </p>
                            <Link href="/editor/setup">
                                <Button size="xl" className="font-black h-16 px-10 text-lg rounded-2xl shadow-xl hover:scale-105 transition-transform bg-primary-600 hover:bg-primary-700 text-white">
                                    Use This Template <ArrowRight className="w-6 h-6 ml-3" />
                                </Button>
                            </Link>
                        </div>

                        {/* Rich SEO Content */}
                        <div className="space-y-8 relative z-10">
                            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-neutral-200/20 border border-neutral-100">
                                <h2 className="text-2xl font-black text-neutral-950 mb-4 tracking-tight">Why This Template Works</h2>
                                <p className="text-neutral-600 leading-relaxed text-lg font-medium">
                                    {template.whyItWorks}
                                </p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-neutral-200/20 border border-neutral-100">
                                <h2 className="text-2xl font-black text-neutral-950 mb-4 tracking-tight">Best Used For</h2>
                                <p className="text-neutral-600 leading-relaxed mb-8 text-lg font-medium border-b border-neutral-100 pb-8">
                                    {template.bestFor}
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-4">
                                        <div className="bg-success-50 p-2 rounded-full border border-success-100">
                                            <CheckCircle2 className="w-5 h-5 text-success-600 flex-shrink-0" />
                                        </div>
                                        <span className="text-neutral-700 font-bold">Strict Single-Column Layout</span>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div className="bg-success-50 p-2 rounded-full border border-success-100">
                                            <CheckCircle2 className="w-5 h-5 text-success-600 flex-shrink-0" />
                                        </div>
                                        <span className="text-neutral-700 font-bold">Standard Web-Safe Fonts</span>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div className="bg-success-50 p-2 rounded-full border border-success-100">
                                            <CheckCircle2 className="w-5 h-5 text-success-600 flex-shrink-0" />
                                        </div>
                                        <span className="text-neutral-700 font-bold">Machine-Readable Headings</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual Preview */}
                    <div className="lg:sticky lg:top-32 space-y-8">
                        <div className="bg-neutral-900 rounded-[2.5rem] shadow-2xl border-4 border-neutral-900 overflow-hidden flex flex-col group">
                            <div className="bg-neutral-950 px-6 py-4 flex items-center justify-between border-b border-white/10">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                </div>
                                <div className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">
                                    Live {template.name} Preview
                                </div>
                                <div className="w-10"></div>
                            </div>
                            {/* Container that visually scales down the A4 page */}
                            <div className="relative w-full aspect-[8.5/11] bg-neutral-100 overflow-hidden flex items-start justify-center">
                                <div className="absolute top-0 origin-top transform scale-[0.55] sm:scale-[0.8] lg:scale-[0.65] xl:scale-[0.8] w-[180%] sm:w-[125%] lg:w-[150%] xl:w-[125%] transition-transform duration-1000 group-hover:-translate-y-8 ease-out pointer-events-none">
                                    <TemplateRenderer 
                                        templateId={template.templateId} 
                                        data={sampleData} 
                                        className="shadow-2xl mx-auto" 
                                    />
                                </div>
                                
                                {/* Overlay CTA */}
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-12 pointer-events-none">
                                    <Link href="/editor/setup" className="pointer-events-auto">
                                        <Button size="lg" variant="secondary" className="shadow-2xl font-black tracking-widest uppercase text-xs">
                                            Build With This Template
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Example Bullets Section */}
                        {template.exampleBullets && template.exampleBullets.length > 0 && (
                            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-neutral-200/20 border border-neutral-100">
                                <h2 className="text-xl font-black text-neutral-950 mb-6 tracking-tight uppercase italic">Role-Specific Keywords</h2>
                                <div className="space-y-4">
                                    {template.exampleBullets.map((bullet, idx) => (
                                        <div key={idx} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 text-neutral-600 font-medium text-sm italic">
                                            "{bullet}"
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* FAQ Section */}
                        {template.faqs && template.faqs.length > 0 && (
                            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-neutral-200/20 border border-neutral-100">
                                <h2 className="text-xl font-black text-neutral-950 mb-6 tracking-tight uppercase italic">Template Questions</h2>
                                <div className="space-y-6">
                                    {template.faqs.map((faq, idx) => (
                                        <div key={idx}>
                                            <h4 className="font-black text-neutral-900 text-sm mb-2">{faq.q}</h4>
                                            <p className="text-neutral-500 text-sm leading-relaxed">{faq.a}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>

            {/* Internal Linking Footer */}
            <section className="max-w-5xl mx-auto px-6 py-20 text-center border-t border-neutral-200 mt-32 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-100/50 rounded-full blur-[80px] pointer-events-none" />
                <h3 className="text-xl font-black text-neutral-900 mb-10 uppercase tracking-[0.2em] relative z-10">Explore Other Formats</h3>
                <div className="flex flex-wrap justify-center gap-4 relative z-10">
                    {SEO_TEMPLATES.filter(t => t.slug !== template.slug).map(t => (
                        <Link key={t.slug} href={`/templates/${t.slug}`} className="px-6 py-3 rounded-2xl bg-white border border-neutral-200 text-neutral-600 font-bold hover:border-primary-500 hover:text-primary-700 hover:shadow-xl hover:-translate-y-1 transition-all">
                            {t.title}
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    )
}
