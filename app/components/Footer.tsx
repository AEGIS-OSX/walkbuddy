"use client";

import { motion, type Variants } from "framer-motion";

const footerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const footerLinks: ReadonlyArray<{ href: string; label: string }> = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "#pricing", label: "Pricing" },
  { href: "#walkers", label: "For Walkers" },
];

export default function Footer(): JSX.Element {
  return (
    <motion.footer
      id="footer"
      role="contentinfo"
      className="bg-[var(--color-bg)] px-6 py-16 text-[var(--color-text)] sm:px-8 md:py-24 lg:px-12"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 border-t border-[var(--color-border)] pt-8 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)] md:gap-16 md:pt-10">
        <div className="max-w-xl">
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-[1.15] tracking-[-0.03em]">
            WalkBuddy
          </p>
          <p className="mt-5 max-w-lg font-[family-name:var(--font-body)] text-sm leading-[1.4] tracking-[-0.01em] text-[var(--color-muted)] md:text-base md:leading-[1.5]">
            WalkBuddy collects emails to manage the waitlist and send product updates. By joining you agree to our privacy policy.
          </p>
          <p className="mt-6 font-[family-name:var(--font-body)] text-xs font-medium leading-[1.25] tracking-[-0.01em] text-[var(--color-muted)] md:text-sm">
            © 2026 WalkBuddy. All rights reserved.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:justify-self-end">
          <nav aria-label="Footer links" className="min-w-40">
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex rounded-[var(--radius-sm)] font-[family-name:var(--font-body)] text-base font-medium leading-[1.35] tracking-[-0.01em] text-[var(--color-text)] underline-offset-4 transition-[text-decoration-thickness] duration-200 ease-out hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)] motion-reduce:transition-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-48">
            <p className="font-[family-name:var(--font-body)] text-xs font-semibold uppercase leading-[1.25] tracking-[0.14em] text-[var(--color-muted)]">
              Contact
            </p>
            <a
              href="mailto:contact@walkbuddy.app"
              className="mt-3 inline-flex rounded-[var(--radius-sm)] font-[family-name:var(--font-body)] text-base font-medium leading-[1.35] tracking-[-0.01em] text-[var(--color-text)] underline-offset-4 transition-[text-decoration-thickness] duration-200 ease-out hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)] motion-reduce:transition-none"
            >
              contact@walkbuddy.app
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
