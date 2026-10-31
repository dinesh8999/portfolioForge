export type Project = {
  id?: number;
  _id?: string;
  name: string;
  description: string;
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
};

export type PortfolioStyle = {
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
};

export type PortfolioData = {
  name: string;
  role: string;
  bio: string;
  email: string;
  skills: string; // Comma-separated in editor, parsed as array for backend
  profilePhoto: string;
  githubUrl: string;
  linkedinUrl: string;
  websiteUrl: string;
  projects: Project[];
};

export type PublicPortfolioData = {
  _id?: string;
  slug: string;
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
  templateId: string;
  templateName: string;
  style: PortfolioStyle;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type TemplateId =
  | "minimal"
  | "executive"
  | "creative"
  | "neon"
  | "editorial"
  | "modern-blue"
  | "terminal"
  | "warm"
  | "product"
  | "cyberpunk"
  | "nordic"
  | "brutalist"
  | "aurora"
  | "swiss"
  | "synthwave"
  | "academic"
  | "bento"
  | "luxe"
  | "retro-os";

export type TemplateCategory =
  | "ALL"
  | "DEVELOPER"
  | "PROFESSIONAL"
  | "DESIGNER"
  | "TECHNOLOGY"
  | "MINIMAL"
  | "CREATIVE";
