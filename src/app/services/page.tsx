import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom software development, AI solutions, SaaS platforms, enterprise systems, mobile apps, and cloud infrastructure, built by Infectech for businesses that need production-grade systems.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
