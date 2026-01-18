-- Clear Career Path Database Schema
-- This schema supports the complete resume/CV platform with monetization

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USER PROFILES & SUBSCRIPTION
-- ============================================

-- User profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscription tiers
CREATE TABLE subscription_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE, -- 'free', 'starter', 'premium'
  display_name TEXT NOT NULL,
  price_monthly DECIMAL(10, 2),
  price_yearly DECIMAL(10, 2),
  max_documents INTEGER, -- NULL means unlimited
  max_exports_per_month INTEGER, -- NULL means unlimited
  ai_improvements_per_month INTEGER, -- NULL means unlimited
  features JSONB DEFAULT '[]', -- Array of feature flags
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User subscriptions
CREATE TABLE user_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tier_id UUID NOT NULL REFERENCES subscription_tiers(id),
  paddle_subscription_id TEXT,
  paddle_customer_id TEXT,
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'canceled', 'past_due'
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Payment history
CREATE TABLE payment_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES user_subscriptions(id) ON DELETE SET NULL,
  paddle_transaction_id TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL, -- 'succeeded', 'failed', 'pending'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- DOCUMENTS & CONTENT
-- ============================================

-- Main documents table (resumes, CVs, cover letters)
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL, -- 'resume', 'cv', 'cover_letter', 'career_blog'
  title TEXT NOT NULL,
  template_id TEXT NOT NULL, -- References template in code
  career_level TEXT, -- 'student', 'entry', 'mid', 'senior', 'executive'
  job_type TEXT, -- 'corporate', 'creative', 'technical', 'academic', 'freelance'
  industry_focus TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Personal information
CREATE TABLE personal_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  professional_title TEXT,
  email TEXT,
  phone TEXT,
  city TEXT,
  country TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  portfolio_url TEXT,
  UNIQUE(document_id)
);

-- Professional summary
CREATE TABLE professional_summary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  headline TEXT,
  summary_text TEXT,
  value_proposition TEXT,
  UNIQUE(document_id)
);

-- Skills (individual entries for ATS parsing)
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  skill_type TEXT, -- 'technical', 'professional', 'tool', 'industry'
  proficiency_level TEXT, -- 'beginner', 'intermediate', 'advanced', 'expert'
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Work experience
CREATE TABLE work_experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  job_title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  location TEXT,
  is_remote BOOLEAN DEFAULT FALSE,
  start_date DATE NOT NULL,
  end_date DATE, -- NULL means current
  is_current BOOLEAN DEFAULT FALSE,
  role_description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Work experience achievements (individual bullets)
CREATE TABLE work_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  work_experience_id UUID NOT NULL REFERENCES work_experience(id) ON DELETE CASCADE,
  achievement_text TEXT NOT NULL,
  metrics TEXT, -- Extracted numbers/percentages
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  project_name TEXT NOT NULL,
  client_or_organization TEXT,
  role TEXT,
  description TEXT,
  tools_used TEXT[], -- Array of tools/technologies
  outcomes TEXT,
  project_url TEXT,
  start_date DATE,
  end_date DATE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Education
CREATE TABLE education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  degree TEXT NOT NULL,
  field_of_study TEXT,
  institution_name TEXT NOT NULL,
  location TEXT,
  start_year INTEGER,
  end_year INTEGER,
  achievements TEXT,
  gpa TEXT, -- Added for consistency
  coursework TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certifications
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  certification_name TEXT NOT NULL,
  issuing_organization TEXT NOT NULL,
  issue_year INTEGER,
  credential_id TEXT,
  credential_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements & Awards
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  achievement_title TEXT NOT NULL,
  issuing_body TEXT,
  year INTEGER,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Publications
CREATE TABLE publications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  platform_or_publisher TEXT,
  publication_year INTEGER,
  url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Volunteer experience
CREATE TABLE volunteer_experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  role_title TEXT NOT NULL,
  organization_name TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  contributions TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Languages
