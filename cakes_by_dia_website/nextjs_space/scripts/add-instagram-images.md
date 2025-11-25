# How to Add Instagram Images to Your Gallery

## Quick Method (Easiest)

### Step 1: Get Instagram Image URLs

1. Go to https://www.instagram.com/cakes_by_dia/
2. Open any post you want to add
3. Right-click on the image → "Copy image address" or "Open image in new tab"
4. Copy the full image URL (it will look like: `https://scontent.cdninstagram.com/v/...`)

### Step 2: Add to Gallery JSON

1. Open `public/cakes-gallery.json`
2. Find the `elegant_wedding_cake_images_found` array (or `images` array if it exists)
3. Add a new object with this format:

```json
{
  "id": 16,
  "url": "YOUR_INSTAGRAM_IMAGE_URL_HERE",
  "source": "@cakes_by_dia",
  "description": "Description of your cake",
  "dimensions": "1080x1080",
  "style": "Your cake style"
}
```

### Step 3: Rebuild

```bash
npm run build
npm run serve:network
```

## Browser Console Method (Get Multiple Images at Once)

1. Go to https://www.instagram.com/cakes_by_dia/
2. Open browser Developer Tools (F12)
3. Go to Console tab
4. Paste this code:

```javascript
// Extract Instagram image URLs
const images = [];
document.querySelectorAll('img').forEach(img => {
  const src = img.src || img.getAttribute('srcset')?.split(' ')[0];
  if (src && (src.includes('cdninstagram.com') || src.includes('instagram.com'))) {
    // Get the highest resolution version
    const highRes = src.replace(/\/s\d+x\d+\//, '/').replace(/\?.*$/, '');
    if (!images.includes(highRes)) {
      images.push(highRes);
    }
  }
});
console.log('Found', images.length, 'images:');
images.forEach((url, i) => console.log(`${i + 1}. ${url}`));
// Copy the URLs and add them to cakes-gallery.json
```

5. Copy the URLs from the console
6. Add them to your `cakes-gallery.json` file

## Using Instagram Graph API (Advanced)

If you want automatic updates, you can set up Instagram Graph API:

1. Create a Facebook App at https://developers.facebook.com/
2. Add Instagram Graph API product
3. Get an access token
4. Use the API endpoint: `https://graph.instagram.com/me/media?fields=media_url,permalink&access_token=YOUR_TOKEN`

## Notes

- Instagram image URLs may expire after some time
- For best results, download images and host them yourself, or use Instagram's CDN URLs
- Make sure images are public (not from a private account)

