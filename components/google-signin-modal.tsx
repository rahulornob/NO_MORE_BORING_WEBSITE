"use client";

import { useAuth } from "@/context/auth-context";
import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";

export function GoogleSignInModal() {
  const { isSigningIn, setIsSigningIn, login } = useAuth();
  const [step, setStep] = useState<"options" | "loading">("options");
  const [selectedRole, setSelectedRole] = useState<"admin" | "user" | null>(null);

  useEffect(() => {
    if (!isSigningIn) {
      setStep("options");
      setSelectedRole(null);
    }
  }, [isSigningIn]);

  if (!isSigningIn) return null;

  const handleSelectRole = (role: "admin" | "user") => {
    setSelectedRole(role);
    setStep("loading");
    setTimeout(() => {
      login(role);
      setIsSigningIn(false);
    }, 1800); // realistic simulated redirect wait
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-[400px] rounded-2xl border border-white/10 bg-[#0e1014] p-6 shadow-2xl transition-all duration-300">
        
        {/* Close Button */}
        <button
          onClick={() => setIsSigningIn(false)}
          className="absolute right-4 top-4 rounded-full p-1 text-white/40 hover:bg-white/5 hover:text-white transition"
        >
          <X className="size-5" />
        </button>

        {step === "options" ? (
          <div>
            <div className="flex flex-col items-center text-center gap-2 mb-6">
              {/* Fake Google G Logo (SVG) */}
              <svg className="size-8" viewBox="0 0 24 24" width="24" height="24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-white mt-2">Sign in to No More Boring Websites</h3>
              <p className="text-xs text-muted">Select a simulated user profile to log in instantly</p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleSelectRole("admin")}
                className="group relative flex w-full flex-col gap-0.5 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left hover:border-violet-500/50 hover:bg-violet-500/[0.04] transition duration-200"
              >
                <span className="text-sm font-semibold text-white group-hover:text-violet-400">Admin Curator</span>
                <span className="text-xs text-muted">Full CRM access to create, edit, & delete curations</span>
              </button>

              <button
                onClick={() => handleSelectRole("user")}
                className="group relative flex w-full flex-col gap-0.5 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left hover:border-emerald-500/50 hover:bg-emerald-500/[0.04] transition duration-200"
              >
                <span className="text-sm font-semibold text-white group-hover:text-emerald-400">Regular Designer</span>
                <span className="text-xs text-muted">Personalized access to save favorites and view curated lists</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
            <Loader2 className="size-10 animate-spin text-violet-500" />
            <div>
              <p className="text-sm font-medium text-white">Simulating Google Sign-In...</p>
              <p className="text-xs text-muted mt-1">Logging in as {selectedRole === "admin" ? "Admin Curator" : "Regular Designer"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
