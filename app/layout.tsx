import type { Metadata } from "next";
import { fontDisplay, fontBody, fontMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Center of Excellence — Efficiency Augmentation",
    template: "%s · CoE-EA",
  },
  description:
    "An STPI initiative — the Center of Excellence on Efficiency Augmentation.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-body">{children}</body>
    </html>
  );
}
