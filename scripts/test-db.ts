
// @ts-nocheck
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

async function testConnection() {
    if (!supabaseUrl || !supabaseKey) {
        console.error('Missing Supabase credentials in .env.local')
        return
    }

    console.log(`Connecting to: ${supabaseUrl}`)
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data, error } = await supabase.from('profiles').select('id').limit(1)

    if (error) {
        console.error('Connection Failed:', error.message)
    } else {
        console.log('Connection Successful! Profiles found:', data.length)
    }

    // Check all tables
    const tables = [
        'profiles', 'documents', 'personal_info', 'professional_summary', 
        'skills', 'work_experience', 'work_achievements', 'projects', 
        'education', 'certifications', 'achievements', 'publications', 
        'volunteer_experience', 'languages', 'professional_affiliations', 
        'document_references', 'additional_info', 'custom_sections', 
        'custom_section_items', 'cover_letters', 'user_subscriptions', 
        'subscription_tiers', 'user_usage', 'download_history', 
        'job_applications', 'interview_sessions', 'linkedin_optimizations', 
        'career_roadmaps'
    ]

    for (const table of tables) {
        const { error } = await supabase.from(table).select('count', { count: 'exact', head: true })
        if (error) {
            console.error(`Table [${table}] Error:`, error.message)
        } else {
            console.log(`Table [${table}] OK`)
        }
    }
}

testConnection()
