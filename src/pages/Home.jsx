import React from "react";
import Navbar from "../components/home/Navbar";
import HeroSection from "../components/home/HeroSection";
import ProductsSection from "../components/home/ProductsSelection";
import Footer from "../components/home/Footer";

const BG_IMAGE = "https://media.base44.com/images/public/69d2dc7d58d5d0f867c281d2/b0d245194_generated_47998252.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <HeroSection bgImage={BG_IMAGE} />
      <ProductsSection />
      <Footer />
    </div>
  );
}
