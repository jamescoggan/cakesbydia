# Gallery Images

Place your cake images here!

## How to Add Images

### Step 1: Add Image Files
Copy your cake images to this folder:
```
public/images/gallery/
```

Supported formats:
- `.jpg` / `.jpeg`
- `.png`
- `.webp`
- `.gif`

### Step 2: Add to Gallery JSON
Run this command to automatically add all images to the gallery:

```bash
npm run add-images
```

Or add specific images:
```bash
npm run add-images image1.jpg image2.jpg image3.jpg
```

### Step 3: Rebuild
```bash
npm run build
npm run serve:network
```

## Image Recommendations

- **Size**: 1080x1080 pixels or larger
- **Format**: JPG for photos, PNG for graphics with transparency
- **File size**: Keep under 2MB per image for faster loading
- **Aspect ratio**: Any ratio works, but square (1:1) or portrait (3:4) look best

## File Structure

```
public/
├── images/
│   └── gallery/
│       ├── cake1.jpg      ← Your images here
│       ├── cake2.jpg
│       └── cake3.jpg
└── cakes-gallery.json     ← Gallery data (auto-updated)
```

## Manual Method

You can also manually edit `cakes-gallery.json` and add entries like:

```json
{
  "id": 16,
  "url": "/images/gallery/your-image.jpg",
  "source": "@cakes_by_dia",
  "description": "Your cake description",
  "style": "Your style"
}
```

