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
    <footer className="border-t border-border/50 bg-card/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="https://media.base44.com/images/public/69d2dc7d58d5d0f867c281d2/b2ef9950c_Xirako.png" alt="Xirako" className="w-7 h-7 object-contain" />
              <span className="font-heading font-bold text-lg text-foreground tracking-tight">Xirako</span>
            </div>
            <p className="font-body text-sm text-muted-foreground max-w-xs">
              Building powerful software for the modern web. One platform, endless possibilities.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} Xirako. All rights reserved.
          </span>
          <span className="font-body text-xs text-muted-foreground">
            xirako.com
          </span>
        </div>
      </div>
    </footer>
  );
}