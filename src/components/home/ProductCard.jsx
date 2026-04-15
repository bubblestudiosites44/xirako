import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ProductCard({ product, index }) {
  const Icon = product.icon;

  return (
    <motion.a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -7, scale: 1.01 }}
      className="group relative block overflow-hidden rounded-[1.6rem] border border-white/12 bg-black/45 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-shadow hover:shadow-[0_24px_60px_rgba(0,0,0,0.62)] sm:p-7"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-14 h-40 w-40 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${product.color}85 0%, transparent 72%)` }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-95"
        style={{ background: `linear-gradient(90deg, ${product.color}, ${product.colorEnd})` }}
      />

      <div className="relative z-10">
        <div className="mb-6 flex items-start justify-between">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/12"
            style={{ background: `linear-gradient(145deg, ${product.color}2c, ${product.colorEnd}1a)` }}
          >
            <Icon className="h-7 w-7 text-white" />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/68 transition-all group-hover:border-white/25 group-hover:text-white group-hover:bg-white/10">
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>

        <h3 className="font-heading text-xl font-semibold tracking-[-0.02em] text-white">{product.name}</h3>
        <p className="mt-3 font-body text-sm leading-relaxed text-white/70">{product.description}</p>

        <div className="mt-7 border-t border-white/10 pt-4">
          <span className="font-body text-[0.72rem] uppercase tracking-[0.14em] text-white/46">{product.domain}</span>
        </div>
      </div>
    </motion.a>
  );
}
