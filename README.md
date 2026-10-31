# PortfolioForge &bull; Full-Stack Portfolio Builder

A professional, responsive, full-stack SaaS portfolio builder where developers, designers, and creatives can select templates, customize their portfolios in real-time, upload profile photos and project screenshots with interactive cropping, preview responsive viewports, publish with 1-click to MongoDB Atlas, and export self-contained standalone HTML portfolios.

---

## 📁 Architecture & Clean Repository Structure

PortfolioForge is organized into a clean monorepo architecture with distinct `frontend/` and `backend/` directories:

```
portfolioforge/
├── frontend/                     # React 19 + TypeScript + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/           # Bespoke PortfolioLogo, Icons, ImageCropperModal
│   │   │   └── templates/        # 19 Dedicated Template Components & PortfolioRenderer
│   │   │       ├── MinimalTemplate.tsx
│   │   │       ├── ExecutiveTemplate.tsx
│   │   │       ├── CreativeTemplate.tsx
│   │   │       ├── NeonTemplate.tsx
│   │   │       ├── EditorialTemplate.tsx
│   │   │       ├── ModernBlueTemplate.tsx
│   │   │       ├── TerminalTemplate.tsx
│   │   │       ├── WarmTemplate.tsx
│   │   │       ├── ProductTemplate.tsx
│   │   │       ├── CyberpunkTemplate.tsx
│   │   │       ├── NordicTemplate.tsx
│   │   │       ├── BrutalistTemplate.tsx
│   │   │       ├── AuroraTemplate.tsx
│   │   │       ├── SwissTemplate.tsx
│   │   │       ├── SynthwaveTemplate.tsx
│   │   │       ├── AcademicTemplate.tsx
│   │   │       ├── BentoTemplate.tsx
│   │   │       ├── LuxeTemplate.tsx
│   │   │       ├── RetroOsTemplate.tsx
│   │   │       └── PortfolioRenderer.tsx
│   │   │   ├── PortfolioEditor.tsx # Interactive editor with tabs, cropper & live preview
│   │   │   ├── PublicPortfolio.tsx # Public route (/p/:slug) with optimistic caching
│   │   │   ├── TemplateCard.tsx    # Template selection card
│   │   │   └── TemplatePreviewModal.tsx # Fullscreen modal template preview
│   │   ├── data/
│   │   │   └── templates.ts      # 19 Templates catalog, themes, & authentic demo personas
│   │   ├── types/
│   │   │   └── portfolio.ts      # Shared TypeScript data models
│   │   ├── utils/
│   │   │   ├── htmlExporter.ts   # Standalone HTML generation engine
│   │   │   └── portfolio.ts      # URL sanitation & text helpers
│   │   ├── api.ts                # Resilient API client with timeout handling
│   │   ├── App.tsx               # SaaS Landing page, routing & navigation
│   │   ├── App.css               # Per-template card preview styles
│   │   ├── index.css             # Tailwind CSS & Black/Gold design system
│   │   └── main.tsx
│   ├── public/                   # Static assets & brand icons
│   ├── index.html
│   ├── vite.config.ts            # Vite proxy & Tailwind integration
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                      # Frontend environment configuration
│
├── backend/                      # Node.js + Express 5 + MongoDB Atlas + Mongoose
│   ├── src/
│   │   ├── models/
│   │   │   └── Portfolio.js      # Mongoose schema with 50MB payload limits
│   │   ├── routes/
│   │   │   └── portfolios.js     # Sanitization, Base64 validation, & slug generation
│   │   └── server.js             # Express server with CORS, health check, & error handler
│   ├── package.json
│   └── .env                      # Backend environment configuration
│
├── package.json                  # Root runner script for concurrent orchestration
├── test-frontend.js              # 67 static & component assertions
├── test-e2e-readiness.js         # 132 comprehensive E2E & live API assertions
└── README.md
```

---

## 🌟 19 Unique Portfolio Templates

