import { LandingHeader } from "@/components/landing/LandingHeader";
import { HeroSection } from "@/components/landing/HeroSection";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <LandingHeader />
      <HeroSection />
    </div>
  );
}
