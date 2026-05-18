"use client";

import { motion, type Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function handleProviderClick(): void {
  window.dispatchEvent(new CustomEvent("provider_cta_click"));
}

export default function ProviderCTA(): JSX.Element {
  return (
    <motion.section
      id="walkers"
      aria-labelledby="walkers-title"
      className="px-6 py-24 sm:px-8 md:py-32 lg:px-12"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-96px" }}
    >
      <div className="mx-auto max-w-6xl">
        <article
          className="relative overflow-hidden rounded-[var(--radius-lg)] border px-6 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:flex lg:items-end lg:justify-between lg:gap-12"
          style={{
            backgroundColor: "var(--color-bg-card, var(--color.bg.card, color-mix(in srgb, var(--color-bg) 86%, var(--color-accent) 14%)))",
            borderColor: "var(--color-border)",
            boxShadow: "0 20px 56px color-mix(in srgb, var(--color-border) 42%, transparent)",
          }}
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-2"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
          <div className="max-w-2xl pl-3 sm:pl-4">
            <h2
              id="walkers-title"
              className="font-[family-name:var(--font-display)] text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] md:text-[2.5rem]"
              style={{ color: "var(--color-text)" }}
            >
              Walk with us
            </h2>
            <p
              className="mt-5 font-[family-name:var(--font-body)] text-base font-normal leading-[1.5] tracking-[-0.01em] md:text-lg"
              style={{ color: "var(--color-muted, var(--color-text))" }}
            >
              Love dogs and know your neighborhood? Join as a walker, set your hours, and get paid per walk. Start with your email and a few details.
            </p>
            <p
              className="mt-4 font-[family-name:var(--font-body)] text-sm font-medium leading-[1.35]"
              style={{ color: "var(--color-muted, var(--color-text))" }}
            >
              Background checks and insurance details provided during onboarding.
            </p>
          </div>
          <div className="mt-8 flex pl-3 sm:pl-4 lg:mt-0 lg:pl-0">
            <button
              type="button"
              className="min-h-12 rounded-[var(--radius-md)] px-6 py-3 font-[family-name:var(--font-body)] text-base font-semibold leading-none tracking-[-0.01em] transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-text)",
                outlineColor: "var(--color-accent)",
              }}
              onClick={handleProviderClick}
            >
              Sign up to walk
            </button>
          </div>
        </article>
      </div>
    </motion.section>
  );
}
