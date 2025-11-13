# 📁 Project Structure Overview

## Complete Organized Structure for Projects

Your project pages are now professionally organized for scalability!

---

## 🗂️ Current Structure

```
pruthviraj.github.io/
│
├── src/pages/projects/
│   ├── README.md                          # Main documentation
│   │
│   ├── _template/                         # Template for new projects
│   │   ├── index.tsx                      # Component template
│   │   ├── data.ts                        # Content template
│   │   └── README.md                      # Quick start guide
│   │
│   └── auv-simulation/                    # Example: AUV Project
│       ├── index.tsx                      # Page component
│       └── data.ts                        # Project content
│
└── public/projects/
    └── auv-simulation/                    # Project assets
        ├── images/                        # Screenshots, diagrams
        ├── videos/                        # Demo videos
        └── documents/                     # PDFs, papers
```

---

## ✨ What's New

### 1. **Organized Project Folders**
Each project now has its own dedicated folder containing:
- Component code (`index.tsx`)
- Content data (`data.ts`)
- Assets folder in `public/projects/[project-name]/`

### 2. **Template System**
Copy `_template/` folder to create new projects quickly:
```bash
cp -r src/pages/projects/_template src/pages/projects/new-project
```

### 3. **Separation of Content & Code**
- **`index.tsx`**: Page layout and structure (rarely changes)
- **`data.ts`**: All content, text, media paths (easy to update)

### 4. **Asset Management**
All media files organized by project:
```
public/projects/[project-name]/
├── images/      # .png, .jpg, .gif
├── videos/      # .mp4, .webm
└── documents/   # .pdf
```

---

## 🎯 Benefits

✅ **Scalable**: Add unlimited projects without cluttering
✅ **Organized**: Each project is self-contained
✅ **Easy to Find**: Clear naming and structure
✅ **Fast Updates**: Just edit `data.ts` for content changes
✅ **Reusable**: Template speeds up new project creation
✅ **Clean**: Media files don't mix between projects

---

## 📝 Adding a New Project (5 Steps)

### Step 1: Copy Template
```bash
cp -r src/pages/projects/_template src/pages/projects/my-project
mkdir -p public/projects/my-project/{images,videos,documents}
```

### Step 2: Rename Component
In `src/pages/projects/my-project/index.tsx`:
```tsx
export default function MyProject() {  // Change from ProjectTemplate
```

### Step 3: Fill Content
Edit `src/pages/projects/my-project/data.ts` with your project details.

### Step 4: Add Media
```bash
cp screenshot.png public/projects/my-project/images/
# Update paths in data.ts
```

### Step 5: Link It
- Add to `ProjectsPage.tsx` with `detailsLink: '/projects/my-project'`
- Add route in `App.tsx`: `<Route path="/projects/my-project" component={MyProject} />`

**Deploy**: `./quick-deploy.sh "Add my-project details"`

---

## 📊 Current Status

### Implemented:
- ✅ Organized folder structure
- ✅ AUV project as example
- ✅ Template system
- ✅ Documentation (3 README files)
- ✅ "Read More" button on Projects page
- ✅ Routing configured
- ✅ Build tested and passing

### Ready to Add:
- 🎯 More project pages (use template)
- 🎯 Images and videos for AUV project
- 🎯 Additional projects with same structure

---

## 🔍 File Purposes

| File | Purpose |
|------|---------|
| `index.tsx` | Page component with layout |
| `data.ts` | All content and metadata |
| `images/` | Screenshots, diagrams |
| `videos/` | Demo videos, recordings |
| `documents/` | PDFs, papers, reports |

---

## 💡 Best Practices

### Naming Convention
- **Folders**: `lowercase-with-hyphens`
- **Components**: `PascalCase`
- **Files**: `kebab-case.extension`

### Media Guidelines
- **Images**: Max 1920px, optimized for web
- **Videos**: Max 50MB, compressed (or use YouTube)
- **Documents**: Max 10MB PDFs

### Content Tips
- Keep `data.ts` updated
- Use descriptive alt text for images
- Add captions to media
- Update project status regularly

---

## 🎨 Customization

### Color Schemes
Features can use different colors in `data.ts`:
- `blue`, `purple`, `green`, `orange`, `red`, `yellow`

### Adding Sections
You can add custom sections to `index.tsx`:
```tsx
<div>
  <h2 className="text-3xl font-bold mb-4">Custom Section</h2>
  {/* Your content */}
</div>
```

### Layout Changes
The template is flexible - modify `index.tsx` as needed while keeping `data.ts` for content.

---

## 📚 Documentation Locations

1. **Main Guide**: `src/pages/projects/README.md`
2. **Template Guide**: `src/pages/projects/_template/README.md`
3. **This Overview**: `PROJECT_STRUCTURE.md` (root)
4. **Deployment**: `DEPLOYMENT_GUIDE.md` (root)

---

## 🚀 Next Steps

1. **Test the AUV page** locally: `npm run dev`
2. **Add media files** when ready (optional)
3. **Create more projects** using the template
4. **Deploy** when satisfied: `./quick-deploy.sh "message"`

---

## 📊 Summary

**Before**: All projects in one file, media scattered
**After**: Organized folders, templated structure, scalable system

**Result**: Professional, maintainable, easy to expand! 🎉

---

## 🆘 Need Help?

- Check `src/pages/projects/README.md` for detailed instructions
- Look at `auv-simulation/` as a complete example
- Use `_template/` as starting point for new projects
- Refer to `_template/README.md` for quick start

Happy organizing! 🎯

