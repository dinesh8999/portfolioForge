import React from "react";
import { ArrowUpRight, BarChart3, Compass, Globe, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/Icons";
import type { TemplateRenderProps } from "./types";
import { getInitials, safeUrl } from "../../utils/portfolio";
import { getTemplateTheme } from "../../data/templates";

export const ProductTemplate: React.FC<TemplateRenderProps> = ({
  name,
  role,
  bio,
  email,
  skills,
  profilePhoto,
  githubUrl,
  linkedinUrl,
  websiteUrl,
  projects,
  style,
}) => {
  const defaultTheme = getTemplateTheme("product");
  const accent = style.accentColor || defaultTheme.accentColor;
  const bg = style.backgroundColor || defaultTheme.backgroundColor;
  const text = style.textColor || defaultTheme.textColor;

  const github = safeUrl(githubUrl);
  const linkedin = safeUrl(linkedinUrl);
  const website = safeUrl(websiteUrl);

  return (
    <div
      className="min-h-full w-full py-16 px-6 sm:px-12 md:px-16"
      style={{
        backgroundColor: bg,
        color: text,
        fontFamily: style.fontFamily || defaultTheme.fontFamily,
      }}
    >
      <div className="mx-auto max-w-5xl space-y-16">
        {/* Product Designer Hero */}
        <header className="rounded-3xl border border-purple-200/80 bg-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 max-w-2xl text-center md:text-left">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200"
              >
                <Compass size={14} />
                <span>Product Design &bull; Design with Purpose</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-purple-950">
                {name || "Your Name"}
              </h1>

              <p
                className="text-lg sm:text-xl font-bold"
                style={{ color: accent }}
              >
                {role || "Lead Product & UI/UX Designer"}
              </p>

              <p className="text-sm sm:text-base text-purple-900/70 leading-relaxed font-normal">
                {bio || "Designing user-centered product ecosystems, frictionless design systems, and multi-platform digital experiences."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
                    style={{ backgroundColor: accent }}
                  >
                    <Mail size={16} />
                    <span>Let's Talk</span>
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold border border-purple-200 text-purple-900 bg-white hover:bg-purple-50 transition"
                  >
                    <GithubIcon size={16} />
                    <span>GitHub</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold border border-purple-200 text-purple-900 bg-white hover:bg-purple-50 transition"
                  >
                    <LinkedinIcon size={16} />
                    <span>LinkedIn</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold border border-purple-200 text-purple-900 bg-white hover:bg-purple-50 transition"
                  >
                    <Globe size={16} />
                    <span>Case Studies</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Profile Avatar with Soft Lavender Ring */}
            <div className="shrink-0">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt={name}
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl object-cover border-4 border-white shadow-2xl ring-4 ring-purple-100"
                />
              ) : (
                <div
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl flex items-center justify-center text-3xl font-extrabold bg-purple-50 border-4 border-white shadow-2xl ring-4 ring-purple-100"
                  style={{ color: accent }}
                >
                  {getInitials(name)}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Product Skills / Competencies */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <BarChart3 size={16} style={{ color: accent }} />
              <h2 className="text-xs uppercase tracking-widest font-bold opacity-60">
                Product Competencies &amp; Toolkit
              </h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-purple-100 bg-white text-purple-900 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Case Studies / Projects */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-purple-200 pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-purple-950">
              Product Case Studies
            </h2>
            <span
              className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-800"
            >
              {projects.length} Case Studies
            </span>
          </div>

          {projects.length === 0 ? (
            <p className="text-sm text-purple-400 italic py-6">Case studies coming soon.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-8">
              {projects.map((project, idx) => {
                const demo = safeUrl(project.demoUrl);
                const code = safeUrl(project.githubUrl);

                return (
                  <article
                    key={project.id || idx}
                    className="flex flex-col justify-between rounded-3xl border border-purple-100 bg-white p-7 shadow-lg hover:shadow-xl transition duration-300 group"
                  >
                    <div className="space-y-4">
                      {project.imageUrl && (
                        <div className="w-full h-48 rounded-2xl overflow-hidden border border-purple-100 bg-purple-50">
                          <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                        </div>
                      )}

                      <h3 className="text-xl font-bold text-purple-950 group-hover:text-purple-700 transition">
                        {project.name}
                      </h3>

                      <p className="text-sm text-purple-900/70 leading-relaxed font-normal">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-6 mt-6 border-t border-purple-100 text-xs font-semibold">
                      {demo && (
                        <a
                          href={demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white transition hover:opacity-90 shadow-md"
                          style={{ backgroundColor: accent }}
                        >
                          <span>View Prototype</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                      {code && (
                        <a
                          href={code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-purple-200 text-purple-900 bg-white hover:bg-purple-50 transition"
                        >
                          <span>Documentation</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-purple-200 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-700/60 gap-4">
          <span>&copy; {new Date().getFullYear()} {name || "Product Designer"}. Driven by user empathy.</span>
          <span>Crafted with PortfolioForge</span>
        </footer>
      </div>
    </div>
  );
};
