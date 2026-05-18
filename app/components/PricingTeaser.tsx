"use client";

import { motion, type Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function PricingTeaser(): JSX.Element {
  return (
    <motion.section
      id="pricing"
      aria-labelledby="pricing-title"
      className="px-6 py-24 sm:px-8 lg:px-12"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-96px" }}
    >
      <article
        className="mx-auto max-w-3xl rounded-[var(--radius-lg)] border px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-9"
        style={{
          backgroundColor: "var(--color-bg-card, var(--color.bg.card, color-mix(in srgb, var(--color-bg) 88%, var(--color-accent) 12%)))",
          borderColor: "var(--color-border)",
          boxShadow: "0 18px 48px color-mix(in srgb, var(--color-border) 45%, transparent)",
        }}
      >
        <h2
          id="pricing-title"
          className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase leading-[1.35] tracking-[0.12em]"
          style={{ color: "var(--color-muted, var(--color-text))" }}
        >
          Pricing
        </h2>
        <p
          className="mt-4 max-w-2xl font-[family-name:var(--font-body)] text-base font-medium leading-[1.5] tracking-[-0.01em]"
          style={{ color: "var(--color-text)" }}
        >
          Starting around $15–$35 per walk (typical range; exact price varies by ZIP and walk length).
        </p>
        <p
          className="mt-3 max-w-2xl font-[family-name:var(--font-body)] text-sm font-normal leading-[1.35]"
          style={{ color: "var(--color-muted, var(--color-text))" }}
        >
          See Pricing for details on durations, add-ons, and cancellation policy.
        </p>
      </article>
    </motion.section>
  );
}
