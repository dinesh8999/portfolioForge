import type { PublicPortfolioData } from "./types/portfolio";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

export type PublishResponse = {
  message: string;
  slug: string;
  url: string;
  portfolio?: PublicPortfolioData;
};

export type HealthResponse = {
  status: string;
  message: string;
  database: string;
  uptimeSeconds?: number;
  timestamp?: string;
};

/**
 * Checks backend health and database connectivity.
 */
export async function checkApiHealth(): Promise<HealthResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API health check returned status ${response.status}`);
    }

    return (await response.json()) as HealthResponse;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("API request timed out. Please check if the server is running.", {
        cause: error,
      });
    }
    throw error;
  }
}

/**
 * Publishes a new portfolio to the backend.
 */
export async function publishPortfolio(
  portfolio: Record<string, unknown>
): Promise<PublishResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s for image uploads

  try {
    const response = await fetch(`${API_BASE_URL}/portfolios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(portfolio),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    let result: Record<string, unknown> = {};
    try {
      result = await response.json();
    } catch {
      throw new Error(`Server returned unexpected response (${response.status})`);
    }

    if (!response.ok) {
      const errorMsg =
        typeof result.error === "string" ? result.error : "Unable to publish portfolio.";
      throw new Error(errorMsg);
    }

    return result as PublishResponse;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Publishing request timed out. Please try with a smaller image.", {
        cause: error,
      });
    }
    throw error;
  }
}

/**
 * Fetches a published portfolio by its slug.
 */
export async function getPortfolioBySlug(
  slug: string
): Promise<PublicPortfolioData> {
  const cleanSlug = encodeURIComponent(slug.trim());
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout to allow large Base64 photos & cloud latency

  try {
    let response: Response;
    try {
      response = await fetch(`${API_BASE_URL}/portfolios/${cleanSlug}`, {
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
    } catch (fetchErr) {
      // If direct API_BASE_URL fails, attempt relative proxy fallback if different
      if (
        API_BASE_URL.startsWith("http") &&
        fetchErr instanceof Error &&
        fetchErr.name !== "AbortError"
      ) {
        response = await fetch(`/api/portfolios/${cleanSlug}`, {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
      } else {
        throw fetchErr;
      }
    }
    clearTimeout(timeoutId);

    let result: Record<string, unknown> = {};
    try {
      result = await response.json();
    } catch {
      throw new Error(`Unable to parse response from server (${response.status})`);
    }

    if (!response.ok) {
      const errorMsg =
        typeof result.error === "string"
          ? result.error
          : response.status === 404
            ? "Portfolio not found."
            : "Unable to load portfolio.";
      throw new Error(errorMsg);
    }

    const portfolio = (result.portfolio || result) as PublicPortfolioData;
    return portfolio;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Loading portfolio timed out. The database or server took longer than expected to respond.", {
        cause: error,
      });
    }
    throw error;
  }
}
