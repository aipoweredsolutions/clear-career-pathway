-- Add bonus_ai_credits to profiles for permanent monthly allowance increases
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS bonus_ai_credits INTEGER DEFAULT 0;

-- RPC to safely increment bonus credits (prevents race conditions)
CREATE OR REPLACE FUNCTION increment_bonus_credits(p_user_id UUID, p_amount INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles 
  SET bonus_ai_credits = COALESCE(bonus_ai_credits, 0) + p_amount
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
