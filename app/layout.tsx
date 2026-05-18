import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const title = "WalkBuddy — Book a background-checked dog walker in 30 seconds";
const description =
  "Check availability by ZIP, book reliable local walkers, and get live GPS and photo updates. Join the waitlist for early access.";
const canonicalUrl = "https://walkbuddy.app";
const socialProofImage =
  "https://zkvkbpxrxnfynqqeytke.supabase.co/storage/v1/object/public/marketing-assets/walkbuddy/cleo/1779136750624-social_proof.png";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title,
    description,
    url: canonicalUrl,
    siteName: "WalkBuddy",
    images: [socialProofImage],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialProofImage],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav
          role="navigation"
          aria-label="Primary navigation"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            padding: "0.875rem clamp(1rem, 4vw, 2rem)",
            color: "var(--color-text)",
            background: "var(--color-background)",
          }}
        >
          <a
            href="#content"
            aria-label="WalkBuddy home"
            className="walkbuddy-nav-link walkbuddy-brand"
            style={{
              color: "var(--color-text)",
              font: "inherit",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              textDecoration: "none",
              outlineColor: "var(--color-accent)",
              outlineOffset: 2,
            }}
          >
            WalkBuddy
          </a>
          <div
            aria-label="Page sections"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(0.75rem, 2vw, 1.25rem)",
              fontSize: "0.9375rem",
            }}
          >
            <a
              href="#how-it-works"
              className="walkbuddy-nav-link"
              style={{
                color: "var(--color-text)",
                textDecoration: "none",
                outlineColor: "var(--color-accent)",
                outlineOffset: 2,
              }}
            >
              How it works
            </a>
            <a
              href="#pricing"
              className="walkbuddy-nav-link"
              style={{
                color: "var(--color-text)",
                textDecoration: "none",
                outlineColor: "var(--color-accent)",
                outlineOffset: 2,
              }}
            >
              Pricing
            </a>
          </div>
        </nav>
        <main id="content" role="main">
          {children}
        </main>
        <style>{`
          .walkbuddy-nav-link {
            border-radius: 0.375rem;
            transition: color 180ms ease-out, text-decoration-color 180ms ease-out;
          }

          .walkbuddy-nav-link:hover {
            text-decoration-line: underline;
            text-decoration-color: var(--color-accent);
            text-decoration-thickness: 0.08em;
            text-underline-offset: 0.2em;
          }

          .walkbuddy-nav-link:focus-visible {
            outline: 2px solid var(--color-accent);
            outline-offset: 2px;
          }

          @media (prefers-reduced-motion: reduce) {
            .walkbuddy-nav-link {
              transition: none;
            }
          }
        `}</style>
      </body>
    </html>
  );
}
