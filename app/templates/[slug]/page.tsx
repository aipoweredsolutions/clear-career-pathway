import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTemplateBySlug, SEO_TEMPLATES } from '@/lib/constants/templates-seo'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, ShieldCheck, ArrowRight, Tag, BookOpen, Briefcase, Wrench, Layout } from 'lucide-react'
import { ScrollableDevicePreview } from '@/components/home/ScrollableDevicePreview'
import { getSampleDataForTemplate } from '@/lib/utils/template-sample-data'

interface Props {
    params: Promise<{ slug: string }>
}

// ── 1. METADATA ────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const template = getTemplateBySlug(slug)
    if (!template) return { title: 'Template Not Found' }

    const roleKeywords = [
        template.title,
        `${template.title.toLowerCase()} 2025`,
        `free ${template.title.toLowerCase()}`,
        `${template.industry} resume`,
        `${template.industry} CV`,
        `${template.name} resume template`,
        `ATS ${template.industry} resume`,
        `free ${template.industry} resume example`,
        `how to write a ${template.industry} resume`,
        `${template.industry} resume keywords`,
        ...template.keySkills.slice(0, 6),
        'ATS resume template',
        'resume template 2025',
    ]

    return {
        title: `${template.title} | Free ATS-Optimised | Clear Career Path`,
        description: template.description,
        keywords: roleKeywords,
        openGraph: {
            title: `${template.title} | Free ATS-Optimised`,
            description: template.description,
            type: 'website',
            url: `https://www.clearcareerpath.com/templates/${template.slug}`,
            ...(template.previewImage && {
                images: [{ url: `https://www.clearcareerpath.com${template.previewImage}`, width: 1200, height: 630, alt: template.title }],
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title: `${template.title} | Free ATS-Optimised`,
            description: template.description,
        },
        alternates: {
            canonical: `https://www.clearcareerpath.com/templates/${template.slug}`,
        },
    }
}

// ── 2. STATIC PARAMS ───────────────────────────────────────────────────────────
export async function generateStaticParams() {
    return SEO_TEMPLATES.map(t => ({ slug: t.slug }))
}

// ── 3. PAGE ────────────────────────────────────────────────────────────────────
export default async function TemplateLandingPage({ params }: Props) {
    const { slug } = await params
    const template = getTemplateBySlug(slug)
    if (!template) notFound()

    const sampleData = getSampleDataForTemplate(template.templateId, template.sampleDataKey)

    // Related templates (use relatedSlugs — not all templates)
    const relatedTemplates = SEO_TEMPLATES.filter(
        t => template.relatedSlugs.includes(t.slug) && t.slug !== template.slug
    )

    // ── STRUCTURED DATA ──────────────────────────────────────────────────────
    const productLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: template.title,
        description: template.description,
        category: 'Resume Template',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
        },
        brand: { '@type': 'Brand', name: 'Clear Career Path' },
    }

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.clearcareerpath.com' },
            { '@type': 'ListItem', position: 2, name: 'Resume Examples', item: 'https://www.clearcareerpath.com/resume-examples' },
            { '@type': 'ListItem', position: 3, name: template.title, item: `https://www.clearcareerpath.com/templates/${template.slug}` },
        ],
    }

    // HowTo schema — points to each unique how-to sub-section
    const howToLd = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `How to Write a ${template.title} in 2025`,
        description: `Step-by-step guide to writing an ATS-optimised ${template.title}.`,
        step: [
            {
                '@type': 'HowToStep',
                name: 'Write Your Professional Summary',
                text: template.howToWrite.intro,
                position: 1,
            },
            {
                '@type': 'HowToStep',
                name: 'Structure Your Work Experience',
                text: template.howToWrite.experience,
                position: 2,
            },
            {
                '@type': 'HowToStep',
                name: 'Build Your Skills Section',
                text: template.howToWrite.skills,
                position: 3,
            },
            {
                '@type': 'HowToStep',
                name: 'Format and Length',
                text: template.howToWrite.formatting,
                position: 4,
            },
        ],
    }

    const faqLd = template.faqs?.length
        ? {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: template.faqs.map(faq => ({
                  '@type': 'Question',
                  name: faq.q,
                  acceptedAnswer: { '@type': 'Answer', text: faq.a },
              })),
          }
        : null

    const imageLd = template.previewImage
        ? {
              '@context': 'https://schema.org',
              '@type': 'ImageObject',
              contentUrl: `https://www.clearcareerpath.com${template.previewImage}`,
              description: `Preview of the ${template.name} resume layout`,
              name: template.name,
          }
        : null

    const howToSteps = [
        { icon: BookOpen,  label: 'Your Summary',      content: template.howToWrite.intro },
        { icon: Briefcase, label: 'Work Experience',   content: template.howToWrite.experience },
        { icon: Wrench,    label: 'Skills Section',    content: template.howToWrite.skills },
        { icon: Layout,    label: 'Format & Length',   content: template.howToWrite.formatting },
    ]

    return (
        <div className="min-h-screen bg-[#FDFDFD] pt-24 pb-20 overflow-x-hidden">
            {/* Structured Data */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
            {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
            {imageLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageLd) }} />}

            <div className="max-w-[1400px] mx-auto px-6">

                {/* ── BREADCRUMB ── */}
                <nav className="text-[11px] text-neutral-400 font-bold uppercase tracking-widest mb-10 flex items-center gap-2">
                    <Link href="/" className="hover:text-neutral-600">Home</Link>
                    <span>/</span>
                    <Link href="/resume-examples" className="hover:text-neutral-600">Resume Examples</Link>
                    <span>/</span>
                    <span className="text-neutral-600">{template.title}</span>
                </nav>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    {/* ── LEFT COLUMN (Editorial Flow) ── */}
                    <div className="lg:col-span-7 space-y-16 pb-12">
                        {/* Hero */}
                        <div className="relative">
                            <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary-100/50 rounded-full blur-[80px] pointer-events-none" />
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success-50 text-success-700 text-sm font-black tracking-widest uppercase mb-6 shadow-sm border border-success-100">
                                <ShieldCheck className="w-4 h-4" />
                                ATS Parsing Score: {template.atsScore}%
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-950 mb-6 tracking-tighter leading-[1.05] italic">
                                {template.title}
                            </h1>
                            <p className="text-xl text-neutral-500 leading-relaxed mb-8 font-bold">
                                {template.description}
                            </p>
                            <div className="flex flex-wrap gap-3 mb-8">
                                {[
                                    { icon: CheckCircle2, label: 'Free to Download' },
                                    { icon: ShieldCheck,  label: '100% ATS Compliant' },
                                    { icon: CheckCircle2, label: 'Customise in Minutes' },
                                ].map(({ icon: Icon, label }) => (
                                    <div key={label} className="flex items-center gap-2 text-sm text-neutral-600 font-bold bg-white border border-neutral-100 px-3 py-1.5 rounded-full shadow-sm">
                                        <Icon className="w-3.5 h-3.5 text-emerald-500" />
                                        {label}
                                    </div>
                                ))}
                            </div>
                            <Link href={`/editor/setup?template=${template.templateId}`} className="inline-block lg:hidden w-full mb-8">
                                <Button size="xl" className="w-full font-black h-16 text-lg rounded-2xl shadow-xl bg-primary-600 hover:bg-primary-700 text-white">
                                    Use This Template <ArrowRight className="w-6 h-6 ml-3" />
                                </Button>
                            </Link>
                        </div>

                        {/* Why It Works (Inline Editorial) */}
                        <section>
                            <h2 className="text-2xl font-black text-neutral-950 mb-4 tracking-tight">Why This Format Works</h2>
                            <p className="text-neutral-600 leading-relaxed text-[16px] font-medium mb-4">{template.whyItWorks}</p>
                            <p className="text-neutral-600 leading-relaxed text-[16px] font-medium mb-6">{template.bestFor}</p>
                            
                            <div className="grid sm:grid-cols-2 gap-4">
                                {['Strict Single-Column Layout', 'Standard Web-Safe Fonts', 'Machine-Readable Headings', 'No Tables or Text Boxes'].map(item => (
                                    <div key={item} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-neutral-100 shadow-sm">
                                        <div className="bg-success-50 p-1 rounded-full border border-success-100 shrink-0">
                                            <CheckCircle2 className="w-4 h-4 text-success-600" />
                                        </div>
                                        <span className="text-neutral-700 font-bold text-[13px]">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="h-px bg-neutral-200 w-full" />

                        {/* ── HOW TO WRITE (Vertical Timeline) ── */}
                        <section>
                            <h2 className="text-3xl font-black text-neutral-950 mb-8 tracking-tight">
                                How to Write a {template.title} in 2025
                            </h2>
                            <div className="relative pl-4 sm:pl-8 border-l-2 border-primary-100 space-y-12">
                                {howToSteps.map(({ icon: Icon, label, content }, index) => (
                                    <div key={label} className="relative">
                                        {/* Timeline Node */}
                                        <div className="absolute -left-[35px] sm:-left-[51px] w-12 h-12 bg-white rounded-full border-4 border-[#FDFDFD] shadow-sm flex items-center justify-center top-0">
                                            <div className="w-8 h-8 bg-primary-50 rounded-full border border-primary-100 flex items-center justify-center text-primary-600 font-black text-sm">
                                                {index + 1}
                                            </div>
                                        </div>
                                        
                                        <div className="pt-2">
                                            <h3 className="text-xl font-black text-neutral-900 mb-3 flex items-center gap-2">
                                                <Icon className="w-5 h-5 text-primary-500" />
                                                {label}
                                            </h3>
                                            <p className="text-neutral-600 leading-relaxed text-[16px] font-medium">{content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="h-px bg-neutral-200 w-full" />

                        {/* ── ATS KEYWORDS ── */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-primary-50 rounded-xl border border-primary-100 flex items-center justify-center shrink-0">
                                    <Tag className="w-5 h-5 text-primary-600" />
                                </div>
                                <h2 className="text-2xl font-black text-neutral-950 tracking-tight">
                                    Target ATS Keywords
                                </h2>
                            </div>
                            <p className="text-neutral-500 text-[15px] font-medium mb-6 leading-relaxed">
                                These are the exact terms applicant tracking systems and recruiters search for when hiring for {template.industry.toLowerCase()} roles. Mirror this vocabulary where you have genuine experience.
                            </p>
                            <div className="flex flex-wrap gap-2.5">
                                {template.keySkills.map(skill => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 rounded-xl bg-white border border-neutral-200 text-neutral-700 text-[13px] font-black tracking-wide shadow-sm hover:border-primary-300 hover:text-primary-700 transition-colors cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* ── EXAMPLE ACHIEVEMENT BULLETS ── */}
                        {template.exampleBullets && template.exampleBullets.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-black text-neutral-950 mb-3 tracking-tight">
                                    Example Achievement Bullets
                                </h2>
                                <p className="text-neutral-500 text-[15px] font-medium mb-6">
                                    Strong bullets follow the formula: <strong className="text-neutral-900">action + context + measurable outcome</strong>. Use these as structural benchmarks.
                                </p>
                                <div className="space-y-4">
                                    {template.exampleBullets.map((bullet, idx) => (
                                        <div key={idx} className="flex gap-4 p-5 bg-white rounded-2xl border-l-4 border-l-primary-500 border-y border-r border-neutral-200 shadow-sm">
                                            <span className="text-primary-400 font-black shrink-0 text-xl leading-none">"</span>
                                            <p className="text-neutral-700 font-medium text-[15px] leading-relaxed italic pr-4">{bullet}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* ── RIGHT COLUMN — Sticky Preview ── */}
                    <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6 relative pb-12">
                        <div className="bg-neutral-900 rounded-[2.5rem] shadow-2xl border-4 border-neutral-900 overflow-hidden flex flex-col group relative">
                            <div className="bg-neutral-950 px-6 py-4 flex items-center justify-between border-b border-white/10">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                </div>
                                <div className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">
                                    Live {template.name} Preview
                                </div>
                                <div className="w-10" />
                            </div>
                            <ScrollableDevicePreview 
                                templateId={template.templateId}
                                sampleData={sampleData}
                            />
                            
                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8 pointer-events-none z-10">
                                <Link href={`/editor/setup?template=${template.templateId}`} className="pointer-events-auto">
                                    <Button size="lg" variant="secondary" className="shadow-2xl font-black tracking-widest uppercase text-xs">
                                        Build With This Template
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* CTA card */}
                        <div className="bg-neutral-950 p-8 rounded-3xl text-white relative overflow-hidden hidden lg:block">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-primary-600/20 rounded-full blur-[60px]" />
                            <h3 className="text-xl font-black mb-3 relative z-10">Ready to build yours?</h3>
                            <p className="text-neutral-400 text-sm font-medium mb-6 leading-relaxed relative z-10">
                                Open this template in the editor pre-filled with {template.industry}-specific content.
                                Swap in your details, refine with AI, download as PDF.
                            </p>
                            <Link href={`/editor/setup?template=${template.templateId}`} className="relative z-10 inline-flex w-full">
                                <Button size="lg" className="w-full font-black bg-white text-neutral-950 hover:bg-neutral-100 shadow-xl">
                                    Use This Template Free <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ── FULL WIDTH BOTTOM SECTIONS ── */}
                <div className="max-w-4xl mx-auto space-y-20">
                    {/* ── FAQ ── */}
                    {template.faqs && template.faqs.length > 0 && (
                        <section className="pt-10">
                            <h2 className="text-3xl font-black text-neutral-950 mb-8 tracking-tight text-center">
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-4">
                                {template.faqs.map((faq, idx) => (
                                    <details key={idx} className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:border-primary-200 transition-colors">
                                        <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-black text-neutral-900 text-[16px] list-none">
                                            {faq.q}
                                            <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center shrink-0 ml-4 group-open:bg-primary-50">
                                                <ArrowRight className="w-4 h-4 text-neutral-500 group-open:rotate-90 group-open:text-primary-600 transition-all" />
                                            </div>
                                        </summary>
                                        <div className="px-6 pb-6 text-neutral-600 text-[15px] leading-relaxed font-medium">
                                            <div className="pt-2 border-t border-neutral-100">{faq.a}</div>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ── RELATED TEMPLATES ── */}
                    {relatedTemplates.length > 0 && (
                        <section className="pt-10 border-t border-neutral-200">
                            <h2 className="text-2xl font-black text-neutral-900 mb-8 tracking-tight text-center uppercase">
                                Related {template.industry} Resume Examples
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {relatedTemplates.map(t => (
                                    <Link
                                        key={t.slug}
                                        href={`/templates/${t.slug}`}
                                        className="group bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm hover:shadow-xl hover:border-primary-300 hover:-translate-y-1 transition-all flex flex-col"
                                    >
                                        <h3 className="font-black text-neutral-900 text-lg mb-1 group-hover:text-primary-600 transition-colors">
                                            {t.title}
                                        </h3>
                                        <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-widest mb-4">{t.industry}</p>
                                        <div className="flex flex-wrap gap-1.5 mt-auto">
                                            {t.keySkills.slice(0, 3).map(skill => (
                                                <span key={skill} className="text-[11px] font-bold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-md">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="text-center mt-10">
                                <Link href="/resume-examples" className="text-[15px] font-black text-primary-600 hover:text-primary-700 underline underline-offset-4">
                                    View all resume examples →
                                </Link>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}
