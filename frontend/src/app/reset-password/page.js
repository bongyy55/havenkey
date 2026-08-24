"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, new_password: newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Could not reset password. Try requesting a new link.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
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

        {success ? (
          <div className="text-center">
            <h1 className="font-display text-2xl text-[#111111] mb-2">
              Password reset
            </h1>
            <p className="text-sm text-[#2B2B2B]/70">
              Redirecting you to login...
            </p>
          </div>
        ) : (
          <>
            <h1 className="font-display text-2xl text-[#111111] text-center mb-1">
              Reset your password
            </h1>
            <p className="text-sm text-[#2B2B2B]/70 text-center mb-8">
              Enter a new password for {email}.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#2B2B2B]/70 mb-1">
                  New password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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

              <div>
                <label className="block text-xs text-[#2B2B2B]/70 mb-1">
                  Confirm password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-[#111111]/15 rounded-sm px-3 py-2.5 text-sm text-[#111111] outline-none focus:border-[#C9975C]"
                  placeholder="Re-enter your new password"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#111111] text-white font-medium py-3 rounded-sm hover:bg-[#C9975C] transition disabled:opacity-50"
              >
                {loading ? "Resetting..." : "Reset password"}
              </button>
            </form>
          </>
        )}

        <p className="text-center text-sm text-[#2B2B2B]/70 mt-6">
          <Link href="/login" className="text-[#C9975C] font-medium hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F1E8]" />}>
      <ResetPasswordForm />
    </Suspense>
  );
}