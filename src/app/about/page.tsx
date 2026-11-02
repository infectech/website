import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Infectech, the software engineering studio behind AI platforms, commerce infrastructure, and enterprise software running in production for businesses in Bangladesh and beyond.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
