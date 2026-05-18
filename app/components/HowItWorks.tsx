"use client";

import { motion, type Variants } from "framer-motion";

const steps: string[] = [
  "Step 1: Check coverage by ZIP and pick a time.",
  "Step 2: A background-checked walker accepts and arrives on time.",
  "Step 3: Get a photo and GPS map; pay in-app or later via your account.",
];

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

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.44,
      ease: "easeOut",
    },
  },
};

export default function HowItWorks() {
  return (
    <motion.section
      id="how-it-works"
      aria-labelledby="how-title"
      className="bg-[var(--color-bg)] px-6 py-24 text-[var(--color-text)] sm:px-8 md:py-32 lg:px-12"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p
            className="mb-4 font-[family-name:var(--font-body)] text-sm font-medium leading-tight tracking-[0.08em] opacity-70"
            style={{ color: "var(--color-muted)" }}
          >
            Book, meet, walk
          </p>
          <h2
            id="how-title"
            className="font-[family-name:var(--font-display)] text-[1.75rem] font-semibold leading-[1.06] tracking-[-0.03em] md:text-[2.125rem]"
            style={{ color: "var(--color-text)" }}
          >
            How it works
          </h2>
        </div>

        <motion.ol
          className="mt-12 grid list-none gap-6 md:mt-14 md:grid-cols-3 md:gap-8"
          variants={listVariants}
        >
          {steps.map((step: string) => (
            <motion.li
              key={step}
              className="relative min-h-32 rounded-[var(--radius-md)] border border-l-4 border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-5 font-[family-name:var(--font-body)] text-base leading-7 md:text-lg"
              style={{
                backgroundColor: "var(--color-bg)",
                borderColor: "var(--color-border)",
                borderLeftColor: "var(--color-accent)",
                color: "var(--color-text)",
              }}
              variants={itemVariants}
            >
              <span
                aria-hidden="true"
                className="absolute -left-2 top-6 h-3 w-3 rounded-full"
                style={{ backgroundColor: "var(--color-accent)" }}
              />
              {step}
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </motion.section>
  );
}
