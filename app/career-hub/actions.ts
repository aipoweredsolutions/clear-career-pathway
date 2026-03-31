'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export type ApplicationStatus = 'applied' | 'interviewing' | 'offer' | 'rejected' | 'wishlist'

export interface JobApplication {
    id: string
    company: string
    role: string
    dateApplied: string
    status: ApplicationStatus
    jobUrl?: string
    notes?: string
    resumeId?: string
}

export async function fetchApplications() {
    const cookieStore = await cookies()
    const isMock = cookieStore.get('mock_session')?.value === 'true'

    if (isMock) return []

    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return []

        const { data, error } = await supabase
            .from('job_applications')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        if (error) throw error

        return (data || []).map(app => ({
            id: app.id,
            company: app.company,
            role: app.role,
            dateApplied: app.date_applied,
            status: app.status as ApplicationStatus,
            jobUrl: app.job_url,
            notes: app.notes,
            resumeId: app.resume_id
        }))
    } catch (error) {
        console.error('Fetch applications error:', error)
        return []
    }
}

export async function addApplication(app: Omit<JobApplication, 'id'>) {
    const cookieStore = await cookies()
    const isMock = cookieStore.get('mock_session')?.value === 'true'
    if (isMock) return { success: false, error: 'Cannot save in Guest Mode' }

    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Unauthorized')

        const { data, error } = await supabase
            .from('job_applications')
            .insert({
                user_id: user.id,
                company: app.company,
                role: app.role,
                status: app.status,
                date_applied: app.dateApplied,
                job_url: app.jobUrl,
                notes: app.notes,
                resume_id: app.resumeId || null
            })
            .select()
            .single()

        if (error) throw error
        revalidatePath('/career-hub')
        return { success: true, id: data.id }
    } catch (error: any) {
        console.error('Add application error:', error)
        return { success: false, error: error.message }
    }
}

export async function deleteApplication(id: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase
            .from('job_applications')
            .delete()
            .eq('id', id)

        if (error) throw error
        revalidatePath('/career-hub')
        return { success: true }
    } catch (error: any) {
        console.error('Delete application error:', error)
        return { success: false, error: error.message }
    }
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus) {
    try {
        const supabase = await createClient()
        const { error } = await supabase
            .from('job_applications')
            .update({ status })
            .eq('id', id)

        if (error) throw error
        revalidatePath('/career-hub')
        return { success: true }
    } catch (error: any) {
        console.error('Update status error:', error)
        return { success: false, error: error.message }
    }
}

// INTERVIEW SESSIONS
export async function saveInterviewSession(data: any) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Unauthorized')

        const { data: session, error } = await supabase
            .from('interview_sessions')
            .upsert({
                id: data.id || undefined, // Upsert if ID exists
                user_id: user.id,
                resume_id: data.resumeId,
                target_role: data.targetRole,
                category: data.category,
                role_context: data.roleContext,
                questions: data.questions,
                user_answers: data.userAnswers,
                feedbacks: data.feedbacks
            })
            .select()
            .single()

        if (error) throw error
        return { success: true, id: session.id }
    } catch (error: any) {
        console.error('Save interview error:', error)
        return { success: false, error: error.message }
    }
}

export async function fetchLatestInterviewSession(resumeId?: string) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return null

        let query = supabase
            .from('interview_sessions')
            .select('*')
            .eq('user_id', user.id)
            
        if (resumeId) query = query.eq('resume_id', resumeId)
        
        const { data, error } = await query
            .order('updated_at', { ascending: false })
            .limit(1)
            .maybeSingle()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Fetch interview error:', error)
        return null
    }
}

// LINKEDIN OPTIMIZATIONS
export async function saveLinkedInOptimization(resumeId: string, content: any) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Unauthorized')

        const { error } = await supabase
            .from('linkedin_optimizations')
            .insert({
                user_id: user.id,
                resume_id: resumeId,
                content: content
            })

        if (error) throw error
        return { success: true }
    } catch (error: any) {
        console.error('Save linkedin error:', error)
        return { success: false, error: error.message }
    }
}

export async function fetchLatestLinkedInOptimization(resumeId?: string) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return null

        let query = supabase
            .from('linkedin_optimizations')
            .select('*')
            .eq('user_id', user.id)
            
        if (resumeId) query = query.eq('resume_id', resumeId)

        const { data, error } = await query
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle()

        if (error) throw error
        return data ? data.content : null
    } catch (error) {
        console.error('Fetch linkedin error:', error)
        return null
    }
}

// CAREER ROADMAPS
export async function saveCareerRoadmap(resumeId: string, targetGoal: string, roadmapData: any) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Unauthorized')

        const { error } = await supabase
            .from('career_roadmaps')
            .insert({
                user_id: user.id,
                resume_id: resumeId,
                target_goal: targetGoal,
                roadmap_data: roadmapData
            })

        if (error) throw error
        return { success: true }
    } catch (error: any) {
        console.error('Save roadmap error:', error)
        return { success: false, error: error.message }
    }
}

export async function fetchLatestCareerRoadmap(resumeId?: string) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return null

        let query = supabase
            .from('career_roadmaps')
            .select('*')
            .eq('user_id', user.id)
            
        if (resumeId) query = query.eq('resume_id', resumeId)

        const { data, error } = await query
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle()

        if (error) throw error
        return data ? { data: data.roadmap_data, targetGoal: data.target_goal } : null
    } catch (error) {
        console.error('Fetch roadmap error:', error)
        return null
    }
}
