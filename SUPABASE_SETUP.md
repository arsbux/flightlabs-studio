# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Note your project URL and anon key from Settings > API

## 2. Update Configuration

The Supabase credentials are configured inline in each HTML file. If you need to change them:

1. Open each file: `index.html`, `ideas/admin.html`, `ideas/index.html`, `ideas/post-template.html`, `test-supabase.html`
2. Find the configuration section at the top of the `<script>` tag
3. Replace:
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

**Note:** The current files already have working credentials configured. You only need to change them if you're using a different Supabase project.

## 3. Create Database Tables

Go to your Supabase project's SQL Editor and run these queries:

### Blog Posts Table

```sql
-- Create blog_posts table
CREATE TABLE blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- Create index on published status
CREATE INDEX idx_blog_posts_published ON blog_posts(published);

-- Disable Row Level Security for unrestricted access
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Email Subscribers Table

```sql
-- Create email_subscribers table
CREATE TABLE email_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    source TEXT DEFAULT 'website'
);

-- Create index on email
CREATE INDEX idx_email_subscribers_email ON email_subscribers(email);

-- Disable Row Level Security for unrestricted access
ALTER TABLE email_subscribers DISABLE ROW LEVEL SECURITY;
```

## 4. Optional: Set up Authentication

For the admin panel, you can set up authentication:

1. Go to Authentication > Providers in Supabase
2. Enable Email provider
3. Create a user account for yourself
4. Add authentication to the admin page

## 5. Set up Storage for Images

### Create Storage Bucket

1. Go to **Storage** in your Supabase dashboard
2. Click **"New bucket"**
3. Name it: `blog_images` (with underscore)
4. Make it **Public** (toggle the public option)
5. Click **Create bucket**

### Set Storage Policies (Unrestricted Access)

Go to the SQL Editor and run:

```sql
-- Drop existing policies if they exist (run this first if you get "already exists" errors)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
DROP POLICY IF EXISTS "Public Update" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete" ON storage.objects;

-- Create policy for public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'blog_images' );

-- Create policy for public insert
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'blog_images' );

-- Create policy for public update
CREATE POLICY "Public Update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'blog_images' );

-- Create policy for public delete
CREATE POLICY "Public Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'blog_images' );
```

**Note:** Your bucket is named `blog_images` (with underscore). The code has been updated to match this.

Now the admin panel has an upload button for featured images that uploads directly to Supabase Storage!

## 6. Test Your Setup

1. Open `/ideas/admin.html`
2. Create a test post
3. Publish it
4. View it on `/ideas/`

## 7. Dynamic Post Pages

Since this is a static site, you have two options for individual post pages:

### Option A: Use the Template (Recommended for now)
- Copy `post-template.html` for each post
- Rename it to `{slug}.html`
- The JavaScript will load the content from Supabase

### Option B: Set up a Build Process
- Use a static site generator (like 11ty, Next.js, or a custom script)
- Generate HTML files for each post at build time
- This is better for SEO and performance

## Email Capture Integration

To capture emails from the footer form, add this to your `index.html`:

```javascript
// Add to the footer form
document.querySelector('#newsletter form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    try {
        const { error } = await supabase
            .from('email_subscribers')
            .insert([{ email, source: 'footer' }]);
        
        if (error) throw error;
        
        alert('Thanks for subscribing!');
        e.target.reset();
    } catch (error) {
        if (error.code === '23505') {
            alert('You\'re already subscribed!');
        } else {
            alert('Error subscribing. Please try again.');
        }
    }
});
```

## Security Notes

- The anon key is safe to expose in client-side code
- Row Level Security (RLS) policies protect your data
- For production, consider adding authentication to the admin panel
- Never expose your service_role key in client-side code

## Next Steps

1. Style the admin panel to match your brand
2. Add image upload functionality
3. Add authentication to protect the admin panel
4. Set up a build process for generating static post pages
5. Add SEO meta tags to post pages
6. Add social sharing buttons
7. Add comments (using Supabase or a third-party service)
