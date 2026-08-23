"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AgentSignup() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business_name: "",
    years_experience: "",
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
          role: "agent",
          business_name: form.business_name,
          years_experience: form.years_experience
            ? parseInt(form.years_experience, 10)
            : null,
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
        <Link href="/" className="flex justify-center mb-6">
          <Image
            src="/logo.jpeg"
            alt="B'Narch"
            width={160}
            height={160}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>

        <h1 className="font-display text-2xl text-[#111111] text-center mb-1">
          Become an Agent
        </h1>
        <p className="text-sm text-[#2B2B2B]/70 text-center mb-6">
          List properties and reach thousands of clients.
        </p>

        <div className="bg-[#F5F1E8] border border-[#C9975C]/30 rounded-sm px-4 py-3 mb-6">
          <p className="text-xs text-[#2B2B2B]/80">
            Agent accounts are reviewed by our team before activation. You'll
            be notified once approved.
          </p>
        </div>

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
              Business / Agency Name
            </label>
            <input
              type="text"
              name="business_name"
              required
              value={form.business_name}
              onChange={handleChange}
              className="w-full border border-[#111111]/15 rounded-sm px-3 py-2.5 text-sm text-[#111111] outline-none focus:border-[#C9975C]"
              placeholder="Doe Realty Ltd"
            />
          </div>

          <div>
            <label className="block text-xs text-[#2B2B2B]/70 mb-1">
              Years of Experience
            </label>
            <input
              type="number"
              name="years_experience"
              min="0"
              required
              value={form.years_experience}
              onChange={handleChange}
              className="w-full border border-[#111111]/15 rounded-sm px-3 py-2.5 text-sm text-[#111111] outline-none focus:border-[#C9975C]"
              placeholder="5"
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
            {loading ? "Creating account..." : "Create Agent Account"}
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