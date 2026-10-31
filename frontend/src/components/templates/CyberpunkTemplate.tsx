import React from "react";
import { ArrowUpRight, Cpu, Globe, Mail, ShieldAlert, Terminal, Zap } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/Icons";
import type { TemplateRenderProps } from "./types";
import { getInitials, safeUrl } from "../../utils/portfolio";
import { getTemplateTheme } from "../../data/templates";

export const CyberpunkTemplate: React.FC<TemplateRenderProps> = ({
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
  const defaultTheme = getTemplateTheme("cyberpunk");
  const accent = style.accentColor || defaultTheme.accentColor;
  const bg = style.backgroundColor || defaultTheme.backgroundColor;
  const text = style.textColor || defaultTheme.textColor;

  const github = safeUrl(githubUrl);
  const linkedin = safeUrl(linkedinUrl);
  const website = safeUrl(websiteUrl);

  return (
    <div
      className="min-h-full w-full py-14 px-5 sm:px-10 md:px-16 font-mono relative overflow-hidden"
      style={{
        backgroundColor: bg,
        color: text,
        fontFamily: style.fontFamily || defaultTheme.fontFamily,
      }}
    >
      {/* Background Cyber Grid Lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `linear-gradient(${accent}33 1px, transparent 1px), linear-gradient(90deg, ${accent}33 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl space-y-16">
        {/* Top HUD Telemetry Bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 border-b pb-3 text-xs tracking-widest uppercase"
          style={{ borderColor: `${accent}40`, color: accent }}
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: accent }} />
            <span>NODE // RECON ACTIVE</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] opacity-80">
            <span>SEC_CLEARANCE: LEVEL_05</span>
            <span>ENCRYPT: SHA-512</span>
            <span>PORT: 8080/TLS</span>
          </div>
        </div>

        {/* Hero Section with Cyber HUD Angled Framing */}
        <header className="relative border-l-4 pl-6 sm:pl-10 space-y-6" style={{ borderColor: accent }}>
          <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-black/60 border"
                style={{ borderColor: accent, color: accent }}
              >
                <Cpu size={14} />
                <span>CYBERPUNK MATRIX &bull; JACK INTO THE GRID</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase drop-shadow">
                {name || "Agent Zero"}
              </h1>

              <p
                className="text-lg sm:text-xl font-bold tracking-wider"
                style={{ color: accent }}
              >
                // {role || "Offensive Security & Web3 Architect"}
              </p>

              <p className="text-sm sm:text-base leading-relaxed opacity-85 font-normal max-w-xl">
                {bio || "Exploiting zero-day vulnerabilities, breaking smart contract invariants, and hardening decentralized telemetry over encrypted mesh channels."}
              </p>

              {/* Action Badges */}
              <div className="flex flex-wrap gap-3 pt-3">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-black uppercase text-black transition hover:brightness-110 shadow-lg"
                    style={{ backgroundColor: accent }}
                  >
                    <Mail size={14} />
                    <span>Initialize Comms</span>
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold border bg-black/40 hover:bg-black/80 transition"
                    style={{ borderColor: `${accent}60` }}
                  >
                    <GithubIcon size={14} />
                    <span>git:source</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold border bg-black/40 hover:bg-black/80 transition"
                    style={{ borderColor: `${accent}60` }}
                  >
                    <LinkedinIcon size={14} />
                    <span>net:link</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold border bg-black/40 hover:bg-black/80 transition"
                    style={{ borderColor: `${accent}60` }}
                  >
                    <Globe size={14} />
                    <span>node:web</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </div>

            {/* Profile Avatar with Cyber Target Reticle */}
            <div className="relative shrink-0">
              <div
                className="absolute -inset-2 border-2 border-dashed opacity-60 animate-spin"
                style={{ borderColor: accent, animationDuration: "16s" }}
              />
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt={name}
                  className="relative w-36 h-36 sm:w-44 sm:h-44 object-cover border-2 shadow-2xl filter contrast-125"
                  style={{ borderColor: accent }}
                />
              ) : (
                <div
                  className="relative w-36 h-36 sm:w-44 sm:h-44 flex flex-col items-center justify-center border-2 bg-black/80 shadow-2xl text-center p-3"
                  style={{ borderColor: accent, color: accent }}
                >
                  <ShieldAlert size={28} className="mb-1" />
                  <span className="text-2xl font-black">[{getInitials(name)}]</span>
                  <span className="text-[10px] opacity-75 mt-1 tracking-widest">ID_VERIFIED</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Cyber Skills Matrix */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase" style={{ color: accent }}>
              <Zap size={14} />
              <span>ACTIVE_CAPABILITIES ({skills.length})</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className="px-3.5 py-1.5 text-xs font-semibold border bg-black/60 shadow-sm flex items-center gap-1.5"
                  style={{ borderColor: `${accent}40` }}
                >
                  <span className="text-[10px]" style={{ color: accent }}>#</span>
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Project Exploits / Case Repos */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: `${accent}40` }}>
            <div className="flex items-center gap-2">
              <Terminal size={18} style={{ color: accent }} />
              <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                Deployed Systems &amp; Exploits
              </h2>
            </div>
            <span
              className="text-xs font-bold px-3 py-1 border bg-black/50"
              style={{ borderColor: accent, color: accent }}
            >
              {projects.length} PAYLOADS
            </span>
          </div>

          {projects.length === 0 ? (
            <p className="text-xs opacity-50 italic">No payloads registered on network.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {projects.map((project, idx) => {
                const demo = safeUrl(project.demoUrl);
                const code = safeUrl(project.githubUrl);

                return (
                  <article
                    key={project.id || idx}
                    className="flex flex-col justify-between border bg-[#04080c]/90 p-6 shadow-xl relative group transition hover:border-current"
                    style={{ borderColor: `${accent}40` }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px] opacity-60">
                        <span>PRJ_REF_{idx + 1}</span>
                        <span>STATUS: ACTIVE</span>
                      </div>

                      {project.imageUrl && (
                        <div className="w-full h-44 overflow-hidden border border-white/10 bg-black">
                          <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="w-full h-full object-cover filter contrast-125 group-hover:scale-105 transition duration-500"
                          />
                        </div>
                      )}

                      <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition">
                        {project.name}
                      </h3>

                      <p className="text-xs opacity-80 leading-relaxed font-normal">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2.5 pt-5 mt-5 border-t border-white/10 text-xs font-bold">
                      {demo && (
                        <a
                          href={demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-black hover:opacity-90 transition font-black uppercase"
                          style={{ backgroundColor: accent }}
                        >
                          <span>Execute Demo</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                      {code && (
                        <a
                          href={code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/20 hover:border-white/60 transition"
                        >
                          <span>Source Code</span>
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
        <footer className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between text-xs opacity-60 gap-4" style={{ borderColor: `${accent}30` }}>
          <span>CYBERPUNK 2099 ARCHITECTURE &bull; TERMINAL_ID_2099</span>
          <span>POWERED BY PORTFOLIOFORGE</span>
        </footer>
      </div>
    </div>
  );
};

export default CyberpunkTemplate;
