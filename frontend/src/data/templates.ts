import type { PortfolioData, PortfolioStyle } from "../types/portfolio";

export type PortfolioTemplate = {
  id: string;
  name: string;
  category: string;
  description: string;
  initials: string;
  style:
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
};

export const templates: PortfolioTemplate[] = [
  // --- Original 9 Professional Templates ---
  {
    id: "minimal",
    name: "The Minimalist",
    category: "DEVELOPER",
    description: "Clean layouts, generous whitespace, and confident typography.",
    initials: "JD",
    style: "minimal",
  },
  {
    id: "executive",
    name: "The Executive",
    category: "PROFESSIONAL",
    description: "A prestigious presentation tailored for leaders and directors.",
    initials: "AK",
    style: "executive",
  },
  {
    id: "creative",
    name: "The Creative",
    category: "DESIGNER",
    description: "Express your artistic vision with bold asymmetrical flair.",
    initials: "SR",
    style: "creative",
  },
  {
    id: "neon",
    name: "Neon Tech",
    category: "TECHNOLOGY",
    description: "A futuristic cyberpunk look with luminous glowing accents.",
    initials: "NT",
    style: "neon",
  },
  {
    id: "editorial",
    name: "The Editorial",
    category: "PERSONAL BRAND",
    description: "Refined magazine typography and elegant archival layouts.",
    initials: "ED",
    style: "editorial",
  },
  {
    id: "modern-blue",
    name: "Modern Blue",
    category: "SOFTWARE ENGINEER",
    description: "A crisp ice-blue engineering portfolio with clean metrics.",
    initials: "MB",
    style: "modern-blue",
  },
  {
    id: "terminal",
    name: "Terminal Pro",
    category: "BACKEND DEVELOPER",
    description: "Retro phosphor-green terminal console with bash prompts.",
    initials: "TP",
    style: "terminal",
  },
  {
    id: "warm",
    name: "Warm Studio",
    category: "CREATIVE PORTFOLIO",
    description: "Cozy sunlit amber hues and friendly rounded organic cards.",
    initials: "WS",
    style: "warm",
  },
  {
    id: "product",
    name: "Product Designer",
    category: "UI/UX DESIGN",
    description: "Lavish case study presentation designed for product thinkers.",
    initials: "PD",
    style: "product",
  },

  // --- 10 NEW Next-Gen Templates ---
  {
    id: "cyberpunk",
    name: "Cyberpunk 2099",
    category: "TECHNOLOGY",
    description: "High-octane neon glitch aesthetics with HUD telemetry tags.",
    initials: "RX",
    style: "cyberpunk",
  },
  {
    id: "nordic",
    name: "Nordic Fjord",
    category: "DEVELOPER",
    description: "Scandinavian slate minimalism with airy calm architectural grids.",
    initials: "EL",
    style: "nordic",
  },
  {
    id: "brutalist",
    name: "Neo-Brutalist",
    category: "DESIGNER",
    description: "Bold 4px solid borders, offset drop shadows, and acid lime badges.",
    initials: "MK",
    style: "brutalist",
  },
  {
    id: "aurora",
    name: "Aurora Spectrum",
    category: "TECHNOLOGY",
    description: "Deep space glassmorphism infused with ambient radiant mesh glows.",
    initials: "SL",
    style: "aurora",
  },
  {
    id: "swiss",
    name: "Swiss International",
    category: "DESIGNER",
    description: "Rigorous modernist grid system with stark vermilion red accents.",
    initials: "HM",
    style: "swiss",
  },
  {
    id: "synthwave",
    name: "Synthwave Sunset",
    category: "CREATIVE PORTFOLIO",
    description: "80s retro wave neon purple horizons and laser arcade energy.",
    initials: "DR",
    style: "synthwave",
  },
  {
    id: "academic",
    name: "Academic Scholar",
    category: "PROFESSIONAL",
    description: "Scholarly CV format with thesis citations and Oxford navy accents.",
    initials: "AT",
    style: "academic",
  },
  {
    id: "bento",
    name: "Modern Bento",
    category: "SOFTWARE ENGINEER",
    description: "Apple-inspired modular bento box grid with smooth dark finishes.",
    initials: "LC",
    style: "bento",
  },
  {
    id: "luxe",
    name: "Luxe Atelier",
    category: "PERSONAL BRAND",
    description: "Haute couture monochrome with timeless editorial serif typography.",
    initials: "VL",
    style: "luxe",
  },
  {
    id: "retro-os",
    name: "Retro OS 95",
    category: "DEVELOPER",
    description: "Nostalgic 90s desktop windows, beveled borders, and vintage title bars.",
    initials: "SZ",
    style: "retro-os",
  },
];

