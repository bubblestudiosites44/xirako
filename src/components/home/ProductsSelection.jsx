import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPinned, MessagesSquare, Music2, Sparkles } from "lucide-react";
import ProductCard from "./ProductCard";

const products = [
  {
    name: "Xirako Music",
    description: "Stream, discover, and share music with a focused listening experience.",
    url: "https://music.xirako.com",
    domain: "music.xirako.com",
    icon: Music2,
    color: "#2ff3c5",
    colorEnd: "#00a8ff",
  },
  {
    name: "Xirako Maps",
    description: "Navigate with real-time directions, satellite layers, and live context.",
    url: "https://maps.xirako.com",
    domain: "maps.xirako.com",
    icon: MapPinned,
    color: "#74f7df",
    colorEnd: "#1cbec8",
  },
  {
    name: "Xirako Classroom",
    description: "Manage lessons, assignments, and collaboration from one workspace.",
    url: "https://classroom.xirako.com",
    domain: "classroom.xirako.com",
    icon: GraduationCap,
    color: "#9df890",
    colorEnd: "#35ba5a",
  },
  {
    name: "Virexa",
    description: "Secure messaging built for speed, reliability, and modern conversations.",
    url: "https://virexa.xirako.com",
    domain: "virexa.xirako.com",
    icon: MessagesSquare,
    color: "#7ff6ff",
    colorEnd: "#3aa0ff",
  },
  {
    name: "XirAI",
    description: "Generate, reason, and automate workflows with advanced AI tooling.",
    url: "https://ai.xirako.com",
    domain: "ai.xirako.com",
    icon: Sparkles,
    color: "#e0ffd8",
    colorEnd: "#25dda4",
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="relative mt-6 sm:mt-8">
      <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#040707]/80 px-5 py-16 shadow-[0_35px_95px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:px-10 lg:px-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-16 h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(29,233,167,0.52)_0%,_transparent_72%)] blur-2xl" />
          <div className="absolute right-0 top-0 h-48 w-80 rounded-full bg-[radial-gradient(circle,_rgba(112,254,252,0.34)_0%,_transparent_72%)] blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mb-12 text-center sm:mb-14"
        >
          <span className="inline-block rounded-full border border-white/12 bg-white/5 px-4 py-1.5 font-body text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary/90">
            Product Ecosystem
          </span>
          <h2 className="mt-5 font-heading text-[clamp(2rem,5.2vw,4.1rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
            Built to work as one
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-white/68 sm:text-base">
            Every Xirako surface follows the same design language and speed standard. Pick one product or
            use all five in sequence.
          </p>
        </motion.div>

        <div className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
