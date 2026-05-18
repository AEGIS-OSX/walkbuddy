"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
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

const surfaceStyle: CSSProperties = {
  backgroundColor: "var(--color-bg)",
  color: "var(--color-text)",
};

const panelStyle: CSSProperties = {
  backgroundColor: "var(--color-bg)",
  borderColor: "var(--color-border)",
  color: "var(--color-text)",
};

const mutedStyle: CSSProperties = {
  color: "var(--color-muted)",
};

const accentButtonStyle: CSSProperties = {
  backgroundColor: "var(--color-accent)",
  borderColor: "var(--color-accent)",
  color: "var(--color-text)",
  outlineColor: "var(--color-accent)",
};

const successChipStyle: CSSProperties = {
  backgroundColor: "var(--color-success)",
  borderColor: "var(--color-success)",
  color: "var(--color-text)",
};

const subtleAccentStyle: CSSProperties = {
  backgroundColor: "var(--color-accent)",
  borderColor: "var(--color-accent)",
  color: "var(--color-text)",
};

const sectionMotion = {
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

const childMotion = {
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
  const zipInputRef = useRef(null as HTMLInputElement | null);
  const [zip, setZip] = useState("");
  const [zipError, setZipError] = useState("");
  const [availabilityState, setAvailabilityState] = useState("idle" as AvailabilityState);
  const [checkedZip, setCheckedZip] = useState("");
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [waitlistFields, setWaitlistFields] = useState({
    email: "",
    name: "",
    zip: "",
  } as WaitlistFields);
  const [waitlistError, setWaitlistError] = useState("");
  const [waitlistSubmitting, setWaitlistSubmitting] = useState(false);
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  const nextTimes = useMemo((): string[] => [formatTodayTime("5:30 PM"), formatTodayTime("7:00 PM")], []);

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

  const handleZipChange = (event: { target: HTMLInputElement }): void => {
    const nextZip = event.target.value.replace(/\D/g, "").slice(0, 5);
    setZip(nextZip);
    if (zipError && zipPattern.test(nextZip)) {
      setZipError("");
    }
  };

  const handleZipSubmit = (event: { preventDefault: () => void }): void => {
    event.preventDefault();
    runZipCheck(zip);
  };

  const handleWaitlistChange = (field: keyof WaitlistFields) => (event: { target: HTMLInputElement }): void => {
    setWaitlistFields((currentFields: WaitlistFields) => ({
      ...currentFields,
      [field]: field === "zip" ? event.target.value.replace(/\D/g, "").slice(0, 5) : event.target.value,
    }));

    if (field === "email" && waitlistError) {
      setWaitlistError("");
    }
  };

  const handleWaitlistSubmit = (event: { preventDefault: () => void }): void => {
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
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-12">
        <div className="flex flex-col md:col-span-7">
          <motion.div className="flex flex-wrap items-center gap-2" variants={childMotion}>
            <span
              className="rounded-full border px-3 py-2 font-[family-name:var(--font-body)] text-xs font-medium leading-tight"
              style={panelStyle}
            >
              Background-checked walkers
            </span>
            <span
              className="rounded-full border px-3 py-2 font-[family-name:var(--font-body)] text-xs font-medium leading-tight"
              style={panelStyle}
            >
              Liability coverage for every walk
            </span>
          </motion.div>

          <motion.h1
            id="hero-title"
            className="mt-6 max-w-4xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-none tracking-tight md:text-5xl"
            style={{ color: "var(--color-text)" }}
            variants={childMotion}
          >
            Book a background-checked walker in 30 seconds. Get live GPS and photos.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-2xl font-[family-name:var(--font-body)] text-lg font-medium leading-relaxed"
            style={{ color: "var(--color-text)" }}
            variants={childMotion}
          >
            Fast bookings, consistent walkers, real-time updates so you can focus on the rest of your day.
          </motion.p>

          <motion.p
            className="mt-3 max-w-2xl font-[family-name:var(--font-body)] text-sm leading-relaxed"
            style={mutedStyle}
            variants={childMotion}
          >
            Starting around $15–$35 per walk (typical range; exact price varies by ZIP and walk length).
          </motion.p>

          <motion.div className="mt-8 flex flex-col gap-3" variants={childMotion}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleHeroCtaClick}
                className="min-h-11 rounded-full border px-5 py-3 font-[family-name:var(--font-body)] text-sm font-semibold transition duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                style={accentButtonStyle}
              >
                Check availability
              </button>
              <a
                href="#how-it-works"
                className="inline-flex min-h-11 items-center rounded-full px-1 py-3 font-[family-name:var(--font-body)] text-sm font-semibold underline decoration-2 underline-offset-4 transition duration-200 ease-out hover:translate-x-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ color: "var(--color-text)", outlineColor: "var(--color-accent)" }}
              >
                How it works
              </a>
            </div>
            <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed" style={mutedStyle}>
              We check ZIP coverage instantly. No email required.
            </p>
            <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed" style={mutedStyle}>
              We save your spot, not your card. Privacy-first, ZIP-aware invites.
            </p>
          </motion.div>

          <motion.div className="mt-8 rounded-3xl border p-4 sm:p-5" style={panelStyle} variants={childMotion}>
            <form className="flex flex-col gap-3" onSubmit={handleZipSubmit} noValidate>
              <label
                htmlFor="hero-zip"
                className="font-[family-name:var(--font-body)] text-sm font-medium leading-tight"
                style={{ color: "var(--color-text)" }}
              >
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
                  pattern="[0-9]{5}"
                  maxLength={5}
                  value={zip}
                  onChange={handleZipChange}
                  aria-invalid={Boolean(zipError)}
                  aria-describedby={zipError ? "hero-zip-error" : "hero-zip-help"}
                  placeholder="11201"
                  disabled={availabilityState === "loading"}
                  className="min-h-11 w-full rounded-full border px-4 py-3 font-[family-name:var(--font-body)] text-base leading-tight outline-none transition duration-200 ease-out placeholder:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    backgroundColor: "var(--color-bg)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text)",
                    outlineColor: "var(--color-accent)",
                  }}
                />
                <button
                  type="submit"
                  aria-label="Check ZIP availability"
                  disabled={availabilityState === "loading" || zip.trim().length !== 5}
                  className="min-h-11 min-w-11 rounded-full border px-4 py-3 font-[family-name:var(--font-body)] text-base font-semibold transition duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  style={accentButtonStyle}
                >
                  →
                </button>
              </div>
              <p id="hero-zip-help" className="font-[family-name:var(--font-body)] text-xs leading-relaxed" style={mutedStyle}>
                Served ZIP examples start with 100, 112, 606, or 941.
              </p>
              {zipError ? (
                <p id="hero-zip-error" role="alert" className="font-[family-name:var(--font-body)] text-sm font-medium leading-relaxed" style={{ color: "var(--color-accent)" }}>
                  {zipError}
                </p>
              ) : null}
            </form>

            <div className="mt-4" role="status" aria-live="polite" aria-atomic="true" aria-busy={availabilityState === "loading"}>
              {availabilityState === "loading" ? (
                <div className="rounded-2xl border p-4" style={panelStyle}>
                  <motion.div
                    className="h-3 w-3/4 rounded-full"
                    style={subtleAccentStyle}
                    animate={{ opacity: [0.35, 0.85, 0.35] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: "easeOut" }}
                  />
                  <p className="mt-3 font-[family-name:var(--font-body)] text-sm leading-relaxed" style={mutedStyle}>
                    Checking coverage for {checkedZip}.
                  </p>
                </div>
              ) : null}

              {availabilityState === "served" ? (
                <div className="rounded-2xl border p-4" style={panelStyle}>
                  <span className="inline-flex rounded-full border px-3 py-2 font-[family-name:var(--font-body)] text-xs font-semibold leading-tight" style={successChipStyle}>
                    Served — Next available: {nextTimes[0]}
                  </span>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {nextTimes.map((time: string) => (
                      <div key={time} className="rounded-2xl border px-4 py-3 font-[family-name:var(--font-body)] text-sm font-medium" style={panelStyle}>
                        {time}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-4 min-h-11 rounded-full border px-5 py-3 font-[family-name:var(--font-body)] text-sm font-semibold transition duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={accentButtonStyle}
                  >
                    Book next available
                  </button>
                </div>
              ) : null}

              {availabilityState === "not-served" ? (
                <div className="rounded-2xl border p-4" style={panelStyle}>
                  <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed" style={{ color: "var(--color-text)" }}>
                    Not served yet in your ZIP. Join the waitlist to be notified when we launch near you.
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-body)] text-sm leading-relaxed" style={mutedStyle}>
                    Estimated launch: 2–4 weeks.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowWaitlist(true)}
                    className="mt-4 min-h-11 rounded-full border px-5 py-3 font-[family-name:var(--font-body)] text-sm font-semibold transition duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={accentButtonStyle}
                  >
                    Join the waitlist
                  </button>
                  <p className="mt-3 font-[family-name:var(--font-body)] text-xs leading-relaxed" style={mutedStyle}>
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
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold leading-tight" style={{ color: "var(--color-text)" }}>
                  Join WalkBuddy early access
                </h2>

                {waitlistSuccess ? (
                  <p className="mt-4 rounded-2xl border px-4 py-3 font-[family-name:var(--font-body)] text-sm font-medium leading-relaxed" style={successChipStyle} role="status" aria-live="polite">
                    Thanks. You’re on the list. We’ll email when WalkBuddy arrives in your ZIP. No spam. Unsubscribe anytime.
                  </p>
                ) : (
                  <div className="mt-4 grid gap-3">
                    <div className="grid gap-2">
                      <label htmlFor="waitlist-email" className="font-[family-name:var(--font-body)] text-sm font-medium leading-tight" style={{ color: "var(--color-text)" }}>
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
                        className="min-h-11 rounded-full border px-4 py-3 font-[family-name:var(--font-body)] text-base outline-none transition duration-200 ease-out placeholder:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        style={{
                          backgroundColor: "var(--color-bg)",
                          borderColor: "var(--color-border)",
                          color: "var(--color-text)",
                          outlineColor: "var(--color-accent)",
                        }}
                        disabled={waitlistSubmitting}
                      />
                      {waitlistError ? (
                        <p id="waitlist-email-error" role="alert" className="font-[family-name:var(--font-body)] text-sm font-medium leading-relaxed" style={{ color: "var(--color-accent)" }}>
                          {waitlistError}
                        </p>
                      ) : null}
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="waitlist-name" className="font-[family-name:var(--font-body)] text-sm font-medium leading-tight" style={{ color: "var(--color-text)" }}>
                        Name (optional)
                      </label>
                      <input
                        id="waitlist-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={waitlistFields.name}
                        onChange={handleWaitlistChange("name")}
                        className="min-h-11 rounded-full border px-4 py-3 font-[family-name:var(--font-body)] text-base outline-none transition duration-200 ease-out placeholder:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        style={{
                          backgroundColor: "var(--color-bg)",
                          borderColor: "var(--color-border)",
                          color: "var(--color-text)",
                          outlineColor: "var(--color-accent)",
                        }}
                        disabled={waitlistSubmitting}
                      />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="waitlist-zip" className="font-[family-name:var(--font-body)] text-sm font-medium leading-tight" style={{ color: "var(--color-text)" }}>
                        ZIP code (optional)
                      </label>
                      <input
                        id="waitlist-zip"
                        name="zip"
                        type="text"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        pattern="[0-9]{5}"
                        maxLength={5}
                        value={waitlistFields.zip}
                        onChange={handleWaitlistChange("zip")}
                        className="min-h-11 rounded-full border px-4 py-3 font-[family-name:var(--font-body)] text-base outline-none transition duration-200 ease-out placeholder:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        style={{
                          backgroundColor: "var(--color-bg)",
                          borderColor: "var(--color-border)",
                          color: "var(--color-text)",
                          outlineColor: "var(--color-accent)",
                        }}
                        disabled={waitlistSubmitting}
                      />
                    </div>

                    <button
                      type="submit"
                      className="min-h-11 rounded-full border px-5 py-3 font-[family-name:var(--font-body)] text-sm font-semibold transition duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                      style={accentButtonStyle}
                      disabled={waitlistSubmitting}
                    >
                      {waitlistSubmitting ? "Saving spot..." : "Save my spot"}
                    </button>
                  </div>
                )}

                <p className="mt-4 font-[family-name:var(--font-body)] text-xs leading-relaxed" style={mutedStyle}>
                  If we detect abuse, we may ask for a quick verification step.
                </p>
                <p className="mt-2 font-[family-name:var(--font-body)] text-xs leading-relaxed" style={mutedStyle}>
                  We save your spot, not your card. By joining you agree to our privacy policy.
                </p>
              </motion.form>
            ) : null}
          </motion.div>
        </div>

        <motion.div className="md:col-span-5" variants={childMotion}>
          <div className="rounded-3xl border p-2" style={panelStyle}>
            <ProjectImage id="hero" className="w-full h-auto object-cover rounded-xl" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