/**
 * Authentic visual themes for all 19 templates.
 */
export const templateThemes: Record<PortfolioTemplate["style"], PortfolioStyle> = {
  // Original 9
  minimal: {
    accentColor: "#18181b",
    backgroundColor: "#f4f4f2",
    textColor: "#1a1a1a",
    fontFamily: "Inter, sans-serif",
  },
  executive: {
    accentColor: "#d4af37",
    backgroundColor: "#0d121c",
    textColor: "#f7f5f0",
    fontFamily: "Georgia, Cambria, serif",
  },
  creative: {
    accentColor: "#b84323",
    backgroundColor: "#fdf2ec",
    textColor: "#3b1d16",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  neon: {
    accentColor: "#00f2fe",
    backgroundColor: "#060b12",
    textColor: "#e2f8ff",
    fontFamily: "ui-monospace, SFMono-Regular, monospace",
  },
  editorial: {
    accentColor: "#8c6d48",
    backgroundColor: "#fdfbf7",
    textColor: "#1f1d1b",
    fontFamily: "Georgia, Cambria, 'Times New Roman', serif",
  },
  "modern-blue": {
    accentColor: "#2563eb",
    backgroundColor: "#f0f7ff",
    textColor: "#0f172a",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  terminal: {
    accentColor: "#10b981",
    backgroundColor: "#09110d",
    textColor: "#a7f3d0",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
  warm: {
    accentColor: "#c2410c",
    backgroundColor: "#fef3c7",
    textColor: "#451a03",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  product: {
    accentColor: "#7c3aed",
    backgroundColor: "#f5f3ff",
    textColor: "#2e1065",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  // 10 New Templates
  cyberpunk: {
    accentColor: "#00ff66",
    backgroundColor: "#020408",
    textColor: "#f0fdf4",
    fontFamily: "ui-monospace, SFMono-Regular, monospace",
  },
  nordic: {
    accentColor: "#0284c7",
    backgroundColor: "#f8fafc",
    textColor: "#0f172a",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  brutalist: {
    accentColor: "#ccff00",
    backgroundColor: "#fffdf0",
    textColor: "#000000",
    fontFamily: "Impact, system-ui, sans-serif",
  },
  aurora: {
    accentColor: "#38bdf8",
    backgroundColor: "#070913",
    textColor: "#f8fafc",
    fontFamily: "Inter, sans-serif",
  },
  swiss: {
    accentColor: "#dc2626",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
  },
  synthwave: {
    accentColor: "#ec4899",
    backgroundColor: "#130924",
    textColor: "#fae8ff",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  academic: {
    accentColor: "#831843",
    backgroundColor: "#fbfbfa",
    textColor: "#1e293b",
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
  bento: {
    accentColor: "#f59e0b",
    backgroundColor: "#09090b",
    textColor: "#f4f4f5",
    fontFamily: "Inter, -apple-system, sans-serif",
  },
  luxe: {
    accentColor: "#e2e8f0",
    backgroundColor: "#050505",
    textColor: "#ffffff",
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
  "retro-os": {
    accentColor: "#000080",
    backgroundColor: "#008080",
    textColor: "#000000",
    fontFamily: "'Courier New', Courier, monospace",
  },
};

export function getTemplateTheme(styleOrId: string): PortfolioStyle {
  const key = styleOrId.toLowerCase() as PortfolioTemplate["style"];
  return templateThemes[key] || templateThemes.minimal;
}

/**
 * Persona-tailored sample portfolios that align 100% with the landing page initials and slogans.
 */
export const templateSamplePortfolios: Record<PortfolioTemplate["style"], PortfolioData> = {
  // 1. Minimal
  minimal: {
    name: "Jordan Davis",
    role: "Minimalist Software Engineer",
    bio: "Designing simple, reliable web systems with high clarity, minimal dependency overhead, and low cognitive complexity.",
    email: "jordan.davis@example.com",
    skills: "TypeScript, React, Node.js, REST APIs, PostgreSQL, Docker, Vitest",
    profilePhoto: "",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    websiteUrl: "https://example.com",
    projects: [
      {
        id: 1,
        name: "Clarity Design Core",
        description: "Zero-dependency CSS micro-framework focused on accessibility and ultra-fast paint performance.",
        imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/clarity",
        githubUrl: "https://github.com/example/clarity",
      },
      {
        id: 2,
        name: "Streamlined Task Engine",
        description: "High-throughput asynchronous job worker with predictable linear resource utilization.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/tasks",
        githubUrl: "https://github.com/example/tasks",
      },
    ],
  },

  // 2. Executive
  executive: {
    name: "Alexander Knight",
    role: "Executive Technology Director",
    bio: "Over 15 years transforming enterprise infrastructure, modernizing legacy architectures, and scaling high-performing distributed engineering organizations.",
    email: "a.knight@example.com",
    skills: "Strategic Architecture, Cloud Governance, Kubernetes, SOC2 Compliance, Distributed Systems, FinOps",
    profilePhoto: "",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    websiteUrl: "https://example.com",
    projects: [
      {
        id: 1,
        name: "Enterprise Multi-Cloud Transformation",
        description: "Orchestrated unified hybrid cloud migration across 14 global data centers, reducing infrastructure costs by 38%.",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/cloud",
        githubUrl: "https://github.com",
      },
      {
        id: 2,
        name: "Mission-Critical Resiliency Mesh",
        description: "Zero-trust service mesh handling 500M+ secure transactions daily with five-nines uptime reliability.",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/mesh",
        githubUrl: "https://github.com",
      },
    ],
  },

  // 3. Creative
  creative: {
    name: "Sasha Rivera",
    role: "Art Director & Creative Technologist",
    bio: "Crafting bold interactive digital experiences, tactile design systems, and generative web installations at the intersection of art and engineering.",
    email: "sasha@creative.studio",
    skills: "Creative Direction, Three.js, WebGL, Interactive Prototypes, GSAP, UI Architecture, Typography",
    profilePhoto: "",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    websiteUrl: "https://example.com",
    projects: [
      {
        id: 1,
        name: "Chromatic Sound Sculptures",
        description: "Real-time audio-reactive 3D generative visuals rendering fluid geometry in browser with WebGL.",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/sound",
        githubUrl: "https://github.com/example/sound",
      },
      {
        id: 2,
        name: "Kinetic Editorial Magazine",
        description: "Experimental digital publication celebrating contemporary type design with fluid physics-based interactions.",
        imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/kinetic",
        githubUrl: "https://github.com/example/kinetic",
      },
    ],
  },

  // 4. Neon
  neon: {
    name: "Nova Tanaka",
    role: "Cybersecurity & Web3 Architect",
    bio: "Building next-generation cryptographic networks, real-time threat intelligence engines, and high-throughput zero-knowledge verification protocols.",
    email: "nova@cyberspace.dev",
    skills: "Zero Knowledge Proofs, Rust, Solidity, Threat Hunting, WebSockets, High-Concurrency APIs, Linux Kernel",
    profilePhoto: "",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    websiteUrl: "https://example.com",
    projects: [
      {
        id: 1,
        name: "QuantumShield Cryptex",
        description: "Post-quantum lattice cryptographic vault guaranteeing multi-party state protection for sovereign data.",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/shield",
        githubUrl: "https://github.com/example/shield",
      },
      {
        id: 2,
        name: "HyperMatrix Observability",
        description: "Cyber threat radar monitoring decentralized nodes with predictive heuristic anomaly detection.",
        imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/matrix",
        githubUrl: "https://github.com/example/matrix",
      },
    ],
  },

  // 5. Editorial
  editorial: {
    name: "Elena Dubois",
    role: "Editorial Writer & Brand Strategist",
    bio: "Writing thoughtful essays on technology culture, authoring design literature, and helping category-defining technology brands articulate their long-term vision.",
    email: "elena@dubois.press",
    skills: "Editorial Direction, Brand Voice, Technical Journalism, Design Critique, Narrative Architecture, Publishing",
    profilePhoto: "",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    websiteUrl: "https://example.com",
    projects: [
      {
        id: 1,
        name: "The Architecture of Thought",
        description: "A published monograph examining how contemporary software tooling reshapes creative problem-solving.",
        imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/thought",
        githubUrl: "https://github.com",
      },
      {
        id: 2,
        name: "Perspectives Quarterly",
        description: "Curated long-form cultural publication featuring essays from leading philosophers, engineers, and typographers.",
        imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/perspectives",
        githubUrl: "https://github.com",
      },
    ],
  },

  // 6. Modern Blue
  "modern-blue": {
    name: "Marcus Bennett",
    role: "Senior Full-Stack Engineer",
    bio: "Building scalable cloud-native architectures, distributed microservices, and high-performance React frontends with focus on latency and ergonomics.",
    email: "marcus.bennett@example.com",
    skills: "React 19, TypeScript, Next.js, Node.js, GraphQL, PostgreSQL, Redis, AWS Lambda, Tailwind CSS",
    profilePhoto: "",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    websiteUrl: "https://example.com",
    projects: [
      {
        id: 1,
        name: "Distributed Real-time Telemetry",
        description: "Observability pipeline processing millions of event streams daily with sub-second alert latency.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/telemetry",
        githubUrl: "https://github.com/example/telemetry",
      },
      {
        id: 2,
        name: "Design System & Component Library",
        description: "An accessible multi-brand design tokens architecture powering 40+ engineering teams.",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/ds",
        githubUrl: "https://github.com/example/design-system",
      },
    ],
  },

  // 7. Terminal
  terminal: {
    name: "Toby Parker",
    role: "Backend & Systems Engineer",
    bio: "Low-level system programming, Linux kernel optimization, high-throughput distributed database clustering, and observability pipelines.",
    email: "toby@kernel.sys",
    skills: "Go, Rust, C++, Kubernetes, Kafka, Prometheus, Linux eBPF, gRPC, Distributed Consensus",
    profilePhoto: "",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    websiteUrl: "https://example.com",
    projects: [
      {
        id: 1,
        name: "eBPF Packet Inspector",
        description: "High-performance programmable kernel bypass packet capture system analyzing 10Gbps line-rate flows.",
        imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/ebpf",
        githubUrl: "https://github.com/example/ebpf",
      },
      {
        id: 2,
        name: "Raft Consensus Key-Value Store",
        description: "ACID-compliant distributed consensus storage engine designed for geo-replicated state machines.",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/raft",
        githubUrl: "https://github.com/example/raft",
      },
    ],
  },

  // 8. Warm
  warm: {
    name: "Will Sterling",
    role: "Warm Artisan & Product Crafter",
    bio: "Handcrafting intentional, human-centered digital spaces with warmth, joy, and thoughtful detail. Making technology feel cozy, welcoming, and intuitive.",
    email: "will@warmstudio.craft",
    skills: "Interaction Design, Design Systems, Accessible Frontends, Micro-interactions, Svelte, Animation, Crafting",
    profilePhoto: "",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    websiteUrl: "https://example.com",
    projects: [
      {
        id: 1,
        name: "Mindful Moments Journal",
        description: "A calming, warm, offline-first personal reflection space focused on mindful habits and tranquil typography.",
        imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/mindful",
        githubUrl: "https://github.com/example/mindful",
      },
      {
        id: 2,
        name: "Artisan Coffee Roasters Collective",
        description: "E-commerce and sensory brewing experience connecting independent specialty roasters with craft coffee lovers.",
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/roasters",
        githubUrl: "https://github.com/example/roasters",
      },
    ],
  },

  // 9. Product
  product: {
    name: "Penny Daniels",
    role: "Lead Product & UI/UX Designer",
    bio: "Leading end-to-end product design from generative user research to pixel-perfect component systems for complex B2B SaaS platforms.",
    email: "penny.daniels@designcraft.io",
    skills: "Product Strategy, User Research, Wireframing, Figma Master, Rapid Prototyping, Usability Testing, Metric Analytics",
    profilePhoto: "",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    websiteUrl: "https://example.com",
    projects: [
      {
        id: 1,
        name: "FlowMetrics Enterprise Analytics",
        description: "Redesigned complex data analytics suite resulting in a 42% decrease in onboarding churn and NPS score increase.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/flowmetrics",
        githubUrl: "https://github.com",
      },
      {
        id: 2,
        name: "Pulse Mobile Health Companion",
        description: "Accessible, patient-first telemetry tracking health habits with compassionate micro-copy and clean charts.",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/pulse",
        githubUrl: "https://github.com",
      },
    ],
  },

  // 10. Cyberpunk
  cyberpunk: {
    name: "Raven Cross",
    role: "Offensive Security & Web3 Engineer",
    bio: "Exploiting zero-day vulnerabilities, breaking smart contract invariants, and hardening decentralized telemetry over encrypted mesh channels.",
    email: "rx@darknet.io",
    skills: "Reverse Engineering, EVM Bytecode, Rust, Cryptanalysis, Metasploit, Subzero Ops, Linux Kernel",
    profilePhoto: "",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    websiteUrl: "https://example.com",
    projects: [
      {
        id: 1,
        name: "ZeroDay Invariant Fuzzer",
        description: "Distributed bytecode fuzzer executing 40,000 symbolic traces per second to expose smart contract reentrancy bugs.",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/fuzzer",
        githubUrl: "https://github.com/example/fuzzer",
      },
      {
        id: 2,
        name: "ShadowMesh Ephemeral Node",
        description: "P2P peer discovery mesh with onion-routing relays guaranteeing untraceable node-to-node packets.",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/shadow",
        githubUrl: "https://github.com/example/shadow",
      },
    ],
  },

  // 11. Nordic
  nordic: {
    name: "Erik Lindqvist",
    role: "Architectural Software Engineer",
    bio: "Scandinavian design principles applied to distributed software. Uncompromising clarity, calm interfaces, and functional elegance.",
    email: "erik@fjordcode.se",
    skills: "TypeScript, Go, React, Distributed Storage, Clean Architecture, High-Fidelity UI, PostgreSQL",
    profilePhoto: "",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    websiteUrl: "https://example.com",
    projects: [
      {
        id: 1,
        name: "Fjord Spatial Editor",
        description: "Lightweight canvas engine built for architects and industrial product designers with real-time vector constraints.",
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/fjord",
        githubUrl: "https://github.com/example/fjord",
      },
      {
        id: 2,
        name: "Klarhet Metrics Monitor",
        description: "Minimalist server health dashboard stripping away vanity metrics to highlight actionable system bottlenecks.",
        imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/klarhet",
        githubUrl: "https://github.com/example/klarhet",
      },
    ],
  },

  // 12. Brutalist
  brutalist: {
    name: "Max Kowalski",
    role: "Creative Coder & Interface Rebel",
    bio: "Rejecting cookie-cutter corporate flat design. Building loud, tactile, high-contrast digital experiences with physics and attitude.",
    email: "max@neobrutal.dev",
    skills: "Creative Coding, WebGL, Three.js, CSS Architecture, Canvas API, Interactive Typography, GSAP",
    profilePhoto: "",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    websiteUrl: "https://example.com",
    projects: [
      {
        id: 1,
        name: "HyperPop Synth Radio",
        description: "Experimental browser synthesizer with chunky physical dials, generative audio loops, and reactive neon visualizers.",
        imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/hyperpop",
        githubUrl: "https://github.com/example/hyperpop",
      },
      {
        id: 2,
        name: "Anti-Design Sticker Book",
        description: "Interactive draggable canvas with 500+ procedural vector stickers, physics collisions, and export to SVG.",
        imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/stickers",
        githubUrl: "https://github.com/example/stickers",
      },
    ],
  },

  // 13. Aurora
  aurora: {
    name: "Sophia Lin",
    role: "AI Interaction & ML Researcher",
    bio: "Pioneering fluid human-AI interfaces, multimodal generative models, and luminous spatial interaction paradigms.",
    email: "sophia@aurora-ai.dev",
    skills: "Python, PyTorch, React, WebGPU, Latent Space Vis, Transformer Models, Tailwind CSS",
    profilePhoto: "",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    websiteUrl: "https://example.com",
    projects: [
      {
        id: 1,
        name: "LatentFlow Visualizer",
        description: "Real-time WebGPU tool visualizing high-dimensional tensor weights and attention mechanisms during live inference.",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/latentflow",
        githubUrl: "https://github.com/example/latentflow",
      },
      {
        id: 2,
        name: "Aurora Multimodal Canvas",
        description: "Infinite collaborative workspace combining natural language prompts, image generation, and vector layout synthesis.",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/canvas",
        githubUrl: "https://github.com/example/canvas",
      },
    ],
  },

  // 14. Swiss
  swiss: {
    name: "Hans Mueller",
    role: "Design Systems & Typographic Architect",
    bio: "Adhering to the Josef Müller-Brockmann tradition. Strict modular grid structures, mathematical rhythm, and timeless typographic hierarchy.",
    email: "hans@grid-system.ch",
    skills: "Design Systems, Micro-typography, React, CSS Grid, Design Tokens, Accessibility, Component Libraries",
    profilePhoto: "",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    websiteUrl: "https://example.com",
    projects: [
      {
        id: 1,
        name: "Zurich Modular Design System",
        description: "Strict 8pt typographic scale component library used by Swiss financial institutions with WCAG AAA compliance.",
        imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/zurich",
        githubUrl: "https://github.com/example/zurich",
      },
      {
        id: 2,
        name: "Raster Graphic Layout Calculator",
        description: "Browser utility generating optimal column ratios, baseline grids, and modular scales for editorial print and web.",
        imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/raster",
        githubUrl: "https://github.com/example/raster",
      },
    ],
  },

  // 15. Synthwave
  synthwave: {
    name: "Dax Ryder",
    role: "Game Engine & Graphics Developer",
    bio: "Crafting real-time shaders, 3D game engines, and immersive interactive graphics soaked in 80s arcade neon nostalgia.",
    email: "dax@synthwave.dev",
    skills: "C++, Vulkan, HLSL/GLSL, Unity, Unreal Engine, WebGL, Real-time Audio, Raymarching",
    profilePhoto: "",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    websiteUrl: "https://example.com",
    projects: [
      {
        id: 1,
        name: "NeonOutrun Voxel Engine",
        description: "Custom C++ pseudo-3D rasterizer rendering infinite neon highways at 144 FPS on mobile and browser targets.",
        imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/outrun",
        githubUrl: "https://github.com/example/outrun",
      },
      {
        id: 2,
        name: "CyberGrid Shader Pack",
        description: "Open-source collection of 40+ retro-futuristic CRT scanline, laser horizon, and glowing chromatic aberration shaders.",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/shaders",
        githubUrl: "https://github.com/example/shaders",
      },
    ],
  },

  // 16. Academic
  academic: {
    name: "Dr. Aris Thorne",
    role: "Senior AI Researcher & Data Scientist",
    bio: "Postdoctoral fellow exploring causal inference, probabilistic graphical models, and neural algorithmic reasoning with 20+ peer-reviewed papers.",
    email: "a.thorne@oxford-research.edu",
    skills: "Causal Inference, Bayesian Stats, Python, R, LaTeX, Graph Neural Nets, High-Performance Computing",
    profilePhoto: "",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    websiteUrl: "https://example.com",
    projects: [
      {
        id: 1,
        name: "CausalBench: Benchmark for Causal Discovery",
        description: "Comprehensive benchmark suite evaluating algorithmic causality against 50,000 biological intervention graphs (NeurIPS '25).",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/causalbench",
        githubUrl: "https://github.com/example/causalbench",
      },
      {
        id: 2,
        name: "GraphMarkov Distributed Solvers",
        description: "Open-source C++ library for belief propagation over million-node sparse graphs with GPU-accelerated tensor kernels.",
        imageUrl: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/markov",
        githubUrl: "https://github.com/example/markov",
      },
    ],
  },

  // 17. Bento
  bento: {
    name: "Lucas Chen",
    role: "Staff Mobile & iOS Engineer",
    bio: "Obsessed with 120Hz micro-interactions, haptics, and clean Swift architectures. Crafting flagship mobile experiences enjoyed by millions.",
    email: "lucas@chen.build",
    skills: "Swift, SwiftUI, Combine, Metal, React Native, Mobile Security, CoreData, Performance Profiling",
    profilePhoto: "",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    websiteUrl: "https://example.com",
    projects: [
      {
        id: 1,
        name: "Orbit Haptic Habit Tracker",
        description: "Award-winning iOS app featuring custom spatial audio cues, dynamic island live activities, and zero-latency widget sync.",
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/orbit",
        githubUrl: "https://github.com/example/orbit",
      },
      {
        id: 2,
        name: "SwiftUI Metal Particle System",
        description: "Lightweight GPU particle emitter rendering interactive fluid embers with zero dropped frames on battery saver mode.",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/particles",
        githubUrl: "https://github.com/example/particles",
      },
    ],
  },

  // 18. Luxe
  luxe: {
    name: "Valerie Laurent",
    role: "Luxury Brand Director & Digital Atelier",
    bio: "Directing high-fashion digital experiences for European luxury maisons. Championing pure typography, sensory minimalism, and bespoke digital craft.",
    email: "valerie@laurent-atelier.fr",
    skills: "Luxury Branding, Creative Direction, Editorial Curation, Haute Couture UI, Typography, Film Art Direction",
    profilePhoto: "",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    websiteUrl: "https://example.com",
    projects: [
      {
        id: 1,
        name: "Maison Lumière Digital Flagship",
        description: "Immersive 3D couture showcase offering high-resolution fabric draping and bespoke client consultation salons.",
        imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/lumiere",
        githubUrl: "https://github.com",
      },
      {
        id: 2,
        name: "Édition Noire Chronometer Retrospective",
        description: "A sensory horizontal scroll archive exploring 150 years of Swiss high-horology craftsmanship and mechanical escapements.",
        imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/noire",
        githubUrl: "https://github.com",
      },
    ],
  },

  // 19. Retro OS
  "retro-os": {
    name: "Sam Zissou",
    role: "Full-Stack Nostalgia Engineer",
    bio: "Recreating the wonder of computing's golden era. Desktop windows, 16-color dithering, MIDI chiptunes, and handcrafted web standards.",
    email: "sam@win95.retro",
    skills: "Classic Web APIs, Canvas, MIDI Web Audio, Pixel Art, Assembly x86, CSS 3D Transforms, WebSockets",
    profilePhoto: "",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    websiteUrl: "https://example.com",
    projects: [
      {
        id: 1,
        name: "WebDesktop 95 Emulator",
        description: "Full in-browser virtual desktop environment complete with draggable windows, file explorer, Minesweeper, and paint app.",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/win95",
        githubUrl: "https://github.com/example/win95",
      },
      {
        id: 2,
        name: "Chiptune FM Synthesizer",
        description: "WebAudio polyphonic OPL3 Yamaha chip emulator playing classic DOS game soundtracks with authentic distortion.",
        imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
        demoUrl: "https://example.com/chiptune",
        githubUrl: "https://github.com/example/chiptune",
      },
    ],
  },
};

export function getTemplateSampleData(styleOrId: string): PortfolioData {
  const key = styleOrId.toLowerCase() as PortfolioTemplate["style"];
  return templateSamplePortfolios[key] || templateSamplePortfolios.minimal;
}
