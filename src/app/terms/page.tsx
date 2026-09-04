import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout, { Bullets, Section } from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that apply to using the Infectech website, and what this site is and is not.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Use"
      updated="4 September 2026"
      intro="These terms cover infec.tech, our marketing website. They are not the terms of any engagement with us — that is a separate agreement, signed before work starts."
    >
      <Section heading="What this site is">
        <p>
          This site describes what Infectech does and the products we have
          built. Nothing on it is an offer, a quote, or a contract. Prices,
          timelines, and budget ranges shown here are indicative, to help you
          judge whether a conversation is worth having, and are not binding on
          either of us.
        </p>
        <p>
          If we work together, the terms of that work live in a written
          agreement covering scope, price, timeline, ownership, and
          confidentiality. That agreement governs the engagement, not this page.
        </p>
      </Section>

      <Section heading="Using the site">
        <p>You are welcome to read, quote, and link to anything here. Please do not:</p>
        <Bullets
          items={[
            "Attempt to gain unauthorised access to the site or its infrastructure",
            "Use it to distribute malware, or to send bulk or automated submissions through the contact form",
            "Copy the site wholesale and present it as your own",
            "Use our name, logo, or wordmark in a way that suggests we endorse or are affiliated with you when we are not",
          ]}
        />
      </Section>

      <Section heading="Ownership">
        <p>
          The text, design, code, and images on this site belong to Infectech,
          except where they belong to someone else — client logos and the names
          of the products we have built remain the property of their respective
          owners, and appear here to describe work we have done.
        </p>
        <p>
          Work we produce for a client is owned as set out in that client&apos;s
          agreement with us, not by anything stated here.
        </p>
      </Section>

      <Section heading="Accuracy">
        <p>
          We keep this site accurate, but it describes ongoing work, and details
          change. Case studies summarise projects rather than specifying them.
          The site is provided as it is, without warranty, and we do not accept
          liability for decisions taken solely on the basis of what is written
          here. Ask us and we will confirm anything that matters to you in
          writing.
        </p>
      </Section>

      <Section heading="Links and third-party products">
        <p>
          We link to products we have built, some of which are operated by our
          clients, and to third-party services. We do not control those sites
          and are not responsible for their content, availability, or terms.
        </p>
      </Section>

      <Section heading="Your submissions">
        <p>
          When you send us a project enquiry through the{" "}
          <Link href="/contact">contact page</Link>, you keep ownership of
          everything in it. We treat what you send as confidential and use it
          only to reply to you. How it is handled is set out in our{" "}
          <Link href="/privacy">Privacy Policy</Link>. Please do not send us
          anything genuinely sensitive through a web form — if it is
          confidential, tell us and we will arrange a better channel.
        </p>
      </Section>

      <Section heading="Changes">
        <p>
          We may update these terms. The date at the top of this page reflects
          the current version, and continuing to use the site after a change
          means the updated terms apply.
        </p>
      </Section>

      <Section heading="Contact">
        <p>
          Questions about these terms go to{" "}
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
