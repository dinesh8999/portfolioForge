import React from "react";
import { ArrowUpRight, Crown, Mail, Sparkle } from "lucide-react";
import type { TemplateRenderProps } from "./types";
import { getInitials, safeUrl } from "../../utils/portfolio";
import { getTemplateTheme } from "../../data/templates";

export const LuxeTemplate: React.FC<TemplateRenderProps> = ({
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
  const defaultTheme = getTemplateTheme("luxe");
  const accent = style.accentColor || defaultTheme.accentColor;
  const bg = style.backgroundColor || defaultTheme.backgroundColor;
  const text = style.textColor || defaultTheme.textColor;

  const github = safeUrl(githubUrl);
  const linkedin = safeUrl(linkedinUrl);
  const website = safeUrl(websiteUrl);

  return (
    <div
      className="min-h-full w-full py-20 px-6 sm:px-14 md:px-24 selection:bg-white selection:text-black"
      style={{
        backgroundColor: bg,
        color: text,
        fontFamily: style.fontFamily || defaultTheme.fontFamily,
      }}
    >
      <div className="mx-auto max-w-4xl space-y-24">
        {/* Haute Couture Luxe Masthead */}
        <header className="space-y-12 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-white/20 pb-5 text-xs font-mono tracking-[0.3em] uppercase text-white/50">
            <div className="flex items-center gap-2">
              <Crown size={14} style={{ color: accent }} />
              <span>LUXE ATELIER &bull; TIMELESS SOPHISTICATION</span>
            </div>
            <span>PARIS &bull; MILAN &bull; TOKYO</span>
          </div>

          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            <div className="space-y-6 max-w-xl">
              <span className="text-xs uppercase tracking-[0.4em] text-white/60 font-mono block">
                HAUTE DIRECTION
              </span>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-normal italic tracking-tight text-white leading-tight">
                {name || "Valerie Laurent"}
              </h1>

              <div className="h-px w-20 bg-white/40 mx-auto md:mx-0" />

              <p className="text-xl font-serif text-white/90 italic tracking-wide">
                {role || "Luxury Brand Director & Digital Atelier"}
              </p>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
                {bio || "Directing high-fashion digital experiences for European luxury maisons. Championing pure typography, sensory minimalism, and bespoke digital craft."}
              </p>

              {/* Minimal Luxury Links */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-2 text-xs uppercase tracking-[0.2em] font-mono text-white/75">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white text-white hover:bg-white hover:text-black transition"
                  >
                    <Mail size={13} />
                    <span>Private Salon</span>
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    <span>Archive</span>
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    <span>Liaison</span>
                  </a>
                )}
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    <span>Monograph</span>
                  </a>
                )}
              </div>
            </div>

            {/* Profile Avatar with Fine Hairline Silver Frame */}
            <div className="shrink-0">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt={name}
                  className="w-44 h-56 sm:w-52 sm:h-64 object-cover border border-white/30 shadow-2xl filter grayscale contrast-110"
                />
              ) : (
                <div
                  className="w-44 h-56 sm:w-52 sm:h-64 border border-white/30 flex flex-col items-center justify-between p-6 bg-white/[0.02] shadow-2xl"
                >
                  <Sparkle size={18} className="text-white/40" />
                  <span className="font-serif text-3xl italic">{getInitials(name)}</span>
                  <span className="font-mono text-[10px] tracking-widest text-white/40">ATELIER</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Curation Skills */}
        {skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs uppercase tracking-[0.3em] font-mono text-white/50 text-center md:text-left">
              EXPERTISE &bull; MÉTIERS D'ART
            </h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {skills.map((skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className="px-4 py-1.5 rounded-full text-xs font-serif italic border border-white/20 bg-white/[0.02] text-white/90 hover:border-white/50 transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Selected Monograph Works */}
        <section className="space-y-12">
          <div className="flex items-center justify-between border-b border-white/20 pb-4 text-xs font-mono uppercase tracking-[0.25em] text-white/60">
            <span>SELECTED MONOGRAPHS</span>
            <span>N&deg; 0{projects.length}</span>
          </div>

          {projects.length === 0 ? (
            <p className="text-sm font-serif italic text-white/40 py-6 text-center">Exhibitions forthcoming.</p>
          ) : (
            <div className="space-y-14">
              {projects.map((project, idx) => {
                const demo = safeUrl(project.demoUrl);
                const code = safeUrl(project.githubUrl);

                return (
                  <article key={project.id || idx} className="space-y-6 group">
                    {project.imageUrl && (
                      <div className="w-full h-64 sm:h-80 overflow-hidden border border-white/20 bg-black/60">
                        <img
                          src={project.imageUrl}
                          alt={project.name}
                          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition duration-700"
                        />
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                      <div>
                        <span className="font-mono text-xs text-white/40 block mb-1">
                          COLLECTION // 0{idx + 1}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif italic text-white">
                          {project.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-4 text-xs uppercase font-mono tracking-wider shrink-0">
                        {demo && (
                          <a
                            href={demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-white hover:underline"
                          >
                            <span>View Monograph</span>
                            <ArrowUpRight size={12} />
                          </a>
                        )}
                        {code && (
                          <a
                            href={code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-white/50 hover:text-white"
                          >
                            <span>Colophon</span>
                            <ArrowUpRight size={12} />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-white/70 leading-relaxed font-light max-w-2xl">
                      {project.description}
                    </p>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="pt-12 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between text-xs font-mono uppercase text-white/40 gap-4">
          <span>&copy; {new Date().getFullYear()} {name || "Luxe Atelier"}. Pure elegance.</span>
          <span>Crafted via PortfolioForge</span>
        </footer>
      </div>
    </div>
  );
};

export default LuxeTemplate;
