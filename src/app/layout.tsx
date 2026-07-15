import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://infectech.dev"),
  title: {
    default: "Infectech — Engineering Intelligent Digital Products",
    template: "%s — Infectech",
  },
  description:
    "Infectech is a software engineering studio that designs, builds, and scales production systems: AI platforms, commerce infrastructure, and enterprise software.",
  keywords: [
    "Software Development Company",
    "AI Development Company",
    "SaaS Development",
    "Custom Software",
    "Enterprise Software",
    "Web Development",
    "Mobile Development",
    "Cloud Solutions",
    "Digital Transformation",
    "Technology Consulting",
  ],
  openGraph: {
    title: "Infectech — Engineering Intelligent Digital Products",
    description:
      "AI platforms, commerce infrastructure, and enterprise software, from first architecture decision to production traffic.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
