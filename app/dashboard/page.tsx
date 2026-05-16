import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { redirect } from 'next/navigation'
import { DashboardWorkspace } from '@/components/dashboard/DashboardWorkspace'
import { DashboardHeaderActions } from '@/components/dashboard/DashboardHeaderActions'
import { DashboardEmptyStateActions } from '@/components/dashboard/DashboardEmptyStateActions'
import { JobTracker } from '@/components/dashboard/JobTracker'
import { fetchUserDocuments } from '@/lib/supabase/documents'
import { Zap, FileText, Users, ArrowRight, Target } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
    const cookieStore = await cookies()
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )

    // 1. Session check
    const { data: authData } = await supabase.auth.getUser()
    const user = authData?.user

    if (!user) {
        redirect('/auth/login')
    }

    const session = { user }

    // Fetch user's resumes, subscription, profile, and referral stats
    let resumes: any[] = []
    let fetchError = null
    let subscription: any = null
    let profile: any = null
    let downloadCount = 0
    let referralCount = 0

    try {
        const [docs, sub, prof, dlHistory, refs] = await Promise.all([
            fetchUserDocuments(supabase, session.user.id),
            import('@/lib/supabase/subscriptions').then(m => m.fetchUserSubscription(supabase, session.user.id)),
            supabase.from('profiles').select('*').eq('id', session.user.id).single(),
            supabase.from('download_history').select('*', { count: 'exact', head: true }).eq('user_id', session.user.id),
            supabase.from('referrals').select('*', { count: 'exact', head: true }).eq('referrer_id', session.user.id)
        ])
        resumes = docs
        subscription = sub
        profile = prof.data
        downloadCount = dlHistory.count || 0
        referralCount = refs.count || 0
    } catch (error: any) {
        console.error('Error fetching dashboard data:', error)
        fetchError = error.message
    }

    const { hasPremiumAccess } = await import('@/lib/supabase/subscriptions')
    const isPro = hasPremiumAccess(subscription)

    // Onboarding Check
    const hasSeenOnboarding = cookieStore.get('ccp_onboarding_completed')?.value === 'true' || profile?.has_completed_onboarding
    if (resumes.length === 0 && !hasSeenOnboarding) {
        redirect('/onboarding')
    }

    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-neutral-100 pb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-[0.25em] w-fit">
                                <Zap className="w-3.5 h-3.5 fill-primary-600/20" />
                                Personal Dashboard
                            </div>
                            {isPro && (
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 text-white text-[10px] font-black uppercase tracking-[0.25em] w-fit border border-neutral-800 shadow-lg shadow-neutral-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Pro Account
                                </div>
                            )}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-neutral-950 tracking-tighter italic leading-none">
                            My <span className="text-primary-600">Space.</span>
                        </h1>
                        <p className="max-w-lg text-lg text-neutral-500 font-bold leading-relaxed">
                            {profile?.career_goal === 'build' ? 'Crafting your next high-impact resume.' :
                             profile?.career_goal === 'scan' ? 'Optimizing your resume for ATS victory.' :
                             profile?.career_goal === 'interview' ? 'Prepping for your breakthrough interview.' :
                             profile?.career_goal === 'track' ? 'Managing your career growth pipeline.' :
                             'Manage all your high-impact job search documents in one secure workspace.'}
                        </p>
                    </div>

                    <DashboardHeaderActions />

                </div>

                {/* Referral Invite CTA - Show after first download if no referrals yet */}
                {downloadCount > 0 && referralCount === 0 && (
                    <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-[2.5rem] p-8 md:p-12 mb-16 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-neutral-200 overflow-hidden relative group border border-neutral-800">
                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-2 text-primary-400 text-[10px] font-black uppercase tracking-[0.3em]">
                                <Users className="w-4 h-4" /> Affiliate Bonus
                            </div>
                            <h3 className="text-4xl font-black tracking-tighter italic">Share the <br/><span className="text-primary-500 tracking-normal not-italic">Success.</span></h3>
                            <p className="text-neutral-400 font-bold max-w-md leading-relaxed">
                                You&apos;ve built your resume. Now help your friends do the same. Give 5 free AI credits, get 5 for every signup.
                            </p>
                        </div>
                        <Link
                            href="/account?tab=referral"
                            className="relative z-10 bg-white text-neutral-900 font-black px-10 py-5 rounded-[1.5rem] hover:bg-primary-50 transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-3 group/btn whitespace-nowrap"
                        >
                            Get My Referral Link
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                        {/* Decorative background icon */}
                        <Users className="absolute -bottom-10 -right-10 w-64 h-64 text-white/[0.03] -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
                    </div>
                )}

                {fetchError && (
                    <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 mb-12 flex items-start gap-6 shadow-sm">
                        <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-black text-amber-900 tracking-tight">Database Connection Issues</h3>
                            <p className="text-amber-800 font-bold leading-relaxed max-w-2xl">
                                We&apos;re currently unable to load your documents. This usually happens during system maintenance or if your workspace is being provisioned.
                            </p>
                            {process.env.NODE_ENV === 'development' && (
                                <p className="text-[10px] text-amber-600 font-mono mt-4 uppercase font-black bg-amber-100/50 p-2 rounded w-fit">Debug: {fetchError}</p>
                            )}
                        </div>
                    </div>
                )}

                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-12 h-12 rounded-2xl bg-neutral-900 flex items-center justify-center text-white shadow-xl shadow-neutral-200">
                            <Target className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-neutral-900 tracking-tighter italic">Application <span className="text-primary-600">Pipeline.</span></h2>
                            <p className="text-xs text-neutral-400 font-black uppercase tracking-[0.2em] mt-1">Track your tailored submissions</p>
                        </div>
                    </div>
                    <JobTracker />
                </div>

                <div className="flex items-center gap-3 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-900 flex items-center justify-center text-white shadow-xl shadow-neutral-200">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-neutral-900 tracking-tighter italic">Document <span className="text-primary-600">Library.</span></h2>
                        <p className="text-xs text-neutral-400 font-black uppercase tracking-[0.2em] mt-1">Manage your high-impact assets</p>
                    </div>
                </div>

                {resumes && resumes.length > 0 ? (
                    <DashboardWorkspace resumes={resumes} />
                ) : (
                    <div className="bg-white rounded-[3rem] border border-neutral-100 p-20 text-center shadow-2xl shadow-neutral-200">
                        <div className="w-24 h-24 bg-neutral-50 rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-neutral-100 group">
                            <FileText className="w-10 h-10 text-neutral-300 group-hover:text-primary-600 transition-colors" />
                        </div>
                        <h3 className="text-4xl font-black text-neutral-900 mb-6 tracking-tighter italic">Your legacy starts <br/> with a blank page.</h3>
                        <p className="text-xl text-neutral-500 mb-12 max-w-lg mx-auto font-bold leading-relaxed">
                            You haven&apos;t created any documents yet. Launch your high-performance career with our AI-powered workspace.
                        </p>
                        <DashboardEmptyStateActions />

                    </div>
                )}
            </div>
        </div>
    )
}
