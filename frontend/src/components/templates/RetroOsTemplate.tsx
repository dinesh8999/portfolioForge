import React from "react";
import { ArrowUpRight, Folder, Globe, HardDrive, HelpCircle, Mail, Minus, Monitor, Square, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/Icons";
import type { TemplateRenderProps } from "./types";
import { getInitials, safeUrl } from "../../utils/portfolio";
import { getTemplateTheme } from "../../data/templates";

export const RetroOsTemplate: React.FC<TemplateRenderProps> = ({
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
  const defaultTheme = getTemplateTheme("retro-os");
  const accent = style.accentColor || defaultTheme.accentColor;
  const bg = style.backgroundColor || defaultTheme.backgroundColor;
  const text = style.textColor || defaultTheme.textColor;

  const github = safeUrl(githubUrl);
  const linkedin = safeUrl(linkedinUrl);
  const website = safeUrl(websiteUrl);

  return (
    <div
      className="min-h-full w-full py-10 px-4 sm:px-8 md:px-12 font-mono selection:bg-navy-800 selection:text-white"
      style={{
        backgroundColor: bg,
        color: text,
        fontFamily: style.fontFamily || defaultTheme.fontFamily,
      }}
    >
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Retro OS 95 Main Window */}
        <div className="bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black shadow-2xl p-1">
          {/* Windows 95 Gradient Title Bar */}
          <div
            className="flex items-center justify-between px-3 py-1.5 text-white text-xs font-bold tracking-tight"
            style={{ background: `linear-gradient(to right, ${accent}, #1084d0)` }}
          >
            <div className="flex items-center gap-2">
              <Monitor size={15} />
              <span>PORTFOLIO_FORGE_OS_95.EXE &mdash; [{name || "Sam Zissou"}]</span>
            </div>

            {/* Window Controls: Minimize, Maximize, Close */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="w-5 h-4.5 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-black text-black flex items-center justify-center text-[10px] font-bold"
              >
                <Minus size={10} />
              </button>
              <button
                type="button"
                className="w-5 h-4.5 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-black text-black flex items-center justify-center text-[10px] font-bold"
              >
                <Square size={8} />
              </button>
              <button
                type="button"
                className="w-5 h-4.5 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-black text-black flex items-center justify-center text-[10px] font-bold ml-0.5"
              >
                <X size={10} />
              </button>
            </div>
          </div>

          {/* Window Menu Bar */}
          <div className="flex items-center gap-4 px-3 py-1 text-xs text-black border-b border-gray-400 bg-[#c0c0c0]">
            <span className="hover:bg-navy-800 hover:text-white px-1 cursor-pointer"><u>F</u>ile</span>
            <span className="hover:bg-navy-800 hover:text-white px-1 cursor-pointer"><u>E</u>dit</span>
            <span className="hover:bg-navy-800 hover:text-white px-1 cursor-pointer"><u>V</u>iew</span>
            <span className="hover:bg-navy-800 hover:text-white px-1 cursor-pointer"><u>H</u>elp</span>
          </div>

          {/* Window Body Inner Bevel */}
          <div className="p-6 sm:p-8 space-y-8 bg-[#c0c0c0]">
            {/* User Profile Card within Inset Frame */}
            <div className="border-t-2 border-l-2 border-gray-600 border-b-2 border-r-2 border-white bg-white p-6 shadow-inner">
              <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-6">
                <div className="space-y-3 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#000080] text-white text-xs font-bold">
                    <HardDrive size={13} />
                    <span>C:\USERS\{name ? name.toUpperCase().replace(/\s+/g, "_") : "USER"}\</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-black">
                    {name || "Sam Zissou"}
                  </h1>

                  <p className="text-base font-bold text-[#000080]">
                    &gt;&gt; {role || "Full-Stack Nostalgia Engineer"}
                  </p>

                  <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-normal">
                    {bio || "Recreating the wonder of computing's golden era. Desktop windows, 16-color dithering, MIDI chiptunes, and handcrafted web standards."}
                  </p>

                  {/* 3D Action Buttons */}
                  <div className="flex flex-wrap gap-2.5 pt-3">
                    {email && (
                      <a
                        href={`mailto:${email}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black text-xs font-bold text-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
                      >
                        <Mail size={13} />
                        <span>Send Mail...</span>
                      </a>
                    )}
                    {github && (
                      <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black text-xs font-bold text-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
                      >
                        <GithubIcon size={13} />
                        <span>GitHub.exe</span>
                        <ArrowUpRight size={11} />
                      </a>
                    )}
                    {linkedin && (
                      <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black text-xs font-bold text-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
                      >
                        <LinkedinIcon size={13} />
                        <span>Network.dll</span>
                        <ArrowUpRight size={11} />
                      </a>
                    )}
                    {website && (
                      <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black text-xs font-bold text-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
                      >
                        <Globe size={13} />
                        <span>Browser.com</span>
                        <ArrowUpRight size={11} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Profile Photo as 3D Frame */}
                <div className="shrink-0">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt={name}
                      className="w-32 h-32 sm:w-40 sm:h-40 object-cover border-t-2 border-l-2 border-gray-600 border-b-2 border-r-2 border-white"
                    />
                  ) : (
                    <div
                      className="w-32 h-32 sm:w-40 sm:h-40 border-t-2 border-l-2 border-gray-600 border-b-2 border-r-2 border-white bg-[#008080] flex flex-col items-center justify-center text-white text-2xl font-bold p-2 text-center"
                    >
                      <span>BMP</span>
                      <span className="text-xs font-normal">[{getInitials(name)}]</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Skills: Installed DLLs / Modules */}
            {skills.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-black">
                  <Folder size={14} className="text-yellow-600 fill-yellow-600" />
                  <span>C:\WINDOWS\SYSTEM32\DRIVERS ({skills.length} files)</span>
                </div>
                <div className="flex flex-wrap gap-2 border-t-2 border-l-2 border-gray-600 border-b-2 border-r-2 border-white bg-white p-3">
                  {skills.map((skill, idx) => (
                    <span
                      key={`${skill}-${idx}`}
                      className="px-2.5 py-1 text-xs font-mono bg-gray-100 border border-gray-300 text-black flex items-center gap-1 shadow-sm"
                    >
                      <span className="text-blue-700 font-bold">&bull;</span>
                      <span>{skill}.sys</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Section: Windows File Explorer View */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-black">
                <div className="flex items-center gap-2">
                  <Folder size={14} className="text-yellow-600 fill-yellow-600" />
                  <span>C:\PROJECTS\*.*</span>
                </div>
                <span>{projects.length} Object(s)</span>
              </div>

              {projects.length === 0 ? (
                <p className="text-xs text-gray-500 italic p-4 bg-white border border-gray-400">Directory is empty.</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {projects.map((project, idx) => {
                    const demo = safeUrl(project.demoUrl);
                    const code = safeUrl(project.githubUrl);

                    return (
                      <article
                        key={project.id || idx}
                        className="border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black bg-[#c0c0c0] p-4 flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between bg-[#000080] text-white px-2 py-0.5 text-xs font-bold">
                            <span className="truncate">{project.name}.EXE</span>
                            <span className="text-[10px]">640KB</span>
                          </div>

                          {project.imageUrl && (
                            <div className="w-full h-36 border-t-2 border-l-2 border-gray-600 border-b-2 border-r-2 border-white overflow-hidden bg-black">
                              <img
                                src={project.imageUrl}
                                alt={project.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          <p className="text-xs text-black leading-relaxed font-normal bg-white p-2 border border-gray-400">
                            {project.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2 text-xs font-bold">
                          {demo && (
                            <a
                              href={demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black text-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
                            >
                              <span>Run Program</span>
                              <ArrowUpRight size={11} />
                            </a>
                          )}
                          {code && (
                            <a
                              href={code}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black text-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
                            >
                              <span>View Source</span>
                              <ArrowUpRight size={11} />
                            </a>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Windows 95 Status Bar */}
          <div className="flex items-center justify-between border-t-2 border-gray-600 px-3 py-1 text-xs text-gray-800 bg-[#c0c0c0]">
            <div className="flex items-center gap-2">
              <HelpCircle size={13} />
              <span>Press F1 for Help</span>
            </div>
            <div className="flex items-center gap-3">
              <span>RAM: 64MB OK</span>
              <span className="border-l border-gray-400 pl-2">READY</span>
            </div>
          </div>
        </div>

        {/* Nostalgic Footer */}
        <footer className="text-center text-xs text-white/80 font-mono">
          <p>Windows 95 Inspired Theme &bull; PortfolioForge Operating System</p>
        </footer>
      </div>
    </div>
  );
};

export default RetroOsTemplate;
