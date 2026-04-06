import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const products = [
  {
    name: "Xirako Music",
    description: "Stream, discover, and share music with a beautifully crafted listening experience. Your personal soundtrack, everywhere.",
    url: "https://music.xirako.com",
    domain: "music.xirako.com",
    icon: "🎵",
    color: "#8B5CF6",
    colorEnd: "#D946EF",
  },
  {
    name: "Xirako Maps",
    description: "Navigate the world with precision. Real-time directions, satellite views, and location intelligence at your fingertips.",
    url: "https://maps.xirako.com",
    domain: "maps.xirako.com",
    icon: "🗺️",
    color: "#10B981",
    colorEnd: "#06B6D4",
  },
  {
    name: "Xirako Classroom",
    description: "A smarter way to teach and learn. Manage courses, assignments, and collaboration — all in one platform.",
    url: "https://classroom.xirako.com",
    domain: "classroom.xirako.com",
    icon: "📚",
    color: "#F59E0B",
    colorEnd: "#EF4444",
  },
  {
    name: "Virexa",
    description: "Instant messaging reimagined. Secure, fast, and feature-rich conversations with the people who matter most.",
    url: "https://virexa.xirako.com",
    domain: "virexa.xirako.com",
    icon: "💬",
    color: "#3B82F6",
    colorEnd: "#8B5CF6",
  },
  {
    name: "XirAI",
    description: "Harness the power of artificial intelligence. Generate, analyze, and automate — powered by cutting-edge AI models.",
    url: "https://ai.xirako.com",
    domain: "ai.xirako.com",
    icon: "🤖",
    color: "#EC4899",
    colorEnd: "#F43F5E",
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="relative py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs uppercase tracking-widest text-primary font-semibold">Our Products</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mt-4 tracking-tight">
            Everything you need,<br />one ecosystem.
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-lg mx-auto text-base">
            From creativity to productivity — Xirako's suite of tools is built to power your world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}