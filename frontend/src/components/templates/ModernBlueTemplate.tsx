import React from "react";
import { ArrowUpRight, CheckCircle2, Code2, Globe, Layers, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/Icons";
import type { TemplateRenderProps } from "./types";
import { getInitials, safeUrl } from "../../utils/portfolio";
import { getTemplateTheme } from "../../data/templates";

export const ModernBlueTemplate: React.FC<TemplateRenderProps> = ({
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
  const defaultTheme = getTemplateTheme("modern-blue");
  const accent = style.accentColor || defaultTheme.accentColor;
  const bg = style.backgroundColor || defaultTheme.backgroundColor;
  const text = style.textColor || defaultTheme.textColor;

  const github = safeUrl(githubUrl);
  const linkedin = safeUrl(linkedinUrl);
  const website = safeUrl(websiteUrl);

  return (
    <div
      className="min-h-full w-full py-14 px-6 sm:px-10 md:px-16"
      style={{
        backgroundColor: bg,
        color: text,
        fontFamily: style.fontFamily || defaultTheme.fontFamily,
      }}
    >
      <div className="mx-auto max-w-5xl space-y-16">
        {/* Modern Engineering Header Card */}
        <header className="rounded-2xl border border-blue-200/80 bg-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-100/60 to-transparent rounded-bl-full pointer-events-none" />

          <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                <Code2 size={13} />
                <span>Modern Software Engineering</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
                {name || "Your Name"}
              </h1>

              <p
                className="text-lg sm:text-xl font-bold"
                style={{ color: accent }}
              >
                {role || "Senior Full-Stack Engineer"}
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {bio || "Building robust, scalable distributed applications and performant web interfaces with clean architectures."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md transition hover:opacity-90"
                    style={{ backgroundColor: accent }}
                  >
                    <Mail size={16} />
                    <span>Contact Me</span>
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 transition"
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
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 transition"
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
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 transition"
                  >
                    <Globe size={16} />
                    <span>Website</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Profile Avatar with Tech Border */}
            <div className="shrink-0">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt={name}
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl object-cover border-4 border-white shadow-2xl ring-4 ring-blue-100"
                />
              ) : (
                <div
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl flex items-center justify-center text-3xl font-extrabold bg-blue-50 border-4 border-white shadow-2xl ring-4 ring-blue-100"
                  style={{ color: accent }}
                >
                  {getInitials(name)}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Skills Tag Cloud */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Layers size={16} style={{ color: accent }} />
              <h2 className="text-xs uppercase tracking-widest font-bold opacity-60">
                Technical Stack &amp; Skills
              </h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-blue-100 bg-white text-slate-700 shadow-sm flex items-center gap-1.5"
                >
                  <CheckCircle2 size={12} className="text-blue-500" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Featured Projects Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Featured Engineering Projects
            </h2>
            <span
              className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800"
            >
              {projects.length} Repositories
            </span>
          </div>

          {projects.length === 0 ? (
            <p className="text-sm text-slate-400 italic py-6">No projects listed yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {projects.map((project, idx) => {
                const demo = safeUrl(project.demoUrl);
                const code = safeUrl(project.githubUrl);

                return (
                  <article
                    key={project.id || idx}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:shadow-md transition duration-300 group"
                  >
                    <div className="space-y-3">
                      {project.imageUrl && (
                        <div className="w-full h-44 rounded-xl overflow-hidden border border-slate-100 bg-slate-100">
                          <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                        </div>
                      )}

                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                        {project.name}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2.5 pt-5 mt-5 border-t border-slate-100 text-xs font-semibold">
                      {demo && (
                        <a
                          href={demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-white transition hover:opacity-90 shadow-sm"
                          style={{ backgroundColor: accent }}
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight size={12} />
                        </a>
                      )}
                      {code && (
                        <a
                          href={code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 transition"
                        >
                          <span>Source</span>
                          <ArrowUpRight size={12} />
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
        <footer className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <span>&copy; {new Date().getFullYear()} {name || "Developer"}. Engineered with pride.</span>
          <span>Powered by PortfolioForge</span>
        </footer>
      </div>
    </div>
  );
};
