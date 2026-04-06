import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ProductCard({ product, index }) {
  return (
    <motion.a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative block rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden transition-shadow hover:shadow-2xl hover:shadow-primary/5"
    >
      {/* Gradient accent bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${product.color}, ${product.colorEnd})` }}
      />

      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: `linear-gradient(135deg, ${product.color}22, ${product.colorEnd}22)` }}
          >
            {product.icon}
          </div>
          <div className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground group-hover:text-foreground group-hover:border-foreground/30 group-hover:bg-secondary/60 transition-all">
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>

        <h3 className="font-heading font-bold text-xl text-foreground mb-2">{product.name}</h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">{product.description}</p>

        <div className="mt-6 pt-4 border-t border-border/40">
          <span className="font-body text-xs text-muted-foreground tracking-wide">{product.domain}</span>
        </div>
      </div>
    </motion.a>
  );
}