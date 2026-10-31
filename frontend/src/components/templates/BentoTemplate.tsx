import React from "react";
import { ArrowUpRight, CheckCircle, Globe, LayoutGrid, Mail, Smartphone, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/Icons";
import type { TemplateRenderProps } from "./types";
import { getInitials, safeUrl } from "../../utils/portfolio";
import { getTemplateTheme } from "../../data/templates";

export const BentoTemplate: React.FC<TemplateRenderProps> = ({
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
  const defaultTheme = getTemplateTheme("bento");
  const accent = style.accentColor || defaultTheme.accentColor;
  const bg = style.backgroundColor || defaultTheme.backgroundColor;
  const text = style.textColor || defaultTheme.textColor;

  const github = safeUrl(githubUrl);
  const linkedin = safeUrl(linkedinUrl);
  const website = safeUrl(websiteUrl);

  return (
    <div
      className="min-h-full w-full py-16 px-6 sm:px-10 md:px-14"
      style={{
        backgroundColor: bg,
        color: text,
        fontFamily: style.fontFamily || defaultTheme.fontFamily,
      }}
    >
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Bento Top Header Bar */}
        <div className="flex items-center justify-between px-2 text-xs font-mono uppercase tracking-widest text-white/50">
          <div className="flex items-center gap-2">
            <LayoutGrid size={14} style={{ color: accent }} />
            <span>MODERN BENTO &bull; EVERY DETAIL MATTERS</span>
          </div>
          <span>GRID V2.4</span>
        </div>

        {/* Bento Modular Grid Hero Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Main Hero Bento Card (Spans 8 cols) */}
          <div className="md:col-span-8 rounded-3xl border border-white/10 bg-[#141416] p-8 sm:p-10 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/80">
                <Smartphone size={13} style={{ color: accent }} />
                <span>Staff Mobile &amp; iOS Craft</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {name || "Lucas Chen"}
              </h1>

              <p className="text-lg sm:text-xl font-semibold" style={{ color: accent }}>
                {role || "Staff Mobile & iOS Engineer"}
              </p>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal max-w-lg">
                {bio || "Obsessed with 120Hz micro-interactions, haptics, and clean Swift architectures. Crafting flagship mobile experiences enjoyed by millions."}
              </p>
            </div>

            {/* Social Links Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-black shadow-md transition hover:opacity-90"
                  style={{ backgroundColor: accent }}
                >
                  <Mail size={14} />
                  <span>Get in Touch</span>
                </a>
              )}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 hover:bg-white/10 text-white transition"
                >
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                  <ArrowUpRight size={12} />
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 hover:bg-white/10 text-white transition"
                >
                  <LinkedinIcon size={14} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} />
                </a>
              )}
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 hover:bg-white/10 text-white transition"
                >
                  <Globe size={14} />
                  <span>Website</span>
                  <ArrowUpRight size={12} />
                </a>
              )}
            </div>
          </div>

          {/* Profile Photo Bento Card (Spans 4 cols) */}
          <div className="md:col-span-4 rounded-3xl border border-white/10 bg-[#141416] p-6 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt={name}
                className="w-44 h-44 rounded-2xl object-cover border border-white/20 shadow-lg"
              />
            ) : (
              <div
                className="w-40 h-40 rounded-2xl border border-white/20 bg-white/5 flex flex-col items-center justify-center text-4xl font-extrabold text-white shadow-lg"
              >
                <Sparkles size={28} className="mb-2" style={{ color: accent }} />
                <span>{getInitials(name)}</span>
              </div>
            )}
            <span className="text-xs text-white/50 mt-4 font-mono">BENTO_AVATAR // READY</span>
          </div>
        </div>

        {/* Bento Skills Box (Full width or multi-pill) */}
        {skills.length > 0 && (
          <div className="rounded-3xl border border-white/10 bg-[#141416] p-7 shadow-xl space-y-4">
            <h2 className="text-xs uppercase tracking-widest font-mono text-white/50">
              STACK &bull; SYSTEM MODULES
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className="px-4 py-2 rounded-2xl text-xs font-medium border border-white/10 bg-white/[0.04] text-white/90 hover:bg-white/10 transition shadow-sm flex items-center gap-1.5"
                >
                  <CheckCircle size={12} style={{ color: accent }} />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bento Projects Showcase */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold tracking-tight text-white">
              Featured Case Studies
            </h2>
            <span className="text-xs text-white/50 font-mono">
              {projects.length} TILES
            </span>
          </div>

          {projects.length === 0 ? (
            <p className="text-sm text-white/40 italic p-6">No tiles recorded.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((project, idx) => {
                const demo = safeUrl(project.demoUrl);
                const code = safeUrl(project.githubUrl);

                return (
                  <article
                    key={project.id || idx}
                    className="rounded-3xl border border-white/10 bg-[#141416] p-6 sm:p-7 shadow-xl hover:border-white/20 transition duration-300 flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      {project.imageUrl && (
                        <div className="w-full h-44 rounded-2xl overflow-hidden border border-white/10 bg-black/50">
                          <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                        </div>
                      )}

                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
                        {project.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-white/10 text-xs font-semibold">
                      {demo && (
                        <a
                          href={demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 transition hover:underline"
                          style={{ color: accent }}
                        >
                          <span>Live System</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                      {code && (
                        <a
                          href={code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-white/60 hover:text-white transition"
                        >
                          <span>Repository</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4 font-mono">
          <span>&copy; {new Date().getFullYear()} {name || "Bento"}. Modular precision.</span>
          <span>Crafted via PortfolioForge</span>
        </footer>
      </div>
    </div>
  );
};

export default BentoTemplate;

