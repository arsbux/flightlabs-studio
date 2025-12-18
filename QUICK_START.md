# Quick Start Guide - Flight Labs Blog

## 🚀 Get Started in 5 Minutes

### Step 1: Supabase Setup (2 min)
1. Go to [supabase.com](https://supabase.com) → Create project
2. Copy your project URL and anon key
3. **Note:** The files already have working credentials configured!
   - If using a different project, update the credentials in each HTML file
   - Look for `SUPABASE_URL` and `SUPABASE_ANON_KEY` in the `<script>` sections

### Step 2: Database Setup (2 min)
1. Open Supabase SQL Editor
2. Copy SQL from `SUPABASE_SETUP.md`
3. Run both queries (blog_posts and email_subscribers)

### Step 2.5: Storage Setup (1 min)
1. Go to Storage in Supabase
2. Create bucket named `blog-images` (make it public)
3. Run storage policies SQL from `SUPABASE_SETUP.md`

### Step 3: Test Connection (1 min)
1. Open `test-supabase.html` in browser
2. Verify all tests pass ✅
3. If errors, check credentials and SQL

### Step 4: Create First Post
1. Open `/ideas/admin.html`
2. Click "New Post"
3. Write your post
4. Check "Published"
5. Save

### Step 5: Generate Post Page
```bash
cd ideas
node generate-post.js your-post-slug
```

### Step 6: View Your Blog
- Blog listing: `/ideas/`
- Your post: `/ideas/your-post-slug.html`
- Admin panel: `/ideas/admin.html`

## 📁 Key Files

| File | Purpose |
|------|---------|
| `ideas/admin.html` | Create/edit posts |
| `ideas/index.html` | Blog listing |
| `ideas/post-template.html` | Post template |
| `js/supabase-config.js` | Database config |
| `test-supabase.html` | Test connection |

## 🎯 Common Tasks

### Create a Post
1. Admin panel → New Post
2. Write content
3. Publish
4. Generate HTML: `node generate-post.js slug`

### Edit a Post
1. Admin panel → Edit
2. Make changes
3. Save (no need to regenerate HTML)

### View Subscribers
1. Supabase dashboard
2. Table Editor → email_subscribers

## 🆘 Troubleshooting

**Posts not loading?**
- Check `js/supabase-config.js` credentials
- Run `test-supabase.html`
- Check browser console

**Can't save posts?**
- Verify SQL queries ran successfully
- Check RLS policies in Supabase

**Images not showing?**
- Use full URLs (https://...)
- Consider Supabase Storage

## 📚 Documentation

- **Full Setup**: `SUPABASE_SETUP.md`
- **Blog Guide**: `ideas/README.md`
- **Complete Summary**: `BLOG_SYSTEM_SUMMARY.md`

## ✨ Features

✅ Rich text editor (like Google Docs)
✅ **Image upload** (direct to Supabase Storage)
✅ Featured images with preview
✅ Auto-generated slugs
✅ Draft/Published status
✅ Email capture
✅ Reading time
✅ Responsive design
✅ Neobrutalist styling
✅ **Unrestricted access** (no auth required)

## 🎨 Customization

Edit these files to customize:
- `ideas/admin.html` - Admin panel
- `ideas/index.html` - Blog listing
- `ideas/post-template.html` - Post layout
- Styles in `<style>` tags

## 🔐 Security

- RLS enabled on all tables
- Public can only read published posts
- Anon key safe for client-side
- Add auth for production admin panel

## 📈 Next Steps

1. ✅ Set up Supabase
2. ✅ Create first post
3. ✅ Test everything
4. 🔲 Add authentication
5. 🔲 Set up image hosting
6. 🔲 Add SEO meta tags
7. 🔲 Launch! 🚀

---

Need help? Check the detailed docs or open an issue!
