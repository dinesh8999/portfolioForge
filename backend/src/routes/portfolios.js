import { Router } from "express";
import { randomBytes } from "node:crypto";
import Portfolio from "../models/Portfolio.js";

const router = Router();

const allowedTemplates = new Set([
  // Original 9 Templates
  "minimal",
  "executive",
  "creative",
  "neon",
  "editorial",
  "modern-blue",
  "terminal",
  "warm",
  "product",
  // 10 Next-Gen Templates
  "cyberpunk",
  "nordic",
  "brutalist",
  "aurora",
  "swiss",
  "synthwave",
  "academic",
  "bento",
  "luxe",
  "retro-os",
]);

/**
 * Validates regular HTTP/HTTPS web URLs.
 */
function validWebUrl(value) {
  if (!value || typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  try {
    const url = new URL(trimmed);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

/**
 * Validates either an HTTP/HTTPS URL or an image Data URL (Base64).
 * Fast O(1) format check without catastrophic regex performance bottlenecks on large photos.
 */
function validImageOrUrl(value) {
  if (!value || typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";

  // Check if it's a Base64 data URI for an image (no artificial size limit)
  if (trimmed.startsWith("data:image/") && trimmed.includes(";base64,")) {
    return trimmed;
  }

  // Otherwise check if it's a standard web URL
  return validWebUrl(trimmed);
}

function validatePortfolio(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return "Invalid portfolio data.";
  }

  if (typeof body.name !== "string" || !body.name.trim()) {
    return "Portfolio name is required.";
  }

  if (body.name.trim().length > 100) return "Name must be 100 characters or fewer.";
  if (body.role && typeof body.role === "string" && body.role.length > 150) {
    return "Role must be 150 characters or fewer.";
  }
  if (body.bio && typeof body.bio === "string" && body.bio.length > 3000) {
    return "Bio must be 3000 characters or fewer.";
  }
  if (body.email && typeof body.email === "string" && body.email.length > 254) {
    return "Email must be 254 characters or fewer.";
  }

  if (body.projects !== undefined && !Array.isArray(body.projects)) {
    return "Projects must be an array.";
  }
  if (body.projects && body.projects.length > 50) {
    return "You can add a maximum of 50 projects.";
  }

  if (body.skills !== undefined && !Array.isArray(body.skills)) {
    return "Skills must be an array.";
  }
  if (body.skills && body.skills.length > 100) {
    return "You can add a maximum of 100 skills.";
  }

  return null;
}

function cleanPortfolio(body, slug) {
  const style = body.style && typeof body.style === "object" ? body.style : {};

  const projects = (Array.isArray(body.projects) ? body.projects : [])
    .map((project, index) => {
      const name = String(project.name ?? "").trim().slice(0, 150);
      const description = String(project.description ?? "").trim().slice(0, 3000);
      return {
        id: Number(project.id) || index + 1,
        name,
        description,
        imageUrl: validImageOrUrl(project.imageUrl),
        demoUrl: validWebUrl(project.demoUrl),
        githubUrl: validWebUrl(project.githubUrl),
      };
    })
    .filter((project) => project.name && project.description);

  const hexColor = (value, fallback) =>
    typeof value === "string" && /^#[0-9a-fA-F]{3,8}$/.test(value) ? value : fallback;

  const validFonts = ["Arial", "Georgia", "Verdana", "Courier New", "Inter", "sans-serif", "serif", "monospace"];
  const fontFamily = validFonts.includes(style.fontFamily) ? style.fontFamily : "Arial";

  return {
    slug,
    name: body.name.trim(),
    role: String(body.role ?? "").trim().slice(0, 150),
    bio: String(body.bio ?? "").trim().slice(0, 3000),
    email: String(body.email ?? "").trim().slice(0, 254),
    skills: (Array.isArray(body.skills) ? body.skills : [])
      .map((skill) => String(skill).trim().slice(0, 100))
      .filter(Boolean),
    profilePhoto: validImageOrUrl(body.profilePhoto),
    githubUrl: validWebUrl(body.githubUrl),
    linkedinUrl: validWebUrl(body.linkedinUrl),
    websiteUrl: validWebUrl(body.websiteUrl),
    projects,
    templateId: allowedTemplates.has(body.templateId) ? body.templateId : "minimal",
    templateName: String(body.templateName ?? "The Minimalist").trim().slice(0, 100),
    style: {
      accentColor: hexColor(style.accentColor, "#d4af37"),
      backgroundColor: hexColor(style.backgroundColor, "#111111"),
      textColor: hexColor(style.textColor, "#ffffff"),
      fontFamily,
    },
    published: true,
  };
}

// Helper to generate a collision-resistant unique slug
async function generateUniqueSlug() {
  for (let attempt = 0; attempt < 5; attempt++) {
    const candidate = `portfolio-${randomBytes(5).toString("hex")}`;
    const existing = await Portfolio.findOne({ slug: candidate }).select("_id").lean();
    if (!existing) return candidate;
  }
  return `portfolio-${Date.now()}-${randomBytes(3).toString("hex")}`;
}

// POST /api/portfolios - Publish a new portfolio
router.post("/", async (req, res, next) => {
  try {
    const validationError = validatePortfolio(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const slug = await generateUniqueSlug();
    const cleaned = cleanPortfolio(req.body, slug);
    const portfolio = await Portfolio.create(cleaned);

    const publicBase = process.env.PUBLIC_APP_URL || process.env.FRONTEND_URL || "http://localhost:5173";
    const cleanPublicBase = publicBase.replace(/\/+$/, "");

    return res.status(201).json({
      message: "Portfolio published successfully.",
      slug: portfolio.slug,
      url: `${cleanPublicBase}/p/${portfolio.slug}`,
      portfolio,
    });
  } catch (error) {
    console.error("Publish failed:", error);
    next(error);
  }
});

// GET /api/portfolios/:slug - Retrieve a published portfolio
router.get("/:slug", async (req, res, next) => {
  try {
    const slug = req.params.slug;
    if (!slug || !/^[a-z0-9-]{1,100}$/i.test(slug)) {
      return res.status(400).json({ error: "Invalid portfolio link." });
    }

    const portfolio = await Portfolio.findOne({
      slug: slug.toLowerCase(),
      published: true,
    }).lean();

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found." });
    }

    return res.json({ portfolio });
  } catch (error) {
    console.error("Fetch portfolio failed:", error);
    next(error);
  }
});

export default router;
