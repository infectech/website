"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import {
  DIRECT_LINKS,
  MENUS,
  type NavItem,
  type NavMenu,
} from "@/components/layout/navigation";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

// Menus split around the centred wordmark: the first half sits to its left.
const LEFT_MENUS = MENUS.slice(0, 2);
const RIGHT_MENUS = MENUS.slice(2);

// A pointer crossing the gap between a trigger and its panel would otherwise
// close the menu mid-travel.
const CLOSE_DELAY_MS = 120;

// Panel geometry. The nav is a centred cluster, so triggers do not sit at any
// fixed edge and the panel has to be placed against the measured trigger.
const PANEL_MAX_W = 768;
const VIEWPORT_PAD = 16;
// Overhang, so the panel reads as hanging off its trigger rather than starting
// hard against it.
const PANEL_OVERHANG = 12;

function ItemLink({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const Icon = item.icon;
  const content = (
    <>
      <span className="mt-px shrink-0 text-ink transition-transform duration-200 ease-out group-hover/item:-translate-y-px">
        <Icon size={16} strokeWidth={1.6} />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1 text-[13px] font-semibold leading-tight text-ink">
          {item.label}
          {item.external && (
            <ArrowUpRight
              size={12}
              className="shrink-0 text-text-muted transition-transform duration-200 ease-out group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5"
            />
          )}
        </span>
        <span className="mt-0.5 block text-xs leading-snug text-text-secondary">
          {item.description}
        </span>
      </span>
    </>
  );

  const className =
    "group/item flex gap-2.5 rounded-lg px-2.5 py-2 transition-colors duration-150 hover:bg-bg-muted";

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener"
        className={className}
        onClick={onNavigate}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} onClick={onNavigate}>
      {content}
    </Link>
  );
}

