import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { SEO_TEMPLATES, INDUSTRY_DESCRIPTIONS } from '@/lib/constants/templates-seo'
import { Briefcase, ArrowRight, Star, ShieldCheck, Zap, CheckCircle2, Tag } from 'lucide-react'

// ── METADATA ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
    title: 'Free Resume Examples by Job Title & Industry 2025 | Clear Career Path',
    description: 'Browse 50+ free, ATS-optimised resume examples for every job title and industry. Each example is built around real job postings with role-specific keywords, recruiter-approved formatting, and a live preview. Customise and download in minutes.',
    keywords: [
        'resume examples', 'resume templates 2025', 'CV examples', 'ATS resume',
        'free resume examples', 'resume examples by industry', 'job-specific resume',
        'professional resume examples', 'resume samples 2025', 'how to write a resume',
        'resume examples by job title', 'best resume format 2025',
    ],
    openGraph: {
        title: 'Free Resume Examples by Job Title 2025 | Clear Career Path',
        description: 'Browse 50+ free ATS-optimised resume examples. Every industry, every job title, ready to customise.',
        type: 'website',
        url: 'https://www.clearcareerpath.com/resume-examples',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Resume Examples by Job Title 2025 | Clear Career Path',
        description: 'Browse 50+ free ATS-optimised resume examples for every job title.',
    },
    alternates: { canonical: 'https://www.clearcareerpath.com/resume-examples' },
}

// ── STRUCTURED DATA ──────────────────────────────────────────────────────────
const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Free Resume Examples by Job Title & Industry 2025',
    description: 'Browse 50+ free, ATS-optimised resume examples for every job title and industry.',
    url: 'https://www.clearcareerpath.com/resume-examples',
    publisher: { '@type': 'Organization', name: 'Clear Career Path', url: 'https://www.clearcareerpath.com' },
}

const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.clearcareerpath.com' },
        { '@type': 'ListItem', position: 2, name: 'Resume Examples', item: 'https://www.clearcareerpath.com/resume-examples' },
    ],
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Are these resume examples free to use?',
            acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every resume example on this page is completely free to customise and download as a PDF. No payment is required for the core experience.' },
        },
        {
            '@type': 'Question',
            name: 'Are the resume templates ATS-compliant?',
            acceptedAnswer: { '@type': 'Answer', text: 'Yes. All templates score 90%+ on ATS parsers including Workday, Greenhouse, Lever and iCIMS. They use standard section headings, web-safe fonts, and single-column layouts with no tables, text boxes or graphics that confuse parsers.' },
        },
        {
            '@type': 'Question',
            name: 'Which resume example is best for my job?',
            acceptedAnswer: { '@type': 'Answer', text: 'Use the category navigation to filter by your industry. Each example is tailored with role-specific keywords and section order for that profession. If you are changing careers, choose the example closest to your target role rather than your current one.' },
        },
        {
            '@type': 'Question',
            name: 'How do I tailor a resume example to my experience?',
            acceptedAnswer: { '@type': 'Answer', text: 'Click any example and hit "Use This Template". The editor opens pre-filled with industry-appropriate placeholder content. Replace each section with your own details, use the AI bullet writer to strengthen your achievements, then download your finished PDF.' },
        },
        {
            '@type': 'Question',
            name: 'What is the best resume format in 2025?',
            acceptedAnswer: { '@type': 'Answer', text: 'The reverse-chronological format remains the standard preferred by both ATS software and recruiters in 2025. Lead with your most recent role, follow with education, then skills and additional sections. Functional or hybrid formats are appropriate for career changers or those with significant employment gaps.' },
        },
    ],
}

// ── SERVER DATA ──────────────────────────────────────────────────────────────
function getPageData() {
    const unique = [...SEO_TEMPLATES]
        .sort((a, b) => {
            if (a.industry !== 'General' && b.industry === 'General') return -1
            if (a.industry === 'General' && b.industry !== 'General') return 1
            return 0
        })
        .reduce((acc, cur) => {
            if (!acc.find(x => x.templateId === cur.templateId)) acc.push(cur)
            return acc
        }, [] as typeof SEO_TEMPLATES)

    const industries = Array.from(new Set(unique.map(t => t.industry))).sort((a, b) => {
        if (a === 'General') return -1
        if (b === 'General') return 1
        return a.localeCompare(b)
    })

    return { unique, industries }
}

