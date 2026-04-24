import { AmbientBackground } from "@/components/AmbientBackground";
import { SiteNav } from "@/components/SiteNav";
import { HeroSection } from "@/components/HeroSection";
import { ComplianceSimplifiedSection } from "@/components/ComplianceSimplifiedSection";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import { RiskSection } from "@/components/RiskSection";
import { BentoFeatures } from "@/components/BentoFeatures";
import { IntegrationsBand } from "@/components/IntegrationsBand";
import { ComplianceVisualizer } from "@/components/ComplianceVisualizer";
import { ScaleStrip } from "@/components/ScaleStrip";
import { PilotSection } from "@/components/PilotSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <main className="relative isolate z-10 min-h-screen">
      <AmbientBackground />
      <SiteNav />
      <HeroSection />
      <ComplianceSimplifiedSection />
      <WhyChooseUsSection />
      <RiskSection />
      <BentoFeatures />
      <IntegrationsBand />
      <ComplianceVisualizer />
      <ScaleStrip />
      <PilotSection />
      <SiteFooter />
    </main>
  );
}
