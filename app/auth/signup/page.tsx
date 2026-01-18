import { AuthForm } from '@/components/auth/AuthForm'
import Link from 'next/link'

export const metadata = {
    title: 'Sign Up',
    description: 'Create your Clear Career Path account.',
}

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col pt-20">
            <main className="flex-1 flex items-center justify-center p-4">
                <AuthForm type="signup" />
            </main>
        </div>
    )
}
