# Email Confirmation Setup Guide

## Issue: No Confirmation Email Received

If you're not receiving confirmation emails after signing up, this is likely because **Supabase email confirmation is disabled** in your project settings. This is common in development environments.

## Solutions

### Option 1: Enable Email Confirmation in Supabase (Recommended for Production)

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication** → **Email Templates**
4. Enable **Confirm signup** email template
5. Configure your email settings:
   - Go to **Authentication** → **Settings**
   - Scroll to **Email Auth**
   - Enable **Confirm email**
   - Configure SMTP settings (optional, for custom email provider)

### Option 2: Disable Email Confirmation (Development Only)

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication** → **Settings**
4. Scroll to **Email Auth**
5. **Disable** "Confirm email"
6. Users can now sign in immediately after signup

### Option 3: Manual Email Confirmation (Development)

If you need to manually confirm a user's email:

1. Go to **Authentication** → **Users** in Supabase Dashboard
2. Find the user
3. Click on the user
4. Toggle **Email Confirmed** to ON

## Current Implementation

The app now handles both scenarios:

- **Email confirmation enabled**: Shows message to check email, but allows trying to sign in directly
- **Email confirmation disabled**: Automatically logs user in after signup

## Testing

After creating an account:

1. **If you see**: "Account created! Please check your email..."
   - Check your email inbox (and spam folder)
   - Click the confirmation link
   - OR try signing in directly (might work if confirmation is disabled)

2. **If you see**: "Account created successfully! Redirecting..."
   - Email confirmation is disabled
   - You'll be automatically logged in

## For Developers

To check your Supabase email configuration:

```bash
# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Make sure these are set in your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Common Issues

### "Email not confirmed" error when signing in
- **Solution**: Disable email confirmation in Supabase settings OR manually confirm the email in the dashboard

### No email received
- **Solution**: Check spam folder, verify SMTP settings, or disable email confirmation for development

### "Invalid login credentials" after signup
- **Solution**: If email confirmation is enabled, you must confirm your email before signing in

## Need Help?

If you're still having issues:
1. Check the browser console for errors
2. Check the terminal where `npm run dev` is running
3. Verify your Supabase project is active
4. Try the "One-Click Test Login" button on the login page for instant access
