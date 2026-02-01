# Dashboard Error Troubleshooting Guide

## Common Dashboard Errors After Login

### Error: "Database Connection Issue"

**Symptoms:**
- Yellow warning banner appears on dashboard
- Message: "Unable to fetch your documents"
- No resumes are displayed

**Causes:**
1. **Database tables not created** - The Supabase database schema hasn't been set up
2. **Missing environment variables** - Supabase credentials not configured
3. **Network issues** - Unable to connect to Supabase
4. **Permissions issues** - User doesn't have access to tables

**Solutions:**

#### Option 1: Set Up Database Schema (Recommended)

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **SQL Editor**
4. Run the schema SQL file from `supabase/schema.sql`
5. Refresh the dashboard page

#### Option 2: Check Environment Variables

Make sure your `.env.local` file contains:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from:
- Supabase Dashboard → Settings → API

#### Option 3: Continue Without Database

The app will still work! You can:
- Click "New Resume" to create a document
- The error will be logged but won't block functionality
- Documents will be created when the database is available

### Error: "Failed to create resume"

**Symptoms:**
- Error when clicking "New Resume" button
- Redirect doesn't happen
- Console shows database errors

**Causes:**
1. `documents` table doesn't exist
2. User doesn't have INSERT permissions
3. Database connection failed

**Solutions:**

1. **Check Database Schema:**
   - Ensure the `documents` table exists
   - Run the schema migration if needed

2. **Check Permissions:**
   - Go to Supabase Dashboard → Authentication → Policies
   - Ensure users can INSERT into `documents` table

3. **Check Console:**
   - Open browser DevTools (F12)
   - Check Console tab for detailed error messages
   - Check Network tab for failed requests

### Error: "Monthly AI limit reached"

**Symptoms:**
- Can't use AI features
- Error message about limit
- Redirect to pricing page

**Solution:**
- This is expected behavior for free tier
- Upgrade your plan or wait for next month
- Check current usage in Supabase Dashboard

## Development Mode Features

When running in development (`npm run dev`), you get:

✅ **Detailed Error Messages**
- Full error stack traces in console
- Error details shown in UI
- Database query errors logged

✅ **Graceful Fallbacks**
- Dashboard works even if database is unavailable
- Default limits applied if subscription tables missing
- Mock data for testing

✅ **Better Debugging**
- All errors logged to terminal
- Browser console shows detailed info
- Network requests visible in DevTools

## Quick Fixes

### 1. Clear Browser Cache
```
Ctrl+Shift+Delete (Windows)
Cmd+Shift+Delete (Mac)
```

### 2. Restart Development Server
```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

### 3. Check Supabase Status
- Visit [Supabase Status Page](https://status.supabase.com/)
- Check if your project is active in dashboard

### 4. Verify Authentication
- Make sure you're logged in
- Try logging out and back in
- Check browser cookies are enabled

## Still Having Issues?

1. **Check Terminal Output:**
   - Look for errors where `npm run dev` is running
   - Database connection errors will show there

2. **Check Browser Console:**
   - Press F12 to open DevTools
   - Look for red errors in Console tab
   - Check Network tab for failed requests

3. **Check Supabase Logs:**
   - Go to Supabase Dashboard
   - Navigate to Logs section
   - Look for API errors or auth issues

4. **Use Test Login:**
   - The "One-Click Test Login" works without database
   - Good for testing the app functionality
   - Creates mock session for development

## Database Schema Setup

If you need to set up the database from scratch:

1. Locate `supabase/schema.sql` in the project
2. Go to Supabase Dashboard → SQL Editor
3. Copy and paste the schema
4. Click "Run"
5. Verify tables are created in Table Editor

## Environment Variables Checklist

Make sure you have:
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `OPENAI_API_KEY` (for AI features)

## Need More Help?

The app is designed to work even with database errors. You can:
- Continue using the editor
- Create resumes locally
- Download PDFs
- Use all templates

Database features that require connection:
- Saving resumes to cloud
- Syncing across devices
- AI-powered features
- Usage tracking
