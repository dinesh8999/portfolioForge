import React from "react";
import type { PortfolioData, PortfolioStyle, PublicPortfolioData, TemplateId } from "../../types/portfolio";
// Original 9 Templates
import { MinimalTemplate } from "./MinimalTemplate";
import { ExecutiveTemplate } from "./ExecutiveTemplate";
import { CreativeTemplate } from "./CreativeTemplate";
import { NeonTemplate } from "./NeonTemplate";
import { EditorialTemplate } from "./EditorialTemplate";
import { ModernBlueTemplate } from "./ModernBlueTemplate";
import { TerminalTemplate } from "./TerminalTemplate";
import { WarmTemplate } from "./WarmTemplate";
import { ProductTemplate } from "./ProductTemplate";
// 10 New Templates
import { CyberpunkTemplate } from "./CyberpunkTemplate";
import { NordicTemplate } from "./NordicTemplate";
import { BrutalistTemplate } from "./BrutalistTemplate";
import { AuroraTemplate } from "./AuroraTemplate";
import { SwissTemplate } from "./SwissTemplate";
import { SynthwaveTemplate } from "./SynthwaveTemplate";
import { AcademicTemplate } from "./AcademicTemplate";
import { BentoTemplate } from "./BentoTemplate";
import { LuxeTemplate } from "./LuxeTemplate";
import { RetroOsTemplate } from "./RetroOsTemplate";
import { getTemplateTheme } from "../../data/templates";

type PortfolioRendererProps = {
  portfolio: PortfolioData | PublicPortfolioData;
  style: PortfolioStyle;
  templateId?: string;
  isStandalone?: boolean;
};

export const PortfolioRenderer: React.FC<PortfolioRendererProps> = ({
  portfolio,
  style,
  templateId = "minimal",
  isStandalone = false,
}) => {
  const currentTemplate = (templateId || "minimal").toLowerCase() as TemplateId;
  const defaultTheme = getTemplateTheme(currentTemplate);

  const mergedStyle: PortfolioStyle = {
    accentColor: style?.accentColor || defaultTheme.accentColor,
    backgroundColor: style?.backgroundColor || defaultTheme.backgroundColor,
    textColor: style?.textColor || defaultTheme.textColor,
    fontFamily: style?.fontFamily || defaultTheme.fontFamily,
  };

  // Normalize skills: in editor it might be a comma-separated string, in public it's string[]
  const normalizedSkills: string[] = Array.isArray(portfolio.skills)
    ? portfolio.skills
    : typeof portfolio.skills === "string"
      ? (portfolio.skills as string)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

  const commonProps = {
    name: portfolio.name || "",
    role: portfolio.role || "",
    bio: portfolio.bio || "",
    email: portfolio.email || "",
    skills: normalizedSkills,
    profilePhoto: portfolio.profilePhoto || "",
    githubUrl: portfolio.githubUrl || "",
    linkedinUrl: portfolio.linkedinUrl || "",
    websiteUrl: portfolio.websiteUrl || "",
    projects: portfolio.projects || [],
    style: mergedStyle,
    isStandalone,
  };

  switch (currentTemplate) {
    // Original 9
    case "executive":
      return <ExecutiveTemplate {...commonProps} />;
    case "creative":
      return <CreativeTemplate {...commonProps} />;
    case "neon":
      return <NeonTemplate {...commonProps} />;
    case "editorial":
      return <EditorialTemplate {...commonProps} />;
    case "modern-blue":
      return <ModernBlueTemplate {...commonProps} />;
    case "terminal":
      return <TerminalTemplate {...commonProps} />;
    case "warm":
      return <WarmTemplate {...commonProps} />;
    case "product":
      return <ProductTemplate {...commonProps} />;

    // 10 New Templates
    case "cyberpunk":
      return <CyberpunkTemplate {...commonProps} />;
    case "nordic":
      return <NordicTemplate {...commonProps} />;
    case "brutalist":
      return <BrutalistTemplate {...commonProps} />;
    case "aurora":
      return <AuroraTemplate {...commonProps} />;
    case "swiss":
      return <SwissTemplate {...commonProps} />;
    case "synthwave":
      return <SynthwaveTemplate {...commonProps} />;
    case "academic":
      return <AcademicTemplate {...commonProps} />;
    case "bento":
      return <BentoTemplate {...commonProps} />;
    case "luxe":
      return <LuxeTemplate {...commonProps} />;
    case "retro-os":
      return <RetroOsTemplate {...commonProps} />;

    case "minimal":
    default:
      return <MinimalTemplate {...commonProps} />;
  }
};

export default PortfolioRenderer;
