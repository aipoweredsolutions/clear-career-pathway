'use client'

import { supabase } from '@/lib/supabase/client'

export type JobStatus = 'saved' | 'applied' | 'interviewing' | 'offer' | 'rejected'

export interface JobApplication {
    id: string
    user_id: string
    company_name: string
    role_title: string
    job_url: string | null
    status: JobStatus
    applied_date: string | null
    notes: string | null
    resume_document_id: string | null
    created_at: string
    updated_at: string
    documents?: {
        title: string
        template_id: string
    } | null
}

export async function fetchApplications() {
    const { data, error } = await supabase
        .from('job_applications')
        .select('*, documents(title, template_id)')
        .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as JobApplication[]
}

export async function createApplication(application: Partial<JobApplication>) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data, error } = await supabase
        .from('job_applications')
        .insert([{ ...application, user_id: user.id }])
        .select()
        .single()
    
    if (error) throw error
    return data
}

export async function updateApplicationStatus(id: string, status: JobStatus) {
    const { data, error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', id)
        .select()
        .single()
    
    if (error) throw error
    return data
}

export async function updateApplication(id: string, updates: Partial<JobApplication>) {
    const { data, error } = await supabase
        .from('job_applications')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
    
    if (error) throw error
    return data
}

export async function deleteApplication(id: string) {
    const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', id)
    
    if (error) throw error
}
