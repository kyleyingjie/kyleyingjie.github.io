# Role
You are an expert front-end developer and UI/UX designer. Your task is to build a sleek, professional, and entirely offline portfolio website for a concept designer and 2D artist.

# Tech Stack
- Vanilla HTML5
- Vanilla CSS3
- Vanilla JavaScript
- NO external dependencies, frameworks, or CDNs (no React, no Tailwind, no external fonts that require an internet connection). The site must function perfectly when opened as a local `index.html` file.

# Design & Aesthetic Requirements
- **Theme:** Professional Dark Mode (e.g., deep charcoal or slate) so the artwork stands out.
- **Accents:** Use subtle peachy accent colors for active states, hover effects, and buttons. 
- **Shapes:** Incorporate clean, circular motifs in the UI components (e.g., rounded buttons, circular filter toggles).
- **Vibe:** Minimalist, slick, and heavily inspired by high-end concept art and game industry portfolio sites (like ArtStation Pro).

# Core Features & Layout
1. **Header/Navigation:** Sticky top bar featuring the artist's name, role ("Designer & Concept Artist"), and navigation links.
2. **Gallery (Masonry Grid):** 
   - A responsive masonry grid layout that supports mixed image aspect ratios without cropping.
   - A filtering system at the top of the gallery with the following categories: 'All', 'Environment Concept Design', 'Mobile Game UI', '2D Assets', and 'Character Art'.
3. **Lightbox/Modal:** Clicking any image in the grid must open a full-screen, easily dismissible lightbox to view the high-resolution version of the art.
4. **CV / About Section:** A clean typography-focused section for work experience and an option/button to "Download Resume (PDF)".
5. **Contact Section:** A simple footer containing an email address and placeholders for professional links.

# Code Structure Requirements
- Keep the code modular but easy to manage. Provide the `index.html`, `style.css`, and `script.js` files.
- Create a simple JavaScript array or JSON-like structure within the `script.js` file where I can easily add new artworks by just defining the image path, title, and category, which the script will then dynamically render into the HTML grid.

Please generate the complete, ready-to-run code for these three files.