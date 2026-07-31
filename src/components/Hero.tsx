"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  useCallback,
  useId,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type FormEvent,
} from "react";

interface HeroProps {
  onZipSubmit?: (zip: string) => void;
}

type ZipFieldState = "idle" | "invalid" | "valid";

const ZIP_PATTERN = /^\d{5}$/;
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const sectionStyle: CSSProperties = {
  backgroundColor: "var(--color-bg-surface)",
};

const headlineStyle: CSSProperties = {
  fontFamily: "var(--type-family-display)",
  color: "var(--color-text-primary)",
  lineHeight: 1.1,
};

const subheadStyle: CSSProperties = {
  fontFamily: "var(--type-family-body)",
  color: "var(--color-text-muted)",
};

const inputStyle: CSSProperties = {
  borderRadius: "var(--radius-md)",
  borderColor: "var(--color-border)",
  backgroundColor: "var(--color-bg-card)",
  color: "var(--color-text-primary)",
};

const errorTextStyle: CSSProperties = { color: "var(--color-danger)" };
const mutedTextStyle: CSSProperties = { color: "var(--color-text-muted)" };

const ctaStyle: CSSProperties = {
  borderRadius: "var(--radius-md)",
  backgroundColor: "var(--color-brand-accent)",
  color: "var(--color-text-primary)",
};

const imageWrapperStyle: CSSProperties = {
  borderRadius: "var(--radius-lg)",
  backgroundColor: "var(--color-bg-card)",
};

export default function Hero({ onZipSubmit }: HeroProps): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const zipInputId = useId();
  const zipErrorId = useId();

  const [zip, setZip] = useState("");
  const [zipState, setZipState] = useState<ZipFieldState>("idle");
  const [isNavigating, setIsNavigating] = useState(false);

  const handleZipChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = event.target.value.replace(/[^0-9]/g, "").slice(0, 5);

    setZip(digitsOnly);

    if (digitsOnly.length === 0) {
      setZipState("idle");
      return;
    }

    setZipState(ZIP_PATTERN.test(digitsOnly) ? "valid" : "invalid");
  }, []);

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!ZIP_PATTERN.test(zip)) {
        setZipState("invalid");
        return;
      }

      setIsNavigating(true);
      onZipSubmit?.(zip);
    },
    [onZipSubmit, zip]
  );

  const handleCtaClick = useCallback(() => {
    if (ZIP_PATTERN.test(zip)) {
      setIsNavigating(true);
      onZipSubmit?.(zip);
    }
  }, [onZipSubmit, zip]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: EASE_OUT,
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.45, ease: EASE_OUT },
    },
  };

  return (
    <motion.section
      id="hero"
      aria-labelledby="hero-title"
      className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24"
      style={sectionStyle}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <style jsx>{`
        .hero-zip-input:focus-visible {
          outline: none;
          border-color: var(--color-focus);
          box-shadow: 0 0 0 2px var(--color-focus);
        }
        .hero-cta:focus-visible {
          outline: none;
          box-shadow:
            0 0 0 2px var(--color-bg-surface),
            0 0 0 4px var(--color-focus);
        }
      `}</style>

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row lg:justify-between">
        <div className="flex w-full max-w-xl flex-col gap-6 text-center lg:text-left">
          <motion.h1
            id="hero-title"
            variants={itemVariants}
            className="text-4xl font-semibold sm:text-5xl"
            style={headlineStyle}
          >
            Book a background-checked walker in 30 seconds with live GPS and photos.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base leading-relaxed sm:text-lg"
            style={subheadStyle}
          >
            Reliable local walkers and real-time updates so you can focus on your day while Milo gets his stretch.
          </motion.p>

          <motion.form
            variants={itemVariants}
            onSubmit={handleFormSubmit}
            noValidate
            className="flex flex-col gap-3 sm:flex-row sm:items-start"
          >
            <div className="flex-1 text-left">
              <label htmlFor={zipInputId} className="sr-only">
                Enter your ZIP code
              </label>
              <input
                id={zipInputId}
                name="zip"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="Enter ZIP code"
                value={zip}
                onChange={handleZipChange}
                aria-invalid={zipState === "invalid"}
                aria-describedby={zipState === "invalid" ? zipErrorId : undefined}
                className="hero-zip-input h-11 w-full border px-4 text-base outline-none transition-colors"
                style={inputStyle}
              />
              {zipState === "invalid" ? (
                <p id={zipErrorId} role="alert" className="mt-2 text-sm" style={errorTextStyle}>
                  Enter a valid 5-digit ZIP code.
                </p>
              ) : null}
              {zipState === "idle" ? (
                <p className="mt-2 text-sm" style={mutedTextStyle}>
                  We use your ZIP to match nearby walkers.
                </p>
              ) : null}
            </div>

            <Link
              href="/find-walker"
              onClick={handleCtaClick}
              aria-disabled={isNavigating}
              tabIndex={isNavigating ? -1 : 0}
              className="hero-cta inline-flex h-11 items-center justify-center gap-2 px-6 text-base font-medium outline-none transition-colors aria-disabled:pointer-events-none aria-disabled:opacity-60"
              style={ctaStyle}
            >
              {isNavigating ? (
                <svg
                  className={prefersReducedMotion ? "h-4 w-4" : "h-4 w-4 animate-spin"}
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="var(--color-text-primary)"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="var(--color-text-primary)"
                    d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z"
                  />
                </svg>
              ) : null}
              <span>{isNavigating ? "Finding walkers…" : "Find a Walker"}</span>
            </Link>
          </motion.form>
        </div>

        <motion.div variants={itemVariants} className="relative w-full max-w-lg">
          <div className="relative aspect-[4/3] w-full overflow-hidden" style={imageWrapperStyle}>
            <Image
              src="/images/hero-dog-walk.jpg"
              alt="A dog walker smiling while walking a golden retriever through a tree-lined neighborhood"
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
