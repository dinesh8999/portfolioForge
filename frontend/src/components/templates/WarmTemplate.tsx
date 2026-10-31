import React from "react";
import { ArrowUpRight, Coffee, Globe, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/Icons";
import type { TemplateRenderProps } from "./types";
import { getInitials, safeUrl } from "../../utils/portfolio";
import { getTemplateTheme } from "../../data/templates";

export const WarmTemplate: React.FC<TemplateRenderProps> = ({
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
  const defaultTheme = getTemplateTheme("warm");
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
      <div className="mx-auto max-w-4xl space-y-16">
        {/* Warm Studio Hero Card */}
        <header className="rounded-3xl border border-current/15 bg-white/75 backdrop-blur-sm p-8 sm:p-12 relative shadow-lg">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-current/20 bg-white"
                style={{ color: accent }}
              >
                <Coffee size={14} />
                <span>Warm Studio Folio &bull; Make It Memorable</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                {name || "Your Name"}
              </h1>

              <p
                className="text-lg sm:text-xl font-bold"
                style={{ color: accent }}
              >
                {role || "Warm Artisan & Product Crafter"}
              </p>

              <p className="text-sm sm:text-base leading-relaxed opacity-90 font-normal">
                {bio || "Creating friendly, delightful digital products with heart, warmth, and attention to craft."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white transition hover:opacity-90 shadow-md"
                    style={{ backgroundColor: accent }}
                  >
                    <Mail size={16} />
                    <span>Say Hello</span>
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold border border-current/20 bg-white hover:bg-black/5 transition"
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
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold border border-current/20 bg-white hover:bg-black/5 transition"
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
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold border border-current/20 bg-white hover:bg-black/5 transition"
                  >
                    <Globe size={16} />
                    <span>Website</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Profile Avatar with Soft Curved Radius */}
            <div className="shrink-0">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt={name}
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl object-cover border-4 border-white shadow-xl ring-2 ring-black/10 bg-white"
                />
              ) : (
                <div
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl flex items-center justify-center text-3xl font-bold bg-white/90 border-4 border-white shadow-xl"
                  style={{ color: accent }}
                >
                  {getInitials(name)}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Warm Skills Pill Grid */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest font-bold opacity-70">
              Capabilities & Craft
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className="px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold border border-current/15 bg-white/60 hover:bg-white transition shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects Gallery */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-current/15 pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Selected Works
            </h2>
            <span
              className="text-xs font-bold px-3 py-1 rounded-full border border-current/20 bg-white/50"
              style={{ color: accent }}
            >
              {projects.length} Projects
            </span>
          </div>

          {projects.length === 0 ? (
            <p className="text-sm opacity-60 italic py-6">Projects coming soon.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-8">
              {projects.map((project, idx) => {
                const demo = safeUrl(project.demoUrl);
                const code = safeUrl(project.githubUrl);

                return (
                  <article
                    key={project.id || idx}
                    className="flex flex-col justify-between rounded-3xl border border-current/15 bg-white/80 p-6 sm:p-7 shadow-lg hover:shadow-xl transition duration-300 group"
                  >
                    <div className="space-y-4">
                      {project.imageUrl && (
                        <div className="w-full h-48 rounded-2xl overflow-hidden border border-current/10 bg-black/5">
                          <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                        </div>
                      )}

                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                        {project.name}
                      </h3>

                      <p className="text-sm opacity-85 leading-relaxed font-normal">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-6 mt-6 border-t border-current/10 text-xs font-semibold">
                      {demo && (
                        <a
                          href={demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white hover:opacity-90 transition shadow-sm"
                          style={{ backgroundColor: accent }}
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
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-current/20 bg-white hover:bg-black/5 transition"
                        >
                          <span>GitHub</span>
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
        <footer className="pt-8 border-t border-current/15 flex flex-col sm:flex-row items-center justify-between text-xs opacity-70 gap-4">
          <span>&copy; {new Date().getFullYear()} {name || "Warm Studio"}. Made with care.</span>
          <span>Crafted with PortfolioForge</span>
        </footer>
      </div>
    </div>
  );
};
