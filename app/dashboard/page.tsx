import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { redirect } from 'next/navigation'
import { ResumeGrid } from '@/components/dashboard/ResumeGrid'
import { createResume } from '@/app/dashboard/actions'
import { fetchUserDocuments } from '@/lib/supabase/documents'
import { FileText } from 'lucide-react'

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

    const { data: { session } } = await supabase.auth.getSession()

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
        <div className="min-h-screen bg-neutral-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-neutral-900">
                        My Documents
                    </h1>
                    <form action={createResume}>
                        <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                            + New Resume
                        </button>
                    </form>
                </div>

                {fetchError && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start">
                            <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <h3 className="text-sm font-medium text-yellow-800">Database Connection Issue</h3>
                                <p className="text-sm text-yellow-700 mt-1">
                                    Unable to fetch your documents. This might be because the database tables haven&apos;t been set up yet.
                                    Click &quot;New Resume&quot; to create your first document.
                                </p>
                                {process.env.NODE_ENV === 'development' && (
                                    <p className="text-xs text-yellow-600 mt-2 font-mono">Error: {fetchError}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {resumes && resumes.length > 0 ? (
                    <ResumeGrid resumes={resumes} />
                ) : (
                    <div className="bg-white rounded-xl border border-neutral-200 p-16 text-center shadow-sm">
                        <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FileText className="w-10 h-10 text-neutral-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-neutral-900 mb-2">No documents yet</h3>
                        <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                            Create your first resume to get started. Choose from our professional templates or start from scratch.
                        </p>
                        <form action={createResume}>
                            <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold shadow-md">
                                Create Your First Resume
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}
