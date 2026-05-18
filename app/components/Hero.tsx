"use client";

import { motion, type Variants } from "framer-motion";
import type { CSSProperties, ChangeEvent, FormEvent } from "react";
import { useMemo, useRef, useState } from "react";
import { ProjectImage } from "@/app/components/ProjectImage";

type AvailabilityState = "idle" | "loading" | "served" | "not-served";
type AvailabilityResult = "served" | "not-served";

type WaitlistFields = {
  email: string;
  name: string;
  zip: string;
};

const servedPrefixes = ["100", "112", "606", "941"];
const zipPattern = /^\d{5}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const token = (name: string, fallback: string): string => `var(--${name}, ${fallback})`;

const surfaceStyle: CSSProperties = {
  backgroundColor: token("color.bg.surface", "#FFFFFF"),
  color: token("color.neutral.900", "#2F2F2F"),
};

const panelStyle: CSSProperties = {
  backgroundColor: token("color.bg.card", "#F5EDE2"),
  borderColor: token("color.border", "rgba(47,47,47,0.06)"),
  color: token("color.neutral.900", "#2F2F2F"),
};

const fieldStyle: CSSProperties = {
  backgroundColor: token("color.bg.field", "#E7E1D6"),
  borderColor: token("color.border", "rgba(47,47,47,0.06)"),
  color: token("color.neutral.900", "#2F2F2F"),
  outlineColor: token("color.focus", "#FFDD57"),
};

const chipStyle: CSSProperties = {
  backgroundColor: token("color.bg.surface", "#FFFFFF"),
  borderColor: token("color.border", "rgba(47,47,47,0.06)"),
  color: token("color.neutral.900", "#2F2F2F"),
};

const mutedStyle: CSSProperties = {
  color: token("color.neutral.700", "rgba(47,47,47,0.70)"),
};

const accentButtonStyle: CSSProperties = {
  backgroundColor: token("color.brand.accent", "#FFDD57"),
  borderColor: token("color.brand.accent", "#FFDD57"),
  color: token("color.neutral.900", "#2F2F2F"),
  outlineColor: token("color.focus", "#FFDD57"),
};

const successChipStyle: CSSProperties = {
  backgroundColor: token("color.success", "#8FD19E"),
  borderColor: token("color.success", "#8FD19E"),
  color: token("color.neutral.900", "#2F2F2F"),
};

const subtleBarStyle: CSSProperties = {
  backgroundColor: token("color.bg.field", "#E7E1D6"),
  borderColor: token("color.border", "rgba(47,47,47,0.06)"),
};

const shimmerStyle: CSSProperties = {
  backgroundColor: token("color.brand.accent", "#FFDD57"),
};

const displayTextStyle: CSSProperties = {
  fontFamily:
    'var(--type.family.display, "Rubik", "Domaine Alternate", system-ui, -apple-system, "Segoe UI", Arial, sans-serif)',
};

const bodyTextStyle: CSSProperties = {
  fontFamily:
    'var(--type.family.body, "Source Sans 3", system-ui, -apple-system, "Segoe UI", Arial, sans-serif)',
};

const sectionMotion: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const childMotion: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function formatTodayTime(time: string): string {
  return `Today ${time}`;
}

function getAvailabilityResult(zip: string): AvailabilityResult {
  return servedPrefixes.some((prefix: string) => zip.startsWith(prefix)) ? "served" : "not-served";
}

