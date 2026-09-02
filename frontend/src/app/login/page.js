"use client";

import { API_URL } from "@/lib/api";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import AuthImage from "@/components/images/AuthImage.jpeg";
import { useToast } from "@/components/shared/Toast/ToastProvider";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const justVerified = searchParams.get("verified") === "true";
  const { showToast } = useToast();

  const [role, setRole] = useState("client");
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (justVerified) {
      showToast(
        "Your account has been verified. You can now log in.",
        "success",
      );
    }
  }, [justVerified, showToast]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.detail || "Invalid email or password", "error");
        setLoading(false);
        return;
      }

      if (data.user.role !== role) {
        showToast(
          `This account is registered as a${
            data.user.role === "agent" ? "n" : ""
          } ${data.user.role}. Please switch to the ${data.user.role} tab above.`,
          "error",
        );
        setLoading(false);
        return;
      }

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      showToast("Welcome back. Login successful.", "success");

      if (data.user.role === "agent" && data.user.status === "pending") {
        router.push("/agent-pending");
      } else if (data.user.role === "agent") {
        router.push("/dashboard/agent");
      } else if (data.user.role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/client");
      }
    } catch (err) {
      showToast("Could not connect to the server. Please try again.", "error");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-[#111111]/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#111111] outline-none bg-white hover:border-[#111111]/30 focus:border-[#C9975C] focus:ring-2 focus:ring-[#C9975C]/20 focus:scale-[1.01] transition-all duration-300";

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-serif">
      <div className="w-full max-w-5xl bg-[#FCFBF7] rounded-2xl shadow-2xl border border-[#111111]/10 overflow-hidden flex flex-col lg:flex-row">
        {/* ================= LEFT COLUMN: Pure Image Layout (Hidden on Mobile) ================= */}
        <div className="hidden lg:block lg:w-1/2 relative min-h-[750px] overflow-hidden group">
          <Image
            src={AuthImage}
            alt="Find Inspect Own with Confidence"
            fill
            className="object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* ================= RIGHT COLUMN: Interactive Form Container ================= */}
        <div className="w-full lg:w-1/2 bg-white p-8 sm:p-12 flex flex-col justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            {/* Client / Agent Switcher Tabs */}
            <div className="relative inline-flex w-full bg-[#F5F1E8] border border-[#111111]/10 rounded-xl p-1 mb-5 flex-shrink-0">
              <button
                type="button"
                onClick={() => handleRoleSwitch("client")}
                className={`relative flex-1 py-2 text-sm font-semibold rounded-lg text-center z-10 transition-colors duration-300 cursor-pointer ${
                  role === "client"
                    ? "text-[#111111]"
                    : "text-[#2B2B2B]/60 hover:text-[#111111]"
                }`}
              >
                {role === "client" && (
                  <motion.span
                    layoutId="login-tab-pill"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                Client
              </button>
              <button
                type="button"
                onClick={() => handleRoleSwitch("agent")}
                className={`relative flex-1 py-2 text-sm font-semibold rounded-lg text-center z-10 transition-colors duration-300 cursor-pointer ${
                  role === "agent"
                    ? "text-[#111111]"
                    : "text-[#2B2B2B]/60 hover:text-[#111111]"
                }`}
              >
                {role === "agent" && (
                  <motion.span
                    layoutId="login-tab-pill"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                Agent
              </button>
            </div>

            {/* Heading Header */}
            <div className="mb-4">
              <h2 className="text-2xl sm:text-3xl text-[#111111] mb-1 tracking-tight">
                {role === "agent" ? "Agent login" : "Welcome back"}
              </h2>
              <p className="text-xs text-[#2B2B2B]/60">
                {role === "agent"
                  ? "Log in to manage your listings and clients."
                  : "Log in to continue to your account."}
              </p>
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="group">
                <label className="block text-[11px] font-semibold text-[#2B2B2B]/70 mb-1">
                  Email address
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 z-10 text-[#2B2B2B]/40 transition-colors group-focus-within:text-[#C9975C] pointer-events-none">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    disabled={loading}
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="group">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-semibold text-[#2B2B2B]/70">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[11px] text-[#C9975C] font-semibold hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-3 z-10 text-[#2B2B2B]/40 transition-colors group-focus-within:text-[#C9975C] pointer-events-none">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    disabled={loading}
                    value={form.password}
                    onChange={handleChange}
                    className={`${inputClass} pr-12`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-[11px] font-semibold text-[#2B2B2B]/50 hover:text-[#C9975C] cursor-pointer transition-colors px-2 py-1 flex items-center gap-1"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Show</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9975C] text-white font-medium py-3 rounded-lg hover:bg-[#111111] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <span>Log in</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Navigation Link */}
            <p className="text-center text-xs text-[#2B2B2B]/70 mt-4">
              Don&apos;t have an account?{" "}
              <Link
                href={role === "agent" ? "/signup/agent" : "/signup/client"}
                className="text-[#C9975C] font-semibold hover:underline cursor-pointer transition-colors"
              >
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F1E8]" />}>
      <LoginForm />
    </Suspense>
  );
}
