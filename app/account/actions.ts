'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    const fullName = (formData.get('fullName') as string)?.trim()

    if (!fullName || fullName.length < 2) {
        return { error: 'Full name must be at least 2 characters.' }
    }

    const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName, updated_at: new Date().toISOString() })
        .eq('id', user.id)

    if (error) return { error: error.message }

    // Also update auth metadata so it shows in the auth session
    await supabase.auth.updateUser({ data: { full_name: fullName } })

    revalidatePath('/account')
    return { success: true, message: 'Display name updated successfully.' }
}

export async function updateEmail(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    const email = (formData.get('email') as string)?.trim().toLowerCase()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { error: 'Please enter a valid email address.' }
    }

    if (email === user.email?.toLowerCase()) {
        return { error: 'New email must be different from your current email.' }
    }

    const { error } = await supabase.auth.updateUser({ email })
    if (error) return { error: error.message }

    return { success: true, message: 'Verification email sent. Check your inbox to confirm the change.' }
}

export async function updatePassword(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (!password) return { error: 'New password is required.' }
    if (password.length < 8) return { error: 'Password must be at least 8 characters.' }
    if (!/[A-Z]/.test(password)) return { error: 'Password must contain at least one uppercase letter.' }
    if (!/[0-9]/.test(password)) return { error: 'Password must contain at least one number.' }
    if (password !== confirmPassword) return { error: 'Passwords do not match.' }

    const { error } = await supabase.auth.updateUser({ password })
    if (error) return { error: error.message }

    return { success: true, message: 'Password updated successfully. You may need to sign in again on other devices.' }
}

export async function deleteAccount() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    // Remove profile – DB cascade constraints should clean up related rows.
    const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id)

    if (profileError) {
        return { error: 'Failed to remove account data. Please contact support.' }
    }

    let fullyDeleted = false
    const adminSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const adminSupabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (adminSupabaseUrl && adminSupabaseKey) {
        const { createClient: createAdminClient } = await import('@supabase/supabase-js')
        const adminSupabase = createAdminClient(adminSupabaseUrl, adminSupabaseKey)
        const { error: authError } = await adminSupabase.auth.admin.deleteUser(user.id)
        if (!authError) fullyDeleted = true
        else console.error('Error fully deleting user:', authError)
    }

    await supabase.auth.signOut()
    return { success: true, message: fullyDeleted ? 'Your account has been completely removed.' : 'Your account data has been removed, but we could not fully delete your authentication record. Please contact support.' }
}
