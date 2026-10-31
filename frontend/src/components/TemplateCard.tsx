import { Check, Eye, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import type { PortfolioTemplate } from "../data/templates";

type TemplateCardProps = {
  template: PortfolioTemplate;
  selected: boolean;
  onSelect: (id: string) => void;
  onCustomize: (id: string) => void;
  onPreview: (template: PortfolioTemplate) => void;
};

const previewHeadings: Record<PortfolioTemplate["style"], ReactNode> = {
  minimal: (
    <>
      Less, <span>but better.</span>
    </>
  ),
  executive: (
    <>
      Built for <span>impact.</span>
    </>
  ),
  creative: (
    <>
      Think <span>different.</span>
    </>
  ),
  neon: (
    <>
      Code the <span>future.</span>
    </>
  ),
  editorial: (
    <>
      Your story, <span>beautifully told.</span>
    </>
  ),
  "modern-blue": (
    <>
      Design. Build. <span>Deliver.</span>
    </>
  ),
  terminal: (
    <>
      Hello, <span>world.</span>
    </>
  ),
  warm: (
    <>
      Make it <span>memorable.</span>
    </>
  ),
  product: (
    <>
      Design with <span>purpose.</span>
    </>
  ),
  cyberpunk: (
    <>
      Jack into <span>the grid.</span>
    </>
  ),
  nordic: (
    <>
      Simplicity <span>in form.</span>
    </>
  ),
  brutalist: (
    <>
      Raw &amp; <span>unapologetic.</span>
    </>
  ),
  aurora: (
    <>
      Beyond <span>the horizon.</span>
    </>
  ),
  swiss: (
    <>
      Grid, <span>rhythm, precision.</span>
    </>
  ),
  synthwave: (
    <>
      Retro wave <span>pulse.</span>
    </>
  ),
  academic: (
    <>
      Research &amp; <span>discovery.</span>
    </>
  ),
  bento: (
    <>
      Every detail <span>matters.</span>
    </>
  ),
  luxe: (
    <>
      Timeless <span>sophistication.</span>
    </>
  ),
  "retro-os": (
    <>
      Click to <span>explore.</span>
    </>
  ),
};

export default function TemplateCard({
  template,
  selected,
  onSelect,
  onCustomize,
  onPreview,
}: TemplateCardProps) {
  return (
    <article
      className={`card-hover-effect overflow-hidden rounded-2xl border bg-[#111111] transition duration-300 flex flex-col justify-between ${
        selected
          ? "border-[#d4af37] ring-1 ring-[#d4af37] shadow-xl shadow-[#d4af37]/10"
          : "border-[#292929] hover:border-white/20"
      }`}
    >
      <div>
        {/* Template Graphic Header */}
        <div
          className={`template-preview template-${template.style} relative flex aspect-[16/10] flex-col justify-between overflow-hidden p-6 cursor-pointer group`}
          onClick={() => onPreview(template)}
          title="Click to preview template"
        >
          <div className="flex items-center justify-between gap-3 relative z-10">
            <span className="text-[10px] font-bold tracking-[0.2em] px-2.5 py-1 rounded bg-black/10 backdrop-blur">
              {template.category}
            </span>

            <span className="text-[11px] font-mono opacity-70">
              2026 EDITION
            </span>
          </div>

          <div className="relative z-10">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-current/30 text-xs font-bold">
              {template.initials}
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {previewHeadings[template.style]}
            </h3>

            <div className="mt-3 h-1 w-10 bg-current opacity-70 rounded-full" />
          </div>

          {/* Hover overlay hint */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 text-white text-xs font-semibold backdrop-blur-[2px]">
            <Eye size={16} />
            <span>Click to Preview</span>
          </div>
        </div>

        {/* Card Info */}
        <div className="p-5 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-bold text-base text-white">{template.name}</h4>
              <p className="mt-1 text-xs text-white/50 leading-relaxed">
                {template.description}
              </p>
            </div>

            {selected && (
              <span
                className="shrink-0 rounded-full bg-[#d4af37]/20 p-1.5 text-[#d4af37]"
                aria-label="Selected template"
              >
                <Check size={16} />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => onPreview(template)}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-white/15 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition"
        >
          <Eye size={14} />
          <span>Preview</span>
        </button>

        <button
          type="button"
          onClick={() => {
            onSelect(template.id);
            onCustomize(template.id);
          }}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition ${
            selected
              ? "bg-[#d4af37] text-black hover:bg-[#e8ca83]"
              : "bg-white/10 text-white hover:bg-[#d4af37] hover:text-black"
          }`}
        >
          <Sparkles size={14} />
          <span>Customize</span>
        </button>
      </div>
    </article>
  );
}
