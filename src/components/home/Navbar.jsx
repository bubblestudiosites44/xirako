import React from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="https://xirako.com" className="flex items-center gap-2">
          <img src="https://media.base44.com/images/public/69d2dc7d58d5d0f867c281d2/b2ef9950c_Xirako.png" alt="Xirako" className="w-8 h-8 object-contain" />
          <span className="font-heading font-bold text-xl text-foreground tracking-tight">Xirako</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Products</a>
          <a href="https://xirako.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
          <a
            href="https://ai.xirako.com"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Try XirAI
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
        >
          <div className="px-6 py-4 flex flex-col gap-3">
            <a href="#products" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">Products</a>
            <a href="https://xirako.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">About</a>
            <a
              href="https://ai.xirako.com"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium text-center hover:opacity-90 transition-opacity"
            >
              Try XirAI
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}