"use client";

import { motion, type Variants } from "framer-motion";
import { ProjectImage } from "@/app/components/ProjectImage";

const testimonials: readonly string[] = [
  "“Maya in Park Slope: WalkBuddy made morning rush hours manageable. The walker sent a photo, and the route matched the map.” — Maya R., Park Slope",
  "“Liam in Logan Square: Reliable, friendly, and easy to schedule. My dog comes back calmer and tired.” — Liam P., Logan Square",
];

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: "easeOut",
    },
  },
};

export default function Testimonials() {
  return (
    <motion.section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="bg-[var(--color-bg)] px-6 py-24 text-[var(--color-text)] sm:px-8 md:py-32 lg:px-12"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] md:items-center lg:gap-16">
        <div className="flex flex-col gap-8">
          <motion.div className="flex max-w-2xl flex-col gap-4" variants={itemVariants}>
            <p className="font-[family-name:var(--font-body)] text-sm font-medium uppercase leading-tight tracking-[0.12em] text-[var(--color-muted)]">
              Local proof
            </p>
            <h2
              id="testimonials-title"
              className="font-[family-name:var(--font-display)] text-[1.75rem] font-semibold leading-[1.06] tracking-[-0.03em] text-[var(--color-text)] md:text-[2.125rem]"
            >
              What people say
            </h2>
          </motion.div>

          <motion.div className="grid gap-5" variants={sectionVariants}>
            {testimonials.map((testimonial: string) => (
              <motion.article
                key={testimonial}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)] p-5 shadow-[0_1px_6px_var(--color-border)] sm:p-6 md:p-7"
                variants={itemVariants}
              >
                <blockquote className="font-[family-name:var(--font-body)] text-lg font-medium leading-[1.45] tracking-[-0.01em] text-[var(--color-text)] md:text-xl">
                  <p className="text-[var(--color-text)]">{testimonial}</p>
                </blockquote>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <motion.aside
          className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3 shadow-[0_1px_6px_var(--color-border)]"
          aria-label="WalkBuddy customer and walker proof"
          variants={itemVariants}
        >
          <ProjectImage
            id="social_proof"
            className="aspect-[4/5] w-full rounded-[var(--radius-md)] object-cover md:aspect-[5/6]"
          />
        </motion.aside>
      </div>
    </motion.section>
  );
}