1. **The Minimalist** (`minimal`): Clean architectural layout, generous whitespace, confident typography.
2. **The Executive** (`executive`): Corporate leadership styling with structured sections and gold accents.
3. **The Creative** (`creative`): Asymmetrical artistic flair with rotated geometric frames.
4. **Neon Tech** (`neon`): Cyberpunk dark aesthetic with luminous glowing cyan borders.
5. **The Editorial** (`editorial`): Magazine-inspired layout with classic serif typography.
6. **Modern Blue** (`modern-blue`): Software engineering layout with clean metrics and tech cards.
7. **Terminal Pro** (`terminal`): Retro developer CLI monospace interface with green bash prompts.
8. **Warm Studio** (`warm`): Cozy amber studio palette with friendly rounded organic cards.
9. **Product Designer** (`product`): High-impact product designer presentation with metric highlights.
10. **Cyberpunk 2099** (`cyberpunk`): HUD telemetry telemetry bar, radar reticle, cyber grid lines.
11. **Nordic Fjord** (`nordic`): Scandinavian slate minimalism with airy architectural calm.
12. **Neo-Brutalist** (`brutalist`): Thick 4px black borders, hard offset drop shadows, chartreuse badges.
13. **Aurora Glass** (`aurora`): Ambient radiant blur orbs, frosted glassmorphism, cyan-purple glows.
14. **Swiss International** (`swiss`): Strict asymmetric column grid, large index numbers, Helvetica discipline.
15. **Synthwave 80s** (`synthwave`): Perspective laser grid, glowing neon badges, retro arcade aesthetic.
16. **Academic Scholar** (`academic`): Formal CV layout, peer-reviewed paper entries with DOI citations.
17. **Modern Bento** (`bento`): Modular Apple-style bento grid boxes with iOS pill tags.
18. **Luxe Noir** (`luxe`): Haute couture monochrome with Didot editorial serif typography.
19. **Retro OS 95** (`retro-os`): Windows 95 desktop teal `#008080`, 3D beveled windows, start taskbar.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+
- npm 9+
- MongoDB Atlas connection string (or local MongoDB)

### Option 1: Running from Root Monorepo
```bash
# In the portfolioforge directory:

# Start backend server
npm run dev:backend

# In a second terminal, start frontend dev server
npm run dev:frontend
```

### Option 2: Running from Dedicated Folders
```bash
# Terminal 1 - Backend:
cd backend
npm install
npm run dev
# Starts backend on http://localhost:5000

# Terminal 2 - Frontend:
cd frontend
npm install
npm run dev
# Starts frontend on http://localhost:5173
```

---

## ⚙️ Environment Variables

### Frontend (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (`backend/.env`):
```env
PORT=5000
FRONTEND_URL=http://localhost:5173
PUBLIC_APP_URL=http://localhost:5173
MONGO_URI=your_mongodb_atlas_connection_string
```

---

## 🧪 Automated Verification & Testing

PortfolioForge includes comprehensive automated verification suites:

```bash
# Run End-to-End Readiness Suite (132 tests covering live MongoDB, API, all 19 templates)
npm run test:e2e

# Run Frontend Component Suite (67 tests covering logo, exports, template signatures)
npm run test:frontend

# Run Frontend Production Build & Typecheck
npm run build:frontend

# Run Frontend ESLint
npm run lint:frontend
```

---

## 🏆 Final Submission Checklist

- [x] All 19 templates implemented and visually distinct
- [x] Canvas-based interactive image cropper (1:1 profile, 16:9 project screenshot)
- [x] No artificial image size limits (50MB Base64 request limits)
- [x] Full Project CRUD with up/down reordering
- [x] Technical skill tags with duplicate prevention
- [x] Color customization & font family selection
- [x] LocalStorage draft isolation per template
- [x] Live 1-click cloud publishing to MongoDB Atlas
- [x] Public portfolio links (`/p/:slug`) with 0ms client-side cache fallback
- [x] Self-contained standalone HTML file export
- [x] Responsive on Desktop, Tablet, and Mobile viewports
- [x] 0 TypeScript errors, 0 ESLint warnings, 199/199 passing tests
