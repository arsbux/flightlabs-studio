# Troubleshooting Guide

## Error: "Identifier 'supabase' has already been declared"

### Cause
Your browser is caching the old `js/supabase-config.js` file which declares `supabase` variables.

### Solution
**Hard refresh your browser:**

- **Chrome/Edge (Windows/Linux):** `Ctrl + Shift + R` or `Ctrl + F5`
- **Chrome/Edge (Mac):** `Cmd + Shift + R`
- **Firefox (Windows/Linux):** `Ctrl + Shift + R` or `Ctrl + F5`
- **Firefox (Mac):** `Cmd + Shift + R`
- **Safari (Mac):** `Cmd + Option + R`

Or clear your browser cache:
1. Open Developer Tools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

---

## Error: "showNewPostForm is not defined"

### Cause
Browser caching or JavaScript not fully loaded.

### Solution
1. Hard refresh the page (see above)
2. Make sure JavaScript is enabled
3. Check browser console for other errors
4. Try a different browser

---

## Blog Pages Stuck on "Loading..."

### Possible Causes
1. Supabase credentials not configured
2. Database tables not created
3. Network/CORS issues
4. Browser caching

### Solutions

#### 1. Check Supabase Connection
Open `test-supabase.html` in your browser to verify:
- ✅ Supabase client initialized
- ✅ Tables accessible
- ✅ Storage bucket exists

#### 2. Verify Database Setup
Run these SQL queries in Supabase SQL Editor:

```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check blog_posts table
SELECT * FROM blog_posts LIMIT 1;

-- Check email_subscribers table
SELECT * FROM email_subscribers LIMIT 1;
```

#### 3. Check Browser Console
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for error messages
4. Share errors if asking for help

#### 4. Clear Cache
Hard refresh the page (see instructions above)

---

## Image Upload Fails

### Error: "Cannot read properties of undefined (reading 'from')"

#### Cause
Storage bucket not created or policies not set.

#### Solution
1. Go to **Storage** in Supabase dashboard
2. Create bucket named `blog-images` (make it public)
3. Run storage policies SQL from `SUPABASE_SETUP.md`

### Error: "Upload failed" or "403 Forbidden"

#### Cause
Storage policies not configured correctly.

#### Solution
Run this SQL in Supabase SQL Editor:

```sql
-- Public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'blog-images' );

-- Public upload
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'blog-images' );

-- Public update
CREATE POLICY "Public Update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'blog-images' );

-- Public delete
CREATE POLICY "Public Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'blog-images' );
```

---

## Posts Not Showing on Blog Listing

### Possible Causes
1. No posts created yet
2. Posts not published
3. Database connection issue

### Solutions

#### 1. Create a Test Post
1. Go to `/ideas/admin.html`
2. Click "New Post"
3. Fill in title and content
4. **Check "Published"** ✅
5. Save

#### 2. Check Published Status
In Supabase dashboard:
1. Go to Table Editor
2. Open `blog_posts` table
3. Check the `published` column
4. Make sure it's `true` for posts you want visible

#### 3. Check Browser Console
Look for errors in Developer Tools (F12)

---

## Email Capture Not Working

### Error: "Error subscribing"

#### Cause
Database table not created or policies not set.

#### Solution
Run this SQL in Supabase SQL Editor:

```sql
-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS email_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    source TEXT DEFAULT 'website'
);

-- Disable RLS for unrestricted access
ALTER TABLE email_subscribers DISABLE ROW LEVEL SECURITY;
```

---

## General Debugging Steps

### 1. Check Browser Console
Always check for JavaScript errors:
1. Press F12 to open Developer Tools
2. Go to Console tab
3. Look for red error messages
4. Note the file and line number

### 2. Check Network Tab
See if requests are failing:
1. Open Developer Tools (F12)
2. Go to Network tab
3. Refresh the page
4. Look for failed requests (red)
5. Click on failed requests to see details

### 3. Verify Supabase Status
1. Go to your Supabase dashboard
2. Check if project is active
3. Verify you're not over quota
4. Check for any service issues

### 4. Test in Incognito/Private Mode
This eliminates caching issues:
- **Chrome:** `Ctrl + Shift + N` (Windows) or `Cmd + Shift + N` (Mac)
- **Firefox:** `Ctrl + Shift + P` (Windows) or `Cmd + Shift + P` (Mac)
- **Safari:** `Cmd + Shift + N`

### 5. Try a Different Browser
Sometimes browser-specific issues occur. Test in:
- Chrome
- Firefox
- Safari
- Edge

---

## Still Having Issues?

### Collect This Information:
1. **Error message** (exact text from console)
2. **Browser** (name and version)
3. **Operating System**
4. **Steps to reproduce** the error
5. **Screenshot** of the error

### Check These Files:
- `test-supabase.html` - Does it show all tests passing?
- Supabase dashboard - Are tables created?
- Browser console - Any errors?

### Common Fixes:
1. ✅ Hard refresh (Ctrl+Shift+R)
2. ✅ Clear browser cache
3. ✅ Check Supabase credentials
4. ✅ Verify database tables exist
5. ✅ Run all SQL queries from setup
6. ✅ Try incognito mode
7. ✅ Try different browser

---

## Quick Checklist

Before asking for help, verify:

- [ ] Supabase project created
- [ ] Database tables created (run SQL from `SUPABASE_SETUP.md`)
- [ ] Storage bucket created (`blog-images`)
- [ ] Storage policies set
- [ ] Hard refreshed browser (Ctrl+Shift+R)
- [ ] Checked browser console for errors
- [ ] Tested in incognito mode
- [ ] `test-supabase.html` shows all tests passing

---

## Need More Help?

1. Check `SUPABASE_SETUP.md` for setup instructions
2. Check `QUICK_START.md` for quick setup guide
3. Check Supabase documentation: https://supabase.com/docs
4. Check browser console for specific error messages
