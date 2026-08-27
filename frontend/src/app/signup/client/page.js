"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ClientSignup() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: "client",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      router.push(`/verify-email?email=${encodeURIComponent(form.email)}`);
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
          className="font-display text-2xl text-[#111111] tracking-wide block text-center mb-6"
        >
          B<span className="text-[#C9975C]">'</span>Narch
        </Link>

        <h1 className="font-display text-2xl text-[#111111] text-center mb-1">
          Create your account
        </h1>
        <p className="text-sm text-[#2B2B2B]/70 text-center mb-8">
          Browse properties and book inspections with confidence.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#2B2B2B]/70 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full border border-[#111111]/15 rounded-sm px-3 py-2.5 text-sm text-[#111111] outline-none focus:border-[#C9975C]"
              placeholder="Jane Doe"
            />
          </div>

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
            <label className="block text-xs text-[#2B2B2B]/70 mb-1">
              Phone number
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-[#111111]/15 rounded-sm px-3 py-2.5 text-sm text-[#111111] outline-none focus:border-[#C9975C]"
              placeholder="08012345678"
            />
          </div>

          <div>
            <label className="block text-xs text-[#2B2B2B]/70 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                minLength={6}
                value={form.password}
                onChange={handleChange}
                className="w-full border border-[#111111]/15 rounded-sm px-3 py-2.5 pr-10 text-sm text-[#111111] outline-none focus:border-[#C9975C]"
                placeholder="At least 6 characters"
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
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-[#2B2B2B]/70 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#C9975C] font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}