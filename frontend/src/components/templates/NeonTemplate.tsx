import React from "react";
import { ArrowUpRight, Cpu, Globe, Mail, Radio } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/Icons";
import type { TemplateRenderProps } from "./types";
import { getInitials, safeUrl } from "../../utils/portfolio";
import { getTemplateTheme } from "../../data/templates";

export const NeonTemplate: React.FC<TemplateRenderProps> = ({
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
  const defaultTheme = getTemplateTheme("neon");
  const accent = style.accentColor || defaultTheme.accentColor;
  const bg = style.backgroundColor || defaultTheme.backgroundColor;
  const text = style.textColor || defaultTheme.textColor;

  const github = safeUrl(githubUrl);
  const linkedin = safeUrl(linkedinUrl);
  const website = safeUrl(websiteUrl);

  return (
    <div
      className="min-h-full w-full py-16 px-6 sm:px-12 md:px-16 relative overflow-hidden"
      style={{
        backgroundColor: bg,
        color: text,
        fontFamily: style.fontFamily || defaultTheme.fontFamily,
      }}
    >
      {/* Background Cyber Ambient Glows */}
      <div
        className="absolute top-10 left-1/4 w-80 h-80 rounded-full blur-[140px] pointer-events-none opacity-25"
        style={{ backgroundColor: accent }}
      />
      <div
        className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full blur-[140px] pointer-events-none opacity-20 bg-purple-600"
      />

      <div className="mx-auto max-w-5xl space-y-16 relative z-10">
        {/* Neon Cyber Header Box */}
        <header
          className="p-8 sm:p-12 rounded-xl border relative"
          style={{
            borderColor: accent,
            boxShadow: `0 0 25px -5px ${accent}40, inset 0 0 20px -5px ${accent}20`,
            backgroundColor: "rgba(5, 11, 20, 0.75)",
          }}
        >
          {/* Cyber Corner Decors */}
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white" style={{ boxShadow: `0 0 8px ${accent}` }} />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white" style={{ boxShadow: `0 0 8px ${accent}` }} />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white" style={{ boxShadow: `0 0 8px ${accent}` }} />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white" style={{ boxShadow: `0 0 8px ${accent}` }} />

          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center md:text-left">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-mono font-bold tracking-widest border"
                style={{ borderColor: accent, color: accent }}
              >
                <Radio size={14} className="animate-pulse" />
                <span>ONLINE_SYSTEM // v2.6</span>
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase"
                style={{ textShadow: `0 0 15px ${accent}80` }}
              >
                {name || "Cyber Operator"}
              </h1>

              <p
                className="text-lg sm:text-xl font-mono font-bold"
                style={{ color: accent }}
              >
                {"> "} {role || "Full Stack Cyber Engineer"}
              </p>

              <p className="text-sm sm:text-base leading-relaxed opacity-85 max-w-xl font-sans">
                {bio || "Building next-generation digital artifacts in the cyberpunk web universe."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-4">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-mono text-xs font-bold text-black uppercase transition hover:scale-105"
                    style={{
                      backgroundColor: accent,
                      boxShadow: `0 0 15px ${accent}80`,
                    }}
                  >
                    <Mail size={15} />
                    <span>Initialize_Contact</span>
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded font-mono text-xs font-semibold border transition hover:bg-white/5"
                    style={{ borderColor: `${accent}60` }}
                  >
                    <GithubIcon size={15} />
                    <span>GitHub</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded font-mono text-xs font-semibold border transition hover:bg-white/5"
                    style={{ borderColor: `${accent}60` }}
                  >
                    <LinkedinIcon size={15} />
                    <span>LinkedIn</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded font-mono text-xs font-semibold border transition hover:bg-white/5"
                    style={{ borderColor: `${accent}60` }}
                  >
                    <Globe size={15} />
                    <span>Network</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </div>

            {/* Glowing Avatar */}
            <div className="shrink-0 relative">
              <div
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-lg overflow-hidden border-2 relative"
                style={{
                  borderColor: accent,
                  boxShadow: `0 0 20px ${accent}60`,
                }}
              >
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-3xl font-mono font-bold bg-black/60"
                    style={{ color: accent }}
                  >
                    {getInitials(name)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Cyber Skills Matrix */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase opacity-70">
              <Cpu size={16} style={{ color: accent }} />
              <span>// TECH_INVENTORY</span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className="px-3.5 py-1.5 rounded font-mono text-xs border tracking-wider bg-black/40"
                  style={{
                    borderColor: `${accent}50`,
                    boxShadow: `0 0 10px -2px ${accent}25`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects HUD */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b pb-3 font-mono text-xs" style={{ borderColor: `${accent}40` }}>
            <span style={{ color: accent }}>// ACTIVE_DEPLOYMENTS</span>
            <span className="opacity-60">COUNT: {projects.length}</span>
          </div>

          {projects.length === 0 ? (
            <p className="text-sm font-mono opacity-50 italic py-6">No active deployments detected.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, idx) => {
                const demo = safeUrl(project.demoUrl);
                const code = safeUrl(project.githubUrl);

                return (
                  <article
                    key={project.id || idx}
                    className="flex flex-col justify-between rounded-lg border p-6 bg-black/50 relative overflow-hidden group hover:border-white transition"
                    style={{
                      borderColor: `${accent}40`,
                      boxShadow: `0 0 18px -4px ${accent}20`,
                    }}
                  >
                    <div className="space-y-3">
                      {project.imageUrl && (
                        <div className="w-full h-44 rounded overflow-hidden border border-white/10">
                          <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-mono font-bold tracking-tight">
                          {project.name}
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded border" style={{ borderColor: accent, color: accent }}>
                          LIVE
                        </span>
                      </div>

                      <p className="text-sm font-sans opacity-75 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-5 mt-5 border-t border-white/10 font-mono text-xs">
                      {demo && (
                        <a
                          href={demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 hover:underline"
                          style={{ color: accent }}
                        >
                          <span>launch_demo</span>
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
                          <span>inspect_code</span>
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
        <footer className="pt-8 border-t border-white/10 font-mono flex flex-col sm:flex-row items-center justify-between text-xs opacity-50 gap-4">
          <span>PORTFOLIO_ID: {name || "OPERATOR"} // STATUS: OPERATIONAL</span>
          <span>Engineered via PortfolioForge</span>
        </footer>
      </div>
    </div>
  );
};
