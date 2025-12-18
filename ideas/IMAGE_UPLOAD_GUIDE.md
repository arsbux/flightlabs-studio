# Image Upload Guide

## Overview

The admin panel now supports direct image uploads to Supabase Storage. You can either upload images or paste URLs.

## Setup (One-time)

### 1. Create Storage Bucket

1. Go to **Storage** in Supabase dashboard
2. Click **"New bucket"**
3. Name: `blog-images`
4. Toggle **Public** ON
5. Click **Create bucket**

### 2. Set Storage Policies

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

## Using Image Upload

### Option 1: Upload from Computer

1. Open `/ideas/admin.html`
2. Create or edit a post
3. In the "Featured Image" section, click **"📁 Upload Image"**
4. Select an image file (JPG, PNG, GIF, WebP)
5. Wait for upload to complete
6. Image URL is automatically filled in
7. Preview appears below

### Option 2: Paste URL

1. In the "Featured Image" section
2. Paste any image URL in the text field
3. Preview appears automatically

### Image Requirements

- **Max size**: 5MB
- **Formats**: JPG, PNG, GIF, WebP, SVG
- **Recommended**: 1200x630px for best display

## Features

✅ **Direct upload** to Supabase Storage
✅ **Automatic preview** of uploaded/pasted images
✅ **Unique filenames** to prevent conflicts
✅ **Public URLs** generated automatically
✅ **Remove button** to clear image
✅ **File validation** (type and size)
✅ **Upload progress** indicator

## Troubleshooting

### Upload fails?
- Check storage bucket exists and is named `blog-images`
- Verify storage policies are set (run SQL above)
- Check file size is under 5MB
- Ensure file is an image format

### Image not showing?
- Check the URL is correct
- Verify bucket is set to public
- Try opening the URL directly in browser

### Can't see preview?
- Make sure URL is complete (starts with https://)
- Check browser console for errors
- Try refreshing the page

## Storage Management

### View Uploaded Images

1. Go to **Storage** > **blog-images** in Supabase
2. See all uploaded images
3. Download, delete, or get URLs

### Delete Old Images

1. Go to Storage bucket
2. Select images to delete
3. Click delete button
4. Or use SQL:

```sql
-- List all files
SELECT * FROM storage.objects WHERE bucket_id = 'blog-images';

-- Delete specific file
DELETE FROM storage.objects 
WHERE bucket_id = 'blog-images' 
AND name = 'filename.jpg';
```

## Best Practices

1. **Optimize images** before upload (compress, resize)
2. **Use descriptive names** for better organization
3. **Delete unused images** to save storage space
4. **Use CDN** for better performance (Supabase has built-in CDN)
5. **Backup important images** outside of Supabase

## Storage Limits

Supabase Free Tier:
- **Storage**: 1GB
- **Bandwidth**: 2GB/month
- **File uploads**: 50MB max per file

For more storage, upgrade your Supabase plan.

## Alternative: External Image Hosting

You can also use:
- **Cloudinary** (free tier: 25GB storage)
- **Imgur** (free, unlimited)
- **ImageKit** (free tier: 20GB bandwidth)
- **Your own CDN**

Just paste the URL in the Featured Image field!

## Security Notes

- Storage bucket is **public** (anyone can view images)
- Upload policies allow **unrestricted uploads**
- For production, consider:
  - Adding authentication
  - Limiting file types
  - Adding virus scanning
  - Rate limiting uploads

---

Need help? Check the main `SUPABASE_SETUP.md` or Supabase documentation.
