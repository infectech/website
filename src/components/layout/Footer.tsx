import Link from "next/link";
import { Mail } from "lucide-react";

const links = {
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
  ],
  Services: [
    { href: "/services#custom-software", label: "Custom Software" },
    { href: "/services#web-apps", label: "Web Applications" },
    { href: "/services#saas", label: "SaaS Development" },
    { href: "/services#ai", label: "AI & Automation" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold">
                <span className="gradient-text">Infect</span>
                <span className="text-white">ech</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm mb-6">
              Building software that solves real problems. We design, develop,
              and deploy digital solutions for businesses worldwide.
            </p>
            <a
              href="mailto:infectech.official@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Mail size={14} />
              infectech.official@gmail.com
            </a>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm hover:text-slate-200 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} Infectech. All rights reserved.
          </p>
          <p className="text-xs">
            Custom Software • SaaS • Web Applications • AI Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
