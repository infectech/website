import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import ServicesGrid from "@/components/sections/ServicesGrid";
import TechStack from "@/components/sections/TechStack";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Process from "@/components/sections/Process";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Statistics from "@/components/sections/Statistics";
import Testimonials from "@/components/sections/Testimonials";
import Team from "@/components/sections/Team";
import Blog from "@/components/sections/Blog";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Infectech | Web Development, Software & AI Solutions",
  description:
    "Infectech builds modern websites, custom software, AI-powered solutions, and digital products that help businesses in Bangladesh and worldwide grow and operate smarter.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <ServicesGrid />
      <TechStack />
      <WhyChooseUs />
      <Process />
      <FeaturedProjects />
      <Statistics />
      <Testimonials />
      <Team />
      <Blog />
      <FAQ />
      <CTA />
    </>
  );
}
