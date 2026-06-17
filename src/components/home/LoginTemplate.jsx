import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, LockKeyhole, Mail, MapPinned, MessagesSquare, Music2, Sparkles, UserRound } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/AuthContext";
import { buildRelayUrl, getRequestedAppName, isAllowedReturnTo } from "@/lib/xirakoAuth";

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
  const [searchParams] = useSearchParams();
  const { session, signIn, signUp, clearAuthError, isAuthenticated, isLoadingAuth } = useAuth();
  const [mode, setMode] = React.useState("signin");
  const [form, setForm] = React.useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [feedback, setFeedback] = React.useState({ type: "", message: "" });
  const requestedAppName = getRequestedAppName(searchParams);
  const returnTo = searchParams.get("return_to") || "";
  const canRelayToApp = isAllowedReturnTo(returnTo);
  const isAppSpecificLogin = canRelayToApp && requestedAppName !== "Xirako";

  React.useEffect(() => {
    clearAuthError();
  }, [clearAuthError, mode]);

  React.useEffect(() => {
    if (!isAuthenticated || !session) {
      return;
    }

    if (canRelayToApp) {
      window.location.assign(buildRelayUrl(returnTo, session, requestedAppName));
      return;
    }

    if (isAuthenticated) {
      navigate("/", { replace: true, viewTransition: true });
    }
  }, [canRelayToApp, isAuthenticated, navigate, requestedAppName, returnTo, session]);

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
      className="relative w-full max-w-[76rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(145deg,rgba(4,10,11,0.92),rgba(7,16,17,0.98))] shadow-[0_28px_90px_rgba(0,0,0,0.4)] sm:rounded-[2.4rem]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(44,243,197,0.14),transparent_28%),radial-gradient(circle_at_82%_74%,rgba(80,219,243,0.12),transparent_28%)]" />

      <div className="relative grid lg:grid-cols-[minmax(0,1.02fr)_minmax(23rem,29rem)]">
        <div className="order-2 p-5 pt-6 sm:p-8 lg:order-1 lg:p-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 font-body text-[0.67rem] font-semibold uppercase tracking-[0.16em] text-primary/92 sm:px-4 sm:text-[0.72rem]">
            <LockKeyhole className="h-3.5 w-3.5" />
            {isAppSpecificLogin ? `${requestedAppName} sign-in` : "Xirako Account"}
          </span>

          <h1 className="mt-6 max-w-[12ch] font-heading text-[clamp(2.1rem,13vw,3.9rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-white sm:mt-7 sm:max-w-2xl sm:text-[clamp(2.5rem,6vw,5.6rem)] sm:leading-[0.95]">
            {isAppSpecificLogin
              ? `One Xirako login for ${requestedAppName}.`
              : "One login for music, maps, messaging, and AI."}
          </h1>

          <p className="mt-4 max-w-2xl font-body text-[0.98rem] leading-relaxed text-white/72 sm:mt-5 sm:text-base">
            {isAppSpecificLogin
              ? `Sign in here, then we will send the live Xirako session straight back to ${requestedAppName}. Your account follows you across the rest of the Xirako ecosystem too.`
              : `Xirako works more like a connected consumer ecosystem than a corporate dashboard. Your account carries preferences, saved places, conversations, and AI activity across the services you use every day.`}
          </p>

          <div className="mt-7 grid gap-3 min-[380px]:grid-cols-2 sm:mt-8 sm:grid-cols-2">
            {consumerSurfaces.map((surface) => {
              const Icon = surface.icon;

              return (
                <article
                  key={surface.title}
                  className="rounded-[1.35rem] border border-white/10 bg-black/20 p-3.5 backdrop-blur-xl sm:rounded-[1.5rem] sm:p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-[1.1rem] border border-white/10 bg-white/[0.04] text-primary sm:h-11 sm:w-11 sm:rounded-2xl">
                    <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                  </div>
                  <h2 className="mt-3 font-heading text-[1.02rem] font-semibold text-white sm:mt-4 sm:text-lg">{surface.title}</h2>
                  <p className="mt-2 font-body text-[0.8rem] leading-relaxed text-white/62 sm:text-sm">
                    {surface.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="order-1 border-b border-white/8 p-5 sm:p-8 lg:order-2 lg:border-b-0 lg:border-l lg:border-white/8 lg:p-10">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div>
              <p className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/46">
                Account access
              </p>
              <h2 className="mt-2.5 max-w-[10ch] font-heading text-[1.9rem] font-semibold leading-[0.92] text-white sm:mt-3 sm:max-w-none sm:text-[2rem] sm:leading-none">
                {mode === "signin"
                  ? isAppSpecificLogin
                    ? `Sign in to ${requestedAppName}`
                    : "Sign in"
                  : isAppSpecificLogin
                    ? `Create your ${requestedAppName} account`
                    : "Create account"}
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-body text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-primary/90 sm:text-[0.66rem]">
              <UserRound className="h-3.5 w-3.5" />
              Xirako ID
            </div>
          </div>

          <div className="mt-5 inline-flex w-full rounded-full border border-white/10 bg-black/25 p-1 sm:mt-6">
            {modes.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setMode(option.id)}
                className="relative flex-1 rounded-full px-4 py-2.5 text-center font-body text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/72 sm:text-xs"
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

          <form onSubmit={submitAuth} className="mt-5 space-y-4 sm:mt-6">
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
                  className="h-11 rounded-xl border-white/10 bg-white/[0.04] px-4 text-white placeholder:text-white/28 focus-visible:ring-primary sm:h-12 sm:rounded-2xl"
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
                  className="h-11 rounded-xl border-white/10 bg-white/[0.04] pl-11 pr-4 text-white placeholder:text-white/28 focus-visible:ring-primary sm:h-12 sm:rounded-2xl"
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
                  className="h-11 rounded-xl border-white/10 bg-white/[0.04] pl-11 pr-4 text-white placeholder:text-white/28 focus-visible:ring-primary sm:h-12 sm:rounded-2xl"
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

            {isAppSpecificLogin && (
              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-body text-sm text-white/60 sm:rounded-2xl">
                After sign-in, you will be sent back to <span className="text-white">{requestedAppName}</span>.
              </div>
            )}

            <div className="flex flex-col-reverse items-stretch gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setMode((current) => (current === "signin" ? "signup" : "signin"))}
                className="text-left font-body text-sm font-medium text-primary transition-colors hover:text-white"
              >
                {mode === "signin" ? "Need an account?" : "Already have an account?"}
              </button>

              <Button
                type="submit"
                disabled={submitting || isLoadingAuth}
                className="h-11 w-full justify-center rounded-full bg-primary px-6 text-[#02251f] shadow-none hover:bg-primary/90 sm:w-auto"
              >
                {submitting ? "Working..." : mode === "signin" ? "Sign in" : "Create account"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>

          <p className="mt-5 font-body text-xs leading-relaxed text-white/46">
            New accounts may need email confirmation before the first login, depending on your Xirako account settings.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
