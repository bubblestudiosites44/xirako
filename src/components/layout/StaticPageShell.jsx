import React from "react";
import { motion } from "framer-motion";
import Navbar from "../home/Navbar";

export default function StaticPageShell({ eyebrow, title, description, children }) {
  return (
    <section className="relative">
      <div className="hero-frame texture-grain relative isolate min-h-[86vh] overflow-hidden px-5 pb-12 pt-24 sm:px-9 sm:pt-28 lg:px-14 lg:pt-32">
        <Navbar />

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-20 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,_rgba(6,188,114,0.62)_0%,_rgba(3,38,28,0.2)_55%,_transparent_75%)] blur-[24px] animate-drift-slow" />
          <div className="absolute -right-24 top-24 h-[22rem] w-[30rem] rounded-full bg-[radial-gradient(circle,_rgba(148,255,250,0.78)_0%,_rgba(9,103,109,0.25)_52%,_transparent_75%)] blur-[32px] animate-drift-fast" />
          <div className="absolute right-[-4rem] bottom-[-5rem] h-[20rem] w-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(0,245,228,0.58)_0%,_rgba(6,112,117,0.2)_52%,_transparent_75%)] blur-[24px] animate-drift-slow" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="inline-block rounded-full border border-white/14 bg-white/5 px-4 py-1.5 font-body text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary/90"
          >
            {eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 font-heading text-[clamp(2.4rem,7.5vw,6.2rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-5 max-w-2xl font-body text-base leading-relaxed text-white/72"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="mt-10"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
