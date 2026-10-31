import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Check, Code2, Copy, ExternalLink, RotateCcw, Sparkles } from "lucide-react";
import { getPortfolioBySlug } from "../api";
import type { PublicPortfolioData } from "../types/portfolio";
import { PortfolioRenderer } from "./templates/PortfolioRenderer";

export default function PublicPortfolio() {
  const { slug } = useParams<{ slug: string }>();

  const [portfolio, setPortfolio] = useState<PublicPortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadPortfolio() {
      if (!slug) {
        setError("No portfolio link was provided.");
        setLoading(false);
        return;
      }

      // 1. Instant optimistic load from client cache (0ms latency for creator)
      try {
        const cached = localStorage.getItem(`pf_published_${slug}`);
        if (cached) {
          const parsed = JSON.parse(cached) as PublicPortfolioData;
          if (parsed && parsed.name && parsed.templateId) {
            setPortfolio(parsed);
            setLoading(false);
            document.title = `${parsed.name} - Professional Portfolio`;
          }
        }
      } catch {
        // local storage not available
      }

      // 2. Fetch authoritative portfolio from API
      try {
        setError("");
        const data = await getPortfolioBySlug(slug);
        if (!cancelled) {
          setPortfolio(data);
          document.title = `${data.name} - Professional Portfolio`;
          try {
            localStorage.setItem(`pf_published_${slug}`, JSON.stringify(data));
          } catch {
            // quota limit ignored
          }
        }
      } catch (err) {
        if (!cancelled) {
          setPortfolio((current) => {
            if (current) return current;
            const message =
              err instanceof Error ? err.message : "Unable to load portfolio.";
            setError(message);
            return null;
          });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadPortfolio();

    return () => {
      cancelled = true;
      document.title = "PortfolioForge - Build a Portfolio That Gets You Noticed";
    };
  }, [slug, retryCount]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  const handleCopyLink = () => {
    void navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#080808] text-white">
        <div className="text-center space-y-4">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-[#d4af37]" />
          <p className="text-sm text-white/60 tracking-wider">Loading portfolio...</p>
        </div>
      </main>
    );
  }

  if (error || !portfolio) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#080808] px-6 text-white">
        <div className="max-w-md text-center space-y-5">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-[#d4af37]">
            <Code2 size={28} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Portfolio Unavailable
          </h1>

          <p className="text-white/60 text-sm leading-relaxed">
            {error || "We could not find the portfolio you were looking for. It may have been unpublished or the link may be mistyped."}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-2 rounded-xl bg-[#d4af37] px-6 py-3 font-semibold text-black hover:bg-[#e8ca83] transition shadow-lg shadow-[#d4af37]/20"
            >
              <RotateCcw size={16} />
              <span>Try Again</span>
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
            >
              <Sparkles size={16} />
              <span>Create Your Own</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Subtle Top Floating Banner */}
      <header className="sticky top-0 z-40 bg-[#080808]/90 backdrop-blur-md border-b border-white/10 px-4 py-2.5">
        <div className="mx-auto max-w-6xl flex items-center justify-between gap-4 text-xs">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition font-medium">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#d4af37] text-black">
              <Code2 size={14} />
            </span>
            <span>Portfolio<strong className="gold-text">Forge</strong></span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 text-white/80 hover:bg-white/10 transition"
              title="Copy shareable link"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Share</span>
                </>
              )}
            </button>

            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#d4af37] font-semibold text-black hover:bg-[#e8ca83] transition"
            >
              <span>Build Portfolio</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      </header>

      {/* Actual Template Renderer */}
      <main className="flex-1">
        <PortfolioRenderer
          portfolio={portfolio}
          style={portfolio.style}
          templateId={portfolio.templateId}
          isStandalone={true}
        />
      </main>
    </div>
  );
}
