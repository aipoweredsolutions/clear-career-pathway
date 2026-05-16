-- Referral System Migration

-- 1. Add referral_code to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;

-- 2. Create status enum
DO $$ BEGIN
    CREATE TYPE referral_status AS ENUM ('pending', 'rewarded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Create referrals table
CREATE TABLE IF NOT EXISTS public.referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referrer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    referred_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status referral_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    rewarded_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(referred_id) -- One referral per new user
);

-- 4. Enable RLS
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
-- Referrers can see their own referrals
DROP POLICY IF EXISTS "Users can view their own referrals" ON public.referrals;
CREATE POLICY "Users can view their own referrals" ON public.referrals
    FOR SELECT USING (auth.uid() = referrer_id);

-- 6. Function to generate random referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
DECLARE
    chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    result TEXT := '';
    i INTEGER := 0;
BEGIN
    FOR i IN 1..8 LOOP
        result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- 7. Update handle_new_user function to include referral code
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    new_code TEXT;
BEGIN
    new_code := generate_referral_code();
    
    -- Ensure uniqueness (simple retry loop)
    WHILE EXISTS (SELECT 1 FROM public.profiles WHERE referral_code = new_code) LOOP
        new_code := generate_referral_code();
    END LOOP;

    INSERT INTO public.profiles (id, email, full_name, referral_code)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        new_code
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Backfill existing users (optional but good for consistency)
UPDATE public.profiles 
SET referral_code = generate_referral_code() 
WHERE referral_code IS NULL;
