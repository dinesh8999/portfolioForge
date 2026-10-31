import React from "react";
import { ArrowUpRight, BookOpen, Globe, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/Icons";
import type { TemplateRenderProps } from "./types";
import { getInitials, safeUrl } from "../../utils/portfolio";
import { getTemplateTheme } from "../../data/templates";

export const EditorialTemplate: React.FC<TemplateRenderProps> = ({
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
  const defaultTheme = getTemplateTheme("editorial");
  const accent = style.accentColor || defaultTheme.accentColor;
  const bg = style.backgroundColor || defaultTheme.backgroundColor;
  const text = style.textColor || defaultTheme.textColor;

  const github = safeUrl(githubUrl);
  const linkedin = safeUrl(linkedinUrl);
  const website = safeUrl(websiteUrl);

  return (
    <div
      className="min-h-full w-full py-16 px-6 sm:px-12 md:px-20"
      style={{
        backgroundColor: bg,
        color: text,
        fontFamily: style.fontFamily || defaultTheme.fontFamily,
      }}
    >
      <div className="mx-auto max-w-4xl space-y-16">
        {/* Magazine Editorial Masthead */}
        <header className="border-b-2 border-current pb-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-current/20 pb-4 text-xs tracking-[0.25em] uppercase font-sans">
            <span className="flex items-center gap-2">
              <BookOpen size={14} />
              <span>THE ARCHIVES &bull; VOLUME I</span>
            </span>
            <span>EDITION {new Date().getFullYear()}</span>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <span
                className="text-xs uppercase tracking-[0.3em] font-sans font-semibold"
                style={{ color: accent }}
              >
                {role || "Writer & Engineer"}
              </span>

              <h1 className="text-4xl sm:text-6xl font-normal italic tracking-tight leading-[1.05]">
                {name || "Your Name"}
              </h1>

              <p className="text-base sm:text-lg leading-relaxed opacity-85 font-light pt-2">
                {bio || "A curated retrospective of thoughts, technical explorations, and craftsmanship."}
              </p>

              {/* Editorial Contact Row */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-sans tracking-wider uppercase">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 font-semibold underline underline-offset-4 hover:opacity-75 transition"
                    style={{ color: accent }}
                  >
                    <Mail size={15} />
                    <span>Inquiries</span>
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 opacity-70 hover:opacity-100 transition"
                  >
                    <GithubIcon size={15} />
                    <span>GitHub</span>
                    <ArrowUpRight size={12} />
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 opacity-70 hover:opacity-100 transition"
                  >
                    <LinkedinIcon size={15} />
                    <span>LinkedIn</span>
                    <ArrowUpRight size={12} />
                  </a>
                )}
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 opacity-70 hover:opacity-100 transition"
                  >
                    <Globe size={15} />
                    <span>Folio</span>
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
            </div>

            {/* Profile Photo as Magazine Portrait */}
            <div className="md:col-span-4 flex justify-center md:justify-end">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt={name}
                  className="w-40 h-52 sm:w-44 sm:h-56 object-cover rounded-none border border-current shadow-lg grayscale hover:grayscale-0 transition duration-500"
                />
              ) : (
                <div
                  className="w-40 h-52 sm:w-44 sm:h-56 flex items-center justify-center text-3xl italic border border-current shadow-lg"
                  style={{ backgroundColor: `${accent}15`, color: accent }}
                >
                  {getInitials(name)}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Competencies */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs uppercase tracking-[0.25em] font-sans font-semibold opacity-60">
              Disciplinary Focus
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className="px-3 py-1 text-xs font-sans border-b border-current/30 hover:border-current transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Selected Works Catalogue */}
        <section className="space-y-8">
          <div className="flex items-end justify-between border-b border-current/20 pb-3">
            <h2 className="text-2xl sm:text-3xl italic font-normal">
              Featured Expositions
            </h2>
            <span className="text-xs font-sans uppercase tracking-widest opacity-60">
              No. 01 &mdash; {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          {projects.length === 0 ? (
            <p className="text-sm opacity-50 italic py-6">Works in compilation.</p>
          ) : (
            <div className="divide-y divide-current/20">
              {projects.map((project, idx) => {
                const demo = safeUrl(project.demoUrl);
                const code = safeUrl(project.githubUrl);

                return (
                  <article
                    key={project.id || idx}
                    className="py-10 first:pt-4 last:pb-4 grid md:grid-cols-12 gap-8 items-start"
                  >
                    <div className="md:col-span-8 space-y-3">
                      <span className="text-xs font-sans tracking-widest opacity-50 uppercase">
                        ENTRY #{String(idx + 1).padStart(2, "0")}
                      </span>

                      <h3 className="text-2xl font-normal italic tracking-tight">
                        {project.name}
                      </h3>

                      <p className="text-sm sm:text-base leading-relaxed opacity-80 font-light">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-5 pt-3 text-xs font-sans tracking-wider uppercase">
                        {demo && (
                          <a
                            href={demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 underline underline-offset-4 hover:opacity-75"
                            style={{ color: accent }}
                          >
                            <span>View Exhibit</span>
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
                            <span>Source Material</span>
                            <ArrowUpRight size={13} />
                          </a>
                        )}
                      </div>
                    </div>

                    {project.imageUrl && (
                      <div className="md:col-span-4 border border-current/20 p-1 bg-white/40">
                        <img
                          src={project.imageUrl}
                          alt={project.name}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Editorial Colophon / Footer */}
        <footer className="pt-12 border-t-2 border-current flex flex-col sm:flex-row items-center justify-between text-xs font-sans opacity-60 tracking-wider uppercase gap-4">
          <span>&copy; {new Date().getFullYear()} {name || "Author"}. Colophon &bull; All Rights Reserved.</span>
          <span>Printed with PortfolioForge</span>
        </footer>
      </div>
    </div>
  );
};
