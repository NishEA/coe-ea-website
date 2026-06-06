import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { fontDisplay, fontMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Centre of Excellence — Efficiency Augmentation",
    template: "%s · CoE-EA",
  },
  description:
    "A STPI · KITS · HPE initiative — the Centre of Excellence on Efficiency Augmentation, Bengaluru.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontMono.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col font-body">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
