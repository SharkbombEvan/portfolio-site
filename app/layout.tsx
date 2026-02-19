import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sharkbomb Audio",
  description: "Electrical engineering for audio equipment — custom builds, modifications, and repair.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}