
# Personal Site (Sea‑Blue Theme)

A clean, modern, fully responsive and accessible personal website built with **HTML/CSS/JS only**.

## Structure

```
/index.html
/about.html
/experience.html
/projects.html
/publications.html
/blog/index.html
/blog/post-ship-faster.html
/blog/post-measuring-accessibility.html
/blog/post-data-viz.html
/contact.html
/assets/css/style.css
/assets/js/main.js
/assets/img/* (svg + placeholder png)
/assets/YourName-CV.pdf
/sitemap.xml
/robots.txt
```

## Run locally

Just open `index.html` in your browser, or serve the folder with a static server:

```bash
# Option 1: Python
cd personal_site
python3 -m http.server 8000

# Option 2: Node (if you have it)
npx http-server . -p 8000
```

Then visit http://localhost:8000

## Notes

- Dark mode toggle (persists in localStorage)
- Sticky navbar with mobile menu
- Scroll reveal animations
- Back-to-top button
- Projects tag filter
- Blog search + tag filter
- Publications with BibTeX copy
- Contact form with client-side validation
- SEO basics (title/description, OG image, favicon)
- `robots.txt` and `sitemap.xml`
