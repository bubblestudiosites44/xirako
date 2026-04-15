import React from "react";
import StaticPageShell from "../components/layout/StaticPageShell";
import SitePageLayout from "../components/layout/SitePageLayout";

export default function Contact() {
  return (
    <SitePageLayout>
      <StaticPageShell
        eyebrow="Contact"
        title="Let's build something great."
        description="For support, partnerships, or product questions, reach us directly and we will respond as quickly as possible."
      >
        <div className="max-w-2xl rounded-3xl border border-white/12 bg-black/45 p-6 backdrop-blur-xl sm:p-8">
          <p className="font-body text-sm uppercase tracking-[0.16em] text-white/55">Support Email</p>
          <a
            href="mailto:support@xirako.com"
            className="mt-3 inline-block font-heading text-[clamp(1.6rem,4.8vw,2.8rem)] font-semibold tracking-[-0.03em] text-primary transition-colors hover:text-white"
          >
            support@xirako.com
          </a>
          <p className="mt-5 font-body text-sm leading-relaxed text-white/68">
            Include your project name, a short description of what you need, and any links or screenshots that
            help us reproduce the issue.
          </p>
        </div>
      </StaticPageShell>
    </SitePageLayout>
  );
}
