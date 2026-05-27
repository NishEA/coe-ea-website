import { HeroSpread } from "@/components/spreads/Hero";
import { WorkSpread } from "@/components/spreads/Work";
import { PortfolioSpread } from "@/components/spreads/Portfolio";
import { ApplySpread } from "@/components/spreads/Apply";
import { ContactSpread } from "@/components/spreads/Contact";

export default function HomePage() {
  return (
    <>
      <HeroSpread />
      <WorkSpread />
      <PortfolioSpread />
      <ApplySpread />
      <ContactSpread />
    </>
  );
}
