import { AuthForm } from '@/components/auth/AuthForm'
import Link from 'next/link'

export const metadata = {
    title: 'Sign In',
    description: 'Sign in to your Clear Career Path account.',
}

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col pt-20">
            <main className="flex-1 flex items-center justify-center p-4">
                <AuthForm type="login" />
            </main>
        </div>
    )
}
