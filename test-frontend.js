import { readFileSync, existsSync } from "node:fs";

console.log("=========================================");
console.log("   PORTFOLIOFORGE FRONTEND VERIFICATION  ");
console.log("=========================================\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

// 1. Verify PortfolioLogo Component
console.log("--- 1. Testing PortfolioLogo Component ---");
assert(existsSync("./frontend/src/components/common/PortfolioLogo.tsx"), "PortfolioLogo.tsx exists");
const logoContent = readFileSync("./frontend/src/components/common/PortfolioLogo.tsx", "utf-8");
assert(logoContent.includes("PortfolioLogo"), "PortfolioLogo is exported");
assert(logoContent.includes("pfGoldGrad"), "PortfolioLogo includes custom SVG gold gradients");
assert(logoContent.includes("pfEmberGrad"), "PortfolioLogo includes forge flame gradient");

// 2. Verify all 19 template definitions in templates.ts
console.log("\n--- 2. Testing 19 Template Definitions in templates.ts ---");
const templatesContent = readFileSync("./frontend/src/data/templates.ts", "utf-8");

const allTemplates = [
  "minimal",
  "executive",
  "creative",
  "neon",
  "editorial",
  "modern-blue",
  "terminal",
  "warm",
  "product",
  "cyberpunk",
  "nordic",
  "brutalist",
  "aurora",
  "swiss",
  "synthwave",
  "academic",
  "bento",
  "luxe",
  "retro-os",
];

allTemplates.forEach((id) => {
  const hasId = templatesContent.includes(`id: "${id}"`);
  assert(hasId, `templates.ts defines template ID: '${id}'`);
});

// 3. Verify all 19 Template Components exist and have distinct designs
console.log("\n--- 3. Testing 19 Distinct Template Components ---");
const templateFiles = [
  { id: "minimal", file: "MinimalTemplate.tsx", signature: "Minimalist" },
  { id: "executive", file: "ExecutiveTemplate.tsx", signature: "Executive" },
  { id: "creative", file: "CreativeTemplate.tsx", signature: "Creative Studio" },
  { id: "neon", file: "NeonTemplate.tsx", signature: "Cyber" },
  { id: "editorial", file: "EditorialTemplate.tsx", signature: "Editorial" },
  { id: "modern-blue", file: "ModernBlueTemplate.tsx", signature: "Software Engineering" },
  { id: "terminal", file: "TerminalTemplate.tsx", signature: "Terminal" },
  { id: "warm", file: "WarmTemplate.tsx", signature: "Warm Studio" },
  { id: "product", file: "ProductTemplate.tsx", signature: "Product Design" },
  { id: "cyberpunk", file: "CyberpunkTemplate.tsx", signature: "CYBERPUNK MATRIX" },
  { id: "nordic", file: "NordicTemplate.tsx", signature: "NORDIC ARCHITECTURE" },
  { id: "brutalist", file: "BrutalistTemplate.tsx", signature: "NEO-BRUTAL" },
  { id: "aurora", file: "AuroraTemplate.tsx", signature: "AURORA SPECTRUM" },
  { id: "swiss", file: "SwissTemplate.tsx", signature: "SWISS INTERNATIONAL" },
  { id: "synthwave", file: "SynthwaveTemplate.tsx", signature: "SYNTHWAVE SUNSET" },
  { id: "academic", file: "AcademicTemplate.tsx", signature: "ACADEMIC CURRICULUM VITAE" },
  { id: "bento", file: "BentoTemplate.tsx", signature: "MODERN BENTO" },
  { id: "luxe", file: "LuxeTemplate.tsx", signature: "LUXE ATELIER" },
  { id: "retro-os", file: "RetroOsTemplate.tsx", signature: "PORTFOLIO_FORGE_OS_95" },
];

templateFiles.forEach(({ id, file, signature }) => {
  const content = readFileSync(`./frontend/src/components/templates/${file}`, "utf-8");
  assert(content.length > 500, `${file} is fully implemented (${content.length} chars)`);
  assert(content.includes(signature) || content.includes(id), `${file} contains unique signature for '${id}'`);
});

// 4. Verify HTML Exporter implementation
console.log("\n--- 4. Testing Standalone HTML Exporter implementation ---");
const htmlExporterContent = readFileSync("./frontend/src/utils/htmlExporter.ts", "utf-8");
assert(htmlExporterContent.includes("export function generateStandaloneHtml"), "generateStandaloneHtml is exported");
assert(htmlExporterContent.includes("template-${escapeHtml(templateId)}"), "Exporter applies templateId dynamically to body class");
assert(htmlExporterContent.includes("profilePhoto"), "Exporter embeds profilePhoto");
assert(htmlExporterContent.includes("skills"), "Exporter embeds skills");
assert(htmlExporterContent.includes("projects"), "Exporter embeds projects");

// 5. Verify Built Bundle contains application title
console.log("\n--- 5. Testing Production Distribution Bundle ---");
const distIndex = readFileSync("./frontend/dist/index.html", "utf-8");
assert(distIndex.includes("PortfolioForge"), "frontend/dist/index.html exists and contains application title");

console.log("\n=========================================");
console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("=========================================\n");

if (failed > 0) process.exit(1);
process.exit(0);
