import React from "react";

const links = [
  { label: "Xirako Music", href: "https://music.xirako.com" },
  { label: "Xirako Maps", href: "https://maps.xirako.com" },
  { label: "Xirako Classroom", href: "https://classroom.xirako.com" },
  { label: "Virexa", href: "https://virexa.xirako.com" },
  { label: "XirAI", href: "https://ai.xirako.com" },
];

export default function Footer() {
  return (
    <footer className="px-3 pb-4 pt-2 sm:px-5 lg:px-7">
      <div className="mx-auto max-w-[1600px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#030506] px-6 py-12 shadow-[0_25px_80px_rgba(0,0,0,0.52)] sm:px-10 sm:py-14">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <img
                src="https://media.base44.com/images/public/69d2dc7d58d5d0f867c281d2/b2ef9950c_Xirako.png"
                alt="Xirako"
                className="h-7 w-7 object-contain"
              />
              <span className="font-heading text-lg font-semibold tracking-[-0.02em] text-white">Xirako</span>
            </div>
            <p className="max-w-sm font-body text-sm leading-relaxed text-white/66">
              Designing tools that feel cohesive across every touchpoint, from discovery to execution.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-white/62 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-11 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-7 sm:flex-row">
          <span className="font-body text-xs uppercase tracking-[0.14em] text-white/48">
            Copyright {new Date().getFullYear()} Xirako. All rights reserved.
          </span>
          <span className="font-body text-xs uppercase tracking-[0.14em] text-white/48">xirako.com</span>
        </div>
      </div>
    </footer>
  );
}
