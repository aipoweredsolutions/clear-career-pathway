-- Migration: Add onboarding preferences to profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS career_goal TEXT,
ADD COLUMN IF NOT EXISTS experience_level TEXT,
ADD COLUMN IF NOT EXISTS industry TEXT,
ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS has_completed_onboarding BOOLEAN DEFAULT false;
