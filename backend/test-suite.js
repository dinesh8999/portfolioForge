import dotenv from "dotenv";
import mongoose from "mongoose";
import Portfolio from "./src/models/Portfolio.js";

dotenv.config();

const BASE_URL = `http://localhost:${process.env.PORT || 5000}`;

async function runTests() {
  console.log("=========================================");
  console.log("   PORTFOLIOFORGE BACKEND TEST SUITE     ");
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

  // 1. Health check
  console.log("--- 1. Testing GET /api/health ---");
  try {
    const res = await fetch(`${BASE_URL}/api/health`);
    const data = await res.json();
    assert(res.status === 200, `Health check HTTP 200 (got ${res.status})`);
    assert(data.status === "ok" || data.status === "degraded", `Health status is ok/degraded: ${data.status}`);
    assert(data.database === "connected", `Database reported connected: ${data.database}`);
  } catch (err) {
    assert(false, `Health check failed: ${err.message}`);
  }

  // 2. Publish portfolio with Base64 Profile Photo & Project Image
  console.log("\n--- 2. Testing POST /api/portfolios with Base64 Profile Photo & Projects ---");
  // 1x1 transparent PNG data URI
  const samplePhoto = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  const sampleProjectImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=";

  let createdSlug = "";

  try {
    const payload = {
      name: "Automated Test Engineer",
      role: "Lead QA Architect",
      bio: "Verifying production stability and resilience.",
      email: "qa@portfolioforge.dev",
      skills: ["Node.js", "Express", "MongoDB", "TypeScript", "React"],
      profilePhoto: samplePhoto,
      githubUrl: "https://github.com/portfolioforge",
      linkedinUrl: "https://linkedin.com/in/portfolioforge",
      websiteUrl: "https://portfolioforge.dev",
      templateId: "neon",
      templateName: "Neon Tech",
      style: {
        accentColor: "#00f2fe",
        backgroundColor: "#050b14",
        textColor: "#e2f8ff",
        fontFamily: "Courier New",
      },
      projects: [
        {
          id: 101,
          name: "Resilience Harness",
          description: "End-to-end integration testing suite.",
          imageUrl: sampleProjectImage,
          demoUrl: "https://demo.portfolioforge.dev",
          githubUrl: "https://github.com/portfolioforge/harness",
        },
      ],
    };

    const res = await fetch(`${BASE_URL}/api/portfolios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    assert(res.status === 201, `Publish returned HTTP 201 Created (got ${res.status})`);
    assert(data.slug && data.slug.startsWith("portfolio-"), `Slug generated: ${data.slug}`);
    assert(data.url && data.url.includes(data.slug), `Shareable URL returned: ${data.url}`);

    createdSlug = data.slug;
  } catch (err) {
    assert(false, `Publish failed: ${err.message}`);
  }

  // 3. Retrieve published portfolio by slug
  console.log("\n--- 3. Testing GET /api/portfolios/:slug ---");
  try {
    const res = await fetch(`${BASE_URL}/api/portfolios/${createdSlug}`);
    const data = await res.json();
    assert(res.status === 200, `GET /api/portfolios/:slug returned 200 (got ${res.status})`);
    assert(data.portfolio && data.portfolio.name === "Automated Test Engineer", "Retrieved portfolio name matches");
    assert(data.portfolio.templateId === "neon", `Template ID is preserved as 'neon' (got ${data.portfolio.templateId})`);

    // CRITICAL CHECK: Verify Profile Photo is NOT stripped!
    assert(
      data.portfolio.profilePhoto === samplePhoto,
      "CRITICAL: Base64 profile photo was preserved in MongoDB without being wiped!"
    );

    // Verify Project image is NOT stripped!
    assert(
      data.portfolio.projects[0].imageUrl === sampleProjectImage,
      "CRITICAL: Project image was preserved in MongoDB without being wiped!"
    );

    assert(data.portfolio.style.accentColor === "#00f2fe", `Accent color preserved: ${data.portfolio.style.accentColor}`);
  } catch (err) {
    assert(false, `Retrieve portfolio failed: ${err.message}`);
  }

  // 4. Test 404 on non-existent slug
  console.log("\n--- 4. Testing GET /api/portfolios/:slug for non-existent slug ---");
  try {
    const res = await fetch(`${BASE_URL}/api/portfolios/portfolio-nonexistent-12345`);
    assert(res.status === 404, `Non-existent slug returns 404 (got ${res.status})`);
  } catch (err) {
    assert(false, `404 check failed: ${err.message}`);
  }

  // 5. Test 400 on invalid slug format
  console.log("\n--- 5. Testing GET /api/portfolios/:slug for invalid slug characters ---");
  try {
    const res = await fetch(`${BASE_URL}/api/portfolios/invalid*slug$here`);
    assert(res.status === 400, `Invalid slug format returns 400 (got ${res.status})`);
  } catch (err) {
    assert(false, `Malformed slug check failed: ${err.message}`);
  }

  // 6. Test Validation Failure on Missing Name
  console.log("\n--- 6. Testing POST /api/portfolios validation rejection ---");
  try {
    const res = await fetch(`${BASE_URL}/api/portfolios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "   " }), // Blank name
    });
    assert(res.status === 400, `Blank name rejected with 400 Bad Request (got ${res.status})`);
  } catch (err) {
    assert(false, `Validation check failed: ${err.message}`);
  }

  // 7. Verify directly in MongoDB Atlas via Mongoose
  console.log("\n--- 7. Verifying directly in MongoDB Atlas ---");
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const doc = await Portfolio.findOne({ slug: createdSlug }).lean();
    assert(doc !== null, "Document exists in MongoDB Atlas collection");
    assert(doc?.profilePhoto === samplePhoto, "MongoDB Atlas document contains full profilePhoto");
    assert(doc?.templateId === "neon", "MongoDB Atlas document contains templateId");
    await mongoose.connection.close();
  } catch (err) {
    assert(false, `Direct MongoDB Atlas query failed: ${err.message}`);
  }

  console.log("\n=========================================");
  console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("=========================================\n");

  if (failed > 0) {
    process.exit(1);
  }
  process.exit(0);
}

runTests();

