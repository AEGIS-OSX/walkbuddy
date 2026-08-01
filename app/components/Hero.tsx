'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ProjectImage } from './ProjectImage';

type UiState = 'idle' | 'loading' | 'served' | 'not_served' | 'error';

export default function Hero() {
  const [zipValue, setZipValue] = useState('');
  const [uiState, setUiState] = useState<UiState>('idle');
  const [hasError, setHasError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const validateZip = useCallback((zip: string): boolean => {
    return /^\d{5}$/.test(zip);
  }, []);

  const handleZipChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZipValue(value);
    if (hasError) { setHasError(false); setUiState('idle'); }
  }, [hasError]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasError(false);
    if (!validateZip(zipValue)) { setUiState('error'); setHasError(true); return; }
    setUiState('loading');
    setTimeout(() => { setUiState(zipValue.startsWith('9') ? 'served' : 'not_served'); }, 600);
  }, [zipValue, validateZip]);

  const sectionAnimation = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5, ease: 'easeOut' } }
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, ease: 'easeOut' } };

  return (
    <motion.section aria-labelledby="hero-title" className="w-full" style={{ backgroundColor: 'var(--color-bg-surface)' }} {...sectionAnimation}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 w-full max-w-xl">
            <h1 id="hero-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
              Book a background-checked walker in 30 seconds with live GPS and photos.
            </h1>
            <p className="text-lg sm:text-xl mb-8" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
              Reliable local walkers and real-time updates so you can focus on your day while Milo gets his stretch.
            </p>
            <form onSubmit={handleSubmit} className="w-full max-w-md" noValidate>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input type="text" inputMode="numeric" pattern="[0-9]{5}" maxLength={5} value={zipValue} onChange={handleZipChange}
                    placeholder="Enter ZIP to see service in your area" aria-label="ZIP code"
                    aria-describedby={hasError ? 'zip-error' : undefined} aria-invalid={hasError}
                    disabled={uiState === 'loading'}
                    className="w-full px-4 py-3 rounded-lg border text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }} />
                  {hasError && <span id="zip-error" role="alert" className="block mt-2 text-sm" style={{ color: 'var(--color-error)', fontFamily: 'var(--font-body)' }}>Please enter a valid 5-digit ZIP code</span>}
                </div>
                <button type="submit" disabled={uiState === 'loading'}
                  className="px-6 py-3 rounded-lg font-semibold text-base whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60"
                  style={{ backgroundColor: 'var(--color-cta)', color: 'white', fontFamily: 'var(--font-body)' }}>
                  {uiState === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Check availability
                    </span>
                  ) : 'Check availability'}
                </button>
              </div>
            </form>
            {uiState === 'served' && (
              <div className="mt-6">
                <p className="text-base font-medium mb-4" style={{ color: 'var(--color-success)', fontFamily: 'var(--font-body)' }}>Great news — walkers available in your area.</p>
                <Link href="/book" role="button" className="inline-block px-6 py-3 rounded-lg font-semibold text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ backgroundColor: 'var(--color-cta)', color: 'white', fontFamily: 'var(--font-body)' }}>Book next available</Link>
              </div>
            )}
            {uiState === 'not_served' && (
              <div className="mt-6">
                <p className="text-base font-medium mb-4" style={{ color: 'var(--color-error)', fontFamily: 'var(--font-body)' }}>Not in your area yet. Join the waitlist.</p>
                <Link href="/waitlist" role="button" className="inline-block px-6 py-3 rounded-lg font-semibold text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ backgroundColor: 'var(--color-cta)', color: 'white', fontFamily: 'var(--font-body)' }}>Join waitlist</Link>
                <p className="mt-3 text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>We'll notify you when WalkBuddy launches near you.</p>
              </div>
            )}
          </div>
          <div className="flex-1 w-full max-w-lg">
            <ProjectImage id="hero" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
