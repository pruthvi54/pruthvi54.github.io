# Projects Structure Guide

This folder contains all detailed project pages. Each project has its own organized folder with code, content, and media assets.

## 📁 Folder Structure

```
src/pages/projects/
├── README.md                          # This file
├── _template/                         # Template for new projects
│   ├── index.tsx                      # Component template
│   ├── data.ts                        # Content template
│   └── README.md                      # Instructions
│
├── auv-simulation/                    # Example project
│   ├── index.tsx                      # Page component
│   └── data.ts                        # Project content/metadata
│
└── [your-project-name]/               # Future projects
    ├── index.tsx
    └── data.ts

public/projects/
├── auv-simulation/                    # Project assets
│   ├── images/                        # Screenshots, diagrams
│   │   ├── screenshot1.png
│   │   └── diagram.jpg
│   ├── videos/                        # Demo videos
│   │   └── demo.mp4
│   └── documents/                     # PDFs, papers
│       └── paper.pdf
│
└── [your-project-name]/
    ├── images/
    ├── videos/
    └── documents/
```

---

## 🚀 Adding a New Project

### Step 1: Create Project Folders

```bash
# Create source folder
mkdir -p src/pages/projects/my-project

# Create assets folder
mkdir -p public/projects/my-project/{images,videos,documents}
```

### Step 2: Copy Template Files

```bash
# Copy component and data templates
cp src/pages/projects/_template/index.tsx src/pages/projects/my-project/
cp src/pages/projects/_template/data.ts src/pages/projects/my-project/
```

### Step 3: Update Content

1. **Edit `data.ts`** - Fill in your project details:
   - Title, description, status
   - Tags, technologies
   - Overview, features, technical details
   - Update media paths when you add images/videos

2. **Edit `index.tsx`** - Customize the component if needed:
   - Usually just import the data file
   - Adjust layout if you need custom sections

### Step 4: Add to ProjectsPage

In `src/pages/ProjectsPage.tsx`, add your project to the array:

```tsx
{
  title: 'My Project Name',
  desc: 'Short description',
  tags: ['Tag1', 'Tag2'],
  status: 'Active',
  details: 'Longer description...',
  detailsLink: '/projects/my-project'  // Add this!
}
```

### Step 5: Add Route

In `src/App.tsx`, add the route:

```tsx
import MyProject from "@/pages/projects/my-project";

// In Router component:
<Route path="/projects/my-project" component={MyProject} />
```

### Step 6: Add Your Media

Place your files in the appropriate folders:

```bash
# Add images
cp screenshot.png public/projects/my-project/images/

# Add videos
cp demo.mp4 public/projects/my-project/videos/

# Add documents
cp paper.pdf public/projects/my-project/documents/
```

Update the paths in `data.ts`:

```ts
images: [
  {
    url: "/projects/my-project/images/screenshot.png",
    alt: "Screenshot description",
    caption: "My screenshot"
  }
]
```

---

## 📝 Content Guidelines

### Project Naming Convention
- Use **lowercase** with **hyphens** for folder names
- Examples: `auv-simulation`, `ev-torque-control`, `ship-simulator`

### Image Guidelines
- **Format**: PNG for screenshots, JPG for photos
- **Size**: Max 1920px wide, optimize for web
- **Naming**: Descriptive names like `simulink-model.png`, `gazebo-view.jpg`

### Video Guidelines
- **Format**: MP4 (H.264)
- **Size**: Max 50MB, use compression
- **Alternative**: Host on YouTube and use embed URL

### Document Guidelines
- **Format**: PDF
- **Size**: Max 10MB
- Papers, posters, technical reports

---

## 🎨 Customization

### Adding Custom Sections

You can add custom sections to your project page:

```tsx
{/* In your index.tsx, add after existing sections */}
<div>
  <h2 className="text-3xl font-bold mb-4">Custom Section</h2>
  <p>Your custom content here...</p>
</div>
```

### Changing Colors

Each feature can have a different color accent. Available colors in `data.ts`:
- `blue`, `purple`, `green`, `orange`, `red`, `yellow`

### Adding Interactive Elements

You can add:
- Image galleries
- Video embeds (YouTube, Vimeo)
- Interactive demos (if you have them)
- Code snippets with syntax highlighting

---

## 🧪 Testing Your Project Page

1. **Start dev server**: `npm run dev`
2. **Visit**: `http://localhost:5173/projects/your-project`
3. **Check**:
   - All images load
   - Videos play
   - Links work
   - Responsive on mobile
   - Dark mode looks good

---

## 📦 Before Deploying

### Checklist:
- [ ] All images optimized for web
- [ ] Videos compressed (or use YouTube)
- [ ] Links tested and working
- [ ] Content proofread
- [ ] Mobile view tested
- [ ] Dark/light themes tested
- [ ] "Read More" button added to ProjectsPage

### Deploy:
```bash
./quick-deploy.sh "Add new project: My Project Name"
```

---

## 🔧 Maintenance

### Updating a Project
1. Edit `data.ts` to update content
2. Add/replace images in `public/projects/[name]/images/`
3. Deploy changes

### Archiving a Project
1. Change status to `"Completed"` in both files
2. Optionally remove the `detailsLink` to hide "Read More"

---

## 💡 Tips

- **Keep it organized**: One project = one folder
- **Reuse components**: The template works for most projects
- **Optimize media**: Large files slow down your site
- **Update regularly**: Keep project status current
- **Link related work**: Cross-reference publications, GitHub

---

## 🆘 Need Help?

Check the AUV project as a complete example:
- `src/pages/projects/auv-simulation/`
- `public/projects/auv-simulation/`

The template folder has all the starting files you need!

