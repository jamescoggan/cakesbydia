# Cakes by Dia - GitHub Pages Deployment

This Next.js website is configured to deploy to GitHub Pages.

## 🚀 Quick Setup

1. **Push to GitHub**: Push this repository to GitHub (if not already done)

2. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Under "Source", select "GitHub Actions" (not "Deploy from a branch")  <- This!
   - Save

3. **Configure Base Path** (if needed):
   - If your repository name is NOT the root domain (e.g., `username.github.io`), you need to set the base path
   - Edit `.github/workflows/deploy.yml` and set `NEXT_PUBLIC_BASE_PATH` to your repo name:
     ```yaml
     NEXT_PUBLIC_BASE_PATH: '/your-repo-name'
     ```
   - Also update `next.config.js` if you want to set it permanently

4. **Deploy**: 
   - Push to `main` or `master` branch
   - GitHub Actions will automatically build and deploy your site
   - Check the "Actions" tab in your repository to see the deployment progress

## 📝 Notes

- The contact form now opens Gmail directly (no API routes needed for static hosting)
- The site is built as a static export, so all features work without a server
- Your site will be available at: `https://yourusername.github.io/repository-name/` (or your custom domain)

## 🛠️ Local Development

```bash
cd cakes_by_dia_website/nextjs_space
npm install
npm run dev
```

## 📦 Build and Test Locally (Static Export)

To test the static export (same as GitHub Pages) before pushing:

```bash
cd cakes_by_dia_website/nextjs_space

# Install dependencies (if not already done)
npm install

# Build the static export
npm run build

# Serve locally (accessible from same machine)
npm run serve

# OR serve on network (accessible from other devices on your network)
npm run serve:network
```

### Accessing from Another Device (e.g., Mac)

1. **Build and serve on network**:
   ```bash
   npm run serve:network
   ```

2. **Find your Linux machine's IP address**:
   ```bash
   ip addr show | grep "inet " | grep -v 127.0.0.1
   # Or use: hostname -I
   ```

3. **Access from your Mac**:
   - Open browser on Mac
   - Go to: `http://YOUR_LINUX_IP:3000`
   - Example: `http://192.168.1.100:3000`

**Note**: Make sure your Linux firewall allows incoming connections on port 3000:
```bash
# If using ufw (Ubuntu/Debian)
sudo ufw allow 3000/tcp

# If using firewalld (Fedora/RHEL)
sudo firewall-cmd --add-port=3000/tcp --permanent
sudo firewall-cmd --reload
```

## 📸 Adding Images to Gallery

### Method 1: Store Images Locally (Recommended)

This is the best method for production - images are stored in your repository and load faster.

1. **Place images in the gallery folder**:
   ```bash
   # Copy your cake images to:
   cakes_by_dia_website/nextjs_space/public/images/gallery/
   ```

2. **Add images to gallery JSON**:
   ```bash
   cd cakes_by_dia_website/nextjs_space
   npm run add-images
   ```
   
   This automatically finds all images in the gallery folder and adds them to the gallery.

3. **Rebuild**:
   ```bash
   npm run build
   npm run serve:network
   ```

**Image Requirements:**
- Formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
- Recommended size: 1080x1080 or larger
- Keep file sizes under 2MB for faster loading

**Folder Structure:**
```
public/
└── images/
    └── gallery/
        ├── cake1.jpg  ← Your images here
        ├── cake2.jpg
        └── cake3.jpg
```

### Method 2: Add Instagram Photos (External URLs)

### Method 1: Quick Script (Recommended)

1. **Get Instagram image URLs**:
   - Go to https://www.instagram.com/cakes_by_dia/
   - Right-click on any image → "Copy image address"
   - Or open image in new tab and copy the URL

2. **Add to gallery**:
   ```bash
   cd cakes_by_dia_website/nextjs_space
   npm run add-instagram "https://instagram-image-url-1.com" "https://instagram-image-url-2.com"
   ```

3. **Rebuild**:
   ```bash
   npm run build
   ```

### Method 2: Manual Edit

1. Open `cakes_by_dia_website/nextjs_space/public/cakes-gallery.json`
2. Add new image objects to the `elegant_wedding_cake_images_found` array:
   ```json
   {
     "id": 16,
     "url": "YOUR_INSTAGRAM_IMAGE_URL",
     "source": "@cakes_by_dia",
     "description": "Your cake description",
     "style": "Instagram"
   }
   ```

### Method 3: Browser Console (Get Multiple Images)

1. Go to https://www.instagram.com/cakes_by_dia/
2. Open Developer Tools (F12) → Console
3. See `scripts/add-instagram-images.md` for the console script

**Note**: Instagram image URLs may expire. For production, consider downloading and hosting images yourself, or using Instagram's Graph API for automatic updates.

For detailed instructions, see: `cakes_by_dia_website/nextjs_space/scripts/add-instagram-images.md`

