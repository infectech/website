import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Infectech — Building Software That Solves Real Problems",
  description:
    "Infectech is a modern software development startup. We design, develop, and deploy custom software, web applications, SaaS products, automation systems, and AI-powered tools.",
  keywords: [
    "software development",
    "web applications",
    "SaaS",
    "AI solutions",
    "custom software",
  ],
  openGraph: {
    title: "Infectech — Building Software That Solves Real Problems",
    description:
      "Modern software development startup delivering custom software, SaaS products, and AI solutions.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
