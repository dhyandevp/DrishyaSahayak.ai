import React from 'react';
import dynamic from 'next/dynamic';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { FloatingNavbar } from '@/components/layout/FloatingNavbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { StatementSection } from '@/components/sections/StatementSection';
import { PastelFeaturesSection } from '@/components/sections/PastelFeaturesSection';

// Lazy-load interactive and below-the-fold sections while preserving SSR HTML for SEO & accessibility
const VoiceCommandsSection = dynamic(() =>
  import('@/components/sections/VoiceCommandsSection').then((m) => m.VoiceCommandsSection)
);
const HowItWorksSection = dynamic(() =>
  import('@/components/sections/HowItWorksSection').then((m) => m.HowItWorksSection)
);
const HybridExplainerSection = dynamic(() =>
  import('@/components/sections/HybridExplainerSection').then((m) => m.HybridExplainerSection)
);
const QuickStartSection = dynamic(() =>
  import('@/components/sections/QuickStartSection').then((m) => m.QuickStartSection)
);
const TechStackSection = dynamic(() =>
  import('@/components/sections/TechStackSection').then((m) => m.TechStackSection)
);
const MissionQuoteSection = dynamic(() =>
  import('@/components/sections/MissionQuoteSection').then((m) => m.MissionQuoteSection)
);
const RoadmapSection = dynamic(() =>
  import('@/components/sections/RoadmapSection').then((m) => m.RoadmapSection)
);
const CommunitySection = dynamic(() =>
  import('@/components/sections/CommunitySection').then((m) => m.CommunitySection)
);
const PricingSection = dynamic(() =>
  import('@/components/sections/PricingSection').then((m) => m.PricingSection)
);
const FaqSection = dynamic(() =>
  import('@/components/sections/FaqSection').then((m) => m.FaqSection)
);
const ContactSection = dynamic(() =>
  import('@/components/sections/ContactSection').then((m) => m.ContactSection)
);
const BottomCtaSection = dynamic(() =>
  import('@/components/sections/BottomCtaSection').then((m) => m.BottomCtaSection)
);

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Section 2: Slim dark announcement bar + visible accessibility controls */}
      <AnnouncementBar />

      {/* Section 1: Floating pill navbar */}
      <FloatingNavbar />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* Section 3: Sky-blue hero + torn paper collage + overlapping desktop mockup */}
        <HeroSection />

        {/* Section 4: Headline statement + icon row */}
        <StatementSection />

        {/* Section 5: 4 alternating pastel feature cards (SEE, READ, TALK, KNOW) */}
        <PastelFeaturesSection />

        {/* Section 6: Interactive voice command simulation cards */}
        <VoiceCommandsSection />

        {/* Section 7: 4-step pipeline diagram */}
        <HowItWorksSection />

        {/* Section 8: Offline vs Online hybrid explainer */}
        <HybridExplainerSection />

        {/* Section 9: Quick Start tabbed install steps */}
        <QuickStartSection />

        {/* Section 10: Architecture / tech stack grid */}
        <TechStackSection />

        {/* Section 11: Creator mission statement pull-quote */}
        <MissionQuoteSection />

        {/* Section 12: Coming next smart-glasses concept + timeline */}
        <RoadmapSection />

        {/* Section 13: 4 Community tiles */}
        <CommunitySection />

        {/* Section 14: Pricing-style Free vs Glasses Waitlist comparison */}
        <PricingSection />

        {/* Section 15: FAQ accordion */}
        <FaqSection />

        {/* Section 16: Contact details */}
        <ContactSection />

        {/* Section 17: Large rounded CTA band */}
        <BottomCtaSection />
      </main>

      {/* Section 18: Black rounded footer */}
      <Footer />
    </div>
  );
}
