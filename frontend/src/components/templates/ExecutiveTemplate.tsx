import React from "react";
import { ArrowUpRight, Award, Briefcase, Globe, Mail, ShieldCheck } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/Icons";
import type { TemplateRenderProps } from "./types";
import { getInitials, safeUrl } from "../../utils/portfolio";
import { getTemplateTheme } from "../../data/templates";

export const ExecutiveTemplate: React.FC<TemplateRenderProps> = ({
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
  const defaultTheme = getTemplateTheme("executive");
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
        {/* Executive Hero Banner */}
        <header className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-12 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[130px] pointer-events-none opacity-20"
            style={{ backgroundColor: accent }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 justify-between">
            <div className="space-y-4 text-center md:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/15 bg-white/5">
                <ShieldCheck size={14} style={{ color: accent }} />
                <span>Executive Portfolio</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                {name || "Executive Name"}
              </h1>

              <p
                className="text-lg sm:text-xl font-medium tracking-wide"
                style={{ color: accent }}
              >
                {role || "Principal Software Architect"}
              </p>

              <p className="text-sm sm:text-base leading-relaxed opacity-75 max-w-xl">
                {bio || "Leading strategic engineering and digital transformation."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-4">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-black transition hover:opacity-90 shadow-lg"
                    style={{ backgroundColor: accent }}
                  >
                    <Mail size={16} />
                    <span>Contact Executive</span>
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium border border-white/15 bg-white/5 hover:bg-white/10 transition"
                  >
                    <LinkedinIcon size={16} />
                    <span>LinkedIn</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium border border-white/15 bg-white/5 hover:bg-white/10 transition"
                  >
                    <GithubIcon size={16} />
                    <span>GitHub</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium border border-white/15 bg-white/5 hover:bg-white/10 transition"
                  >
                    <Globe size={16} />
                    <span>Website</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Profile Avatar with Executive Frame */}
            <div className="shrink-0 relative">
              <div
                className="absolute -inset-1.5 rounded-2xl opacity-40 blur-sm"
                style={{ backgroundColor: accent }}
              />
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt={name}
                  className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl object-cover border-2 shadow-2xl"
                  style={{ borderColor: accent }}
                />
              ) : (
                <div
                  className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl flex items-center justify-center text-3xl font-bold border-2 shadow-2xl bg-slate-900"
                  style={{ borderColor: accent, color: accent }}
                >
                  {getInitials(name)}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Competencies & Expertise */}
        {skills.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <Award size={20} style={{ color: accent }} />
              <h2 className="text-xl font-bold tracking-tight">Areas of Expertise</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {skills.map((skill, idx) => (
                <div
                  key={`${skill}-${idx}`}
                  className="flex items-center gap-2 p-3 rounded-xl border border-white/10 bg-white/[0.02] text-sm font-medium hover:border-white/20 transition"
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                  <span className="truncate">{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Initiatives / Projects */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Briefcase size={20} style={{ color: accent }} />
              <h2 className="text-xl font-bold tracking-tight">Leadership & Initiatives</h2>
            </div>
            <span className="text-xs opacity-50 font-mono">
              {projects.length} {projects.length === 1 ? "Record" : "Records"}
            </span>
          </div>

          {projects.length === 0 ? (
            <p className="text-sm opacity-50 italic py-6">No initiatives added yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, idx) => {
                const demo = safeUrl(project.demoUrl);
                const code = safeUrl(project.githubUrl);

                return (
                  <article
                    key={project.id || idx}
                    className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/25 transition shadow-lg group"
                  >
                    <div className="space-y-4">
                      {project.imageUrl && (
                        <div className="w-full h-44 rounded-lg overflow-hidden border border-white/10">
                          <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                        </div>
                      )}

                      <h3 className="text-lg font-bold tracking-tight">
                        {project.name}
                      </h3>

                      <p className="text-sm opacity-70 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10 mt-6 text-xs font-semibold">
                      {demo && (
                        <a
                          href={demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 hover:underline"
                          style={{ color: accent }}
                        >
                          <span>Deployment URL</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                      {code && (
                        <a
                          href={code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 opacity-70 hover:opacity-100"
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

        {/* Executive Footer */}
        <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs opacity-50 gap-4">
          <span>&copy; {new Date().getFullYear()} {name || "Executive"}. Verified Portfolio.</span>
          <span>Crafted with PortfolioForge</span>
        </footer>
      </div>
    </div>
  );
};
