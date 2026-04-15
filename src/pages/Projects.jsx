import React from "react";
import ProductsSection from "../components/home/ProductsSelection";
import StaticPageShell from "../components/layout/StaticPageShell";
import SitePageLayout from "../components/layout/SitePageLayout";

export default function Projects() {
  return (
    <SitePageLayout>
      <StaticPageShell
        eyebrow="Projects"
        title="Explore the Xirako product suite."
        description="Each project is designed to stand alone and connect seamlessly with the rest of the platform."
      >
        <div className="rounded-3xl border border-white/12 bg-black/45 p-6 backdrop-blur-xl">
          <p className="font-body text-sm leading-relaxed text-white/72 sm:text-base">
            Open any destination below to experience the ecosystem in action across media, productivity,
            communication, and AI.
          </p>
        </div>
      </StaticPageShell>

      <ProductsSection />
    </SitePageLayout>
  );
}
