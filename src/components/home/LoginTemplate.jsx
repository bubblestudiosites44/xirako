import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, LockKeyhole, Mail, MapPinned, MessagesSquare, Music2, Sparkles, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/AuthContext";

const modes = [
  { id: "signin", label: "Sign in" },
  { id: "signup", label: "Create account" },
];

const consumerSurfaces = [
  {
    title: "Music",
    description: "Your saved stations, uploads, and listening history stay in sync.",
    icon: Music2,
  },
  {
    title: "Maps",
    description: "Places, routes, and starred locations follow you across devices.",
    icon: MapPinned,
  },
  {
    title: "Messaging",
    description: "Private conversations and cross-app notifications stay connected.",
    icon: MessagesSquare,
  },
  {
    title: "AI",
    description: "Prompts, chat memory, and workflows are ready when you sign back in.",
    icon: Sparkles,
  },
];

export default function LoginTemplate() {
  const navigate = useNavigate();
  const { signIn, signUp, clearAuthError, isAuthenticated, isLoadingAuth } = useAuth();
  const [mode, setMode] = React.useState("signin");
  const [form, setForm] = React.useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [feedback, setFeedback] = React.useState({ type: "", message: "" });

  React.useEffect(() => {
    clearAuthError();
  }, [clearAuthError, mode]);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true, viewTransition: true });
    }
  }, [isAuthenticated, navigate]);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const submitAuth = async (event) => {
    event.preventDefault();
    clearAuthError();
    setFeedback({ type: "", message: "" });
    setSubmitting(true);

    const email = form.email.trim();
    const password = form.password;

    try {
      if (mode === "signup") {
        const { error, data } = await signUp({
          email,
          password,
          displayName: form.displayName.trim(),
        });

        if (error) {
          setFeedback({ type: "error", message: error.message });
          return;
        }

        if (data?.session) {
          setFeedback({ type: "success", message: "Account created. Taking you home now." });
          return;
        }

        setFeedback({
          type: "success",
          message: "Account created. Check your email to confirm it, then sign in here.",
        });
        setMode("signin");
        return;
      }

      const { error } = await signIn({ email, password });

      if (error) {
        setFeedback({ type: "error", message: error.message });
        return;
      }

      setFeedback({ type: "success", message: "Signed in. Redirecting you now." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.section
      id="login"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.25 }}
      className="relative w-full max-w-[76rem] overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(145deg,rgba(4,10,11,0.92),rgba(7,16,17,0.98))] shadow-[0_28px_90px_rgba(0,0,0,0.4)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(44,243,197,0.14),transparent_28%),radial-gradient(circle_at_82%_74%,rgba(80,219,243,0.12),transparent_28%)]" />

      <div className="relative grid lg:grid-cols-[minmax(0,1.02fr)_minmax(23rem,29rem)]">
        <div className="border-b border-white/8 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-body text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-primary/92">
            <LockKeyhole className="h-3.5 w-3.5" />
            Xirako Account
          </span>

          <h1 className="mt-7 max-w-2xl font-heading text-[clamp(2.5rem,6vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white">
            One login for music, maps, messaging, and AI.
          </h1>

          <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-white/72">
            Xirako works more like a connected consumer ecosystem than a corporate dashboard. Your
            account carries preferences, saved places, conversations, and AI activity across the
            services you use every day.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {consumerSurfaces.map((surface) => {
              const Icon = surface.icon;

              return (
                <article
                  key={surface.title}
                  className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4 backdrop-blur-xl"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 font-heading text-lg font-semibold text-white">{surface.title}</h2>
                  <p className="mt-2 font-body text-sm leading-relaxed text-white/62">
                    {surface.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/46">
                Account access
              </p>
              <h2 className="mt-3 font-heading text-[2rem] font-semibold leading-none text-white">
                {mode === "signin" ? "Sign in" : "Create account"}
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-body text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-primary/90">
              <UserRound className="h-3.5 w-3.5" />
              Supabase
            </div>
          </div>

          <div className="mt-6 inline-flex rounded-full border border-white/10 bg-black/25 p-1">
            {modes.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setMode(option.id)}
                className="relative rounded-full px-4 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-white/72"
              >
                {mode === option.id && (
                  <motion.span
                    layoutId="auth-mode-outline"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-full border border-white/16 bg-white/[0.05]"
                  />
                )}
                <span className="relative z-10">{option.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={submitAuth} className="mt-6 space-y-4">
            {mode === "signup" && (
              <label className="block">
                <span className="mb-2 block font-body text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/48">
                  Display name
                </span>
                <Input
                  type="text"
                  value={form.displayName}
                  onChange={updateField("displayName")}
                  placeholder="What should people call you?"
                  className="h-12 rounded-2xl border-white/10 bg-white/[0.04] px-4 text-white placeholder:text-white/28 focus-visible:ring-primary"
                  required={mode === "signup"}
                />
              </label>
            )}

            <label className="block">
              <span className="mb-2 block font-body text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/48">
                Email
              </span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/34" />
                <Input
                  type="email"
                  value={form.email}
                  onChange={updateField("email")}
                  placeholder="name@xirako.com"
                  className="h-12 rounded-2xl border-white/10 bg-white/[0.04] pl-11 pr-4 text-white placeholder:text-white/28 focus-visible:ring-primary"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block font-body text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/48">
                Password
              </span>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/34" />
                <Input
                  type="password"
                  value={form.password}
                  onChange={updateField("password")}
                  placeholder={mode === "signup" ? "Create a password" : "Enter your password"}
                  className="h-12 rounded-2xl border-white/10 bg-white/[0.04] pl-11 pr-4 text-white placeholder:text-white/28 focus-visible:ring-primary"
                  minLength={8}
                  required
                />
              </div>
            </label>

            {feedback.message && (
              <div
                className={`rounded-2xl border px-4 py-3 font-body text-sm ${
                  feedback.type === "error"
                    ? "border-red-500/30 bg-red-500/10 text-red-100"
                    : "border-primary/25 bg-primary/10 text-primary"
                }`}
              >
                {feedback.message}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setMode((current) => (current === "signin" ? "signup" : "signin"))}
                className="font-body text-sm font-medium text-primary transition-colors hover:text-white"
              >
                {mode === "signin" ? "Need an account?" : "Already have an account?"}
              </button>

              <Button
                type="submit"
                disabled={submitting || isLoadingAuth}
                className="h-11 rounded-full bg-primary px-6 text-[#02251f] shadow-none hover:bg-primary/90"
              >
                {submitting ? "Working..." : mode === "signin" ? "Sign in" : "Create account"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>

          <p className="mt-5 font-body text-xs leading-relaxed text-white/46">
            Email/password auth is powered by Supabase. New accounts can require email confirmation,
            depending on your project settings.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
