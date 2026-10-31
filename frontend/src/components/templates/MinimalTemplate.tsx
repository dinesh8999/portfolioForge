import React from "react";
import { ArrowUpRight, Globe, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/Icons";
import type { TemplateRenderProps } from "./types";
import { getInitials, safeUrl } from "../../utils/portfolio";
import { getTemplateTheme } from "../../data/templates";

export const MinimalTemplate: React.FC<TemplateRenderProps> = ({
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
  const defaultTheme = getTemplateTheme("minimal");
  const accent = style.accentColor || defaultTheme.accentColor;
  const bg = style.backgroundColor || defaultTheme.backgroundColor;
  const text = style.textColor || defaultTheme.textColor;

  const github = safeUrl(githubUrl);
  const linkedin = safeUrl(linkedinUrl);
  const website = safeUrl(websiteUrl);

  return (
    <div
      className="min-h-full w-full py-12 px-6 sm:px-12 md:px-16"
      style={{
        backgroundColor: bg,
        color: text,
        fontFamily: style.fontFamily || defaultTheme.fontFamily,
      }}
    >
      <div className="mx-auto max-w-4xl space-y-16">
        {/* Header */}
        <header className="flex flex-col-reverse md:flex-row items-start justify-between gap-8 pb-12 border-b border-black/10 dark:border-white/10">
          <div className="space-y-4 max-w-2xl">
            <span
              className="text-xs uppercase tracking-[0.25em] font-medium opacity-60"
              style={{ color: accent }}
            >
              Minimalist &bull; {role || "Developer & Creator"}
            </span>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight">
              {name || "Your Name"}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed opacity-75 font-normal max-w-xl">
              {bio || "Welcome to my portfolio."}
            </p>

            {/* Social & Contact */}
            <div className="flex flex-wrap items-center gap-4 pt-3 text-sm">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 underline underline-offset-4 hover:opacity-80 transition"
                  style={{ color: accent }}
                >
                  <Mail size={16} />
                  <span>{email}</span>
                </a>
              )}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 opacity-70 hover:opacity-100 transition"
                >
                  <GithubIcon size={16} />
                  <span>GitHub</span>
                  <ArrowUpRight size={13} />
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 opacity-70 hover:opacity-100 transition"
                >
                  <LinkedinIcon size={16} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={13} />
                </a>
              )}
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 opacity-70 hover:opacity-100 transition"
                >
                  <Globe size={16} />
                  <span>Website</span>
                  <ArrowUpRight size={13} />
                </a>
              )}
            </div>
          </div>

          {/* Profile Photo */}
          <div className="shrink-0">
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt={name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border border-black/10 dark:border-white/10"
              />
            ) : (
              <div
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-xl font-light border border-black/15 dark:border-white/15"
                style={{ backgroundColor: `${accent}15`, color: accent }}
              >
                {getInitials(name)}
              </div>
            )}
          </div>
        </header>

        {/* Skills */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs uppercase tracking-[0.2em] font-medium opacity-50">
              Core Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className="px-3 py-1 rounded text-xs tracking-wide border border-black/10 dark:border-white/15 opacity-85"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        <section className="space-y-8">
          <h2 className="text-xs uppercase tracking-[0.2em] font-medium opacity-50">
            Selected Work
          </h2>

          {projects.length === 0 ? (
            <p className="text-sm opacity-50 italic py-6">No projects listed yet.</p>
          ) : (
            <div className="divide-y divide-black/10 dark:divide-white/10">
              {projects.map((project, idx) => {
                const demo = safeUrl(project.demoUrl);
                const code = safeUrl(project.githubUrl);

                return (
                  <article
                    key={project.id || idx}
                    className="py-8 first:pt-0 last:pb-0 flex flex-col md:flex-row gap-6 md:items-start justify-between"
                  >
                    <div className="space-y-2 max-w-xl">
                      <h3 className="text-xl font-medium tracking-tight">
                        {project.name}
                      </h3>
                      <p className="text-sm leading-relaxed opacity-70">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-4 pt-2 text-xs">
                        {demo && (
                          <a
                            href={demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-medium underline underline-offset-4 hover:opacity-80"
                            style={{ color: accent }}
                          >
                            <span>Live Demo</span>
                            <ArrowUpRight size={13} />
                          </a>
                        )}
                        {code && (
                          <a
                            href={code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 opacity-70 hover:opacity-100"
                          >
                            <span>Source Code</span>
                            <ArrowUpRight size={13} />
                          </a>
                        )}
                      </div>
                    </div>

                    {project.imageUrl && (
                      <div className="md:w-56 shrink-0 overflow-hidden rounded border border-black/10 dark:border-white/10">
                        <img
                          src={project.imageUrl}
                          alt={project.name}
                          className="w-full h-36 object-cover"
                        />
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="pt-12 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs opacity-50 gap-4">
          <span>&copy; {new Date().getFullYear()} {name || "Portfolio"}. All rights reserved.</span>
          <span>Designed with PortfolioForge</span>
        </footer>
      </div>
    </div>
  );
};
