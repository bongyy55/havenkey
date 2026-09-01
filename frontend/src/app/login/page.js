"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const justVerified = searchParams.get("verified") === "true";

  const [role, setRole] = useState("client");
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Invalid email or password");
        setLoading(false);
        return;
      }

      if (data.user.role !== role) {
        setError(
          `This account is registered as a${
            data.user.role === "agent" ? "n" : ""
          } ${data.user.role}. Please switch to the ${data.user.role} tab above.`
        );
        setLoading(false);
        return;
      }

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

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
      setError("Could not connect to the server. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-sm p-8 border border-[#111111]/10">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-[#2B2B2B]/60 hover:text-[#C9975C] mb-6"
        >
          ← Back to home
        </Link>

        <Link href="/" className="flex justify-center mb-6">
          <Image
            src="/logo.jpeg"
            alt="B'Narch"
            width={220}
            height={220}
            className="h-24 w-auto object-contain"
            priority
          />
        </Link>

        <div className="inline-flex w-full bg-[#F5F1E8] border border-[#111111]/10 rounded-sm p-1 mb-6">
          <button
            type="button"
            onClick={() => handleRoleSwitch("client")}
            className={`flex-1 py-2 text-sm font-medium rounded-sm transition ${
              role === "client"
                ? "bg-white text-[#111111] shadow-sm"
                : "text-[#2B2B2B]/60 hover:text-[#111111]"
            }`}
          >
            Client
          </button>
          <button
            type="button"
            onClick={() => handleRoleSwitch("agent")}
            className={`flex-1 py-2 text-sm font-medium rounded-sm transition ${
              role === "agent"
                ? "bg-white text-[#111111] shadow-sm"
                : "text-[#2B2B2B]/60 hover:text-[#111111]"
            }`}
          >
            Agent
          </button>
        </div>

        <h1 className="font-display text-2xl text-[#111111] text-center mb-1">
          {role === "agent" ? "Agent login" : "Welcome back"}
        </h1>
        <p className="text-sm text-[#2B2B2B]/70 text-center mb-8">
          {role === "agent"
            ? "Log in to manage your listings and clients."
            : "Log in to continue to your account."}
        </p>

        {justVerified && (
          <div className="bg-[#F5F1E8] border border-[#C9975C]/30 rounded-sm px-4 py-3 mb-6">
            <p className="text-xs text-[#2B2B2B]/80">
              Your account has been verified. You can now log in.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#2B2B2B]/70 mb-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border border-[#111111]/15 rounded-sm px-3 py-2.5 text-sm text-[#111111] outline-none focus:border-[#C9975C]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs text-[#2B2B2B]/70">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-[#C9975C] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full border border-[#111111]/15 rounded-sm px-3 py-2.5 pr-10 text-sm text-[#111111] outline-none focus:border-[#C9975C]"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#2B2B2B]/50 hover:text-[#C9975C]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#111111] text-white font-medium py-3 rounded-sm hover:bg-[#C9975C] transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-center text-sm text-[#2B2B2B]/70 mt-6">
          Don't have an account?{" "}
          <Link
            href={role === "agent" ? "/signup/agent" : "/signup/client"}
            className="text-[#C9975C] font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
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