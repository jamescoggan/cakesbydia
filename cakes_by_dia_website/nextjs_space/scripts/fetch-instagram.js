#!/usr/bin/env node

/**
 * Script to fetch Instagram posts from a public profile
 * This script fetches images from Instagram and updates the gallery JSON
 * 
 * Usage:
 *   node scripts/fetch-instagram.js cakes_by_dia
 * 
 * Note: Instagram doesn't provide a simple public API anymore.
 * This script uses a workaround to fetch public profile data.
 */

const fs = require('fs');
const path = require('path');

const INSTAGRAM_USERNAME = process.argv[2] || 'cakes_by_dia';
const GALLERY_JSON_PATH = path.join(__dirname, '../public/cakes-gallery.json');

/**
 * Fetch Instagram posts using a public method
 * Since Instagram's official API requires authentication,
 * we'll use an alternative approach
 */
async function fetchInstagramPosts(username) {
  try {
    // Method 1: Try using a public Instagram profile page
    // Note: Instagram may block this, so we provide a fallback
    
    console.log(`Fetching Instagram posts for @${username}...`);
    
    // For now, we'll provide a manual method
    // You can also use services like:
    // - https://www.instagram.com/{username}/?__a=1&__d=dis (may not work)
    // - Third-party APIs like RapidAPI Instagram endpoints
    // - Instagram Graph API (requires Facebook Developer account)
    
    const profileUrl = `https://www.instagram.com/${username}/`;
    
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║  Instagram Image Fetcher                                     ║
╚══════════════════════════════════════════════════════════════╝

Since Instagram's API requires authentication, here are your options:

OPTION 1: Manual Method (Easiest for static sites)
─────────────────────────────────────────────────
1. Go to https://www.instagram.com/${username}/
2. Open your browser's Developer Tools (F12)
3. Go to Network tab and filter by "graphql" or "media"
4. Look for requests that return JSON with image URLs
5. Copy the image URLs and add them manually to cakes-gallery.json

OPTION 2: Use Instagram Graph API (Requires setup)
──────────────────────────────────────────────────
1. Create a Facebook App at https://developers.facebook.com/
2. Add Instagram Graph API product
3. Get an access token
4. Use: https://graph.instagram.com/me/media?fields=media_url,permalink

OPTION 3: Use a Third-Party Service
────────────────────────────────────
- RapidAPI has Instagram endpoints
- Apify has Instagram scrapers
- Or use services like EmbedSocial, Taggbox, etc.

For now, let's create a template structure...
    `);
    
    return [];
  } catch (error) {
    console.error('Error fetching Instagram posts:', error.message);
    return [];
  }
}

/**
 * Update the gallery JSON with Instagram images
 */
function updateGalleryJSON(instagramImages) {
  try {
    // Read existing gallery
    let galleryData = { images: [] };
    
    if (fs.existsSync(GALLERY_JSON_PATH)) {
      const existingData = fs.readFileSync(GALLERY_JSON_PATH, 'utf8');
      galleryData = JSON.parse(existingData);
    }
    
    // If galleryData has a different structure, adapt it
    if (!galleryData.images && Array.isArray(galleryData)) {
      galleryData = { images: galleryData };
    }
    
    // Get the highest existing ID
    const maxId = galleryData.images.length > 0 
      ? Math.max(...galleryData.images.map(img => img.id || 0))
      : 0;
    
    // Add Instagram images with new IDs
    const newImages = instagramImages.map((img, index) => ({
      id: maxId + index + 1,
      url: img.url,
      source: `@${INSTAGRAM_USERNAME}`,
      description: img.caption || `Instagram post from @${INSTAGRAM_USERNAME}`,
      style: 'Instagram',
      isInstagram: true,
      instagramUrl: img.permalink || `https://www.instagram.com/p/${img.shortcode}/`
    }));
    
    // Merge with existing images (avoid duplicates)
    const existingUrls = new Set(galleryData.images.map(img => img.url));
    const uniqueNewImages = newImages.filter(img => !existingUrls.has(img.url));
    
    galleryData.images = [...galleryData.images, ...uniqueNewImages];
    
    // Write updated gallery
    fs.writeFileSync(
      GALLERY_JSON_PATH,
      JSON.stringify(galleryData, null, 2),
      'utf8'
    );
    
    console.log(`\n✅ Updated gallery with ${uniqueNewImages.length} new Instagram images!`);
    console.log(`📁 Gallery file: ${GALLERY_JSON_PATH}`);
    
    return galleryData;
  } catch (error) {
    console.error('Error updating gallery JSON:', error.message);
    throw error;
  }
}

/**
 * Helper function to extract image URLs from Instagram HTML
 * This is a fallback method
 */
function extractImageUrlsFromHTML(html) {
  const imageUrls = [];
  const regex = /"display_url":"([^"]+)"/g;
  let match;
  
  while ((match = regex.exec(html)) !== null) {
    imageUrls.push({
      url: match[1].replace(/\\u0026/g, '&'),
      source: `@${INSTAGRAM_USERNAME}`
    });
  }
  
  return imageUrls;
}

// Main execution
async function main() {
  console.log(`\n🔍 Fetching Instagram posts for @${INSTAGRAM_USERNAME}\n`);
  
  // For now, create a template structure
  // User can manually add Instagram image URLs
  const template = {
    images: []
  };
  
  console.log(`
📝 To add Instagram images manually:

1. Open your Instagram profile: https://www.instagram.com/${INSTAGRAM_USERNAME}/
2. Right-click on any image and "Copy image address" or "Open image in new tab"
3. Copy the image URL (it will look like: https://instagram.com/p/... or scontent.cdninstagram.com/...)
4. Add it to the gallery JSON file at: ${GALLERY_JSON_PATH}

Or use this format in cakes-gallery.json:
{
  "images": [
    {
      "id": 1,
      "url": "YOUR_INSTAGRAM_IMAGE_URL_HERE",
      "source": "@${INSTAGRAM_USERNAME}",
      "description": "Your cake description",
      "style": "Instagram"
    }
  ]
}
  `);
  
  // Create a helper script for manual URL extraction
  const helperScript = `
// Quick helper: Open Instagram profile and run this in browser console
// to extract image URLs:

(function() {
  const images = [];
  document.querySelectorAll('img').forEach(img => {
    if (img.src && img.src.includes('instagram.com') || img.src.includes('cdninstagram.com')) {
      images.push(img.src);
    }
  });
  console.log('Found images:', images);
  // Copy the URLs and add them to cakes-gallery.json
})();
  `;
  
  fs.writeFileSync(
    path.join(__dirname, 'instagram-helper.js'),
    helperScript,
    'utf8'
  );
  
  console.log(`\n💡 Helper script created: scripts/instagram-helper.js`);
  console.log(`   Run this in your browser console on Instagram to extract image URLs\n`);
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { fetchInstagramPosts, updateGalleryJSON };

