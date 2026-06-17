import React from "react";
import { KeyRound, Loader2, LogIn, ShieldAlert, Sparkles, Trash2, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/AuthContext";
import SitePageLayout from "../components/layout/SitePageLayout";
import StaticPageShell from "../components/layout/StaticPageShell";

function getDisplayName(user) {
  return (
    user?.user_metadata?.display_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    ""
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
      <p className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/42">
        {label}
      </p>
      <p className="max-w-[15rem] text-right font-body text-sm text-white/78">{value}</p>
    </div>
  );
}

export default function Account() {
  const { user, isAuthenticated, updateProfile, resetPassword } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = React.useState("");
  const [isPasswordFormOpen, setIsPasswordFormOpen] = React.useState(false);
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [savingProfile, setSavingProfile] = React.useState(false);
  const [savingPassword, setSavingPassword] = React.useState(false);

  const currentDisplayName = getDisplayName(user);

  React.useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    setDisplayName(currentDisplayName);
    setIsPasswordFormOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }, [currentDisplayName, isAuthenticated]);

  const handleProfileSave = async (event) => {
    event.preventDefault();

    const trimmedName = displayName.trim();

    if (!trimmedName) {
      toast({
        title: "Display name required",
        description: "Choose the name you want to show across your Xirako apps.",
        variant: "destructive",
      });
      return;
    }

    if (trimmedName === currentDisplayName) {
      toast({
        title: "Nothing to save",
        description: "Change your display name first.",
      });
      return;
    }

    setSavingProfile(true);

    try {
      const { error } = await updateProfile({ displayName: trimmedName });

      if (error) {
        toast({
          title: "Could not update account",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Account updated",
        description: "Your display name is now live across Xirako.",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordReset = async (event) => {
    event.preventDefault();

    if (!currentPassword) {
      toast({
        title: "Current password required",
        description: "Enter your current password before choosing a new one.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Use at least 8 characters for your new password.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Double-check the new password and confirmation fields.",
        variant: "destructive",
      });
      return;
    }

    if (currentPassword === newPassword) {
      toast({
        title: "Choose a different password",
        description: "Your new password should be different from the current one.",
        variant: "destructive",
      });
      return;
    }

    setSavingPassword(true);

    try {
      const { error } = await resetPassword({
        currentPassword,
        newPassword,
      });

      if (error) {
        toast({
          title: "Could not reset password",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Password updated",
        description: "Your Xirako password has been reset successfully.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsPasswordFormOpen(false);
    } finally {
      setSavingPassword(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <SitePageLayout>
        <StaticPageShell
          eyebrow="Xirako Account"
          title="Sign in to manage your account."
          description="Use your Xirako login to update profile details, security settings, and future account controls."
        >
          <article className="max-w-2xl rounded-[2rem] border border-white/12 bg-black/45 p-6 backdrop-blur-xl sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-heading text-2xl font-semibold text-white">Account page is ready</h2>
                <p className="mt-2 max-w-[34ch] font-body text-sm leading-relaxed text-white/68">
                  Sign in first, then this page becomes your Xirako settings hub.
                </p>
              </div>

              <Button
                asChild
                className="h-11 rounded-full bg-primary px-6 text-[#02251f] hover:bg-primary/90"
              >
                <Link to="/login">
                  <LogIn className="h-4 w-4" />
                  Sign in
                </Link>
              </Button>
            </div>
          </article>
        </StaticPageShell>
      </SitePageLayout>
    );
  }

  return (
    <SitePageLayout>
      <StaticPageShell
        eyebrow="Xirako Account"
        title="Your account, security, and profile."
        description="A single place to manage how your Xirako identity looks and how it stays protected across every app."
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <aside className="space-y-4">
            <article className="rounded-[2rem] border border-white/12 bg-black/45 p-5 backdrop-blur-xl sm:p-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-body text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-primary/92">
                <UserRound className="h-3.5 w-3.5" />
                Account overview
              </div>

              <h2 className="mt-4 font-heading text-[1.9rem] font-semibold tracking-[-0.03em] text-white">
                {currentDisplayName || "Your Xirako profile"}
              </h2>
              <p className="mt-2 font-body text-sm leading-relaxed text-white/64">
                This page works like your central Xirako account hub, similar to a dedicated Google account area.
              </p>

              <div className="mt-5 space-y-3">
                <SummaryRow label="Display name" value={currentDisplayName || "Not set"} />
                <SummaryRow label="Email" value={user?.email || "Unknown"} />
                <SummaryRow label="Signed in" value="Active session" />
              </div>
            </article>

            <article className="rounded-[2rem] border border-white/12 bg-black/45 p-5 backdrop-blur-xl sm:p-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-body text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-primary/92">
                <Sparkles className="h-3.5 w-3.5" />
                Across Xirako
              </div>
              <ul className="mt-4 space-y-3 font-body text-sm leading-relaxed text-white/68">
                <li>Display name updates follow you across supported Xirako apps.</li>
                <li>Password changes apply to your shared sign-in.</li>
                <li>More account controls can live here as the ecosystem grows.</li>
              </ul>
            </article>
          </aside>

          <div className="space-y-6">
            <section className="rounded-[2rem] border border-white/12 bg-black/45 p-5 backdrop-blur-xl sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-body text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-primary/92">
                    <UserRound className="h-3.5 w-3.5" />
                    Profile
                  </div>
                  <h3 className="mt-3 font-heading text-2xl font-semibold text-white">Personal info</h3>
                  <p className="mt-2 max-w-[36ch] font-body text-sm leading-relaxed text-white/60">
                    Keep the identity side of your Xirako account clean and consistent.
                  </p>
                </div>
              </div>

              <form onSubmit={handleProfileSave} className="mt-5 space-y-4">
                <label className="block">
                  <span className="mb-2 block font-body text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/48">
                    Display name
                  </span>
                  <Input
                    type="text"
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                    placeholder="How your name appears"
                    className="h-11 rounded-xl border-white/10 bg-white/[0.04] px-4 text-white placeholder:text-white/28 focus-visible:ring-primary sm:h-12 sm:rounded-2xl"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block font-body text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/48">
                    Email
                  </span>
                  <Input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    disabled
                    className="h-11 rounded-xl border-white/10 bg-white/[0.03] px-4 text-white/56 disabled:cursor-not-allowed disabled:opacity-100 sm:h-12 sm:rounded-2xl"
                  />
                </label>

                <div className="flex justify-end pt-1">
                  <Button
                    type="submit"
                    disabled={savingProfile}
                    className="h-11 rounded-full bg-primary px-6 text-[#02251f] hover:bg-primary/90"
                  >
                    {savingProfile ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    {savingProfile ? "Saving..." : "Save profile"}
                  </Button>
                </div>
              </form>
            </section>

            <section className="rounded-[2rem] border border-white/12 bg-black/45 p-5 backdrop-blur-xl sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-body text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-primary/92">
                    <KeyRound className="h-3.5 w-3.5" />
                    Security
                  </div>
                  <h3 className="mt-3 font-heading text-2xl font-semibold text-white">Password</h3>
                  <p className="mt-2 max-w-[36ch] font-body text-sm leading-relaxed text-white/60">
                    Verify your current password first, then set a new one for your shared Xirako sign-in.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsPasswordFormOpen((current) => !current)}
                  className="h-10 rounded-full border-white/10 bg-white/[0.03] px-5 text-white hover:bg-white/[0.08] hover:text-white"
                >
                  {isPasswordFormOpen ? "Cancel" : "Reset password"}
                </Button>
              </div>

              {isPasswordFormOpen && (
                <form onSubmit={handlePasswordReset} className="mt-5 space-y-4 border-t border-white/8 pt-5">
                  <label className="block">
                    <span className="mb-2 block font-body text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/48">
                      Current password
                    </span>
                    <Input
                      type="password"
                      value={currentPassword}
                      onChange={(event) => setCurrentPassword(event.target.value)}
                      placeholder="Enter your current password"
                      className="h-11 rounded-xl border-white/10 bg-white/[0.04] px-4 text-white placeholder:text-white/28 focus-visible:ring-primary sm:h-12 sm:rounded-2xl"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block font-body text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/48">
                      New password
                    </span>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      placeholder="Choose a new password"
                      className="h-11 rounded-xl border-white/10 bg-white/[0.04] px-4 text-white placeholder:text-white/28 focus-visible:ring-primary sm:h-12 sm:rounded-2xl"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block font-body text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/48">
                      Confirm new password
                    </span>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      placeholder="Re-enter your new password"
                      className="h-11 rounded-xl border-white/10 bg-white/[0.04] px-4 text-white placeholder:text-white/28 focus-visible:ring-primary sm:h-12 sm:rounded-2xl"
                    />
                  </label>

                  <div className="flex justify-end pt-1">
                    <Button
                      type="submit"
                      disabled={savingPassword}
                      className="h-11 rounded-full bg-primary px-6 text-[#02251f] hover:bg-primary/90"
                    >
                      {savingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                      {savingPassword ? "Updating..." : "Update password"}
                    </Button>
                  </div>
                </form>
              )}
            </section>

            <section className="rounded-[2rem] border border-red-500/18 bg-red-500/[0.06] p-5 backdrop-blur-xl sm:p-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-400/16 bg-red-500/10 text-red-200">
                  <ShieldAlert className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading text-xl font-semibold text-white">Danger zone</h3>
                  <p className="mt-2 max-w-[40ch] font-body text-sm leading-relaxed text-white/62">
                    Account deletion still needs a secure backend endpoint before it can be safely enabled here.
                  </p>
                  <div className="mt-4 flex justify-end">
                    <Button
                      type="button"
                      variant="destructive"
                      disabled
                      className="h-10 rounded-full px-5 disabled:opacity-45"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete account
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </StaticPageShell>
    </SitePageLayout>
  );
}
