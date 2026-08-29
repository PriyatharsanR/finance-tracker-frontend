"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthResponse } from "@/services/authService";

interface AuthContextType {
  user: AuthResponse | null;
  loading: boolean;
  login: (userData: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists in cookie
    if (typeof document !== "undefined") {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; token=`);
      if (parts.length === 2) {
        const token = parts.pop()?.split(";").shift();
        if (token) {
          // Just for simple restoration, we could get user details from localStorage
          const cachedUser = localStorage.getItem("user");
          if (cachedUser) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(JSON.parse(cachedUser));
          }
        }
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: AuthResponse) => {
    setUser(userData);
    if (typeof document !== "undefined") {
      document.cookie = `token=${userData.token}; path=/; max-age=86400`;
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof document !== "undefined") {
      document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
