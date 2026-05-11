-- Migration: Drop defunct tables for removed features
-- This migration removes tables for features that were identified as stale/defunct
-- including Job Applications, Interview Simulator, LinkedIn Optimization, and Career Roadmaps.

-- 1. Drop Triggers
DROP TRIGGER IF EXISTS update_job_applications_updated_at ON job_applications;
DROP TRIGGER IF EXISTS update_interview_sessions_updated_at ON interview_sessions;

-- 2. Drop Policies (Optional if dropping tables, but good for completeness)
DROP POLICY IF EXISTS "Users can manage own job applications" ON job_applications;
DROP POLICY IF EXISTS "Users can manage own interview sessions" ON interview_sessions;
DROP POLICY IF EXISTS "Users can manage own linkedin optimizations" ON linkedin_optimizations;
DROP POLICY IF EXISTS "Users can manage own career roadmaps" ON career_roadmaps;

-- 3. Drop Tables
DROP TABLE IF EXISTS job_applications CASCADE;
DROP TABLE IF EXISTS interview_sessions CASCADE;
DROP TABLE IF EXISTS linkedin_optimizations CASCADE;
DROP TABLE IF EXISTS career_roadmaps CASCADE;

-- 4. Drop Indexes (Optional as cascade handles table-level indexes)
DROP INDEX IF EXISTS idx_job_applications_user_id;
DROP INDEX IF EXISTS idx_interview_sessions_user_id;
DROP INDEX IF EXISTS idx_linkedin_optimizations_user_id;
DROP INDEX IF EXISTS idx_career_roadmaps_user_id;

-- 5. Add Missing Fields to Profiles (Fix Inconsistency)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'free';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS billing_status TEXT DEFAULT 'none';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS has_completed_onboarding BOOLEAN DEFAULT FALSE;

