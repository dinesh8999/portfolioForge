import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Menu,
  Sparkles,
  X,
  Layers,
  Palette,
  Camera,
  FolderGit2,
  Eye,
  Smartphone,
  Share2,
  Globe,
} from "lucide-react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { templates, type PortfolioTemplate } from "./data/templates";
import TemplateCard from "./components/TemplateCard";
import PortfolioEditor from "./components/PortfolioEditor";
import PublicPortfolio from "./components/PublicPortfolio";
import { TemplatePreviewModal } from "./components/TemplatePreviewModal";
import { PortfolioLogo } from "./components/common/PortfolioLogo";

const TEMPLATE_STORAGE_KEY = "portfolioforge-template";

function HomePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem(TEMPLATE_STORAGE_KEY);
      return templates.some((template) => template.id === saved) ? saved : "minimal";
    } catch {
      return "minimal";
    }
  });

  const [showEditor, setShowEditor] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [previewingTemplate, setPreviewingTemplate] = useState<PortfolioTemplate | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  useEffect(() => {
    try {
      if (selectedTemplate) {
        localStorage.setItem(TEMPLATE_STORAGE_KEY, selectedTemplate);
      }
    } catch {
      // storage unavailable
    }
  }, [selectedTemplate]);

  const selectedTemplateObj = templates.find((t) => t.id === selectedTemplate);
  const selectedTemplateName = selectedTemplateObj?.name ?? "The Minimalist";

  const openEditorWithTemplate = (templateId?: string) => {
    if (templateId) {
      setSelectedTemplate(templateId);
    }
    setShowEditor(true);
  };

  const categories = [
    "ALL",
    "DEVELOPER",
    "PROFESSIONAL",
    "DESIGNER",
    "TECHNOLOGY",
    "CREATIVE PORTFOLIO",
  ];

  const filteredTemplates = templates.filter((template) => {
    if (selectedCategory === "ALL") return true;
    return template.category.toUpperCase().includes(selectedCategory);
  });

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#d4af37]/30 selection:text-[#f5d76e]">
      {/* 1. Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080808]/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          {/* Bespoke Neat & Unique Logo */}
          <a href="#home" aria-label="PortfolioForge Home" className="transition hover:opacity-95">
            <PortfolioLogo size="md" />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex">
            <a href="#home" className="transition hover:text-[#d4af37]">
              Home
            </a>
            <a href="#templates" className="transition hover:text-[#d4af37]">
              Templates
            </a>
            <a href="#features" className="transition hover:text-[#d4af37]">
              Features
            </a>
            <a href="#how-it-works" className="transition hover:text-[#d4af37]">
              How It Works
            </a>
            <a href="#about" className="transition hover:text-[#d4af37]">
              About
            </a>
          </div>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={() => openEditorWithTemplate(selectedTemplate || "minimal")}
              className="inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-5 py-2.5 text-xs font-bold text-black transition hover:bg-[#e8ca83] shadow-lg shadow-[#d4af37]/20"
            >
              <span>Build My Portfolio</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-white/10 p-2 md:hidden hover:bg-white/5"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="border-t border-white/10 px-6 py-4 md:hidden bg-[#0d0d0d] space-y-3">
            {[
              ["Home", "#home"],
              ["Templates", "#templates"],
              ["Features", "#features"],
              ["How It Works", "#how-it-works"],
              ["About", "#about"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-sm text-white/70 transition hover:text-[#d4af37]"
              >
                {label}
              </a>
            ))}

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openEditorWithTemplate(selectedTemplate || "minimal");
              }}
              className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#d4af37] py-3 text-xs font-bold text-black"
            >
              <span>Build My Portfolio</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section id="home" className="relative px-6 pt-20 pb-28 md:px-12 md:pt-28 md:pb-36 overflow-hidden">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#d4af37]/15 blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-12">
          {/* Hero Copy */}
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-1.5 text-xs font-semibold text-[#d4af37]">
              <Sparkles size={14} />
              <span>THE NEXT-GEN PORTFOLIO BUILDER</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]">
              Build a Portfolio That{" "}
              <span className="gold-text">Gets You Noticed.</span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-white/60 max-w-xl">
              Create a stunning professional portfolio in minutes. Choose a template,
              customize your design, and publish your personal website.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => openEditorWithTemplate(selectedTemplate || "minimal")}
                className="inline-flex items-center gap-3 rounded-full bg-[#d4af37] px-8 py-4 text-sm font-bold text-black transition hover:scale-105 hover:bg-[#e8ca83] shadow-xl shadow-[#d4af37]/20"
              >
                <span>Build My Portfolio</span>
                <ArrowRight size={17} />
              </button>

              <a
                href="#templates"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition hover:border-[#d4af37]/60 hover:text-[#d4af37]"
              >
                <span>Explore Templates</span>
              </a>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-md">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold gold-text">19</p>
                <p className="text-xs text-white/50 mt-1">Unique Layouts</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold gold-text">1-Click</p>
                <p className="text-xs text-white/50 mt-1">Instant Publishing</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold gold-text">100%</p>
                <p className="text-xs text-white/50 mt-1">Free &amp; Responsive</p>
              </div>
            </div>
          </div>

          {/* Interactive Visual Hero Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl border border-white/15 bg-[#121212] shadow-2xl p-6 sm:p-8 space-y-6">
              {/* Window Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs text-white/40 font-mono">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <span>portfolioforge.dev/p/alex</span>
                <span className="text-[#d4af37]">LIVE</span>
              </div>

              {/* Sample Card Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#d4af37] to-amber-200 text-black flex items-center justify-center font-bold text-xl shadow-lg">
                    AM
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Alex Morgan</h3>
                    <p className="text-xs font-semibold text-[#d4af37]">Lead Systems Architect</p>
                    <p className="text-[11px] text-white/50 mt-0.5">San Francisco, CA &bull; Available</p>
                  </div>
                </div>

                <p className="text-xs text-white/70 leading-relaxed">
                  "Architecting cloud-native distributed applications, modern micro-frontends, and accessible digital tools."
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["React", "TypeScript", "Node.js", "Docker", "GraphQL"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium border border-white/10 bg-white/5 text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span>Featured System</span>
                    <span className="text-[#d4af37] flex items-center gap-1">
                      Demo <ArrowUpRight size={12} />
                    </span>
                  </div>
                  <p className="text-[11px] text-white/60">
                    Real-time observability stream handling 10M events/day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section id="features" className="border-y border-white/10 bg-[#0d0d0d] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl space-y-16">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
              FEATURE HIGHLIGHTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Engineered with <span className="gold-text">everything you need.</span>
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
              Every detail built to provide software engineers, designers, and creatives a seamless portfolio creation experience.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Layers,
                title: "Professional Templates",
                desc: "Nine genuinely distinct, responsive layouts tailored for engineers, executives, designers, and hackers.",
              },
              {
                icon: Palette,
                title: "Easy Customization",
                desc: "Live accent color pickers, background theme options, and typography pairings in real-time.",
              },
              {
                icon: Camera,
                title: "Profile Photo Upload",
                desc: "Reliable JPG, PNG, and WebP upload with instantaneous client-side preview and safe cloud persistence.",
              },
              {
                icon: FolderGit2,
                title: "Project Management",
                desc: "Add, edit, reorder, upload screenshots, and connect live deployment & GitHub repository links.",
              },
              {
                icon: Eye,
                title: "Live Preview",
                desc: "Real-time dual-screen editing with responsive viewports for desktop, tablet, and mobile displays.",
              },
              {
                icon: Smartphone,
                title: "Responsive Designs",
                desc: "Every template is engineered and tested across mobile 320px to ultrawide 1440px displays.",
              },
              {
                icon: Share2,
                title: "One-Click Publishing",
                desc: "Instantly publish your portfolio to MongoDB Atlas and receive a verified, permanent public URL.",
              },
              {
                icon: Globe,
                title: "Shareable Portfolio Links",
                desc: "Distribute your public portfolio link to recruiters, colleagues, and clients with zero hassle.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <article
                key={title}
                className="card-hover-effect rounded-2xl border border-white/10 bg-[#121212] p-7 space-y-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4af37]/10 text-[#d4af37]">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-normal">
                  {desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section id="how-it-works" className="px-6 py-24 md:px-12 bg-[#080808]">
        <div className="mx-auto max-w-7xl space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
              STREAMLINED WORKFLOW
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              From zero to live in <span className="gold-text">five simple steps.</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            {[
              {
                step: "01",
                title: "Choose a template",
                desc: "Select from 9 distinct designs that best express your career journey.",
              },
              {
                step: "02",
                title: "Add your information",
                desc: "Input your name, role, biography, technical skills, and contact details.",
              },
              {
                step: "03",
                title: "Customize design",
                desc: "Adjust brand colors, background hues, and typography pairings.",
              },
              {
                step: "04",
                title: "Preview portfolio",
                desc: "Review your portfolio seamlessly across desktop, tablet, and mobile.",
              },
              {
                step: "05",
                title: "Publish and share",
                desc: "Launch with 1 click to get a public link or export clean standalone HTML.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-3 relative"
              >
                <span className="text-3xl font-black gold-text font-mono">
                  {item.step}
                </span>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Template Showcase Section */}
      <section id="templates" className="border-t border-white/10 px-6 py-24 md:px-12 bg-[#0b0b0b]">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
              NINE DISTINCT DESIGNS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Choose your <span className="gold-text">signature style.</span>
            </h2>
            <p className="text-sm sm:text-base text-white/50 leading-relaxed">
              Every template features a genuinely unique visual hierarchy, typography, and styling.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  selectedCategory === cat
                    ? "bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20"
                    : "border border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                selected={selectedTemplate === template.id}
                onSelect={setSelectedTemplate}
                onCustomize={(id) => openEditorWithTemplate(id)}
                onPreview={(t) => setPreviewingTemplate(t)}
              />
            ))}
          </div>

          {/* Selected Template Banner */}
          {selectedTemplate && (
            <div className="mt-8 rounded-2xl border border-[#d4af37]/40 bg-[#d4af37]/5 p-8 text-center max-w-2xl mx-auto space-y-4 shadow-xl">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#d4af37]/20 text-[#d4af37]">
                <Check size={24} />
              </div>
              <p className="text-xs uppercase tracking-widest text-white/60">
                Current Template Selected
              </p>
              <h3 className="text-2xl font-bold gold-text">
                {selectedTemplateName}
              </h3>
              <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto">
                Ready to make it your own? Open the interactive editor to add your projects, profile photo, and credentials.
              </p>

              <button
                type="button"
                onClick={() => openEditorWithTemplate(selectedTemplate)}
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#d4af37] px-8 py-3.5 text-xs font-bold text-black hover:bg-[#e8ca83] transition shadow-lg"
              >
                <span>Customize This Template</span>
                <ArrowRight size={15} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 6. About Section */}
      <section id="about" className="border-t border-white/10 bg-[#0d0d0d] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
              ABOUT PORTFOLIOFORGE
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Your career story <span className="gold-text">deserves the spotlight.</span>
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
              PortfolioForge was created to eliminate the friction between talent and opportunity. Whether you're an aspiring junior or a seasoned tech lead, you deserve an unforgettable web presence that communicates your capabilities instantly.
            </p>
          </div>

          <div className="md:col-span-6 space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <h3 className="text-lg font-bold text-white">Why developers love PortfolioForge</h3>
            <ul className="space-y-3 text-xs sm:text-sm text-white/70">
              <li className="flex items-center gap-2.5">
                <Check size={16} className="text-[#d4af37] shrink-0" />
                <span>Zero complex framework configuration or server setup required.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check size={16} className="text-[#d4af37] shrink-0" />
                <span>Reliable image handling for high-resolution portfolio headshots.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check size={16} className="text-[#d4af37] shrink-0" />
                <span>Download standalone HTML files to host anywhere (GitHub Pages, Vercel, Netlify).</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check size={16} className="text-[#d4af37] shrink-0" />
                <span>Fast MongoDB Atlas backend serving your portfolios 24/7.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Final Call to Action Section */}
      <section className="px-6 py-24 md:px-12 bg-[#080808] relative overflow-hidden border-t border-white/10">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#d4af37]/10 blur-[150px]" />
        <div className="relative mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to build your <span className="gold-text">dream portfolio?</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto">
            Join thousands of professionals presenting their work with confidence. It only takes a few minutes.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => openEditorWithTemplate(selectedTemplate || "minimal")}
              className="inline-flex items-center gap-3 rounded-full bg-[#d4af37] px-9 py-4 text-sm font-bold text-black hover:bg-[#e8ca83] transition hover:scale-105 shadow-2xl shadow-[#d4af37]/30"
            >
              <span>Get Started Now &mdash; Free</span>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="border-t border-white/10 bg-[#060606] px-6 py-12 md:px-12">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#home" aria-label="PortfolioForge Home" className="transition hover:opacity-90">
            <PortfolioLogo size="sm" />
          </a>

          <p className="text-xs text-white/40 text-center">
            &copy; {new Date().getFullYear()} PortfolioForge. Engineered with excellence.
          </p>

          <div className="flex items-center gap-6 text-xs text-white/60">
            <a href="#home" className="hover:text-[#d4af37] transition">Home</a>
            <a href="#templates" className="hover:text-[#d4af37] transition">Templates</a>
            <a href="#features" className="hover:text-[#d4af37] transition">Features</a>
            <a href="#home" className="hover:text-[#d4af37] transition">Back to Top &uarr;</a>
          </div>
        </div>
      </footer>

      {/* Template Fullscreen Preview Modal */}
      {previewingTemplate && (
        <TemplatePreviewModal
          template={previewingTemplate}
          onClose={() => setPreviewingTemplate(null)}
          onCustomize={(id) => openEditorWithTemplate(id)}
        />
      )}

      {/* Fullscreen Portfolio Editor Modal */}
      {showEditor && selectedTemplate && (
        <PortfolioEditor
          key={selectedTemplate}
          templateName={selectedTemplateName}
          templateId={selectedTemplate}
          onClose={() => setShowEditor(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/p/:slug" element={<PublicPortfolio />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
