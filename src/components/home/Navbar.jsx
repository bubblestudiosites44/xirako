import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import AccountMenu from "./AccountMenu";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact", highlighted: true },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="absolute left-4 right-4 top-4 z-30 flex items-center justify-between gap-3 sm:left-7 sm:right-7 sm:top-7 lg:left-10 lg:right-10"
    >
      <Link
        to="/"
        unstable_viewTransition
        className="hidden min-w-[235px] items-center gap-3 rounded-full border border-white/10 bg-black/72 px-3 py-2 text-white/95 shadow-2xl shadow-black/40 backdrop-blur-xl sm:flex"
      >
        <img
          src="https://media.base44.com/images/public/69d2dc7d58d5d0f867c281d2/b2ef9950c_Xirako.png"
          alt="Xirako"
          className="h-10 w-10 rounded-full bg-white/10 object-contain p-1"
        />
        <div>
          <p className="font-body text-[0.86rem] font-semibold leading-none">Xirako Studio</p>
          <p className="mt-1 text-[0.66rem] uppercase tracking-[0.16em] text-white/55">Creative Suite</p>
        </div>
      </Link>

      <Link
        to="/"
        unstable_viewTransition
        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-xl sm:hidden"
        aria-label="Open Xirako home"
      >
        <img
          src="https://media.base44.com/images/public/69d2dc7d58d5d0f867c281d2/b2ef9950c_Xirako.png"
          alt="Xirako"
          className="h-7 w-7 object-contain"
        />
      </Link>

      <div className="relative ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/72 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:flex">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === "/"}
              unstable_viewTransition
              className="relative isolate overflow-hidden rounded-full"
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="desktop-nav-slide"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      className={`absolute inset-0 rounded-full ${
                        link.highlighted
                          ? "border border-primary/45 bg-primary/8 shadow-[0_0_0_1px_rgba(44,243,197,0.16),0_0_18px_rgba(44,243,197,0.18)]"
                          : "border border-white/18 bg-white/[0.04]"
                      }`}
                    />
                  )}

                  {!isActive && link.highlighted && (
                    <span className="absolute inset-0 rounded-full border border-primary/28 bg-primary/[0.06]" />
                  )}

                  <span
                    className={`relative z-10 block px-4 py-2.5 font-body text-xs uppercase tracking-[0.12em] transition-colors duration-200 ${
                      link.highlighted ? "font-semibold" : "font-medium"
                    } ${
                      isActive
                        ? link.highlighted
                          ? "text-primary"
                          : "text-white"
                        : link.highlighted
                          ? "text-primary"
                          : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden sm:block">
          <AccountMenu />
        </div>

        <div className="sm:hidden">
          <AccountMenu mobile />
        </div>

        <button
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white shadow-2xl shadow-black/40 backdrop-blur-xl sm:hidden"
          onClick={() => setOpen((state) => !state)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-16 flex w-52 flex-col gap-1 rounded-3xl border border-white/10 bg-black/85 p-2 shadow-2xl shadow-black/55 backdrop-blur-2xl sm:hidden"
            >
              {links.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  end={link.to === "/"}
                  unstable_viewTransition
                  className={({ isActive }) =>
                    link.highlighted
                      ? "rounded-2xl bg-primary px-4 py-2.5 text-center font-body text-xs font-semibold uppercase tracking-[0.12em] text-[#03221d]"
                      : `rounded-2xl px-4 py-2.5 text-center font-body text-xs font-medium uppercase tracking-[0.12em] ${
                          isActive ? "bg-white/10 text-white" : "text-white/78"
                        }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
