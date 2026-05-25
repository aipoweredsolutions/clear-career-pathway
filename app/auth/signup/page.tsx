import { AuthForm } from '@/components/auth/AuthForm'
import { Suspense } from 'react'

export const metadata = {
    title: 'Sign Up',
    description: 'Create your Clear Career Path account.',
}

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col pt-20">
            <main className="flex-1 flex items-center justify-center p-4">
                <Suspense fallback={<div className="text-sm font-medium text-neutral-500">Loading...</div>}>
                    <AuthForm type="signup" />
                </Suspense>
            </main>
        </div>
    )
}
