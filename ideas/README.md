# Flight Labs Blog - "Ideas"

A neobrutalist-styled blog system with Supabase backend and rich text editing.

## Features

- ✅ Rich text editor (Quill.js) with formatting, images, tables, code blocks
- ✅ Featured images for posts
- ✅ Auto-generated slugs from titles
- ✅ Draft/Published status
- ✅ Reading time calculation
- ✅ Responsive design matching Flight Labs aesthetic
- ✅ Email subscriber capture
- ✅ Supabase backend for posts and emails

## Quick Start

### 1. Set up Supabase

Follow the instructions in `../SUPABASE_SETUP.md` to:
- Create your Supabase project
- Set up database tables
- Configure your credentials

### 2. Access the Admin Panel

Open `/ideas/admin.html` in your browser to:
- Create new blog posts
- Edit existing posts
- Delete posts
- Toggle published status

### 3. Create Your First Post

1. Click "New Post" in the admin panel
2. Enter a title (slug auto-generates)
3. Add an excerpt (optional but recommended)
4. Paste a featured image URL (optional)
5. Write your content using the rich text editor
6. Check "Published" when ready
7. Click "Save Post"

### 4. Generate Post Page

After creating a post in the admin panel, generate its HTML file:

```bash
cd ideas
node generate-post.js your-post-slug
```

This creates `your-post-slug.html` which will load content from Supabase.

### 5. View Your Blog

- Blog listing: `/ideas/`
- Individual post: `/ideas/your-post-slug.html`

## Editor Features

The Quill editor supports:

- **Headings** (H1-H6)
- **Text formatting** (bold, italic, underline, strikethrough)
- **Lists** (ordered and unordered)
- **Indentation**
- **Alignment**
- **Blockquotes**
- **Code blocks**
- **Links**
- **Images** (paste URL)
- **Videos** (embed URL)
- **Colors** (text and background)

## File Structure

```
ideas/
├── index.html           # Blog listing page
├── admin.html          # Admin panel for managing posts
├── post-template.html  # Template for individual posts
├── generate-post.js    # Script to create post pages
└── README.md          # This file

js/
└── supabase-config.js  # Supabase configuration
```

## Workflow

1. **Create post** in admin panel
2. **Generate HTML** file using the script
3. **Post goes live** at `/ideas/{slug}.html`
4. **Edit anytime** in admin panel (content updates automatically)

## Email Subscribers

Email addresses captured from the footer form are stored in the `email_subscribers` table in Supabase. You can:

- Export them from Supabase dashboard
- Use them with email marketing tools
- Build a custom email sending system

## Customization

### Styling

The blog uses the same neobrutalist design as the main site:
- Thick black borders
- Offset shadows
- Bold typography
- Marker and handwriting fonts

Edit the `<style>` sections in each HTML file to customize.

### Editor Toolbar

Modify the toolbar configuration in `admin.html`:

```javascript
modules: {
    toolbar: [
        // Add or remove tools here
    ]
}
```

### Post Template

Customize `post-template.html` to change:
- Layout
- Typography
- Metadata
- Social sharing buttons
- Comments section

## Production Tips

1. **Add Authentication** to the admin panel
2. **Set up image hosting** (Supabase Storage or Cloudinary)
3. **Automate post generation** with a build script
4. **Add SEO meta tags** to post template
5. **Set up analytics** (Plausible, Fathom, etc.)
6. **Add social sharing** buttons
7. **Implement search** functionality
8. **Add categories/tags** to posts

## Troubleshooting

### Posts not loading?
- Check Supabase credentials in `js/supabase-config.js`
- Verify database tables are created
- Check browser console for errors

### Can't save posts?
- Ensure RLS policies are set up correctly
- Check if you're authenticated (if required)
- Verify all required fields are filled

### Images not showing?
- Use full URLs (https://...)
- Check image URLs are accessible
- Consider using Supabase Storage

## Support

For issues or questions:
- Check `SUPABASE_SETUP.md` for database setup
- Review Supabase documentation
- Check browser console for errors
