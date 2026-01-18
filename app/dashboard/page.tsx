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

    // Fetch user's resumes using the standardized utility
    const resumes = await fetchUserDocuments(supabase, session.user.id)

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
