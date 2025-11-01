# Academic Portfolio - GitHub Pages Deployment Guide

A modern, responsive academic personal website with terminal-inspired design, built with React and Tailwind CSS. Easily deployable to GitHub Pages.

## Features

- **Terminal-Inspired Design**: Modern dark/light mode with green accent colors
- **Responsive Layout**: Fully responsive design for mobile, tablet, and desktop
- **Smooth Animations**: Elegant transitions and hover effects
- **SEO Optimized**: Semantic HTML and meta tags for search engine visibility
- **Light/Dark Mode Toggle**: User-friendly theme switching with localStorage persistence
- **Smooth Navigation**: Single-page application with smooth scrolling between sections
- **No Backend Required**: Pure static HTML/CSS/JavaScript - perfect for GitHub Pages

## Sections Included

1. **Home**: Professional introduction with profile photo, tagline, and call-to-action buttons
2. **Research**: Experience entries with achievements and responsibilities
3. **Projects**: Showcase of 4 featured projects with descriptions and links
4. **Publications**: Academic publications with links to PDFs, arXiv, and code repositories
5. **Contact**: Multiple contact methods (email, LinkedIn, GitHub, Twitter)

## Project Structure

```
academic-portfolio/
├── index.html                 # Main HTML file
├── css/
│   └── styles.css            # Main stylesheet with terminal theme
├── js/
│   └── script.js             # JavaScript for theme toggle and navigation
├── images/
│   └── [your-images]         # Place your images here
├── assets/
│   └── [additional-assets]   # Additional assets
├── cv.pdf                    # Your CV file (optional)
└── README.md                 # This file
```

## Getting Started

### 1. Clone or Download

```bash
# Clone the repository
git clone https://github.com/yourusername/academic-portfolio.git
cd academic-portfolio

# Or download as ZIP and extract
```

### 2. Customize Content

Edit `index.html` and replace the sample content with your information:

- **Name and Title**: Update the hero section with your name and professional title
- **Bio**: Replace the introduction text
- **Profile Photo**: Add your photo to the `images/` folder and update the image path
- **Research Experience**: Update research entries with your actual experience
- **Projects**: Replace project descriptions and links with your projects
- **Publications**: Add your publications with links to PDFs and repositories
- **Contact Information**: Update email, LinkedIn, GitHub, and Twitter links
- **CV**: Add your CV file to the root directory and update the download link

### 3. Update Meta Tags (SEO)

In `index.html`, update the meta tags in the `<head>` section:

```html
<meta name="description" content="Your professional description here">
<meta name="author" content="Your Name">
<meta property="og:title" content="Your Name - Academic Portfolio">
<meta property="og:description" content="Your professional description">
```

## Deployment to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `yourusername.github.io` (replace `yourusername` with your GitHub username)
3. Make it public
4. Do NOT initialize with README, .gitignore, or license

### Step 2: Push Your Code

```bash
# Navigate to your project directory
cd academic-portfolio

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Academic portfolio website"

# Add remote repository
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll down to **Pages** section
4. Under "Source", select **main** branch
5. Click **Save**
6. Wait 1-2 minutes for the site to build and deploy

Your site will be available at: `https://yourusername.github.io`

### Step 4: Custom Domain (Optional)

To use a custom domain:

1. In **Settings → Pages**, enter your custom domain in the "Custom domain" field
2. Update your domain's DNS settings to point to GitHub Pages
3. GitHub will automatically create a `CNAME` file

## Customization Guide

### Changing Colors

The terminal-inspired green theme can be customized in `css/styles.css`:

```css
:root {
  --accent-primary: #00ff00;      /* Change green to your color */
  --accent-secondary: #00cc00;
  --accent-tertiary: #00aa00;
}
```

### Adding More Sections

To add new sections:

1. Add a new `<section>` in `index.html` with a unique `id`
2. Add the section to the navigation menu
3. Style it using the existing CSS classes
4. Update `js/script.js` to handle navigation to the new section

### Modifying Fonts

Update the Google Fonts import in `css/styles.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@400;600;700&display=swap');
```

Then update the font-family in the CSS variables.

## SEO Best Practices

1. **Meta Tags**: Ensure all meta tags are filled with accurate information
2. **Semantic HTML**: Use proper heading hierarchy (h1 → h2 → h3)
3. **Alt Text**: Add alt text to all images
4. **Mobile Responsive**: Test on mobile devices
5. **Page Speed**: Optimize images and minimize CSS/JS
6. **Sitemap**: Consider adding a sitemap.xml for better indexing

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## Performance Tips

1. **Optimize Images**: Compress images before uploading
   - Use tools like [TinyPNG](https://tinypng.com) or [ImageOptim](https://imageoptim.com)
   - Recommended size: < 100KB per image

2. **Lazy Loading**: Images load only when needed
   - Add `loading="lazy"` to img tags

3. **Caching**: GitHub Pages automatically caches assets

## Troubleshooting

### Site Not Showing Up

- Wait 5-10 minutes after pushing code
- Check repository name is `yourusername.github.io`
- Verify repository is public
- Check GitHub Pages is enabled in Settings

### Styling Issues

- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Check CSS file path is correct
- Verify no CSS conflicts in browser DevTools

### Images Not Loading

- Check image paths are relative (e.g., `images/photo.jpg`)
- Verify image files are in the correct folder
- Check file names match exactly (case-sensitive)

## File Size Limits

GitHub Pages has no strict file size limit, but:
- Keep total repository < 1GB
- Individual files should be < 100MB
- Optimize images to keep site fast

## Updating Your Site

To update content:

1. Edit files locally
2. Commit changes: `git add . && git commit -m "Update content"`
3. Push to GitHub: `git push`
4. Changes appear within 1-2 minutes

## Advanced: Using a Build Tool

For more advanced customization, you can use build tools:

```bash
# Install Node.js if not already installed

# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Deploy the dist/ folder to GitHub Pages
```

## License

This template is provided as-is for personal use. Customize it freely for your portfolio.

## Support & Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [MDN Web Docs](https://developer.mozilla.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/)

## Tips for Success

1. **Keep It Updated**: Regularly update your research, projects, and publications
2. **Add Links**: Link to your GitHub repositories, papers, and projects
3. **Professional Photo**: Use a high-quality, professional headshot
4. **Proofread**: Check for spelling and grammar errors
5. **Mobile Test**: Test your site on mobile devices before deploying
6. **Analytics**: Add Google Analytics to track visitors (optional)

---

**Ready to deploy?** Follow the GitHub Pages deployment steps above and your academic portfolio will be live in minutes!

For questions or issues, refer to the [GitHub Pages documentation](https://docs.github.com/en/pages) or create an issue in your repository.
