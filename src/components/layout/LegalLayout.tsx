/**
 * Shared shell for the policy pages: one measure, one heading scale, one
 * "last updated" treatment, so /privacy and /terms cannot drift apart.
 */
export default function LegalLayout({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-bg-primary pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
          Last updated {updated}
        </p>
        <h1 className="display-lg mb-6 text-4xl text-ink sm:text-6xl">{title}</h1>
        <p className="mb-12 text-lg leading-relaxed text-text-secondary">{intro}</p>

        <div className="space-y-10 border-t border-border pt-12">{children}</div>
      </div>
    </div>
  );
}

export function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 font-display text-xl font-bold tracking-[-0.02em] text-ink">
        {heading}
      </h2>
      <div className="space-y-3 leading-relaxed text-text-secondary [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-accent">
        {children}
      </div>
    </section>
  );
}

export function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-muted"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
