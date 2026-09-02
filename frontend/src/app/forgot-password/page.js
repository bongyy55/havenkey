"use client";

import { API_URL } from "@/lib/api";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      setSubmitted(true);
    } catch (err) {
      setError("Could not connect to the server. Please try again.");
    } finally {
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

        {!submitted ? (
          <>
            <h1 className="font-display text-2xl text-[#111111] text-center mb-1">
              Reset your password
            </h1>
            <p className="text-sm text-[#2B2B2B]/70 text-center mb-8">
              Enter your email address and we'll send you a link to reset it.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#2B2B2B]/70 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#111111]/15 rounded-sm px-3 py-2.5 text-sm text-[#111111] outline-none focus:border-[#C9975C]"
                  placeholder="you@example.com"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#111111] text-white font-medium py-3 rounded-sm hover:bg-[#C9975C] transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-6 w-14 h-14 rounded-full bg-[#F5F1E8] flex items-center justify-center">
              <span className="text-2xl">✉️</span>
            </div>
            <h1 className="font-display text-2xl text-[#111111] mb-2">
              Check your inbox
            </h1>
            <p className="text-sm text-[#2B2B2B]/70">
              If that email exists, you'll receive a reset link shortly.
            </p>
          </div>
        )}

        <p className="text-center text-sm text-[#2B2B2B]/70 mt-6">
          Remember your password?{" "}
          <Link href="/login" className="text-[#C9975C] font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}