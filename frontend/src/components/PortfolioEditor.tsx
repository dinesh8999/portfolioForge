import { useEffect, useState, useRef, type ChangeEvent } from "react";
import {
  X,
  Download,
  Plus,
  Trash2,
  Pencil,
  ArrowUp,
  ArrowDown,
  Palette,
  Eye,
  Camera,
  UserRound,
  Monitor,
  Tablet,
  Smartphone,
  Share2,
  Check,
  RotateCcw,
  Upload,
  Globe,
  FolderPlus,
  Layers,
  Sparkles,
  Copy,
  ExternalLink,
  Scissors,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./common/Icons";
import { ImageCropperModal } from "./common/ImageCropperModal";
import { publishPortfolio } from "../api";
import type { PortfolioData, PortfolioStyle, Project } from "../types/portfolio";
import { PortfolioRenderer } from "./templates/PortfolioRenderer";
import { generateStandaloneHtml } from "../utils/htmlExporter";
import { getTemplateTheme, getTemplateSampleData } from "../data/templates";
import { PortfolioLogo } from "./common/PortfolioLogo";

type PortfolioEditorProps = {
  templateName: string;
  templateId: string;
  onClose: () => void;
};

const DATA_KEY = "portfolioforge-data";
const STYLE_KEY = "portfolioforge-style";

const defaultData: PortfolioData = {
  name: "Alex Morgan",
  role: "Full-Stack Software Engineer",
  bio: "Passionate engineer specialized in crafting responsive, robust, and scalable cloud web applications with modern architectures.",
  email: "alex.morgan@example.com",
  skills: "React, TypeScript, Node.js, Express, MongoDB, Tailwind CSS, Next.js, Docker",
  profilePhoto: "",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  websiteUrl: "https://example.com",
  projects: [
    {
      id: 1,
      name: "CloudScale SaaS Dashboard",
      description: "An analytics platform monitoring real-time microservices traffic with interactive metrics, alerts, and custom dashboards.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      demoUrl: "https://example.com/demo",
      githubUrl: "https://github.com/example/cloudscale",
    },
    {
      id: 2,
      name: "AI Code Review Assistant",
      description: "Automated code intelligence tool that surfaces performance bottlenecks, security vulnerabilities, and accessibility defects in pull requests.",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      demoUrl: "https://example.com/ai-code",
      githubUrl: "https://github.com/example/ai-reviewer",
    },
  ],
};

const availableFonts = [
  "Inter",
  "Arial",
  "Georgia",
  "Verdana",
  "Courier New",
  "system-ui",
];

function loadPortfolioForTemplate(tId: string): PortfolioData {
  const sample = getTemplateSampleData(tId);
  try {
    const savedTemplate = localStorage.getItem(`${DATA_KEY}-${tId}`);
    if (savedTemplate) {
      const parsed = JSON.parse(savedTemplate) as Partial<PortfolioData>;
      return {
        ...sample,
        ...parsed,
        projects: Array.isArray(parsed.projects) ? parsed.projects : sample.projects,
      };
    }
    const savedGlobal = localStorage.getItem(DATA_KEY);
    if (savedGlobal) {
      const parsed = JSON.parse(savedGlobal) as Partial<PortfolioData>;
      if (parsed.name && parsed.name !== defaultData.name && parsed.name !== "Alex Morgan") {
        return {
          ...sample,
          ...parsed,
          projects: Array.isArray(parsed.projects) ? parsed.projects : sample.projects,
        };
      }
    }
  } catch {
    // fallback
  }
  return sample;
}

function loadStyleForTemplate(tId: string): PortfolioStyle {
  const defaultTheme = getTemplateTheme(tId);
  try {
    const saved = localStorage.getItem(`${STYLE_KEY}-${tId}`);
    if (saved) {
      return { ...defaultTheme, ...JSON.parse(saved) };
    }
  } catch {
    // storage not available
  }
  return defaultTheme;
}

export default function PortfolioEditor({
  templateName,
  templateId,
  onClose,
}: PortfolioEditorProps) {
  const [portfolio, setPortfolio] = useState<PortfolioData>(() =>
    loadPortfolioForTemplate(templateId)
  );
  const [style, setStyle] = useState<PortfolioStyle>(() =>
    loadStyleForTemplate(templateId)
  );

  // Autosave to LocalStorage per-template and globally
  useEffect(() => {
    try {
      localStorage.setItem(`${DATA_KEY}-${templateId}`, JSON.stringify(portfolio));
      localStorage.setItem(`${STYLE_KEY}-${templateId}`, JSON.stringify(style));
      localStorage.setItem(DATA_KEY, JSON.stringify(portfolio));
      localStorage.setItem(STYLE_KEY, JSON.stringify(style));
    } catch (e) {
      console.error("Local storage error:", e);
    }
  }, [portfolio, style, templateId]);

  const [activeTab, setActiveTab] = useState<
    "info" | "photo" | "skills" | "projects" | "social" | "design"
  >("info");

  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");

  // Notifications & State
  const [saveStatus, setSaveStatus] = useState<"saved" | "unsaved" | "saving">("saved");
  const [photoError, setPhotoError] = useState("");
  const [photoSuccess, setPhotoSuccess] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState("");
  const [publishMessage, setPublishMessage] = useState("");
  const [publishError, setPublishError] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  // Skill input management
  const [newSkill, setNewSkill] = useState("");

  // Project form management
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const emptyProject: Project = {
    id: 0,
    name: "",
    description: "",
    imageUrl: "",
    demoUrl: "",
    githubUrl: "",
  };
  const [projectForm, setProjectForm] = useState<Project>(emptyProject);
  const [projectImageError, setProjectImageError] = useState("");

  const photoInputRef = useRef<HTMLInputElement>(null);
  const projectPhotoInputRef = useRef<HTMLInputElement>(null);

  // Image Cropper Modal State
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropperSrc, setCropperSrc] = useState("");
  const [cropperTarget, setCropperTarget] = useState<"profile" | "project">("profile");
  const [cropperRatio, setCropperRatio] = useState<number>(1);
  const [cropperTitle, setCropperTitle] = useState("Crop Image");

  const handleCropComplete = (croppedDataUrl: string) => {
    if (cropperTarget === "profile") {
      setPortfolio((prev) => ({
        ...prev,
        profilePhoto: croppedDataUrl,
      }));
      setPhotoSuccess("Photo cropped and applied.");
    } else {
      setProjectForm((prev) => ({
        ...prev,
        imageUrl: croppedDataUrl,
      }));
    }
  };



  const updatePortfolio = (
    field: keyof Omit<PortfolioData, "projects">,
    value: string
  ) => {
    setSaveStatus("saving");
    setPortfolio((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateStyle = (field: keyof PortfolioStyle, value: string) => {
    setSaveStatus("saving");
    setStyle((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Image Upload for Profile Photo (No size limit + interactive crop)
  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    setPhotoError("");
    setPhotoSuccess("");

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPhotoError("Invalid file type. Please select an image file (JPG, PNG, WebP, etc.).");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setCropperSrc(reader.result as string);
        setCropperTarget("profile");
        setCropperRatio(1);
        setCropperTitle("Crop & Position Profile Photo (1:1)");
        setCropperOpen(true);
      } else {
        setPhotoError("Failed to process image file.");
      }
    };
    reader.onerror = () => {
      setPhotoError("Error reading image file.");
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPortfolio((prev) => ({
      ...prev,
      profilePhoto: "",
    }));
    setPhotoSuccess("");
    setPhotoError("");
  };

  // Project Image Upload (No size limit + interactive crop)
  const handleProjectPhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    setProjectImageError("");

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setProjectImageError("Invalid file. Please select an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setCropperSrc(reader.result as string);
        setCropperTarget("project");
        setCropperRatio(16 / 9);
        setCropperTitle("Crop & Position Project Screenshot (16:9)");
        setCropperOpen(true);
      }
    };
    reader.onerror = () => {
      setProjectImageError("Failed to read image file.");
    };
    reader.readAsDataURL(file);
  };

  // Skills Management
  const skillsList = portfolio.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const addSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (!trimmed) return;
    if (skillsList.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setNewSkill("");
      return;
    }
    const updated = [...skillsList, trimmed].join(", ");
    updatePortfolio("skills", updated);
    setNewSkill("");
  };

  const removeSkill = (skillToRemove: string) => {
    const updated = skillsList
      .filter((s) => s.toLowerCase() !== skillToRemove.toLowerCase())
      .join(", ");
    updatePortfolio("skills", updated);
  };

  // Project Management
  const saveProject = () => {
    const name = projectForm.name.trim();
    const description = projectForm.description.trim();

    if (!name) {
      alert("Please provide a project name.");
      return;
    }
    if (!description) {
      alert("Please provide a project description.");
      return;
    }

    const nextId =
      portfolio.projects.reduce((max, p) => Math.max(max, p.id || 0), 0) + 1;

    const project: Project = {
      ...projectForm,
      id: editingProjectId ?? nextId,
      name,
      description,
      imageUrl: (projectForm.imageUrl || "").trim(),
      demoUrl: (projectForm.demoUrl || "").trim(),
      githubUrl: (projectForm.githubUrl || "").trim(),
    };

    setPortfolio((prev) => ({
      ...prev,
      projects:
        editingProjectId !== null
          ? prev.projects.map((p) => (p.id === editingProjectId ? project : p))
          : [...prev.projects, project],
    }));

    resetProjectForm();
  };

  const editProject = (project: Project) => {
    setEditingProjectId(project.id ?? null);
    setProjectForm({ ...project });
    setActiveTab("projects");
  };

  const deleteProject = (id?: number) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    setPortfolio((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
    if (editingProjectId === id) resetProjectForm();
  };

  const moveProject = (index: number, direction: "up" | "down") => {
    setPortfolio((prev) => {
      const list = [...prev.projects];
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= list.length) return prev;
      [list[index], list[target]] = [list[target], list[index]];
      return { ...prev, projects: list };
    });
  };

  const resetProjectForm = () => {
    setEditingProjectId(null);
    setProjectForm({ ...emptyProject });
    setProjectImageError("");
  };

  // Reset Draft
  const handleResetDraft = () => {
    if (
      window.confirm(
        "Are you sure you want to reset your portfolio draft to default? All custom changes will be lost."
      )
    ) {
      const sample = getTemplateSampleData(templateId);
      const templateTheme = getTemplateTheme(templateId);
      setPortfolio(sample);
      setStyle(templateTheme);
      localStorage.removeItem(DATA_KEY);
      localStorage.removeItem(STYLE_KEY);
      localStorage.removeItem(`${DATA_KEY}-${templateId}`);
      localStorage.removeItem(`${STYLE_KEY}-${templateId}`);
    }
  };

  // Load Template Demo Showcase
  const handleLoadTemplatePreset = () => {
    if (
      window.confirm(
        `Load the curated demo showcase for "${templateName}"? This will populate the editor with this template's authentic styling and project examples.`
      )
    ) {
      const sample = getTemplateSampleData(templateId);
      const templateTheme = getTemplateTheme(templateId);
      setPortfolio(sample);
      setStyle(templateTheme);
      localStorage.removeItem(`${DATA_KEY}-${templateId}`);
      localStorage.removeItem(`${STYLE_KEY}-${templateId}`);
    }
  };

  // Publish to Backend
  const handlePublish = async () => {
    setPublishing(true);
    setPublishMessage("");
    setPublishError("");

    try {
      const cleanSkills = portfolio.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        name: portfolio.name,
        role: portfolio.role,
        bio: portfolio.bio,
        email: portfolio.email,
        skills: cleanSkills,
        profilePhoto: portfolio.profilePhoto,
        githubUrl: portfolio.githubUrl,
        linkedinUrl: portfolio.linkedinUrl,
        websiteUrl: portfolio.websiteUrl,
        projects: portfolio.projects,
        templateId,
        templateName,
        style,
      };

      const result = await publishPortfolio(payload);
      setPublishedUrl(result.url);
      setPublishMessage("Your portfolio is live and ready to share!");

      try {
        const publicDoc = {
          ...payload,
          slug: result.slug,
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem(`pf_published_${result.slug}`, JSON.stringify(publicDoc));
      } catch {
        // quota limit ignored
      }
    } catch (err) {
      setPublishError(
        err instanceof Error ? err.message : "Failed to publish portfolio."
      );
    } finally {
      setPublishing(false);
    }
  };

  // Download Standalone HTML
  const handleDownload = () => {
    const html = generateStandaloneHtml(portfolio, style, templateId);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${(portfolio.name || "portfolio").toLowerCase().replace(/\s+/g, "-")}.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const copyPublicUrl = () => {
    if (!publishedUrl) return;
    void navigator.clipboard.writeText(publishedUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#080808] text-white">
      {/* Editor Top Navigation Bar */}
      <header className="flex items-center justify-between gap-4 border-b border-white/10 bg-[#0d0d0d] px-4 py-3.5 md:px-8">
        <div className="flex items-center gap-3 min-w-0">
          <PortfolioLogo size="sm" withText={false} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold truncate">PortfolioForge Editor</h2>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30">
                {templateName}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <span>{saveStatus === "saving" ? "Saving..." : "Auto-saved locally"}</span>
              <span>&bull;</span>
              <span className="text-emerald-400 font-medium">Ready</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleResetDraft}
            title="Reset draft to template defaults"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/15 text-xs text-white/70 hover:bg-white/10 hover:text-white transition"
          >
            <RotateCcw size={14} />
            <span>Reset Draft</span>
          </button>

          <button
            type="button"
            onClick={handleLoadTemplatePreset}
            title="Load authentic demo content for this template"
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#d4af37]/35 bg-[#d4af37]/10 text-xs text-[#d4af37] hover:bg-[#d4af37]/20 transition"
          >
            <Sparkles size={14} />
            <span>Load Demo Persona</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            title="Download standalone HTML file"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/15 bg-white/5 text-xs font-semibold hover:bg-white/10 transition"
          >
            <Download size={14} />
            <span className="hidden md:inline">Download HTML</span>
          </button>

          <button
            type="button"
            onClick={handlePublish}
            disabled={publishing}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#d4af37] text-xs font-bold text-black hover:bg-[#e8ca83] transition disabled:opacity-50 shadow-md"
          >
            <Share2 size={14} />
            <span>{publishing ? "Publishing..." : "Publish Live"}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close editor"
            className="p-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>
      </header>

      {/* Publish Banner Modal / Toast */}
      {(publishMessage || publishError) && (
        <div
          className={`border-b px-4 py-3 text-sm flex flex-wrap items-center justify-between gap-3 ${
            publishError
              ? "bg-red-950/60 border-red-700/50 text-red-200"
              : "bg-emerald-950/60 border-emerald-700/50 text-emerald-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {publishError ? (
              <span>⚠️ {publishError}</span>
            ) : (
              <>
                <Sparkles size={16} className="text-emerald-400" />
                <span>{publishMessage}</span>
              </>
            )}
          </div>

          {publishedUrl && (
            <div className="flex items-center gap-2">
              <a
                href={publishedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline font-semibold text-emerald-300 hover:text-white"
              >
                <span>Open Portfolio</span>
                <ExternalLink size={13} />
              </a>

              <button
                type="button"
                onClick={copyPublicUrl}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs text-white"
              >
                {copiedLink ? <Check size={12} className="text-emerald-300" /> : <Copy size={12} />}
                <span>{copiedLink ? "Copied" : "Copy Link"}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mobile View Toggle */}
      <div className="grid grid-cols-2 gap-1 p-2 bg-[#0e0e0e] border-b border-white/10 lg:hidden text-xs font-semibold">
        <button
          type="button"
          onClick={() => setMobileView("editor")}
          className={`py-2 rounded-lg flex items-center justify-center gap-2 ${
            mobileView === "editor" ? "bg-[#d4af37] text-black" : "text-white/70 hover:bg-white/5"
          }`}
        >
          <Pencil size={14} />
          <span>Editor Controls</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileView("preview")}
          className={`py-2 rounded-lg flex items-center justify-center gap-2 ${
            mobileView === "preview" ? "bg-[#d4af37] text-black" : "text-white/70 hover:bg-white/5"
          }`}
        >
          <Eye size={14} />
          <span>Live Preview</span>
        </button>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden">
        {/* Editor Sidebar */}
        <section
          className={`${
            mobileView === "preview" ? "hidden" : "flex"
          } lg:col-span-5 xl:col-span-4 min-h-0 flex-col overflow-y-auto border-r border-white/10 bg-[#0d0d0d]`}
        >
          {/* Editor Tabs Navigation */}
          <nav className="sticky top-0 z-10 grid grid-cols-3 sm:grid-cols-6 border-b border-white/10 bg-[#0d0d0d]/95 backdrop-blur text-xs">
            {[
              { id: "info", label: "Info", icon: UserRound },
              { id: "photo", label: "Photo", icon: Camera },
              { id: "skills", label: "Skills", icon: Layers },
              { id: "projects", label: `Projects (${portfolio.projects.length})`, icon: FolderPlus },
              { id: "social", label: "Links", icon: Globe },
              { id: "design", label: "Design", icon: Palette },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id as typeof activeTab)}
                className={`py-3 px-2 flex flex-col items-center justify-center gap-1 font-medium transition border-b-2 ${
                  activeTab === id
                    ? "border-[#d4af37] text-[#d4af37] bg-white/[0.03]"
                    : "border-transparent text-white/60 hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                <Icon size={15} />
                <span className="truncate">{label}</span>
              </button>
            ))}
          </nav>

          <div className="p-5 md:p-6 space-y-6">
            {/* TAB 1: Personal Info */}
            {activeTab === "info" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold">Personal Information</h3>
                  <p className="text-xs text-white/50">Details displayed on your portfolio hero.</p>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                    Full Name *
                    <input
                      type="text"
                      required
                      value={portfolio.name}
                      onChange={(e) => updatePortfolio("name", e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                    />
                  </label>

                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                    Professional Title / Role
                    <input
                      type="text"
                      value={portfolio.role}
                      onChange={(e) => updatePortfolio("role", e.target.value)}
                      placeholder="e.g. Senior Full-Stack Engineer"
                      className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                    />
                  </label>

                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                    Professional Biography
                    <textarea
                      rows={4}
                      value={portfolio.bio}
                      onChange={(e) => updatePortfolio("bio", e.target.value)}
                      placeholder="Tell visitors about your background, achievements, and aspirations..."
                      className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] leading-relaxed resize-y"
                    />
                  </label>

                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                    Contact Email Address
                    <input
                      type="email"
                      value={portfolio.email}
                      onChange={(e) => updatePortfolio("email", e.target.value)}
                      placeholder="e.g. alex@example.com"
                      className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* TAB 2: Profile Photo */}
            {activeTab === "photo" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold">Profile Photo</h3>
                  <p className="text-xs text-white/50">Upload any image (no file size limit). Crop, zoom, and frame your photo with the built-in cropper.</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center space-y-4">
                  {portfolio.profilePhoto ? (
                    <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-[#d4af37] shadow-xl">
                      <img
                        src={portfolio.profilePhoto}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="mx-auto w-32 h-32 rounded-full border-2 border-dashed border-white/25 flex flex-col items-center justify-center text-white/40">
                      <UserRound size={40} />
                      <span className="text-[11px] mt-1">No Photo</span>
                    </div>
                  )}

                  {photoError && (
                    <p className="text-xs text-red-400 font-medium">{photoError}</p>
                  )}
                  {photoSuccess && (
                    <p className="text-xs text-emerald-400 font-medium">{photoSuccess}</p>
                  )}

                  <input
                    type="file"
                    ref={photoInputRef}
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />

                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d4af37] text-xs font-bold text-black hover:bg-[#e8ca83] transition"
                    >
                      <Upload size={14} />
                      <span>{portfolio.profilePhoto ? "Replace Image" : "Upload Image"}</span>
                    </button>

                    {portfolio.profilePhoto && (
                      <button
                        type="button"
                        onClick={() => {
                          setCropperSrc(portfolio.profilePhoto);
                          setCropperTarget("profile");
                          setCropperRatio(1);
                          setCropperTitle("Crop & Position Profile Photo (1:1)");
                          setCropperOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/15 bg-white/5 text-xs font-semibold hover:bg-white/10 transition"
                      >
                        <Scissors size={13} />
                        <span>Crop / Adjust</span>
                      </button>
                    )}

                    {portfolio.profilePhoto && (
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-500/30 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition"
                      >
                        <Trash2 size={13} />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Skills */}
            {activeTab === "skills" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold">Skills & Technologies</h3>
                  <p className="text-xs text-white/50">Add technical skills, tools, and areas of expertise.</p>
                </div>

                {/* Add Skill Input */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addSkill(newSkill);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="e.g. Next.js, GraphQL, PostgreSQL"
                    className="flex-1 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#d4af37] text-xs font-bold text-black hover:bg-[#e8ca83] transition shrink-0"
                  >
                    Add
                  </button>
                </form>

                {/* Tag Pills */}
                <div className="space-y-2">
                  <span className="text-xs text-white/50 font-medium">Active Skills ({skillsList.length})</span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {skillsList.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 text-xs text-white/90 hover:border-white/30 transition"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          aria-label={`Remove ${skill}`}
                          className="text-white/40 hover:text-red-400"
                        >
                          <X size={13} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Projects */}
            {activeTab === "projects" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold">Project Management</h3>
                  <p className="text-xs text-white/50">Showcase your best engineering and design projects.</p>
                </div>

                {/* Project Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveProject();
                  }}
                  className="rounded-2xl border border-white/15 bg-white/[0.03] p-5 space-y-3.5"
                >
                  <h4 className="text-sm font-bold text-[#d4af37]">
                    {editingProjectId !== null ? "Edit Project" : "Add New Project"}
                  </h4>

                  <label className="block text-xs font-semibold text-white/70">
                    Project Title *
                    <input
                      type="text"
                      required
                      value={projectForm.name}
                      onChange={(e) => setProjectForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. Distributed Task Orchestrator"
                      className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#d4af37]"
                    />
                  </label>

                  <label className="block text-xs font-semibold text-white/70">
                    Description *
                    <textarea
                      rows={3}
                      required
                      value={projectForm.description}
                      onChange={(e) => setProjectForm((p) => ({ ...p, description: e.target.value }))}
                      placeholder="Describe what you built, key technologies, and performance impact..."
                      className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-[#d4af37]"
                    />
                  </label>

                  {/* Project Image: File Upload OR Direct URL */}
                  <div className="space-y-1.5">
                    <span className="block text-xs font-semibold text-white/70">Project Image (Upload or URL)</span>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={projectForm.imageUrl}
                        onChange={(e) => setProjectForm((p) => ({ ...p, imageUrl: e.target.value }))}
                        placeholder="https://example.com/screenshot.jpg"
                        className="flex-1 rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs outline-none focus:border-[#d4af37]"
                      />
                      <input
                        type="file"
                        ref={projectPhotoInputRef}
                        accept="image/jpeg,image/png,image/webp,image/jpg"
                        onChange={handleProjectPhotoUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => projectPhotoInputRef.current?.click()}
                        className="px-3 py-2 rounded-xl border border-white/15 bg-white/5 text-xs font-semibold hover:bg-white/10 shrink-0 inline-flex items-center gap-1"
                      >
                        <Upload size={13} />
                        <span>Upload</span>
                      </button>

                      {projectForm.imageUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            setCropperSrc(projectForm.imageUrl || "");
                            setCropperTarget("project");
                            setCropperRatio(16 / 9);
                            setCropperTitle("Crop & Position Project Screenshot (16:9)");
                            setCropperOpen(true);
                          }}
                          className="px-3 py-2 rounded-xl border border-white/15 bg-white/5 text-xs font-semibold hover:bg-white/10 shrink-0 inline-flex items-center gap-1"
                        >
                          <Scissors size={13} />
                          <span>Crop</span>
                        </button>
                      )}
                    </div>
                    {projectImageError && (
                      <p className="text-[11px] text-red-400">{projectImageError}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="block text-xs font-semibold text-white/70">
                      Live Demo URL
                      <input
                        type="url"
                        value={projectForm.demoUrl}
                        onChange={(e) => setProjectForm((p) => ({ ...p, demoUrl: e.target.value }))}
                        placeholder="https://demo.app"
                        className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs outline-none focus:border-[#d4af37]"
                      />
                    </label>

                    <label className="block text-xs font-semibold text-white/70">
                      GitHub Repository URL
                      <input
                        type="url"
                        value={projectForm.githubUrl}
                        onChange={(e) => setProjectForm((p) => ({ ...p, githubUrl: e.target.value }))}
                        placeholder="https://github.com/..."
                        className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs outline-none focus:border-[#d4af37]"
                      />
                    </label>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#d4af37] text-xs font-bold text-black hover:bg-[#e8ca83] transition inline-flex items-center gap-1.5"
                    >
                      <Plus size={14} />
                      <span>{editingProjectId !== null ? "Update Project" : "Add Project"}</span>
                    </button>
                    {editingProjectId !== null && (
                      <button
                        type="button"
                        onClick={resetProjectForm}
                        className="px-4 py-2 rounded-xl border border-white/15 text-xs hover:bg-white/10 transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>

                {/* Projects List */}
                <div className="space-y-3">
                  <span className="text-xs text-white/50 font-medium">Projects in Portfolio ({portfolio.projects.length})</span>
                  {portfolio.projects.map((project, idx) => (
                    <div
                      key={project.id || idx}
                      className="flex items-start justify-between gap-3 p-3.5 rounded-xl border border-white/10 bg-white/[0.02]"
                    >
                      <div className="min-w-0 space-y-1">
                        <h5 className="text-sm font-bold truncate">{project.name}</h5>
                        <p className="text-xs text-white/60 line-clamp-2">{project.description}</p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveProject(idx, "up")}
                          title="Move up"
                          className="p-1.5 rounded hover:bg-white/10 disabled:opacity-20"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          type="button"
                          disabled={idx === portfolio.projects.length - 1}
                          onClick={() => moveProject(idx, "down")}
                          title="Move down"
                          className="p-1.5 rounded hover:bg-white/10 disabled:opacity-20"
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => editProject(project)}
                          title="Edit"
                          className="p-1.5 rounded hover:bg-white/10 text-white/80"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteProject(project.id)}
                          title="Delete"
                          className="p-1.5 rounded hover:bg-red-500/20 text-red-400"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: Social Links */}
            {activeTab === "social" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold">Social & External Links</h3>
                  <p className="text-xs text-white/50">Connect your profiles so visitors can reach you.</p>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                    GitHub Profile URL
                    <div className="relative mt-1.5">
                      <GithubIcon size={15} className="absolute left-3.5 top-3 text-white/40" />
                      <input
                        type="url"
                        value={portfolio.githubUrl}
                        onChange={(e) => updatePortfolio("githubUrl", e.target.value)}
                        placeholder="https://github.com/username"
                        className="w-full rounded-xl border border-white/15 bg-white/5 pl-10 pr-3.5 py-2.5 text-sm outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </label>

                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                    LinkedIn Profile URL
                    <div className="relative mt-1.5">
                      <LinkedinIcon size={15} className="absolute left-3.5 top-3 text-white/40" />
                      <input
                        type="url"
                        value={portfolio.linkedinUrl}
                        onChange={(e) => updatePortfolio("linkedinUrl", e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full rounded-xl border border-white/15 bg-white/5 pl-10 pr-3.5 py-2.5 text-sm outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </label>

                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                    Personal Website / Blog
                    <div className="relative mt-1.5">
                      <Globe size={15} className="absolute left-3.5 top-3 text-white/40" />
                      <input
                        type="url"
                        value={portfolio.websiteUrl}
                        onChange={(e) => updatePortfolio("websiteUrl", e.target.value)}
                        placeholder="https://yourdomain.com"
                        className="w-full rounded-xl border border-white/15 bg-white/5 pl-10 pr-3.5 py-2.5 text-sm outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* TAB 6: Design Customization */}
            {activeTab === "design" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold">Design Customization</h3>
                  <p className="text-xs text-white/50">Tailor color accents and typography to match your brand.</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                    <span className="text-xs font-semibold">Accent Color</span>
                    <input
                      type="color"
                      value={style.accentColor}
                      onChange={(e) => updateStyle("accentColor", e.target.value)}
                      className="w-10 h-8 rounded cursor-pointer bg-transparent"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                    <span className="text-xs font-semibold">Background Color</span>
                    <input
                      type="color"
                      value={style.backgroundColor}
                      onChange={(e) => updateStyle("backgroundColor", e.target.value)}
                      className="w-10 h-8 rounded cursor-pointer bg-transparent"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
                    <span className="text-xs font-semibold">Text Color</span>
                    <input
                      type="color"
                      value={style.textColor}
                      onChange={(e) => updateStyle("textColor", e.target.value)}
                      className="w-10 h-8 rounded cursor-pointer bg-transparent"
                    />
                  </div>

                  <label className="block text-xs font-semibold text-white/70 pt-1">
                    Font Family
                    <select
                      value={style.fontFamily}
                      onChange={(e) => updateStyle("fontFamily", e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#171717] px-3.5 py-2.5 text-sm outline-none focus:border-[#d4af37]"
                    >
                      {availableFonts.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="pt-2 space-y-2">
                    <button
                      type="button"
                      onClick={() => {
                        const templateTheme = getTemplateTheme(templateId);
                        setStyle(templateTheme);
                        try {
                          localStorage.setItem(`${STYLE_KEY}-${templateId}`, JSON.stringify(templateTheme));
                        } catch {
                          // storage not available
                        }
                      }}
                      className="w-full py-2.5 px-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition"
                    >
                      <RotateCcw size={14} />
                      <span>Reset to {templateName} Authentic Theme</span>
                    </button>
                    <p className="text-[11px] text-white/40 text-center">
                      Restores the signature colors designed specifically for this template.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Live Preview Panel */}
        <section
          className={`${
            mobileView === "editor" ? "hidden" : "flex"
          } lg:col-span-7 xl:col-span-8 min-h-0 flex-col overflow-y-auto bg-[#121212] lg:flex`}
        >
          {/* Preview Device Controls Toolbar */}
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-[#121212]/95 backdrop-blur px-5 py-3">
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-[#d4af37]" />
              <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                Live Preview
              </span>
            </div>

            <div className="flex items-center gap-1 rounded-lg border border-white/10 p-1 bg-black/30">
              <button
                type="button"
                onClick={() => setPreviewDevice("desktop")}
                title="Desktop View (100%)"
                className={`p-1.5 rounded ${
                  previewDevice === "desktop" ? "bg-white/15 text-white" : "text-white/40 hover:text-white"
                }`}
              >
                <Monitor size={15} />
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice("tablet")}
                title="Tablet View (768px)"
                className={`p-1.5 rounded ${
                  previewDevice === "tablet" ? "bg-white/15 text-white" : "text-white/40 hover:text-white"
                }`}
              >
                <Tablet size={15} />
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice("mobile")}
                title="Mobile View (375px)"
                className={`p-1.5 rounded ${
                  previewDevice === "mobile" ? "bg-white/15 text-white" : "text-white/40 hover:text-white"
                }`}
              >
                <Smartphone size={15} />
              </button>
            </div>
          </div>

          {/* Scaled Preview Frame */}
          <div className="flex-1 p-4 md:p-8 flex justify-center items-start overflow-x-auto">
            <div
              className={`transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl border border-white/10 ${
                previewDevice === "desktop"
                  ? "w-full max-w-4xl"
                  : previewDevice === "tablet"
                    ? "w-[768px]"
                    : "w-[375px]"
              }`}
            >
              <PortfolioRenderer
                portfolio={portfolio}
                style={style}
                templateId={templateId}
                isStandalone={false}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Interactive Image Cropper Modal */}
      {cropperOpen && (
        <ImageCropperModal
          key={`${cropperTarget}-${cropperSrc.slice(0, 40)}`}
          isOpen={cropperOpen}
          imageSrc={cropperSrc}
          aspectRatio={cropperRatio}
          title={cropperTitle}
          onCropComplete={handleCropComplete}
          onClose={() => setCropperOpen(false)}
        />
      )}
    </div>
  );
}
