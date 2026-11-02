import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Live products built by Infectech: AI-powered HR platforms, e-commerce order management, rent management SaaS, and more, currently processing real orders and workflows in production.",
  alternates: {
    canonical: "/portfolio",
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
