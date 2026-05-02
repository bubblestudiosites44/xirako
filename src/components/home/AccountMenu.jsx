import React from "react";
import { ChevronDown, LogIn, LogOut, Plus, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/AuthContext";

function getAccountName(user) {
  return user?.full_name || user?.name || user?.email || "Guest";
}

function getAccountDetail(user) {
  return user?.email || (user ? "Signed in" : "Use secure sign-in");
}

function getInitials(user) {
  const name = getAccountName(user);
  const parts = name.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return name.slice(0, 2).toUpperCase();
}

export default function AccountMenu({ mobile = false }) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login", { viewTransition: true });
  };

  const handleCreateAccount = () => {
    navigate("/login", { viewTransition: true });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={
            mobile
              ? "flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white shadow-2xl shadow-black/40 backdrop-blur-xl"
              : "inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-black/72 px-2.5 text-white shadow-2xl shadow-black/40 backdrop-blur-xl transition-colors hover:bg-black/82"
          }
          aria-label={isAuthenticated ? "Open profile menu" : "Open account menu"}
        >
          <Avatar className="h-8 w-8 border border-white/10 bg-white/[0.06]">
            <AvatarFallback className="bg-white/[0.06] font-body text-[0.72rem] font-semibold text-white">
              {isAuthenticated ? getInitials(user) : <UserRound className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>

          {!mobile && (
            <>
              <div className="min-w-0 text-left">
                <p className="truncate font-body text-[0.75rem] font-semibold leading-none text-white">
                  {isAuthenticated ? getAccountName(user) : "Account"}
                </p>
                <p className="mt-1 truncate font-body text-[0.62rem] uppercase tracking-[0.12em] text-white/48">
                  {isAuthenticated ? "Profile" : "Login or join"}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-white/56" />
            </>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-60 rounded-3xl border border-white/10 bg-[#071011]/95 p-2 text-white shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
      >
        <DropdownMenuLabel className="rounded-2xl px-3 py-3">
          <p className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/46">
            {isAuthenticated ? "Signed in" : "Studio account"}
          </p>
          <p className="mt-2 truncate font-heading text-base font-semibold text-white">
            {getAccountName(user)}
          </p>
          <p className="mt-1 truncate font-body text-sm text-white/58">{getAccountDetail(user)}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-white/8" />

        {isAuthenticated ? (
          <DropdownMenuItem
            onSelect={() => logout()}
            className="rounded-2xl px-3 py-3 font-body text-sm text-white/86 focus:bg-white/10 focus:text-white"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem
              onSelect={handleLogin}
              className="rounded-2xl px-3 py-3 font-body text-sm text-white/86 focus:bg-white/10 focus:text-white"
            >
              <LogIn className="h-4 w-4" />
              Log in
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={handleCreateAccount}
              className="rounded-2xl px-3 py-3 font-body text-sm text-white/86 focus:bg-white/10 focus:text-white"
            >
              <Plus className="h-4 w-4" />
              Create account
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
