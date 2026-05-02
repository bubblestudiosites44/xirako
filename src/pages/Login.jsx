import React from "react";
import Navbar from "../components/home/Navbar";
import LoginTemplate from "../components/home/LoginTemplate";
import SitePageLayout from "../components/layout/SitePageLayout";

export default function Login() {
  return (
    <SitePageLayout>
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

          <div className="relative z-10 mx-auto flex min-h-[68vh] w-full max-w-[78rem] items-center justify-center">
            <LoginTemplate />
          </div>
        </div>
      </section>
    </SitePageLayout>
  );
}
