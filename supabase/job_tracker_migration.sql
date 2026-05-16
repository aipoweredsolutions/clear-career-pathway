-- Job Applications Tracking Table
CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    document_id UUID REFERENCES public.documents(id) ON DELETE SET NULL,
    company_name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    job_url TEXT,
    job_description TEXT,
    status TEXT DEFAULT 'applied' CHECK (status IN ('draft', 'applied', 'interviewing', 'offered', 'rejected', 'withdrawn')),
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own job applications" 
    ON public.job_applications FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own job applications" 
    ON public.job_applications FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own job applications" 
    ON public.job_applications FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own job applications" 
    ON public.job_applications FOR DELETE 
    USING (auth.uid() = user_id);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_job_apps_user_id ON public.job_applications(user_id);
