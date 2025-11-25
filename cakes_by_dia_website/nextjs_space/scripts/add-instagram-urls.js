#!/usr/bin/env node

/**
 * Simple script to add Instagram image URLs to the gallery JSON
 * 
 * Usage:
 *   node scripts/add-instagram-urls.js "https://instagram-image-url-1.com" "https://instagram-image-url-2.com"
 * 
 * Or edit the URLs array in this file and run:
 *   node scripts/add-instagram-urls.js
 */

const fs = require('fs');
const path = require('path');

const GALLERY_JSON_PATH = path.join(__dirname, '../public/cakes-gallery.json');

// Add your Instagram image URLs here, or pass them as command line arguments
const INSTAGRAM_URLS = process.argv.slice(2).length > 0 
  ? process.argv.slice(2)
  : [
    // Add your Instagram image URLs here:
    // 'https://scontent.cdninstagram.com/v/...',
    // 'https://instagram.com/p/ABC123/...',
  ];

function addInstagramImages(urls) {
  if (urls.length === 0) {
    console.log(`
📝 No URLs provided. 

Usage:
  node scripts/add-instagram-urls.js "url1" "url2" "url3"

Or edit this file and add URLs to the INSTAGRAM_URLS array.
    `);
    return;
  }

  try {
    // Read existing gallery
    let galleryData = {};
    
    if (fs.existsSync(GALLERY_JSON_PATH)) {
      const existingData = fs.readFileSync(GALLERY_JSON_PATH, 'utf8');
      galleryData = JSON.parse(existingData);
    }

    // Determine which array to use
    let imagesArray = null;
    if (galleryData.images && Array.isArray(galleryData.images)) {
      imagesArray = galleryData.images;
    } else if (galleryData.elegant_wedding_cake_images_found && Array.isArray(galleryData.elegant_wedding_cake_images_found)) {
      imagesArray = galleryData.elegant_wedding_cake_images_found;
    } else {
      // Create new structure
      galleryData.images = [];
      imagesArray = galleryData.images;
    }

    // Get the highest existing ID
    const maxId = imagesArray.length > 0 
      ? Math.max(...imagesArray.map(img => img.id || 0))
      : 0;

    // Add new Instagram images
    const existingUrls = new Set(imagesArray.map(img => img.url));
    const newImages = [];

    urls.forEach((url, index) => {
      if (!existingUrls.has(url)) {
        newImages.push({
          id: maxId + index + 1,
          url: url.trim(),
          source: '@cakes_by_dia',
          description: `Instagram post from @cakes_by_dia`,
          style: 'Instagram',
          isInstagram: true
        });
      }
    });

    if (newImages.length === 0) {
      console.log('⚠️  All URLs already exist in gallery or no valid URLs provided.');
      return;
    }

    // Add to the appropriate array
    if (galleryData.images) {
      galleryData.images = [...galleryData.images, ...newImages];
    } else if (galleryData.elegant_wedding_cake_images_found) {
      galleryData.elegant_wedding_cake_images_found = [...galleryData.elegant_wedding_cake_images_found, ...newImages];
    }

    // Write updated gallery
    fs.writeFileSync(
      GALLERY_JSON_PATH,
      JSON.stringify(galleryData, null, 2),
      'utf8'
    );

    console.log(`\n✅ Successfully added ${newImages.length} Instagram image(s) to gallery!`);
    console.log(`📁 Updated: ${GALLERY_JSON_PATH}\n`);
    console.log('📋 Added images:');
    newImages.forEach(img => {
      console.log(`   - ID ${img.id}: ${img.url.substring(0, 60)}...`);
    });
    console.log(`\n💡 Next step: Run 'npm run build' to rebuild the site.\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run
addInstagramImages(INSTAGRAM_URLS);

