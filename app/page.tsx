"use client";

import Hero from "@/app/components/Hero";
import ValueProps from "@/app/components/ValueProps";
import HowItWorks from "@/app/components/HowItWorks";
import Testimonials from "@/app/components/Testimonials";
import PricingTeaser from "@/app/components/PricingTeaser";
import ProviderCTA from "@/app/components/ProviderCTA";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <ValueProps />
      <HowItWorks />
      <Testimonials />
      <PricingTeaser />
      <ProviderCTA />
      <Footer />
    </main>
  );
}
