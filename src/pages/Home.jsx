import React from "react";
import HeroSection from "../components/home/HeroSection";
import ProductsSection from "../components/home/ProductsSelection";
import Footer from "../components/home/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <main className="mx-auto max-w-[1600px] px-3 py-3 sm:px-5 sm:py-5 lg:px-7 lg:py-7">
        <HeroSection />
        <ProductsSection />
      </main>
      <Footer />
    </div>
  );
}
