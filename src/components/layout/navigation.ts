import {
  ArrowUpRight,
  Bot,
  Boxes,
  Building2,
  Cloud,
  Code2,
  FileText,
  HelpCircle,
  Layers,
  LayoutGrid,
  Mail,
  MessageSquareQuote,
  Palette,
  Plug,
  Route,
  Smartphone,
  Sparkles,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  external?: boolean;
};

export type NavColumn = {
  title: string;
  items: NavItem[];
};

export type NavMenu = {
  id: string;
  label: string;
  /** Rendered as a wide panel, so two columns read better than one long list. */
  columns: NavColumn[];
  /** Full-width row at the foot of the panel, for the "see everything" link. */
  feature: NavItem;
};

/**
 * The whole site, reachable from the header. Anchors point at ids declared on
 * the home page sections; keep the two in step when sections are renamed.
 */
export const MENUS: NavMenu[] = [
  {
    id: "services",
    label: "Services",
    columns: [
      {
        title: "Build",
        items: [
          {
            href: "/services#custom-software",
            label: "Custom Software",
            description: "Full-cycle engineering, from spec to deployed system.",
            icon: Code2,
          },
          {
            href: "/services#saas",
            label: "SaaS Platforms",
            description: "Multi-tenant architecture, billing, and dashboards.",
            icon: Layers,
          },
          {
            href: "/services#mobile",
            label: "Mobile Apps",
            description: "iOS and Android sharing your web platform's backend.",
            icon: Smartphone,
          },
          {
            href: "/services#api",
            label: "API Development",
            description: "Documented, versioned APIs built to last.",
            icon: Plug,
          },
          {
            href: "/services#design",
            label: "UI/UX & Product Strategy",
            description: "Interfaces designed around what users actually do.",
            icon: Palette,
          },
        ],
      },
      {
        title: "Scale",
        items: [
          {
            href: "/services#ai",
            label: "AI Solutions",
            description: "Applied AI and LLM features built into real products.",
            icon: Bot,
          },
          {
            href: "/services#enterprise",
            label: "Enterprise Systems",
            description: "Internal tools and ERPs that can't tolerate downtime.",
            icon: Building2,
          },
          {
            href: "/services#cloud",
            label: "Cloud & DevOps",
            description: "CI/CD and infrastructure-as-code. Boring deployments.",
            icon: Cloud,
          },
          {
            href: "/services#automation",
            label: "Business Automation",
            description: "Replacing spreadsheet-and-WhatsApp workflows.",
            icon: Workflow,
          },
          {
            href: "/#tech-stack",
            label: "Our Tech Stack",
            description: "60+ technologies in active use across live products.",
            icon: Boxes,
          },
        ],
      },
    ],
    feature: {
      href: "/services",
      label: "All services",
      description: "Every capability, with what each engagement includes.",
      icon: LayoutGrid,
    },
  },
  {
    id: "work",
    label: "Work",
    columns: [
      {
        title: "Live products",
        items: [
          {
            href: "https://aihr.daffodilglobal.ai",
            label: "AIHR",
            description: "AI-powered HR and recruitment platform.",
            icon: Sparkles,
            external: true,
          },
          {
            href: "https://fc.daffodilglobal.ai",
            label: "Daffodil F-Commerce OS",
            description: "Operating system for Facebook and Instagram sellers.",
            icon: Boxes,
            external: true,
          },
          {
            href: "https://app.152.70.130.154.nip.io/",
            label: "Barighor",
            description: "Digital rent management for landlords.",
            icon: Building2,
            external: true,
          },
          {
            href: "https://grameenpestbd.com",
            label: "Grameen Pest Control",
            description: "Bilingual service platform for a 35-year-old company.",
            icon: Workflow,
            external: true,
          },
        ],
      },
      {
        title: "Explore",
        items: [
          {
            href: "https://sonic-cyan.vercel.app",
            label: "Sonic",
            description: "AI conversation intelligence at scale.",
            icon: Bot,
            external: true,
          },
          {
            href: "/#primeoms",
            label: "PrimeOMS",
            description: "Order management for merchants. In progress.",
            icon: Route,
          },
          {
            href: "/#featured-projects",
            label: "Featured projects",
            description: "The work we lead with, in detail.",
            icon: LayoutGrid,
          },
          {
            href: "/#testimonials",
            label: "What clients say",
            description: "Results from the people running these systems.",
            icon: MessageSquareQuote,
          },
        ],
      },
    ],
    feature: {
      href: "/portfolio",
      label: "All work",
      description: "Live products processing real orders, rent, and payroll.",
      icon: ArrowUpRight,
    },
  },
  {
    id: "company",
    label: "Company",
    columns: [
      {
        title: "About us",
        items: [
          {
            href: "/about",
            label: "About Infectech",
            description: "A studio that ships production systems, not demos.",
            icon: Building2,
          },
          {
            href: "/#team",
            label: "The team",
            description: "A small, senior team. Everyone here ships code.",
            icon: Users,
          },
          {
            href: "/#why-infectech",
            label: "Why Infectech",
            description: "Engineering first, security focused, built to scale.",
            icon: Sparkles,
          },
        ],
      },
      {
        title: "How we work",
        items: [
          {
            href: "/#process",
            label: "Our process",
            description: "How a project moves, from discovery to support.",
            icon: Route,
          },
          {
            href: "/#blog",
            label: "Writing",
            description: "Notes on architecture, AI, and shipping software.",
            icon: FileText,
          },
          {
            href: "/#faq",
            label: "FAQ",
            description: "Timelines, budgets, handover, and what happens next.",
            icon: HelpCircle,
          },
        ],
      },
    ],
    feature: {
      href: "/contact",
      label: "Start a project",
      description: "Tell us what you're building. We reply within a day.",
      icon: Mail,
    },
  },
];

/** Plain links that sit alongside the menus. */
export const DIRECT_LINKS = [{ href: "/contact", label: "Contact" }];
