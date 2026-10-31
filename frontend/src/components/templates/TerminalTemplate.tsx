import React from "react";
import { ArrowUpRight, Check, FolderGit2, Globe, Mail, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/Icons";
import type { TemplateRenderProps } from "./types";
import { getInitials, safeUrl } from "../../utils/portfolio";
import { getTemplateTheme } from "../../data/templates";

export const TerminalTemplate: React.FC<TemplateRenderProps> = ({
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
  const defaultTheme = getTemplateTheme("terminal");
  const accent = style.accentColor || defaultTheme.accentColor;
  const bg = style.backgroundColor || defaultTheme.backgroundColor;
  const text = style.textColor || defaultTheme.textColor;

  const github = safeUrl(githubUrl);
  const linkedin = safeUrl(linkedinUrl);
  const website = safeUrl(websiteUrl);

  const username = (name || "user").toLowerCase().replace(/[^a-z0-9]/g, "");

  return (
    <div
      className="min-h-full w-full py-12 px-5 sm:px-10 md:px-14 font-mono"
      style={{
        backgroundColor: bg,
        color: text,
        fontFamily: style.fontFamily || defaultTheme.fontFamily,
      }}
    >
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Terminal Window Frame */}
        <div className="rounded-xl border border-emerald-500/30 bg-[#050907] shadow-2xl overflow-hidden">
          {/* Top Title Bar */}
          <div className="flex items-center justify-between border-b border-emerald-500/20 bg-[#0b1410] px-4 py-3 text-xs text-emerald-400/80">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-bold text-emerald-400">bash &mdash; 80x24</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs opacity-75">
              <Terminal size={14} />
              <span>{username}@portfolio-forge:~</span>
            </div>
          </div>

          {/* Terminal Content Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Prompt Line 1 */}
            <div className="space-y-2">
              <p className="text-xs text-emerald-400/60">
                <span className="text-emerald-400 font-bold">{username}@localhost</span>:<span className="text-blue-400">~</span>$ whoami --verbose
              </p>

              <div className="flex flex-col-reverse sm:flex-row items-start justify-between gap-6 pt-2">
                <div className="space-y-3 max-w-xl">
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                    {name || "Anonymous Engineer"}
                  </h1>
                  <p className="text-sm sm:text-base font-semibold" style={{ color: accent }}>
                    &gt; {role || "Backend & Systems Architect"}
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed opacity-80 pt-1">
                    {bio || "Designing ultra low-latency distributed kernels, memory-safe network proxies, and real-time observability."}
                  </p>
                </div>

                {/* Profile Photo as ASCII / Monospace Badge */}
                <div className="shrink-0">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt={name}
                      className="w-28 h-28 sm:w-36 sm:h-36 rounded-lg object-cover border-2 shadow-lg filter contrast-125"
                      style={{ borderColor: accent }}
                    />
                  ) : (
                    <div
                      className="w-28 h-28 sm:w-36 sm:h-36 rounded-lg border-2 flex flex-col items-center justify-center p-2 text-center text-xs"
                      style={{ borderColor: accent, color: accent }}
                    >
                      <span className="text-2xl font-bold font-mono">[{getInitials(name)}]</span>
                      <span className="text-[10px] opacity-75 mt-1">USER_IMAGE</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Prompt Line 2: Links */}
            <div className="space-y-2 border-t border-emerald-500/15 pt-4">
              <p className="text-xs text-emerald-400/60">
                <span className="text-emerald-400 font-bold">{username}@localhost</span>:<span className="text-blue-400">~</span>$ cat ./contacts.json
              </p>

              <div className="flex flex-wrap gap-3 pt-1 text-xs">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border hover:bg-emerald-500/10 transition"
                    style={{ borderColor: accent, color: accent }}
                  >
                    <Mail size={13} />
                    <span>email: "{email}"</span>
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-emerald-500/30 hover:border-emerald-500/80 transition"
                  >
                    <GithubIcon size={13} />
                    <span>github.com</span>
                    <ArrowUpRight size={11} />
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-emerald-500/30 hover:border-emerald-500/80 transition"
                  >
                    <LinkedinIcon size={13} />
                    <span>linkedin.com</span>
                    <ArrowUpRight size={11} />
                  </a>
                )}
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-emerald-500/30 hover:border-emerald-500/80 transition"
                  >
                    <Globe size={13} />
                    <span>website.sh</span>
                    <ArrowUpRight size={11} />
                  </a>
                )}
              </div>
            </div>

            {/* Prompt Line 3: Skills */}
            {skills.length > 0 && (
              <div className="space-y-2 border-t border-emerald-500/15 pt-4">
                <p className="text-xs text-emerald-400/60">
                  <span className="text-emerald-400 font-bold">{username}@localhost</span>:<span className="text-blue-400">~</span>$ list-modules --installed
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {skills.map((skill, idx) => (
                    <span
                      key={`${skill}-${idx}`}
                      className="px-2.5 py-1 rounded bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-1"
                    >
                      <Check size={11} style={{ color: accent }} />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Prompt Line 4: Projects */}
            <div className="space-y-4 border-t border-emerald-500/15 pt-4">
              <p className="text-xs text-emerald-400/60">
                <span className="text-emerald-400 font-bold">{username}@localhost</span>:<span className="text-blue-400">~</span>$ ls -la ./projects/
              </p>

              {projects.length === 0 ? (
                <p className="text-xs opacity-50 italic">Directory empty: 0 projects found.</p>
              ) : (
                <div className="space-y-4">
                  {projects.map((project, idx) => {
                    const demo = safeUrl(project.demoUrl);
                    const code = safeUrl(project.githubUrl);

                    return (
                      <div
                        key={project.id || idx}
                        className="rounded-lg border border-emerald-500/25 bg-[#06100b] p-4 sm:p-5 space-y-3 hover:border-emerald-500/60 transition"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <FolderGit2 size={16} style={{ color: accent }} />
                            <h3 className="text-base font-bold text-white">
                              {project.name}
                            </h3>
                          </div>
                          <span className="text-[10px] text-emerald-400/60 uppercase">
                            repo_{idx + 1}
                          </span>
                        </div>

                        {project.imageUrl && (
                          <div className="w-full h-36 rounded overflow-hidden border border-emerald-500/20">
                            <img
                              src={project.imageUrl}
                              alt={project.name}
                              className="w-full h-full object-cover filter contrast-110"
                            />
                          </div>
                        )}

                        <p className="text-xs leading-relaxed opacity-80">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2.5 pt-2 text-xs">
                          {demo && (
                            <a
                              href={demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition"
                            >
                              <span>exec:demo</span>
                              <ArrowUpRight size={11} />
                            </a>
                          )}
                          {code && (
                            <a
                              href={code}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 rounded border border-emerald-500/30 hover:border-emerald-500/70 text-emerald-400 transition"
                            >
                              <span>git:source</span>
                              <ArrowUpRight size={11} />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Prompt Blinking Cursor Line */}
            <div className="pt-2 text-xs text-emerald-400 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">{username}@localhost</span>:<span className="text-blue-400">~</span>$
              <span className="inline-block h-4 w-2 bg-emerald-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs opacity-50 space-y-1">
          <p>Terminal Pro Edition &bull; Process complete with exit code 0</p>
        </footer>
      </div>
    </div>
  );
};
