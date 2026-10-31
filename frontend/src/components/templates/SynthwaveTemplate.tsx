import React from "react";
import { ArrowUpRight, Disc, Gamepad2, Globe, Mail, Radio } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/Icons";
import type { TemplateRenderProps } from "./types";
import { getInitials, safeUrl } from "../../utils/portfolio";
import { getTemplateTheme } from "../../data/templates";

export const SynthwaveTemplate: React.FC<TemplateRenderProps> = ({
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
  const defaultTheme = getTemplateTheme("synthwave");
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
      {/* Synthwave Horizon Wireframe & Neon Glow */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 opacity-25 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-pink-500 via-purple-900 to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl space-y-16">
        {/* Retro 80s Arcade Hero */}
        <header className="rounded-3xl border-2 border-pink-500/40 bg-[#1a0c33]/80 p-8 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-md">
          {/* Laser Accent Glow */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-amber-400 to-cyan-400" />

          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
            <div className="space-y-5 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-pink-500/10 border border-pink-500/30 text-pink-400">
                <Gamepad2 size={15} />
                <span>SYNTHWAVE SUNSET &bull; RETRO WAVE PULSE</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black italic tracking-tight uppercase leading-[1.05] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-300 to-amber-300 drop-shadow-[0_2px_10px_rgba(236,72,153,0.4)]">
                {name || "Dax Ryder"}
              </h1>

              <p className="text-lg sm:text-xl font-bold italic tracking-wide text-pink-300">
                &gt;&gt; {role || "Game Engine & Graphics Developer"}
              </p>

              <p className="text-sm sm:text-base leading-relaxed opacity-85 font-normal text-purple-200">
                {bio || "Crafting real-time shaders, 3D game engines, and immersive interactive graphics soaked in 80s arcade neon nostalgia."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-black uppercase text-white shadow-lg transition hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${accent}, #f97316)`,
                    }}
                  >
                    <Mail size={15} />
                    <span>Insert Coin / Contact</span>
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold border border-pink-500/30 bg-purple-950/40 hover:bg-purple-900/60 transition"
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
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold border border-pink-500/30 bg-purple-950/40 hover:bg-purple-900/60 transition"
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
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold border border-pink-500/30 bg-purple-950/40 hover:bg-purple-900/60 transition"
                  >
                    <Globe size={15} />
                    <span>Arcade</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </div>

            {/* Profile Avatar with Neon Halo */}
            <div className="shrink-0 relative">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-500 blur-lg opacity-70 animate-pulse" />
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt={name}
                  className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl object-cover border-2 border-pink-400 shadow-2xl filter contrast-125"
                />
              ) : (
                <div
                  className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl border-2 border-pink-400 flex flex-col items-center justify-center font-black text-3xl bg-purple-950/80 text-pink-300 shadow-2xl"
                >
                  <Disc size={28} className="mb-1 text-pink-400" />
                  <span>{getInitials(name)}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Synthwave Skills */}
        {skills.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest font-bold text-pink-400/80 flex items-center gap-2">
              <Radio size={14} />
              <span>POWER-UPS &bull; SKILLS MATRIX</span>
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className="px-4 py-1.5 rounded-full text-xs font-bold border border-pink-500/30 bg-purple-950/50 text-pink-200 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Synthwave Projects */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-pink-500/30 pb-4">
            <h2 className="text-2xl font-black italic tracking-tight uppercase text-white">
              Arcade Releases &amp; Shaders
            </h2>
            <span className="text-xs font-bold px-3 py-1 rounded-full border border-pink-500/40 text-pink-400 font-mono">
              STAGE 0{projects.length}
            </span>
          </div>

          {projects.length === 0 ? (
            <p className="text-sm opacity-50 italic py-6">Stages under construction.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-8">
              {projects.map((project, idx) => {
                const demo = safeUrl(project.demoUrl);
                const code = safeUrl(project.githubUrl);

                return (
                  <article
                    key={project.id || idx}
                    className="flex flex-col justify-between rounded-3xl border border-pink-500/30 bg-purple-950/40 p-7 shadow-xl hover:border-pink-400/80 transition duration-300 group backdrop-blur-sm"
                  >
                    <div className="space-y-4">
                      {project.imageUrl && (
                        <div className="w-full h-44 rounded-2xl overflow-hidden border border-pink-500/20 bg-black">
                          <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500 filter contrast-125"
                          />
                        </div>
                      )}

                      <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-pink-300 transition">
                        {project.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed font-normal">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-6 mt-6 border-t border-pink-500/20 text-xs font-bold">
                      {demo && (
                        <a
                          href={demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white transition hover:opacity-90 shadow-md uppercase font-black"
                          style={{ backgroundColor: accent }}
                        >
                          <span>Play Demo</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                      {code && (
                        <a
                          href={code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-pink-500/30 hover:border-pink-500/70 text-pink-300 transition"
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
        <footer className="pt-8 border-t border-pink-500/30 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-300/60 gap-4">
          <span>&copy; {new Date().getFullYear()} {name || "Synthwave"}. Press Start to Continue.</span>
          <span>Powered by PortfolioForge</span>
        </footer>
      </div>
    </div>
  );
};

export default SynthwaveTemplate;

