#!/usr/bin/env node

/**
 * Script to add local images to the gallery JSON
 * 
 * Usage:
 *   node scripts/add-local-images.js image1.jpg image2.jpg image3.jpg
 * 
 * Or just place images in public/images/gallery/ and run:
 *   node scripts/add-local-images.js
 */

const fs = require('fs');
const path = require('path');

const GALLERY_JSON_PATH = path.join(__dirname, '../public/cakes-gallery.json');
const GALLERY_IMAGES_DIR = path.join(__dirname, '../public/images/gallery');

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

function getImageFiles(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }
  
  const files = fs.readdirSync(directory);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext);
  });
}

function addLocalImages(imageFiles) {
  if (imageFiles.length === 0) {
    console.log(`
📝 No images found.

Usage:
  node scripts/add-local-images.js image1.jpg image2.jpg

Or place images in: ${GALLERY_IMAGES_DIR}
Then run: node scripts/add-local-images.js

The script will automatically find all images in the gallery folder.
    `);
    
    // Check if there are images in the gallery folder
    const existingImages = getImageFiles(GALLERY_IMAGES_DIR);
    if (existingImages.length > 0) {
      console.log(`\n📸 Found ${existingImages.length} image(s) in gallery folder:`);
      existingImages.forEach(img => console.log(`   - ${img}`));
      console.log(`\n💡 Run the script again to add them to the gallery JSON.\n`);
      return;
    }
    
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

    // Process image files
    const existingUrls = new Set(imagesArray.map(img => img.url));
    const newImages = [];
    let currentId = maxId;

    imageFiles.forEach((imageFile, index) => {
      // Create URL path (relative to public folder)
      const imageUrl = `/images/gallery/${imageFile}`;
      
      if (!existingUrls.has(imageUrl)) {
        currentId++;
        newImages.push({
          id: currentId,
          url: imageUrl,
          source: '@cakes_by_dia',
          description: `Cake ${currentId} from Cakes by Dia`,
          style: 'Gallery',
          isLocal: true
        });
      }
    });

    if (newImages.length === 0) {
      console.log('⚠️  All images already exist in gallery or no valid images provided.');
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

    console.log(`\n✅ Successfully added ${newImages.length} image(s) to gallery!`);
    console.log(`📁 Updated: ${GALLERY_JSON_PATH}\n`);
    console.log('📋 Added images:');
    newImages.forEach(img => {
      console.log(`   - ID ${img.id}: ${img.url}`);
    });
    console.log(`\n💡 Next step: Run 'npm run build' to rebuild the site.\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Main execution
const args = process.argv.slice(2);

if (args.length > 0) {
  // Images provided as arguments
  addLocalImages(args);
} else {
  // Auto-detect images in gallery folder
  const images = getImageFiles(GALLERY_IMAGES_DIR);
  if (images.length > 0) {
    console.log(`\n📸 Found ${images.length} image(s) in gallery folder\n`);
    addLocalImages(images);
  } else {
    addLocalImages([]);
  }
}

