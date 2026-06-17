import React from "react";
import { KeyRound, Loader2, ShieldAlert, Trash2, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/AuthContext";

function getDisplayName(user) {
  return (
    user?.user_metadata?.display_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    ""
  );
}

export default function AccountSettingsDialog({ open, onOpenChange }) {
  const { user, updateProfile, resetPassword } = useAuth();
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
    if (!open) {
      return;
    }

    setDisplayName(currentDisplayName);
    setIsPasswordFormOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }, [currentDisplayName, open]);

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-1.5rem)] max-w-[34rem] rounded-[1.6rem] border border-white/10 bg-[#071112]/96 p-0 text-white shadow-[0_32px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:rounded-[2rem]">
        <div className="border-b border-white/8 px-5 py-5 sm:px-6 sm:py-6">
          <DialogHeader className="space-y-2 text-left">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-body text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-primary/92">
              <UserRound className="h-3.5 w-3.5" />
              Account settings
            </div>
            <DialogTitle className="font-heading text-[1.7rem] font-semibold tracking-[-0.03em] text-white">
              Manage your Xirako profile
            </DialogTitle>
            <DialogDescription className="max-w-[34ch] font-body text-sm leading-relaxed text-white/60">
              Update the name people see across Xirako and set a fresh password when needed.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
          <form
            onSubmit={handleProfileSave}
            className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4 sm:p-5"
          >
            <div className="space-y-4">
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
            </div>

            <div className="mt-5 flex justify-end">
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

          <section className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-body text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-primary/92">
                  <KeyRound className="h-3.5 w-3.5" />
                  Password
                </div>
                <h3 className="mt-3 font-heading text-lg font-semibold text-white">Reset password</h3>
                <p className="mt-2 max-w-[32ch] font-body text-sm leading-relaxed text-white/60">
                  Verify your current password, then choose a fresh one for your Xirako account.
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

                <div className="flex justify-end">
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

          <section className="rounded-[1.35rem] border border-red-500/18 bg-red-500/[0.06] p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-400/16 bg-red-500/10 text-red-200">
                <ShieldAlert className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-heading text-base font-semibold text-white">Danger zone</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-white/62">
                  Account deletion belongs behind a secure server-side action, so it is not exposed in
                  the browser yet.
                </p>
                <div className="mt-4 flex justify-end">
                  <Button type="button" variant="destructive" disabled className="h-10 rounded-full px-5 disabled:opacity-45">
                    <Trash2 className="h-4 w-4" />
                    Delete account
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-11 rounded-full border-white/10 bg-white/[0.03] px-5 text-white hover:bg-white/[0.08] hover:text-white"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
