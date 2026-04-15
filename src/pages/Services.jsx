import React from "react";
import StaticPageShell from "../components/layout/StaticPageShell";
import SitePageLayout from "../components/layout/SitePageLayout";

const services = [
  {
    title: "Product Design Systems",
    description:
      "Visual systems, component strategy, and interaction patterns that keep multi-product ecosystems consistent.",
  },
  {
    title: "Platform Engineering",
    description:
      "Scalable architecture, front-end performance optimization, and reliable deployment pipelines for rapid iteration.",
  },
  {
    title: "AI Product Integration",
    description:
      "Practical AI workflows and interfaces that improve user outcomes while preserving speed and trust.",
  },
  {
    title: "Brand + Experience Direction",
    description:
      "Distinct creative direction that unifies product surfaces, messaging, and launch experience.",
  },
];

export default function Services() {
  return (
    <SitePageLayout>
      <StaticPageShell
        eyebrow="Services"
        title="What we build with partners."
        description="From interaction design to production deployment, Xirako supports teams that need polished, high-velocity digital products."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-3xl border border-white/12 bg-black/45 p-6 backdrop-blur-xl"
            >
              <h2 className="font-heading text-lg font-semibold text-white">{service.title}</h2>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/72">{service.description}</p>
            </article>
          ))}
        </div>
      </StaticPageShell>
    </SitePageLayout>
  );
}
