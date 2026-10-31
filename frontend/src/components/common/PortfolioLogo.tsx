import React from "react";

interface PortfolioLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  withText?: boolean;
  className?: string;
}

export const PortfolioLogo: React.FC<PortfolioLogoProps> = ({
  size = "md",
  withText = true,
  className = "",
}) => {
  const iconDimensions = {
    sm: { box: 28, svg: 24, font: "text-base" },
    md: { box: 36, svg: 30, font: "text-lg" },
    lg: { box: 44, svg: 36, font: "text-xl" },
    xl: { box: 56, svg: 46, font: "text-2xl" },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Bespoke Geometric Forge & Code Monogram Emblem */}
      <div
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#1c1c1c] via-[#121212] to-[#080808] p-1.5 border border-[#d4af37]/40 shadow-lg shadow-[#d4af37]/10 group transition-transform hover:scale-105 duration-300"
        style={{
          width: iconDimensions.box,
          height: iconDimensions.box,
        }}
      >
        {/* Subtle gold ambient glow behind icon */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#d4af37]/20 to-transparent blur-[6px] opacity-70 group-hover:opacity-100 transition-opacity" />

        <svg
          width={iconDimensions.svg}
          height={iconDimensions.svg}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          <defs>
            {/* Forge Gold Gradient */}
            <linearGradient id="pfGoldGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="35%" stopColor="#F5D76E" />
              <stop offset="70%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#AA7C11" />
            </linearGradient>

            {/* Ember Fire Core Gradient */}
            <linearGradient id="pfEmberGrad" x1="24" y1="12" x2="24" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF7D6" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>

            {/* Steel Bracket Gradient */}
            <linearGradient id="pfSteelGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#A3A3A3" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Anvil Base Structure / Foundation */}
          <path
            d="M 12 38 L 36 38 C 38.5 38 40 36 39 33.5 L 36 29 L 12 29 L 9 33.5 C 8 36 9.5 38 12 38 Z"
            fill="#1A1A1A"
            stroke="url(#pfGoldGrad)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Left Code Bracket "<" forging shape */}
          <path
            d="M 19 14 L 8 24 L 19 34"
            stroke="url(#pfGoldGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Right Code Bracket ">" forging shape */}
          <path
            d="M 29 14 L 40 24 L 29 34"
            stroke="url(#pfGoldGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central Ascending Forge Flame / Kinetic Spark */}
          <path
            d="M 24 8 C 24 8 28 15 28 20 C 28 24 25.5 26.5 24 26.5 C 22.5 26.5 20 24 20 20 C 20 15 24 8 24 8 Z"
            fill="url(#pfEmberGrad)"
            className="animate-pulse"
          />

          {/* Spark Core Highlight */}
          <circle cx="24" cy="21" r="2.2" fill="#FFFFFF" />

          {/* Geometric Accent Sparks */}
          <path
            d="M 24 4 L 25 7 L 24 10 L 23 7 Z"
            fill="#FFE885"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Brand Wordmark */}
      {withText && (
        <div className="flex flex-col justify-center select-none">
          <div className="flex items-baseline">
            <span
              className={`font-black tracking-tight text-white leading-none ${iconDimensions.font}`}
            >
              Portfolio
            </span>
            <span
              className={`font-black tracking-tight leading-none ${iconDimensions.font} ml-1 text-[#F5D76E] drop-shadow-[0_1px_3px_rgba(212,175,55,0.35)]`}
            >
              Forge
            </span>
          </div>
          {size !== "sm" && (
            <span className="text-[9px] tracking-[0.22em] uppercase font-mono text-[#D4AF37]/90 font-semibold mt-1">
              Creator Studio
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PortfolioLogo;

