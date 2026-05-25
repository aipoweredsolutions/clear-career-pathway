-- Sync subscription tiers with lib/config/tiers.ts
INSERT INTO subscription_tiers (name, display_name, price_monthly, max_documents, max_exports_per_month, ai_improvements_per_month, features)
VALUES
  ('free', 'Free Starter', 0, 1, 1, 5, '["browse_templates", "create_one_document", "standard_pdf"]'),
  ('starter', 'Starter Pass', 9.99, 3, 5, 20, '["standard_plus", "basic_ai"]'),
  ('bundle', 'Download Bundle', 4.99, 1, 1, 0, '["credits_only"]'),
  ('pro_monthly', 'Professional', 14.99, NULL, NULL, NULL, '["pro_features", "unlimited_exports", "priority_ai", "multi_page"]'),
  ('power', 'Power User', 29.99, NULL, NULL, NULL, '["all_pro_plus", "dedicated_support"]'),
  ('lifetime_pro', 'Lifetime Pro', 199.00, NULL, NULL, NULL, '["lifetime_access", "all_features"]'),
  ('single_export', 'Single Export', 4.99, 1, 1, 5, '["one_time_export"]'),
  ('enterprise', 'Enterprise', 99.99, NULL, NULL, NULL, '["team_features", "white_label"]')
ON CONFLICT (name) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  price_monthly = EXCLUDED.price_monthly,
  max_documents = EXCLUDED.max_documents,
  max_exports_per_month = EXCLUDED.max_exports_per_month,
  ai_improvements_per_month = EXCLUDED.ai_improvements_per_month,
  features = EXCLUDED.features;
