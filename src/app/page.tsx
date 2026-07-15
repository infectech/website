import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhatWeBuild from "@/components/sections/WhatWeBuild";
import TechStack from "@/components/sections/TechStack";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Process from "@/components/sections/Process";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Statistics from "@/components/sections/Statistics";
import Industries from "@/components/sections/Industries";
import Testimonials from "@/components/sections/Testimonials";
import Team from "@/components/sections/Team";
import Blog from "@/components/sections/Blog";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <ServicesGrid />
      <WhatWeBuild />
      <TechStack />
      <WhyChooseUs />
      <Process />
      <FeaturedProjects />
      <Statistics />
      <Industries />
      <Testimonials />
      <Team />
      <Blog />
      <FAQ />
      <CTA />
    </>
  );
}
