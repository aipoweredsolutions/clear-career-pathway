import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { redirect } from 'next/navigation'
import { DashboardWorkspace } from '@/components/dashboard/DashboardWorkspace'
import { createResume } from '@/app/dashboard/actions'
import { fetchUserDocuments } from '@/lib/supabase/documents'
import { FileText, Plus, Sparkles } from 'lucide-react'

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

    // 1. Session check with Developer Guest Mode/Bypass support
    const isMock = cookieStore.get('mock_session')?.value === 'true'
    let session: any = null

    if (isMock) {
        console.log('Dashboard: Using Developer Guest Mode session')
        session = {
            user: { id: 'mock-user-id', email: 'tester@example.com' }
        }
    } else {
        const { data: { session: realSession } } = await supabase.auth.getSession()
        session = realSession
    }

    if (!session) {
        redirect('/auth/login')
    }

    // Fetch user's resumes with error handling
    let resumes: any[] = []
    let fetchError = null

    try {
        resumes = await fetchUserDocuments(supabase, session.user.id)
    } catch (error: any) {
        console.error('Error fetching documents:', error)
        fetchError = error.message
    }

    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-neutral-100 pb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-[0.25em] w-fit">
                            <Sparkles className="w-3.5 h-3.5 fill-primary-600/20" />
                            Personal Dashboard
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-neutral-950 tracking-tighter italic leading-none">
                            My <span className="text-primary-600">Space.</span>
                        </h1>
                        <p className="max-w-lg text-lg text-neutral-500 font-bold leading-relaxed">
                            Manage all your high-impact job search documents in one secure workspace.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <form action={createResume.bind(null, 'resume')}>
                            <button type="submit" className="group h-16 px-10 bg-white border-2 border-primary-100 text-primary-600 rounded-2xl hover:border-primary-600 transition-all flex items-center gap-3 font-black text-xs uppercase tracking-widest shadow-xl shadow-primary-900/5">
                                <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 group-hover:scale-110" />
                                New Resume
                            </button>
                        </form>
                        <form action={createResume.bind(null, 'cover_letter')}>
                            <button type="submit" className="group h-16 px-10 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 transition-all flex items-center gap-3 font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary-600/30">
                                <FileText className="w-5 h-5 transition-transform group-hover:translate-y-[-2px]" />
                                AI Cover Letter
                            </button>
                        </form>
                    </div>
                </div>

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
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <form action={createResume.bind(null, 'resume')}>
                                <button className="h-16 px-10 bg-white border-2 border-neutral-200 text-neutral-900 rounded-2xl hover:border-primary-600 transition-all font-black text-xs uppercase tracking-widest shadow-xl">
                                    Create First Resume
                                </button>
                            </form>
                            <form action={createResume.bind(null, 'cover_letter')}>
                                <button className="h-16 px-10 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 transition-all font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary-600/30">
                                    AI Cover Letter
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
