import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Navbar from "./Navbar";

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="hero-frame texture-grain relative isolate min-h-[86vh] overflow-hidden px-5 pb-10 pt-24 sm:px-9 sm:pt-28 lg:px-14 lg:pt-32">
        <Navbar />

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-20 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(6,188,114,0.78)_0%,_rgba(3,38,28,0.2)_55%,_transparent_75%)] blur-[24px] animate-drift-slow" />
          <div className="absolute -right-24 top-24 h-[26rem] w-[34rem] rounded-full bg-[radial-gradient(circle,_rgba(148,255,250,0.95)_0%,_rgba(9,103,109,0.25)_52%,_transparent_75%)] blur-[32px] animate-drift-fast" />
          <div className="absolute -left-24 bottom-[-7rem] h-[20rem] w-[23rem] rounded-full bg-[radial-gradient(circle,_rgba(232,255,247,0.95)_0%,_rgba(11,169,150,0.35)_45%,_transparent_80%)] blur-[28px] animate-drift-fast" />
          <div className="absolute right-[-4rem] bottom-[-5rem] h-[22rem] w-[27rem] rounded-full bg-[radial-gradient(circle,_rgba(0,245,228,0.75)_0%,_rgba(6,112,117,0.2)_52%,_transparent_75%)] blur-[24px] animate-drift-slow" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[62vh] w-full max-w-[78rem] flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="font-heading text-[clamp(2rem,4vw,4.2rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white/92"
          >
            Hey, this is
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-2 font-heading text-[clamp(3.4rem,13.5vw,13.2rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-white"
          >
            Xirako!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.5 }}
            className="mt-6 max-w-2xl font-body text-[0.95rem] leading-relaxed text-white/76 sm:text-base"
          >
            A connected ecosystem for music, maps, classroom tools, secure messaging, and AI. Crafted
            to feel fast, clear, and cinematic.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.65 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#products"
              className="rounded-full border border-primary/60 bg-primary/90 px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-[#02251f] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Explore Products
            </a>
            <a
              href="https://xirako.com"
              className="rounded-full border border-white/20 bg-white/[0.07] px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.14em] text-white/84 transition-colors duration-200 hover:bg-white/[0.14]"
            >
              About Xirako
            </a>
          </motion.div>
        </div>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1 }}
          href="#products"
          className="absolute bottom-7 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 font-body text-xs uppercase tracking-[0.16em] text-white/72 backdrop-blur-xl transition-colors duration-200 hover:text-white"
        >
          <ArrowDown className="h-3.5 w-3.5" />
          Scroll
        </motion.a>
      </div>
    </section>
  );
}