function MenuPanel({ menu, onNavigate }: { menu: NavMenu; onNavigate: () => void }) {
  return (
    <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-bg-surface shadow-[0_12px_36px_rgba(10,10,10,0.08)]">
      <div className="grid grid-cols-1 gap-x-5 gap-y-4 p-4 sm:grid-cols-2">
        {menu.columns.map((column) => (
          <div key={column.title}>
            <p className="mb-1 px-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
              {column.title}
            </p>
            <div className="flex flex-col">
              {column.items.map((item) => (
                <ItemLink key={item.href} item={item} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border bg-bg-primary p-2">
        <ItemLink item={menu.feature} onNavigate={onNavigate} />
      </div>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);
  const closeTimer = useRef<number | undefined>(undefined);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [panel, setPanel] = useState({ left: 0, width: PANEL_MAX_W });

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (mobileOpen) setMobileOpen(false);
    if (openMenu) setOpenMenu(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  // Place the panel against its trigger: left-hand menus hang from the
  // trigger's left edge, right-hand menus from its right edge, both clamped
  // inside the viewport. Re-measured on resize, since the cluster moves.
  useLayoutEffect(() => {
    if (!openMenu) return;

    const place = () => {
      const button = triggerRefs.current[openMenu];
      const header = headerRef.current;
      if (!button || !header) return;

      const hostWidth = header.clientWidth;
      const width = Math.min(PANEL_MAX_W, hostWidth - VIEWPORT_PAD * 2);
      const rect = button.getBoundingClientRect();
      const headerLeft = header.getBoundingClientRect().left;

      const left = RIGHT_MENUS.some((m) => m.id === openMenu)
        ? rect.right - headerLeft + PANEL_OVERHANG - width
        : rect.left - headerLeft - PANEL_OVERHANG;

      setPanel({
        left: Math.max(
          VIEWPORT_PAD,
          Math.min(left, hostWidth - width - VIEWPORT_PAD)
        ),
        width,
      });
    };

    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [openMenu]);

  const cancelClose = () => window.clearTimeout(closeTimer.current);

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(
      () => setOpenMenu(null),
      CLOSE_DELAY_MS
    );
  };

  const openNow = (id: string) => {
    cancelClose();
    setOpenMenu(id);
  };

  const closeAll = () => {
    cancelClose();
    setOpenMenu(null);
    setMobileOpen(false);
  };

  // Transparent over the hero, but a panel hanging off a transparent header
  // would float with nothing behind it.
  const solid = scrolled || openMenu !== null;

  const trigger = (menu: NavMenu) => {
    const isOpen = openMenu === menu.id;
    return (
      <button
        key={menu.id}
        ref={(el) => {
          triggerRefs.current[menu.id] = el;
        }}
        type="button"
        aria-expanded={isOpen}
        aria-controls={`menu-${menu.id}`}
        onMouseEnter={() => openNow(menu.id)}
        onFocus={() => openNow(menu.id)}
        onClick={() => (isOpen ? setOpenMenu(null) : openNow(menu.id))}
        className={`group flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
          isOpen ? "text-ink" : "text-text-secondary hover:text-ink"
        }`}
      >
        {menu.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ease-out ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
    );
  };

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out ${
        solid
          ? "border-b border-border bg-[rgba(250,250,250,0.86)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
      onMouseLeave={scheduleClose}
    >
      {/* Three tracks with equal outer columns, so the wordmark is centred on
          the viewport rather than on whichever nav group happens to be wider.
          Both groups are pulled in towards the wordmark rather than out to the
          container edges, so the nav reads as one cluster. */}
      <nav className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-x-6 px-4 sm:px-6 lg:gap-x-10 lg:px-8">
        <div className="hidden items-center gap-1 justify-self-end lg:flex">
          {LEFT_MENUS.map(trigger)}
        </div>

        {/* Holds the left slot open on mobile so the wordmark stays centred. */}
        <div className="lg:hidden" aria-hidden="true" />

        <Link
          href="/"
          className="group flex items-center gap-2.5 justify-self-center"
          onClick={closeAll}
        >
          <Image
            src="/images/logo black.png"
            alt="Infectech"
            width={28}
            height={28}
            priority
            className="transition-transform duration-200 ease-out group-hover:-translate-y-px"
          />
          <span className="inline-block font-display text-lg font-bold tracking-[-0.03em] text-ink transition-transform duration-200 ease-out group-hover:-translate-y-px">
            Infectech
          </span>
        </Link>

        <div className="hidden items-center gap-1 justify-self-start lg:flex">
          {RIGHT_MENUS.map(trigger)}
          {DIRECT_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onMouseEnter={scheduleClose}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                pathname === l.href
                  ? "text-ink"
                  : "text-text-secondary hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onMouseEnter={scheduleClose}
            className="ml-2 rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white transition-all duration-150 ease-out hover:-translate-y-0.5 hover:bg-brand-hover active:translate-y-0 active:scale-[0.96]"
          >
            Start Your Project
          </Link>
        </div>

        <button
          className="justify-self-end rounded-lg p-2 text-ink transition-transform duration-150 ease-out active:scale-90 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={mobileOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15, ease: EASE_OUT }}
              className="block"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* Desktop mega panel */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            id={`menu-${openMenu}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            onMouseEnter={cancelClose}
            style={{ left: panel.left, width: panel.width }}
            className="absolute top-16 hidden pb-6 lg:block"
          >
            <MenuPanel
              menu={MENUS.find((m) => m.id === openMenu)!}
              onNavigate={closeAll}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer: the same menus as accordions, so nothing is desktop-only */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="overflow-hidden border-b border-border bg-bg-primary lg:hidden"
          >
            <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto px-4 pb-6 pt-2">
              {MENUS.map((menu) => {
                const isExpanded = expanded === menu.id;
                return (
                  <div key={menu.id} className="border-b border-border py-1">
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() => setExpanded(isExpanded ? null : menu.id)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold text-ink"
                    >
                      {menu.label}
                      <ChevronDown
                        size={16}
                        className={`text-text-secondary transition-transform duration-200 ease-out ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: EASE_OUT }}
                          className="overflow-hidden"
                        >
                          <div className="pb-2">
                            {menu.columns.flatMap((c) => c.items).map((item) => (
                              <ItemLink
                                key={item.href}
                                item={item}
                                onNavigate={closeAll}
                              />
                            ))}
                            <ItemLink item={menu.feature} onNavigate={closeAll} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {DIRECT_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={closeAll}
                  className="block border-b border-border px-3 py-4 text-sm font-semibold text-ink"
                >
                  {l.label}
                </Link>
              ))}

              <Link
                href="/contact"
                onClick={closeAll}
                className="mt-4 block w-full rounded-full bg-ink py-3 text-center text-sm font-semibold text-white transition-transform duration-150 active:scale-[0.97]"
              >
                Start Your Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
