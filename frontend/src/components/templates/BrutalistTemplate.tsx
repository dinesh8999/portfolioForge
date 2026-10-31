import React from "react";
import { ArrowUpRight, Flame, Globe, Mail, Sparkles, Star } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/Icons";
import type { TemplateRenderProps } from "./types";
import { getInitials, safeUrl } from "../../utils/portfolio";
import { getTemplateTheme } from "../../data/templates";

export const BrutalistTemplate: React.FC<TemplateRenderProps> = ({
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
  const defaultTheme = getTemplateTheme("brutalist");
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
        {/* Loud Neo-Brutalist Marquee Header */}
        <header className="border-4 border-black p-8 sm:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white relative">
          {/* Floating Sticker */}
          <div
            className="absolute -top-5 right-6 px-4 py-1.5 border-2 border-black font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-3 flex items-center gap-1.5"
            style={{ backgroundColor: accent, color: "#000000" }}
          >
            <Flame size={14} />
            <span>NEO-BRUTAL &bull; RAW &amp; LOUD</span>
          </div>

          <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-10">
            <div className="space-y-5 max-w-2xl">
              <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-[0.95] text-black">
                {name || "Max Kowalski"}
              </h1>

              <div
                className="inline-block px-3 py-1 border-2 border-black font-black text-base uppercase tracking-tight shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                style={{ backgroundColor: accent, color: "#000000" }}
              >
                {role || "Creative Coder & Interface Rebel"}
              </div>

              <p className="text-base sm:text-lg font-bold leading-snug text-black/90 pt-1">
                {bio || "Rejecting cookie-cutter corporate flat design. Building loud, tactile, high-contrast digital experiences with physics and attitude."}
              </p>

              {/* Action Buttons with Hard Shadows */}
              <div className="flex flex-wrap gap-4 pt-3">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 px-6 py-3 border-3 border-black text-sm font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition"
                    style={{ backgroundColor: accent, color: "#000000" }}
                  >
                    <Mail size={16} />
                    <span>Holler At Me</span>
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 border-3 border-black bg-white text-sm font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition text-black"
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
                    className="inline-flex items-center gap-2 px-5 py-3 border-3 border-black bg-white text-sm font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition text-black"
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
                    className="inline-flex items-center gap-2 px-5 py-3 border-3 border-black bg-white text-sm font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition text-black"
                  >
                    <Globe size={16} />
                    <span>WWW</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Profile Avatar with Chunky Black Border */}
            <div className="shrink-0">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt={name}
                  className="w-40 h-40 sm:w-48 sm:h-48 object-cover border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-2 hover:rotate-0 transition duration-200"
                />
              ) : (
                <div
                  className="w-40 h-40 sm:w-48 sm:h-48 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-2 hover:rotate-0 transition duration-200 flex flex-col items-center justify-center font-black text-4xl p-2"
                  style={{ backgroundColor: accent, color: "#000000" }}
                >
                  <Star size={32} className="mb-1" />
                  <span>{getInitials(name)}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Chunky Skills Section */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-black flex items-center gap-2">
              <Sparkles size={16} />
              <span>THE ARSENAL &bull; SKILLS</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className="px-4 py-2 border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-white hover:bg-black hover:text-white transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Loud Projects Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-4 border-black pb-3">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
              Featured Disruptions
            </h2>
            <span
              className="text-xs font-black px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              style={{ backgroundColor: accent, color: "#000000" }}
            >
              {projects.length} PROJECTS
            </span>
          </div>

          {projects.length === 0 ? (
            <p className="text-sm font-bold opacity-60 italic py-6">Disruptions loading...</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-8">
              {projects.map((project, idx) => {
                const demo = safeUrl(project.demoUrl);
                const code = safeUrl(project.githubUrl);

                return (
                  <article
                    key={project.id || idx}
                    className="flex flex-col justify-between border-4 border-black bg-white p-6 sm:p-7 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition duration-200"
                  >
                    <div className="space-y-4">
                      {project.imageUrl && (
                        <div className="w-full h-48 border-3 border-black overflow-hidden bg-black/10">
                          <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="w-full h-full object-cover filter contrast-125"
                          />
                        </div>
                      )}

                      <h3 className="text-xl sm:text-2xl font-black uppercase text-black">
                        {project.name}
                      </h3>

                      <p className="text-sm font-bold opacity-85 leading-snug">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-6 mt-6 border-t-2 border-black text-xs font-black uppercase">
                      {demo && (
                        <a
                          href={demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition"
                          style={{ backgroundColor: accent, color: "#000000" }}
                        >
                          <span>Launch Live</span>
                          <ArrowUpRight size={14} />
                        </a>
                      )}
                      {code && (
                        <a
                          href={code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition text-black"
                        >
                          <span>View Code</span>
                          <ArrowUpRight size={14} />
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
        <footer className="pt-8 border-t-4 border-black flex flex-col sm:flex-row items-center justify-between text-xs font-black uppercase text-black gap-4">
          <span>&copy; {new Date().getFullYear()} {name || "Max"}. No apologies.</span>
          <span>Built with PortfolioForge</span>
        </footer>
      </div>
    </div>
  );
};

export default BrutalistTemplate;

