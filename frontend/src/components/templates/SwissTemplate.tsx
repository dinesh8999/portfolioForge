import React from "react";
import { ArrowUpRight, Globe, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/Icons";
import type { TemplateRenderProps } from "./types";
import { getInitials, safeUrl } from "../../utils/portfolio";
import { getTemplateTheme } from "../../data/templates";

export const SwissTemplate: React.FC<TemplateRenderProps> = ({
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
  const defaultTheme = getTemplateTheme("swiss");
  const accent = style.accentColor || defaultTheme.accentColor;
  const bg = style.backgroundColor || defaultTheme.backgroundColor;
  const text = style.textColor || defaultTheme.textColor;

  const github = safeUrl(githubUrl);
  const linkedin = safeUrl(linkedinUrl);
  const website = safeUrl(websiteUrl);

  return (
    <div
      className="min-h-full w-full py-16 px-6 sm:px-12 md:px-20 selection:bg-red-600 selection:text-white"
      style={{
        backgroundColor: bg,
        color: text,
        fontFamily: style.fontFamily || defaultTheme.fontFamily,
      }}
    >
      <div className="mx-auto max-w-5xl space-y-20">
        {/* Strict Swiss International Masthead */}
        <header className="space-y-12">
          {/* Top Swiss Cross & Colophon Line */}
          <div className="flex items-center justify-between border-b-2 border-black pb-4 text-xs font-mono tracking-widest uppercase">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center h-5 w-5 bg-red-600 text-white font-black text-xs">
                +
              </span>
              <span className="font-bold">SWISS INTERNATIONAL &bull; GRID, RHYTHM, PRECISION</span>
            </div>
            <span className="hidden sm:inline font-mono">CH-8001 ZÜRICH</span>
          </div>

          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-8 space-y-6">
              <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase block" style={{ color: accent }}>
                [ 01 // IDENTITY ]
              </span>

              <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-black">
                {name || "Hans Mueller"}
              </h1>

              <p className="text-2xl font-bold tracking-tight" style={{ color: accent }}>
                {role || "Design Systems & Typographic Architect"}
              </p>

              <p className="text-base text-neutral-800 leading-relaxed max-w-xl font-normal">
                {bio || "Adhering to the Josef Müller-Brockmann tradition. Strict modular grid structures, mathematical rhythm, and timeless typographic hierarchy."}
              </p>

              {/* Minimal Swiss Links */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-bold uppercase tracking-wider">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white hover:bg-red-600 transition"
                  >
                    <Mail size={14} />
                    <span>Inquiries</span>
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-red-600 transition underline underline-offset-4"
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
                    className="inline-flex items-center gap-1 hover:text-red-600 transition underline underline-offset-4"
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
                    className="inline-flex items-center gap-1 hover:text-red-600 transition underline underline-offset-4"
                  >
                    <Globe size={14} />
                    <span>Index</span>
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
            </div>

            {/* Swiss Monochromatic Photo Frame */}
            <div className="md:col-span-4 flex justify-end">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt={name}
                  className="w-44 h-44 sm:w-56 sm:h-56 object-cover border-2 border-black filter grayscale contrast-125 bg-neutral-100"
                />
              ) : (
                <div
                  className="w-44 h-44 sm:w-56 sm:h-56 border-2 border-black flex flex-col justify-between p-4 bg-neutral-100 text-black"
                >
                  <span className="font-mono text-xs font-bold">[FIGURE_01]</span>
                  <span className="text-4xl font-black">{getInitials(name)}</span>
                  <div className="h-1 w-8 bg-red-600" />
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Swiss Strict Skills Grid */}
        {skills.length > 0 && (
          <section className="space-y-4 border-t-2 border-black pt-8">
            <div className="flex items-center justify-between text-xs font-mono font-bold tracking-widest uppercase">
              <span>[ 02 // DISCIPLINES ]</span>
              <span>STANDARDS</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
              {skills.map((skill, idx) => (
                <div
                  key={`${skill}-${idx}`}
                  className="p-3 border-l-2 border-black bg-neutral-50 text-xs font-bold uppercase tracking-tight flex items-center justify-between"
                >
                  <span>{skill}</span>
                  <span className="font-mono text-[10px] text-neutral-400">0{idx + 1}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Structured Projects Grid */}
        <section className="space-y-8 border-t-2 border-black pt-8">
          <div className="flex items-center justify-between text-xs font-mono font-bold tracking-widest uppercase">
            <span>[ 03 // WORKS INDEX ]</span>
            <span>TOTAL: {projects.length}</span>
          </div>

          {projects.length === 0 ? (
            <p className="text-sm opacity-50 italic py-6">Index pending entry.</p>
          ) : (
            <div className="divide-y-2 divide-black border-y-2 border-black">
              {projects.map((project, idx) => {
                const demo = safeUrl(project.demoUrl);
                const code = safeUrl(project.githubUrl);

                return (
                  <article
                    key={project.id || idx}
                    className="py-8 grid md:grid-cols-12 gap-8 items-start group hover:bg-neutral-50/80 transition"
                  >
                    <div className="md:col-span-2 font-mono text-3xl font-black text-neutral-300 group-hover:text-red-600 transition">
                      0{idx + 1}
                    </div>

                    <div className="md:col-span-6 space-y-3">
                      <h3 className="text-2xl font-black uppercase tracking-tight text-black group-hover:text-red-600 transition">
                        {project.name}
                      </h3>
                      <p className="text-sm text-neutral-700 leading-relaxed font-normal">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-4 pt-2 text-xs font-bold uppercase font-mono">
                        {demo && (
                          <a
                            href={demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-red-600 hover:underline"
                          >
                            <span>Launch Live</span>
                            <ArrowUpRight size={13} />
                          </a>
                        )}
                        {code && (
                          <a
                            href={code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-black hover:underline"
                          >
                            <span>Source Code</span>
                            <ArrowUpRight size={13} />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-4">
                      {project.imageUrl && (
                        <div className="w-full h-36 overflow-hidden border border-black bg-neutral-100">
                          <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="w-full h-full object-cover filter grayscale contrast-125 group-hover:filter-none transition duration-300"
                          />
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="pt-10 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between text-xs font-mono uppercase text-neutral-600 gap-4">
          <span>&copy; {new Date().getFullYear()} {name || "Swiss"}. Mathematical order.</span>
          <span>Published with PortfolioForge</span>
        </footer>
      </div>
    </div>
  );
};

export default SwissTemplate;
