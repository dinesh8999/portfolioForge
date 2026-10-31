import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log("Starting server for test run...");
  const server = spawn("node", ["src/server.js"], {
    cwd: __dirname,
    stdio: ["ignore", "pipe", "pipe"],
  });

  server.stdout.on("data", (d) => {
    process.stdout.write(`[Server] ${d.toString()}`);
  });

  server.stderr.on("data", (d) => {
    process.stderr.write(`[Server Err] ${d.toString()}`);
  });

  // Poll until server is responding
  let ready = false;
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch("http://localhost:5000/api/health");
      if (res.ok) {
        ready = true;
        break;
      }
    } catch {
      // wait and retry
    }
    await new Promise((r) => setTimeout(r, 500));
  }

  if (!ready) {
    console.error("Server failed to become ready within 10 seconds.");
    server.kill("SIGINT");
    process.exit(1);
  }

  console.log("-> Server is ready! Running test suite now...\n");

  const testSuite = spawn("node", ["test-suite.js"], {
    cwd: __dirname,
    stdio: "inherit",
  });

  testSuite.on("exit", (code) => {
    console.log(`\nTest suite finished with code: ${code}`);
    server.kill("SIGINT");
    process.exit(code ?? 0);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