export default function Hero() {
  const zipInputRef = useRef<HTMLInputElement | null>(null);
  const [zip, setZip] = useState("");
  const [zipError, setZipError] = useState("");
  const [availabilityState, setAvailabilityState] = useState<AvailabilityState>("idle");
  const [checkedZip, setCheckedZip] = useState("");
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [waitlistFields, setWaitlistFields] = useState<WaitlistFields>({
    email: "",
    name: "",
    zip: "",
  });
  const [waitlistError, setWaitlistError] = useState("");
  const [waitlistSubmitting, setWaitlistSubmitting] = useState(false);
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  const nextTimes = useMemo((): string[] => [formatTodayTime("5:30 PM"), formatTodayTime("7:00 PM")], []);

  const availabilityAnnouncement = useMemo((): string => {
    if (availabilityState === "loading") {
      return checkedZip ? `Checking coverage for ${checkedZip}.` : "Checking coverage.";
    }

    if (availabilityState === "served") {
      return `Served. Next available: ${nextTimes[0]}. Example times: ${nextTimes.join(" and ")}.`;
    }

    if (availabilityState === "not-served") {
      return "Not served yet in your ZIP. Join the waitlist to be notified when we launch near you.";
    }

    return "";
  }, [availabilityState, checkedZip, nextTimes]);

  const runZipCheck = (zipToCheck: string): void => {
    const trimmedZip = zipToCheck.trim();

    if (!zipPattern.test(trimmedZip)) {
      setZipError("Enter a 5-digit ZIP code.");
      setAvailabilityState("idle");
      return;
    }

    setZipError("");
    setCheckedZip(trimmedZip);
    setShowWaitlist(false);
    setWaitlistSuccess(false);
    setAvailabilityState("loading");

    window.setTimeout(() => {
      const result = getAvailabilityResult(trimmedZip);
      setAvailabilityState(result);
      setWaitlistFields((currentFields: WaitlistFields) => ({
        ...currentFields,
        zip: trimmedZip,
      }));
      window.dispatchEvent(new CustomEvent("zip_check", { detail: { zip: trimmedZip, result } }));
    }, 420);
  };

  const handleHeroCtaClick = (): void => {
    window.dispatchEvent(new CustomEvent("hero_cta_click"));

    if (zipPattern.test(zip.trim())) {
      runZipCheck(zip);
      return;
    }

    zipInputRef.current?.focus();
  };

  const handleZipChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const nextZip = event.target.value.replace(/\D/g, "").slice(0, 5);
    setZip(nextZip);

    if (zipError && zipPattern.test(nextZip)) {
      setZipError("");
    }
  };

  const handleZipSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    runZipCheck(zip);
  };

  const handleWaitlistChange = (field: keyof WaitlistFields) => (event: ChangeEvent<HTMLInputElement>): void => {
    setWaitlistFields((currentFields: WaitlistFields) => ({
      ...currentFields,
      [field]: field === "zip" ? event.target.value.replace(/\D/g, "").slice(0, 5) : event.target.value,
    }));

    if (field === "email" && waitlistError) {
      setWaitlistError("");
    }
  };

  const handleWaitlistSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!emailPattern.test(waitlistFields.email.trim())) {
      setWaitlistError("Please enter a valid email address.");
      setWaitlistSuccess(false);
      return;
    }

    setWaitlistError("");
    setWaitlistSubmitting(true);

    window.setTimeout(() => {
      setWaitlistSubmitting(false);
      setWaitlistSuccess(true);
      window.dispatchEvent(new CustomEvent("waitlist_submit"));
    }, 360);
  };

  return (
    <motion.section
      id="hero"
      aria-labelledby="hero-title"
      className="w-full px-6 pb-24 pt-32 sm:px-8 md:pb-32 md:pt-40 lg:px-12"
      style={surfaceStyle}
      variants={sectionMotion}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-12" variants={sectionMotion}>
        <motion.div className="flex flex-col md:col-span-7" variants={sectionMotion}>
          <motion.div className="flex flex-wrap items-center gap-2" variants={childMotion}>
            <span className="rounded-full border px-3 py-2 text-xs font-medium leading-tight" style={{ ...chipStyle, ...bodyTextStyle }}>
              Background-checked walkers
            </span>
            <span className="rounded-full border px-3 py-2 text-xs font-medium leading-tight" style={{ ...chipStyle, ...bodyTextStyle }}>
              Liability coverage for every walk
            </span>
          </motion.div>

          <motion.h1
            id="hero-title"
            className="mt-6 max-w-4xl text-4xl font-semibold leading-none tracking-tight md:text-5xl"
            style={{ ...displayTextStyle, color: token("color.neutral.900", "#2F2F2F") }}
            variants={childMotion}
          >
            Book a background-checked walker in 30 seconds. Get live GPS and photos.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-2xl text-lg font-medium leading-relaxed"
            style={{ ...bodyTextStyle, color: token("color.neutral.900", "#2F2F2F") }}
            variants={childMotion}
          >
            Fast bookings, consistent walkers, real-time updates so you can focus on the rest of your day.
          </motion.p>

          <motion.p className="mt-3 max-w-2xl text-sm leading-relaxed" style={{ ...bodyTextStyle, ...mutedStyle }} variants={childMotion}>
            Starting around $15–$35 per walk (typical range; exact price varies by ZIP and walk length).
          </motion.p>

          <motion.div className="mt-8 flex flex-col gap-3" variants={childMotion}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleHeroCtaClick}
                className="min-h-11 rounded-full border px-5 py-3 text-sm font-semibold transition duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ ...accentButtonStyle, ...bodyTextStyle }}
              >
                Check availability
              </button>
              <a
                href="#how-it-works"
                className="inline-flex min-h-11 items-center rounded-full px-1 py-3 text-sm font-semibold underline decoration-2 underline-offset-4 transition duration-200 ease-out hover:translate-x-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ ...bodyTextStyle, color: token("color.neutral.900", "#2F2F2F"), outlineColor: token("color.focus", "#FFDD57") }}
              >
                How it works
              </a>
            </div>
            <p className="text-sm leading-relaxed" style={{ ...bodyTextStyle, ...mutedStyle }}>
              We check ZIP coverage instantly. No email required.
            </p>
            <p className="text-sm leading-relaxed" style={{ ...bodyTextStyle, ...mutedStyle }}>
              We save your spot, not your card. Privacy-first, ZIP-aware invites.
            </p>
          </motion.div>

          <motion.div className="mt-8 rounded-3xl border p-4 shadow-sm sm:p-5" style={panelStyle} variants={childMotion}>
            <form className="flex flex-col gap-3" onSubmit={handleZipSubmit} noValidate>
              <label htmlFor="hero-zip" className="text-sm font-medium leading-tight" style={{ ...bodyTextStyle, color: token("color.neutral.900", "#2F2F2F") }}>
                Enter ZIP to see service in your area
              </label>
              <div className="flex gap-2">
                <input
                  ref={zipInputRef}
                  id="hero-zip"
                  name="zip"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  pattern="^\d{5}$"
                  maxLength={5}
                  value={zip}
                  onChange={handleZipChange}
                  aria-invalid={Boolean(zipError)}
                  aria-describedby={zipError ? "hero-zip-error" : "hero-zip-help"}
                  placeholder="11201"
                  disabled={availabilityState === "loading"}
                  className="min-h-11 w-full rounded-full border px-4 py-3 text-base leading-tight outline-none transition duration-200 ease-out placeholder:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ ...fieldStyle, ...bodyTextStyle, borderColor: zipError ? token("color.danger", "#7B1B2B") : fieldStyle.borderColor }}
                />
                <button
                  type="submit"
                  aria-label="Check ZIP availability"
                  disabled={availabilityState === "loading" || zip.trim().length !== 5}
                  className="min-h-11 min-w-11 rounded-full border px-4 py-3 text-base font-semibold transition duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ ...accentButtonStyle, ...bodyTextStyle }}
                >
                  →
                </button>
              </div>
              <p id="hero-zip-help" className="text-xs leading-relaxed" style={{ ...bodyTextStyle, ...mutedStyle }}>
                Served ZIP examples start with 100, 112, 606, or 941.
              </p>
              {zipError ? (
                <p id="hero-zip-error" role="alert" className="text-sm font-medium leading-relaxed" style={{ ...bodyTextStyle, color: token("color.danger", "#7B1B2B") }}>
                  {zipError}
                </p>
              ) : null}
            </form>

            <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
              {availabilityAnnouncement}
            </p>

            <div className="mt-4" aria-busy={availabilityState === "loading"}>
              {availabilityState === "loading" ? (
                <div className="rounded-2xl border p-4" style={chipStyle}>
                  <div className="h-3 w-3/4 overflow-hidden rounded-full border" style={subtleBarStyle} aria-hidden="true">
                    <motion.div
                      className="h-full w-1/3 rounded-full"
                      style={shimmerStyle}
                      initial={{ x: "-120%", opacity: 0.45 }}
                      animate={{ x: "320%", opacity: [0.45, 0.85, 0.45] }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: "easeOut" }}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed" style={{ ...bodyTextStyle, ...mutedStyle }}>
                    Checking coverage for {checkedZip}.
                  </p>
                </div>
              ) : null}

              {availabilityState === "served" ? (
                <div className="rounded-2xl border p-4" style={chipStyle}>
                  <span className="inline-flex rounded-full border px-3 py-2 text-xs font-semibold leading-tight" style={{ ...successChipStyle, ...bodyTextStyle }}>
                    Served — Next available: {nextTimes[0]}
                  </span>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {nextTimes.map((time: string) => (
                      <div key={time} className="rounded-2xl border px-4 py-3 text-sm font-medium" style={{ ...panelStyle, ...bodyTextStyle }}>
                        {time}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-4 min-h-11 rounded-full border px-5 py-3 text-sm font-semibold transition duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{ ...accentButtonStyle, ...bodyTextStyle }}
                  >
                    Book next available
                  </button>
                </div>
              ) : null}

              {availabilityState === "not-served" ? (
                <div className="rounded-2xl border p-4" style={chipStyle}>
                  <p className="text-sm leading-relaxed" style={{ ...bodyTextStyle, color: token("color.neutral.900", "#2F2F2F") }}>
                    Not served yet in your ZIP. Join the waitlist to be notified when we launch near you.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed" style={{ ...bodyTextStyle, ...mutedStyle }}>
                    Estimated launch: 2–4 weeks.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowWaitlist(true)}
                    className="mt-4 min-h-11 rounded-full border px-5 py-3 text-sm font-semibold transition duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{ ...accentButtonStyle, ...bodyTextStyle }}
                  >
                    Join the waitlist
                  </button>
                  <p className="mt-3 text-xs leading-relaxed" style={{ ...bodyTextStyle, ...mutedStyle }}>
                    We’ll only use your contact to tell you when WalkBuddy is available in your neighborhood.
                  </p>
                </div>
              ) : null}
            </div>

            {availabilityState === "not-served" && showWaitlist ? (
              <motion.form
                className="mt-4 rounded-2xl border p-4"
                style={panelStyle}
                onSubmit={handleWaitlistSubmit}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                noValidate
              >
                <h2 className="text-xl font-semibold leading-tight" style={{ ...displayTextStyle, color: token("color.neutral.900", "#2F2F2F") }}>
                  Join WalkBuddy early access
                </h2>

                {waitlistSuccess ? (
                  <p className="mt-4 rounded-2xl border px-4 py-3 text-sm font-medium leading-relaxed" style={{ ...successChipStyle, ...bodyTextStyle }} role="status" aria-live="polite">
                    Thanks. You’re on the list. We’ll email when WalkBuddy arrives in your ZIP. No spam. Unsubscribe anytime.
                  </p>
                ) : (
                  <div className="mt-4 grid gap-3">
                    <div className="grid gap-2">
                      <label htmlFor="waitlist-email" className="text-sm font-medium leading-tight" style={{ ...bodyTextStyle, color: token("color.neutral.900", "#2F2F2F") }}>
                        Email (required)
                      </label>
                      <input
                        id="waitlist-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={waitlistFields.email}
                        onChange={handleWaitlistChange("email")}
                        aria-invalid={Boolean(waitlistError)}
                        aria-describedby={waitlistError ? "waitlist-email-error" : undefined}
                        className="min-h-11 rounded-full border px-4 py-3 text-base outline-none transition duration-200 ease-out placeholder:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        style={{ ...fieldStyle, ...bodyTextStyle, borderColor: waitlistError ? token("color.danger", "#7B1B2B") : fieldStyle.borderColor }}
                        disabled={waitlistSubmitting}
                        required
                      />
                      {waitlistError ? (
                        <p id="waitlist-email-error" role="alert" className="text-sm font-medium leading-relaxed" style={{ ...bodyTextStyle, color: token("color.danger", "#7B1B2B") }}>
                          {waitlistError}
                        </p>
                      ) : null}
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="waitlist-name" className="text-sm font-medium leading-tight" style={{ ...bodyTextStyle, color: token("color.neutral.900", "#2F2F2F") }}>
                        Name (optional)
                      </label>
                      <input
                        id="waitlist-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={waitlistFields.name}
                        onChange={handleWaitlistChange("name")}
                        className="min-h-11 rounded-full border px-4 py-3 text-base outline-none transition duration-200 ease-out placeholder:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        style={{ ...fieldStyle, ...bodyTextStyle }}
                        disabled={waitlistSubmitting}
                      />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="waitlist-zip" className="text-sm font-medium leading-tight" style={{ ...bodyTextStyle, color: token("color.neutral.900", "#2F2F2F") }}>
                        ZIP code (optional)
                      </label>
                      <input
                        id="waitlist-zip"
                        name="zip"
                        type="text"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        pattern="^\d{5}$"
                        maxLength={5}
                        value={waitlistFields.zip}
                        onChange={handleWaitlistChange("zip")}
                        className="min-h-11 rounded-full border px-4 py-3 text-base outline-none transition duration-200 ease-out placeholder:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        style={{ ...fieldStyle, ...bodyTextStyle }}
                        disabled={waitlistSubmitting}
                      />
                    </div>

                    <button
                      type="submit"
                      className="min-h-11 rounded-full border px-5 py-3 text-sm font-semibold transition duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                      style={{ ...accentButtonStyle, ...bodyTextStyle }}
                      disabled={waitlistSubmitting}
                    >
                      {waitlistSubmitting ? "Saving spot..." : "Save my spot"}
                    </button>
                  </div>
                )}

                <p className="mt-4 text-xs leading-relaxed" style={{ ...bodyTextStyle, ...mutedStyle }}>
                  If we detect abuse, we may ask for a quick verification step.
                </p>
                <p className="mt-2 text-xs leading-relaxed" style={{ ...bodyTextStyle, ...mutedStyle }}>
                  We save your spot, not your card. By joining you agree to our privacy policy.
                </p>
              </motion.form>
            ) : null}
          </motion.div>
        </motion.div>

        <motion.div className="md:col-span-5" variants={childMotion}>
          <div className="rounded-3xl border p-2 shadow-sm" style={panelStyle}>
            <ProjectImage id="hero" className="h-auto w-full rounded-xl object-cover" />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
