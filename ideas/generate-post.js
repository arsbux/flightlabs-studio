#!/usr/bin/env node

/**
 * Simple script to generate individual blog post HTML files
 * Usage: node generate-post.js <slug>
 * 
 * This creates a copy of post-template.html named {slug}.html
 * The page will dynamically load content from Supabase based on the slug
 */

const fs = require('fs');
const path = require('path');

const slug = process.argv[2];

if (!slug) {
    console.error('Usage: node generate-post.js <slug>');
    console.error('Example: node generate-post.js my-first-post');
    process.exit(1);
}

const templatePath = path.join(__dirname, 'post-template.html');
const outputPath = path.join(__dirname, `${slug}.html`);

if (!fs.existsSync(templatePath)) {
    console.error('Error: post-template.html not found');
    process.exit(1);
}

if (fs.existsSync(outputPath)) {
    console.error(`Error: ${slug}.html already exists`);
    process.exit(1);
}

try {
    fs.copyFileSync(templatePath, outputPath);
    console.log(`✅ Created ${slug}.html`);
    console.log(`   View at: /ideas/${slug}.html`);
} catch (error) {
    console.error('Error creating file:', error.message);
    process.exit(1);
}
