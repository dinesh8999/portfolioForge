import type { PortfolioStyle, Project } from "../../types/portfolio";

export type TemplateRenderProps = {
  name: string;
  role: string;
  bio: string;
  email: string;
  skills: string[];
  profilePhoto?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  projects: Project[];
  style: PortfolioStyle;
  isStandalone?: boolean; // When rendered in public view vs editor preview
};

