import React, { createContext, useState, useContext, useEffect } from "react";
import { authClient } from "@/lib/authClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);

  const applyUserUpdate = (nextUser) => {
    setUser(nextUser ?? null);
    setSession((current) => (current ? { ...current, user: nextUser ?? null } : current));
    setIsAuthenticated(Boolean(nextUser));
  };

  useEffect(() => {
    let isMounted = true;

    const syncSession = (nextSession) => {
      if (!isMounted) {
        return;
      }

      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setIsAuthenticated(Boolean(nextSession?.user));
      setIsLoadingAuth(false);
    };

    const bootstrapAuth = async () => {
      setIsLoadingAuth(true);
      setAuthError(null);

      const {
        data: { session: currentSession },
        error,
      } = await authClient.auth.getSession();

      if (error && isMounted) {
        setAuthError({
          type: "session_error",
          message: error.message,
        });
      }

      syncSession(currentSession ?? null);
    };

    bootstrapAuth();

    const {
      data: { subscription },
    } = authClient.auth.onAuthStateChange((event, nextSession) => {
      if (!isMounted) {
        return;
      }

      if (event === "SIGNED_OUT") {
        setAuthError(null);
      }

      syncSession(nextSession ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async ({ email, password }) => {
    setAuthError(null);

    const { data, error } = await authClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError({
        type: "sign_in",
        message: error.message,
      });
    }

    return { data, error };
  };

  const signUp = async ({ email, password, displayName }) => {
    setAuthError(null);

    const redirectUrl =
      typeof window !== "undefined" ? window.location.href.split("#")[0] : undefined;

    const { data, error } = await authClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) {
      setAuthError({
        type: "sign_up",
        message: error.message,
      });
    }

    return { data, error };
  };

  const logout = async () => {
    setAuthError(null);

    const { error } = await authClient.auth.signOut();

    if (error) {
      setAuthError({
        type: "sign_out",
        message: error.message,
      });
    }

    return { error };
  };

  const updateProfile = async ({ displayName }) => {
    setAuthError(null);

    const payload = {};
    const nextDisplayName = displayName?.trim();

    if (nextDisplayName) {
      payload.data = {
        display_name: nextDisplayName,
      };
    }

    if (!Object.keys(payload).length) {
      return { data: null, error: null };
    }

    const { data, error } = await authClient.auth.updateUser(payload);

    if (error) {
      setAuthError({
        type: "profile_update",
        message: error.message,
      });
    }

    if (data?.user) {
      applyUserUpdate(data.user);
    }

    return { data, error };
  };

  const resetPassword = async ({ currentPassword, newPassword }) => {
    setAuthError(null);

    if (!user?.email) {
      const error = new Error("We could not verify your account email for this password reset.");
      setAuthError({
        type: "password_reset",
        message: error.message,
      });
      return { data: null, error };
    }

    const { error: verifyError } = await authClient.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (verifyError) {
      const error = new Error("Your current password is incorrect.");
      setAuthError({
        type: "password_reset",
        message: error.message,
      });
      return { data: null, error };
    }

    const { data, error } = await authClient.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setAuthError({
        type: "password_reset",
        message: error.message,
      });
    }

    if (data?.user) {
      applyUserUpdate(data.user);
    }

    return { data, error };
  };

  const navigateToLogin = () => {
    if (typeof window !== "undefined") {
      window.location.assign("/login");
    }
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
      session,
      user,
      isAuthenticated,
      isLoadingAuth,
      authError,
      signIn,
      signUp,
      logout,
      updateProfile,
      resetPassword,
      navigateToLogin,
      clearAuthError,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
