import { SiteNav } from "@/components/SiteNav";
import { AmbientFireflies } from "@/components/AmbientFireflies";
import { HeroSection } from "@/components/HeroSection";
import { FeatureMarqueeBand } from "@/components/FeatureMarqueeBand";
import { ComplianceSimplifiedSection } from "@/components/ComplianceSimplifiedSection";
import { RiskSection } from "@/components/RiskSection";
import { BentoFeatures } from "@/components/BentoFeatures";
import { IntegrationsBand } from "@/components/IntegrationsBand";
import { ComplianceVisualizer } from "@/components/ComplianceVisualizer";
import { ScaleStrip } from "@/components/ScaleStrip";
import { PilotSection } from "@/components/PilotSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionReveal } from "@/components/SectionReveal";

export default function Home() {
  return (
    <main className="relative isolate z-10 min-h-screen w-full overflow-x-hidden pb-0">
      <AmbientFireflies />
      <SiteNav />
      {/* Full-bleed sections (Letters-style): backgrounds span the viewport; inner content uses max-w-content */}
      <div className="mt-0 flex w-full flex-col">
        <HeroSection />
        <SectionReveal delay={0.02}>
          <FeatureMarqueeBand />
        </SectionReveal>
        <SectionReveal delay={0.03}>
          <ComplianceSimplifiedSection />
        </SectionReveal>
        <SectionReveal delay={0.04}>
          <RiskSection />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <BentoFeatures />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <IntegrationsBand />
        </SectionReveal>
        <SectionReveal delay={0.06}>
          <ComplianceVisualizer />
        </SectionReveal>
        <SectionReveal delay={0.07}>
          <ScaleStrip />
        </SectionReveal>
        <SectionReveal delay={0.08}>
          <PilotSection />
        </SectionReveal>
        <SiteFooter />
      </div>
    </main>
  );
}
