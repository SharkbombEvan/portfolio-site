import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

// One family for headings and body keeps letterforms consistent and legible.
const main = Geist({
  subsets: ["latin"],
  variable: "--font-main",
  display: "swap",
});
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Evan Demsey — Electrical Engineer",
  description:
    "Electrical engineering at UVA. Audio electronics design and repair for PRS Guitars, PCB research at the U.S. Army Research Laboratory, and 20+ guitar pedals built for touring musicians.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${main.variable} ${mono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