CREATE TABLE languages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  language_name TEXT NOT NULL,
  proficiency_level TEXT NOT NULL, -- 'basic', 'intermediate', 'fluent', 'native'
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Professional affiliations
CREATE TABLE professional_affiliations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  organization_name TEXT NOT NULL,
  role_or_membership TEXT,
  years_active TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- References
CREATE TABLE references (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  reference_name TEXT,
  role TEXT,
  organization TEXT,
  contact_details TEXT,
  availability_statement TEXT DEFAULT 'Available upon request',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Additional information
CREATE TABLE additional_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  security_clearance TEXT,
  work_authorization TEXT,
  willing_to_relocate BOOLEAN,
  availability TEXT,
  other_info TEXT,
  UNIQUE(document_id)
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_type ON documents(document_type);
CREATE INDEX idx_work_experience_document_id ON work_experience(document_id);
CREATE INDEX idx_skills_document_id ON skills(document_id);
CREATE INDEX idx_education_document_id ON education(document_id);
CREATE INDEX idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX idx_payment_history_user_id ON payment_history(user_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_affiliations ENABLE ROW LEVEL SECURITY;
ALTER TABLE references ENABLE ROW LEVEL SECURITY;
ALTER TABLE additional_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only see and update their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Documents: Users can only access their own documents
CREATE POLICY "Users can view own documents" ON documents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own documents" ON documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents" ON documents
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents" ON documents
  FOR DELETE USING (auth.uid() = user_id);

-- Personal info: Users can access via their documents
CREATE POLICY "Users can view own personal info" ON personal_info
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = personal_info.document_id
      AND documents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own personal info" ON personal_info
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = personal_info.document_id
      AND documents.user_id = auth.uid()
    )
  );

-- Apply similar policies to all document-related tables
-- (Professional summary, skills, work experience, etc.)

-- Subscriptions: Users can view their own subscription
CREATE POLICY "Users can view own subscription" ON user_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Payment history: Users can view their own payments
CREATE POLICY "Users can view own payments" ON payment_history
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON user_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create default subscription for new users
CREATE OR REPLACE FUNCTION create_default_subscription()
RETURNS TRIGGER AS $$
DECLARE
  free_tier_id UUID;
BEGIN
  -- Get the free tier ID
  SELECT id INTO free_tier_id FROM subscription_tiers WHERE name = 'free' LIMIT 1;
  
  -- Create subscription for new user
  IF free_tier_id IS NOT NULL THEN
    INSERT INTO user_subscriptions (user_id, tier_id, status)
    VALUES (NEW.id, free_tier_id, 'active');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create subscription when profile is created
CREATE TRIGGER create_subscription_on_signup AFTER INSERT ON profiles
  FOR EACH ROW EXECUTE FUNCTION create_default_subscription();

-- ============================================
-- SEED DATA: Subscription Tiers
-- ============================================

INSERT INTO subscription_tiers (name, display_name, price_monthly, price_yearly, max_documents, max_exports_per_month, ai_improvements_per_month, features)
VALUES
  ('free', 'Free', 0, 0, 1, 1, 5, '["browse_templates", "create_one_document", "watermarked_export"]'),
  ('starter', 'Starter Pass', 9.99, NULL, 5, 10, 25, '["full_export", "template_switching", "cover_letter", "career_blog"]'),
  ('premium', 'Premium', 19.99, 199.99, NULL, NULL, NULL, '["unlimited_documents", "unlimited_exports", "advanced_ai", "priority_support", "all_formats"]');

-- ============================================
-- NOTES
-- ============================================

-- This schema is designed for:
-- 1. ATS compliance: Individual fields for all resume sections
-- 2. Flexibility: All optional sections can be NULL
-- 3. Scalability: Proper indexing and RLS policies
-- 4. Monetization: Subscription tiers with feature flags
-- 5. Data integrity: Foreign keys and cascading deletes
