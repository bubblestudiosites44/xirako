import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);

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
      } = await supabase.auth.getSession();

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
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
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

    const { data, error } = await supabase.auth.signInWithPassword({
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

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          typeof window !== "undefined" ? `${window.location.origin}/login` : undefined,
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

    const { error } = await supabase.auth.signOut();

    if (error) {
      setAuthError({
        type: "sign_out",
        message: error.message,
      });
    }

    return { error };
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
