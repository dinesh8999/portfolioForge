import React from "react";
import { ArrowUpRight, BookMarked, FileText, Globe, GraduationCap, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/Icons";
import type { TemplateRenderProps } from "./types";
import { getInitials, safeUrl } from "../../utils/portfolio";
import { getTemplateTheme } from "../../data/templates";

export const AcademicTemplate: React.FC<TemplateRenderProps> = ({
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
  const defaultTheme = getTemplateTheme("academic");
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
        {/* Formal Academic CV Masthead */}
        <header className="border-b-2 border-slate-300 pb-10 space-y-6">
          <div className="flex items-center justify-between text-xs tracking-widest uppercase font-sans text-slate-500 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <GraduationCap size={15} style={{ color: accent }} />
              <span>ACADEMIC CURRICULUM VITAE &bull; RESEARCH &amp; DISCOVERY</span>
            </div>
            <span>EST. {new Date().getFullYear()}</span>
          </div>

          <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-8 pt-2">
            <div className="space-y-4 max-w-xl">
              <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-slate-900 leading-tight">
                {name || "Dr. Aris Thorne"}
              </h1>

              <p className="text-lg font-sans font-semibold tracking-wide" style={{ color: accent }}>
                {role || "Senior AI Researcher & Data Scientist"}
              </p>

              <p className="text-base text-slate-700 leading-relaxed font-serif pt-1">
                {bio || "Postdoctoral fellow exploring causal inference, probabilistic graphical models, and neural algorithmic reasoning with 20+ peer-reviewed papers."}
              </p>

              {/* Scholar Contact Lines */}
              <div className="flex flex-wrap items-center gap-5 pt-3 text-xs font-sans">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-1.5 font-semibold text-slate-900 underline underline-offset-4 hover:opacity-75 transition"
                  >
                    <Mail size={14} style={{ color: accent }} />
                    <span>{email}</span>
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 transition"
                  >
                    <GithubIcon size={14} />
                    <span>Lab Code</span>
                    <ArrowUpRight size={11} />
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 transition"
                  >
                    <LinkedinIcon size={14} />
                    <span>Academic Network</span>
                    <ArrowUpRight size={11} />
                  </a>
                )}
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 transition"
                  >
                    <Globe size={14} />
                    <span>Laboratory</span>
                    <ArrowUpRight size={11} />
                  </a>
                )}
              </div>
            </div>

            {/* Academic Headshot Frame */}
            <div className="shrink-0">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt={name}
                  className="w-36 h-36 sm:w-44 sm:h-44 object-cover border-4 border-white shadow-md ring-1 ring-slate-300"
                />
              ) : (
                <div
                  className="w-36 h-36 sm:w-44 sm:h-44 flex flex-col items-center justify-center border-4 border-white shadow-md ring-1 ring-slate-300 bg-slate-100 text-slate-800"
                >
                  <BookMarked size={28} className="mb-1" style={{ color: accent }} />
                  <span className="font-serif text-2xl font-bold">{getInitials(name)}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Areas of Expertise / Skills */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-slate-500">
              RESEARCH FIELDS &amp; METHODOLOGY
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className="px-3 py-1.5 rounded text-xs font-sans font-medium border border-slate-300 bg-white text-slate-800 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Publications & Projects List */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-300 pb-3">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              Peer-Reviewed Publications &amp; Software
            </h2>
            <span className="text-xs font-sans text-slate-500">
              {projects.length} Entries
            </span>
          </div>

          {projects.length === 0 ? (
            <p className="text-sm font-serif italic text-slate-500 py-6">No manuscripts published yet.</p>
          ) : (
            <div className="divide-y divide-slate-200">
              {projects.map((project, idx) => {
                const demo = safeUrl(project.demoUrl);
                const code = safeUrl(project.githubUrl);

                return (
                  <article key={project.id || idx} className="py-6 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-slate-500">
                          PAPER REF [{idx + 1}]
                        </span>
                        <h3 className="text-lg font-serif font-bold text-slate-900">
                          {project.name}
                        </h3>
                      </div>
                      <span
                        className="shrink-0 px-2.5 py-0.5 rounded text-[11px] font-sans font-semibold border"
                        style={{ borderColor: accent, color: accent }}
                      >
                        PEER REVIEWED
                      </span>
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed font-serif">
                      {project.description}
                    </p>

                    <div className="flex items-center gap-4 pt-1 text-xs font-sans font-medium">
                      {demo && (
                        <a
                          href={demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold hover:underline"
                          style={{ color: accent }}
                        >
                          <FileText size={13} />
                          <span>View Manuscript / Demo</span>
                          <ArrowUpRight size={11} />
                        </a>
                      )}
                      {code && (
                        <a
                          href={code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 transition"
                        >
                          <GithubIcon size={13} />
                          <span>Open Repository</span>
                          <ArrowUpRight size={11} />
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
        <footer className="pt-10 border-t-2 border-slate-300 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-slate-500 gap-4">
          <span>&copy; {new Date().getFullYear()} {name || "Scholar"}. Academic Integrity.</span>
          <span>Archived via PortfolioForge</span>
        </footer>
      </div>
    </div>
  );
};

export default AcademicTemplate;
