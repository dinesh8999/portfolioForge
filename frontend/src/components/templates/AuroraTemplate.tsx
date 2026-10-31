import React from "react";
import { ArrowUpRight, Atom, Globe, Mail, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/Icons";
import type { TemplateRenderProps } from "./types";
import { getInitials, safeUrl } from "../../utils/portfolio";
import { getTemplateTheme } from "../../data/templates";

export const AuroraTemplate: React.FC<TemplateRenderProps> = ({
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
  const defaultTheme = getTemplateTheme("aurora");
  const accent = style.accentColor || defaultTheme.accentColor;
  const bg = style.backgroundColor || defaultTheme.backgroundColor;
  const text = style.textColor || defaultTheme.textColor;

  const github = safeUrl(githubUrl);
  const linkedin = safeUrl(linkedinUrl);
  const website = safeUrl(websiteUrl);

  return (
    <div
      className="min-h-full w-full py-16 px-6 sm:px-12 md:px-20 relative overflow-hidden"
      style={{
        backgroundColor: bg,
        color: text,
        fontFamily: style.fontFamily || defaultTheme.fontFamily,
      }}
    >
      {/* Radiant Multi-Stop Aurora Mesh Orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-purple-600/25 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 w-[500px] h-96 rounded-full bg-indigo-500/15 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-5xl space-y-20">
        {/* Luminous Glass Hero Card */}
        <header className="rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-2xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
            <div className="space-y-5 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border border-white/20 bg-white/5 backdrop-blur-md">
                <Sparkles size={14} className="text-cyan-400" />
                <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-purple-300 bg-clip-text text-transparent">
                  AURORA SPECTRUM &bull; BEYOND THE HORIZON
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                {name || "Sophia Lin"}
              </h1>

              <p
                className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              >
                {role || "AI Interaction & ML Researcher"}
              </p>

              <p className="text-sm sm:text-base text-slate-300/85 leading-relaxed font-normal">
                {bio || "Pioneering fluid human-AI interfaces, multimodal generative models, and luminous spatial interaction paradigms."}
              </p>

              {/* Action Badges */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white shadow-xl transition hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${accent}, #8b5cf6)`,
                    }}
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
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border border-white/20 bg-white/5 hover:bg-white/10 transition backdrop-blur-md"
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
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border border-white/20 bg-white/5 hover:bg-white/10 transition backdrop-blur-md"
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
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium border border-white/20 bg-white/5 hover:bg-white/10 transition backdrop-blur-md"
                  >
                    <Globe size={16} />
                    <span>Website</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Profile Avatar with Aurora Halo */}
            <div className="relative shrink-0">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 blur-xl opacity-60 animate-pulse" />
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt={name}
                  className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover border-2 border-white/40 shadow-2xl"
                />
              ) : (
                <div
                  className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-white/40 flex items-center justify-center text-3xl font-bold bg-white/10 backdrop-blur-xl text-white shadow-2xl"
                >
                  {getInitials(name)}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Luminous Skills Section */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-slate-400">
              <Atom size={16} className="text-cyan-400" />
              <span>CORE CAPABILITIES &bull; MULTIMODAL SYSTEMS</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className="px-4 py-2 rounded-full text-xs font-medium border border-white/15 bg-white/[0.05] hover:bg-white/10 transition backdrop-blur-md text-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Frosted Glass Projects Grid */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/15 pb-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Selected Research &amp; Projects
            </h2>
            <span className="text-xs px-3 py-1 rounded-full border border-white/20 bg-white/5 text-cyan-300 font-mono">
              {projects.length} Repos
            </span>
          </div>

          {projects.length === 0 ? (
            <p className="text-sm text-slate-400 italic py-6">Research in progress.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-8">
              {projects.map((project, idx) => {
                const demo = safeUrl(project.demoUrl);
                const code = safeUrl(project.githubUrl);

                return (
                  <article
                    key={project.id || idx}
                    className="flex flex-col justify-between rounded-3xl border border-white/15 bg-white/[0.04] p-7 shadow-xl hover:bg-white/[0.07] transition duration-300 backdrop-blur-xl group"
                  >
                    <div className="space-y-4">
                      {project.imageUrl && (
                        <div className="w-full h-44 rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                          <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                        </div>
                      )}

                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">
                        {project.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed font-normal">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-6 mt-6 border-t border-white/10 text-xs font-semibold">
                      {demo && (
                        <a
                          href={demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-white transition"
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
                          className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition"
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
        </section>

        {/* Footer */}
        <footer className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <span>&copy; {new Date().getFullYear()} {name || "Sophia"}. Boundless exploration.</span>
          <span>Crafted with PortfolioForge</span>
        </footer>
      </div>
    </div>
  );
};

export default AuroraTemplate;

