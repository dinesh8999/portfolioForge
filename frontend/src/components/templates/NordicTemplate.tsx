import React from "react";
import { ArrowUpRight, Globe, Mail, Mountain } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/Icons";
import type { TemplateRenderProps } from "./types";
import { getInitials, safeUrl } from "../../utils/portfolio";
import { getTemplateTheme } from "../../data/templates";

export const NordicTemplate: React.FC<TemplateRenderProps> = ({
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
  const defaultTheme = getTemplateTheme("nordic");
  const accent = style.accentColor || defaultTheme.accentColor;
  const bg = style.backgroundColor || defaultTheme.backgroundColor;
  const text = style.textColor || defaultTheme.textColor;

  const github = safeUrl(githubUrl);
  const linkedin = safeUrl(linkedinUrl);
  const website = safeUrl(websiteUrl);

  return (
    <div
      className="min-h-full w-full py-20 px-6 sm:px-12 md:px-20 selection:bg-sky-200"
      style={{
        backgroundColor: bg,
        color: text,
        fontFamily: style.fontFamily || defaultTheme.fontFamily,
      }}
    >
      <div className="mx-auto max-w-4xl space-y-24">
        {/* Serene Nordic Header */}
        <header className="space-y-10">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-6 text-xs font-mono uppercase tracking-[0.25em] text-slate-500">
            <div className="flex items-center gap-2">
              <Mountain size={14} style={{ color: accent }} />
              <span>NORDIC ARCHITECTURE &bull; SIMPLICITY IN FORM</span>
            </div>
            <span>STOCKHOLM / OSLO</span>
          </div>

          <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-12">
            <div className="space-y-6 max-w-xl">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-slate-900 leading-[1.05]">
                {name || "Erik Lindqvist"}
              </h1>

              <div className="h-0.5 w-16" style={{ backgroundColor: accent }} />

              <p className="text-xl font-medium" style={{ color: accent }}>
                {role || "Architectural Software Engineer"}
              </p>

              <p className="text-base text-slate-600 leading-relaxed font-normal">
                {bio || "Scandinavian design principles applied to distributed software. Uncompromising clarity, calm interfaces, and functional elegance."}
              </p>

              {/* Minimal Social Links */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-medium text-slate-600">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-semibold shadow-sm transition hover:opacity-90"
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
                    className="inline-flex items-center gap-1 hover:text-slate-900 transition"
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
                    className="inline-flex items-center gap-1 hover:text-slate-900 transition"
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
                    className="inline-flex items-center gap-1 hover:text-slate-900 transition"
                  >
                    <Globe size={14} />
                    <span>Website</span>
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
            </div>

            {/* Profile Avatar with Muted Frame */}
            <div className="shrink-0">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt={name}
                  className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl object-cover shadow-sm border border-slate-200 bg-white"
                />
              ) : (
                <div
                  className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl flex items-center justify-center text-3xl font-light border border-slate-200 bg-slate-100/80 text-slate-600 shadow-sm"
                >
                  {getInitials(name)}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Quiet Skills Section */}
        {skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs uppercase tracking-[0.25em] font-medium text-slate-500">
              DISCIPLINE &amp; TOOLING
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200/80 bg-white/80 text-slate-700 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Curated Projects Section */}
        <section className="space-y-10">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
            <h2 className="text-2xl font-light tracking-tight text-slate-900">
              Selected Works
            </h2>
            <span className="text-xs font-mono text-slate-500">
              0{projects.length} CASE STUDIES
            </span>
          </div>

          {projects.length === 0 ? (
            <p className="text-sm text-slate-400 italic py-6">Works in progress.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-8">
              {projects.map((project, idx) => {
                const demo = safeUrl(project.demoUrl);
                const code = safeUrl(project.githubUrl);

                return (
                  <article
                    key={project.id || idx}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200/70 bg-white p-7 shadow-sm hover:shadow-md transition duration-300 group"
                  >
                    <div className="space-y-4">
                      {project.imageUrl && (
                        <div className="w-full h-44 rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                          <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                        </div>
                      )}

                      <h3 className="text-lg font-medium text-slate-900 group-hover:text-sky-700 transition">
                        {project.name}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-6 mt-6 border-t border-slate-100 text-xs font-medium">
                      {demo && (
                        <a
                          href={demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sky-700 hover:text-sky-900 transition font-semibold"
                        >
                          <span>Explore System</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                      {code && (
                        <a
                          href={code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 transition"
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

        {/* Minimal Footer */}
        <footer className="pt-12 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 font-mono">
          <span>&copy; {new Date().getFullYear()} {name || "Nordic"}. Form follows function.</span>
          <span>Designed with PortfolioForge</span>
        </footer>
      </div>
    </div>
  );
};

export default NordicTemplate;
