import React from "react";
import { Loader2, ShieldAlert, Trash2, UserRound } from "lucide-react";
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
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  const currentDisplayName = getDisplayName(user);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    setDisplayName(currentDisplayName);
    setNewPassword("");
  }, [currentDisplayName, open]);

  const handleSave = async (event) => {
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

    if (newPassword && newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Use at least 8 characters for a new password.",
        variant: "destructive",
      });
      return;
    }

    if (trimmedName === currentDisplayName && !newPassword) {
      toast({
        title: "Nothing to save",
        description: "Change your display name or add a new password first.",
      });
      return;
    }

    setSaving(true);

    try {
      const { error } = await updateProfile({
        displayName: trimmedName,
        password: newPassword || undefined,
      });

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
        description: "Your Xirako profile changes are now live.",
      });
      onOpenChange(false);
    } finally {
      setSaving(false);
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

        <form onSubmit={handleSave} className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
          <section className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
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

              <label className="block">
                <span className="mb-2 block font-body text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/48">
                  New password
                </span>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="Leave blank to keep your current password"
                  className="h-11 rounded-xl border-white/10 bg-white/[0.04] px-4 text-white placeholder:text-white/28 focus-visible:ring-primary sm:h-12 sm:rounded-2xl"
                />
              </label>
            </div>
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
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-body text-xs leading-relaxed text-white/46">
                    This section is ready for a proper deletion endpoint when you want to wire one in.
                  </p>
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

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-11 rounded-full border-white/10 bg-white/[0.03] px-5 text-white hover:bg-white/[0.08] hover:text-white"
            >
              Close
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="h-11 rounded-full bg-primary px-6 text-[#02251f] hover:bg-primary/90"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
