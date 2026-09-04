"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { LinkedinIcon, GithubIcon, FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";

const columns = {
  Company: [
    { href: "/about", label: "About" },
    { href: "/about#careers", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ],
  Services: [
    { href: "/services#custom-software", label: "Custom Software" },
    { href: "/services#ai", label: "AI Solutions" },
    { href: "/services#saas", label: "SaaS Platforms" },
    { href: "/services#enterprise", label: "Enterprise Systems" },
  ],
  Products: [
    { href: "https://aihr.daffodilglobal.ai", label: "AIHR", external: true },
    { href: "https://fc.daffodilglobal.ai", label: "Daffodil F-Commerce OS", external: true },
    { href: "https://app.152.70.130.154.nip.io/", label: "Barighor", external: true },
    { href: "https://grameenpestbd.com", label: "Grameen Pest Control", external: true },
    { href: "https://sonic-cyan.vercel.app", label: "Sonic", external: true },
    { href: "/portfolio#primeoms", label: "PrimeOMS (in progress)" },
  ],
  Resources: [
    { href: "/#blog", label: "Blog" },
    { href: "/#faq", label: "FAQ" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
};

const socials = [
  { href: "https://linkedin.com", icon: LinkedinIcon, label: "LinkedIn" },
  { href: "https://github.com/infectech", icon: GithubIcon, label: "GitHub" },
  {
    href: "https://www.facebook.com/profile.php?id=61591848793213",
    icon: FacebookIcon,
    label: "Facebook",
  },
  { href: "https://instagram.com", icon: InstagramIcon, label: "Instagram" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-bg-surface text-text-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-14">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <Image src="/images/logo black.png" alt="Infectech" width={32} height={32} />
              <span className="font-display text-xl font-bold tracking-[-0.03em] text-ink">
                Infectech
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm mb-6">
              Infectech partners with startups and enterprises to engineer
              complete digital ecosystems, from first architecture diagram to
              production traffic.
            </p>
            <div className="flex flex-col items-start gap-2 mb-6">
              <a
                href="mailto:infectech.official@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors"
              >
                <Mail size={14} />
                infectech.official@gmail.com
              </a>
              <a
                href="https://wa.me/8801326561196"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors"
              >
                <Phone size={14} />
                +880 1326-561196
              </a>
            </div>

            <form onSubmit={handleSubscribe} className="max-w-sm">
              <label htmlFor="footer-email" className="block text-xs font-medium text-text-primary mb-2">
                Subscribe to our newsletter
              </label>
              <div className="flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 min-w-0 rounded-lg bg-bg-primary border border-border px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-ink focus:ring-2 focus:ring-ink/10"
                />
                <button
                  type="submit"
                  className="shrink-0 px-4 py-2 rounded-lg bg-ink text-white text-sm font-semibold transition-all duration-150 ease-out hover:bg-brand-hover hover:-translate-y-0.5 active:scale-[0.96] active:translate-y-0"
                >
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <p className="mt-2 text-xs text-success">Subscribed. Thanks for joining.</p>
              )}
            </form>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {Object.entries(columns).map(([title, items]) => (
              <div key={title}>
                <h3 className="text-sm font-semibold text-text-primary mb-4">{title}</h3>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item.label}>
                      {"external" in item && item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener"
                          className="text-sm hover:text-text-primary transition-colors"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="text-sm hover:text-text-primary transition-colors"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} Infectech. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener"
                aria-label={s.label}
                className="text-text-secondary hover:text-ink hover:-translate-y-0.5 active:scale-90 transition-all duration-200 ease-out"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
