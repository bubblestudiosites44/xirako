import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const ecosystemSignals = ["Music", "Maps", "Classroom", "Secure Chat", "AI"];

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="hero-frame texture-grain relative isolate min-h-[90vh] overflow-hidden px-5 pb-10 pt-24 sm:px-9 sm:pt-28 lg:px-14 lg:pt-32">
        <Navbar />

        <div className="pointer-events-none absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="animate-video-pan h-full w-full scale-[1.34] object-cover opacity-[0.18] blur-3xl brightness-[0.7] saturate-150"
          >
            <source src="/xirako-motion.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(1,7,8,0.92)_14%,rgba(1,7,8,0.5)_47%,rgba(1,7,8,0.84)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(41,245,189,0.22),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(116,245,255,0.2),transparent_32%),linear-gradient(180deg,rgba(1,4,5,0.12)_0%,rgba(2,9,10,0.76)_100%)]" />
          <div className="absolute inset-y-0 left-[-22%] w-[34%] rotate-[8deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)] blur-3xl animate-scanline" />
        </div>

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-20 h-[23rem] w-[23rem] rounded-full bg-[radial-gradient(circle,_rgba(6,188,114,0.78)_0%,_rgba(3,38,28,0.2)_55%,_transparent_75%)] opacity-80 blur-[24px] animate-drift-slow sm:h-[28rem] sm:w-[28rem] sm:opacity-100" />
          <div className="absolute -right-16 top-28 h-[17rem] w-[20rem] rounded-full bg-[radial-gradient(circle,_rgba(148,255,250,0.95)_0%,_rgba(9,103,109,0.25)_52%,_transparent_75%)] opacity-60 blur-[28px] animate-drift-fast sm:-right-24 sm:top-24 sm:h-[26rem] sm:w-[34rem] sm:opacity-100 sm:blur-[32px]" />
          <div className="absolute -left-24 bottom-[-7rem] h-[20rem] w-[23rem] rounded-full bg-[radial-gradient(circle,_rgba(232,255,247,0.95)_0%,_rgba(11,169,150,0.35)_45%,_transparent_80%)] blur-[28px] animate-drift-fast" />
          <div className="absolute right-[-4rem] bottom-[-5rem] h-[22rem] w-[27rem] rounded-full bg-[radial-gradient(circle,_rgba(0,245,228,0.75)_0%,_rgba(6,112,117,0.2)_52%,_transparent_75%)] blur-[24px] animate-drift-slow" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[68vh] w-full max-w-[78rem] items-center">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="inline-flex flex-wrap items-center gap-3 rounded-full border border-white/12 bg-black/30 px-4 py-2 font-body text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/72 backdrop-blur-xl"
            >
              <span className="h-2 w-2 rounded-full bg-primary" />
              Connected tools for the modern studio
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="mt-7 font-heading text-[clamp(2rem,4vw,4.2rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white/92"
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
              className="mt-6 max-w-2xl font-body text-[0.95rem] leading-relaxed text-white/80 sm:text-base sm:text-white/76"
            >
              A connected ecosystem for music, maps, classroom tools, secure messaging, and AI. Crafted
              to feel fast, clear, and cinematic.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.58 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {ecosystemSignals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-2 font-body text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/66 backdrop-blur-xl"
                >
                  {signal}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.65 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/projects"
                className="rounded-full border border-primary/60 bg-primary/90 px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-[#02251f] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Explore Products
              </Link>
              <Link
                to="/about"
                className="rounded-full border border-white/20 bg-white/[0.07] px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.14em] text-white/84 transition-colors duration-200 hover:bg-white/[0.14]"
              >
                About Xirako
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.a
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95 }}
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
