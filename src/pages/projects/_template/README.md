# Project Template

This template provides everything you need to create a new detailed project page.

## 🚀 Quick Start

### 1. Copy the Template

```bash
# Replace 'my-project' with your project name (lowercase, hyphenated)
cp -r src/pages/projects/_template src/pages/projects/my-project

# Create assets folders
mkdir -p public/projects/my-project/{images,videos,documents}
```

### 2. Update Component Name

Edit `src/pages/projects/my-project/index.tsx`:

```tsx
// Change this:
export default function ProjectTemplate() {

// To this (use PascalCase):
export default function MyProject() {
```

### 3. Fill in Your Content

Edit `src/pages/projects/my-project/data.ts`:
- Update title, description, status
- Add your tags
- Fill in overview paragraphs
- Add features, technical details
- Update results
- Set media paths (after adding your files)

### 4. Add Your Media Files

```bash
# Add images
cp your-screenshot.png public/projects/my-project/images/

# Add videos  
cp your-demo.mp4 public/projects/my-project/videos/

# Update paths in data.ts
```

### 5. Add to Projects List

Edit `src/pages/ProjectsPage.tsx`, add your project:

```tsx
{
  title: 'My Project Name',
  desc: 'Short description',
  tags: ['Tag1', 'Tag2'],
  status: 'Active',
  details: 'Longer description...',
  detailsLink: '/projects/my-project'  // Important!
}
```

### 6. Add Route

Edit `src/App.tsx`:

```tsx
// Import
import MyProject from "@/pages/projects/my-project";

// Add route in Router function
<Route path="/projects/my-project" component={MyProject} />
```

### 7. Test Locally

```bash
npm run dev
# Visit: http://localhost:5173/projects/my-project
```

### 8. Deploy

```bash
./quick-deploy.sh "Add My Project detailed page"
```

---

## 📝 Files in This Template

- **`index.tsx`**: The React component (page layout)
- **`data.ts`**: All your project content and metadata
- **`README.md`**: This file

---

## 💡 Tips

- Keep project folder names **lowercase** with **hyphens**
- Use **descriptive names** that match your project
- Optimize images before adding (max 1920px wide)
- Compress videos or use YouTube embeds
- Test in both light and dark modes
- Check mobile responsiveness

---

## 🎨 Customization

The template is flexible! You can:
- Add custom sections to `index.tsx`
- Change color schemes
- Add more images/videos
- Include code snippets
- Add interactive elements

See the main README for more details:
`src/pages/projects/README.md`

