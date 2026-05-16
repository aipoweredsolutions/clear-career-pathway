-- Add bonus credits support to user_usage
ALTER TABLE public.user_usage ADD COLUMN IF NOT EXISTS bonus_ai_credits INTEGER DEFAULT 0;
