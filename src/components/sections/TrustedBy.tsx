"use client";

const brands = [
  "Daffodil Global AI",
  "Square Group",
  "Beximco",
  "Bashundhara Group",
  "Walton",
  "KFC Bangladesh",
  "Pran-RFL",
];

export default function TrustedBy() {
  const loop = [...brands, ...brands];

  return (
    <section className="py-16 sm:py-20 bg-bg-primary border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-center text-sm text-text-secondary">
          Brands served through products we&apos;ve engineered
        </p>
      </div>

      <div
        className="relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        style={{ animationPlayState: "running" }}
      >
        <div className="flex gap-16 w-max animate-[marquee_32s_linear_infinite] motion-reduce:animate-none">
          {loop.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="font-display text-xl sm:text-2xl font-medium text-text-secondary/70 whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
