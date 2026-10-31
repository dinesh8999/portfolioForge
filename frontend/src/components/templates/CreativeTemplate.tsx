import React from "react";
import { ArrowUpRight, Globe, Mail, Sparkles, Palette } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/Icons";
import type { TemplateRenderProps } from "./types";
import { getInitials, safeUrl } from "../../utils/portfolio";
import { getTemplateTheme } from "../../data/templates";

export const CreativeTemplate: React.FC<TemplateRenderProps> = ({
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
  const defaultTheme = getTemplateTheme("creative");
  const accent = style.accentColor || defaultTheme.accentColor;
  const bg = style.backgroundColor || defaultTheme.backgroundColor;
  const text = style.textColor || defaultTheme.textColor;

  const github = safeUrl(githubUrl);
  const linkedin = safeUrl(linkedinUrl);
  const website = safeUrl(websiteUrl);

  return (
    <div
      className="min-h-full w-full py-16 px-6 sm:px-12 lg:px-16"
      style={{
        backgroundColor: bg,
        color: text,
        fontFamily: style.fontFamily || defaultTheme.fontFamily,
      }}
    >
      <div className="mx-auto max-w-5xl space-y-20">
        {/* Playful Asymmetrical Artistic Header */}
        <header className="relative">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-8 space-y-6">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-current/25 shadow-sm"
                style={{ backgroundColor: `${accent}15` }}
              >
                <Sparkles size={14} style={{ color: accent }} />
                <span style={{ color: accent }}>Creative Studio &bull; Think Different</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02]">
                {name || "Your Name"}
              </h1>

              <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold tracking-tight">
                <Palette size={20} style={{ color: accent }} />
                <p style={{ color: accent }}>
                  {role || "Art Director & Creative Technologist"}
                </p>
              </div>

              <p className="text-base sm:text-lg leading-relaxed opacity-90 max-w-xl font-normal">
                {bio || "Crafting bold interactive digital experiences, tactile design systems, and generative web installations at the intersection of art and engineering."}
              </p>

              {/* Social and Contact Badges */}
              <div className="flex flex-wrap gap-3 pt-3">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white shadow-lg transition hover:scale-105"
                    style={{ backgroundColor: accent }}
                  >
                    <Mail size={16} />
                    <span>Get in Touch</span>
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border border-current/20 hover:border-current hover:bg-black/5 transition"
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
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border border-current/20 hover:border-current hover:bg-black/5 transition"
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
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border border-current/20 hover:border-current hover:bg-black/5 transition"
                  >
                    <Globe size={16} />
                    <span>Website</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Profile Avatar with Artistic Rotated Double-Border Frame */}
            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div className="relative">
                {/* Decorative background shadow patch */}
                <div
                  className="absolute -inset-3 rounded-3xl opacity-25 blur-lg"
                  style={{ backgroundColor: accent }}
                />
                {/* Offset decorative border ring */}
                <div
                  className="absolute inset-0 rounded-3xl border-2 transform rotate-6 transition group-hover:rotate-0"
                  style={{ borderColor: accent }}
                />
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt={name}
                    className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl object-cover border-4 shadow-xl -rotate-2 hover:rotate-0 transition duration-300 bg-white"
                    style={{ borderColor: accent }}
                  />
                ) : (
                  <div
                    className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl flex items-center justify-center text-4xl font-black border-4 shadow-xl -rotate-2 hover:rotate-0 transition duration-300 bg-white/70"
                    style={{
                      borderColor: accent,
                      color: accent,
                    }}
                  >
                    {getInitials(name)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Skills Tag Cloud */}
        {skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs uppercase tracking-[0.25em] font-extrabold opacity-70">
              Creative Toolkit &bull; Capabilities
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className="px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold border border-current/15 bg-white/40 hover:scale-105 transition shadow-sm"
                  style={{ borderLeftColor: accent, borderLeftWidth: "3px" }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Creative Project Cards */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-current/15 pb-4">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Featured Creations
            </h2>
            <span
              className="text-xs font-bold px-3 py-1 rounded-full border border-current/20"
              style={{ backgroundColor: `${accent}15`, color: accent }}
            >
              {projects.length} Works
            </span>
          </div>

          {projects.length === 0 ? (
            <p className="text-sm opacity-50 italic py-6">Creations coming soon.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-8">
              {projects.map((project, idx) => {
                const demo = safeUrl(project.demoUrl);
                const code = safeUrl(project.githubUrl);

                return (
                  <article
                    key={project.id || idx}
                    className="flex flex-col justify-between rounded-3xl border border-current/15 p-6 sm:p-7 hover:border-current/40 transition duration-300 shadow-lg group bg-white/60 backdrop-blur-sm"
                  >
                    <div className="space-y-4">
                      {project.imageUrl && (
                        <div className="w-full h-48 rounded-2xl overflow-hidden border border-current/10">
                          <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                        </div>
                      )}

                      <h3 className="text-2xl font-bold tracking-tight">
                        {project.name}
                      </h3>

                      <p className="text-sm opacity-85 leading-relaxed font-normal">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-6 mt-6 border-t border-current/10 text-xs font-bold">
                      {demo && (
                        <a
                          href={demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white hover:opacity-90 transition shadow-sm"
                          style={{ backgroundColor: accent }}
                        >
                          <span>Explore Project</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                      {code && (
                        <a
                          href={code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-current/20 hover:border-current hover:bg-black/5 transition"
                        >
                          <span>Source</span>
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
        <footer className="pt-10 border-t border-current/15 flex flex-col sm:flex-row items-center justify-between text-xs opacity-70 gap-4">
          <span>&copy; {new Date().getFullYear()} {name || "Creative"}. Built with flair.</span>
          <span>Powered by PortfolioForge</span>
        </footer>
      </div>
    </div>
  );
};
