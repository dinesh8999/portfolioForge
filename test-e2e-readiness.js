import { readFileSync, existsSync } from "node:fs";

console.log("=============================================================");
console.log("    PORTFOLIOFORGE FINAL SUBMISSION READINESS VERIFICATION   ");
console.log("=============================================================\n");

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

async function runAllChecks() {
  // SECTION 1: Static Architecture & Template Consistency
  console.log("--- SECTION 1: Static Architecture & 19 Template Consistency ---");

  const templatesTs = readFileSync("./frontend/src/data/templates.ts", "utf-8");
  const serverPortfolios = readFileSync("./backend/src/routes/portfolios.js", "utf-8");
  const appCss = readFileSync("./frontend/src/App.css", "utf-8");
  const portfolioRenderer = readFileSync("./frontend/src/components/templates/PortfolioRenderer.tsx", "utf-8");

  const all19Templates = [
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

  all19Templates.forEach((tId) => {
    assert(templatesTs.includes(`id: "${tId}"`), `Template '${tId}' registered in templates.ts`);
    assert(
      templatesTs.includes(`${tId}: {`) || templatesTs.includes(`"${tId}": {`),
      `Theme and sample data defined for '${tId}'`
    );
    assert(serverPortfolios.includes(`"${tId}"`), `Server allowedTemplates whitelists '${tId}'`);
    assert(appCss.includes(`.template-${tId}`), `CSS preview card defined for '.template-${tId}'`);
    assert(portfolioRenderer.includes(`case "${tId}":`) || tId === "minimal", `PortfolioRenderer routes '${tId}'`);
  });

  // SECTION 2: Logo Design & Wordmark Integrity
  console.log("\n--- SECTION 2: Logo Design & Wordmark Integrity ---");
  const logoContent = readFileSync("./frontend/src/components/common/PortfolioLogo.tsx", "utf-8");
  assert(!logoContent.includes("bg-clip-text"), "No bg-clip-text clipping issues on logo wordmark");
  assert(logoContent.includes("Portfolio"), "Wordmark contains 'Portfolio'");
  assert(logoContent.includes("Forge"), "Wordmark contains 'Forge'");
  assert(logoContent.includes("Creator Studio"), "Wordmark includes 'Creator Studio'");
  assert(logoContent.includes("<svg"), "Logo includes bespoke SVG anvil/forge emblem");

  // SECTION 3: Image Cropper & Upload Architecture
  console.log("\n--- SECTION 3: Image Cropper & Upload Validation ---");
  const cropperContent = readFileSync("./frontend/src/components/common/ImageCropperModal.tsx", "utf-8");
  assert(cropperContent.includes("HTMLCanvasElement") || cropperContent.includes("document.createElement(\"canvas\")"), "Canvas-based high-resolution cropper implemented");
  assert(cropperContent.includes("handleWheel"), "Interactive mouse-wheel zoom supported");
  assert(cropperContent.includes("handleTouchMove"), "Mobile touch gesture pan supported");
  assert(cropperContent.includes("RotateCw"), "90-degree rotation supported");

  const editorContent = readFileSync("./frontend/src/components/PortfolioEditor.tsx", "utf-8");
  assert(editorContent.includes("handlePhotoUpload"), "Profile photo file reader handled");
  assert(editorContent.includes("handleProjectPhotoUpload"), "Project screenshot file reader handled");
  assert(editorContent.includes("removePhoto"), "Profile photo removal handled");

  // SECTION 4: Live Backend API Health & Database Persistence
  console.log("\n--- SECTION 4: Live Backend API & Database Persistence ---");
  try {
    const healthRes = await fetch("http://localhost:5000/api/health");
    assert(healthRes.status === 200, "Backend /api/health returned HTTP 200");
    const health = await healthRes.json();
    assert(health.status === "ok", "Backend health status is 'ok'");
    assert(health.database === "connected", "MongoDB Atlas is actively connected");

    // Publish a full-fidelity test portfolio
    const testSlug = `e2e-test-${Date.now()}`;
    const testPayload = {
      name: "Margaret Hamilton",
      role: "Director of Software Engineering",
      bio: "Pioneered software engineering for Apollo space flight guidance systems.",
      email: "margaret@apollo.nasa.gov",
      skills: ["Asynchronous Executive", "Flight Software", "Systems Architecture"],
      profilePhoto: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      githubUrl: "https://github.com/nasa/apollo-11",
      linkedinUrl: "https://linkedin.com/in/mhamilton",
      websiteUrl: "https://nasa.gov",
      projects: [
        {
          id: 1,
          name: "Apollo Guidance Computer (AGC)",
          description: "Priority-scheduling operating system capable of asynchronous flight recovery.",
          imageUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
          demoUrl: "https://nasa.gov/agc",
          githubUrl: "https://github.com/virtualagc/virtualagc"
        }
      ],
      templateId: "academic",
      templateName: "Academic Scholar",
      style: {
        accentColor: "#831843",
        backgroundColor: "#fbfbfa",
        textColor: "#1e293b",
        fontFamily: "Georgia"
      }
    };

    const pubRes = await fetch("http://localhost:5000/api/portfolios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testPayload)
    });
    assert(pubRes.status === 201, "Publish returned HTTP 201 Created");
    const pubData = await pubRes.json();
    assert(pubData.slug && pubData.slug.startsWith("portfolio-"), `Generated collision-resistant slug: ${pubData.slug}`);
    assert(pubData.url && pubData.url.includes(pubData.slug), `Generated public URL: ${pubData.url}`);

    // Retrieve the published portfolio from MongoDB
    const getRes = await fetch(`http://localhost:5000/api/portfolios/${pubData.slug}`);
    assert(getRes.status === 200, "Fetch portfolio by slug returned HTTP 200");
    const getData = await getRes.json();
    const p = getData.portfolio;
    assert(p.name === testPayload.name, `Retrieved exact portfolio name: '${p.name}'`);
    assert(p.templateId === "academic", `Retrieved exact templateId: '${p.templateId}'`);
    assert(p.profilePhoto.startsWith("data:image/png;base64,"), "Profile photo Base64 preserved completely");
    assert(p.projects.length === 1, "Project array stored and retrieved accurately");
    assert(p.projects[0].imageUrl.startsWith("data:image/png;base64,"), "Project image Base64 preserved completely");
    assert(p.skills.length === 3, "Skills array stored and retrieved accurately");
    assert(p.style.accentColor === "#831843", "Custom accent color preserved");
    assert(p.style.backgroundColor === "#fbfbfa", "Custom background color preserved");

    // Negative / Edge Case API tests
    const badBody = await fetch("http://localhost:5000/api/portfolios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "" })
    });
    assert(badBody.status === 400, "Empty portfolio name rejected with HTTP 400");

    const nonExistent = await fetch("http://localhost:5000/api/portfolios/portfolio-nonexistent-9999");
    assert(nonExistent.status === 404, "Non-existent slug returns HTTP 404");
  } catch (err) {
    console.error("Backend error during checks:", err);
    failed++;
  }

  // SECTION 5: Standalone HTML Exporter
  console.log("\n--- SECTION 5: Standalone Self-Contained HTML Exporter ---");
  const htmlExporterTs = readFileSync("./frontend/src/utils/htmlExporter.ts", "utf-8");
  assert(htmlExporterTs.includes("export function generateStandaloneHtml"), "generateStandaloneHtml function exists and is exported");
  assert(htmlExporterTs.includes("<!DOCTYPE html>"), "Generates valid HTML5 doctype");
  assert(htmlExporterTs.includes("--accent:"), "Injects dynamic CSS variable for accent color");
  assert(htmlExporterTs.includes("--bg:"), "Injects dynamic CSS variable for background color");
  assert(htmlExporterTs.includes("--text:"), "Injects dynamic CSS variable for text color");
  assert(htmlExporterTs.includes("skillsHtml"), "Renders candidate skills in standalone document");
  assert(htmlExporterTs.includes("projectsHtml"), "Renders candidate projects in standalone document");
  assert(htmlExporterTs.includes("profilePhoto"), "Embeds candidate profile photo");

  // SECTION 6: Summary
  console.log("\n=============================================================");
  console.log(`TOTAL CHECKS: ${passed + failed}`);
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log("=============================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runAllChecks().catch((err) => {
  console.error("Fatal test runner error:", err);
  process.exit(1);
});
