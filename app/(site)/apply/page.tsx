import type { Metadata } from "next";
import { ApplySpread } from "@/components/spreads/Apply";

export const metadata: Metadata = {
  title: "Apply — Centre of Excellence on Efficiency Augmentation",
  description:
    "Apply to join the CoE-EA incubation programme. Seed funding, hardware lab access, and a network of Industry 4.0 partners.",
};

export default function ApplyPage() {
  return <ApplySpread />;
}
