import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { fontDisplay, fontMono } from "./fonts";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://coe-ea-website.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Centre of Excellence — Efficiency Augmentation",
    template: "%s · CoE-EA",
  },
  description:
    "A STPI · KITS · HPE initiative — the Centre of Excellence on Efficiency Augmentation, Bengaluru.",
  openGraph: {
    siteName: "CoE-EA",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
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
