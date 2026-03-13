# 🧠 One-Time Scripts Catalog: Project Memory

## 🏗 Architecture
- **Type:** Serverless static site (GitHub Pages).
- **Frontend:** Vanilla JS, CSS, HTML.
- **Data:** `scripts.json` contains all script metadata and code (minified/escaped).
- **Rendering:** `script.js` handles dynamic grid rendering, filtering (search/category), and detail pages via URL params (`?id=xxx`).

## 📁 File Structure
- `index.html`: Main catalog view.
- `script.html`: Single script detail view.
- `scripts.json`: Central database.
- `src/scripts/`: Modular source code for scripts (organized by category).
  - `anti-annoyance/`: Ad skippers, cookie nukers.
  - `social/`: Instagram/LinkedIn automation.
  - `security/`: Password revealers.
  - `...`: Other categories for scaling.
- `docs/`: Markdown documentation for script collections.

## 🛠 Key Commands
- `node validate_catalog.js`: Validates JSON schema and unique IDs in the catalog.

## 📝 Conventions
- **IDs:** Kebab-case (e.g., `yt-skip-ads`).
- **Scripts:** Must be wrapped in IIFE to avoid global scope pollution.
- **Categories:** Keep them consistent between `scripts.json` and `src/scripts/` folders.

## 🚀 Deployment
- Hosted on: `https://genaforvena.github.io/one-time-scripts-catalog/`
- Trigger: Automatic via GitHub Pages on `main` branch.
