import React from "react";
import { ArrowRight, X } from "lucide-react";
import {
  type PortfolioTemplate,
  getTemplateTheme,
  getTemplateSampleData,
} from "../data/templates";
import { PortfolioRenderer } from "./templates/PortfolioRenderer";

type TemplatePreviewModalProps = {
  template: PortfolioTemplate | null;
  onClose: () => void;
  onCustomize: (templateId: string) => void;
};

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  onClose,
  onCustomize,
}) => {
  if (!template) return null;

  const templateStyle = getTemplateTheme(template.style);
  const samplePortfolio = getTemplateSampleData(template.style);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl border border-white/15 bg-[#0e0e0e] shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#141414]">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest font-mono text-[#d4af37]">
              PREVIEW
            </span>
            <h3 className="text-base font-bold text-white">{template.name}</h3>
            <span className="hidden sm:inline-block text-xs text-white/50">
              ({template.category})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onCustomize(template.id);
                onClose();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d4af37] text-xs font-bold text-black hover:bg-[#e8ca83] transition"
            >
              <span>Use This Template</span>
              <ArrowRight size={14} />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body: Rendered Template with its Authentic Theme */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ backgroundColor: templateStyle.backgroundColor }}
        >
          <PortfolioRenderer
            portfolio={samplePortfolio}
            style={templateStyle}
            templateId={template.id}
            isStandalone={true}
          />
        </div>
      </div>
    </div>
  );
};
