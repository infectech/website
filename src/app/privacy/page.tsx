import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout, { Bullets, Section } from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Infectech collects when you use this website, who processes it, and how to have it removed.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      updated="4 September 2026"
      intro="This policy covers infec.tech, our marketing website. It describes exactly what this site collects, which is very little, and what happens to it."
    >
      <Section heading="The short version">
        <p>
          This site has no analytics, no advertising, and no tracking cookies.
          Nothing you do here is profiled or sold. The only information that
          reaches us is what you deliberately send through the contact form or
          by writing to us directly.
        </p>
      </Section>

      <Section heading="What we collect">
        <p>
          When you submit the form on our{" "}
          <Link href="/contact">contact page</Link>, we receive the fields you
          filled in:
        </p>
        <Bullets
          items={[
            "Your name, and your company if you give one",
            "Your email address, and your phone number if you give one",
            "The project type, budget range, and timeline you select",
            "The message you write",
          ]}
        />
        <p>
          If you email or message us directly, we receive whatever that message
          contains. We do not collect anything else, and there is no account to
          create.
        </p>
      </Section>

      <Section heading="Who processes it">
        <p>
          Form submissions are delivered to us by{" "}
          <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener">
            Formspree
          </a>
          , a third-party form service. Your submission passes through and is
          stored on their systems so it can reach our inbox, and their privacy
          policy applies to that processing. From there it sits in our email,
          which is hosted by Google.
        </p>
        <p>
          We do not pass your information to anyone else, and we do not use it
          to market to you beyond replying about the project you asked about.
        </p>
      </Section>

      <Section heading="Cookies and browser storage">
        <p>
          This site sets no cookies. It stores exactly one value in your
          browser&apos;s <code className="font-mono text-[0.9em]">sessionStorage</code>{" "}
          — a flag recording that you have already seen the greeting animation,
          so it does not replay on every page load. It contains no identifier,
          it is never sent to us or to anyone else, and your browser discards it
          when you close the tab.
        </p>
        <p>
          Fonts are served from this site rather than from a third party, so
          loading a page does not announce your visit to a font provider.
        </p>
      </Section>

      <Section heading="Links to other sites">
        <p>
          We link to products we have built, some of which are operated by our
          clients rather than by us, and to third-party sites. Once you follow
          one of those links you are on someone else&apos;s site, under their
          privacy policy, not this one.
        </p>
      </Section>

      <Section heading="Your choices">
        <p>
          You can ask us what we hold about you, ask for a copy, ask us to
          correct it, or ask us to delete it. Email{" "}
          <a href="mailto:infectech.official@gmail.com">
            infectech.official@gmail.com
          </a>{" "}
          and we will action it. You do not need an account or a specific form
          of words, and there is no charge.
        </p>
        <p>
          We keep enquiries for as long as the conversation is live and for a
          reasonable period afterwards in case you come back to us. Ask us to
          delete yours and we will.
        </p>
      </Section>

      <Section heading="Changes">
        <p>
          If this policy changes, the date at the top of this page changes with
          it. We do not backdate it.
        </p>
      </Section>

      <Section heading="Contact">
        <p>
          Questions about this policy, or about anything above, go to{" "}
          <a href="mailto:infectech.official@gmail.com">
            infectech.official@gmail.com
          </a>{" "}
          or{" "}
          <a href="https://wa.me/8801326561196" target="_blank" rel="noopener">
            +880 1326-561196
          </a>
          .
        </p>
      </Section>
    </LegalLayout>
  );
}
