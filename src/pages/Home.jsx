import React from "react";
import HeroSection from "../components/home/HeroSection";
import ProductsSection from "../components/home/ProductsSelection";
import SitePageLayout from "../components/layout/SitePageLayout";

export default function Home() {
  return (
    <SitePageLayout>
      <HeroSection />
      <ProductsSection />
    </SitePageLayout>
  );
}
