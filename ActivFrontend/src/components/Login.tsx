"use client";

import { useState, type FormEvent } from "react";

type Role = "player" | "venue";

interface LoginProps {
  onSubmit?: (data: { role: Role; email: string; password: string }) => void;
  onNavigateHome?: () => void;
}

export default function Login({ onSubmit, onNavigateHome }: LoginProps) {
  const [role, setRole] = useState<Role>("player");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (email === "adminactiv@gmail.com" && password === "Admin@123") {
      onSubmit?.({ role, email, password });
      return;
    }
    setError("Invalid email or password.");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0F0F0F]">
      {/* Decorative background: grid + circle arcs, consistent with the rest of the site */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GridBackground />
        <CircleArc className="top-1/2 -left-52 -translate-y-1/2 h-[420px] w-[420px] opacity-60" />
        <CircleArc className="top-1/2 -right-52 -translate-y-1/2 h-[420px] w-[420px] opacity-60" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col lg:flex-row lg:items-center">
        {/* Left: brand panel */}
        <div className="flex flex-col justify-center px-4 pt-16 sm:px-6 lg:w-1/2 lg:pt-0">
          <button
            type="button"
            onClick={onNavigateHome}
            className="mb-10 inline-flex w-fit items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeftIcon /> Back to home
          </button>

          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c8f31d]" />
            <span className="text-xs font-medium text-white/90">
              India&apos;s Sports &amp; Wellbeing Platform
            </span>
          </div>

          <h1 className="max-w-md text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl">
            Good to see you back on your <span className="text-[#c8f31d]">Move</span>
          </h1>

          <p className="mt-5 max-w-sm text-base leading-relaxed text-white/60">
            Sign in to pick up your bookings, check live availability, and get
            back on court, mat, or turf, in a couple of taps.
          </p>

          <div className="mt-10 hidden max-w-sm flex-col gap-4 lg:flex">
            <FeatureRow icon={<LightningIcon />} text="Live availability across every venue" />
            <FeatureRow icon={<ShieldCheckIcon />} text="Verified venues, secure payments" />
          </div>
        </div>

        {/* Right: login card */}
        <div className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:py-0">
          <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-black/75 p-8 backdrop-blur-sm">
            {/* Role toggle, echoing the hero CTAs */}
            <h2 className="text-xl font-semibold text-white">
              {role === "player" ? "Log in to book" : "Log in to your venue"}
            </h2>
            <p className="mt-1 text-sm text-white/50">
              {role === "player"
                ? "Enter your details to see live slots near you."
                : "Enter your details to manage bookings and slots."}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-medium text-white/70">Email</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#c8f31d]/70"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-medium text-white/70">Password</span>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 pr-11 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#c8f31d]/70"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white/80"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </label>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-white/60">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-white/30 bg-black/60 accent-[#c8f31d]"
                  />
                  Remember me
                </label>
                <a href="#forgot-password" className="font-medium text-[#c8f31d] hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-[13px] bg-[#c8f31d] px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.01]"
              >
                Log in
              </button>
              {error && <p className="text-sm text-red-400" role="alert">{error}</p>}
            </form>

            <p className="mt-6 text-center text-xs text-white/50">
              New to ACTIV?{" "}
              <a href="#signup" className="font-medium text-white hover:text-[#c8f31d]">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#c8f31d]/60 text-[#c8f31d] shadow-[0_0_10px_rgba(200,243,29,0.3)]">
        {icon}
      </span>
      <span className="text-sm text-white/70">{text}</span>
    </div>
  );
}

/* Decorative background, matching Home.tsx */
function GridBackground() {
  return (
    <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="login-grid-pattern" width="72" height="72" patternUnits="userSpaceOnUse">
          <path d="M 72 0 L 0 0 0 72" fill="none" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#login-grid-pattern)" />
    </svg>
  );
}

function CircleArc({ className = "" }: { className?: string }) {
  return (
    <svg className={`absolute ${className}`} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="200" r="198" stroke="#ffffff" strokeOpacity="0.09" strokeWidth="1" />
      <circle cx="200" cy="200" r="150" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1" />
      <circle cx="200" cy="200" r="105" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />
    </svg>
  );
}

/* Icons, matching Home.tsx's icon set */
function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-6.5 0-10-7-10-7a18.4 18.4 0 0 1 4.22-5.06M9.9 4.24A9.12 9.12 0 0 1 12 4c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}