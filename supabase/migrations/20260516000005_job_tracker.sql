-- Create job application status enum
DO $$ BEGIN
    CREATE TYPE job_application_status AS ENUM ('saved', 'applied', 'interviewing', 'offer', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    company_name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    job_url TEXT,
    status job_application_status DEFAULT 'saved' NOT NULL,
    applied_date DATE,
    notes TEXT,
    resume_document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add RLS policies
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own job applications"
    ON job_applications FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own job applications"
    ON job_applications FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own job applications"
    ON job_applications FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own job applications"
    ON job_applications FOR DELETE
    USING (auth.uid() = user_id);

-- Add index for performance
CREATE INDEX IF NOT EXISTS job_applications_user_id_idx ON job_applications(user_id);
CREATE INDEX IF NOT EXISTS job_applications_status_idx ON job_applications(status);

-- Function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_job_applications_updated_at
    BEFORE UPDATE ON job_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
