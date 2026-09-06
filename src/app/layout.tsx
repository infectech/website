import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GreetingIntro from "@/components/ui/GreetingIntro";

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
  metadataBase: new URL("https://infec.tech"),
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
    // Without these, scrapers that find no og:url/og:site_name fall back to
    // guessing, and the card is attributed to whatever they infer.
    url: "/",
    siteName: "Infectech",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Infectech — Engineering Intelligent Digital Products",
    description:
      "AI platforms, commerce infrastructure, and enterprise software, from first architecture decision to production traffic.",
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-bg-primary text-text-primary"
      >
        {/*
          Runs before the overlay below is parsed, so a reload within the same
          visit never flashes the greeting: the server cannot know whether this
          visitor has been greeted, so the markup always contains the overlay
          and this hides it before it can paint. GreetingIntro then unmounts it.

          It injects its own style element rather than relying on a rule in
          globals.css, which is loaded asynchronously and is measurably not yet
          applied at this point — the rule has to exist before the overlay is
          parsed, not merely before hydration.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('infectech:intro-seen')==='1'){var s=document.createElement('style');s.textContent='#greeting-intro{display:none!important}';document.head.appendChild(s)}}catch(e){}`,
          }}
        />
        <GreetingIntro />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
