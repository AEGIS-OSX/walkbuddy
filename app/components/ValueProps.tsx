"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactElement } from "react";
import { ProjectImage } from "@/app/components/ProjectImage";

type ValueProp = {
  title: string;
  body: string;
  imageId: "feature_1" | "feature_2" | "feature_3";
};

const valueProps: ValueProp[] = [
  {
    title: "Book in 30 seconds",
    body: "Tap to request and confirm in under a minute. Local walkers accept and you get an ETA.",
    imageId: "feature_1",
  },
  {
    title: "Background-checked walkers",
    body: "Profiles, ratings, and background checks. We match you with walkers who know your neighborhood and your pup.",
    imageId: "feature_2",
  },
  {
    title: "Live GPS and photo updates",
    body: "See the route in real time, receive a photo, and get a timestamped summary after every walk.",
    imageId: "feature_3",
  },
];

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
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

export default function ValueProps(): ReactElement {
  return (
    <motion.section
      id="value-props"
      aria-labelledby="value-title"
      className="bg-[var(--color-bg)] px-6 py-24 text-[var(--color-text)] sm:px-8 md:py-32 lg:px-12"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.h2
          id="value-title"
          className="font-[family-name:var(--font-body)] text-sm font-medium leading-tight tracking-wide text-[var(--color-muted)] opacity-80"
          variants={cardVariants}
        >
          Why WalkBuddy
        </motion.h2>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-6 md:mt-8 md:grid-cols-3 md:gap-8">
          {valueProps.map((item: ValueProp) => (
            <motion.article
              key={item.title}
              className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3 shadow-sm sm:p-4"
              variants={cardVariants}
            >
              <ProjectImage id={item.imageId} className="aspect-[4/3] w-full rounded-lg object-cover" />

              <div className="flex flex-col gap-3 px-1 pb-2 pt-5 sm:px-2 sm:pb-3 sm:pt-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold leading-tight tracking-tight text-[var(--color-text)] md:text-2xl">
                  {item.title}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-base font-normal leading-relaxed text-[var(--color-muted)]">
                  {item.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
