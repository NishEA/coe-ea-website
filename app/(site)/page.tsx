import { HeroSpread } from "@/components/spreads/Hero";
import { StatsBar } from "@/components/ui/StatsBar";
import { WorkSpread } from "@/components/spreads/Work";
import { PortfolioSpread } from "@/components/spreads/Portfolio";
import { ApplySpread } from "@/components/spreads/Apply";
import { ImpactSpread } from "@/components/spreads/Impact";

export default function HomePage() {
  return (
    <>
      <HeroSpread />
      <StatsBar />
      <WorkSpread />
      <PortfolioSpread />
      <ApplySpread />
      <ImpactSpread />
    </>
  );
}
