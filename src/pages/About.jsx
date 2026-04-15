import React from "react";
import { Link } from "react-router-dom";
import StaticPageShell from "../components/layout/StaticPageShell";
import SitePageLayout from "../components/layout/SitePageLayout";

export default function About() {
  return (
    <SitePageLayout>
      <StaticPageShell
        eyebrow="About Xirako"
        title="A focused platform for digital products."
        description="Xirako brings music, maps, education, messaging, and AI into one cohesive experience designed for clarity, speed, and continuity."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-3xl border border-white/12 bg-black/45 p-6 backdrop-blur-xl">
            <h2 className="font-heading text-xl font-semibold text-white">Our Mission</h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-white/72">
              Build tools that feel connected instead of fragmented, so teams and individuals can move faster
              without switching contexts.
            </p>
          </article>

          <article className="rounded-3xl border border-white/12 bg-black/45 p-6 backdrop-blur-xl">
            <h2 className="font-heading text-xl font-semibold text-white">How We Work</h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-white/72">
              We design every product with a shared visual language, reliable performance baseline, and human
              centered workflow from first click to completion.
            </p>
          </article>
        </div>

        <div className="mt-6">
          <Link
            to="/projects"
            className="inline-flex rounded-full border border-primary/60 bg-primary/90 px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-[#02251f] transition-transform duration-200 hover:-translate-y-0.5"
          >
            View Projects
          </Link>
        </div>
      </StaticPageShell>
    </SitePageLayout>
  );
}