// ── PAGE ─────────────────────────────────────────────────────────────────────
export default function ResumeExamplesPage() {
    const { unique, industries } = getPageData()
    const totalCount = SEO_TEMPLATES.length

    return (
        <div className="min-h-screen bg-[#FDFDFD] pt-20 pb-20">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

            <div className="max-w-7xl mx-auto px-6">

                {/* ── HERO ── */}
                <header className="text-center mb-10 relative">
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-100/30 rounded-full blur-[100px] pointer-events-none" />
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-[10px] font-black tracking-widest uppercase mb-4 border border-primary-100 relative z-10">
                        <Star className="w-3.5 h-3.5 fill-primary-600" />
                        Recruiter-Approved · Updated for 2025
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-neutral-950 mb-4 tracking-tighter leading-none italic relative z-10">
                        Resume Examples <br />
                        <span className="text-primary-600">Built to Get Interviews.</span>
                    </h1>
                    <p className="text-lg text-neutral-500 max-w-2xl mx-auto font-bold leading-relaxed relative z-10">
                        {totalCount}+ free, ATS-optimised resume examples — each one built around real job postings,
                        role-specific keywords, and the formatting patterns that pass automated screening in 2025.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 mt-6 relative z-10">
                        {[
                            { icon: ShieldCheck, text: '100% ATS Compliant', color: 'text-emerald-600' },
                            { icon: CheckCircle2, text: 'Free to Download', color: 'text-primary-600' },
                            { icon: Zap, text: 'AI-Powered Writing', color: 'text-amber-600' },
                        ].map(({ icon: Icon, text, color }) => (
                            <div key={text} className="flex items-center gap-2 text-sm text-neutral-500 font-bold">
                                <Icon className={`w-4 h-4 ${color}`} />
                                {text}
                            </div>
                        ))}
                    </div>
                </header>

                {/* ── INTRO COPY ── */}
                <section className="max-w-3xl mx-auto mb-14 bg-white rounded-3xl border border-neutral-100 p-8 shadow-sm">
                    <h2 className="text-xl font-black text-neutral-900 mb-4 tracking-tight">How to Use These Resume Examples</h2>
                    <div className="text-neutral-600 text-[15px] leading-relaxed space-y-3 font-medium">
                        <p>
                            Every resume example below was built around actual job descriptions and recruiter feedback
                            from that industry. We analysed hundreds of real job postings to identify the keywords,
                            section order, and formatting that applicant tracking systems score highest for each role.
                        </p>
                        <p>
                            Click any example to open a full live preview including role-specific{' '}
                            <strong className="text-neutral-800">ATS keywords</strong>, a four-part{' '}
                            <strong className="text-neutral-800">how-to writing guide</strong>, and{' '}
                            <strong className="text-neutral-800">example achievement bullets</strong> for that role.
                            Hit <strong className="text-neutral-800">{"\"Use This Template\""}</strong> to open it in the editor
                            pre-filled with industry content, then swap in your own details and download.
                        </p>
                        <p>
                            Not sure which example fits? Start with your industry category below, then choose the template
                            whose layout matches the seniority level you are targeting.
                        </p>
                    </div>
                </section>

                {/* ── STICKY CATEGORY NAV ── */}
                <nav
                    className="sticky top-20 z-40 bg-[#FDFDFD]/80 backdrop-blur-md py-4 mb-12 border-b border-neutral-100 overflow-x-auto no-scrollbar -mx-6 px-6"
                    aria-label="Industry categories"
                >
                    <div className="flex items-center gap-2 min-w-max">
                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mr-4">Jump To:</span>
                        {industries.map(industry => (
                            <a
                                key={industry}
                                href={`#${industry.toLowerCase().replace(/\s+/g, '-')}`}
                                className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 hover:bg-primary-50 hover:text-primary-600 transition-all whitespace-nowrap border border-transparent hover:border-primary-100"
                            >
                                {industry}
                            </a>
                        ))}
                    </div>
                </nav>

                {/* ── INDUSTRY GRIDS ── */}
                <div className="grid gap-16">
                    {industries.map(industry => {
                        const templates = unique.filter(t => t.industry === industry)
                        const industryId = industry.toLowerCase().replace(/\s+/g, '-')
                        const desc = INDUSTRY_DESCRIPTIONS[industry]

                        return (
                            <section key={industry} id={industryId} className="scroll-mt-48" aria-labelledby={`heading-${industryId}`}>

                                {/* Industry Header */}
                                <div className="mb-5">
                                    <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 mb-4">
                                        <div className="p-1.5 bg-neutral-900 rounded-lg text-white">
                                            <Briefcase className="w-4 h-4" aria-hidden="true" />
                                        </div>
                                        <h2 id={`heading-${industryId}`} className="text-lg font-black text-neutral-950 tracking-tight italic uppercase">
                                            {desc?.heading || `${industry} Resume Examples`}
                                        </h2>
                                        <div className="flex-1 h-px bg-neutral-100 hidden md:block ml-3" />
                                        <span className="text-neutral-400 font-black text-[9px] uppercase tracking-[0.2em]">
                                            {templates.length} Example{templates.length !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                    {/* Industry description — unique text per section */}
                                    {desc?.body && (
                                        <p className="text-neutral-500 text-[14px] font-medium leading-relaxed max-w-3xl">
                                            {desc.body}
                                        </p>
                                    )}
                                </div>

                                {/* Template List */}
                                <div className="flex flex-col gap-3">
                                    {templates.map(template => (
                                        <Link
                                            key={template.slug}
                                            href={`/templates/${template.slug}`}
                                            className="group bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-300 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 relative overflow-hidden"
                                            aria-label={`View ${template.title}`}
                                        >
                                            {/* Left: Title & Description */}
                                            <div className="flex-1 min-w-0 z-10">
                                                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                                                    <h3 className="text-[17px] font-black text-neutral-950 tracking-tight group-hover:text-primary-600 transition-colors">
                                                        {template.title.replace('ATS Resume Template for ', '').replace(' Resume Example', ' Resume')}
                                                    </h3>
                                                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                                                        <ShieldCheck className="w-3 h-3" /> ATS {template.atsScore}%
                                                    </span>
                                                    <span className="inline-flex items-center gap-1 bg-neutral-50 text-neutral-500 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border border-neutral-200">
                                                        {template.name}
                                                    </span>
                                                </div>
                                                <p className="text-[13px] font-medium text-neutral-500 line-clamp-1">
                                                    {template.description}
                                                </p>
                                            </div>

                                            {/* Middle: Key Skills */}
                                            <div className="flex items-center gap-2 shrink-0 md:w-[35%] lg:w-[40%] z-10">
                                                <div className="flex flex-wrap gap-1.5 w-full">
                                                    {template.keySkills.slice(0, 4).map(skill => (
                                                        <span key={skill} className="whitespace-nowrap inline-flex items-center text-[10px] font-bold text-neutral-600 bg-neutral-50 border border-neutral-200 px-2 py-1 rounded-md transition-colors group-hover:bg-white group-hover:border-primary-100">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                    {template.keySkills.length > 4 && (
                                                        <span className="whitespace-nowrap inline-flex items-center text-[10px] font-bold text-neutral-400 px-1 py-1">
                                                            +{template.keySkills.length - 4} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Right: Arrow */}
                                            <div className="hidden md:flex items-center justify-end shrink-0 w-8 text-neutral-300 group-hover:text-primary-600 transition-colors transform group-hover:translate-x-1 z-10">
                                                <ArrowRight className="w-5 h-5" />
                                            </div>

                                            {/* Background hover effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary-50/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )
                    })}
                </div>

                {/* ── FAQ ── */}
                <section className="max-w-3xl mx-auto mt-20 mb-12" aria-labelledby="faq-heading">
                    <h2 id="faq-heading" className="text-2xl font-black text-neutral-900 mb-8 tracking-tight text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: 'Are these resume examples free to use?',
                                a: 'Yes. Every resume example on this page is completely free. Open any example in the editor, customise it with your own details, and download as a PDF — no payment required for the core experience.',
                            },
                            {
                                q: 'Are the resume templates ATS-compliant?',
                                a: 'All templates score 90%+ on ATS parsers including Workday, Greenhouse, Lever, and iCIMS. They use standard section headings (Work Experience, Education, Skills), web-safe fonts, and machine-readable layouts with no tables, text boxes, or graphics that confuse parsers.',
                            },
                            {
                                q: 'Which resume example is best for my job?',
                                a: 'Filter by your industry using the category navigation above. Each example is built around real job postings for that role and uses the specific keywords recruiters look for. If you are changing careers, choose the example closest to your target role rather than your current one.',
                            },
                            {
                                q: 'How do I tailor a resume example to my experience?',
                                a: 'Click any example and hit "Use This Template". The editor opens pre-filled with industry-appropriate placeholder content. Replace each section with your own details, use the AI bullet writer to strengthen your achievements, then download your finished PDF.',
                            },
                            {
                                q: 'What is the best resume format in 2025?',
                                a: 'The reverse-chronological format remains the standard preferred by both ATS software and recruiters in 2025. Lead with your most recent role, follow with education, then skills and additional sections. Functional or hybrid formats are appropriate for career changers — see the Career Change Resume Example above.',
                            },
                        ].map(({ q, a }) => (
                            <details key={q} className="group bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
                                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-black text-neutral-900 text-[15px] list-none">
                                    {q}
                                    <ArrowRight className="w-4 h-4 text-neutral-400 group-open:rotate-90 transition-transform shrink-0 ml-4" />
                                </summary>
                                <div className="px-6 pb-5 text-neutral-600 text-[15px] leading-relaxed font-medium">
                                    {a}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>

                {/* ── FINAL CTA ── */}
                <div className="mt-8 p-10 md:p-16 rounded-[3rem] bg-neutral-950 text-white text-center relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/5">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-[0.9] tracking-tighter uppercase italic">
                            Ready to Land <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-primary-200 to-white">
                                Your Next Interview?
                            </span>
                        </h2>
                        <p className="text-neutral-400 mb-10 text-lg max-w-xl mx-auto font-bold leading-relaxed">
                            Build your resume in minutes. Download as a perfect PDF. No design skills required.
                        </p>
                        <Link href="/editor/setup" className="inline-flex items-center gap-3 bg-white text-neutral-950 px-10 py-5 rounded-xl font-black text-lg hover:bg-neutral-100 hover:scale-105 transition-all shadow-2xl">
                            Build My Resume — Free
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
