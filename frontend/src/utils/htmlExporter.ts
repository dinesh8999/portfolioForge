import type { PortfolioData, PortfolioStyle } from "../types/portfolio";
import { escapeHtml, safeUrl } from "./portfolio";
import { getTemplateTheme } from "../data/templates";

export function generateStandaloneHtml(
  portfolio: PortfolioData,
  style: PortfolioStyle,
  templateId: string
): string {
  const defaultTheme = getTemplateTheme(templateId || "minimal");
  const accent = style.accentColor || defaultTheme.accentColor;
  const bg = style.backgroundColor || defaultTheme.backgroundColor;
  const text = style.textColor || defaultTheme.textColor;
  const font = style.fontFamily || defaultTheme.fontFamily;

  const skillsList = portfolio.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const skillsHtml = skillsList
    .map((s) => `<span class="skill-tag">${escapeHtml(s)}</span>`)
    .join("\n      ");

  const projectsHtml = portfolio.projects
    .map((p) => {
      const demo = safeUrl(p.demoUrl);
      const code = safeUrl(p.githubUrl);
      const img = p.imageUrl ? safeUrl(p.imageUrl) || p.imageUrl : "";

      return `
      <article class="project-card">
        ${img ? `<div class="project-img-wrap"><img src="${escapeHtml(img)}" alt="${escapeHtml(p.name)}" class="project-img" /></div>` : ""}
        <h3 class="project-title">${escapeHtml(p.name)}</h3>
        <p class="project-desc">${escapeHtml(p.description)}</p>
        <div class="project-links">
          ${demo ? `<a href="${escapeHtml(demo)}" target="_blank" rel="noopener noreferrer" class="link-btn primary-link">Live Demo &rarr;</a>` : ""}
          ${code ? `<a href="${escapeHtml(code)}" target="_blank" rel="noopener noreferrer" class="link-btn secondary-link">Source Code &rarr;</a>` : ""}
        </div>
      </article>`;
    })
    .join("\n");

  const github = safeUrl(portfolio.githubUrl);
  const linkedin = safeUrl(portfolio.linkedinUrl);
  const website = safeUrl(portfolio.websiteUrl);

  const socialLinks = [
    github ? `<a href="${escapeHtml(github)}" target="_blank" rel="noopener noreferrer" class="social-link">GitHub</a>` : "",
    linkedin ? `<a href="${escapeHtml(linkedin)}" target="_blank" rel="noopener noreferrer" class="social-link">LinkedIn</a>` : "",
    website ? `<a href="${escapeHtml(website)}" target="_blank" rel="noopener noreferrer" class="social-link">Website</a>` : "",
  ].filter(Boolean).join("\n      ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(portfolio.name)} - Portfolio</title>
  <style>
    :root {
      --accent: ${accent};
      --bg: ${bg};
      --text: ${text};
      --font: ${JSON.stringify(font)}, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font);
      line-height: 1.6;
      padding: 40px 20px;
      min-height: 100vh;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
    header {
      padding: 40px 0 30px;
      border-bottom: 1px solid rgba(255,255,255,0.15);
      margin-bottom: 40px;
      display: flex;
      flex-direction: column-reverse;
      gap: 24px;
    }
    @media (min-width: 640px) {
      header {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
    .profile-photo {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid var(--accent);
    }
    .avatar-fallback {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      font-weight: bold;
      background: rgba(255,255,255,0.05);
      border: 3px solid var(--accent);
      color: var(--accent);
    }
    .role-badge {
      display: inline-block;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 8px;
    }
    h1 {
      font-size: clamp(2rem, 5vw, 3.5rem);
      line-height: 1.15;
      margin-bottom: 16px;
    }
    .bio {
      font-size: 16px;
      opacity: 0.85;
      max-width: 600px;
      margin-bottom: 20px;
      line-height: 1.7;
    }
    .social-row {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: center;
    }
    .social-link {
      color: var(--text);
      opacity: 0.8;
      text-decoration: underline;
      font-size: 14px;
    }
    .social-link:hover { opacity: 1; color: var(--accent); }
    .email-link {
      display: inline-block;
      padding: 8px 18px;
      border-radius: 8px;
      background: var(--accent);
      color: #000;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
    }
    section { margin-bottom: 50px; }
    h2 {
      font-size: 22px;
      margin-bottom: 20px;
      color: var(--accent);
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 8px;
    }
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .skill-tag {
      padding: 6px 14px;
      border-radius: 20px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.15);
      font-size: 13px;
    }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }
    .project-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 14px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .project-img-wrap {
      width: 100%;
      height: 180px;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 16px;
    }
    .project-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .project-title {
      font-size: 18px;
      margin-bottom: 10px;
    }
    .project-desc {
      font-size: 14px;
      opacity: 0.75;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .project-links {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .link-btn {
      font-size: 13px;
      text-decoration: none;
      font-weight: 600;
    }
    .primary-link { color: var(--accent); }
    .secondary-link { opacity: 0.7; color: var(--text); }
    footer {
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 30px;
      text-align: center;
      font-size: 13px;
      opacity: 0.5;
    }
  </style>
</head>
<body class="template-${escapeHtml(templateId)}">
  <div class="container">
    <header>
      <div>
        <span class="role-badge">${escapeHtml(portfolio.role)}</span>
        <h1>${escapeHtml(portfolio.name)}</h1>
        <p class="bio">${escapeHtml(portfolio.bio)}</p>
        <div class="social-row">
          ${portfolio.email ? `<a href="mailto:${escapeHtml(portfolio.email)}" class="email-link">Contact</a>` : ""}
          ${socialLinks}
        </div>
      </div>
      <div>
        ${portfolio.profilePhoto ? `<img src="${escapeHtml(portfolio.profilePhoto)}" alt="${escapeHtml(portfolio.name)}" class="profile-photo" />` : `<div class="avatar-fallback">${escapeHtml(portfolio.name.slice(0, 2).toUpperCase() || "PF")}</div>`}
      </div>
    </header>

    ${skillsList.length > 0 ? `
    <section>
      <h2>Skills &amp; Technologies</h2>
      <div class="skills-grid">
        ${skillsHtml}
      </div>
    </section>` : ""}

    <section>
      <h2>Featured Projects</h2>
      <div class="projects-grid">
        ${projectsHtml || '<p style="opacity:0.6;font-style:italic;">No projects added yet.</p>'}
      </div>
    </section>

    <footer>
      &copy; ${new Date().getFullYear()} ${escapeHtml(portfolio.name)}. Generated with PortfolioForge.
    </footer>
  </div>
</body>
</html>`;
}

