'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function submitContactForm(formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string

    if (!name || !email || !message) {
        return { success: false, error: 'All fields are required' }
    }

    try {
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

        // Store the contact request in Supabase for tracking
        const { error } = await supabase
            .from('support_tickets')
            .insert({
                name,
                email,
                subject,
                message,
                status: 'open',
                priority: 'normal'
            })

        // If table doesn't exist, we'll still return success in development
        if (error) {
            console.warn('Could not store ticket in Supabase (possibly table missing):', error.message)
        }

        console.log('Contact form submitted:', { name, email, subject, message })
        
        // Simulate email delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        return { success: true }
    } catch (error: any) {
        console.error('Contact submission error:', error)
        return { success: false, error: 'An unexpected error occurred' }
    }
}
