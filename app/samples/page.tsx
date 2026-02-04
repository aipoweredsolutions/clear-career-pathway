import React from 'react'
import { CAREER_SAMPLES } from '@/lib/constants/career-samples'
import { SampleCard } from '@/components/samples/SampleCard'
import { Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata = {
    title: 'Resume Samples & Examples',
    description: 'Explore high-performing resume samples for various careers. Expertly crafted for ATS compatibility and recruiter impact.',
}

export default function SamplesPage() {
    const samples = [
        {
            data: CAREER_SAMPLES.software_engineer,
            category: 'Technology',
            description: 'A technical high-impact resume focused on infrastructure, performance metrics, and deep tech stacks.'
        },
        {
            data: CAREER_SAMPLES.marketing_manager,
            category: 'Marketing',
            description: 'Modern, balanced design highlighting growth metrics, brand management, and digital transformation.'
        },
        {
            data: CAREER_SAMPLES.sales_executive,
            category: 'Sales',
            description: 'Professional traditional layout designed to showcase quota attainment, relationship building, and revenue growth.'
        },
        {
            data: CAREER_SAMPLES.graphic_designer,
            category: 'Creative',
            description: 'Artistic offset layout showcasing brand identity expertise and a refined aesthetic approach.'
        },
        {
            data: CAREER_SAMPLES.education_expert,
            category: 'Education',
            description: 'Comprehensive academic layout for teachers and educators, focusing on curriculum and student outcomes.'
        },
        {
            data: CAREER_SAMPLES.healthcare_professional,
            category: 'Healthcare',
            description: 'Detailed clinical layout emphasizing patient care, certifications, and healthcare management.'
        },
        {
            data: CAREER_SAMPLES.graduate,
            category: 'Entry Level',
            description: 'Clean academic-focused layout for recent graduates, prioritizing education and internships.'
        }
    ]

    return (
        <div className="min-h-screen bg-neutral-50 pt-24 pb-20">
            {/* Hero Header */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-xs font-black uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                    <Sparkles className="w-4 h-4 fill-primary-600" />
                    Expertly Crafted
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-neutral-900 mb-6 tracking-tight animate-in fade-in slide-in-from-top-6 duration-700 delay-100">
                    Industry <span className="text-primary-600">Pro</span> Samples
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-neutral-500 leading-relaxed font-medium animate-in fade-in slide-in-from-top-8 duration-700 delay-200">
                    Browse our gallery of high-performing resume examples. Each sample is optimized for ATS compliance and designed to win interviews in 2026.
                </p>
            </section>

            {/* Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {samples.map((sample, idx) => (
                        <div key={idx} className="animate-in fade-in slide-in-from-bottom-8 duration-1000" style={{ animationDelay: `${idx * 150}ms` }}>
                            <SampleCard
                                sample={sample.data}
                                category={sample.category}
                                description={sample.description}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
                <div className="bg-neutral-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-[100px] -mr-48 -mt-48 transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400/10 rounded-full blur-[80px] -ml-32 -mb-32 transition-transform duration-1000 group-hover:scale-110" />

                    <h2 className="text-4xl md:text-5xl font-black text-white mb-8 relative z-10 leading-tight">
                        Don&apos;t see your role? <br /><span className="text-neutral-400">Our AI can build it for you.</span>
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                        <Link href="/editor/new">
                            <Button size="xl" variant="primary" className="px-10 h-16 text-lg shadow-xl shadow-primary-900/50">
                                Start Your Resume <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button variant="ghost" size="xl" className="h-16 text-white border-white/10 hover:bg-white/10">
                                How it Works
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
