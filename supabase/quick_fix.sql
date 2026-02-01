-- QUCIK FIX SCRIPT
-- Run this to fix your database state without "already exists" errors.

-- 1. Fix Profile Permissions (Critical for auto-healing)
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
    CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);
END $$;

-- 2. Create document_references table (renamed from references)
CREATE TABLE IF NOT EXISTS document_references (
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

-- Enable RLS for the new table
ALTER TABLE document_references ENABLE ROW LEVEL SECURITY;

-- 3. Ensure the User Trigger exists (for new signups)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. Ensure Subscription Tiers exist (Seed Data)
INSERT INTO subscription_tiers (name, display_name, price_monthly, price_yearly, max_documents, max_exports_per_month, ai_improvements_per_month, features)
VALUES
  ('free', 'Free', 0, 0, 1, 1, 5, '["browse_templates", "create_one_document", "watermarked_export"]'),
  ('starter', 'Starter Pass', 9.99, NULL, 5, 10, 25, '["full_export", "template_switching", "cover_letter", "career_blog"]'),
  ('premium', 'Premium', 19.99, 199.99, NULL, NULL, NULL, '["unlimited_documents", "unlimited_exports", "advanced_ai", "priority_support", "all_formats"]')
ON CONFLICT (name) DO NOTHING;
