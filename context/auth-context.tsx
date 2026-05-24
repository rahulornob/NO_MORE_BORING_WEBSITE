"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toggleFavoriteAction, getUserFavoritesAction } from "@/app/actions";

export type User = {
  email: string;
  name: string;
  avatar: string;
  role: "admin" | "user";
};

type AuthContextType = {
  user: User | null;
  favorites: string[];
  login: (role: "admin" | "user") => void;
  logout: () => void;
  toggleFavorite: (siteId: string) => Promise<void>;
  isSigningIn: boolean;
  setIsSigningIn: (val: boolean) => void;
  isGrayscale: boolean;
  toggleGrayscale: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(false);

  // Sync favorites from database when user changes
  useEffect(() => {
    if (user) {
      getUserFavoritesAction(user.email).then((favs) => {
        setFavorites(favs);
      });
    } else {
      setFavorites([]);
    }
  }, [user]);

  // Handle localstorage persistence of session
  useEffect(() => {
    const savedUser = localStorage.getItem("nbw_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("nbw_user");
      }
    }

    // Sync Grayscale theme choice on load
    const savedGrayscale = localStorage.getItem("nbw_grayscale") === "true";
    setIsGrayscale(savedGrayscale);
    if (savedGrayscale) {
      document.documentElement.classList.add("grayscale-mode");
    } else {
      document.documentElement.classList.remove("grayscale-mode");
    }
  }, []);

  const login = (role: "admin" | "user") => {
    const mockUser: User = {
      email: role === "admin" ? "admin@nomoreboring.com" : "designer@example.com",
      name: role === "admin" ? "Admin Curator" : "Creative Designer",
      avatar: role === "admin" 
        ? "https://api.dicebear.com/7.x/bottts/svg?seed=admin" 
        : "https://api.dicebear.com/7.x/adventurer/svg?seed=designer",
      role,
    };
    setUser(mockUser);
    localStorage.setItem("nbw_user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nbw_user");
  };

  const toggleFavorite = async (siteId: string) => {
    if (!user) return;
    const updatedFavs = await toggleFavoriteAction(user.email, siteId);
    setFavorites(updatedFavs);
  };

  const toggleGrayscale = () => {
    const nextVal = !isGrayscale;
    setIsGrayscale(nextVal);
    localStorage.setItem("nbw_grayscale", String(nextVal));
    if (nextVal) {
      document.documentElement.classList.add("grayscale-mode");
    } else {
      document.documentElement.classList.remove("grayscale-mode");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        favorites,
        login,
        logout,
        toggleFavorite,
        isSigningIn,
        setIsSigningIn,
        isGrayscale,
        toggleGrayscale,
      }}
    >
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
